import React, { useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Text, useToast } from "@chakra-ui/react";
import {
  Box,
  Center,
  Heading,
  Image,
  Input,
} from "@chakra-ui/react";
import loader_gif from "../Assets/images/loader_gif.gif";
import { useDispatch } from "react-redux";
import { login } from "./../Redux/LoginRedux/Login.Actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 4; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
  
    let valid = true;
  
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
  
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 4 xcharacters long.");
      valid = false;
    }
  
    if (!valid) return;
  
    setLoading(true);
    const payload = { email, password };
  
    try {
      const res = await dispatch(login({ payload }));
      console.log('res: ', res);
      setLoading(false);
      
      if (res.message === "User does not exist" || res.msg === "user not found") {
        toast({
          title: "Account Not Exist",
          description: "Please SignUp First",
          status: "info",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
        navigate("/signup");
      } else if (res.message === "Invalid credentials") {
        toast({
          title: "Wrong Credentials",
          description: "Please enter correct details",
          status: "warning",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      } else if (res.message === "Login successful" && res.token) {
        toast({
          title: "User Logged in.",
          description: "Welcome to VFC",
          status: "success",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
        navigate("/");
      } else {
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred.",
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("API Error:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };
  
  if (loading) {
    return (
      <Center>
        <Image zIndex="5" src={loader_gif} />
      </Center>
    );
  }

  return (
    <Center>
      <Box m="50px auto" p="auto 10%" w={{ base: "80%", sm: "80%", md: "70%", lg: "40%" }}>
        <Heading m={{ lg: "20px auto" }}>Sign In</Heading>
        <Box>
          <form onSubmit={handleSubmit}>
            <Heading m="20px auto 10px" fontSize="18px" fontWeight="600" letterSpacing="1px" color="#e4002b">Email address</Heading>
            <Input
              focusBorderColor="#e4002b"
              color="black"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {emailError && <Text color="red">{emailError}</Text>}
            
            <Heading m="20px auto 10px" color="#e4002b" fontSize="18px" fontWeight="600" letterSpacing="1px">Password</Heading>
            <Input
              focusBorderColor="#e4002b"
              color="black"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <Text color="red">{passwordError}</Text>}
            
            <Input letterSpacing="1px" fontWeight="600" color="#fff" bg="#e4002b" type="submit" mt="30px" />
          </form>
          <Text mt="20px">Don't have an account? <Link to="/signup" style={{ color: "#e4002b" }}>Signup</Link></Text>
        </Box>
      </Box>
    </Center>
  );
};

export default Login;
