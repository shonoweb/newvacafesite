"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface NavMenuContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const NavMenuContext = createContext<NavMenuContextValue | null>(null);

/**
 * Single source of truth for the site-wide nav overlay, shared by every
 * trigger that can open it (Hero's mobile hamburger, the floating "MENU"
 * button once Hero has scrolled past). One overlay instance, one state —
 * that's what lets desktop and mobile reuse the exact same nav system.
 */
export function NavMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle],
  );

  return (
    <NavMenuContext.Provider value={value}>{children}</NavMenuContext.Provider>
  );
}

export function useNavMenu() {
  const ctx = useContext(NavMenuContext);
  if (!ctx) {
    throw new Error("useNavMenu must be used within a NavMenuProvider");
  }
  return ctx;
}
