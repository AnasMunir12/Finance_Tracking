"use client";

import { Box, Text } from "@chakra-ui/react";
import Card from "./Card";

const data = [
    { title: "Salary", type: "Income", amount: 50000, date: "2026-05-01" },
    { title: "Rent", type: "Expense", amount: 15000, date: "2026-05-02" },
    { title: "Freelance", type: "Income", amount: 20000, date: "2026-05-03" },
];

export default function TransactionTable() {
    return (
        <Card>

            <Text fontSize="lg" mb={4} fontWeight="bold">
                Recent Transactions
            </Text>

            <Box overflowX="auto">

                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "white"
                }}>

                    <thead>
                        <tr style={{ textAlign: "left", borderBottom: "1px solid #374151" }}>
                            <th style={{ padding: "10px" }}>Title</th>
                            <th style={{ padding: "10px" }}>Type</th>
                            <th style={{ padding: "10px" }}>Amount</th>
                            <th style={{ padding: "10px" }}>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, i) => (
                            <tr
                                key={i}
                                style={{
                                    borderBottom: "1px solid #1F2937"
                                }}
                            >
                                <td style={{ padding: "10px" }}>{item.title}</td>

                                <td style={{
                                    padding: "10px",
                                    color: item.type === "Income" ? "#22C55E" : "#EF4444"
                                }}>
                                    {item.type}
                                </td>

                                <td style={{ padding: "10px" }}>
                                    Rs. {item.amount}
                                </td>

                                <td style={{ padding: "10px", color: "#9CA3AF" }}>
                                    {item.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </Box>

        </Card>
    );
}