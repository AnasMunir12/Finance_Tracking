"use client";

import { 
    Box, 
    SimpleGrid, 
    Skeleton, 
    SkeletonText, 
    SkeletonCircle, 
    Flex,
    VStack
} from "@chakra-ui/react";
import Card from "./Card";

export const StatsSkeleton = () => (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
        {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
                <Flex justify="space-between" align="center" mb={3}>
                    <Skeleton h="20px" w="100px" />
                    <Skeleton h="35px" w="35px" borderRadius="8px" />
                </Flex>
                <Skeleton h="32px" w="120px" mb={2} />
                <Skeleton h="16px" w="150px" />
            </Card>
        ))}
    </SimpleGrid>
);

export const TableSkeleton = () => (
    <Card>
        <Skeleton h="24px" w="180px" mb={4} />
        <VStack spacing={4} align="stretch">
            {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} h="40px" w="100%" borderRadius="8px" />
            ))}
        </VStack>
    </Card>
);

export const ChartSkeleton = () => (
    <Card>
        <Flex justify="space-between" align="center" mb={4}>
            <Skeleton h="24px" w="150px" />
            <Skeleton h="35px" w="100px" borderRadius="6px" />
        </Flex>
        <Skeleton h="320px" w="100%" borderRadius="10px" />
    </Card>
);

export const WalletSkeleton = () => (
    <Card>
        <Skeleton h="24px" w="100px" mb={4} />
        <VStack align="stretch" spacing={4}>
            <Box p={4} bg="#111827" borderRadius="10px">
                <Skeleton h="16px" w="50px" mb={2} />
                <Skeleton h="20px" w="80px" />
            </Box>
            <Box p={4} bg="#111827" borderRadius="10px">
                <Skeleton h="16px" w="50px" mb={2} />
                <Skeleton h="20px" w="80px" />
            </Box>
        </VStack>
    </Card>
);
