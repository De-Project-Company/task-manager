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
import { useSession } from "next-auth/react";
import { getUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { DEFAULT_REVALIDATE_REDIRECT } from "@/routes";

// Add Your Props here
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Add Your State(s) Here
  const { data: session } = useSession();
  const router = useRouter();
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
    const fetchUserData = async () => {
      try {
        const user = await getUser();

        if (user?.status === "success") {
          console.log(user.user);
          setUser({
            name: user.user.name,
            email: user.user.email,
            role: user.user.role,
            companyName: user.user.companyName,
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