"use client";

import { SimpleGrid, Skeleton, Box } from "@chakra-ui/react";
import StatsCard from "../../components/ui/StatsCard";
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from "react-icons/fi";

export default function TransactionsSummary({ data = [], isLoading = false }) {
    const totalIncome = data.filter(d => d.type?.toLowerCase() === "income").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const totalExpense = data.filter(d => d.type?.toLowerCase() === "expense").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const netBalance = totalIncome - totalExpense;

    if (isLoading) {
        return (
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={6}>
                <Skeleton height="140px" borderRadius="10px" />
                <Skeleton height="140px" borderRadius="10px" />
                <Skeleton height="140px" borderRadius="10px" />
            </SimpleGrid>
        );
    }

    return (
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={6}>
            <StatsCard
                title="Total Income"
                value={`Rs. ${totalIncome.toLocaleString()}`}
                icon={FiTrendingUp}
                color="#22C55E"
                trend="Filtered Income"
                isPositive={true}
            />
            <StatsCard
                title="Total Expense"
                value={`Rs. ${totalExpense.toLocaleString()}`}
                icon={FiTrendingDown}
                color="#EF4444"
                trend="Filtered Expense"
                isPositive={false}
            />
            <StatsCard
                title="Net Balance"
                value={`Rs. ${netBalance.toLocaleString()}`}
                icon={FiDollarSign}
                color="#6366F1"
                trend="Filtered Net"
                isPositive={netBalance >= 0}
            />
        </SimpleGrid>
    );
}
