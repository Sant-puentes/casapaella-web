import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { menuCategories, type Dish } from '@/data';
import { useCart } from '@/context/CartContext';
import { useReveal } from '@/hooks/useReveal';
import { formatPrice, sendWhatsApp, buildOrderMessage } from '@/utils/whatsapp';

function DishCard({ dish }: { dish: Dish }) {
  const { addItem, getQuantity } = useCart();
  const qty = getQuantity(dish.id);
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ${visible ? 'reveal visible' : 'reveal'}`}
    >
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
        {dish.tag && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-saffron-500 text-charcoal-900 text-xs font-bold rounded-full shadow-md">
            {dish.tag}
          </span>
        )}
        <span className="absolute bottom-3 left-3 px-4 py-1.5 bg-cream-50/95 backdrop-blur-sm text-charcoal-900 font-serif text-base font-bold rounded-full shadow-md">
          {formatPrice(dish.price)}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal-800 mb-1.5">{dish.name}</h3>
        <p className="text-charcoal-700/70 text-xs sm:text-sm leading-relaxed mb-4">{dish.description}</p>
        <button
          onClick={() => addItem(dish)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-saffron-100 hover:bg-saffron-500 text-saffron-700 hover:text-charcoal-900 font-semibold rounded-xl text-sm transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          {qty > 0 ? `Agregado (${qty})` : 'Agregar'}
        </button>
      </div>
    </div>
  );
}

function CartSidebar() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, total, totalItems, clear } = useCart();

  const handleOrder = () => {
    if (items.length === 0) return;
    sendWhatsApp(buildOrderMessage(items, total));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-96 bg-cream-50 shadow-2xl transition-transform duration-500 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-charcoal-800/10">
          <h2 className="font-serif text-xl font-bold text-charcoal-800 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-saffron-600" />
            Tu pedido
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full bg-charcoal-800/5 hover:bg-charcoal-800/10 flex items-center justify-center text-charcoal-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingCart className="w-16 h-16 text-charcoal-800/20 mb-4" />
            <p className="text-charcoal-700/50 text-sm">Tu carrito está vacío</p>
            <p className="text-charcoal-700/40 text-xs mt-1">Agrega platos del menú para empezar</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.dish.id} className="flex gap-3 bg-white rounded-xl p-3 shadow-sm">
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm font-bold text-charcoal-800 truncate">{item.dish.name}</h3>
                    <p className="text-saffron-600 font-semibold text-sm">{formatPrice(item.dish.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-2 bg-cream-100 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.dish.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-charcoal-700 hover:text-terracotta-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold text-charcoal-800 w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.dish.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-charcoal-700 hover:text-terracotta-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.dish.id)}
                        className="w-6 h-6 flex items-center justify-center text-charcoal-700/40 hover:text-terracotta-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-charcoal-800 text-sm">{formatPrice(item.dish.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-charcoal-800/10 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-charcoal-700/60 text-sm">Total ({totalItems} {totalItems === 1 ? 'plato' : 'platos'})</span>
                <span className="font-serif text-2xl font-bold text-charcoal-800">{formatPrice(total)}</span>
              </div>
              <button
                onClick={handleOrder}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white font-bold rounded-xl text-base transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                Hacer pedido por WhatsApp
              </button>
              <button
                onClick={clear}
                className="w-full py-2 text-charcoal-700/50 hover:text-terracotta-600 text-sm font-medium transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { totalItems, setOpen } = useCart();
  const category = menuCategories[activeCategory];

  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Nuestra carta
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mt-3 mb-3 sm:mb-4">
            Sabores de <span className="text-terracotta-600 italic">España</span>
          </h1>
          <p className="text-charcoal-700/60 max-w-xl mx-auto text-sm sm:text-base">
            Arma tu pedido, agrega los platos que quieras y envíanoslos por WhatsApp.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {menuCategories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(i)}
              className={`px-5 sm:px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === i
                  ? 'bg-saffron-500 text-charcoal-900 shadow-md'
                  : 'bg-cream-100 text-charcoal-700/60 hover:text-charcoal-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dishes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {category.items.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>

      {/* Floating cart button */}
      {totalItems > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 pl-4 pr-6 py-3.5 bg-saffron-500 hover:bg-saffron-600 text-charcoal-900 font-bold rounded-full text-sm shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-terracotta-600 text-cream-50 text-xs font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <span>Ver pedido</span>
        </button>
      )}

      <CartSidebar />
    </section>
  );
}
