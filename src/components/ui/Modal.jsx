"use client";

import { Box, Portal, Flex, IconButton } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";

export default function Modal({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;

    return (
        <Portal>
            <Box
                position="fixed"
                top="0"
                left="0"
                w="full"
                h="full"
                bg="blackAlpha.600"
                backdropFilter="blur(4px)"
                zIndex="2000"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={4}
                onClick={onClose}
            >
                <Box
                    bg="cardBg"
                    p={6}
                    borderRadius="xl"
                    boxShadow="premium"
                    w="full"
                    maxW="450px"
                    onClick={(e) => e.stopPropagation()}
                    position="relative"
                    animation="modalIn 0.3s ease-out"
                >
                    <Flex justify="flex-end" mb={2}>
                        <IconButton
                            aria-label="Close"
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            _hover={{ bg: "subtleBg" }}
                        >
                            <FiX />
                        </IconButton>
                    </Flex>
                    <Box>
                        {children}
                    </Box>
                </Box>
            </Box>
            <style jsx global>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </Portal>
    );
}