import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Select,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
  Image,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { filterData, getFilterValues } from "../utils/filters";
import noresult from "../img/noresult.svg";
import { baseUrl, fetchApi } from "../utils/fetcgApi";

const SearchFilters = () => {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [loading, setLoading] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [searchItem, setSearchItem] = useState(null);
  const [externalID, setExternalID] = useState(null);
  const searchProperties = (filterValues) => {
    const values = getFilterValues(filterValues);
    // values.forEach((item) => {
    //   if (item.value && filterValues?.item.name) {
    //     item.name = item.value;
    //   }
    // });
  };

  const handleChange = async (e) => {
    console.log(e.target.value);
    setSearchItem(e.target.value);
    const data = await fetchApi(
      `https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002&page=0&lang=en&priceMax=10000`
    );
    console.log(data);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <>
      <Flex bg="gray.300" p="4" justifyContent="center" flexWrap="wrap">
        <Flex flexDir="column">
          <Button
            onClick={() => setShowLocations(!showLocations)}
            border="1px"
            borderColor="gray.200"
            marginTop="2"
          >
            Search Location
          </Button>
          {showLocations && (
            <Flex flexDir="column" pos="relative" paddingTop="2">
              <Input
                placeholder="Type Here"
                value={searchTerm}
                w="300px"
                focusBorderColor="gray.300"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm !== "" && (
                <Icon
                  as={MdCancel}
                  pos="absolute"
                  cursor="pointer"
                  right="5"
                  top="5"
                  zIndex="100"
                  onClick={() => setSearchTerm("")}
                />
              )}
              {loading && <Spinner margin="auto" marginTop="3" />}
              {showLocations && (
                <Box height="300px" overflow="auto">
                  {locationData?.map((location) => (
                    <Box
                      key={location.id}
                      onClick={() => {
                        searchProperties({
                          locationExternalIDs: location.externalID,
                        });
                        setExternalID(location.externalID);
                        setShowLocations(false);
                        setSearchTerm(location.name);
                      }}
                    >
                      <Text
                        cursor="pointer"
                        bg="gray.200"
                        p="2"
                        borderBottom="1px"
                        borderColor="gray.100"
                      >
                        {location.name}
                      </Text>
                    </Box>
                  ))}
                  {!loading && !locationData?.length && (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      flexDir="column"
                      marginTop="5"
                      marginBottom="5"
                    >
                      <Image src={noresult} />
                      <Text fontSize="xl" marginTop="3">
                        Waiting to search!
                      </Text>
                    </Flex>
                  )}
                </Box>
              )}
            </Flex>
          )}
        </Flex>
        {filters?.map((filter) => (
          <Box key={filter.queryName}>
            <Select
              onChange={handleChange}
              placeholder={filter.placeholder}
              w="fit-content"
              p="2"
            >
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default SearchFilters;
