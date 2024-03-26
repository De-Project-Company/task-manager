"use client";

import React, {
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { User } from "@/types";
import { getUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { DEFAULT_REVALIDATE_REDIRECT } from "@/routes";
import { useSession } from "next-auth/react";
import { setCookie } from "cookies-next";
import { useStateCtx } from "./StateCtx";

// Add Your Props here
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { Introduction, setIntroduction } = useStateCtx();

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    id: "",
    role: "",
    image: "/facemoji.png",
    token: "",
    companyName: "",
    website: "",
  });

  useLayoutEffect(() => {
    if (!session?.user?.email) return;
    setUser({
      ...session?.user,
      name: session?.user?.name!,
      image: session?.user?.image!,
      email: session?.user?.email!,
    });

    return;
  }, [session]);

  useLayoutEffect(() => {
    //@ts-ignore
    if (!session?.user?.token) return;
    if (session) {
      //@ts-ignore
      setCookie("access_token", session?.user?.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        path: "/",
        priority: "high",
      });
      //@ts-ignore
      // console.log("setted", session?.user?.token);
    }
    return;
  }, [session]);

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        // console.log(user);

        if (user?.status === "success") {
          setUser({
            ...user.user,
            id: user.user._id,
            image:
              `https://ui-avatars.com/api/?name=${user.user
                .name!}&background=random` ?? "/facemoji.png",
          });
        } else if (user?.status === 401) {
          router.push(DEFAULT_REVALIDATE_REDIRECT);
        } else {
        }
      } catch (err) {}
    };

    fetchUserData();
  }, []);

  useLayoutEffect(() => {
    const onboarded = localStorage.getItem("onboarded");

    if (onboarded !== "true") {
      setIntroduction(true);
      localStorage.setItem("onboarded", "false");
    }
  }, [setIntroduction]);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Call this function whenever you want to use the context
export const useUserCtx = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useUserCtx must be used within a UserContextProvider");
  }
  return ctx;
};

export default UserContextProvider;
