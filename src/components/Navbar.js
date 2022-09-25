import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Flex,
  Box,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

const Navbar = () => {
  return (
    <Flex p="2" borderBottom="1px" borderColor="gray.100">
      <Box fontSize="3xl" color="blue.600" fontWeight="bold">
        <Text paddingLeft="2" fontWeight="bold">
          Real Estate
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FcMenu />}
            variant="outlined"
            color="red.400"
            colorScheme='blue.400'
          />
          <MenuList color="blue.600">
            <Text>
              <MenuItem icon={<FcHome />}>Home</MenuItem>
            </Text>
            <Text>
              <MenuItem icon={<BsSearch />}>Search</MenuItem>
            </Text>
            <Text>
              <MenuItem icon={<FcAbout />}>Buy A House</MenuItem>
            </Text>
            <Text>
              <MenuItem icon={<FiKey />}>Rent A House</MenuItem>
            </Text>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
