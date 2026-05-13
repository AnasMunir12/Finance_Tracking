"use client";

import { Box } from "@chakra-ui/react";

export default function Card({ children, ...props }) {
    return (
        <Box
            bg="cardBg"
            p={5}
            borderRadius="lg"
            border="1px solid"
            borderColor="mainBorder"
            boxShadow="sm"
            transition="all 0.3s"
            _hover={{
                transform: "translateY(-4px)",
                boxShadow: "md",
            }}
            {...props}
        >
            {children}
        </Box>
    );
}