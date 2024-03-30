"use client";

import { X } from "lucide-react";
import { cn } from "@/utils";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useStateCtx } from "@/context/StateCtx";
import FormSuccess from "@/components/form/Success";
import FormError from "@/components/form/Error";
import { useProjectCtx } from "@/context/Projectctx";
import { updateTaskStatus } from "@/actions/task";
import { Owner } from "@/types";
import { useUserCtx } from "@/context/UserCtx";

type StatusProps = {
  id?: number;
  label: string;
};
const STATUSES: StatusProps[] = [
  {
    id: 1,
    label: "Todo",
  },
  {
    id: 2,
    label: "InProgress",
  },
  {
    id: 3,
    label: "InReview",
  },
  {
    id: 4,
    label: "Done",
  },
];

interface ChanegStatusProps {
  projectid?: string;
  taskid?: string;
  owner?: Owner;
  prevStatus?: string;
}

const ChangeTaskStatus = ({
  projectid,
  owner,
  prevStatus,
}: ChanegStatusProps) => {
  const { ChangeTaskStatusModal, setChangeTaskStatusModal } = useStateCtx();
  const { setUpdate, selectedTask, setSelectedTask } = useProjectCtx();
  const { user } = useUserCtx();

  // console.log(selectedTask);

  const isAdmin = owner?._id === user.id;

  const [selectedStatus, setSelectedStatus] = useState<
    StatusProps["label"] | null
  >(prevStatus!);
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const filteredStatuses = isAdmin ? STATUSES : STATUSES.slice(0, 3);

  const handleUpdateStatus = async () => {
    try {
      setLoading(true);

      const result = await updateTaskStatus(
        selectedTask,
        projectid!,
        selectedStatus!
      );

      if (result?.status === "success") {
        setUpdate(true);
        setSuccess("updated successfully!");
        setTimeout(() => {
          setChangeTaskStatusModal(false);
          router.refresh();
        }, 100);
      } else {
        setError(result?.error);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          ChangeTaskStatusModal
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => {
          setChangeTaskStatusModal(false);
          setSelectedStatus(prevStatus!);
          setSelectedTask("");
        }}
      />

      <div
        role="dialog"
        aria-labelledby="make-payment"
        className={cn(
          "py-6   flex flex-col max-[400px]:w-[300px] w-[360px] h-[400px] md:h-[450px] lg:w-[400px]  justify-between items-start bg-white dark:bg-primary backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[999]  transition-all opacity-0 select-none -translate-x-1/2",
          ChangeTaskStatusModal
            ? "scale-100 duration-500 opacity-100 rounded-xl md:rounded-2xl"
            : "scale-0 duration-200 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] dark:border-primary-light pb-4 pl-4 px-4 md:pl-8 ">
          <h3 className="text-lg md:text-2xl font-medium text-header dark:text-gray-100">
            Change Status
          </h3>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => {
              setChangeTaskStatusModal(false);
              setSelectedStatus(prevStatus!);
              setSelectedTask("");
            }}
            className="text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full dark:text-[#e80000]"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex w-full h-full pt-4 sm:pt-6 items-center flex-col gap-y-4">
          <p className="text-center text-base sm:text-lg font-semibold dark:text-gray-200">
            Select Status
          </p>
          <div className="flex flex-col gap-y-4 md:gap-y-6">
            {STATUSES.map((status) =>
              (isAdmin && status.label === "Done") ||
              (!isAdmin && status?.id! <= 3) ? (
                <p
                  key={status.id}
                  className={cn(
                    "text-center text-sm md:text-base flex items-center gap-x-2 transition-all duration-300",
                    selectedStatus === "final" && status.label !== "final"
                      ? "opacity-40"
                      : "",
                    {
                      "font-medium": status.label === selectedStatus,
                      "text-[#eea300] ": status.label === "in-progress",
                      "text-[#008d36] dark:text-[#0ce15d] ":
                        status.label === "completed",
                      "text-primary dark:text-white ":
                        status.label === "pending",
                    }
                  )}
                >
                  <button
                    onClick={() => {
                      setSelectedStatus(status.label);
                    }}
                    type="button"
                    className={cn(
                      "w-6 h-6 rounded-full border-primary dark:border-white border flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                      {
                        " p-1": status.label === selectedStatus,
                      }
                    )}
                  >
                    {selectedStatus === status.label && (
                      <span className="bg-primary dark:bg-white h-full w-full rounded-full" />
                    )}
                  </button>
                  <span className="capitalize">{status.label} </span>
                </p>
              ) : null
            )}
          </div>
          {/* <div className="flex flex-col gap-y-4 md:gap-y-6">
            {filteredStatuses.map((status) => (
              <p
                key={status.id}
                className={cn(
                  "text-center text-sm md:text-base flex items-center gap-x-2 transition-all duration-300",
                  selectedStatus === "final" && status.label !== "final"
                    ? "opacity-40"
                    : "",
                  {
                    " font-medium": status.label === selectedStatus,
                    "text-[#eea300] ": status.label === "in-progress",
                    "text-[#008d36] dark:text-[#0ce15d] ":
                      status.label === "completed",
                    "text-primary dark:text-white ": status.label === "pending",
                  }
                )}
              >
                <button
                  onClick={() => {
                    setSelectedStatus(status.label);
                  }}
                  type="button"
                  className={cn(
                    "w-6 h-6 rounded-full border-primary dark:border-white border flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                    {
                      " p-1": status.label === selectedStatus,
                    }
                  )}
                >
                  {selectedStatus === status.label && (
                    <span className="bg-primary dark:bg-white h-full w-full rounded-full" />
                  )}
                </button>
                <span className="capitalize">{status.label} </span>
              </p>
            ))}
          </div> */}
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <div className="flex w-full justify-center h-full pt-4 sm:pt-9">
          <button
            type="button"
            tabIndex={0}
            disabled={!selectedStatus || loading}
            onClick={handleUpdateStatus}
            aria-label="Change Status"
            className={cn(
              "mt-2 rounded-lg bg-primary text-white dark:bg-white dark:text-primary w-[178px] h-[56px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
              {
                "bg-gray-300 text-primary": !selectedStatus,
              }
            )}
          >
            {loading ? "Updating..." : selectedStatus ? "Update" : "Select"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeTaskStatus;