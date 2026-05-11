"use client";

import { Box } from "@chakra-ui/react";

export default function Card({ children, ...props }) {
    return (
        <Box
            bg="#1F2937"
            p={5}
            borderRadius="14px"
            boxShadow="0 4px 20px rgba(0,0,0,0.3)"
            transition="0.3s"
            _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
            {...props}
        >
            {children}
        </Box>
    );
}