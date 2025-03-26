import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { getOneClient } from '../../../redux/clientSlice';
import DashboardHeading from '../../../components/DashboardHeading';

const ClientManagementInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client.singleClient);

  useEffect(() => {
    if (id) {
      dispatch(getOneClient({ id }));
    }
  }, [dispatch, id]);

  console.log(client);

  return (
    <VStack spacing="6" align="stretch" p="4">
      <Flex mb={6} justifyContent="space-between" alignItems="end">
        <DashboardHeading>Client Details</DashboardHeading>
      </Flex>

      <Flex pt={5} color={'brand.primary'} boxShadow={'5px 5px 5px #808080'} bg={'brand.themeGray'}>
        <Flex px={5} gap={10} flexDir={'column'} h={'min-content'} flex={0.8}>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Client Name:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} textTransform={'capitalize'} fontWeight={'600'}>
                {`${client?.firstName} ${client?.lastName} `}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Email:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'600'}>
                {client?.clientEmail}
              </Text>
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Phone:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} textTransform={'capitalize'} fontWeight={'600'}>
                {client?.phone}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Address:
              </Text>
            </GridItem>
            <GridItem h="10">
              {client?.address && (
                <Text fontSize={14} textTransform={'capitalize'} fontWeight={'600'}>
                  {`${client?.address}, ${client?.city}, ${client?.zip}, ${client?.country}, ${client?.countryCode} `}
                </Text>
              )}
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Created At:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} textTransform={'capitalize'} fontWeight={'600'}>
                {new Date(client?.createdAt).toLocaleString()}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Website:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'600'}>
                {!!client?.website ? client?.website : '-'}
              </Text>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Brand:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} textTransform={'capitalize'} fontWeight={'600'}>
                {client?.brand?.name}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Merchant:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} textTransform={'capitalize'} fontWeight={'600'}>
                {client?.merchant?.name}
              </Text>
            </GridItem>
          </Grid>
        </Flex>
        {/* <Flex flexDir={'column'} color={'brand.primary'} bg={'brand.text'} flex={0.3}>
          <Box as="div" h={'350px'} maxHeight={'450px'} overflowY={'scroll'}>
            <Box
              borderBottomColor={'brand.primary'}
              borderBottomWidth={2}
              borderBottomStyle={'groove'}
              pb={2}
            >
              <Text bg={'brand.text'} textAlign={'center'} fontSize={22} fontWeight={'700'}>
                Projects
              </Text>
            </Box>

            <Box>
              {client?.jobs?.map((e) => (
                <Box
                  key={e?._id}
                  borderColor={'brand.primary'}
                  borderWidth={1}
                  borderStyle={'dashed'}
                  px={2}
                  fontSize={14}
                >
                  <Text color={'brand.primary'} textTransform={'capitalize'} fontWeight={'500'}>
                    Name: {e?.projectName}
                  </Text>
                  <Text color={'brand.primary'} textTransform={'capitalize'} fontWeight={'500'}>
                    Total Invoices: {!!e?.invoice?.length ? e?.invoice?.length : `0`}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Flex> */}
      </Flex>
    </VStack>
  );
};

export default ClientManagementInfo;
