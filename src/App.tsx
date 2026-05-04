import { useEffect } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useSettingsStore } from "@/stores/useSettingsStore";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register { router: typeof router }
}

export default function App() {
  const { theme } = useSettingsStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    // Hide the HTML splash screen once React has mounted
    const timer = setTimeout(() => {
      (window as any).__hideSplash?.();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return <RouterProvider router={router} />;
}
