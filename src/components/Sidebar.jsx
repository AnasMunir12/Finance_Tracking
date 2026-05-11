"use client";

import {
    Drawer,
    Portal,
    Box,
    VStack,
    Text,
    Flex,
    Icon,
    IconButton,
} from "@chakra-ui/react";

import {
    FiHome,
    FiDollarSign,
    FiTrendingDown,
    FiTrendingUp,
    FiCreditCard,
    FiX,
} from "react-icons/fi";

import Link from "next/link";

const links = [
    { name: "Dashboard", icon: FiHome, path: "/admin" },
    { name: "Transactions", icon: FiDollarSign, path: "/admin/transactions" },
    { name: "Payable", icon: FiTrendingDown, path: "/admin/payable" },
    { name: "Receivable", icon: FiTrendingUp, path: "/admin/receivable" },
    { name: "Expense", icon: FiCreditCard, path: "/admin/expense" },
    { name: "Wallet", icon: FiCreditCard, path: "/admin/wallet" },

];

export default function Sidebar({ isOpen, onClose }) {
    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <Box
                display={{ base: "none", lg: "block" }}
                w="250px"
                h="100vh"
                bg="#111827"
                p={5}
                position="fixed"
            >
                <Text color="white" fontWeight="bold" mb={6}>
                    HisabKitab
                </Text>

                <VStack align="start">
                    {links.map((link) => (
                        <Link key={link.name} href={link.path}>
                            <Flex gap={3} p={2} color="white">
                                <Icon as={link.icon} />
                                <Text>{link.name}</Text>
                            </Flex>
                        </Link>
                    ))}
                </VStack>
            </Box>

            {/* MOBILE DRAWER */}
            <Drawer.Root
                placement="start"
                open={isOpen}
                onOpenChange={(details) => {
                    if (!details.open) onClose();
                }}
            >
                <Portal>
                    <Drawer.Backdrop bg="rgba(0, 0, 0, 0.6)" position="fixed" top="0" left="0" w="100vw" h="100dvh" zIndex="1300" backdropFilter="blur(2px)" />
                    <Drawer.Positioner zIndex="1400" position="fixed" top="0" left="0" w="100vw" h="100dvh" display="flex" justifyContent="flex-start">
                        <Drawer.Content bg="#111827" w="280px" h="100dvh" p={5} boxShadow="2xl" borderRight="1px solid #1F2937">
                            <Drawer.Header color="white" mb={6} px={0}>
                                <Flex justify="space-between" align="center" w="full">
                                    <Text fontSize="xl" fontWeight="bold">HisabKitab</Text>
                                    <IconButton
                                        aria-label="Close menu"
                                        variant="ghost"
                                        color="white"
                                        _hover={{ bg: "whiteAlpha.200" }}
                                        onClick={onClose}
                                        size="sm"
                                    >
                                        <FiX size={18} />
                                    </IconButton>
                                </Flex>
                            </Drawer.Header>

                            <Drawer.Body px={0}>
                                <VStack align="start">
                                    {links.map((link) => (
                                        <Link key={link.name} href={link.path}>
                                            <Flex
                                                gap={3}
                                                p={3}
                                                color="white"
                                                onClick={onClose}
                                                _hover={{ color: "#FACC15" }}
                                            >
                                                <Icon as={link.icon} />
                                                <Text>{link.name}</Text>
                                            </Flex>
                                        </Link>
                                    ))}
                                </VStack>
                            </Drawer.Body>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </>
    );
}