"use client";

import { 
    Box, 
    SimpleGrid, 
    Skeleton, 
    Flex,
    VStack,
    Stack
} from "@chakra-ui/react";
import Card from "./Card";

export const StatsSkeleton = () => (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
        {[1, 2, 3, 4].map((i) => (
            <Card key={i} p={5}>
                <Flex justify="space-between" align="start" mb={4}>
                    <VStack align="start" gap={2} flex="1">
                        <Skeleton h="12px" w="40%" borderRadius="full" />
                        <Skeleton h="28px" w="70%" borderRadius="md" />
                    </VStack>
                    <Skeleton h="40px" w="40px" borderRadius="lg" />
                </Flex>
                <Skeleton h="10px" w="60%" borderRadius="full" />
            </Card>
        ))}
    </SimpleGrid>
);

export const TableSkeleton = () => (
    <Card p={0}>
        <Box p={6} borderBottom="1px solid" borderColor="mainBorder">
            <Skeleton h="24px" w="200px" mb={2} borderRadius="md" />
            <Skeleton h="12px" w="150px" borderRadius="full" />
        </Box>
        <Box p={4}>
            <VStack gap={4} align="stretch">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} h="48px" w="100%" borderRadius="md" />
                ))}
            </VStack>
        </Box>
    </Card>
);

export const ChartSkeleton = () => (
    <Card p={6}>
        <Flex justify="space-between" mb={8}>
            <VStack align="start" gap={2}>
                <Skeleton h="20px" w="180px" borderRadius="md" />
                <Skeleton h="12px" w="120px" borderRadius="full" />
            </VStack>
            <Skeleton h="40px" w="140px" borderRadius="md" />
        </Flex>
        <Skeleton h="300px" w="100%" borderRadius="lg" />
    </Card>
);

export const WalletSkeleton = () => (
    <Card p={6}>
        <Skeleton h="24px" w="100px" mb={6} borderRadius="md" />
        <VStack align="stretch" gap={4}>
            <Skeleton h="70px" w="100%" borderRadius="lg" />
            <Skeleton h="70px" w="100%" borderRadius="lg" />
        </VStack>
    </Card>
);
