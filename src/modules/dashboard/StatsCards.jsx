"use client";

import { SimpleGrid } from "@chakra-ui/react";
import StatsCard from "../../components/ui/StatsCard";
import {
    FiDollarSign,
    FiTrendingUp,
    FiTrendingDown,
} from "react-icons/fi";

export default function StatsCards() {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
            <StatsCard
                title="Total Balance"
                amount="45,680"
                icon={FiDollarSign}
                color="#FACC15"
                change={12.5}
            />

            <StatsCard
                title="You Will Receive"
                amount="18,540"
                icon={FiTrendingUp}
                color="#22C55E"
                change={8.3}
            />

            <StatsCard
                title="You Will Pay"
                amount="7,860"
                icon={FiTrendingDown}
                color="#EF4444"
                change={-4.2}
            />

            <StatsCard
                title="Net Balance"
                amount="56,360"
                icon={FiDollarSign}
                color="#6366F1"
                change={10.1}
            />
        </SimpleGrid>
    );
}