"use client";

import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <li className="list-none">
            <button
                onClick={() => signIn()}
                className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            >
                Sign In
            </button>
        </li>
    );
}
