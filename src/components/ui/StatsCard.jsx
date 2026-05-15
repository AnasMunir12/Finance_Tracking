"use client";

import { Flex, Text, Icon, Box } from "@chakra-ui/react";
import Card from "./Card";

export default function StatsCard({
    title,
    amount,
    icon,
    color = "primary",
    change,
    value,
    trend,
    isPositive,
}) {
    const displayValue = value !== undefined ? value : `Rs. ${amount?.toLocaleString()}`;
    const trendText = trend !== undefined ? trend : (change > 0 ? `+${change}%` : `${change}%`);
    const trendColor = isPositive !== undefined ? (isPositive ? "green.500" : "red.500") : (change > 0 ? "green.500" : "red.500");
    
    return (
        <Card p={5}>
            <Flex justify="space-between" align="start" mb={4}>
                <Box>
                    <Text color="mutedText" fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="wider">
                        {title}
                    </Text>
                    <Text fontSize="2xl" fontWeight="800" mt={1} color="mainText">
                        {displayValue}
                    </Text>
                </Box>
                <Flex
                    bg="subtleBg"
                    p={2.5}
                    borderRadius="lg"
                    align="center"
                    justify="center"
                    color={color}
                    border="1px solid"
                    borderColor="mainBorder"
                >
                    <Icon as={icon} fontSize="lg" />
                </Flex>
            </Flex>

            <Flex align="center" gap={1.5}>
                <Box 
                    px={1.5} 
                    py={0.5} 
                    borderRadius="md" 
                    bg={trendColor === "green.500" ? "green.50" : "red.50"}
                    _dark={{ bg: trendColor === "green.500" ? "green.950" : "red.950" }}
                >
                    <Text fontSize="xs" fontWeight="700" color={trendColor}>
                        {trendText}
                    </Text>
                </Box>
                <Text fontSize="xs" color="dimText" fontWeight="500">
                    from last month
                </Text>
            </Flex>
        </Card>
    );
}