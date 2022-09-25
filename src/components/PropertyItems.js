import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import DefaultImage from "../img/house.jpg";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

const PropertyItems = () => {
  return (
    <Flex
      flexWrap="wrap"
      w="420px"
      p="5"
      paddingTop="0"
      justifyContent="flex-start"
      cursor="pointer"
    >
      <Box>
        <Image src={DefaultImage} alt="house" w={400} h={260} />
      </Box>
      <Box w="full">
        <Flex paddingTop="2" alignItems="cemter" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color="green.400">
              <GoVerified />
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(1000000)}
            </Text>
          </Flex>
          <Box>
            <Avatar objectFit="contain" size="sm" src={DefaultImage}></Avatar>
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="gray.500"
        >
          2
          <FaBed /> | 4
          <FaBath /> | 12 sqft
          <BsGridFill />
        </Flex>
        <Text fontSize="lg">description</Text>
      </Box>
    </Flex>
  );
};

export default PropertyItems;
