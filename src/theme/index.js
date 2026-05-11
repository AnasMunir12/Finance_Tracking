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
                bg: { value: "#0B0F19" },
                fg: { value: "#F9FAFB" },
            },
        },
    },
});

export default system;