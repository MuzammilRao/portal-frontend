import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneLead } from '../../../redux/leadSlice';
import { Box, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import DashboardHeading from '../../../components/DashboardHeading';

const LeadInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const lead = useSelector((state) => state.lead.singleLead);

  useEffect(() => {
    if (id) {
      dispatch(getOneLead({ id }));
    }
  }, [dispatch, id]);

  return (
    <VStack spacing="6" align="stretch" p="4">
      <Flex mb={6} justifyContent="space-between" alignItems="end">
        <DashboardHeading>Lead Details</DashboardHeading>
      </Flex>

      <Flex pt={5} boxShadow={'5px 5px 5px #808080'} bg={'brand.primary'}>
        <Flex px={5} gap={10} flexDir={'column'} flex={0.8}>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Client Name:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} textTransform={'capitalize'} fontWeight={'600'}>
                {lead?.clientName}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Email:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'600'}>
                {lead?.email}
              </Text>
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Phone:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} textTransform={'capitalize'} fontWeight={'600'}>
                {lead?.phone}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Address:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} textTransform={'capitalize'} fontWeight={'600'}>
                {lead?.address}
              </Text>
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Lead Date:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} textTransform={'capitalize'} fontWeight={'600'}>
                {new Date(lead?.leadDate).toLocaleString()}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Lead Cost:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} textTransform={'capitalize'} fontWeight={'600'}>
                {!!lead?.leadCost ? lead?.leadCost : '-'}
              </Text>
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Lead Type:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} textTransform={'capitalize'} fontWeight={'600'}>
                {!!lead?.leadType ? lead?.leadType : '-'}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10"></GridItem>
          </Grid>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Brand:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} textTransform={'capitalize'} fontWeight={'600'}>
                {lead?.brand?.name}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Service:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} textTransform={'capitalize'} fontWeight={'600'}>
                {!!lead?.service ? lead?.service : '-'}
              </Text>
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Assigned To:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} textTransform={'capitalize'} fontWeight={'600'}>
                {lead?.assignedTo?.name}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={20} fontWeight={'400'}>
                Status:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={20} textTransform={'capitalize'} fontWeight={'600'}>
                {lead?.status}
              </Text>
            </GridItem>
          </Grid>
        </Flex>
        <Flex flexDir={'column'} color={'brand.primary'} bg={'brand.text'} flex={0.2}>
          <Box as="div">
            <Box
              borderBottomColor={'brand.primary'}
              borderBottomWidth={2}
              borderBottomStyle={'groove'}
              pb={2}
            >
              <Text bg={'brand.text'} textAlign={'center'} fontSize={22} fontWeight={'700'}>
                Assignment History
              </Text>
            </Box>

            <Box maxHeight={'430px'} overflowY={'scroll'}>
              {lead?.assignmentHistory?.map((e) => (
                <Box
                  key={e?._id}
                  // height={}
                  borderColor={'brand.primary'}
                  borderWidth={1}
                  borderStyle={'dashed'}
                  px={2}
                  fontSize={12}
                >
                  <Text color={'brand.primary'} textTransform={'capitalize'} fontWeight={'500'}>
                    {e?.assignedTo?.name}
                  </Text>
                  <Text color={'brand.primary'} fontWeight={'500'}>
                    {e?.assignedTo?.email}
                  </Text>
                  <Flex fontWeight={'500'}>
                    <Text mr={2} color={'brand.secondary'} as={'span'}>
                      Assigned at:
                    </Text>
                    <Text color={'brand.primary'} as={'span'}>
                      {new Date(e?.assignedAt).toLocaleString()}
                    </Text>
                  </Flex>
                  <Flex fontWeight={'500'}>
                    <Text mr={2} color={'brand.secondary'} as={'span'}>
                      Status:
                    </Text>
                    <Text color={'brand.primary'} as={'span'}>
                      {e?.status}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Box>
          </Box>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default LeadInfo;
