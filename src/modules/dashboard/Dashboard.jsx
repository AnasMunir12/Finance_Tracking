"use client";

import { Box, Grid, GridItem } from "@chakra-ui/react";

import StatsCards from "./StatsCards";
import ChartCard from "../../components/ui/ChartCard";
import TransactionTable from "../../components/ui/TransactionTable";
import WalletCard from "../../components/ui/WalletCard";

export default function AdminDashboard() {
    return (
        <Box>

            {/* 1. TOP STATS */}
            <StatsCards />

            {/* 2. MIDDLE SECTION (CHART + WALLET) */}
            <Grid
                templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
                gap={6}
                mt={6}
            >
                <GridItem>
                    <ChartCard />
                </GridItem>

                <GridItem>
                    <WalletCard />
                </GridItem>
            </Grid>

            {/* 3. BOTTOM SECTION (TRANSACTIONS) */}
            <Box mt={6}>
                <TransactionTable />
            </Box>

        </Box>
    );
}