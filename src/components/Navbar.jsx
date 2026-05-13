"use client";

import {
    Flex,
    Text,
    Input,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { FiMenu, FiSearch } from "react-icons/fi";
import { ColorModeButton } from "./ui/color-mode";

export default function Navbar({ onOpen, isOpen }) {
    console.log("IsOpen:", isOpen);

    return (
        <Flex
            px={6}
            py={4}
            align="center"
            justify="space-between"
            bg="cardBg"
            borderBottom="1px solid"
            borderColor="mainBorder"
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
                    color="mainText"
                    _hover={{ bg: "subtleBg" }}
                >
                    <FiMenu size={20} />
                </IconButton>

                <Text fontWeight="bold" fontSize="lg" color="mainText">
                    Dashboard
                </Text>
            </Flex>

            {/* Search */}
            <Box
                display={{ base: "none", md: "flex" }}
                alignItems="center"
                bg="subtleBg"
                px={3}
                borderRadius="10px"
                w="300px"
            >
                <FiSearch color="mutedText" />
                <Input
                    placeholder="Search..."
                    border="none"
                    _focus={{ boxShadow: "none" }}
                    ml={2}
                    color="mainText"
                />
            </Box>

            {/* Avatar & Theme Toggle */}
            <Flex align="center" gap={3}>
                <ColorModeButton />
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
        </Flex>
    );
}