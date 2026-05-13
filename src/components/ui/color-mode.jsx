"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export function ColorModeProvider(props) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };
  return {
    colorMode: resolvedTheme,
    toggleColorMode,
  };
}

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? light : dark;
}

export function ColorModeButton() {
  const { toggleColorMode, colorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      color={colorMode === "light" ? "gray.800" : "white"}
      _hover={{ bg: colorMode === "light" ? "gray.200" : "#1F2937" }}
    >
      {colorMode === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
    </IconButton>
  );
}
