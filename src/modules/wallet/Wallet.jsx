"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Text,
    Button,
    SimpleGrid,
    Spinner,
} from "@chakra-ui/react";

import {
    FiCreditCard,
    FiDollarSign,
    FiSmartphone,
    FiArrowUpRight,
    FiArrowDownLeft,
} from "react-icons/fi";

import StatsCard from "../../components/ui/StatsCard";
import Card from "../../components/ui/Card";

export default function Wallet() {
    const [wallet, setWallet] = useState({
        cash: 0,
        online: 0,
        balance: 0,
        income: 0,
        expense: 0,
    });

    const [isLoading, setIsLoading] = useState(true);

    // ✅ Safe formatter
    const format = (val) => Number(val || 0).toLocaleString();

    useEffect(() => {
        fetchWallet();
    }, []);

    const fetchWallet = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/wallet");
            const data = await res.json();

            setWallet({
                cash: data.cash || 0,
                online: data.online || 0,
                balance: data.balance || 0,
                income: data.income || 0,
                expense: data.expense || 0,
            });
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box w="100%">
            {/* Header */}
            <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                    My Wallet
                </Text>

                <Button
                    bg="#6366F1"
                    color="white"
                    _hover={{ bg: "#4F46E5" }}
                    onClick={fetchWallet}
                >
                    Refresh
                </Button>
            </Flex>

            {isLoading ? (
                <Flex justify="center" py={20}>
                    <Spinner size="lg" color="#6366F1" />
                </Flex>
            ) : (
                <>
                    {/* 🔥 TOP CARDS */}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} mb={8}>

                        {/* Total Balance */}
                        <Box
                            bg="linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)"
                            p={6}
                            borderRadius="16px"
                            color="white"
                            boxShadow="xl"
                        >
                            <Flex justify="space-between" mb={4}>
                                <Text fontWeight="bold">TOTAL BALANCE</Text>
                                <FiCreditCard size={22} />
                            </Flex>

                            <Text fontSize="3xl" fontWeight="bold">
                                Rs. {format(wallet.balance)}
                            </Text>

                            <Text fontSize="sm" opacity={0.7}>
                                Income - Expense
                            </Text>
                        </Box>

                        <StatsCard
                            title="Total Income"
                            value={`Rs. ${format(wallet.income)}`}
                            icon={FiArrowDownLeft}
                            isPositive={true}
                        />

                        <StatsCard
                            title="Total Expense"
                            value={`Rs. ${format(wallet.expense)}`}
                            icon={FiArrowUpRight}
                            isPositive={false}
                        />

                        <StatsCard
                            title="Cash Balance"
                            value={`Rs. ${format(wallet.cash)}`}
                            icon={FiDollarSign}
                            isPositive={true}
                        />

                        <StatsCard
                            title="Online Balance"
                            value={`Rs. ${format(wallet.online)}`}
                            icon={FiSmartphone}
                            isPositive={true}
                        />
                    </SimpleGrid>

                    {/* Insight */}
                    <Card p={6}>
                        <Text fontWeight="bold" color="white" mb={4}>
                            Wallet Insight
                        </Text>

                        <Flex direction="column" gap={3}>
                            <Flex justify="space-between">
                                <Text color="#9CA3AF">Income</Text>
                                <Text color="#22C55E">
                                    + Rs. {format(wallet.income)}
                                </Text>
                            </Flex>

                            <Flex justify="space-between">
                                <Text color="#9CA3AF">Expense</Text>
                                <Text color="#EF4444">
                                    - Rs. {format(wallet.expense)}
                                </Text>
                            </Flex>

                            <Flex justify="space-between" pt={3} borderTop="1px solid #1F2937">
                                <Text color="white" fontWeight="bold">
                                    Net Balance
                                </Text>
                                <Text
                                    fontWeight="bold"
                                    color={
                                        wallet.balance >= 0 ? "#22C55E" : "#EF4444"
                                    }
                                >
                                    Rs. {format(wallet.balance)}
                                </Text>
                            </Flex>
                        </Flex>
                    </Card>
                </>
            )}
        </Box>
    );
}