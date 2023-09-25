import { toast } from "react-hot-toast";

export const notifyError = (msg) => {
  toast.error(msg, { duration: 4000 });
};
