import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeading from '../../../components/DashboardHeading';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addLead, getOneLead, updateLead } from '../../../redux/leadSlice';
import { getAllBrands } from '../../../redux/brandSlice';
import useToast from '../../../hooks/useToast';
import { getAllUsers } from '../../../redux/userSlice';
import CONSTANTS from '../../../utils/constants';
import usePermissionCheck from '../../../hooks/usePermissionCheck';

const LeadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showErrorToast, showSuccessToast } = useToast();
  const lead = useSelector((state) => state.lead.singleLead);
  const brands = useSelector((state) => state.brand.brands);
  const users = useSelector((state) => state.user.users);
  const { isCreateAllowed, isReadAllowed, isUpdateAllowed, isDeleteAllowed, user } =
    usePermissionCheck(CONSTANTS.modules.ADMIN_LEADS);

  const [formValues, setFormValues] = useState({
    clientName: '',
    email: '',
    address: '',
    phone: '',
    service: '',
    leadType: '',
    leadCost: '',
    leadDate: '',
    brand: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(getOneLead({ id: id }));
      dispatch(getAllUsers());
    }
    dispatch(getAllBrands());
  }, [dispatch, id]);

  useEffect(() => {
    setFormValues({ ...formValues, ...lead });
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (!id) {
      formValues.leadDate = new Date().toISOString();

      dispatch(addLead({ payload: formValues }))
        .then((action) => {
          if (addLead.fulfilled.match(action)) {
            if (action.payload) {
              showSuccessToast('Lead Added Succesfully.');
              navigate(-1);
              return;
            } else {
              showErrorToast('Failed to Add Lead.');
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
      formValues.assignedAt = new Date().toISOString();

      dispatch(updateLead({ id: id, payload: formValues }))
        .then((response) => {
          showSuccessToast('Lead Updated Succesfully.');
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
          <DashboardHeading>{!!id ? 'Update Lead' : 'Add New Lead'}</DashboardHeading>
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
                placeholder="Enter Clients Name."
                name="clientName"
                onChange={handleChange}
                value={formValues.clientName}
                disabled={user?.roles?.name !== 'admin' && user?.roles?.name !== 'marketing'}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Client's Email * </FormLabel>
              <Input
                required
                border={'1px solid #808080'}
                type="email"
                placeholder="Enter Clients Email."
                name="email"
                onChange={handleChange}
                value={formValues.email}
                disabled={user?.roles?.name !== 'admin' && user?.roles?.name !== 'marketing'}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Phone *</FormLabel>
              <Input
                required
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Phone"
                name="phone"
                onChange={handleChange}
                value={formValues.phone}
                disabled={user?.roles?.name !== 'admin' && user?.roles?.name !== 'marketing'}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Address </FormLabel>
              <Input
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Address Address."
                name="address"
                onChange={handleChange}
                value={formValues.address}
                disabled={user?.roles?.name !== 'admin' && user?.roles?.name !== 'marketing'}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Lead Type </FormLabel>
              <Input
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Lead Type ."
                name="leadType"
                onChange={handleChange}
                value={formValues.leadType}
                disabled={user?.roles?.name !== 'admin' && user?.roles?.name !== 'marketing'}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Lead Cost </FormLabel>
              <Input
                border={'1px solid #808080'}
                type="number"
                placeholder="Enter Lead Cost ."
                name="leadCost"
                onChange={handleChange}
                value={formValues.leadCost}
                disabled={user?.roles?.name !== 'admin' && user?.roles?.name !== 'marketing'}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Service</FormLabel>
              <Input
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter  Service."
                name="service"
                onChange={handleChange}
                value={formValues.service}
                disabled={user?.roles?.name !== 'admin' && user?.roles?.name !== 'marketing'}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Brand</FormLabel>
              <Select
                disabled={user?.roles?.name !== 'admin' && user?.roles?.name !== 'marketing'}
                size={'lg'}
                onChange={(e) => {
                  setFormValues({ ...formValues, brand: e.target.value });
                }}
              >
                <option selected hidden disabled value="">
                  {!!id && !!lead?.brand?.name ? lead?.brand?.name : 'Select a Brand'}
                </option>
                {brands?.map((e) => (
                  <option key={e?._id} value={e?._id}>
                    {e?.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          {!!id && (
            <Box w="45%" mr="30px">
              <FormControl my="10px">
                <FormLabel color={'brand.secondary'}>Assign to a User</FormLabel>
                <Select
                  color={'brand.secondary'}
                  size={'lg'}
                  onChange={(e) => {
                    setFormValues({ ...formValues, assignedTo: e.target.value });
                  }}
                >
                  <option selected hidden disabled value="">
                    {!!id && !!lead?.assignedTo?.name
                      ? `${lead?.assignedTo?.name}`
                      : 'Assign To a User'}
                  </option>
                  {users?.map((e) => (
                    <option key={e?._id} value={e?._id}>
                      {e?.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          {!!id && (
            <Box w="45%" mr="30px">
              <FormControl my="10px">
                <FormLabel color={'brand.secondary'}>Update Status</FormLabel>
                <Select
                  color={'brand.secondary'}
                  size={'lg'}
                  onChange={(e) => {
                    setFormValues({ ...formValues, status: e.target.value });
                  }}
                >
                  <option selected hidden disabled value="">
                    {lead?.status}
                  </option>
                  {Object.values(CONSTANTS.leadStatus).map((e, i) => (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </Flex>
      </form>
    </VStack>
  );
};

export default LeadForm;
