"use client";

import React, { useState, useEffect } from "react";
import { useUserCtx } from "@/context/UserCtx";
import {
  Call,
  MemberRequest,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/Label";
import { TextArea } from "@/components/ui/Textarea";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";
import { Copy, X, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { Button } from "@/components/ui/butt";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import Link from "next/link";

const CreateMeet = () => {
  const { user } = useUserCtx();
  const { CreateMeet, setCreateMeet } = useStateCtx();
  const client = useStreamVideoClient();
  const [participantsInput, setParticipantsInput] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [descriptionInput, setDescriptionInput] = useState("");
  const [call, setCall] = useState<Call>();

  const [Adddescription, setAdddescription] = useState(false);
  const [Time, setTime] = useState(false);
  const [everyone, seteveryone] = useState(true);

  if (!CreateMeet) {
    if (Adddescription || Time) {
      setAdddescription(false);
      setTime(false);
    }
  }

  async function createMeeting() {
    if (!client || !user) {
      return;
    }

    try {
      const id = crypto.randomUUID();

      const callType = participantsInput ? "private-meeting" : "default";

      const call = client.call(callType, id);

      const memberEmails = participantsInput
        .split(",")
        .map((email) => email.trim());

      // const memberIds = await getUserIds(memberEmails);

      const members: MemberRequest[] = memberEmails
        .filter((email) => email)
        .map((email) => ({ user_id: email, role: "call_member" }))
        .concat({ user_id: user.email!, role: "call_member" })

        .filter(
          (v, i, a) => a.findIndex((v2) => v2.user_id === v.user_id) === i
        );

      const starts_at = new Date(date || Date.now()).toISOString();

      await call.getOrCreate({
        data: {
          // starts_at,
          // members,
          custom: { description: descriptionInput },
        },
      });

      setCall(call);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  }

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          CreateMeet ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setCreateMeet(false)}
      />
      <div
        role="dialog"
        aria-labelledby="remove-client"
        className={cn(
          "py-6   flex flex-col max-[350px]:h-[450px] w-[90%] h-[420px] min-[550px]:w-[500px] md:w-[682px] md:h-[500px] items-center bg-white dark:bg-primary  fixed top-1/2 left-1/2  z-[99]  transition-all opacity-0 select-none  -translate-y-1/2 -translate-x-1/2",
          CreateMeet
            ? "scale-100 duration-500 opacity-100 rounded-xl md:rounded-2xl"
            : "scale-0 duration-200 pointer-events-none",
          Adddescription || Time || !everyone
            ? "overflow-y-auto overflow-x-hidden"
            : "",
          call ? "h-full" : ""
        )}
      >
        {!call && (
          <>
            <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] pb-4 pl-4 px-4 md:pl-8 sticky top-0 bg-white">
              <h3 className="sm:text-lg md:text-2xl font-medium text-header dark:text-gray-100">
                Create Meeting
              </h3>
              <button
                type="button"
                tabIndex={0}
                aria-label="Close"
                onClick={() => setCreateMeet(false)}
                className="text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:text-[#e80000] rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex w-full  pt-3  flex-col gap-y-4 px-4">
              <>
                <div>
                  <p className="text-[16px] md:text-[20px] ">Meeting Info</p>
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      id="Adddescription"
                      checked={Adddescription}
                      onCheckedChange={() => setAdddescription(!Adddescription)}
                    />
                    <div className="items-top flex space-x-2">
                      <Label
                        htmlFor="Adddescription"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Add Description
                      </Label>
                    </div>
                  </div>
                </div>
                {Adddescription && (
                  <TextArea
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    placeholder="Enter description..."
                    className="h-32 resize-none"
                  />
                )}
              </>
              <>
                <p className="text-[16px] md:text-[20px] ">Meeting Time</p>
                <RadioGroup
                  defaultValue={Time ? "later" : "now"}
                  onValueChange={() => setTime(!Time)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="r1" />
                    <Label htmlFor="r1">Start meeting immediately</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="later" id="r2" />
                    <Label htmlFor="r2"> Start meeting at a later date</Label>
                  </div>
                </RadioGroup>
                {Time && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal min-h-8 md:py-4 py-2",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="flex w-full flex-col space-y-2 p-2 z-[500]"
                    >
                      <Select
                        onValueChange={(value) =>
                          setDate(addDays(new Date(), parseInt(value)))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Time Frame" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="z-[999] bg-white"
                        >
                          <SelectItem value="0">Today</SelectItem>
                          <SelectItem value="1">Tomorrow</SelectItem>
                          <SelectItem value="3">In 3 days</SelectItem>
                          <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="rounded-md border">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate: Date | undefined) => {
                            if (selectedDate) {
                              setDate(selectedDate);
                            }
                          }}
                          disabled={(date) => date < new Date()}
                          // initialFocus
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </>
              <>
                <p className="text-[16px] md:text-[20px] ">Who Can Join</p>
                <RadioGroup
                  defaultValue={everyone ? "public" : "private"}
                  onValueChange={() => seteveryone(!everyone)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="r3" />
                    <Label htmlFor="r3">Every One</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="r4" />
                    <Label htmlFor="r4">Private</Label>
                  </div>
                </RadioGroup>
                {!everyone && (
                  <TextArea
                    value={participantsInput}
                    onChange={(e) => setParticipantsInput(e.target.value)}
                    placeholder="Enter participants email..."
                    className="h-32 resize-none"
                  />
                )}
              </>
            </div>

            <div className="flex w-full items-center justify-center pt-8 bottom-0">
              <button
                type="button"
                tabIndex={0}
                aria-label="Close"
                onClick={createMeeting}
                className={cn(
                  "rounded-lg border border-primary text-primary w-[178px] min-[450px]:h-[56px] h-[40px] px-2  text-lg hover:opacity-80 transition-opacity duration-300 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-color-dark dark:border-color-dark"
                )}
              >
                Create meeting
              </button>
            </div>
          </>
        )}
        {call && <MeetingLink call={call} />}
      </div>
    </>
  );
};

export default CreateMeet;

interface MeetingLinkProps {
  call: Call;
}

function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}meetings/id?callId=${call.id}`;
  const [copied, setCopied] = useState(false);


  const handleClick = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-center self-center">
      <div className="flex items-center gap-3">
        <div className="flex flex-col w-full ">
          <span>Meeting link: </span>
          <Link href={meetingLink} className="font-medium text-xs">
            {meetingLink}
          </Link>
        </div>
        <button
          title="Copy invitation link"
          onClick={handleClick}
          disabled={copied}
        >
          {copied ? (
            <Check className="text-emerald-700/10 h-4 w-4" />
          ) : (
            <Copy />
          )}
        </button>
      </div>
      <a
        href={getMailToLink(
          meetingLink,
          call.state.startsAt,
          call.state.custom.description
        )}
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        Send email invitation
      </a>
    </div>
  );
}

function getMailToLink(
  meetingLink: string,
  startsAt?: Date,
  description?: string
) {
  const startDateFormatted = startsAt
    ? startsAt.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : undefined;

  const subject =
    "Join my meeting" + (startDateFormatted ? ` at ${startDateFormatted}` : "");

  const body =
    `Join my meeting at ${meetingLink}.` +
    (startDateFormatted
      ? `\n\nThe meeting starts at ${startDateFormatted}.`
      : "") +
    (description ? `\n\nDescription: ${description}` : "");

  return `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
