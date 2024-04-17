"use client";

import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useUserCtx } from "@/context/UserCtx";

export default function useLoadRecordings(call: Call) {
  const { user } = useUserCtx();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [recordingsLoading, setRecordingsLoading] = useState(true);

  useEffect(() => {
    async function loadRecordings() {
      setRecordingsLoading(true);

      if (!user?.id) return;

      const { recordings } = await call.queryRecordings();
      setRecordings(recordings);

      setRecordingsLoading(false);
    }

    loadRecordings();
  }, [call, user?.id]);

  return { recordings, recordingsLoading };
}
