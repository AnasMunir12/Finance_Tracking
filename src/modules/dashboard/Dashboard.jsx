"use client";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";

import StatsCards from "./StatsCards";
import ChartCard from "../../components/ui/ChartCard";
import TransactionTable from "../../components/ui/TransactionTable";
import WalletCard from "../../components/ui/WalletCard";
import { 
    StatsSkeleton, 
    TableSkeleton, 
    ChartSkeleton, 
    WalletSkeleton 
} from "../../components/ui/LoadingSkeletons";

export default function AdminDashboard() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/dashboard", { cache: "no-store" });
            if (!res.ok) throw new Error("Failed to fetch dashboard data");
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error("Dashboard Fetch Error:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();

        // Listen for transaction/ledger updates to refresh data
        const handleRefresh = () => fetchDashboardData();
        window.addEventListener("refreshDashboard", handleRefresh);
        return () => window.removeEventListener("refreshDashboard", handleRefresh);
    }, [fetchDashboardData]);

    if (isLoading && !data) {
        return (
            <Box>
                <StatsSkeleton />
                <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mt={6}>
                    <GridItem><ChartSkeleton /></GridItem>
                    <GridItem><WalletSkeleton /></GridItem>
                </Grid>
                <Box mt={6}><TableSkeleton /></Box>
            </Box>
        );
    }

    return (
        <Box>
            {/* 1. TOP STATS */}
            <StatsCards stats={data?.stats} isLoading={isLoading} />

            {/* 2. MIDDLE SECTION (CHART + WALLET) */}
            <Grid
                templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
                gap={6}
                mt={6}
            >
                <GridItem>
                    <ChartCard chartData={data?.chartData} isLoading={isLoading} />
                </GridItem>

                <GridItem>
                    <WalletCard stats={data?.stats} isLoading={isLoading} />
                </GridItem>
            </Grid>

            {/* 3. BOTTOM SECTION (TRANSACTIONS) */}
            <Box mt={6}>
                <TransactionTable transactions={data?.recentTransactions} isLoading={isLoading} />
            </Box>

        </Box>
    );
}