"use client";

import { Button as ChakraButton } from "@chakra-ui/react";

export default function Button({ children, ...props }) {
    return (
        <ChakraButton
            borderRadius="md"
            fontWeight="600"
            px={6}
            h="10"
            transition="all 0.2s"
            _active={{ transform: "scale(0.98)" }}
            {...props}
        >
            {children}
        </ChakraButton>
    );
}