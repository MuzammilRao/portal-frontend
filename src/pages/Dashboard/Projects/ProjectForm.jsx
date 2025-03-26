import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeading from '../../../components/DashboardHeading';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../../redux/brandSlice';
import useToast from '../../../hooks/useToast';
import CONSTANTS from '../../../utils/constants';
import usePermissionCheck from '../../../hooks/usePermissionCheck';
import { getUserClients } from '../../../redux/clientSlice';
import countries from '../../../utils/countryData';
import { renderCheckboxes } from '../../../utils/helpers';
import { getUserMerchants } from '../../../redux/merchantSlice';
import { addProject, getOneProject, updateProject } from '../../../redux/projectSlice';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showErrorToast, showSuccessToast } = useToast();
  const project = useSelector((state) => state.project.singleProject);
  const clients = useSelector((state) => state.client.clients);
  const { isCreateAllowed, isReadAllowed, isUpdateAllowed, isDeleteAllowed, user } =
    usePermissionCheck(CONSTANTS.modules.PROJECTS);

  console.log(clients);

  const [formValues, setFormValues] = useState({
    projectName: '',
    projectBudget: '',
    emails: [],
    client: null,
  });

  useEffect(() => {
    if (id) {
      dispatch(getOneProject({ id: id }));
    }

    dispatch(getUserClients());
  }, [dispatch, id]);

  useEffect(() => {
    setFormValues({ ...formValues, ...project });
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (!id) {
      dispatch(addProject({ payload: formValues }))
        .then((action) => {
          if (addProject.fulfilled.match(action)) {
            if (action.payload) {
              showSuccessToast('Project Added Succesfully.');
              navigate(-1);
              return;
            } else {
              showErrorToast('Failed to Add Project.');
            }
          } else {
            showErrorToast('Failed to Add!');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showErrorToast(error?.message);
        });
    } else if (id) {
      dispatch(updateProject({ id: id, payload: formValues }))
        .then((response) => {
          showSuccessToast('Client Updated Succesfully.');
          navigate(-1);
        })
        .catch((error) => {
          console.error('Error:', error);
          showErrorToast(error?.message);
        });
    }
  };

  return (
    <VStack spacing="6" align="stretch" p="4">
      <form onSubmit={formHandler}>
        <Flex mb={6} justifyContent="space-between" alignItems="end">
          <DashboardHeading>{!!id ? 'Update Project' : 'Add New Project'}</DashboardHeading>
          <Flex gap={4} alignItems={'end'}>
            {!!id ? (
              <Button type="submit" bg="brand.secondary" color="brand.text">
                Update
              </Button>
            ) : (
              <Button type="submit" bg="brand.secondary" color="brand.text">
                Add
              </Button>
            )}
          </Flex>
        </Flex>

        <Flex flexWrap={'wrap'} p="10" borderRadius={10} bg={'brand.primary'}>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Name *</FormLabel>
              <Input
                required
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Project Name."
                name="projectName"
                onChange={handleChange}
                value={formValues.projectName}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Project Budget </FormLabel>
              <Input
                required
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Projects Budget."
                name="projectBudget"
                onChange={handleChange}
                value={formValues.projectBudget}
              />
            </FormControl>
          </Box>

          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Client</FormLabel>
              <Select
                color={'brand.secondary'}
                size={'lg'}
                onChange={(e) => {
                  setFormValues({ ...formValues, client: e.target.value });
                }}
              >
                <option selected hidden disabled value="">
                  {!!id && !!formValues?.client?.firstName
                    ? formValues?.client?.firstName
                    : 'Select a Client'}
                </option>
                {clients?.map((e, i) => (
                  <option key={i} value={e?._id}>
                    {`${e?.firstName} ${e?.lastName}`}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Flex>
      </form>
    </VStack>
  );
};

export default ProjectForm;
