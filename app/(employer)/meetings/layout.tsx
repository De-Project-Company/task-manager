import { MeetingProvider } from "../../ClientProvider";
import CreateMeet from "./content/createMeet";

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
