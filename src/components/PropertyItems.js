import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

const PropertyItems = ({ data }) => {
  return (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      w="420px"
      p="5"
      paddingTop="0"
      cursor="pointer"
    >
      {data &&
        data.map((property) => {
          return (
            <>
              <Flex
                flexWrap="wrap"
                w="420px"
                p="5"
                paddingTop="0"
                cursor="pointer"
              >
                <Box>
                  <Image
                    src={property?.coverPhoto?.url}
                    alt="house"
                    w={400}
                    h={260}
                  />
                </Box>
                <Box w="full">
                  <Flex
                    paddingTop="2"
                    alignItems="cemter"
                    justifyContent="space-between"
                  >
                    <Flex alignItems="center">
                      <Box paddingRight="3" color="green.400">
                        <GoVerified />
                      </Box>
                      <Text fontWeight="bold" fontSize="lg">
                        AED {millify(property?.price)}
                      </Text>
                    </Flex>
                    <Box>
                      <Avatar
                        objectFit="contain"
                        size="sm"
                        src={property?.agency?.logo?.url}
                      ></Avatar>
                    </Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    p="1"
                    justifyContent="space-between"
                    w="250px"
                    color="gray.500"
                  >
                    {property?.rooms}
                    <FaBed /> | {property?.baths}
                    <FaBath /> | {millify(property?.area)} sqft
                    <BsGridFill />
                  </Flex>
                  <Text fontSize="lg">{property?.title}</Text>
                </Box>
              </Flex>
            </>
          );
        })}
    </Flex>
  );
};

export default PropertyItems;
