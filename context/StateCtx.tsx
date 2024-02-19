"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  protectedRoutes,
  DEFAULT_REVALIDATE_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { checkSession } from "@/actions/session";

interface StateContextProps {
  currentPath: string;
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  openSidebarMain: boolean;
  setOpenSidebarMain: Dispatch<SetStateAction<boolean>>;
  OTPModal: boolean;
  setOTPModal: React.Dispatch<React.SetStateAction<boolean>>;
  DeleteProjectModal: boolean;
  setDeleteProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  Toast: boolean;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
  ChangeProjectStatusModal: boolean;
  setChangeProjectStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  addTeamMemberMoal: boolean;
  setaddTeamMemberMoal: React.Dispatch<React.SetStateAction<boolean>>;
  addTaskModal: boolean;
  setaddTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  swipeIndicator: boolean;
  setSwipeIndicator: React.Dispatch<React.SetStateAction<boolean>>;
  landingMobileMenu: boolean;
  setLandingMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  SessionModal: boolean;
  setSessionModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

const StateCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSidebarMain, setOpenSidebarMain] = useState(false);
  const [OTPModal, setOTPModal] = useState(false);
  const [Toast, setToast] = useState(false);
  const [landingMobileMenu, setLandingMobileMenu] = useState(false);
  const [swipeIndicator, setSwipeIndicator] = useState(false);
  const [handleSwipe, setHandleSwipe] = useState<number | null>(null);
  const [addTeamMemberMoal, setaddTeamMemberMoal] = useState(false);
  const [DeleteProjectModal, setDeleteProjectModal] = useState(false);
  const [addTaskModal, setaddTaskModal] = useState(false);
  const [SessionModal, setSessionModal] = useState(false);
  const [ChangeProjectStatusModal, setChangeProjectStatusModal] =
    useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const isAnyModalOpen =
    OTPModal ||
    Toast ||
    addTeamMemberMoal ||
    DeleteProjectModal ||
    ChangeProjectStatusModal ||
    addTaskModal ||
    SessionModal;
  const anyMobileSidebarOpen =
    openSidebarMain || openSidebar || landingMobileMenu;

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator?.userAgent
    );
  };

  useEffect(() => {
    if (!isMobileDevice()) return;
    const isSwiped = localStorage.getItem("swiped");
    if (isSwiped) {
      setSwipeIndicator(false);
      return;
    }
    if (anyMobileSidebarOpen) {
      setSwipeIndicator(true);
    } else {
      setSwipeIndicator(false);
    }
  }, [anyMobileSidebarOpen]);

  useEffect(() => {
    if (
      !isMobileDevice() ||
      pathname === "/" ||
      isAnyModalOpen ||
      !anyMobileSidebarOpen
    )
      return;
    const handleSwipeStart = (e: TouchEvent) => {
      setHandleSwipe(e.changedTouches[0].screenX);
    };
    const handleSwipeEnd = (e: TouchEvent) => {
      if (handleSwipe !== null) {
        const swipeDis = e.changedTouches[0].screenX - handleSwipe;
        const swipeThreshold = 70;

        if (swipeDis < -swipeThreshold) {
          localStorage.setItem("swiped", "true");
          console.log("first");
          setOpenSidebarMain(false);
          setOpenSidebar(false);
        }

        setHandleSwipe(null);
      }
    };

    window.addEventListener("touchstart", handleSwipeStart);
    window.addEventListener("touchend", handleSwipeEnd);
    return () => {
      window.removeEventListener("touchstart", handleSwipeStart);
      window.removeEventListener("touchend", handleSwipeEnd);
    };
  }, [handleSwipe, pathname, isAnyModalOpen, anyMobileSidebarOpen]);

  useEffect(() => {
    if (isAnyModalOpen || anyMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenSidebar(false);
        setOpenSidebarMain(false);
        setLandingMobileMenu(false);
        setOTPModal(false);
        setToast(false);
      }
    };

    document.addEventListener("keyup", handleKeyDown);

    return () => {
      document.removeEventListener("keyup", handleKeyDown);
    };
  }, [isAnyModalOpen, anyMobileSidebarOpen]);

  useEffect(() => {
    const t = "%c  Made By \ud83d\udc9a  - Satrters House ",
      n = [
        "font-size: 12px",
        "color: #fffce1",
        "font-family: monospace",
        "background: #0e100f",
        "display: inline-block",
        "padding: 1rem 3rem",
        "border: 1px solid #0ff",
        "border-radius: 4px;",
      ].join(";");
    console.log(t, n);
  }, []);

  useEffect(() => {
    if (pathname === "/") return;
    let timeoutId: any;

    const showScrollbar = () => {
      document.documentElement.setAttribute("scrollbar", "");
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        hideScrollbar();
      }, 2000);
    };

    const hideScrollbar = () => {
      document.documentElement.removeAttribute("scrollbar");
    };

    window.addEventListener("scroll", showScrollbar);

    return () => {
      window.removeEventListener("scroll", showScrollbar);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/")) {
      setCurrentPath(pathname.replace(/^\/([^\/]+).*$/, "$1"));
      return;
    }
    if (pathname.startsWith("/")) {
      setCurrentPath(pathname.replace("/", ""));
      return;
    }
  }, [pathname]);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await checkSession();
        const isProtectedRoute = protectedRoutes.includes(pathname);
        if (isProtectedRoute && res?.error) {
          // If it's a protected route and there's an error, redirect to revalidate
          router.push(DEFAULT_REVALIDATE_REDIRECT);
        } else if (!isProtectedRoute && res?.success) {
          // If it's not a protected route and there's success, redirect to login
          router.push(DEFAULT_LOGIN_REDIRECT);
        }
      } catch (err) {}
    };
    check();
  }, [pathname]);

  const value = useMemo(
    () => ({
      openSidebar,
      setOpenSidebar,
      OTPModal,
      landingMobileMenu,
      setLandingMobileMenu,
      setOTPModal,
      swipeIndicator,
      setSwipeIndicator,
      currentPath,
      Toast,
      setToast,
      addTeamMemberMoal,
      setaddTeamMemberMoal,
      openSidebarMain,
      setOpenSidebarMain,
      DeleteProjectModal,
      setDeleteProjectModal,
      ChangeProjectStatusModal,
      setChangeProjectStatusModal,
      addTaskModal,
      setaddTaskModal,
      SessionModal,
      setSessionModal,
    }),
    [
      openSidebar,
      anyMobileSidebarOpen,
      landingMobileMenu,
      OTPModal,
      swipeIndicator,
      addTaskModal,
      Toast,
      addTeamMemberMoal,
      currentPath,
      openSidebarMain,
      DeleteProjectModal,
      ChangeProjectStatusModal,
      SessionModal,
    ]
  );

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateCtxProvider;

export function useStateCtx() {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("useStateContext must be used within an CtxProvider");
  }

  return context;
}
