import { toast } from "react-hot-toast";

export const notifySuccess = (msg) =>
  toast.success(msg, {
    duration: 4000,
  });
