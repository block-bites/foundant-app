import { useState, useEffect } from "react";

import { ChakraProvider, HStack, Text } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { fondantTheme } from "./styles/theme";

import Navbar from "./components/organisms/navbar";
import Accounts from "./components/pages/accounts";
import Blocks from "./components/pages/blocks";
import Logs from "./components/pages/logs";

export const App = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  //Set screen width state
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Check device and screen width
  useEffect(() => {
    setIsMobile(
      /android|iphone|kindle|ipad/i.test(navigator.userAgent) ||
        window.innerWidth <= 768
    );
  }, [screenWidth]);

  if (isMobile) {
    return (
      <HStack width="100%" justify="center" fontSize="28px" fontWeight="600">
        <Text align="center">Used device and resolution not supported</Text>
      </HStack>
    );
  }

  return (
    <ChakraProvider theme={fondantTheme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accounts />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/deploys" element={<div>Dploys</div>} />
          <Route path="/events" element={<div>Events</div>} />
          <Route path="/logs" element={<Logs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};
