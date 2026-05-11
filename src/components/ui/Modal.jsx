"use client";
export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-[90%] md:w-[400px]">
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 text-red-500 text-sm"
                >
                    Close
                </button>
            </div>
        </div>
    );
}