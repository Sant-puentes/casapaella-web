import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Dish } from '@/data';

export interface CartItem {
  dish: Dish;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (dish: Dish) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, delta: number) => void;
  getQuantity: (dishId: string) => number;
  total: number;
  totalItems: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const addItem = useCallback((dish: Dish) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((dishId: string) => {
    setItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  }, []);

  const updateQuantity = useCallback((dishId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty <= 0 ? null : { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  }, []);

  const getQuantity = useCallback(
    (dishId: string) => items.find((item) => item.dish.id === dishId)?.quantity ?? 0,
    [items]
  );

  const total = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const clear = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, getQuantity, total, totalItems, isOpen, setOpen, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
