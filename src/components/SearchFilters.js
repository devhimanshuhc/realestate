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
import { filterData } from "../utils/filters";
import noresult from "../img/noresult.svg";
import { baseUrl, fetchApi } from "../utils/fetcgApi";

const SearchFilters = ({ getDataFromFilters }) => {
	const [filters] = useState(filterData);
	const [searchTerm, setSearchTerm] = useState("");
	const [locationData, setLocationData] = useState();
	const [loading, setLoading] = useState(false);
	const [showLocations, setShowLocations] = useState(false);
	const [searchFilters, setSearchFilters] = useState({});

	const handleChange = async (e, queryName) => {
		const { value } = e.target;
		// Push the value to the searchFilters state
		setSearchFilters((prev) => ({
			...prev,
			[queryName]: value,
		}));
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

	useEffect(() => {
		const fetchSearchedFiltersData = async () => {
			try {
				let searchURL = `${baseUrl}/properties/list`;

				if (!searchFilters) return "no data filtered";

				Object.keys(searchFilters).forEach((key, index) => {
					if (index === 0) {
						searchURL += `?${key}=${searchFilters[key]}`;
					} else {
						searchURL += `&${key}=${searchFilters[key]}`;
					}
				});
				const data = await fetchApi(searchURL);
				getDataFromFilters(data?.hits);
			} catch (error) {
				console.log(error);
			}
		};

		fetchSearchedFiltersData();
	}, [searchFilters, getDataFromFilters]);

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
											onClick={(e) => {
												setSearchFilters((prev) => ({
													...prev,
													[`locationExternalIDs`]: location.externalID,
												}));
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
							onChange={(e) => handleChange(e, filter.queryName)}
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
