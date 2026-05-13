"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Flex, Text, Button, Input } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import Card from "../../components/ui/Card";
import TransactionsSummary from "./TransactionsSummary";
import TransactionsFilter from "./TransactionsFilter";
import TransactionsTable from "./TransactionsTable";
import { useColorModeValue } from "../../components/ui/color-mode";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [walletFilter, setWalletFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [sortBy, setSortBy] = useState("latest");
    const [walletStats, setWalletStats] = useState({ cash: 0, online: 0 });

    useEffect(() => {
        fetchTransactions();
        fetchWalletStats();
    }, []);

    const fetchWalletStats = async () => {
        try {
            const res = await fetch("/api/wallet");
            const data = await res.json();
            setWalletStats(data);
        } catch (err) {
            console.error("Error fetching wallet stats:", err);
        }
    };

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/transaction?limit=100");
            const result = await res.json();
            setTransactions(result.data || result || []);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            background: useColorModeValue("#fff", "#111827"),
            color: useColorModeValue("#111827", "#fff"),
            confirmButtonColor: "#EF4444",
            cancelButtonColor: useColorModeValue("#E5E7EB", "#374151"),
            confirmButtonText: "Yes, delete it!",
            didOpen: () => {
                Swal.getContainer().style.zIndex = "2000";
            }
        });

        if (result.isConfirmed) {
            try {
                const transactionToDelete = transactions.find(t => t._id === id);
                if (transactionToDelete && transactionToDelete.type === "income") {
                    const currentBalance = transactionToDelete.wallet === "cash" ? walletStats.cash : walletStats.online;
                    if (transactionToDelete.amount > currentBalance) {
                        Swal.fire({
                            title: "Cannot Delete!",
                            text: `Deleting this income would result in a negative balance in your ${transactionToDelete.wallet} wallet.`,
                            icon: "error",
                            background: useColorModeValue("#fff", "#111827"),
                            color: useColorModeValue("#111827", "#fff"),
                            confirmButtonColor: "#FACC15",
                            didOpen: () => {
                                Swal.getContainer().style.zIndex = "2000";
                            }
                        });
                        return;
                    }
                }

                const res = await fetch(`/api/transaction?id=${id}`, { method: "DELETE" });
                if (res.ok) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Transaction has been deleted.",
                        icon: "success",
                        background: useColorModeValue("#fff", "#111827"),
                        color: useColorModeValue("#111827", "#fff"),
                        confirmButtonColor: "#FACC15",
                        didOpen: () => {
                            Swal.getContainer().style.zIndex = "2000";
                        }
                    });
                    fetchTransactions();
                    window.dispatchEvent(new Event("refreshDashboard"));
                } else {
                    throw new Error("Failed to delete");
                }
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong.",
                    icon: "error",
                    background: useColorModeValue("#fff", "#111827"),
                    color: useColorModeValue("#111827", "#fff"),
                    confirmButtonColor: "#FACC15",
                    didOpen: () => {
                        Swal.getContainer().style.zIndex = "2000";
                    }
                });
            }
        }
    };

    const handleEdit = (transaction) => {
        setEditingId(transaction._id || transaction.id);
        formik.setValues({
            title: transaction.title || "",
            type: transaction.type?.toLowerCase() || "expense",
            amount: transaction.amount || "",
            category: transaction.category || "Food",
            wallet: transaction.wallet?.toLowerCase() || "cash",
            date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : "",
            status: transaction.status?.toLowerCase() || "paid"
        });
        setIsModalOpen(true);
    };

    const filteredTransactions = transactions.filter((t) => {
        if (!t || !t.title) return false;
        const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchType = typeFilter ? t.type?.toLowerCase() === typeFilter.toLowerCase() : true;
        const matchCategory = categoryFilter ? t.category?.toLowerCase() === categoryFilter.toLowerCase() : true;
        const matchWallet = walletFilter ? t.wallet?.toLowerCase() === walletFilter.toLowerCase() : true;
        let matchDate = true;
        if (dateFilter === "today" && t.date) {
            matchDate = new Date(t.date).toDateString() === new Date().toDateString();
        }
        return matchSearch && matchType && matchCategory && matchWallet && matchDate;
    }).sort((a, b) => {
        if (sortBy === "highest") return b.amount - a.amount;
        return new Date(b.date) - new Date(a.date);
    });

    const formik = useFormik({
        initialValues: {
            title: "", type: "expense", amount: "", category: "Food", wallet: "cash", date: "", status: "paid"
        },
        validationSchema: Yup.object({
            title: Yup.string().min(3, "Title must be at least 3 characters").required("Required"),
            type: Yup.string().required("Required"),
            amount: Yup.number().typeError("Must be a number").positive("Must be greater than zero").required("Required"),
            category: Yup.string().required("Required"),
            wallet: Yup.string().required("Required"),
            date: Yup.date().required("Required"),
            status: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const method = editingId ? "PUT" : "POST";
                const bodyData = {
                    ...values,
                    amount: parseFloat(values.amount),
                    type: values.type.toLowerCase(),
                    wallet: values.wallet.toLowerCase(),
                };

                if (bodyData.type === "expense" || (editingId && transactions.find(t => t._id === editingId)?.type === "income")) {
                    const currentBalance = bodyData.wallet === "cash" ? walletStats.cash : walletStats.online;
                    let validationBalance = currentBalance;
                    if (editingId) {
                        const oldTx = transactions.find(t => t._id === editingId);
                        if (oldTx) {
                            if (oldTx.type === "expense" && oldTx.wallet === bodyData.wallet) validationBalance += oldTx.amount;
                            if (oldTx.type === "income" && oldTx.wallet === bodyData.wallet) validationBalance -= oldTx.amount;
                        }
                    }

                    if (bodyData.type === "expense" && bodyData.amount > validationBalance) {
                        Swal.fire({
                            title: "Insufficient Balance!",
                            text: `This change would result in a negative balance. Available in ${bodyData.wallet}: Rs. ${validationBalance.toLocaleString()}`,
                            icon: "warning",
                            background: useColorModeValue("#fff", "#111827"),
                            color: useColorModeValue("#111827", "#fff"),
                            confirmButtonColor: "#FACC15",
                            didOpen: () => {
                                Swal.getContainer().style.zIndex = "2000";
                            }
                        });
                        return;
                    }
                    
                    if (editingId && bodyData.type === "income" && validationBalance + bodyData.amount < 0) {
                         Swal.fire({
                            title: "Cannot Update!",
                            text: `Reducing this income would result in a negative balance in your ${bodyData.wallet} wallet.`,
                            icon: "error",
                            background: useColorModeValue("#fff", "#111827"),
                            color: useColorModeValue("#111827", "#fff"),
                            confirmButtonColor: "#FACC15",
                            didOpen: () => {
                                Swal.getContainer().style.zIndex = "2000";
                            }
                        });
                        return;
                    }
                }

                if (editingId) bodyData.id = editingId;

                const res = await fetch("/api/transaction", {
                    method: method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyData),
                });

                if (!res.ok) throw new Error("Failed to save transaction");

                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: editingId ? 'Transaction updated successfully' : 'Transaction added successfully',
                    showConfirmButton: false,
                    timer: 3000,
                    background: useColorModeValue("#fff", "#111827"),
                    color: useColorModeValue("#111827", "#fff"),
                    didOpen: () => {
                        Swal.getContainer().style.zIndex = "2000";
                    }
                });

                await fetchTransactions();
                await fetchWalletStats();
                window.dispatchEvent(new Event("refreshDashboard"));
                closeModal();
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed to save transaction',
                    showConfirmButton: false,
                    timer: 3000,
                    background: useColorModeValue("#fff", "#111827"),
                    color: useColorModeValue("#111827", "#fff"),
                    didOpen: () => {
                        Swal.getContainer().style.zIndex = "2000";
                    }
                });
            }
        }
    });

    const openAddModal = () => {
        setEditingId(null);
        formik.resetForm();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        formik.resetForm();
    };

    return (
        <Box w="100%">
            <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
                <Box>
                    <Text fontSize="2xl" fontWeight="bold" color="mainText">
                        Transactions
                    </Text>
                    <Text fontSize="sm" color="mutedText">Manage your daily income and expenses</Text>
                </Box>
                <Button bg="#FACC15" color="black" _hover={{ bg: "#EAB308" }} borderRadius="10px" onClick={openAddModal}>
                    <Flex align="center" gap={2}><FiPlus /> Add Transaction</Flex>
                </Button>
            </Flex>

            <TransactionsSummary data={filteredTransactions} isLoading={isLoading} />

            <TransactionsFilter
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                typeFilter={typeFilter} setTypeFilter={setTypeFilter}
                categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
                walletFilter={walletFilter} setWalletFilter={setWalletFilter}
                dateFilter={dateFilter} setDateFilter={setDateFilter}
                sortBy={sortBy} setSortBy={setSortBy}
            />

            <TransactionsTable
                data={filteredTransactions}
                isLoading={isLoading}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            {/* Add/Edit Transaction Modal */}
            {isModalOpen && (
                <Box position="fixed" top="0" left="0" w="100vw" h="100vh" bg="rgba(0, 0, 0, 0.6)" zIndex="1500" display="flex" alignItems="center" justifyContent="center">
                    <Card w="90%" maxW="500px" p={6} boxShadow="2xl" bg="cardBg">
                        <Text fontSize="xl" fontWeight="bold" mb={6} color="mainText">
                            {editingId ? "Edit Transaction" : "Add New Transaction"}
                        </Text>
                        <form onSubmit={formik.handleSubmit}>
                            <Flex direction="column" gap={4}>

                                <Box>
                                    <Text mb={1} fontSize="sm" color="mutedText">Title</Text>
                                    <Input
                                        name="title" type="text" placeholder="e.g. Salary, Groceries..." bg="subtleBg"
                                        border={formik.touched.title && formik.errors.title ? "1px solid #EF4444" : "1px solid"}
                                        borderColor={formik.touched.title && formik.errors.title ? "#EF4444" : "mainBorder"}
                                        color="mainText" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.title && formik.errors.title && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.title}</Text>}
                                </Box>

                                <Flex gap={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
                                    <Box flex="1" w="100%">
                                        <Text mb={1} fontSize="sm" color="mutedText">Type</Text>
                                        <select
                                            name="type" style={{ width: "100%", background: useColorModeValue("#F3F4F6", "#111827"), color: useColorModeValue("#111827", "#FFFFFF"), border: formik.touched.type && formik.errors.type ? "1px solid #EF4444" : `1px solid ${useColorModeValue("#E5E7EB", "#374151")}`, padding: "10px", borderRadius: "6px", outline: "none" }}
                                            value={formik.values.type} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        >
                                            <option value="income">Income</option>
                                            <option value="expense">Expense</option>
                                            <option value="transfer">Transfer</option>
                                        </select>
                                        {formik.touched.type && formik.errors.type && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.type}</Text>}
                                    </Box>
                                    <Box flex="1" w="100%">
                                        <Text mb={1} fontSize="sm" color="mutedText">Amount</Text>
                                        <Input
                                            name="amount" type="number" min="0" step="0.01" bg="subtleBg"
                                            border={formik.touched.amount && formik.errors.amount ? "1px solid #EF4444" : "1px solid"}
                                            borderColor={formik.touched.amount && formik.errors.amount ? "#EF4444" : "mainBorder"}
                                            color="mainText" value={formik.values.amount} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.amount && formik.errors.amount && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.amount}</Text>}
                                    </Box>
                                </Flex>

                                <Flex gap={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
                                    <Box flex="1" w="100%">
                                        <Text mb={1} fontSize="sm" color="mutedText">Category</Text>
                                        <select
                                            name="category" style={{ width: "100%", background: useColorModeValue("#F3F4F6", "#111827"), color: useColorModeValue("#111827", "#FFFFFF"), border: formik.touched.category && formik.errors.category ? "1px solid #EF4444" : `1px solid ${useColorModeValue("#E5E7EB", "#374151")}`, padding: "10px", borderRadius: "6px", outline: "none" }}
                                            value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        >
                                            <option value="Salary">Salary</option>
                                            <option value="Food">Food</option>
                                            <option value="Rent">Rent</option>
                                            <option value="Freelance">Freelance</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {formik.touched.category && formik.errors.category && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.category}</Text>}
                                    </Box>
                                    <Box flex="1" w="100%">
                                        <Text mb={1} fontSize="sm" color="mutedText">Wallet</Text>
                                        <select
                                            name="wallet" style={{ width: "100%", background: useColorModeValue("#F3F4F6", "#111827"), color: useColorModeValue("#111827", "#FFFFFF"), border: formik.touched.wallet && formik.errors.wallet ? "1px solid #EF4444" : `1px solid ${useColorModeValue("#E5E7EB", "#374151")}`, padding: "10px", borderRadius: "6px", outline: "none" }}
                                            value={formik.values.wallet} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        >
                                            <option value="online">Online</option>
                                            <option value="cash">Cash</option>
                                        </select>
                                        {formik.touched.wallet && formik.errors.wallet && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.wallet}</Text>}
                                    </Box>
                                </Flex>

                                <Flex gap={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
                                    <Box flex="1" w="100%">
                                        <Text mb={1} fontSize="sm" color="mutedText">Date</Text>
                                        <Input
                                            name="date" type="date" bg="subtleBg"
                                            border={formik.touched.date && formik.errors.date ? "1px solid #EF4444" : "1px solid"}
                                            borderColor={formik.touched.date && formik.errors.date ? "#EF4444" : "mainBorder"}
                                            color="mainText" value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            css={{ colorScheme: useColorModeValue("light", "dark") }}
                                        />
                                        {formik.touched.date && formik.errors.date && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.date}</Text>}
                                    </Box>
                                    <Box flex="1" w="100%">
                                        <Text mb={1} fontSize="sm" color="mutedText">Status</Text>
                                        <select
                                            name="status" style={{ width: "100%", background: useColorModeValue("#F3F4F6", "#111827"), color: useColorModeValue("#111827", "#FFFFFF"), border: formik.touched.status && formik.errors.status ? "1px solid #EF4444" : `1px solid ${useColorModeValue("#E5E7EB", "#374151")}`, padding: "10px", borderRadius: "6px", outline: "none" }}
                                            value={formik.values.status} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        >
                                            <option value="paid">Paid</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                        {formik.touched.status && formik.errors.status && <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.status}</Text>}
                                    </Box>
                                </Flex>

                                <Flex justify="flex-end" gap={3} mt={6}>
                                    <Button variant="ghost" color="mutedText" _hover={{ bg: "subtleBg", color: "mainText" }} onClick={closeModal}>Cancel</Button>
                                    <Button type="submit" bg="#FACC15" color="black" _hover={{ bg: "#EAB308" }}>{editingId ? "Update Transaction" : "Save Transaction"}</Button>
                                </Flex>
                            </Flex>
                        </form>
                    </Card>
                </Box>
            )}
        </Box>
    );
}
