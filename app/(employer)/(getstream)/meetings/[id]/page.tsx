import { Metadata } from "next";
import { JoinMeetingPage } from "../content/joinmeeting/join";

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export function generateMetadata({
  searchParams: { callId },
}: PageProps): Metadata {
  return {
    title: `Meeting ${callId}`,
  };
}

export default async function Page({ searchParams: { callId } }: PageProps) {
  if (!callId) {
    return;
  }
  return <JoinMeetingPage id={callId} />;
}
