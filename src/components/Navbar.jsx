"use client";

import {
    Flex,
    Text,
    Input,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { FiMenu, FiSearch } from "react-icons/fi";

export default function Navbar({ onOpen, isOpen }) {
    console.log("IsOpen:", isOpen);

    return (
        <Flex
            px={6}
            py={4}
            align="center"
            justify="space-between"
            bg="#111827"
            borderBottom="1px solid #1F2937"
            position="sticky"
            top="0"
            zIndex="500"
        >
            {/* Left */}
            <Flex align="center" gap={4}>
                <IconButton
                    aria-label="Open menu"
                    display={{ base: "flex", lg: "none" }}
                    onClick={onOpen}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "#1F2937" }}
                >
                    <FiMenu size={20} />
                </IconButton>

                <Text fontWeight="bold" fontSize="lg" color="white">
                    Dashboard
                </Text>
            </Flex>

            {/* Search */}
            <Box
                display={{ base: "none", md: "flex" }}
                alignItems="center"
                bg="#1F2937"
                px={3}
                borderRadius="10px"
                w="300px"
            >
                <FiSearch color="#9CA3AF" />
                <Input
                    placeholder="Search..."
                    border="none"
                    _focus={{ boxShadow: "none" }}
                    ml={2}
                    color="white"
                />
            </Box>

            {/* Avatar */}
            <Box
                w="35px"
                h="35px"
                borderRadius="50%"
                bg="#FACC15"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                color="black"
            >
                U
            </Box>
        </Flex>
    );
}