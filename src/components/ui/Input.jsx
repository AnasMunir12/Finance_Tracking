"use client";

import { Input as ChakraInput } from "@chakra-ui/react";

export default function Input({ ...props }) {
    return (
        <ChakraInput
            bg="subtleBg"
            border="1px solid"
            borderColor="mainBorder"
            borderRadius="md"
            _focus={{
                borderColor: "primary",
                boxShadow: "0 0 0 1px {colors.primary}",
                bg: "cardBg",
            }}
            _placeholder={{ color: "dimText" }}
            transition="all 0.2s"
            {...props}
        />
    );
}