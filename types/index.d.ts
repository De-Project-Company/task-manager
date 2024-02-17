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
  teamMembers?: string[];
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
