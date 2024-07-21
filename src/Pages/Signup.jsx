import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Text, useToast } from '@chakra-ui/react';
import {
  Box,
  Center,
  Heading,
  Image,
  Input,
} from "@chakra-ui/react";
import loader_gif from "../Assets/images/loader_gif.gif";
import { signup } from './../Redux/SignupRedux/Signup.Actions';
import { useDispatch } from "react-redux";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate password length
  const validatePassword = (password) => {
    return password.length >= 4; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 4 characters long.");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    const payload = {
      email,
      password,
    };

    dispatch(signup({ payload })).then((res) => {
      console.log("res", res);
      setLoading(false);
      if (res.message === "User already exists") {
        toast({
          title: "Account Exist",
          description: "Please Log In",
          status: "info",
          duration: 4000,
          position: "top-right",
          isClosable: true,
        });
        return navigate("/login");
      } else if (res.message === "User registration successfully") {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 4000,
          position: "top-right",
          isClosable: true,
        });
        return navigate("/login");
      }
    });
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
        <Heading m={{ lg: "20px auto" }}>Sign Up</Heading>
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
          <Text mt="20px">Already have an account? <Link to="/login" style={{ color: "#e4002b" }}>Login</Link></Text>
        </Box>
      </Box>
    </Center>
  );
};

export default Signup;
