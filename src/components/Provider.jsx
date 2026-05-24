"use client";

import { ChakraProvider } from "@chakra-ui/react";
import system from "../theme";
import { ColorModeProvider } from "./ui/color-mode";
import { SessionProvider } from "next-auth/react";

export function Provider({ children }) {
    return (
        <SessionProvider>
            <ChakraProvider value={system}>
                <ColorModeProvider>
                    {children}
                </ColorModeProvider>
            </ChakraProvider>
        </SessionProvider>
    );
}