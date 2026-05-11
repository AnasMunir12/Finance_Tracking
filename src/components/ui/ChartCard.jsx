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

const monthlyData = [
    { month: "Jan", income: 40000, expense: 25000 },
    { month: "Feb", income: 42000, expense: 30000 },
    { month: "Mar", income: 38000, expense: 22000 },
    { month: "Apr", income: 50000, expense: 28000 },
    { month: "May", income: 55000, expense: 35000 },
];

export default function ChartCard() {
    const [type, setType] = useState("income");

    return (
        <Card>

            {/* HEADER */}
            <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                    Financial Overview
                </Text>

                {/* FIXED SELECT (NO CHAKRA SELECT) */}
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{
                        background: "#111827",
                        color: "white",
                        border: "1px solid #374151",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        outline: "none",
                    }}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

            </Flex>

            {/* CHART */}
            <Box h="320px">
                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={monthlyData}>

                        <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />

                        <XAxis dataKey="month" stroke="#A0AEC0" />

                        <YAxis stroke="#A0AEC0" />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1F2937",
                                border: "none",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey={type}
                            stroke={type === "income" ? "#22C55E" : "#EF4444"}
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>
            </Box>

        </Card>
    );
}