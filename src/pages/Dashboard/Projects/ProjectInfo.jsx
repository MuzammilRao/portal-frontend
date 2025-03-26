import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { getOneProject } from '../../../redux/projectSlice';
import DashboardHeading from '../../../components/DashboardHeading';

const ProjectInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.singleProject);

  useEffect(() => {
    if (id) {
      dispatch(getOneProject({ id }));
    }
  }, [dispatch, id]);

  console.log(project);

  return (
    <VStack spacing="6" align="stretch" p="4">
      <Flex mb={6} justifyContent="space-between" alignItems="end">
        <DashboardHeading>Project Details</DashboardHeading>
      </Flex>

      <Flex pt={5} boxShadow={'5px 5px 5px #808080'} bg={'brand.primary'}>
        <Flex px={5} gap={10} flexDir={'column'} h={'min-content'} flex={0.8}>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Project Name:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} textTransform={'capitalize'} fontWeight={'600'}>
                {`${project?.projectName}  `}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Project Budget
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'600'}>
                {project?.projectBudget}
              </Text>
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
                {new Date(project?.createdAt).toLocaleString()}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Client:
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'600'}>
                {`${project?.client?.firstName} ${project?.client?.lastName}`}
              </Text>
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(1, 1fr 1fr 0.5fr 1fr 1fr)" gap={1}>
            <GridItem h="10">
              <Text fontSize={14} fontWeight={'400'}>
                Total Invoices
              </Text>
            </GridItem>
            <GridItem h="10">
              <Text fontSize={14} textTransform={'capitalize'} fontWeight={'600'}>
                {project?.invoice?.length ?? 0}
              </Text>
            </GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10"></GridItem>
            <GridItem h="10"></GridItem>
          </Grid>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default ProjectInfo;
