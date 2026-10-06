"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "auto" | "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  changeTheme: (value: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("auto");

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("site-theme") as Theme) || "auto";

    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = () => {
      if (theme === "auto") {
        applyTheme("auto");
      }
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [theme]);

  function applyTheme(value: Theme) {
    const root = document.documentElement;

    if (value === "dark") {
      root.classList.add("dark");
    } else if (value === "light") {
      root.classList.remove("dark");
    } else {
      const dark =
        window.matchMedia &&
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      root.classList.toggle("dark", dark);
    }
  }

  function changeTheme(value: Theme) {
    setTheme(value);
    localStorage.setItem("site-theme", value);
    applyTheme(value);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
