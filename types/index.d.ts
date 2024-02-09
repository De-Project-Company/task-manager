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