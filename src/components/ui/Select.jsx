"use client";

import { Box, Icon } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

export default function Select({ children, ...props }) {
    return (
        <Box position="relative" w="full">
            <select
                {...props}
                style={{
                    width: "100%",
                    padding: "10px 36px 10px 12px",
                    borderRadius: "8px",
                    backgroundColor: "var(--chakra-colors-subtleBg)",
                    border: "1px solid var(--chakra-colors-mainBorder)",
                    color: "var(--chakra-colors-mainText)",
                    appearance: "none",
                    outline: "none",
                    transition: "all 0.2s",
                    fontSize: "14px",
                    fontWeight: "500"
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = "var(--chakra-colors-primary)";
                    e.target.style.boxShadow = "0 0 0 1px var(--chakra-colors-primary)";
                    e.target.style.backgroundColor = "var(--chakra-colors-cardBg)";
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = "var(--chakra-colors-mainBorder)";
                    e.target.style.boxShadow = "none";
                    e.target.style.backgroundColor = "var(--chakra-colors-subtleBg)";
                }}
            >
                {children}
            </select>
            <Box
                position="absolute"
                right="12px"
                top="50%"
                transform="translateY(-50%)"
                pointerEvents="none"
                color="mutedText"
            >
                <FiChevronDown />
            </Box>
        </Box>
    );
}