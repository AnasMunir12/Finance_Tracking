"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import Card from "./Card";
import Select from "./Select";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";
import { useState } from "react";
import { ChartSkeleton } from "./LoadingSkeletons";
import { useColorModeValue } from "./color-mode";

export default function ChartCard({ chartData, isLoading }) {
    const [type, setType] = useState("income");

    if (isLoading && !chartData) return <ChartSkeleton />;

    const primaryColor = type === "income" ? "#22C55E" : "#EF4444";

    return (
        <Card>
            {/* HEADER */}
            <Flex justify="space-between" align="center" mb={8}>
                <Box>
                    <Text fontSize="lg" fontWeight="bold" color="mainText">
                        Financial Overview
                    </Text>
                    <Text fontSize="xs" color="mutedText" fontWeight="500">
                        Visualizing your cash flow over time
                    </Text>
                </Box>

                <Box w="140px">
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </Select>
                </Box>
            </Flex>

            {/* CHART */}
            <Box h="320px" ml="-20px">
                {chartData?.length === 0 ? (
                    <Flex h="100%" align="center" justify="center">
                        <Text color="dimText" fontSize="sm">Not enough data to display chart.</Text>
                    </Flex>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={primaryColor} stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke={useColorModeValue("#E2E8F0", "#1E293B")} 
                                vertical={false} 
                            />
                            <XAxis 
                                dataKey="month" 
                                stroke={useColorModeValue("#94A3B8", "#64748B")} 
                                fontSize={10}
                                fontWeight="600"
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis 
                                stroke={useColorModeValue("#94A3B8", "#64748B")} 
                                fontSize={10}
                                fontWeight="600"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `Rs.${val > 999 ? (val / 1000).toFixed(1) + 'k' : val}`}
                            />
                            <Tooltip
                                cursor={{ stroke: primaryColor, strokeWidth: 1 }}
                                contentStyle={{
                                    backgroundColor: useColorModeValue("#FFFFFF", "#1E293B"),
                                    border: "1px solid var(--chakra-colors-mainBorder)",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                    boxShadow: "var(--chakra-shadows-premium)"
                                }}
                                itemStyle={{ fontWeight: "bold", color: "var(--chakra-colors-mainText)" }}
                                formatter={(val) => [`Rs. ${val.toLocaleString()}`, type === "income" ? "Income" : "Expense"]}
                            />
                            <Area
                                type="monotone"
                                dataKey={type}
                                stroke={primaryColor}
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </Box>
        </Card>
    );
}