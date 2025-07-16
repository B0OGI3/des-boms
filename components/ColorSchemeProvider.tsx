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
  // Always match SSR: start with "dark"
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("dark");
  const [hydrated, setHydrated] = useState(false);

  // On mount, check cookie and update state if needed (but do not update DOM attribute here)
  useEffect(() => {
    setHydrated(true);
    const cookieScheme =
      (Cookies.get("mantine-color-scheme") as "light" | "dark") || "dark";
    if (cookieScheme !== "dark") {
      setColorScheme(cookieScheme);
    }
  }, []);

  // Only update DOM attribute and cookie when colorScheme changes after hydration
  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute(
      "data-mantine-color-scheme",
      colorScheme,
    );
    Cookies.set("mantine-color-scheme", colorScheme, { expires: 365 });
  }, [colorScheme, hydrated]);

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
      >
        {children}
      </MantineProvider>
    </ColorSchemeContext.Provider>
  );
}

export default ColorSchemeProviderWrapper;
