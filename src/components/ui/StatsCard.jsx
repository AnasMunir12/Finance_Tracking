"use client";

import { Flex, Text, Icon } from "@chakra-ui/react";
import Card from "./Card";

export default function StatsCard({
    title,
    amount,
    icon,
    color = "#FACC15",
    change,
    value,
    trend,
    isPositive,
}) {
    const displayValue = value !== undefined ? value : `Rs. ${amount}`;
    const trendText = trend !== undefined ? trend : (change > 0 ? `+${change}% from last month` : `${change}% from last month`);
    const trendColor = isPositive !== undefined ? (isPositive ? "green.400" : "red.400") : (change > 0 ? "green.400" : "red.400");
    return (
        <Card>
            <Flex justify="space-between" align="center" mb={3}>
                <Text color="mutedText" fontSize="sm" fontWeight="medium">
                    {title}
                </Text>
                <Flex
                    bg={color}
                    p={2}
                    borderRadius="8px"
                    align="center"
                    justify="center"
                >
                    <Icon as={icon} color="black" />
                </Flex>
            </Flex>

            <Text fontSize="2xl" fontWeight="bold" mb={2} color="mainText">
                {displayValue}
            </Text>

            <Text fontSize="sm" color={trendColor}>
                {trendText}
            </Text>
        </Card>
    );
}