"use client";

import { Box, Text, Flex, Table, Badge, IconButton } from "@chakra-ui/react";
import Card from "./Card";
import { TableSkeleton } from "./LoadingSkeletons";
import { FiArrowUpRight, FiArrowDownLeft, FiMoreVertical } from "react-icons/fi";

export default function TransactionTable({ transactions, isLoading }) {
    if (isLoading && !transactions) return <TableSkeleton />;

    return (
        <Card p={0}>
            <Flex justify="space-between" align="center" p={6} borderBottom="1px solid" borderColor="mainBorder">
                <Box>
                    <Text fontSize="lg" fontWeight="bold" color="mainText">
                        Recent Transactions
                    </Text>
                    <Text fontSize="xs" color="mutedText" fontWeight="500">
                        A list of your latest financial activities
                    </Text>
                </Box>
            </Flex>

            <Box overflowX="auto">
                <Table.Root variant="ghost" size="md">
                    <Table.Header>
                        <Table.Row bg="subtleBg" _dark={{ bg: "whiteAlpha.50" }}>
                            <Table.ColumnHeader color="mutedText" fontSize="xs" fontWeight="700" textTransform="uppercase" py={4}>Title</Table.ColumnHeader>
                            <Table.ColumnHeader color="mutedText" fontSize="xs" fontWeight="700" textTransform="uppercase" py={4}>Category</Table.ColumnHeader>
                            <Table.ColumnHeader color="mutedText" fontSize="xs" fontWeight="700" textTransform="uppercase" py={4}>Wallet</Table.ColumnHeader>
                            <Table.ColumnHeader color="mutedText" fontSize="xs" fontWeight="700" textTransform="uppercase" py={4}>Amount</Table.ColumnHeader>
                            <Table.ColumnHeader color="mutedText" fontSize="xs" fontWeight="700" textTransform="uppercase" py={4}>Date</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {transactions?.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={5} textAlign="center" py={12} color="dimText" fontSize="sm">
                                    No recent transactions found.
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            transactions?.map((item) => (
                                <Table.Row 
                                    key={item._id} 
                                    _hover={{ bg: "subtleBg" }} 
                                    transition="background 0.2s"
                                    cursor="pointer"
                                >
                                    <Table.Cell py={4}>
                                        <Flex align="center" gap={3}>
                                            <Box 
                                                p={2} 
                                                borderRadius="full" 
                                                bg={item.type === "income" ? "green.50" : "red.50"}
                                                _dark={{ bg: item.type === "income" ? "green.950" : "red.950" }}
                                                color={item.type === "income" ? "green.500" : "red.500"}
                                            >
                                                {item.type === "income" ? <FiArrowUpRight size={14} /> : <FiArrowDownLeft size={14} />}
                                            </Box>
                                            <Text fontWeight="600" color="mainText" fontSize="sm">{item.title}</Text>
                                        </Flex>
                                    </Table.Cell>

                                    <Table.Cell py={4}>
                                        <Badge variant="subtle" colorPalette="gray" borderRadius="md" textTransform="capitalize">
                                            {item.category || "Other"}
                                        </Badge>
                                    </Table.Cell>

                                    <Table.Cell py={4}>
                                        <Text color="mutedText" fontSize="sm" fontWeight="500" textTransform="capitalize">
                                            {item.wallet}
                                        </Text>
                                    </Table.Cell>

                                    <Table.Cell py={4}>
                                        <Text
                                            fontWeight="800"
                                            fontSize="sm"
                                            color={item.type === "income" ? "green.500" : "red.500"}
                                        >
                                            {item.type === "income" ? "+" : "-"} Rs. {item.amount?.toLocaleString()}
                                        </Text>
                                    </Table.Cell>

                                    <Table.Cell py={4}>
                                        <Text color="dimText" fontSize="xs" fontWeight="500">
                                            {new Date(item.date).toLocaleDateString("en-PK", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </Text>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table.Root>
            </Box>
        </Card>
    );
}