"use client";

import { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box, Flex, Text, Input, Button, SimpleGrid,
    Spinner
} from "@chakra-ui/react";
import Swal from "sweetalert2";

import {
    FiPlus, FiSearch, FiCheck, FiTrash2,
    FiDollarSign, FiClock, FiCheckCircle, FiX, FiAlertTriangle
} from "react-icons/fi";
import StatsCard from "../../components/ui/StatsCard";
import Card from "../../components/ui/Card";

/* ─────────────────────────────────────────────
   Confirmation Dialog (inline, no extra lib)
───────────────────────────────────────────── */
function ConfirmDialog({ isOpen, title, message, confirmLabel, onConfirm, onCancel, danger }) {
    if (!isOpen) return null;
    return (
        <Box
            position="fixed" top="0" left="0" w="100vw" h="100vh"
            bg="rgba(0,0,0,0.65)" zIndex="1100"
            display="flex" alignItems="center" justifyContent="center"
        >
            <Box
                bg="#111827" borderRadius="14px" p={6} w="90%" maxW="380px"
                border="1px solid #374151"
                boxShadow="0 20px 60px rgba(0,0,0,0.5)"
            >
                <Flex align="center" gap={3} mb={3}>
                    <Box color={danger ? "#EF4444" : "#FACC15"} fontSize="22px">
                        <FiAlertTriangle />
                    </Box>
                    <Text fontWeight="bold" fontSize="lg" color="white">{title}</Text>
                </Flex>
                <Text color="#9CA3AF" fontSize="sm" mb={6}>{message}</Text>
                <Flex justify="flex-end" gap={3}>
                    <Button
                        size="sm" variant="ghost" color="white"
                        _hover={{ bg: "#1F2937" }} onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        bg={danger ? "#EF4444" : "#22C55E"}
                        _hover={{ bg: danger ? "#dc2626" : "#16a34a" }}
                        color="white"
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}

/* ─────────────────────────────────────────────
   Add Entry Modal
───────────────────────────────────────────── */
function AddEntryModal({ isOpen, onClose, onSubmit, isPayable, labels, isSubmitting }) {
    const formik = useFormik({
        initialValues: { title: "", amount: "", date: "", note: "", status: "pending" },
        validationSchema: Yup.object({
            title: Yup.string().min(2, "Title must be at least 2 characters").required("Title is required"),
            amount: Yup.number()
                .typeError("Amount must be a number")
                .positive("Amount must be positive")
                .required("Amount is required"),
            date: Yup.date().required("Date is required"),
            note: Yup.string(),
            status: Yup.string().required(),
        }),
        onSubmit: async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
        },
    });

    useEffect(() => {
        if (!isOpen) formik.resetForm();
    }, [isOpen]);

    if (!isOpen) return null;

    const inputStyle = (touched, error) => ({
        bg: "#0D1520",
        border: touched && error ? "1px solid #EF4444" : "1px solid #374151",
        color: "white",
        _placeholder: { color: "#6B7280" },
        _focus: { borderColor: isPayable ? "#EF4444" : "#22C55E", boxShadow: "none" },
    });

    return (
        <Box
            position="fixed" top="0" left="0" w="100vw" h="100vh"
            bg="rgba(0,0,0,0.65)" zIndex="1000"
            display="flex" alignItems="center" justifyContent="center"
        >
            <Box
                bg="#111827" borderRadius="16px" p={7} w="90%" maxW="480px"
                border="1px solid #1F2937"
                boxShadow="0 25px 80px rgba(0,0,0,0.6)"
            >
                <Flex justify="space-between" align="center" mb={6}>
                    <Text fontSize="xl" fontWeight="bold" color="white">{labels.addBtn}</Text>
                    <Button size="sm" variant="ghost" color="#9CA3AF" _hover={{ color: "white", bg: "#1F2937" }} onClick={onClose}>
                        <FiX />
                    </Button>
                </Flex>

                <form onSubmit={formik.handleSubmit}>
                    <Flex direction="column" gap={4}>
                        {/* Title */}
                        <Box>
                            <Text mb={1} fontSize="sm" color="#9CA3AF">Title / Name</Text>
                            <Input
                                name="title"
                                placeholder="e.g. Ahmed Khan"
                                {...inputStyle(formik.touched.title, formik.errors.title)}
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.title}</Text>
                            )}
                        </Box>

                        {/* Amount */}
                        <Box>
                            <Text mb={1} fontSize="sm" color="#9CA3AF">Amount (Rs.)</Text>
                            <Input
                                name="amount" type="number" min="0" placeholder="0"
                                {...inputStyle(formik.touched.amount, formik.errors.amount)}
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.amount && formik.errors.amount && (
                                <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.amount}</Text>
                            )}
                        </Box>

                        {/* Date */}
                        <Box>
                            <Text mb={1} fontSize="sm" color="#9CA3AF">Date</Text>
                            <Input
                                name="date" type="date"
                                {...inputStyle(formik.touched.date, formik.errors.date)}
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                css={{ colorScheme: "dark" }}
                            />
                            {formik.touched.date && formik.errors.date && (
                                <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.date}</Text>
                            )}
                        </Box>

                        {/* Note */}
                        <Box>
                            <Text mb={1} fontSize="sm" color="#9CA3AF">Note <Text as="span" color="#6B7280">(optional)</Text></Text>
                            <Input
                                name="note" placeholder="Optional note..."
                                bg="#0D1520" border="1px solid #374151" color="white"
                                _placeholder={{ color: "#6B7280" }}
                                _focus={{ borderColor: "#374151", boxShadow: "none" }}
                                value={formik.values.note}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>

                        {/* Status */}
                        <Box>
                            <Text mb={1} fontSize="sm" color="#9CA3AF">Status</Text>
                            <select
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                    width: "100%", background: "#0D1520", color: "white",
                                    border: "1px solid #374151", padding: "10px 12px",
                                    borderRadius: "8px", outline: "none", fontSize: "14px"
                                }}
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">{labels.completedStatus}</option>
                            </select>
                        </Box>

                        <Flex justify="flex-end" gap={3} mt={2}>
                            <Button
                                variant="ghost" color="white" _hover={{ bg: "#1F2937" }}
                                onClick={onClose} isDisabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                bg={isPayable ? "#EF4444" : "#22C55E"}
                                _hover={{ bg: isPayable ? "#dc2626" : "#16a34a" }}
                                color="white"
                                isLoading={isSubmitting}
                                loadingText="Saving..."
                            >
                                Save Entry
                            </Button>
                        </Flex>
                    </Flex>
                </form>
            </Box>
        </Box>
    );
}

/* ─────────────────────────────────────────────
   Main LedgerModule
───────────────────────────────────────────── */
export default function LedgerModule({ type }) {
    const isPayable = type === "payable";

    const labels = {
        title: isPayable ? "Payable" : "Receivable",
        subtitle: isPayable ? "Money you have to pay" : "Money you will receive",
        totalAmount: isPayable ? "Total Payable" : "Total Receivable",
        pendingAmount: isPayable ? "Pending to Pay" : "Pending to Receive",
        completedAmount: isPayable ? "Total Paid" : "Total Received",
        addBtn: isPayable ? "Add Payable" : "Add Receivable",
        completedStatus: isPayable ? "Paid" : "Received",
        accentColor: isPayable ? "#EF4444" : "#22C55E",
    };

    const showToast = (title, icon = "success") => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: 2000,
            background: "#111827",
            color: "#fff",
        });
    };

    // ── State ──
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("pending"); // "pending" | "history"

    // Confirm dialog state
    const [confirmState, setConfirmState] = useState({
        isOpen: false, title: "", message: "", confirmLabel: "",
        onConfirm: null, danger: false,
    });

    // ── Fetch ──
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const ledgerType = isPayable ? "payable" : "receivable";

            const res = await fetch(`/api/ledger?type=${ledgerType}&limit=200`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to fetch data");
            const json = await res.json();
            setEntries(json.data || json);
        } catch (err) {
            showToast("Error fetching data", "error");
        } finally {
            setIsLoading(false);
        }
    }, [isPayable]);

    useEffect(() => { fetchData(); }, [fetchData]);

    // ── Create ──
    const handleCreate = async (values) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/ledger", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: values.title,
                    amount: parseFloat(values.amount),
                    type: isPayable ? "payable" : "receivable",
                    date: values.date,
                    note: values.note || "",
                }),
            });
            if (!res.ok) throw new Error("Failed to create entry");
            showToast("Entry added");
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            showToast(err.message, "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Mark Completed ──
    const confirmMarkCompleted = (item) => {
        setConfirmState({
            isOpen: true,
            title: `Mark as ${labels.completedStatus}?`,
            message: `Are you sure you want to mark "${item.title}" (Rs. ${item.amount.toLocaleString()}) as ${labels.completedStatus}? This will move it to Transactions.`,
            confirmLabel: `Yes, Mark ${labels.completedStatus}`,
            danger: false,
            onConfirm: () => markAsCompleted(item._id),
        });
    };

    const markAsCompleted = async (id) => {
        setConfirmState(s => ({ ...s, isOpen: false }));
        try {
            const res = await fetch("/api/ledger", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    status: "completed"
                }),
            });
            if (!res.ok) throw new Error("Failed to update status");
            showToast(`Marked as ${labels.completedStatus}`);
            fetchData();
        } catch (err) {
            showToast(err.message, "error");
        }
    };

    // ── Convert to Transaction ──
    const handleConvertToTransaction = async (item) => {
        const { value: wallet } = await Swal.fire({
            title: 'Select Wallet',
            text: `Where did you ${isPayable ? "pay" : "receive"} this Rs. ${item.amount.toLocaleString()}?`,
            input: 'select',
            inputOptions: {
                'cash': 'Cash Wallet',
                'online': 'Online / Bank'
            },
            inputPlaceholder: 'Choose wallet...',
            showCancelButton: true,
            background: "#111827",
            color: "#fff",
            confirmButtonColor: labels.accentColor,
            cancelButtonColor: "#374151",
            customClass: {
                popup: 'rounded-2xl border border-gray-700 shadow-2xl',
                input: 'bg-gray-900 text-white border-gray-700'
            }
        });

        if (wallet) {
            try {
                // 1. Create Transaction
                const tRes = await fetch("/api/transaction", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: item.title,
                        amount: item.amount,
                        type: isPayable ? "expense" : "income",
                        category: "Ledger",
                        wallet: wallet,
                        date: new Date(),
                        status: "paid",
                        note: `From Ledger: ${item.title}`
                    }),
                });

                if (!tRes.ok) {
                    const errorData = await tRes.json();
                    throw new Error(errorData.error || "Failed to create transaction");
                }

                const ledgerId = item._id.toString();
                console.log(`Converting ledger entry ${ledgerId} to transaction...`);

                // 2. Mark Ledger as Added
                const lRes = await fetch("/api/ledger", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: ledgerId,
                        isAddedToTransactions: true
                    }),
                });

                if (!lRes.ok) {
                    const errorData = await lRes.json();
                    throw new Error(errorData.error || "Failed to update ledger status");
                }

                const updatedEntry = await lRes.json();
                console.log("Updated Ledger Entry from Server:", updatedEntry);

                showToast("Added Transaction");
                fetchData();
            } catch (err) {
                console.error("Conversion error:", err);
                showToast(err.message || "Failed to add transaction", "error");
            }
        }
    };

    // ── Delete ──
    const confirmDelete = (item) => {
        setConfirmState({
            isOpen: true,
            title: "Delete Entry?",
            message: `Are you sure you want to permanently delete "${item.title}"? This action cannot be undone.`,
            confirmLabel: "Delete",
            danger: true,
            onConfirm: () => deleteEntry(item._id),
        });
    };

    const deleteEntry = async (id) => {
        setConfirmState(s => ({ ...s, isOpen: false }));
        try {
            const res = await fetch(`/api/ledger?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            showToast("Entry deleted", "info");
            fetchData();
        } catch (err) {
            showToast(err.message, "error");
        }
    };

    // ── Derived State ──
    // Pending entries (shown in table)
    const pendingEntries = entries.filter(e => e.status === "pending");
    const completedEntries = entries.filter(e => e.status === "completed");
    const totalAmount = entries.reduce((acc, e) => acc + e.amount, 0);
    const pendingAmount = pendingEntries.reduce((acc, e) => acc + e.amount, 0);
    const completedAmount = completedEntries.reduce((acc, e) => acc + e.amount, 0);

    const activeEntries = activeTab === "pending" ? pendingEntries : completedEntries;

    const filteredEntries = activeEntries.filter(e =>
        e.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );



    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" });
    };

    // ── Render ──
    return (
        <Box>
            {/* Header */}
            <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
                <Box>
                    <Text fontSize="2xl" fontWeight="bold" color="white">{labels.title}</Text>
                    <Text fontSize="sm" color="#6B7280" mt={0.5}>{labels.subtitle}</Text>
                </Box>
                <Button
                    bg={labels.accentColor}
                    _hover={{ opacity: 0.85 }}
                    color="white"
                    borderRadius="10px"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Flex align="center" gap={2}><FiPlus /> {labels.addBtn}</Flex>
                </Button>
            </Flex>

            {/* Summary Cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={6}>
                <StatsCard
                    title={labels.totalAmount}
                    amount={totalAmount.toLocaleString()}
                    icon={FiDollarSign}
                    color="#6366F1"
                    change={0}
                />
                <StatsCard
                    title={labels.pendingAmount}
                    amount={pendingAmount.toLocaleString()}
                    icon={FiClock}
                    color="#F59E0B"
                    change={0}
                />
                <StatsCard
                    title={labels.completedAmount}
                    amount={completedAmount.toLocaleString()}
                    icon={FiCheckCircle}
                    color="#22C55E"
                    change={0}
                />
            </SimpleGrid>

            {/* Search and Tabs */}
            <Flex gap={4} mb={6} flexWrap="wrap" alignItems="center" justify="space-between">
                <Flex gap={4} align="center" flexWrap="wrap">
                    <Flex
                        alignItems="center" bg="#1F2937" px={3} borderRadius="10px"
                        w={{ base: "100%", md: "280px" }} h="40px"
                        border="1px solid #374151"
                    >
                        <FiSearch color="#9CA3AF" />
                        <Input
                            placeholder="Search by title..."
                            border="none" _focus={{ boxShadow: "none" }} ml={2}
                            color="white" _placeholder={{ color: "#6B7280" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Flex>
                    
                    {/* View Toggle Tabs */}
                    <Flex bg="#111827" p={1} borderRadius="12px" border="1px solid #1F2937">
                        <Button
                            size="sm"
                            variant="ghost"
                            borderRadius="10px"
                            bg={activeTab === "pending" ? "#1F2937" : "transparent"}
                            color={activeTab === "pending" ? "white" : "#6B7280"}
                            _hover={{ bg: "#1F2937", color: "white" }}
                            onClick={() => setActiveTab("pending")}
                            px={5}
                        >
                            Active
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            borderRadius="10px"
                            bg={activeTab === "history" ? "#1F2937" : "transparent"}
                            color={activeTab === "history" ? "white" : "#6B7280"}
                            _hover={{ bg: "#1F2937", color: "white" }}
                            onClick={() => setActiveTab("history")}
                            px={5}
                        >
                            History
                        </Button>
                    </Flex>
                </Flex>

                <Text fontSize="sm" color="#6B7280">
                    Showing <Text as="span" color="white" fontWeight="semibold">{filteredEntries.length}</Text> {activeTab} {type}(s)
                </Text>
            </Flex>

            {/* Table */}
            <Card>
                <Box overflowX="auto">
                    {isLoading ? (
                        <Flex justify="center" align="center" py={12} gap={3}>
                            <Spinner size="md" color={labels.accentColor} />
                            <Text color="#9CA3AF">Loading entries...</Text>
                        </Flex>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse", color: "white", whiteSpace: "nowrap" }}>
                            <thead>
                                <tr style={{ textAlign: "left", borderBottom: "1px solid #1F2937" }}>
                                    {["Title", "Amount", "Date", "Note", "Status", "Actions"].map((col) => (
                                        <th
                                            key={col}
                                            style={{
                                                padding: "12px 14px", color: "#6B7280",
                                                fontWeight: "500", fontSize: "12px",
                                                textTransform: "uppercase", letterSpacing: "0.05em",
                                                textAlign: col === "Actions" ? "right" : "left",
                                            }}
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEntries.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ padding: "48px", textAlign: "center", color: "#6B7280" }}>
                                            <Box>
                                                <Text fontSize="3xl" mb={2}>📭</Text>
                                                <Text fontWeight="semibold" color="#9CA3AF" mb={1}>
                                                    No {activeTab} {type}s found
                                                </Text>
                                                <Text fontSize="sm">
                                                    {searchQuery ? "Try a different search term." : (activeTab === "pending" ? `Click "${labels.addBtn}" to get started.` : "Your completed entries will appear here.")}
                                                </Text>
                                            </Box>
                                        </td>
                                    </tr>
                                ) : filteredEntries.map((item) => (
                                    <tr
                                        key={item._id}
                                        style={{ borderBottom: "1px solid #111827", transition: "background 0.15s" }}
                                        onMouseEnter={e => e.currentTarget.style.background = "#0D1520"}
                                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                    >
                                        <td style={{ padding: "14px 14px", fontWeight: "600" }}>{item.title}</td>
                                        <td style={{ padding: "14px 14px", color: labels.accentColor, fontWeight: "700", fontVariantNumeric: "tabular-nums" }}>
                                            Rs. {item.amount.toLocaleString()}
                                        </td>
                                        <td style={{ padding: "14px 14px", color: "#9CA3AF", fontSize: "14px" }}>
                                            {formatDate(item.date)}
                                        </td>
                                        <td style={{ padding: "14px 14px", color: "#6B7280", fontSize: "14px", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {item.note || <Text as="span" color="#374151">—</Text>}
                                        </td>
                                        <td style={{ padding: "14px 14px" }}>
                                            <Box
                                                as="span"
                                                px={3}
                                                py={1}
                                                borderRadius="20px"
                                                fontSize="12px"
                                                fontWeight="600"
                                                display="inline-block"
                                                bg={
                                                    item.status === "pending"
                                                        ? "rgba(245, 158, 11, 0.1)"
                                                        : "rgba(34, 197, 94, 0.1)"
                                                }
                                                color={
                                                    item.status === "pending"
                                                        ? "#F59E0B"
                                                        : "#22C55E"
                                                }
                                                border={
                                                    item.status === "pending"
                                                        ? "1px solid rgba(245, 158, 11, 0.25)"
                                                        : "1px solid rgba(34, 197, 94, 0.25)"
                                                }
                                            >
                                                {item.status === "pending"
                                                    ? "Pending"
                                                    : labels.completedStatus}
                                            </Box>
                                        </td>
                                        <td style={{ padding: "14px 14px", textAlign: "right" }}>
                                            <Flex justify="flex-end" gap={2}>
                                                {item.status === "pending" ? (
                                                    <Button
                                                        size="sm" bg="rgba(34,197,94,0.1)"
                                                        _hover={{ bg: "#22C55E", color: "white" }}
                                                        color="#22C55E" border="1px solid rgba(34,197,94,0.3)"
                                                        borderRadius="8px"
                                                        onClick={() => confirmMarkCompleted(item)}
                                                        title={`Mark as ${labels.completedStatus}`}
                                                    >
                                                        <Flex align="center" gap={1} fontSize="xs">
                                                            <FiCheck /> {labels.completedStatus}
                                                        </Flex>
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="sm" 
                                                        bg={item.isAddedToTransactions ? "rgba(99,102,241,0.1)" : "rgba(250,204,21,0.1)"}
                                                        _hover={{ opacity: 0.8 }}
                                                        color={item.isAddedToTransactions ? "#818CF8" : "#FACC15"} 
                                                        border={item.isAddedToTransactions ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(250,204,21,0.3)"}
                                                        borderRadius="8px"
                                                        onClick={() => !item.isAddedToTransactions && handleConvertToTransaction(item)}
                                                        isDisabled={item.isAddedToTransactions}
                                                        title={item.isAddedToTransactions ? "Already added to transactions" : "Add to Transactions"}
                                                    >
                                                        <Flex align="center" gap={1} fontSize="xs">
                                                            {item.isAddedToTransactions ? <FiCheckCircle /> : <FiPlus />}
                                                            {item.isAddedToTransactions ? "Added Transaction" : "Add Transaction"}
                                                        </Flex>
                                                    </Button>
                                                )}
                                                <Button
                                                    size="sm" bg="rgba(239,68,68,0.1)"
                                                    _hover={{ bg: "#EF4444", color: "white" }}
                                                    color="#EF4444" border="1px solid rgba(239,68,68,0.3)"
                                                    borderRadius="8px"
                                                    onClick={() => confirmDelete(item)}
                                                    title="Delete"
                                                >
                                                    <FiTrash2 />
                                                </Button>
                                            </Flex>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Box>
            </Card>

            {/* Add Modal */}
            <AddEntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
                isPayable={isPayable}
                labels={labels}
                isSubmitting={isSubmitting}
            />

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={confirmState.isOpen}
                title={confirmState.title}
                message={confirmState.message}
                confirmLabel={confirmState.confirmLabel}
                danger={confirmState.danger}
                onConfirm={confirmState.onConfirm}
                onCancel={() => setConfirmState(s => ({ ...s, isOpen: false }))}
            />
        </Box>
    );
}