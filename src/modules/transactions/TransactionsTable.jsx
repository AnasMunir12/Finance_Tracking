"use client";

import { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Skeleton, IconButton } from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Card from "../../components/ui/Card";

export default function TransactionsTable({ data = [], isLoading = false, onEdit, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Reset to page 1 whenever the data changes (e.g. from filtering)
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <Card>
            <Box overflowX="auto">
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "white",
                    whiteSpace: "nowrap"
                }}>
                    <thead>
                        <tr style={{ textAlign: "left", borderBottom: "1px solid #374151" }}>
                            <th style={{ padding: "12px 10px", color: "#9CA3AF", fontWeight: "normal" }}>Title</th>
                            <th style={{ padding: "12px 10px", color: "#9CA3AF", fontWeight: "normal" }}>Type</th>
                            <th style={{ padding: "12px 10px", color: "#9CA3AF", fontWeight: "normal" }}>Category</th>
                            <th style={{ padding: "12px 10px", color: "#9CA3AF", fontWeight: "normal" }}>Wallet</th>
                            <th style={{ padding: "12px 10px", color: "#9CA3AF", fontWeight: "normal" }}>Date</th>
                            <th style={{ padding: "12px 10px", color: "#9CA3AF", fontWeight: "normal" }}>Status</th>
                            <th style={{ padding: "12px 10px", color: "#9CA3AF", fontWeight: "normal", textAlign: "right" }}>Amount</th>
                            <th style={{ padding: "12px 10px", color: "#9CA3AF", fontWeight: "normal", textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            // Render 5 Skeleton Rows
                            [...Array(5)].map((_, idx) => (
                                <tr key={`skeleton-${idx}`} style={{ borderBottom: "1px solid #1F2937" }}>
                                    <td style={{ padding: "12px 10px" }}><Skeleton height="20px" w="120px" /></td>
                                    <td style={{ padding: "12px 10px" }}><Skeleton height="20px" w="80px" /></td>
                                    <td style={{ padding: "12px 10px" }}><Skeleton height="20px" w="80px" /></td>
                                    <td style={{ padding: "12px 10px" }}><Skeleton height="20px" w="60px" /></td>
                                    <td style={{ padding: "12px 10px" }}><Skeleton height="20px" w="100px" /></td>
                                    <td style={{ padding: "12px 10px" }}><Skeleton height="24px" w="60px" borderRadius="6px" /></td>
                                    <td style={{ padding: "12px 10px" }}><Skeleton height="20px" w="80px" ml="auto" /></td>
                                    <td style={{ padding: "12px 10px" }}>
                                        <Flex gap={2} justify="center">
                                            <Skeleton height="32px" w="32px" borderRadius="md" />
                                            <Skeleton height="32px" w="32px" borderRadius="md" />
                                        </Flex>
                                    </td>
                                </tr>
                            ))
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ padding: "30px", textAlign: "center", color: "#9CA3AF" }}>
                                    No transactions found.
                                </td>
                            </tr>
                        ) : paginatedData.map((item) => (
                            <tr key={item._id || item.id} style={{ borderBottom: "1px solid #1F2937" }}>
                                <td style={{ padding: "12px 10px" }}>{item.title}</td>
                                <td style={{ padding: "12px 10px", color: item.type?.toLowerCase() === "income" ? "#22C55E" : (item.type?.toLowerCase() === "expense" ? "#EF4444" : "#6366F1"), textTransform: "capitalize" }}>
                                    {item.type}
                                </td>
                                <td style={{ padding: "12px 10px" }}>{item.category}</td>
                                <td style={{ padding: "12px 10px", textTransform: "capitalize" }}>{item.wallet}</td>
                                <td style={{ padding: "12px 10px", color: "#9CA3AF" }}>{new Date(item.date).toLocaleDateString()}</td>
                                <td style={{ padding: "12px 10px" }}>
                                    <Box
                                        as="span"
                                        px={2}
                                        py={1}
                                        borderRadius="6px"
                                        fontSize="xs"
                                        bg={item.status?.toLowerCase() === "paid" ? "rgba(34, 197, 94, 0.1)" : "rgba(250, 204, 21, 0.1)"}
                                        color={item.status?.toLowerCase() === "paid" ? "#22C55E" : "#FACC15"}
                                        textTransform="capitalize"
                                    >
                                        {item.status || "paid"}
                                    </Box>
                                </td>
                                <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: "bold" }}>
                                    Rs. {parseFloat(item.amount).toLocaleString()}
                                </td>
                                <td style={{ padding: "12px 10px" }}>
                                    <Flex gap={2} justify="center">
                                        <Button
                                            size="sm"
                                            bg="rgba(99, 102, 241, 0.1)"
                                            color="#818CF8"
                                            _hover={{ bg: "rgba(99, 102, 241, 0.2)" }}
                                            onClick={() => onEdit && onEdit(item)}
                                            p={0}
                                            w="32px"
                                            h="32px"
                                            minW="auto"
                                        >
                                            <FiEdit2 />
                                        </Button>
                                        <Button
                                            size="sm"
                                            bg="rgba(239, 68, 68, 0.1)"
                                            color="#EF4444"
                                            _hover={{ bg: "rgba(239, 68, 68, 0.2)" }}
                                            onClick={() => onDelete && onDelete(item._id || item.id)}
                                            p={0}
                                            w="32px"
                                            h="32px"
                                            minW="auto"
                                        >
                                            <FiTrash2 />
                                        </Button>
                                    </Flex>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>

            {/* Pagination UI */}
            {!isLoading && totalPages > 1 && (
                <Flex justify="space-between" align="center" mt={4} pt={4} borderTop="1px solid #1F2937" flexWrap="wrap" gap={4}>
                    <Text fontSize="sm" color="gray.400">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
                    </Text>
                    <Flex gap={2}>
                        <Button 
                            size="sm" 
                            bg="#111827" 
                            color="white" 
                            _hover={{ bg: "#374151" }} 
                            border="1px solid #374151"
                            onClick={() => handlePageChange(currentPage - 1)}
                            isDisabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        
                        {[...Array(totalPages)].map((_, idx) => {
                            const pageNumber = idx + 1;
                            const isActive = pageNumber === currentPage;
                            return (
                                <Button 
                                    key={pageNumber} 
                                    size="sm" 
                                    bg={isActive ? "#FACC15" : "#111827"} 
                                    color={isActive ? "black" : "white"} 
                                    _hover={{ bg: isActive ? "#EAB308" : "#374151" }} 
                                    border={isActive ? "none" : "1px solid #374151"}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </Button>
                            );
                        })}
                        
                        <Button 
                            size="sm" 
                            bg="#111827" 
                            color="white" 
                            _hover={{ bg: "#374151" }} 
                            border="1px solid #374151"
                            onClick={() => handlePageChange(currentPage + 1)}
                            isDisabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </Flex>
                </Flex>
            )}
        </Card>
    );
}
