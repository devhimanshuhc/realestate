import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Property from "./components/Property";

function App() {
  return (
    <Box maxWidth="1280px" m="auto">
      <Navbar />
      <Property />
    </Box>
  );
}

export default App;
