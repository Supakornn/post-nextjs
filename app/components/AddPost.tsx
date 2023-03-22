"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    // Create Post
    const { mutate } = useMutation(
        async (title: string) => await axios.post("/api/posts/addPost", { title }),
        {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message);
                }
                setIsDisabled(false);
            },
            onSuccess: (data) => {
                console.log(data);
                setTitle("");
                setIsDisabled(false);
            }
        }
    );

    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDisabled(true);
        mutate(title);
    };

    return (
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea
                    className="p-4 text-lg rounded-md my-2 bg-gray-200"
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    value={title}
                    placeholder="What's on your mind?"
                ></textarea>
                <div className="flex items-center justify-between gap-2">
                    <p
                        className={`font-bold text-sm ${
                            title.length > 300 ? "text-red-700" : "text-gray-700"
                        }`}
                    >
                        {" "}
                        {`${title.length}/300`}
                    </p>
                    <button
                        disabled={isDisabled}
                        className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                        type="submit"
                    >
                        Create Post
                    </button>
                </div>
            </div>
        </form>
    );
}
