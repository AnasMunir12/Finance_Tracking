export default function Input({ ...props }) {
    return (
        <input
            {...props}
            className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />
    );
}