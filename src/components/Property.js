import React, { useState } from "react";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter, BsSearch } from "react-icons/bs";
import SearchFilters from "./SearchFilters";
import noresult from "../img/noresult.svg";
import PropertyItems from "./PropertyItems";

const Property = () => {
  const [searchFilters, setSearchFilters] = useState(false);
  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.400"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Properties By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>

      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties Results
      </Text>
      <Flex flexWrap="wrap">
        <PropertyItems />
      </Flex>
      {/* {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={noresult} alt="no result" />
          <Text fontSize="2xl" marginTop="3">
            {" "}
            No Results Found
          </Text>
        </Flex>
      )} */}
    </Box>
  );
};

export default Property;
