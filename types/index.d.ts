export type SidebarProps = {
  id?: number;
  label: string;
  icon: Icon;
  link: string;
};

export interface UserDetails {
  UserId: string;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  companyName?: string;
  website?: string;
  role?: string;
  // createdAt?: string;
  image?: string | StaticImport;
  token?: string;
}

export type NavbarLinkProps = {
  id?: number;
  link: string;
  label: string;
  descText: string;
};

interface Owner {
  _id?: string;
  name?: string;
  email?: string;
  companyName?: string;
  role?: string;
  createdAt?: string;
  __v?: number;
}

interface TeamMember {
  user: string;
  role: string;
  accepted: boolean;
  _id: string;
  name: string;
}

interface User2 {
  _id: string;
  name: string;
  email: string;
  companyName: string;
  role: string;
  createdAt: string;
  __v: number;
}

interface UserWithRole {
  user: User2;
  role: string;
  accepted: boolean;
  _id: string;
}

export interface ProjectProps {
  _id?: string;
  title?: string;
  description?: string;
  owner?: Owner;
  price?: number;
  duration?: number;
  status?: "to-do" | "in-progress" | "completed";
  startDate?: string;
  endDate?: string;
  teamMembers?: UserWithRole[];
  tasks?: any[];
  __v?: number;
}

export type ProjectCounterProps = {
  id?: number;
  label: string;
  count: number;
};

export type SelectProps = {
  id?: number;
  symbol: string;
  value: "USD" | "EUR" | "GBP" | "NGN";
};

export interface ProjectStatus {
  status: "to-do" | "in-progress" | "completed";
}

/**
 * StateContextProps
 */
export interface StateContextProps {
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
  openNotification: boolean;
  setopenNotification: React.Dispatch<React.SetStateAction<boolean>>;

  // Added context for CalendarEvent

  openCalendarEvent: boolean;
  setOpenCalendarEvent: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Calender
 */
export interface SlotInfo {
  slots?: Array<Date>;
  start?: Date;
  end?: Date;
  resourceId?: string | number | undefined;
  action?: string;
  bounds?: any;
  box?: {
    x: number;
    y: number;
    clientX: number;
    clientY: number;
  };
}

export interface EventInfo {
  title: string;
  start: Date;
  end: Date;
  color: string;
}
