import React, { useContext, useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Context/CartContext/reducer";
import { CartContext } from "../Context/CartContext/CartContext";
import { Box, Heading } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

const SubTotal = () => {
  const { state, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const totalAmount = state.basket.reduce((acc, currPri) => acc + currPri.price, 0);

  useEffect(() => {}, [totalAmount]);

  const cartTOPayment = () => {
    navigate("/payment", {
      state: {
        totalAmount
      }
    });
  };

  return (
    <Box position={{ lg: "sticky", xl: "sticky" }} top={{ lg: "50vh" }} className="subtotal">
      <Heading m="10px auto" as="h4" size="md">
        Subtotal ({state.basket.length} items): 
        <strong>
          <CurrencyFormat
            decimalScale={2}
            value={totalAmount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
          />
        </strong>
      </Heading>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift.
      </small>
      <hr />
      <button onClick={cartTOPayment} className="btn_pill">Proceed to Checkout</button>
    </Box>
  );
};

export default SubTotal;
