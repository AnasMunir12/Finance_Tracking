"use client";

import {
    Flex,
    Text,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";
import { ColorModeButton } from "./ui/color-mode";
import Input from "./ui/Input";

export default function Navbar({ onOpen }) {
    return (
        <Flex
            px={{ base: 4, lg: 8 }}
            py={4}
            align="center"
            justify="space-between"
            bg="rgba(255, 255, 255, 0.8)"
            _dark={{ bg: "rgba(15, 23, 42, 0.8)" }}
            backdropFilter="blur(12px)"
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
                    <FiMenu size={22} />
                </IconButton>

                <Box display={{ base: "none", md: "block" }}>
                    <Text fontWeight="800" fontSize="lg" color="mainText">
                        Overview
                    </Text>
                    <Text fontSize="xs" color="mutedText" fontWeight="500">
                        Welcome back, User!
                    </Text>
                </Box>
            </Flex>

            {/* Right */}
            <Flex align="center" gap={4}>
                <Box
                    display={{ base: "none", md: "flex" }}
                    alignItems="center"
                    w="300px"
                    position="relative"
                >
                    <Box position="absolute" left="3" zIndex="1" color="mutedText">
                        <FiSearch size={16} />
                    </Box>
                    <Input
                        placeholder="Search transactions..."
                        pl="10"
                        bg="subtleBg"
                        border="none"
                        h="10"
                        fontSize="sm"
                    />
                </Box>

                <Flex align="center" gap={2}>
                    <IconButton
                        aria-label="Notifications"
                        variant="ghost"
                        color="mutedText"
                        _hover={{ bg: "subtleBg", color: "mainText" }}
                    >
                        <FiBell size={18} />
                    </IconButton>
                    
                    <ColorModeButton />
                    
                    <Box h="8" w="1px" bg="mainBorder" mx={1} />
                    
                    <Flex align="center" gap={3} cursor="pointer" p={1} borderRadius="lg" _hover={{ bg: "subtleBg" }} transition="all 0.2s">
                        <Box
                            w="32px"
                            h="32px"
                            borderRadius="lg"
                            bg="primary"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontWeight="bold"
                            color="white"
                            fontSize="sm"
                        >
                            U
                        </Box>
                        <Box display={{ base: "none", sm: "block" }}>
                            <Text fontSize="xs" fontWeight="700" color="mainText">Anas Munir</Text>
                            <Text fontSize="10px" color="mutedText" fontWeight="500">Admin</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}