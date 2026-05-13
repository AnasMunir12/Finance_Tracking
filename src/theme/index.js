import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                brand: {
                    500: { value: "#FACC15" },
                },
            },
            fonts: {
                heading: { value: "Inter, sans-serif" },
                body: { value: "Inter, sans-serif" },
            },
            radii: {
                md: { value: "10px" },
                lg: { value: "14px" },
            },
        },
        semanticTokens: {
            colors: {
                // Backgrounds
                appBg: {
                    value: {
                        _light: "#F9FAFB", // gray.50
                        _dark: "#0B0F19",
                    }
                },
                cardBg: {
                    value: {
                        _light: "#FFFFFF",
                        _dark: "#111827",
                    }
                },
                subtleBg: {
                    value: {
                        _light: "#F3F4F6", // gray.100
                        _dark: "#1F2937",
                    }
                },
                
                // Borders
                mainBorder: {
                    value: {
                        _light: "#E5E7EB", // gray.200
                        _dark: "#1F2937",
                    }
                },

                // Text
                mainText: {
                    value: {
                        _light: "#111827", // gray.900
                        _dark: "#FFFFFF",
                    }
                },
                mutedText: {
                    value: {
                        _light: "#4B5563", // gray.600
                        _dark: "#9CA3AF", // gray.400
                    }
                },
                dimText: {
                    value: {
                        _light: "#6B7280", // gray.500
                        _dark: "#6B7280",
                    }
                }
            },
        },
    },
});

export default system;