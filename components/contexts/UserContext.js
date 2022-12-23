import {createContext} from "react";
import {useLocalStorage} from "../../hooks/useLocalStorage";

export const UserContext = createContext();

export function UserContextProvider({children}) {
  const [user, setUser] = useLocalStorage("user", null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
