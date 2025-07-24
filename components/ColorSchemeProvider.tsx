"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";

// Create the theme
const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "var(--font-geist-sans)",
  fontFamilyMonospace: "var(--font-geist-mono)",
});

// Color scheme context
interface ColorSchemeContextType {
  colorScheme: "light" | "dark";
  toggleColorScheme: () => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  }
  return context;
};

interface ColorSchemeProviderProps {
  readonly children: ReactNode;
}

export default function ColorSchemeProviderWrapper({ children }: ColorSchemeProviderProps) {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Only run on client side
  useEffect(() => {
    setMounted(true);
    
    // Get color scheme from localStorage or default to dark
    const savedScheme = localStorage.getItem("mantine-color-scheme");
    if (savedScheme === "light" || savedScheme === "dark") {
      setColorScheme(savedScheme);
    }
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    colorScheme,
    toggleColorScheme: () => {
      const newScheme = colorScheme === "dark" ? "light" : "dark";
      setColorScheme(newScheme);
      localStorage.setItem("mantine-color-scheme", newScheme);
    },
  }), [colorScheme]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      <MantineProvider theme={theme} forceColorScheme={colorScheme}>
        <ModalsProvider>
          {children}
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeContext.Provider>
  );
}
