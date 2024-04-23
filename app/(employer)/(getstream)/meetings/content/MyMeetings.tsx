"use client";

import { useUserCtx } from "@/context/UserCtx";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loader";

export default function MyMeetingsPage() {
  const { user } = useUserCtx();

  const client = useStreamVideoClient();

  const [calls, setCalls] = useState<Call[]>();

  useEffect(() => {
    async function loadCalls() {
      if (!client || !user?.id) {
        return;
      }

      const { calls } = await client.queryCalls({
        sort: [{ field: "starts_at", direction: -1 }],
        filter_conditions: {
          starts_at: { $exists: false },
          $or: [
            { created_by_user_id: user.id },
            { members: { $in: [user.id] } },
          ],
        },
      });

      setCalls(calls);
    }

    loadCalls();
  }, [client, user?.id]);

  return (
    <div className="space-y-3">
      <h1 className="text-center text-2xl font-bold">My Meetings</h1>
      {!calls && <LoadingSpinner />}
      {calls?.length === 0 && <p>No meetings found</p>}
      <ul className="list-inside list-disc space-y-2">
        {calls?.map((call) => (
          <MeetingItem key={call.id} call={call} />
        ))}
      </ul>
    </div>
  );
}

interface MeetingItemProps {
  call: Call;
}

function MeetingItem({ call }: MeetingItemProps) {
  const meetingLink = `/meeting/${call.id}`;

  const isInFuture =
    call.state.startsAt && new Date(call.state.startsAt) > new Date();

  const hasEnded = !!call.state.endedAt;

  return (
    <li>
      <Link href={meetingLink} className="hover:underline">
        {call.state.startsAt?.toLocaleString()}
        {isInFuture && " (Upcoming)"}
        {hasEnded && " (Ended)"}
      </Link>
      <p className="ml-6s text-gray-500">{call.state.custom.description}</p>
    </li>
  );
}
