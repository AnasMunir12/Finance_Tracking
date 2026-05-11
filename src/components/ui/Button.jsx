"use client";
export default function Button({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 ${className}`}
        >
            {children}
        </button>
    );
}