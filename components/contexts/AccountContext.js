import {createContext} from "react";
import {useState} from "react";

export const AccountContext = createContext();

export function AccountContextProvider({children}) {
  const [account, setAccount] = useState({});

  const handleAccount = state => {
    setAccount(state);
  };
  return (
    <AccountContext.Provider value={{account, handleAccount}}>
      {children}
    </AccountContext.Provider>
  );
}
