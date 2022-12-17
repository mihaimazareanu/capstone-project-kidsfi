import {createContext} from "react";
import {useState} from "react";

export const PageContext = createContext();

export function PageContextProvider({children}) {
  const [page, setPage] = useState("home");

  const handleClickLink = state => {
    setPage(state);
  };
  return (
    <PageContext.Provider value={{page, handleClickLink}}>
      {children}
    </PageContext.Provider>
  );
}
