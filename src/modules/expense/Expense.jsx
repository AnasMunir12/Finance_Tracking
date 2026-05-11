"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Flex, Text, Input, Button, SimpleGrid } from "@chakra-ui/react";
import { FiPlus, FiEdit2, FiTrash2, FiDollarSign, FiCoffee, FiShoppingBag, FiFileText } from "react-icons/fi";
import StatsCard from "../../components/ui/StatsCard";
import Card from "../../components/ui/Card";

export default function Expense() {
    // Initial dummy data for visual feedback
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const formik = useFormik({
        initialValues: { amount: "", category: "Food", wallet: "cash", date: "" },
        validationSchema: Yup.object({
            amount: Yup.number().typeError("Must be a number").positive("Must be greater than zero").required("Amount is required"),
            category: Yup.string().required("Category is required"),
            wallet: Yup.string().required("Wallet is required"),
            date: Yup.date().required("Date is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = {
                    title: values.category,
                    amount: parseFloat(values.amount),
                    type: "expense",
                    category: values.category,
                    wallet: values.wallet,
                    date: values.date,
                    status: "paid"
                };

                let res;
                if (editingId) {
                    res = await fetch("/api/transaction", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: editingId, ...payload })
                    });
                } else {
                    res = await fetch("/api/transaction", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                }

                if (res.ok) {
                    fetchExpenses(); // refresh list
                    closeModal();
                    resetForm();
                }
            } catch (err) {
                console.log(err);
            }
        }
    });

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            setIsLoading(true);

            const res = await fetch("/api/transaction?type=expense&limit=100");
            const data = await res.json();

            setExpenses(data.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = (expense = null) => {
        if (expense) {
            setEditingId(expense._id);
            formik.setValues({
                amount: expense.amount,
                category: expense.category,
                wallet: expense.wallet,
                date: expense.date ? new Date(expense.date).toISOString().split("T")[0] : ""
            });
        } else {
            setEditingId(null);
            formik.resetForm();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        formik.resetForm();
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/transaction?id=${id}`, {
                method: "DELETE"
            });

            fetchExpenses();
        } catch (err) {
            console.log(err);
        }
    };

    // Derived statistics
    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const foodExpense = expenses
        .filter(e => e.category === "Food")
        .reduce((acc, curr) => acc + curr.amount, 0);

    const onlinePayments = expenses
        .filter(e => e.wallet === "online")
        .reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <Box w="100%">
            {/* Header */}
            <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
                <Text fontSize="2xl" fontWeight="bold" color="white">Expenses</Text>
                <Button bg="#FACC15" color="black" _hover={{ bg: "#EAB308" }} borderRadius="10px" onClick={() => openModal()}>
                    <Flex align="center" gap={2}><FiPlus /> Add Expense</Flex>
                </Button>
            </Flex>

            {/* Summary Cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <StatsCard title="Total Expenses" value={`Rs. ${totalExpense.toLocaleString()}`} icon={FiDollarSign} trend="This Month" isPositive={false} />
                <StatsCard title="Food & Dining" value={`Rs. ${foodExpense.toLocaleString()}`} icon={FiCoffee} trend="Largest Category" isPositive={false} />
                <StatsCard title="Online Payments" value={`Rs. ${onlinePayments.toLocaleString()}`} icon={FiShoppingBag} trend="Digital Spends" isPositive={true} />
            </SimpleGrid>

            {/* Expense History Table */}
            <Card p={6}>
                <Text fontSize="lg" fontWeight="bold" mb={4} color="white">Expense History</Text>

                {isLoading ? (
                    <Text color="gray.400" textAlign="center">Loading...</Text>
                ) : expenses.length === 0 ? (
                    <Text color="gray.400" textAlign="center" py={6}>No expenses recorded yet.</Text>
                ) : (
                    <Box overflowX="auto">
                        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", minWidth: "600px" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #374151", color: "#9CA3AF" }}>
                                    <th style={{ padding: "12px", fontWeight: "normal" }}>Category</th>
                                    <th style={{ padding: "12px", fontWeight: "normal" }}>Method</th>
                                    <th style={{ padding: "12px", fontWeight: "normal" }}>Amount</th>
                                    <th style={{ padding: "12px", fontWeight: "normal" }}>Date</th>
                                    <th style={{ padding: "12px", fontWeight: "normal", textAlign: "right" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((exp) => (
                                    <tr key={exp.id} style={{ borderBottom: "1px solid #1F2937", color: "white" }}>
                                        <td style={{ padding: "12px" }}>
                                            <Flex align="center" gap={3}>
                                                <Box p={2} bg="#1F2937" borderRadius="8px">
                                                    {exp.category === "Food" ? <FiCoffee color="#FACC15" /> :
                                                        exp.category === "Travel" ? <FiShoppingBag color="#3B82F6" /> :
                                                            <FiFileText color="#10B981" />}
                                                </Box>
                                                <Text fontWeight="medium">{exp.category}</Text>
                                            </Flex>
                                        </td>
                                        <td style={{ padding: "12px" }}>
                                            <span style={{
                                                padding: "4px 10px",
                                                borderRadius: "12px",
                                                fontSize: "0.8rem",
                                                fontWeight: "bold",
                                                backgroundColor: exp.wallet === "online" ? "rgba(59, 130, 246, 0.2)" : "rgba(16, 185, 129, 0.2)",
                                                color: exp.wallet === "online" ? "#93C5FD" : "#6EE7B7"
                                            }}>
                                                {exp.wallet}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px", fontWeight: "bold" }}>Rs. {parseFloat(exp.amount).toLocaleString()}</td>
                                        <td style={{ padding: "12px", color: "#9CA3AF" }}>{exp.date}</td>
                                        <td style={{ padding: "12px", textAlign: "right" }}>
                                            <Flex justify="flex-end" gap={2}>
                                                <Button size="sm" variant="ghost" color="gray.400" _hover={{ color: "#FACC15" }} onClick={() => openModal(exp)} p={2}>
                                                    <FiEdit2 />
                                                </Button>
                                                <Button size="sm" variant="ghost" color="gray.400" _hover={{ color: "#EF4444" }} onClick={() => handleDelete(exp._id)} p={2}>
                                                    <FiTrash2 />
                                                </Button>
                                            </Flex>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                )}
            </Card>

            {/* Custom Modal Overlay */}
            {isModalOpen && (
                <Box position="fixed" top="0" left="0" w="100vw" h="100vh" bg="rgba(0, 0, 0, 0.6)" zIndex="1500" display="flex" alignItems="center" justifyContent="center">
                    <Card w="90%" maxW="450px" p={6} boxShadow="2xl">
                        <Text fontSize="xl" fontWeight="bold" mb={6} color="white">
                            {editingId ? "Edit Expense" : "Add Expense"}
                        </Text>
                        <form onSubmit={formik.handleSubmit}>
                            <Flex direction="column" gap={4}>
                                <Box>
                                    <Text mb={1} fontSize="sm" color="gray.400">Amount</Text>
                                    <Input
                                        name="amount" type="number" min="0" step="0.01" bg="#111827"
                                        border={formik.touched.amount && formik.errors.amount ? "1px solid #EF4444" : "1px solid #374151"}
                                        color="white" value={formik.values.amount} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.amount && formik.errors.amount && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.amount}</Text>}
                                </Box>
                                <Box>
                                    <Text mb={1} fontSize="sm" color="gray.400">Category</Text>
                                    <select
                                        name="category" style={{ width: "100%", background: "#111827", color: "white", border: formik.touched.category && formik.errors.category ? "1px solid #EF4444" : "1px solid #374151", padding: "10px", borderRadius: "6px", outline: "none" }}
                                        value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    >
                                        <option value="Food">Food</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Bills">Bills</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {formik.touched.category && formik.errors.category && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.category}</Text>}
                                </Box>
                                <Box>
                                    <Text mb={1} fontSize="sm" color="gray.400">Wallet</Text>
                                    <select
                                        name="wallet" style={{ width: "100%", background: "#111827", color: "white", border: formik.touched.wallet && formik.errors.wallet ? "1px solid #EF4444" : "1px solid #374151", padding: "10px", borderRadius: "6px", outline: "none" }}
                                        value={formik.values.wallet} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    >
                                        <option value="cash">Cash</option>
                                        <option value="online">Online</option>
                                    </select>
                                    {formik.touched.wallet && formik.errors.wallet && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.wallet}</Text>}
                                </Box>
                                <Box>
                                    <Text mb={1} fontSize="sm" color="gray.400">Date</Text>
                                    <Input
                                        name="date" type="date" bg="#111827"
                                        border={formik.touched.date && formik.errors.date ? "1px solid #EF4444" : "1px solid #374151"}
                                        color="white" value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.date && formik.errors.date && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.date}</Text>}
                                </Box>
                                <Flex justify="flex-end" gap={3} mt={6}>
                                    <Button variant="ghost" color="gray.400" _hover={{ bg: "#374151", color: "white" }} onClick={closeModal}>Cancel</Button>
                                    <Button type="submit" bg="#FACC15" color="black" _hover={{ bg: "#EAB308" }}>{editingId ? "Save Changes" : "Add Expense"}</Button>
                                </Flex>
                            </Flex>
                        </form>
                    </Card>
                </Box>
            )}
        </Box>
    );
}