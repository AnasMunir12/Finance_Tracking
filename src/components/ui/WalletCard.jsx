"use client";

import { Box, Text, VStack, Flex, Icon } from "@chakra-ui/react";
import Card from "./Card";
import { WalletSkeleton } from "./LoadingSkeletons";
import { FiDollarSign, FiGlobe } from "react-icons/fi";

export default function WalletCard({ stats, isLoading }) {
    if (isLoading && !stats) return <WalletSkeleton />;

    return (
        <Card>
            <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="lg" fontWeight="bold" color="mainText">
                    Wallets
                </Text>
                <Text fontSize="xs" color="primary" fontWeight="700" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                    View All
                </Text>
            </Flex>

            <VStack align="stretch" spacing={4}>
                <Box 
                    p={4} 
                    bg="subtleBg" 
                    borderRadius="lg" 
                    border="1px solid" 
                    borderColor="mainBorder"
                    transition="all 0.2s"
                    _hover={{ borderColor: "primary", transform: "translateX(4px)" }}
                >
                    <Flex align="center" gap={3}>
                        <Box p={2} bg="cardBg" borderRadius="md" color="primary" border="1px solid" borderColor="mainBorder">
                            <FiDollarSign size={16} />
                        </Box>
                        <Box>
                            <Text fontSize="xs" fontWeight="700" color="mutedText" textTransform="uppercase" letterSpacing="wider">Cash Wallet</Text>
                            <Text fontWeight="800" fontSize="xl" color="mainText">Rs. {stats?.cash?.toLocaleString() || "0"}</Text>
                        </Box>
                    </Flex>
                </Box>

                <Box 
                    p={4} 
                    bg="subtleBg" 
                    borderRadius="lg" 
                    border="1px solid" 
                    borderColor="mainBorder"
                    transition="all 0.2s"
                    _hover={{ borderColor: "primary", transform: "translateX(4px)" }}
                >
                    <Flex align="center" gap={3}>
                        <Box p={2} bg="cardBg" borderRadius="md" color="accent.500" border="1px solid" borderColor="mainBorder">
                            <FiGlobe size={16} />
                        </Box>
                        <Box>
                            <Text fontSize="xs" fontWeight="700" color="mutedText" textTransform="uppercase" letterSpacing="wider">Online / Bank</Text>
                            <Text fontWeight="800" fontSize="xl" color="mainText">Rs. {stats?.online?.toLocaleString() || "0"}</Text>
                        </Box>
                    </Flex>
                </Box>
            </VStack>
        </Card>
    );
}