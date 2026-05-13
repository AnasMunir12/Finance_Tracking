"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import Card from "./Card";
import { TableSkeleton } from "./LoadingSkeletons";
import { useColorModeValue } from "./color-mode";

export default function TransactionTable({ transactions, isLoading }) {
    if (isLoading && !transactions) return <TableSkeleton />;

    return (
        <Card>

            <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="lg" fontWeight="bold" color="mainText">
                    Recent Transactions
                </Text>
                <Text fontSize="sm" color="mutedText">
                    Latest {transactions?.length || 0} activities
                </Text>
            </Flex>

            <Box overflowX="auto">

                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "inherit",
                    minWidth: "600px"
                }}>

                    <thead>
                        <tr style={{ textAlign: "left", borderBottom: `1px solid ${useColorModeValue("#E5E7EB", "#374151")}` }}>
                            <th style={{ padding: "12px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>Title</th>
                            <th style={{ padding: "12px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>Category</th>
                            <th style={{ padding: "12px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>Wallet</th>
                            <th style={{ padding: "12px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>Amount</th>
                            <th style={{ padding: "12px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions?.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>
                                    No recent transactions found.
                                </td>
                            </tr>
                        ) : (
                            transactions?.map((item) => (
                                <tr
                                    key={item._id}
                                    style={{
                                        borderBottom: `1px solid ${useColorModeValue("#F3F4F6", "#1F2937")}`,
                                        transition: "background 0.2s"
                                    }}
                                >
                                    <td style={{ padding: "12px" }}>
                                        <Text fontWeight="semibold" color="mainText">{item.title}</Text>
                                    </td>

                                    <td style={{ padding: "12px", color: useColorModeValue("#4B5563", "#9CA3AF") }}>
                                        {item.category || "Other"}
                                    </td>

                                    <td style={{ padding: "12px", color: useColorModeValue("#4B5563", "#9CA3AF"), textTransform: "capitalize" }}>
                                        {item.wallet}
                                    </td>

                                    <td style={{
                                        padding: "12px",
                                        fontWeight: "bold",
                                        color: item.type === "income" ? "#22C55E" : "#EF4444"
                                    }}>
                                        {item.type === "income" ? "+" : "-"} Rs. {item.amount?.toLocaleString()}
                                    </td>

                                    <td style={{ padding: "12px", color: useColorModeValue("#6B7280", "#9CA3AF") }}>
                                        {new Date(item.date).toLocaleDateString("en-PK", { 
                                            day: "2-digit", 
                                            month: "short" 
                                        })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

            </Box>

        </Card>
    );
}