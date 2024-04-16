
import React from "react";
import CreateMeet from "./content/createMeet";
import { MeetingProvider } from "@/app/ClientProvider";

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MeetingProvider>
      {children}
      <CreateMeet />
    </MeetingProvider>
  );
}
