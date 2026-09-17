import { useEffect, useState, type FormEvent } from 'react';
import { Users, MapPin, Calendar, Clock, CheckCircle2, Phone, Sparkles, Loader2, ChefHat } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { eventZones, eventPaellaTypes, restaurantInfo } from '@/data';
import { sendWhatsApp, buildEventQuoteMessage, formatPrice } from '@/utils/whatsapp';
import { getTodayLocalISODate } from '@/utils/schedule';

const CALC_DELAY_MS = 900;

export default function Eventos() {
  const { ref, visible } = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    people: '',
    zone: '',
    paellaType: '',
    date: '',
    time: '',
  });
  const [calculating, setCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const todayIso = getTodayLocalISODate();
  const selectedZone = eventZones.find((z) => z.name === form.zone);
  const selectedPaella = eventPaellaTypes.find((p) => p.name === form.paellaType);
  const peopleCount = Number(form.people);
  const isComplete =
    peopleCount > 0 && !!selectedZone && !!selectedPaella && !!form.date && !!form.time;
  const total = selectedZone && selectedPaella ? peopleCount * selectedPaella.pricePerPerson + selectedZone.price : 0;

  useEffect(() => {
    if (!isComplete) {
      setCalculating(false);
      setShowResult(false);
      return;
    }
    setShowResult(false);
    setCalculating(true);
    const timer = setTimeout(() => {
      setCalculating(false);
      setShowResult(true);
    }, CALC_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.people, form.zone, form.paellaType, form.date, form.time]);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isComplete) return;
    sendWhatsApp(
      buildEventQuoteMessage({
        people: form.people,
        zone: form.zone,
        paellaType: form.paellaType,
        date: form.date,
        time: form.time,
        total,
      })
    );
    setSubmitted(true);
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-saffron-500/15 border border-saffron-500/40 rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-saffron-400" />
            <span className="text-saffron-400 text-xs font-semibold tracking-wider uppercase">Eventos en vivo</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream-50 leading-tight mb-5 text-shadow-lg animate-fade-in-up">
            Preparamos la paella para tus <span className="text-saffron-400 italic">eventos</span>
          </h1>
          <p className="text-base sm:text-lg text-cream-100/80 max-w-2xl mx-auto text-shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Cocinamos en vivo para tus invitados con paellas gigantes, tapas y todo el sabor de España.
            Bodas, cumpleaños, reuniones empresariales y más.
          </p>
        </div>
      </section>

      {/* Quote calculator */}
      <section className="py-16 sm:py-24 bg-cream-100 mediterranean-pattern">
        <div ref={ref} className={`max-w-2xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
              Cotización
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800 mt-3 mb-3 sm:mb-4">
              Solicita tu <span className="text-saffron-600 italic">cotización</span>
            </h2>
            <p className="text-charcoal-700/60 text-sm sm:text-base">
              Cuéntanos sobre tu evento y te damos tu cotización personalizada.
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
                className="px-6 py-2.5 bg-saffron-500 text-cream-50 font-semibold rounded-full text-sm hover:bg-saffron-600 transition-colors"
              >
                Solicitar otra cotización
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg space-y-5 sm:space-y-6 border border-saffron-200/50">
              <Field icon={Users} label="Número de personas">
                <input
                  required
                  type="number"
                  min="1"
                  inputMode="numeric"
                  placeholder="Ingresa el número de personas"
                  value={form.people}
                  onChange={(e) => update('people', e.target.value)}
                  className="form-input-light"
                />
              </Field>

              <div>
                <label className="flex items-center gap-2 text-charcoal-700/70 text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 text-saffron-600" />
                  Zona del evento
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {eventZones.map((zone) => (
                    <label
                      key={zone.name}
                      className={`cursor-pointer text-center rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-all ${
                        form.zone === zone.name
                          ? 'bg-saffron-500 border-saffron-500 text-cream-50'
                          : 'bg-[#eee6e4] border-transparent text-charcoal-700/80 hover:border-saffron-500/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="zone"
                        value={zone.name}
                        required
                        checked={form.zone === zone.name}
                        onChange={(e) => update('zone', e.target.value)}
                        className="sr-only"
                      />
                      {zone.name}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-charcoal-700/70 text-sm font-medium mb-2">
                  <ChefHat className="w-4 h-4 text-saffron-600" />
                  Tipo de paella
                </label>
                <div className="space-y-2.5">
                  {eventPaellaTypes.map((type) => (
                    <label
                      key={type.name}
                      className={`flex items-start gap-3 cursor-pointer rounded-xl border-2 p-3.5 transition-all ${
                        form.paellaType === type.name
                          ? 'bg-saffron-50 border-saffron-500'
                          : 'bg-[#eee6e4]/60 border-transparent hover:border-saffron-500/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paellaType"
                        value={type.name}
                        required
                        checked={form.paellaType === type.name}
                        onChange={(e) => update('paellaType', e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center ${
                          form.paellaType === type.name ? 'border-saffron-500' : 'border-charcoal-700/30'
                        }`}
                      >
                        {form.paellaType === type.name && (
                          <div className="w-2.5 h-2.5 rounded-full bg-saffron-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-serif font-bold text-charcoal-800 text-sm sm:text-base">
                            {type.name}
                          </span>
                          <span className="text-saffron-600 font-bold text-xs sm:text-sm whitespace-nowrap">
                            {formatPrice(type.pricePerPerson)} / persona
                          </span>
                        </div>
                        <p className="text-charcoal-700/60 text-xs sm:text-sm mt-1">{type.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <Field icon={Calendar} label="Fecha del evento">
                  <input
                    required
                    type="date"
                    min={todayIso}
                    value={form.date}
                    onChange={(e) => update('date', e.target.value)}
                    className="form-input-light"
                  />
                </Field>
                <Field icon={Clock} label="Hora del evento">
                  <input
                    required
                    type="time"
                    value={form.time}
                    onChange={(e) => update('time', e.target.value)}
                    className="form-input-light"
                  />
                </Field>
              </div>

              {(calculating || showResult) && (
                <div className="bg-gradient-warm border border-saffron-300/60 rounded-2xl p-5 sm:p-6 text-center">
                  {calculating ? (
                    <div className="flex items-center justify-center gap-2 text-charcoal-700/70 text-sm font-medium py-2">
                      <Loader2 className="w-5 h-5 animate-spin text-saffron-600" />
                      Calculando tu cotización...
                    </div>
                  ) : (
                    <>
                      <p className="text-charcoal-700/70 text-sm mb-1">Tu evento tendría un valor de</p>
                      <p className="font-serif text-3xl sm:text-4xl font-bold text-saffron-700 mb-3">
                        {formatPrice(total)}
                      </p>
                      <p className="text-charcoal-700/60 text-xs sm:text-sm leading-relaxed">
                        Incluye preparación en vivo con chef, servicio tipo buffet, ingredientes, pan baguette
                        con alioli y tomate encurtido en aceite de oliva, y menaje completo (platos y cubiertos).
                      </p>
                    </>
                  )}
                </div>
              )}

              {showResult && (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white font-bold rounded-xl text-base transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  Confirma tu evento a WhatsApp
                </button>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Contact info */}
      <section className="py-16 sm:py-20 bg-gradient-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 mb-8">
            Información de <span className="text-saffron-400 italic">contacto</span>
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
          background: #eee6e4;
          border: 1px solid rgba(152, 25, 21, 0.15);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: #2c1110;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input-light::placeholder { color: rgba(44, 17, 16, 0.3); }
        .form-input-light:focus {
          border-color: #981915;
          box-shadow: 0 0 0 1px #981915;
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
