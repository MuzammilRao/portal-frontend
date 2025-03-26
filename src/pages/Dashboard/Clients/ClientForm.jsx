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
import { getOneClient } from '../../../redux/clientSlice/actions';
import { addClient, updateClient } from '../../../redux/clientSlice';
import countries from '../../../utils/countryData';
import { renderCheckboxes } from '../../../utils/helpers';
import { getUserMerchants } from '../../../redux/merchantSlice';
import CustomSelect from '../../../components/Common/CustomSelect';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showErrorToast, showSuccessToast } = useToast();
  const client = useSelector((state) => state.client.singleClient);
  const brands = useSelector((state) => state.brand.brands);
  const merchants = useSelector((state) => state.merchant.merchants);
  const { isCreateAllowed, isReadAllowed, isUpdateAllowed, isDeleteAllowed, user } =
    usePermissionCheck(CONSTANTS.modules.CLIENTS);

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    website: '',
    phone: '',
    country: '',
    countryCode: '',
    clientEmail: '',
    additionalEmails: [],
    brand: null,
    merchant: null,
    image: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(getOneClient({ id: id }));
      dispatch(getBrands());
    }

    dispatch(getBrands());
    dispatch(getUserMerchants());
  }, [dispatch, id]);

  useEffect(() => {
    setFormValues({ ...formValues, ...client });
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (!id) {
      dispatch(addClient({ payload: formValues }))
        .then((action) => {
          if (addClient.fulfilled.match(action)) {
            if (action.payload) {
              showSuccessToast('Client Added Succesfully.');
              navigate(-1);
              return;
            } else {
              showErrorToast('Failed to Add Client.');
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
      dispatch(updateClient({ id: id, payload: formValues }))
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

  const handleMerchantChange = (e) => {
    setFormValues({ ...formValues, merchant: e.target.value });
  };

  return (
    <VStack spacing="6" align="stretch" p="4">
      <form onSubmit={formHandler}>
        <Flex mb={6} justifyContent="space-between" alignItems="end">
          <DashboardHeading>{!!id ? 'Update Client' : 'Add New Client'}</DashboardHeading>
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

        <Flex flexWrap={'wrap'} p="10" borderRadius={10} bg={'brand.themeGray'}>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>FirstName *</FormLabel>
              <Input
                color={'brand.primary'}
                required
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter First Name."
                name="firstName"
                onChange={handleChange}
                value={formValues.firstName}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Last Name * </FormLabel>
              <Input
                required
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Last Name."
                name="lastName"
                onChange={handleChange}
                value={formValues.lastName}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Email * </FormLabel>
              <Input
                color={'brand.primary'}
                required
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Clients Email."
                name="clientEmail"
                onChange={handleChange}
                value={formValues.clientEmail}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Phone * </FormLabel>
              <Input
                color={'brand.primary'}
                required
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Clients Phone."
                name="phone"
                onChange={handleChange}
                value={formValues.phone}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Business Name *</FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Business name"
                name="businessName"
                onChange={handleChange}
                value={formValues.businessName}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>St Address </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter  Address."
                name="address"
                onChange={handleChange}
                value={formValues.address}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>City </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter City ."
                name="city"
                onChange={handleChange}
                value={formValues.city}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>State </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter State ."
                name="state"
                onChange={handleChange}
                value={formValues.state}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Zip </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="number"
                placeholder="Zip Code."
                name="zip"
                onChange={handleChange}
                value={formValues.zip}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Country</FormLabel>
              <Select
                size={'lg'}
                color={'brand.secondary'}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    country: e.target.value.split('/')[0],
                    countryCode: e.target.value.split('/')[1],
                  });
                }}
              >
                <option selected hidden disabled value="">
                  {!!id && !!client?.country ? client?.country : 'Select a Country'}
                </option>
                {countries?.map((e, i) => (
                  <option key={i} value={`${e?.name}/${e?.code}`}>
                    {e?.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Website </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="url"
                placeholder="Website."
                name="website"
                onChange={handleChange}
                value={formValues.website}
              />
            </FormControl>
          </Box>

          <Box w="45%" mr="30px">
            <CustomSelect
              label="Brand"
              options={brands?.map((e) => ({ value: e?._id, label: e?.name }))}
              placeholder={!!id && !!client?.brand?.name ? client?.brand?.name : 'Select a Brand'}
              value={formValues.brand}
              onChange={(e) => setFormValues({ ...formValues, brand: e.value })}
            />
          </Box>
          {/* <Box w="100%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Merchant</FormLabel>
              <Flex flexWrap={'wrap'} gap={10}>
                {merchants?.map((merchant, i) => (
                  <Checkbox
                    color={'brand.primary'}
                    onChange={(e) => handleMerchantChange(e)}
                    isChecked={merchant._id === formValues?.merchant?._id}
                    key={i}
                    value={merchant._id}
                  >
                    {merchant?.name}
                  </Checkbox>
                ))}
              </Flex>
            </FormControl>
          </Box> */}
        </Flex>
      </form>
    </VStack>
  );
};

export default ClientForm;
