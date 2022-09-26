import React, { useState } from "react";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter, BsSearch } from "react-icons/bs";
import SearchFilters from "./SearchFilters";
import noresult from "../img/noresult.svg";
import PropertyItems from "./PropertyItems";

const Property = () => {
	const [searchFilters, setSearchFilters] = useState(false);
	const [filteredData, setFilteredData] = useState([]);

	const getDataFromFilters = (data) => {
		setFilteredData(data);
	};

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

			{searchFilters && (
				<SearchFilters getDataFromFilters={getDataFromFilters} />
			)}
			<Text fontSize="2xl" p="4" fontWeight="bold">
				Properties Results
			</Text>

			<Flex flexWrap="wrap">
				<PropertyItems data={filteredData} />
			</Flex>
		</Box>
	);
};

export default Property;