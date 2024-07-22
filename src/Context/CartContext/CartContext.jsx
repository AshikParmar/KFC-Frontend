import { createContext, useReducer } from "react";
import reducer from "../CartContext/reducer"
const initialState = {
    basket: []
};

export const CartContext = createContext()

const CartContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
    
   return (
    <CartContext.Provider value={{initialState,state,dispatch}} >{children}</CartContext.Provider>
   )
}

export default CartContextProvider;