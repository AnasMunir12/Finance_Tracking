"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import Card from "./Card";
import { WalletSkeleton } from "./LoadingSkeletons";

export default function WalletCard({ stats, isLoading }) {
    if (isLoading && !stats) return <WalletSkeleton />;

    return (
        <Card>
            <Text fontSize="lg" mb={4} fontWeight="bold" color="mainText">
                Wallets
            </Text>

            <VStack align="stretch" spacing={4}>

                <Box p={4} bg="subtleBg" borderRadius="10px">
                    <Text fontSize="sm" color="mutedText">Cash Wallet</Text>
                    <Text fontWeight="bold" fontSize="lg" color="mainText">Rs. {stats?.cash?.toLocaleString() || "0"}</Text>
                </Box>

                <Box p={4} bg="subtleBg" borderRadius="10px">
                    <Text fontSize="sm" color="mutedText">Online / Bank</Text>
                    <Text fontWeight="bold" fontSize="lg" color="mainText">Rs. {stats?.online?.toLocaleString() || "0"}</Text>
                </Box>

            </VStack>
        </Card>
    );
}