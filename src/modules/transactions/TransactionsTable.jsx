"use client";

import { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Skeleton, IconButton } from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Card from "../../components/ui/Card";
import { useColorModeValue } from "../../components/ui/color-mode";

export default function TransactionsTable({ data = [], isLoading = false, onEdit, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
                    color: "inherit",
                    whiteSpace: "nowrap"
                }}>
                    <thead>
                        <tr style={{ textAlign: "left", borderBottom: `1px solid ${useColorModeValue("#E5E7EB", "#374151")}` }}>
                            <th style={{ padding: "12px 10px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Title</th>
                            <th style={{ padding: "12px 10px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Type</th>
                            <th style={{ padding: "12px 10px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Category</th>
                            <th style={{ padding: "12px 10px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Wallet</th>
                            <th style={{ padding: "12px 10px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Date</th>
                            <th style={{ padding: "12px 10px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Status</th>
                            <th style={{ padding: "12px 10px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontWeight: "600", fontSize: "13px", textTransform: "uppercase", textAlign: "right" }}>Amount</th>
                            <th style={{ padding: "12px 10px", color: useColorModeValue("#4B5563", "#9CA3AF"), fontWeight: "600", fontSize: "13px", textTransform: "uppercase", textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            [...Array(5)].map((_, idx) => (
                                <tr key={`skeleton-${idx}`} style={{ borderBottom: `1px solid ${useColorModeValue("#F3F4F6", "#1F2937")}` }}>
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
                                <td colSpan="8" style={{ padding: "30px", textAlign: "center", color: "mutedText" }}>
                                    No transactions found.
                                </td>
                            </tr>
                        ) : paginatedData.map((item) => (
                            <tr key={item._id || item.id} style={{ borderBottom: `1px solid ${useColorModeValue("#F3F4F6", "#1F2937")}` }}>
                                <td style={{ padding: "12px 10px", color: "mainText", fontWeight: "500" }}>{item.title}</td>
                                <td style={{ padding: "12px 10px", color: item.type?.toLowerCase() === "income" ? "#22C55E" : (item.type?.toLowerCase() === "expense" ? "#EF4444" : "#6366F1"), textTransform: "capitalize" }}>
                                    {item.type}
                                </td>
                                <td style={{ padding: "12px 10px", color: "mutedText" }}>{item.category}</td>
                                <td style={{ padding: "12px 10px", textTransform: "capitalize", color: "mutedText" }}>{item.wallet}</td>
                                <td style={{ padding: "12px 10px", color: "mutedText" }}>{new Date(item.date).toLocaleDateString()}</td>
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
                                <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: "bold", color: "mainText" }}>
                                    Rs. {parseFloat(item.amount).toLocaleString()}
                                </td>
                                <td style={{ padding: "12px 10px" }}>
                                    <Flex gap={2} justify="center">
                                        <IconButton
                                            size="sm"
                                            variant="ghost"
                                            color="mainText"
                                            _hover={{ bg: "subtleBg" }}
                                            onClick={() => onEdit && onEdit(item)}
                                            aria-label="Edit"
                                        >
                                            <FiEdit2 size={14} />
                                        </IconButton>
                                        <IconButton
                                            size="sm"
                                            variant="ghost"
                                            color="red.400"
                                            _hover={{ bg: "red.500", color: "white" }}
                                            onClick={() => onDelete && onDelete(item._id || item.id)}
                                            aria-label="Delete"
                                        >
                                            <FiTrash2 size={14} />
                                        </IconButton>
                                    </Flex>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>

            {/* Pagination UI */}
            {!isLoading && totalPages > 1 && (
                <Flex justify="space-between" align="center" mt={4} pt={4} borderTop="1px solid" borderColor="mainBorder" flexWrap="wrap" gap={4}>
                    <Text fontSize="sm" color="mutedText">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
                    </Text>
                    <Flex gap={2}>
                        <Button 
                            size="sm" 
                            variant="outline"
                            borderColor="mainBorder"
                            bg="cardBg"
                            color="mainText"
                            _hover={{ bg: "subtleBg" }}
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
                                    bg={isActive ? "#FACC15" : "cardBg"} 
                                    color={isActive ? "black" : "mainText"} 
                                    _hover={{ bg: isActive ? "#EAB308" : "subtleBg" }} 
                                    border="1px solid"
                                    borderColor={isActive ? "brand.500" : "mainBorder"}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </Button>
                            );
                        })}
                        
                        <Button 
                            size="sm" 
                            variant="outline"
                            borderColor="mainBorder"
                            bg="cardBg"
                            color="mainText"
                            _hover={{ bg: "subtleBg" }}
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
