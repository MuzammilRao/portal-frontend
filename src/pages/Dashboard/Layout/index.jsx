import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import ErrorBoundary from '../../../components/ErrorBoundaries/ErrorBoundary';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';

const Layout = (props) => {
  // Use responsive width for the sidebar
  const sidebarWidth = useBreakpointValue({ base: '0%', md: '15vw', lg: '15vw' });

  return (
    <Flex h="100vh" color="white" overflow="hidden">
      <aside style={{ width: sidebarWidth }}>
        <Sidebar />
      </aside>
      <Flex direction="column" w="full" overflowY="auto">
        <Topbar />
        <Box as="div" px={{ base: '2', md: '5' }} py={{ base: '2', md: '5' }}>
          <ErrorBoundary>{props.children}</ErrorBoundary>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
