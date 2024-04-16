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
import { getCookies } from "@/actions/getToken";
import { useStateCtx } from "./StateCtx";
import { jwtDecode } from "jwt-decode";

// Add Your Props here
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setSessionModal, setIntroduction } = useStateCtx();

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    id: "",
    role: "",
    image: "/facemoji.png",
    token: "",
    companyName: "",
    website: "",
    type: "unauthenticated",
  });

  useLayoutEffect(() => {
    if (!session?.user?.email) return;
    setUser({
      ...session?.user,
      name: session?.user?.name!,
      image: session?.user?.image!,
      email: session?.user?.email!,
      type: "authenticated",
    });

    return;
  }, [session]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const { token } = await getCookies();
        if (!token) {
          return;
        }
        const decodedToken = jwtDecode(token);
        const expiresIn = decodedToken.exp;

        // @ts-ignore
        const expDate = new Date(expiresIn * 1000);

        const currentDate = new Date();

        const oneDayFromNow = new Date(currentDate);
        oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);

        const lessThanOneDayLeft = expDate < oneDayFromNow;
        if (lessThanOneDayLeft) {
          setSessionModal(true);
        }
        console.log("Less than one day left:", lessThanOneDayLeft);
      } catch (error) {
        return;
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();

        if (user?.status === "success") {
          setUser({
            ...user.user,
            id: user.user._id,
            type: "authenticated",
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
