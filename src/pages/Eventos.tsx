import { useState, type FormEvent } from 'react';
import { Users, MapPin, Calendar, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { paellaTypes, restaurantInfo } from '@/data';
import { sendWhatsApp, buildEventQuoteMessage } from '@/utils/whatsapp';

export default function Eventos() {
  const { ref, visible } = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    people: '',
    address: '',
    paellaType: paellaTypes[0],
    date: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendWhatsApp(buildEventQuoteMessage(form));
    setSubmitted(true);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/32690711/pexels-photo-32690711.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Paella para eventos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/60 to-charcoal-900/90" />
        </div>

        <div className="relative z-10 text-center px-5 sm:px-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-saffron-500/10 border border-saffron-500/30 rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-saffron-400" />
            <span className="text-saffron-400 text-xs font-semibold tracking-wider uppercase">Eventos en vivo</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream-50 leading-tight mb-5 text-shadow-lg animate-fade-in-up">
            Preparamos la paella para tus <span className="text-saffron-500 italic">eventos</span>
          </h1>
          <p className="text-base sm:text-lg text-cream-100/80 max-w-2xl mx-auto text-shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Cocinamos en vivo para tus invitados con paellas gigantes, tapas y todo el sabor de España.
            Bodas, cumpleaños, reuniones empresariales y más.
          </p>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-16 sm:py-24 bg-cream-50">
        <div ref={ref} className={`max-w-2xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
              Cotización
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800 mt-3 mb-3 sm:mb-4">
              Solicita tu <span className="text-terracotta-600 italic">cotización</span>
            </h2>
            <p className="text-charcoal-700/60 text-sm sm:text-base">
              Cuéntanos sobre tu evento y te enviaremos una cotización personalizada por WhatsApp.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white border border-saffron-200 rounded-2xl p-8 sm:p-12 text-center shadow-lg">
              <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-saffron-500 mx-auto mb-4" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-800 mb-2">
                ¡Cotización enviada!
              </h3>
              <p className="text-charcoal-700/60 text-sm sm:text-base mb-6">
                Hemos abierto WhatsApp con los datos de tu evento. Confirma el envío y te responderemos con la cotización.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-saffron-500 text-charcoal-900 font-semibold rounded-full text-sm hover:bg-saffron-600 transition-colors"
              >
                Solicitar otra cotización
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg space-y-4 sm:space-y-5">
              <Field icon={Users} label="Número de personas">
                <input
                  required
                  type="number"
                  min="1"
                  placeholder="Ej: 50"
                  value={form.people}
                  onChange={(e) => update('people', e.target.value)}
                  className="form-input-light"
                />
              </Field>

              <Field icon={MapPin} label="Dirección del evento">
                <input
                  required
                  type="text"
                  placeholder="Ej: Salón El Dorado, Bucaramanga"
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  className="form-input-light"
                />
              </Field>

              <Field icon={Sparkles} label="Tipo de paella">
                <select
                  required
                  value={form.paellaType}
                  onChange={(e) => update('paellaType', e.target.value)}
                  className="form-input-light"
                >
                  {paellaTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field>

              <Field icon={Calendar} label="Fecha del evento">
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => update('date', e.target.value)}
                  className="form-input-light"
                />
              </Field>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white font-bold rounded-xl text-base transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                Enviar cotización por WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contact info */}
      <section className="py-16 sm:py-20 bg-gradient-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 mb-8">
            Información de <span className="text-saffron-500 italic">contacto</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 justify-center sm:justify-end">
              <div className="w-12 h-12 rounded-xl bg-saffron-500/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-saffron-400" />
              </div>
              <div className="text-left">
                <p className="text-cream-100/50 text-xs uppercase tracking-wider">Dirección</p>
                <p className="text-cream-50 text-sm font-medium">{restaurantInfo.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-xl bg-saffron-500/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-saffron-400" />
              </div>
              <div className="text-left">
                <p className="text-cream-100/50 text-xs uppercase tracking-wider">Teléfono</p>
                <p className="text-cream-50 text-sm font-medium">{restaurantInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .form-input-light {
          width: 100%;
          background: #fdf8ee;
          border: 1px solid rgba(45, 37, 32, 0.1);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: #1f1a16;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input-light::placeholder { color: rgba(45, 37, 32, 0.3); }
        .form-input-light:focus {
          border-color: #f59e0b;
          box-shadow: 0 0 0 1px #f59e0b;
        }
      `}</style>
    </>
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
      <label className="flex items-center gap-2 text-charcoal-700/70 text-sm font-medium mb-2">
        <Icon className="w-4 h-4 text-saffron-600" />
        {label}
      </label>
      {children}
    </div>
  );
}
