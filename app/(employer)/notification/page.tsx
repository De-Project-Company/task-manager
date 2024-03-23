import NotificationPage from "./content/NotificationPage";

export interface NotificationProps {
  _id: string;
  user: string;
  notification_type: string;
  message: string;
  createdAt: string;
  __v: number;
  link: string;
}

const Notification = () => {
  return <NotificationPage />;
};

export default Notification;
