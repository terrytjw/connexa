import { createContext } from "react";

// to replace any in the future
export const UserContext = createContext<{
  user: any;
  username: string;
  isAuthLoading: boolean;
}>({
  user: null,
  username: null,
  isAuthLoading: false,
});
