import React, {createContext, useContext, ReactNode} from "react";
import RootStore, { IRootModel } from "../models/RootStore";

const store = RootStore.create({
    meters: [],
    areas: [],
    houses: [],
    offset: 20
})

const StoreContext = createContext<IRootModel>(store)

export const useStore = (): IRootModel => {
    return useContext(StoreContext);
  };
interface StoreProviderProps {
    children: ReactNode
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => (
    <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider> 
)

export default store