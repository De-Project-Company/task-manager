/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useUserCtx } from "@/context/UserCtx";
import Image from "next/image";
import { DirectRight } from "iconsax-react";
import { commentsTime, generateId } from "@/utils";

interface Comment {
  id?: string;
  comment: string;
  time: number | null;
  author: string;
}

const ProjectCommentsBackUp = () => {
  const { user } = useUserCtx();

  const [comment, setComment] = useState({
    id: "",
    comment: "",
    time: null,
    author: user?.name,
  });
  const [comments, setComments] = useState<Comment[]>([]);

  const handleComment = (e: FormEvent) => {
    e.preventDefault();

    setComments((prevComment) => [
      ...prevComment,
      {
        id: generateId(),
        comment: comment.comment,
        time: new Date().getTime() / 1000,
        author: user?.name!,
      },
    ]);
    setComment({
      id: "",
      comment: "",
      time: null,
      author: user?.name,
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Force a re-render by updating the state
      setComments((prevComments) => [...prevComments]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  // To-Do: get comments from local storage
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    // save comments to local storage
    if (!comments || !comments.length) return;
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <div className="border-t border-[#e1e1e1] py-6 lg:py-8 mt-4 flex w-full flex-col gap-y-5 lg:gap-y-8 max-lg:items-center px-1">
      <h3 className="text-xl font-medium sm:text-3xl text-header max-lg:w-full text-center">
        Comments
      </h3>
      {comments.length > 0 ? (
        <div className="flex w-full max-w-[600px] py-6 flex-col">
          {comments.map((comment) => (
            <div
              className="flex items-start gap-x-2 py-2 w-full border-b border-[#e1e1e1]"
              key={comment.id}
            >
              <Image
                src={user.image}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col w-full">
                <div className="flex w-full justify-between">
                  <p className="text-sm lg:text-base font-medium">
                    {comment.author}
                  </p>
                  <p className="text-xs text-header italic">
                    {commentsTime(comment.time!)}
                  </p>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="w-full text-center">
          There are no comments yet for this project
        </p>
      )}

      <div className="flex items-start gap-x-2 max-lg:w-full max-lg:justify-center">
        <Image
          src={user.image}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <form
          className="flex flex-col w-full max-w-[600px] gap-y-2"
          onSubmit={handleComment}
        >
          <textarea
            onChange={(e) =>
              setComment({ ...comment, [e.target.name]: e.target.value })
            }
            value={comment.comment}
            name="comment"
            id="comment"
            placeholder="Leave a comment"
            className="w-full resize-none h-[193px] rounded-xl border border-[#e1e1e1] px-4 py-2 sidebar-scroll outline-none focus-visible:border-primary transition-all duration-300"
          />

          <div className="flex w-full justify-end">
            <button
              disabled={!(comment.comment.length > 2)}
              aria-disabled={!(comment.comment.length > 2)}
              tabIndex={0}
              aria-label="comment"
              type="submit"
              className="text-sm font-medium mt-2 bg-primary-light text-white h-[48px] hover:bg-primary rounded-lg px-4 transition-all duration-300 flex items-center gap-x-2 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-primary-light"
            >
              Comment
              <DirectRight size={18} values="Outline" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCommentsBackUp;

// to-do
