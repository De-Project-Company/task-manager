/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useUserCtx } from "@/context/UserCtx";
import Image from "next/image";
import { DirectRight } from "iconsax-react";
import { timeAgo } from "@/utils";
import { getcomment, makecomment } from "@/actions/comment";
import FormSuccess from "@/components/form/Success";
import FormError from "@/components/form/Error";

interface CommentProps {
  _id: string;
  comment: string;
  commentBy: {
    _id: string;
    name: string;
    email: string;
    companyName: string;
    role: string;
    createdAt: string;
    __v: number;
  };
  project: string;
  createdAt: string;
  __v: number;
}

const ProjectComments = ({ projectId }: { projectId: string }) => {
  const { user } = useUserCtx();

  const [Status, setStatus] = useState("idle");
  // console.log(Status);
  const [commentText, setCommentText] = useState("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const [Comments, setComments] = useState([] as CommentProps[]);

  useEffect(() => {
    const fetchcomments = async () => {
      setStatus("loading");
      try {
        const res = await getcomment(projectId);

        if (res?.status === "success") {
          setComments(res?.comments || []);
          setStatus("success");
        }
      } catch (error) {
        setStatus("error");
        console.error("An error occurred while fetching comments:", error);
      }
    };

    fetchcomments();
  }, [projectId]);

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStatus("loading");
      const result = await makecomment(projectId, commentText);
      if (result?.status === "success") {
        setSuccess("Comment submitted successfully!");
        setError(undefined);
        setCommentText("");
        setStatus("success");
        const updatedComments = await getcomment(projectId);
        if (updatedComments?.status === "success") {
          setComments(updatedComments?.comments || []);
        }
      } else {
        setError("Comment submission failed. Please try again.");
        setSuccess(undefined);
        setStatus("error");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setSuccess(undefined);
      setStatus("error");
    }
  };

  useEffect(() => {
    const clearMessages = () => {
      setTimeout(() => {
        setSuccess(undefined);
        setError(undefined);
      }, 5000);
    };

    clearMessages();
  }, [success, error, Status]);

  const isCommentValid = commentText.length >= 5;

  const [visibleComments, setVisibleComments] = useState(3);
  const handleSeeMore = () => {
    setVisibleComments((prevCount) => prevCount + 3);
  };
 const handleViewLess = () => {
   setVisibleComments((prevCount) => Math.max(3, prevCount - 3));
 };

  const isLoaading = Status === "loading";

  return (
    <div className="py-6 lg:py-8 mt-12 flex w-full flex-col gap-y-2 max-lg:items-center px-1 max-h-[500px] overflow-y-auto overflow-x-hidden no-scroll">
      <h3 className="text-xl font-medium sm:text-3xl text-header dark:text-white max-lg:w-full text-center">
        Comments
      </h3>
      {Comments && Comments.length > 0 ? (
        <>
          {Comments.slice(0, visibleComments).map((comment) => (
            <div
              className="flex items-start gap-x-2 py-2 w-full border-b border-[#e1e1e1] dark:border-primary-light"
              key={comment._id}
            >
              {comment.commentBy && comment.commentBy.name && (
                <Image
                  src={`https://ui-avatars.com/api/?name=${comment.commentBy
                    .name!}&background=random`}
                  alt={comment.commentBy.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="flex flex-col w-full">
                <div className="flex w-full justify-between">
                  <p className="text-sm lg:text-base font-medium dark:text-gray-100 tracking-wide">
                    {comment.commentBy.name}
                  </p>
                  <p className="text-xs text-header dark:text-gray-300 italic">
                    {timeAgo(comment.createdAt)}
                  </p>
                </div>
                <p className="text-sm dark:text-gray-300">{comment.comment}</p>
              </div>
            </div>
          ))}
          {Comments.length > 3 && visibleComments < Comments.length && (
            <div className="flex justify-center">
              <button
                onClick={handleSeeMore}
                className="text-sm text-primary cursor-pointer"
              >
                See More
              </button>
            </div>
          )}
          {visibleComments > 3 && (
            <div className="flex justify-center">
              <button
                onClick={handleViewLess}
                className="text-sm text-primary cursor-pointer"
              >
                View Less
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="w-full text-center dark:text-gray-200">
          There are no comments yet for this project
        </p>
      )}

      <div className="flex items-start gap-x-2 max-lg:w-full max-lg:justify-center mt-4">
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
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            name="comment"
            id="comment"
            placeholder="Leave a comment"
            className="w-full resize-none h-[193px] rounded-xl border border-[#e1e1e1] dark:border-primary/50 px-4 py-2 sidebar-scroll outline-none text-black dark:text-white focus-visible:border-primary transition-all duration-300 dark:bg-gray-950"
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex w-full justify-end">
            <button
              disabled={!isCommentValid || isLoaading}
              aria-disabled={!isCommentValid}
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
