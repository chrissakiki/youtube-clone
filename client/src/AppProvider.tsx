import { createContext, useContext, useState, FC } from "react";

type values = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: React.ReactNode;
};
const AppContext = createContext<values>({} as values);

const AppProvider: FC<Props> = ({ children }) => {
  const [show, setShow] = useState<boolean>(true);
  const values: values = {
    show,
    setShow,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
