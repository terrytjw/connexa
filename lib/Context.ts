import { createContext } from "react";

// to replace any in the future
export const UserContext = createContext<{ user: any; username: any }>({
  user: null,
  username: null,
});
