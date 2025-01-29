"use client";

import {ThemeProvider, ThemeProviderProps} from "next-themes";
import {useState, useEffect} from "react";

export default function Providers({children, ...props}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Render children without ThemeProvider during SSR
  }

  return <ThemeProvider {...props}>{children}</ThemeProvider>; // Wrap children with ThemeProvider after mount
}