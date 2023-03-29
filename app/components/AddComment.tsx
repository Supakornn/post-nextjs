"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type PostProps = {
    id?: string;
};

type Comment = {
    postId?: string;
    title: string;
};

export default function AddComment({ id }: PostProps) {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient();
    let commentToastId: string;

    const { mutate } = useMutation(
        async (data: Comment) => {
            return axios.post("/api/posts/addComment", { data });
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["detail-post"]);
                setTitle("");
                setIsDisabled(false);
                toast.success("Added your comment", { id: commentToastId });
            },
            onError: (error) => {
                console.log(error);
                setIsDisabled(false);
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, { id: commentToastId });
                }
            }
        }
    );

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDisabled(true);
        commentToastId = toast.loading("Adding your comment", { id: commentToastId });
        mutate({ title, postId: id });
    };

    return (
        <form onSubmit={submitComment} className="my-8">
            <h3>Add a Comment</h3>
            <div className="flex flex-col my-2">
                <input
                    type="text"
                    name="title"
                    value={title}
                    className="p-4 text-lg rounded-md my-2"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className=" flex items-center gap-2">
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >
                    Add Comment
                </button>
                <p
                    className={`font-bold text-sm ${
                        title.length > 300 ? "text-red-700" : "text-gray-700"
                    } `}
                >{`${title.length}/300`}</p>
            </div>
        </form>
    );
}
