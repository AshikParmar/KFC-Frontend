import {
  Flex,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Center,
  Stack,
  Hide,
  Input,
  Button,
  Show
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import VerticalLine from "../Components/VerticalLine";
import BeveragesAndDesserts from "../menu/BeveragesAndDesserts";
import BiryaniBuckets from "../menu/BiryaniBuckets";
import BoxMeals from "../menu/BoxMeals";
import Burgers from "../menu/Burgers";
import ChickenBucket from "../menu/ChickenBucket";
import HotDeals from "../menu/HotDeals";
import HotLaunches from "../menu/HotLaunches";
import Snack from "../menu/Snack";
import {Link} from "react-scroll"


const Menu = () => {
  const [isLoading,setIsLoading] = useState(false)
  


  return (
    <Box  >
      <Grid
        gridTemplateColumns={{lg:"1fr 4fr"}}
        justifyContent="center"
        margin="auto"
       
      >
        <Hide below="lg" >
        <Box >
          <Flex
              position={{md:"sticky",lg:"sticky"}}
              top={{md:"100px",lg:"50px",xl:"50px"}}
              left="0"
              p="50px"
              // m="auto"
              bg="white"
              gap="20px"
              justifyContent="center"
              alignItems="start"
              flexDir={{ lg: "column", sm: "row", md: "row" }}

             flexWrap="wrap"
             margin="auto"
             width={{base:"100%",md:"100%"}}
              
            >
             
              <Box >
              
                <VerticalLine />
                <Heading mb="10px" size="lg">KFC MENU</Heading>
              
              </Box>
           
            <Link to="hotDeals" activeClass="active" duration={500} spy={true} smooth={true}>Hot Deals</Link>
           
            <Link  to="chickenBucket" activeClass="active" duration={500} spy={true} smooth={true}>Chicken Buckets</Link>
             
            <Link to="hotLaunches" activeClass="active" duration={500} spy={true} smooth={true}>Hot Launches</Link>
            
            <Link to="boxMeals" activeClass="active" duration={500} spy={true} smooth={true}>Box Meals</Link>
              
            <Link to="burgers" activeClass="active" duration={500} spy={true} smooth={true}>Burgers</Link>

            <Link to="biryaniBuckets" activeClass="active" duration={500} spy={true} smooth={true}>Biryani Buckets</Link>

            <Link to="snack" activeClass="active" duration={500} spy={true} smooth={true}>Snack</Link>

              
            <Link to="beveragesAndDesserts" activeClass="active" duration={500} spy={true} smooth={true}>Beverages And Desserts</Link>
          
              
            </Flex>
        
        </Box>
        </Hide>

        <Grid  mb="50px"  boxShadow="base"  >

            
             <Box    id="hotDeals" >
                <HotDeals/>
             </Box>

             <Box  id="chickenBucket" >
                <ChickenBucket/>
             </Box>



             <Box  id="hotLaunches">
                <HotLaunches/>
             </Box>

             <Box  id="boxMeals">
                <BoxMeals/>
             </Box>

             <Box  id="burgers">
                <Burgers/>
             </Box>
             <Box  id="biryaniBuckets">
                <BiryaniBuckets/>
             </Box>

             <Box  id="snack">
                <Snack/>
             </Box>

             <Box  id="beveragesAndDesserts">
                <BeveragesAndDesserts/>
             </Box>

        </Grid>
      </Grid>
    </Box>
  );
};

export default Menu;


