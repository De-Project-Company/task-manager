/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useUserCtx } from "@/context/UserCtx";
import Image from "next/image";
import { DirectRight, Message } from "iconsax-react";
import { commentsTime, generateId } from "@/utils";
import { FaBriefcase } from "react-icons/fa";

interface Comment {
  id?: string;
  comment: string;
  time: number | null;
  author: string;
}
interface Comments {
  [projectId: string]: {
    project_id: string;
    comments: Comment[];
  };
}

const ProjectComments = ({ projectId }: { projectId: string }) => {
  const { user } = useUserCtx();

  const [comment, setComment] = useState({
    id: "",
    comment: "",
    time: null,
    author: user?.name,
  });
  const [comments, setComments] = useState<Comments>({
    [projectId]: {
      project_id: projectId,
      comments: [],
    },
  });

  const handleComment = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    setComments((prevComments) => {
      const existingComments = prevComments[projectId] || {
        project_id: projectId,
        comments: [],
      };

      return {
        ...prevComments,
        [projectId]: {
          ...existingComments,
          comments: [
            ...existingComments.comments,
            {
              id: generateId(),
              comment: comment.comment,
              time: new Date().getTime() / 1000,
              author: user?.name,
            },
          ],
        },
      };
    });

    setComment({
      id: "",
      comment: "",
      time: null,
      author: user?.name,
    });
  };

  useEffect(() => {
    if (!comments[projectId]?.comments.length) return;
    // Force a re-render by updating the state
    const intervalId = setInterval(() => {
      setComments((prevComments) => {
        const existingComments = prevComments[projectId] || {
          project_id: projectId,
          comments: [],
        };
        return {
          ...prevComments,
          [projectId]: {
            ...existingComments,
            comments: [...existingComments.comments],
          },
        };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [comments[projectId]?.comments]);

  // get comments from local storage

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    // save comments to local storage
    if (!comments[projectId]?.comments.length) return;
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <div className="py-6 lg:py-8 mt-12 flex w-full flex-col gap-y-5 lg:gap-y-8 max-lg:items-center px-1">
      <h3 className="text-xl font-medium sm:text-3xl text-header dark:text-white max-lg:w-full text-center">
        Comments
      </h3>
      {comments[projectId]?.project_id === projectId &&
      comments[projectId]?.comments.length > 0 ? (
        <div className="flex w-full max-w-[600px] py-6 flex-col">
          {comments[projectId]?.comments.map((comment) => (
            <div
              className="flex items-start gap-x-2 py-2 w-full border-b border-[#e1e1e1] dark:border-primary-light"
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
                  <p className="text-sm lg:text-base font-medium dark:text-gray-100 tracking-wide">
                    {comment.author}
                  </p>
                  <p className="text-xs text-header dark:text-gray-300 italic">
                    {commentsTime(comment.time!)}
                  </p>
                </div>
                <p className="text-sm dark:text-gray-300">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="w-full text-center  dark:text-gray-200">
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
            className="w-full resize-none h-[193px] rounded-xl border border-[#e1e1e1] dark:border-primary/50 px-4 py-2 sidebar-scroll outline-none text-black dark:text-white focus-visible:border-primary transition-all duration-300 dark:bg-gray-950"
          />

          <div className="flex w-full justify-end">
            <button
              disabled={!(comment.comment.length > 2)}
              aria-disabled={!(comment.comment.length > 2)}
              tabIndex={0}
              aria-label="comment"
              type="submit"
              className="text-sm font-medium mt-2 bg-primary  text-white h-[48px] rounded-lg px-4 transition-all duration-300 flex items-center gap-x-2 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-primary-light"
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

export default ProjectComments;
