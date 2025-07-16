"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { MantineProvider } from "@mantine/core";

type ColorSchemeContextType = {
  colorScheme: "light" | "dark";
  toggleColorScheme: (value?: "light" | "dark") => void;
};

export const ColorSchemeContext = createContext<
  ColorSchemeContextType | undefined
>(undefined);

export function useColorScheme() {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error(
      "useColorScheme must be used within ColorSchemeProviderWrapper",
    );
  }
  return context;
}

function ColorSchemeProviderWrapper({ children }: { children: ReactNode }) {
  // Always start with "dark" to match SSR
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Hydrate from cookie after component mounts
  useEffect(() => {
    setMounted(true);
    const savedScheme = Cookies.get("mantine-color-scheme") as "light" | "dark";
    if (savedScheme && savedScheme !== colorScheme) {
      setColorScheme(savedScheme);
    }
  }, []);

  // Update cookie when colorScheme changes (but only after mounting)
  useEffect(() => {
    if (mounted) {
      Cookies.set("mantine-color-scheme", colorScheme, { expires: 365 });
    }
  }, [colorScheme, mounted]);

  const toggleColorScheme = (value?: "light" | "dark") => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <MantineProvider
        theme={{
          fontFamily: "var(--font-geist-sans)",
          fontFamilyMonospace: "var(--font-geist-mono)",
          primaryColor: "blue",
        }}
        forceColorScheme="dark"
      >
        {children}
      </MantineProvider>
    </ColorSchemeContext.Provider>
  );
}

export default ColorSchemeProviderWrapper;
