import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
  Text,
  Flex,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import DashboardHeading from '../../../components/DashboardHeading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLogs } from '../../../redux/logSlice';

const Logs = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logs.logs);

  useEffect(() => {
    dispatch(getAllLogs());
  }, [dispatch]);

  return (
    <VStack spacing="6" align="stretch" p="4" color={'brand.primary'}>
      <Flex justifyContent="space-between" alignItems="center">
        <DashboardHeading>Logs</DashboardHeading>
      </Flex>

      {logs?.length > 0 ? (
        <Accordion allowToggle>
          {logs.map((log) => (
            <AccordionItem
              key={log._id}
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              mb={4}
            >
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="bold">{log.description || 'No description available'}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box>
                  {Object.keys(log).map((key) => (
                    <Box key={key} mb={2}>
                      <Text>
                        <strong>{key}:</strong>{' '}
                        {typeof log[key] === 'object'
                          ? JSON.stringify(log[key], null, 2)
                          : log[key]?.toString() || 'N/A'}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Box p="4" borderRadius="md" bg="gray.50" textAlign="center" boxShadow="sm">
          <Text color="gray.500">No logs available</Text>
        </Box>
      )}
    </VStack>
  );
};

export default Logs;
