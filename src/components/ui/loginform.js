"use client";

import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const handleSignIn = () => {
        router.push("/admin/users");
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <div className="bg-white w-[400px] p-10 rounded-lg shadow">
                <h2 className="text-center text-2xl font-bold mb-6">Connect With Us</h2>
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        disabled
                        className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        disabled
                        className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                    <button
                        type="button"
                        onClick={handleSignIn}
                        className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}