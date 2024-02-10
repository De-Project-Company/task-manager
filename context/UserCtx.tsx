"use client";

import React, {
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { getCookie, getCookies } from "cookies-next";
import { User } from "@/types";
import { useSession } from "next-auth/react";
import { GetFromSessionStorage } from "@/utils";

// Add Your Props here
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Add Your State(s) Here
  const { data: session } = useSession();
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

  //   useLayoutEffect(() => {
  //     const userFromCookie = getCookie("user");
  //     console.log("user:", userFromCookie);
  //     const TokenFromCOokie = getCookie("access_token");
  //     console.log("token:", TokenFromCOokie);
  //     if (userFromCookie) {
  //       const parsedUser = JSON.parse(userFromCookie) as User;
  //       setUser({
  //         name: parsedUser.name,
  //         email: parsedUser.email,
  //         id: parsedUser.id,
  //         role: parsedUser.role,
  //         token: TokenFromCOokie,
  //         companyName: parsedUser.companyName,
  //         website: parsedUser.website,
  //         image:
  //           `https://ui-avatars.com/api/?name=${parsedUser.name!}&background=random` ??
  //           "/facemoji.png",
  //       });
  //     }
  //     return;
  //   }, []);

  useLayoutEffect(() => {
    const userFromStorage = sessionStorage.getItem("user");
    console.log("user:", userFromStorage);
    const TokenFromCOokie = getCookie("access_token");
    console.log("token:", TokenFromCOokie);
    if (userFromStorage) {
      const parsedUser = JSON.parse(userFromStorage) as User;
      console.log(parsedUser);
      setUser({
        name: parsedUser.name,
        email: parsedUser.email,
        id: parsedUser.id,
        role: parsedUser.role,
        token: TokenFromCOokie,
        companyName: parsedUser.companyName,
        website: parsedUser.website,
        image:
          `https://ui-avatars.com/api/?name=${parsedUser.name!}&background=random` ??
          "/facemoji.png",
      });
    }
    return;
  }, []);

  console.log(user);

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
