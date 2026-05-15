import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                brand: {
                    50: { value: "#eef2ff" },
                    100: { value: "#e0e7ff" },
                    200: { value: "#c7d2fe" },
                    300: { value: "#a5b4fc" },
                    400: { value: "#818cf8" },
                    500: { value: "#6366f1" }, // Indigo
                    600: { value: "#4f46e5" },
                    700: { value: "#4338ca" },
                    800: { value: "#3730a3" },
                    900: { value: "#312e81" },
                },
                accent: {
                    500: { value: "#FACC15" }, // Keeping the yellow as an accent
                }
            },
            fonts: {
                heading: { value: "'Inter', sans-serif" },
                body: { value: "'Inter', sans-serif" },
            },
            radii: {
                sm: { value: "6px" },
                md: { value: "10px" },
                lg: { value: "16px" },
                xl: { value: "24px" },
            },
            shadows: {
                soft: { value: "0 2px 10px 0 rgba(0, 0, 0, 0.05)" },
                premium: { value: "0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)" },
            }
        },
        semanticTokens: {
            colors: {
                // Backgrounds
                appBg: {
                    value: {
                        _light: "#F8FAFC", // slate.50
                        _dark: "#0F172A", // slate.900
                    }
                },
                cardBg: {
                    value: {
                        _light: "#FFFFFF",
                        _dark: "#1E293B", // slate.800
                    }
                },
                subtleBg: {
                    value: {
                        _light: "#F1F5F9", // slate.100
                        _dark: "#334155", // slate.700
                    }
                },
                
                // Borders
                mainBorder: {
                    value: {
                        _light: "#E2E8F0", // slate.200
                        _dark: "#334155", // slate.700
                    }
                },

                // Text
                mainText: {
                    value: {
                        _light: "#0F172A", // slate.900
                        _dark: "#F8FAFC", // slate.50
                    }
                },
                mutedText: {
                    value: {
                        _light: "#64748B", // slate.500
                        _dark: "#94A3B8", // slate.400
                    }
                },
                dimText: {
                    value: {
                        _light: "#94A3B8", // slate.400
                        _dark: "#64748B", // slate.500
                    }
                },

                // Accents
                primary: {
                    value: {
                        _light: "{colors.brand.600}",
                        _dark: "{colors.brand.400}",
                    }
                },
                primaryHover: {
                    value: {
                        _light: "{colors.brand.700}",
                        _dark: "{colors.brand.500}",
                    }
                }
            },
        },
    },
});

export default system;