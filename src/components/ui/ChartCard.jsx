"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import Card from "./Card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { useState } from "react";
import { ChartSkeleton } from "./LoadingSkeletons";
import { useColorModeValue } from "./color-mode";

export default function ChartCard({ chartData, isLoading }) {
    const [type, setType] = useState("income");

    if (isLoading && !chartData) return <ChartSkeleton />;

    return (
        <Card>

            {/* HEADER */}
            <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="lg" fontWeight="bold" color="mainText">
                    Financial Overview
                </Text>

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{
                        background: useColorModeValue("#FFFFFF", "#111827"),
                        color: useColorModeValue("#111827", "#FFFFFF"),
                        border: "1px solid",
                        borderColor: useColorModeValue("#E5E7EB", "#374151"),
                        padding: "6px 10px",
                        borderRadius: "6px",
                        outline: "none",
                        fontSize: "14px"
                    }}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

            </Flex>

            {/* CHART */}
            <Box h="320px">
                {chartData?.length === 0 ? (
                    <Flex h="100%" align="center" justify="center">
                        <Text color="gray.500">Not enough data to display chart.</Text>
                    </Flex>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart data={chartData}>

                            <CartesianGrid strokeDasharray="3 3" stroke={useColorModeValue("#E5E7EB", "#2D3748")} vertical={false} />

                            <XAxis 
                                dataKey="month" 
                                stroke={useColorModeValue("#6B7280", "#A0AEC0")} 
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis 
                                stroke={useColorModeValue("#6B7280", "#A0AEC0")} 
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `Rs.${val > 999 ? (val / 1000).toFixed(1) + 'k' : val}`}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: useColorModeValue("#FFFFFF", "#1F2937"),
                                    border: "none",
                                    borderRadius: "8px",
                                    color: useColorModeValue("#111827", "#FFFFFF"),
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                                }}
                                formatter={(val) => [`Rs. ${val.toLocaleString()}`, type === "income" ? "Income" : "Expense"]}
                            />

                            <Line
                                type="monotone"
                                dataKey={type}
                                stroke={type === "income" ? "#22C55E" : "#EF4444"}
                                strokeWidth={3}
                                dot={{ fill: type === "income" ? "#22C55E" : "#EF4444", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                                animationDuration={1000}
                            />

                        </LineChart>

                    </ResponsiveContainer>
                )}
            </Box>

        </Card>
    );
}