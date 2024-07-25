import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
// import AuthContextProvider from "./Context/AuthContext/AuthContext";
import CartContextProvider from "./Context/CartContext/CartContext";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./Redux/store";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <ChakraProvider>
      <BrowserRouter>
    <ReduxProvider store={store}>

        <CartContextProvider>
            <App />
        </CartContextProvider>
        
    </ReduxProvider>

      </BrowserRouter>
    </ChakraProvider>
  
);

reportWebVitals();
