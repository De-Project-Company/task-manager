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

export interface Project {
  _id?: string;
  title?: string;
  description?: string;
  owner?: {
    _id: string;
    name: string;
    email: string;
    companyName: string;
    role: string;
    createdAt: string;
    __v: number;
  };
  price?: number;
  duration?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  teamMembers?: string[];
  tasks?: any[];
  __v?: number;
}
