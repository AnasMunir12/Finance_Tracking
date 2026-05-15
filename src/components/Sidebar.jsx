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
    FiPieChart,
} from "react-icons/fi";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Dashboard", icon: FiHome, path: "/admin" },
    { name: "Transactions", icon: FiDollarSign, path: "/admin/transactions" },
    { name: "Payable", icon: FiTrendingDown, path: "/admin/payable" },
    { name: "Receivable", icon: FiTrendingUp, path: "/admin/receivable" },
    { name: "Expense", icon: FiPieChart, path: "/admin/expense" },
    { name: "Wallet", icon: FiCreditCard, path: "/admin/wallet" },
];

export default function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname();

    const NavItem = ({ link, onClick }) => {
        const isActive = pathname === link.path;
        return (
            <Link href={link.path} style={{ width: "100%" }}>
                <Flex
                    align="center"
                    gap={3}
                    px={4}
                    py={3}
                    borderRadius="lg"
                    bg={isActive ? "primary" : "transparent"}
                    color={isActive ? "white" : "mutedText"}
                    _hover={!isActive ? { bg: "subtleBg", color: "mainText" } : {}}
                    transition="all 0.2s"
                    cursor="pointer"
                    onClick={onClick}
                >
                    <Icon as={link.icon} fontSize="lg" />
                    <Text fontWeight={isActive ? "700" : "600"} fontSize="sm">
                        {link.name}
                    </Text>
                </Flex>
            </Link>
        );
    };

    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <Box
                display={{ base: "none", lg: "block" }}
                w="260px"
                h="100vh"
                bg="cardBg"
                p={6}
                position="fixed"
                borderRight="1px solid"
                borderColor="mainBorder"
                zIndex="1000"
            >
                <Flex align="center" gap={2} mb={10} px={2}>
                    <Box w="32px" h="32px" bg="primary" borderRadius="md" display="flex" align="center" justify="center" color="white" fontWeight="bold">H</Box>
                    <Text color="mainText" fontWeight="800" fontSize="xl" letterSpacing="tight">
                        HisabKitab
                    </Text>
                </Flex>

                <VStack align="stretch" gap={1}>
                    {links.map((link) => (
                        <NavItem key={link.name} link={link} />
                    ))}
                </VStack>

                <Box position="absolute" bottom="8" left="6" right="6">
                    <Box p={4} bg="subtleBg" borderRadius="xl" border="1px solid" borderColor="mainBorder">
                        <Text fontSize="xs" fontWeight="700" color="mainText" mb={1}>Pro Plan</Text>
                        <Text fontSize="10px" color="mutedText" mb={3}>Get advanced analytics and insights.</Text>
                        <Box h="1.5" bg="mainBorder" borderRadius="full" overflow="hidden">
                            <Box w="60%" h="full" bg="primary" />
                        </Box>
                    </Box>
                </Box>
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
                    <Drawer.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
                    <Drawer.Positioner>
                        <Drawer.Content bg="cardBg" w="280px" h="100dvh" p={6} borderRight="1px solid" borderColor="mainBorder">
                            <Drawer.Header px={0} mb={8}>
                                <Flex justify="space-between" align="center">
                                    <Flex align="center" gap={2}>
                                        <Box w="32px" h="32px" bg="primary" borderRadius="md" display="flex" align="center" justify="center" color="white" fontWeight="bold">H</Box>
                                        <Text fontSize="xl" fontWeight="800" color="mainText">HisabKitab</Text>
                                    </Flex>
                                    <IconButton
                                        aria-label="Close"
                                        variant="ghost"
                                        size="sm"
                                        onClick={onClose}
                                    >
                                        <FiX size={20} />
                                    </IconButton>
                                </Flex>
                            </Drawer.Header>

                            <Drawer.Body px={0}>
                                <VStack align="stretch" gap={1}>
                                    {links.map((link) => (
                                        <NavItem key={link.name} link={link} onClick={onClose} />
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