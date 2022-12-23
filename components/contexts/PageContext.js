import {createContext} from "react";
import {useLocalStorage} from "../../hooks/useLocalStorage";

export const PageContext = createContext();

export function PageContextProvider({children}) {
  const [page, setPage] = useLocalStorage("page", "home");

  const handleClickLink = state => {
    setPage(state);
  };
  return (
    <PageContext.Provider value={{page, handleClickLink}}>
      {children}
    </PageContext.Provider>
  );
}
