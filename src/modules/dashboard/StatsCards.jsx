"use client";

import { SimpleGrid } from "@chakra-ui/react";
import StatsCard from "../../components/ui/StatsCard";
import {
    FiDollarSign,
    FiTrendingUp,
    FiTrendingDown,
    FiBriefcase,
} from "react-icons/fi";
import { StatsSkeleton } from "../../components/ui/LoadingSkeletons";

export default function StatsCards({ stats, isLoading }) {
    if (isLoading && !stats) return <StatsSkeleton />;

    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
            <StatsCard
                title="Total Balance"
                amount={stats?.balance || 0}
                icon={FiDollarSign}
                color="accent.500"
                change={12}
                isPositive={true}
            />

            <StatsCard
                title="You Will Receive"
                amount={stats?.receivable || 0}
                icon={FiTrendingUp}
                color="green.500"
                change={5}
                isPositive={true}
            />

            <StatsCard
                title="You Will Pay"
                amount={stats?.payable || 0}
                icon={FiTrendingDown}
                color="red.500"
                change={-2}
                isPositive={false}
            />

            <StatsCard
                title="Net Balance"
                amount={stats?.netBalance || 0}
                icon={FiBriefcase}
                color="primary"
                change={8}
                isPositive={true}
            />
        </SimpleGrid>
    );
}