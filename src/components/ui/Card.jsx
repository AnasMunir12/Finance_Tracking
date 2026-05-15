"use client";

import { Box } from "@chakra-ui/react";

export default function Card({ children, ...props }) {
    return (
        <Box
            bg="cardBg"
            p={{ base: 4, md: 6 }}
            borderRadius="lg"
            border="1px solid"
            borderColor="mainBorder"
            boxShadow="soft"
            transition="all 0.2s ease-in-out"
            position="relative"
            overflow="hidden"
            _hover={{
                boxShadow: "premium",
            }}
            {...props}
        >
            {children}
        </Box>
    );
}