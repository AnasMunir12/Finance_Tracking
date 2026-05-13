"use client";

import { Flex, Input } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useColorModeValue } from "../../components/ui/color-mode";

const SelectInput = ({ options, placeholder, value, onChange }) => (
    <select
        style={{
            background: useColorModeValue("#F3F4F6", "#1F2937"),
            color: useColorModeValue("#111827", "white"),
            border: `1px solid ${useColorModeValue("#E5E7EB", "#374151")}`,
            padding: "10px 16px",
            borderRadius: "10px",
            outline: "none",
            minWidth: "140px",
            height: "40px",
            fontSize: "14px"
        }}
        value={value}
        onChange={onChange}
    >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
    </select>
);

export default function TransactionsFilter({
    searchQuery, setSearchQuery,
    typeFilter, setTypeFilter,
    categoryFilter, setCategoryFilter,
    walletFilter, setWalletFilter,
    dateFilter, setDateFilter,
    sortBy, setSortBy
}) {
    return (
        <Flex
            gap={4}
            mb={6}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
        >
            <Flex gap={4} flexWrap="wrap" flex="1" alignItems="center">
                {/* Search */}
                <Flex
                    alignItems="center"
                    bg="subtleBg"
                    px={3}
                    borderRadius="10px"
                    w={{ base: "100%", md: "250px" }}
                    h="40px"
                    border="1px solid"
                    borderColor="mainBorder"
                >
                    <FiSearch color="mutedText" />
                    <Input
                        placeholder="Search by title..."
                        border="none"
                        _focus={{ boxShadow: "none" }}
                        ml={2}
                        color="mainText"
                        _placeholder={{ color: "dimText" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Flex>

                {/* Filters */}
                <SelectInput
                    placeholder="All Types"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    options={[
                        { value: "income", label: "Income" },
                        { value: "expense", label: "Expense" },
                        { value: "transfer", label: "Transfer" },
                    ]}
                />

                <SelectInput
                    placeholder="All Categories"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    options={[
                        { value: "Food", label: "Food" },
                        { value: "Salary", label: "Salary" },
                        { value: "Rent", label: "Rent" },
                        { value: "Freelance", label: "Freelance" },
                        { value: "Shopping", label: "Shopping" },
                        { value: "Other", label: "Other" }
                    ]}
                />

                <SelectInput
                    placeholder="All Wallets"
                    value={walletFilter}
                    onChange={(e) => setWalletFilter(e.target.value)}
                    options={[
                        { value: "cash", label: "Cash" },
                        { value: "online", label: "Online" },
                    ]}
                />

                <SelectInput
                    placeholder="Date Range"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    options={[
                        { value: "today", label: "Today" },
                        { value: "this_week", label: "This Week" },
                        { value: "this_month", label: "This Month" },
                    ]}
                />

                {/* Sort */}
                <SelectInput
                    placeholder="Sort By"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    options={[
                        { value: "latest", label: "Latest" },
                        { value: "highest", label: "Highest Amount" },
                    ]}
                />
            </Flex>
        </Flex>
    );
}
