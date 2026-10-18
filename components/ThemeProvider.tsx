"use client";

import {
createContext,
useContext,
useEffect,
useState,
} from "react";

import {
applySiteTheme,
getStoredSiteTheme,
listenForSiteThemeChanges,
setSiteTheme,
type SiteTheme,
} from "@/components/theme-system";

type ThemeContextType = {
theme: SiteTheme;
changeTheme: (value: SiteTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
undefined
);

export function ThemeProvider({
children,
}: {
children: React.ReactNode;
}) {
const [theme, setTheme] = useState<SiteTheme>("emerald");

useEffect(() => {
const initialTheme = getStoredSiteTheme();

setTheme(initialTheme);
applySiteTheme(initialTheme);

return listenForSiteThemeChanges((nextTheme) => {
  setTheme(nextTheme);
});

}, []);

function changeTheme(value: SiteTheme) {
setSiteTheme(value);
setTheme(value);
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
