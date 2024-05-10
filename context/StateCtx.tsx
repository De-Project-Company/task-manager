"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  protectedRoutes,
  DEFAULT_REVALIDATE_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { checkSession } from "@/actions/session";
import { StateContextProps } from "@/types";

const StateContext = createContext<StateContextProps | undefined>(undefined);

const StateCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSidebarMain, setOpenSidebarMain] = useState(false);
  const [OTPModal, setOTPModal] = useState(false);
  const [Toast, setToast] = useState(false);
  const [landingMobileMenu, setLandingMobileMenu] = useState(false);
  const [swipeIndicator, setSwipeIndicator] = useState(false);
  const [handleSwipe, setHandleSwipe] = useState<number | null>(null);
  const [ViewOwnerModal, setViewOwnerModal] = useState(false);
  const [addTeamMemberMoal, setaddTeamMemberMoal] = useState(false);
  const [DeleteProjectModal, setDeleteProjectModal] = useState(false);
  const [addTaskModal, setaddTaskModal] = useState(false);
  const [openNotification, setopenNotification] = useState(false);
  const [SessionModal, setSessionModal] = useState(false);
  const [InviteModal, setInviteModal] = useState(false);
  const [ApprovalModal, setApprovalModal] = useState(false);
  const [EditProject, setEditProjectModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [ChangeTaskStatusModal, setChangeTaskStatusModal] = useState(false);
  const [ChangeProjectStatusModal, setChangeProjectStatusModal] =
    useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [openCalendarEvent, setOpenCalendarEvent] = useState(false);
  const [Introduction, setIntroduction] = useState(false);
  const [CreateMeet, setCreateMeet] = useState(false);
  const [openUploadPreviewModal, setOpenUploadPreviewModal] =
    useState<boolean>(false);
  const [EditTask, setEditTaskModal] = useState(false);
  const [profileSheet, setprofileSheet] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const isAnyModalOpen =
    OTPModal ||
    Toast ||
    addTeamMemberMoal ||
    DeleteProjectModal ||
    ChangeProjectStatusModal ||
    addTaskModal ||
    SessionModal ||
    openNotification ||
    InviteModal ||
    ApprovalModal ||
    Introduction ||
    CreateMeet ||
    ChangeTaskStatusModal ||
    EditProject ||
    ViewOwnerModal ||
    openProfileModal ||
    profileSheet;
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
    const isFirstTimeUser = localStorage.getItem("firstTimeUser") !== "false";

    if (isFirstTimeUser) {
      setApprovalModal(true);
      localStorage.setItem("firstTimeUser", "false");
    }
  }, [setApprovalModal]);
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
          router.push(DEFAULT_REVALIDATE_REDIRECT);
        } else if (!isProtectedRoute && res?.success) {
          router.push(DEFAULT_LOGIN_REDIRECT);
        }
      } catch (err) {}
    };
    check();

    // added router to the dependencie array
  }, [pathname, router]);

  const value = useMemo(
    () => ({
      openSidebar,
      InviteModal,
      setInviteModal,
      setOpenSidebar,
      OTPModal,
      landingMobileMenu,
      setLandingMobileMenu,
      setOTPModal,
      swipeIndicator,
      setSwipeIndicator,
      currentPath,
      ViewOwnerModal,
      setViewOwnerModal,
      Toast,
      setToast,
      EditProject,
      setEditProjectModal,
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
      openNotification,
      setopenNotification,
      ApprovalModal,
      setApprovalModal,
      Introduction,
      setIntroduction,
      CreateMeet,
      setCreateMeet,
      ChangeTaskStatusModal,
      setChangeTaskStatusModal,
      openCalendarEvent,
      setOpenCalendarEvent,
      openUploadPreviewModal,
      setOpenUploadPreviewModal,
      setEditTaskModal,
      EditTask,
      openProfileModal,
      setOpenProfileModal,
      profileSheet,
      setprofileSheet,
    }),
    [
      openSidebar,
      landingMobileMenu,
      profileSheet,
      setprofileSheet,
      OTPModal,
      swipeIndicator,
      addTaskModal,
      Toast,
      CreateMeet,
      addTeamMemberMoal,
      currentPath,
      openSidebarMain,
      DeleteProjectModal,
      ChangeProjectStatusModal,
      SessionModal,
      openNotification,
      InviteModal,
      ApprovalModal,
      openCalendarEvent,
      Introduction,
      ViewOwnerModal,
      ChangeTaskStatusModal,
      EditProject,
      EditTask,
      openUploadPreviewModal,
      openProfileModal,
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
