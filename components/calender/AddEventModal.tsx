import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";
import React, { useState, useTransition } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import FormSuccess from "@/components/form/Success";
import FormError from "@/components/form/Error";

const AddEventModal: React.FC = () => {
  const [isLoading, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const { openCalendarEvent, setOpenCalendarEvent } = useStateCtx();

  const handleSubmit = () => {
    console.log("Clicked !!");
  };
  return (
    <>
      {" "}
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          openCalendarEvent ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpenCalendarEvent(false)}
      />
      <div
        role="dialog"
        aria-labelledby="create Event modal"
        className={cn(
          "py-6   flex flex-col w-[98%] sm:w-[95%] overflow-y-auto overflow-x-hidden no-scroll min-[500px]:h-[400px] md:h-[400px] lg:h-[400px] md:w-[682px]  justify-between items-start bg-white dark:bg-primary backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[999]  transition-all opacity-0 select-none ",
          openCalendarEvent
            ? "-translate-x-1/2 duration-700 opacity-100 sm:rounded-xl md:rounded-2xl"
            : "translate-x-full duration-300 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] pb-4 pl-4 px-4 md:pl-8 sticky top-0 bg-white">
          <h3 className="sm:text-lg md:text-2xl font-medium text-header dark:text-white">
            Create New Event
          </h3>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => {
              setOpenCalendarEvent(false);
            }}
            className="text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:text-[#e80000] rounded-full"
          >
            <X size={24} />

            {/* form section */}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full  gap-y-4 lg:gap-y-6 py-8 mb-5 px-2 sm:px-4 md:px-6 lg:px-8 h-full items-start"
        >
          <div className="flex flex-col  gap-y-2 w-full">
            <label
              htmlFor="tittle"
              className="text-sm sm:text-base font-medium dark:text-white"
            >
              Event Title
            </label>
            <input
              type="text"
              placeholder="Event title..."
              id="Event-title"
              name="event.title"
              className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600"
              //   value={formData.task.title}
              //   onChange={(e) =>
              //     setFormData({
              //       ...formData,
              //       task: { ...formData.task, title: e.target.value },
              //     })
              //   }
            />
          </div>

          {/* <div className="flex flex-col  gap-y-2 w-full">
            <label
              htmlFor="tittle"
              className="text-sm sm:text-base font-medium dark:text-white"
            >
              Event Title
            </label>
            <input
              type="text"
              placeholder="Event title..."
              id="Event-title"
              name="event.title"
              className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600"
              //   value={formData.task.title}
              //   onChange={(e) =>
              //     setFormData({
              //       ...formData,
              //       task: { ...formData.task, title: e.target.value },
              //     })
              //   }
            />
          </div> */}

          <div className="flex relative items-center justify-end [perspective:300px] transform-gpu min-[450px]:w-[180px] sm:gap-x-3 md:gap-x-6">
            <Button
              type="submit"
              tabIndex={0}
              aria-label="Submit"
              spinnerColor="#fff"
              className={cn(
                "rounded-lg bg-primary dark:bg-white dark:text-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600",
                isLoading ? "[&>div>span]:opacity-0" : ""
              )}
            >
              Create Event
            </Button>
            {isLoading && (
              <div className="button--loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEventModal;
