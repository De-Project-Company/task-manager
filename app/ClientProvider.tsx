"use client";

import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useUserCtx } from "@/context/UserCtx";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loader";
import { generateId } from "@/utils";
import { getToken } from "@/actions/stream";
export const MeetingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const videoClient = useInitializeVideoClient();

  if (!videoClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

function useInitializeVideoClient() {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const { user } = useUserCtx();

  useEffect(() => {
    if (!user) return;

    let streamUser: User;

    if (user?.id) {
      streamUser = {
        id: user.id,
        name: user.name,
        // email: user.email,
        image: user.image,
        type: "authenticated",
      };
    } else {
      const id = generateId();
      streamUser = {
        id,
        type: "guest",
        name: `Guest ${id}`,
      };
    }
    const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;

    if (!apiKey) {
      throw new Error("Stream API key not set");
    }
    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider: user?.id ? getToken : undefined,
    });
    setVideoClient(client);
    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user]);

  return videoClient;
}
