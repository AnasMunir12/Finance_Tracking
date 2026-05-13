"use client";

import { ChakraProvider } from "@chakra-ui/react";
import system from "../theme";
import { ColorModeProvider } from "./ui/color-mode";

export function Provider({ children }) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider>
                {children}
            </ColorModeProvider>
        </ChakraProvider>
    );
}