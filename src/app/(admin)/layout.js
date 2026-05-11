"use client";

import { Flex, Box, useDisclosure } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function AdminLayout({ children }) {
    const disclosure = useDisclosure();

    return (
        <Flex minH="100vh" bg="#0B0F19">

            {/* Sidebar */}
            <Sidebar
                isOpen={disclosure.open !== undefined ? disclosure.open : disclosure.isOpen}
                onClose={disclosure.onClose}
            />

            {/* Main Content */}
            <Flex
                direction="column"
                flex="1"
                ml={{ base: "0", lg: "250px" }}
            >
                <Navbar onOpen={disclosure.onOpen} />
                <Box p={6}>{children}</Box>
            </Flex>
        </Flex>
    );
}