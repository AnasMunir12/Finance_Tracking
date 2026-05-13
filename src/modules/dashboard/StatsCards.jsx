"use client";

import { SimpleGrid } from "@chakra-ui/react";
import StatsCard from "../../components/ui/StatsCard";
import {
    FiDollarSign,
    FiTrendingUp,
    FiTrendingDown,
} from "react-icons/fi";
import { StatsSkeleton } from "../../components/ui/LoadingSkeletons";

export default function StatsCards({ stats, isLoading }) {
    if (isLoading && !stats) return <StatsSkeleton />;

    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
            <StatsCard
                title="Total Balance"
                amount={stats?.balance?.toLocaleString() || "0"}
                icon={FiDollarSign}
                color="#FACC15"
                change={0}
                trend="Current available balance"
            />

            <StatsCard
                title="You Will Receive"
                amount={stats?.receivable?.toLocaleString() || "0"}
                icon={FiTrendingUp}
                color="#22C55E"
                change={0}
                trend="Pending receivables"
            />

            <StatsCard
                title="You Will Pay"
                amount={stats?.payable?.toLocaleString() || "0"}
                icon={FiTrendingDown}
                color="#EF4444"
                change={0}
                trend="Pending payables"
            />

            <StatsCard
                title="Net Balance"
                amount={stats?.netBalance?.toLocaleString() || "0"}
                icon={FiDollarSign}
                color="#6366F1"
                change={0}
                trend="Balance after all settlements"
            />
        </SimpleGrid>
    );
}