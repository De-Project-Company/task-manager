"use client";

import React, { useEffect, useState } from "react";
import { useStateCtx } from "@/context/StateCtx";
import Team from "./AddTeamModal";
import { cn } from "@/utils";
import { Add } from "iconsax-react";
import Member from "./Members";
import { Owner } from "@/types";
import { useUserCtx } from "@/context/UserCtx";

interface User {
  _id: string;
  name: string;
  email: string;
  companyName: string;
  role: string;
  createdAt: string;
  __v: number;
}

interface UserWithRole {
  user: User;
  role: string;
  accepted: boolean;
  _id: string;
}

export interface TeamMember {
  user: string;
  role: string;
  accepted: boolean;
  _id: string;
  name: string;
}
interface TasksessionProp {
  projectid?: string;
  teamMembers?: UserWithRole[];
  owner?: Owner;
}

const TeamSection = ({ projectid, teamMembers, owner }: TasksessionProp) => {
  const [isMenu, setIsMenu] = useState(false);
  const { setaddTeamMemberMoal } = useStateCtx();
  const { user } = useUserCtx();

  const admin = teamMembers?.find((member) => member.user._id === user?.id);
  const filteredTeamMembers = teamMembers?.filter(
    (member) => member.user._id !== user?.id
  );

  // console.log(admin);

  useEffect(() => {
    if (isMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenu(false);
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [isMenu]);

  return (
    <>
      <div
        className={cn(
          "flex flex-col w-full px-3 py-6 sm:rounded-xl  relative mt-12  max-h-[500px] overflow-y-auto overflow-x-hidden no-scroll"
        )}
      >
        <div className="flex w-full items-center justify-between pb-2 md:pb-3">
          <h3 className="text-lg font-semibold text-header dark:text-white">
            People
          </h3>
          <button
            type="button"
            tabIndex={0}
            id="add-milestone"
            aria-haspopup
            aria-expanded={isMenu}
            onClick={() => setIsMenu((prev) => !prev)}
            className="text-primary dark:text-white rotate-90 h-6 w-6 rounded-full border border-[#090909] flex items-center justify-center"
          >
            <Add size={24} />
          </button>
        </div>
        {/* DOT Menu */}
        <div
          className={cn(
            "fixed min-h-screen w-full bg-black/0 top-0 left-0 z-[99] transition-all duration-300",
            isMenu ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMenu(false)}
        />
        <div
          role="dialog"
          aria-labelledby="add-task"
          className={cn(
            "flex w-[190px] h-[56px]  px-4 py-2 absolute right-2 top-[3.5rem] rounded-lg justify-center  border border-gray-200 backdrop-blur-xl bg-white/80 dark:bg-primary dark:border-purple-600 transition-all duration-300 z-[999] shadow-[0_5px_15px_-3px_rgba(0,0,0,0.3)]",
            {
              "opacity-100": isMenu,
              "opacity-0 pointer-events-none": !isMenu,
            }
          )}
        >
          <button
            onClick={() => {
              setaddTeamMemberMoal(true);
              setIsMenu(!isMenu);
            }}
            type="button"
            tabIndex={0}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 text-black dark:text-white w-full flex items-center gap-x-2 px-2"
          >
            <Add size={18} />
            <span>Add Team</span>
          </button>
        </div>

        {teamMembers && teamMembers.length > 0 ? (
          <>
            {admin && (
              <Member
                key={admin._id}
                name={admin.user.name}
                accepted={admin.accepted}
                memberId={admin.user._id}
                owner={owner}
              />
            )}
            {filteredTeamMembers && filteredTeamMembers.length > 0 && (
              <>
                {filteredTeamMembers.map((member) => (
                  <Member
                    key={member._id}
                    name={member.user.name}
                    accepted={member.accepted}
                    memberId={member.user._id}
                    owner={owner}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <p className="w-full text-center h-full  dark:text-gray-200">
            No team members yet.
          </p>
        )}

        <Team projectid={projectid} />
      </div>
    </>
  );
};

export default TeamSection;
