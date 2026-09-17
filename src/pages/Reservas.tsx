import { useState, type FormEvent } from 'react';
import { Calendar, Clock, Users, User, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { occasionTypes } from '@/data';
import { sendWhatsApp, buildReservationMessage } from '@/utils/whatsapp';
import { getReservationSlots, getTodayLocalISODate } from '@/utils/schedule';

export default function Reservas() {
  const { ref, visible } = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    people: '2',
    date: '',
    time: '',
    occasion: '',
    decoration: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendWhatsApp(buildReservationMessage(form));
    setSubmitted(true);
  };

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const todayIso = getTodayLocalISODate();
  const timeSlots = getReservationSlots(form.date);

  const handleDateChange = (value: string) => {
    // Al cambiar la fecha, se limpia la hora: los turnos disponibles cambian según el día
    // (lunes y domingo solo tienen el turno de almuerzo).
    setForm((prev) => ({ ...prev, date: value, time: '' }));
  };

  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-charcoal-900 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.pexels.com/photos/18823960/pexels-photo-18823960.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-saffron-500/15 rounded-full blur-3xl" />

      <div ref={ref} className={`relative z-10 max-w-2xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-saffron-400 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Reservas
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream-50 mt-3 mb-3 sm:mb-4">
            Reserva tu <span className="text-saffron-400 italic">mesa</span>
          </h1>
          <p className="text-cream-100/60 text-sm sm:text-base">
            Te esperamos en Casa Paella. Reserva tu mesa y déjate sorprender.
          </p>
        </div>

        {submitted ? (
          <div className="bg-cream-50/10 backdrop-blur-md border border-saffron-500/30 rounded-2xl p-8 sm:p-12 text-center">
            <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-saffron-400 mx-auto mb-4" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-50 mb-2">
              ¡Reserva enviada!
            </h3>
            <p className="text-cream-100/70 text-sm sm:text-base mb-6">
              Hemos abierto WhatsApp con los datos de tu reserva. Confirma el envío para completar tu solicitud.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-saffron-500 text-cream-50 font-semibold rounded-full text-sm hover:bg-saffron-600 transition-colors"
            >
              Hacer otra reserva
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-cream-50/10 backdrop-blur-md border border-saffron-500/30 rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-5">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <Field icon={Calendar} label="Fecha">
                <input
                  required
                  type="date"
                  min={todayIso}
                  value={form.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="form-input"
                />
              </Field>
              <Field icon={Clock} label="Hora">
                <select
                  required
                  value={form.time}
                  onChange={(e) => update('time', e.target.value)}
                  disabled={!form.date}
                  className="form-input"
                >
                  <option value="" disabled className="bg-charcoal-800">
                    {form.date ? 'Selecciona una hora' : 'Elige primero la fecha'}
                  </option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-charcoal-800">
                      {slot}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <p className="text-cream-100/50 text-xs -mt-2">
              Horario de reservas: lunes y domingo, 12:00 PM – 3:00 PM. Martes a sábado, 12:00 PM – 3:00 PM y 6:00 PM – 9:00 PM.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <Field icon={User} label="Nombre completo">
                <input
                  required
                  type="text"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="form-input"
                />
              </Field>
              <Field icon={Phone} label="Teléfono de contacto">
                <input
                  required
                  type="tel"
                  placeholder="300 000 0000"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="form-input"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <Field icon={Users} label="Número de personas">
                <input
                  required
                  type="number"
                  min={1}
                  step={1}
                  inputMode="numeric"
                  placeholder="Ej: 4"
                  value={form.people}
                  onChange={(e) => update('people', e.target.value)}
                  className="form-input"
                />
              </Field>
              <Field icon={Calendar} label="Tipo de ocasión">
                <select
                  required
                  value={form.occasion}
                  onChange={(e) => update('occasion', e.target.value)}
                  className="form-input"
                >
                  <option value="" disabled className="bg-charcoal-800">
                    Selecciona una ocasión
                  </option>
                  {occasionTypes.map((occ) => (
                    <option key={occ} value={occ} className="bg-charcoal-800">
                      {occ}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Decoration option: solo aparece una vez elegida la ocasión */}
            {form.occasion && (
              <div className="bg-cream-50/5 border border-saffron-500/20 rounded-xl p-4">
                <p className="text-cream-50 font-semibold text-sm mb-3">
                  ¿Deseas agregar una decoración especial?
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => update('decoration', !form.decoration)}
                    className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      form.decoration
                        ? 'bg-saffron-500 border-saffron-500'
                        : 'border-cream-50/30'
                    }`}
                  >
                    {form.decoration && <CheckCircle2 className="w-4 h-4 text-cream-50" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-saffron-400" />
                      <span className="text-cream-50 font-semibold text-sm">Decoración especial</span>
                      <span className="text-saffron-400 font-bold text-sm">+$35,000</span>
                    </div>
                    <p className="text-cream-100/50 text-xs mt-1">
                      Incluye mesa decorada y postre de cortesía para tu ocasión especial.
                    </p>
                  </div>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white font-bold rounded-xl text-base transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              Enviar reserva por WhatsApp
            </button>
          </form>
        )}
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: rgba(28, 8, 8, 0.5);
          border: 1px solid rgba(152, 25, 21, 0.2);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: #fffdfc;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input::placeholder { color: rgba(255, 253, 252, 0.3); }
        .form-input:focus {
          border-color: #981915;
          box-shadow: 0 0 0 1px #981915;
        }
        .form-input { color-scheme: dark; }
      `}</style>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-cream-100/70 text-sm font-medium mb-2">
        <Icon className="w-4 h-4 text-saffron-400" />
        {label}
      </label>
      {children}
    </div>
  );
}
