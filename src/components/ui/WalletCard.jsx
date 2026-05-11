"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import Card from "./Card";

export default function WalletCard() {
    return (
        <Card>
            <Text fontSize="lg" mb={4} fontWeight="bold">
                Wallets
            </Text>

            <VStack align="stretch" spacing={4}>

                <Box p={4} bg="#111827" borderRadius="10px">
                    <Text fontSize="sm" color="gray.400">Cash</Text>
                    <Text fontWeight="bold">Rs. 12,500</Text>
                </Box>

                <Box p={4} bg="#111827" borderRadius="10px">
                    <Text fontSize="sm" color="gray.400">Bank</Text>
                    <Text fontWeight="bold">Rs. 30,000</Text>
                </Box>

            </VStack>
        </Card>
    );
}