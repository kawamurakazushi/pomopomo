import { useEffect } from "react";

export const isPushNotificationSupported = () => {
  return "serviceWorker" in navigator && "PushManager" in window;
};

const askUserPermission = () => {
  Notification.requestPermission();
};

const useNotification = () => {
  useEffect(() => {
    askUserPermission();
  }, []);

  const notify = (title: string) => {
    new Notification(title);
  };

  return { askUserPermission, notify, isPushNotificationSupported };
};

export default useNotification;
