import {
  Box,
  Center,
  Button,
  Image,
  Heading,
  Stack,
  StackDivider,
  Radio,
  Flex,
  RadioGroup,
} from "@chakra-ui/react";


import React, { useContext, useEffect, useState } from "react";
import vfc_logo from "../Assets/images/vfc_logo.png";
import SubTotal from "../Components/SubTotal";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import { CartContext } from './../Context/CartContext/CartContext';
import axios from "axios";



const Payment = () => {
 const { state} = useLocation();
 
 const toast = useToast()
const {  dispatch } = useContext(CartContext);
const [payMtd,setPayMtd] = useState("online")
const navigate = useNavigate()
const [money,setMoney] = useState(null)

useEffect(()=> {
  setMoney(state.totalAmount)
},[])

console.log("total",state.totalAmount)

console.log(payMtd)

const handlePaymentCOD =  () => {
 
  dispatch({type:"resetCart"})
  navigate("/")
  toast({
    position: 'bottom',
    status: 'success',
    isClosable: true,
    duration: 5000,
    render: () => (
      <Box p="10px 20px" color='white' bg='#e4002b' borderRadius="10px">
        <b>Order Successfull</b><br />
        <b>we will serve you within 15 minutes</b>
      </Box>
    ),
  })
 

}


function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}

async function displayRazorpay() {
  const res = await loadScript(
      `https://checkout.razorpay.com/v1/checkout.js`
  );
   console.log(res)
  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  // creating a new order
  const result = await axios.post("https://busy-jade-pangolin-sock.cyclic.app/payment/orders",{amount:money});

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = result.data;

  const options = {
      key: "rzp_test_8DHk41YB81t2Ja", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "VFC PAYMENT",
      image:  vfc_logo ,
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("https://busy-jade-pangolin-sock.cyclic.app/payment/success");
          console.log(result)
          // alert(result.data.msg);

         if(result.data.msg ==="success"){

           toast({
             title: "Payment successfull.",
             description: "We've Placed Your Order.",
             status: "success",
             position: "top",
             duration: 5000,
             isClosable: true,
            });
            //  dispatch({type:"resetCart"})
            toast({
              title: "Delivery Details",
              description: "we will serve your order with in 30 minutes",
              status: "success",
              position: "top",
              duration: 5000,
              isClosable: true,
             });
            
            dispatch({type:"resetCart"})
            navigate("/");
          }
  
         
        
      },
      prefill: {
          name: "ashik parmar",
          email: "ashikparmar5123@gmail.com",
      },
      notes: {
          address: "VFC Bangalore",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();


}

// console.log(payMtd);

  return (
    <Box  margin="30px auto">
      {/* <SubTotal/> */}
      <Flex
      
        m="auto"
        boxShadow="base"
        justifyContent="center"
       
        gap={10}
        direction="column"
        p={{base:"5%"}} w={{base:"90%",md:"50%"}}
      >
        <Heading size={{sm:"sm" ,md:"md"}} color="#e4002b" >Select Your Payment Method..</Heading>
        <RadioGroup  >
          <Radio onClick={() => {
            setPayMtd("offline");
          }}  checked={payMtd=="offline"} m="20px auto" name="payMtd" value="offline">
            <Flex onClick={() => {
            setPayMtd("offline");
          }} gap={4}>
              <Heading  size="md">Cash on Delivery</Heading>
            </Flex>
          </Radio>
          <hr />

       <>
      </>
        </RadioGroup>
        <Box w="100%"  className="btn_pill">{payMtd==="online"?<button onClick={displayRazorpay}>Pay Your Bill Online</button> : <button onClick={handlePaymentCOD}>Pay COD</button> }</Box>
      </Flex>
    </Box>
  );
};

export default Payment;



