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
  Image,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addBrand, getBrands, getOneBrand, updateBrand } from '../../../redux/brandSlice';
import useToast from '../../../hooks/useToast';
import CONSTANTS from '../../../utils/constants';
import usePermissionCheck from '../../../hooks/usePermissionCheck';
import { getOneClient } from '../../../redux/clientSlice/actions';
import { addClient, updateClient } from '../../../redux/clientSlice';
import countries from '../../../utils/countryData';
import { renderCheckboxes } from '../../../utils/helpers';
import { getUserMerchants } from '../../../redux/merchantSlice';

const handleFile = (e) => {
  const file = e.target.files[0];

  return new Promise((resolve, reject) => {
    if (!file) {
      alert('Please select a File to upload!');
      reject('No file selected');
      return;
    }

    transformFile(file, (result) => {
      resolve(result);
    });
  });
};

const transformFile = (file, callback) => {
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      callback(reader.result);
    };
  }
};

const BrandForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showErrorToast, showSuccessToast } = useToast();
  const brands = useSelector((state) => state.brand.brands);
  const brand = useSelector((state) => state.brand.singleBrand);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    logo: '',
    textColorPrimary: '',
    textColorSecondary: '',
    termsAndConditions: '',
    invoiceBgColor: '',
    letterHead: '',
    invoicePrefix: 'INV-',
    invoiceNumber: 500,
  });

  useEffect(() => {
    if (id) {
      dispatch(getOneBrand({ id: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setFormValues({ ...formValues, ...brand });
  }, [brand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const logoHandler = async (e) => {
    try {
      const logo = await handleFile(e);
      setFormValues({ ...formValues, logo });
    } catch (error) {
      console.error(error);
    }
  };
  const letterHeadHandler = async (e) => {
    try {
      const letterHead = await handleFile(e);
      setFormValues({ ...formValues, letterHead });
    } catch (error) {
      console.error(error);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (!id) {
      dispatch(addBrand({ payload: formValues }))
        .then((action) => {
          if (addBrand.fulfilled.match(action)) {
            if (action.payload) {
              showSuccessToast('Brand Added Succesfully.');
              navigate(-1);
              return;
            } else {
              showErrorToast('Failed to Add Brand.');
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
      dispatch(updateBrand({ id: id, payload: formValues }))
        .then((response) => {
          showSuccessToast('Brand Updated Succesfully.');
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
          <DashboardHeading>{!!id ? 'Update Brand' : 'Add New Brand'}</DashboardHeading>
          <Flex gap={4} alignItems={'end'}>
            {!!id ? (
              <Button type="submit" bg="brand.themeOrange" color="brand.text">
                Update
              </Button>
            ) : (
              <Button type="submit" bg="brand.themeOrange" color="brand.text">
                Add
              </Button>
            )}
          </Flex>
        </Flex>

        <Flex flexWrap={'wrap'} p="10" borderRadius={10} bg={'brand.themeGray'}>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Name *</FormLabel>
              <Input
                required
                border={'1px solid #808080'}
                color={'brand.primary'}
                type="text"
                placeholder="Enter Name."
                name="name"
                onChange={handleChange}
                value={formValues.name}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Email * </FormLabel>
              <Input
                required
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter email."
                name="email"
                onChange={handleChange}
                value={formValues.email}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Address * </FormLabel>
              <Input
                required
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Address."
                name="address"
                onChange={handleChange}
                value={formValues.address}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>City * </FormLabel>
              <Input
                required
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter city"
                name="city"
                onChange={handleChange}
                value={formValues.city}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>State *</FormLabel>
              <Input
                required
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter State"
                name="state"
                onChange={handleChange}
                value={formValues.state}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Country *</FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter  Address."
                name="country"
                onChange={handleChange}
                value={formValues.country}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Zip *</FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Zip Code ."
                name="zip"
                onChange={handleChange}
                value={formValues.zip}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Text Color Primary </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Hex Color Code (#141414)."
                name="textColorPrimary"
                onChange={handleChange}
                value={formValues.textColorPrimary}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Text Color Secondary </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Hex Color Code (#141414)."
                name="textColorSecondary"
                onChange={handleChange}
                value={formValues.textColorSecondary}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Terms And Conditions </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Terms And Conditions "
                name="termsAndConditions"
                onChange={handleChange}
                value={formValues.termsAndConditions}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>
                Invoice background Color (white by default){' '}
              </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Hex Color Code (#141414). "
                name="invoiceBgColor"
                onChange={handleChange}
                value={formValues.invoiceBgColor}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Enter Invoice Prefix</FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Invoice Prefix "
                name="invoicePrefix"
                onChange={handleChange}
                value={formValues.invoicePrefix}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Invoice Number</FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="number"
                placeholder="Enter Invoice Number "
                name="invoiceNumber"
                onChange={handleChange}
                value={formValues.invoiceNumber}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px"></Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Upload Logo </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="file"
                placeholder="Upload Logo "
                name="logo"
                onChange={(e) => logoHandler(e)}
                value=""
              />
              <Box height={'200px'} my={5}>
                {formValues?.logo && (
                  <Image
                    src={formValues?.logo}
                    height={'200px'}
                    width={'200px'}
                    objectFit={'contain'}
                  />
                )}
              </Box>
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Upload Letter Head </FormLabel>
              <Input
                color={'brand.primary'}
                border={'1px solid #808080'}
                type="file"
                placeholder="Upload LetterHead "
                name="letterHead"
                onChange={(e) => letterHeadHandler(e)}
                value=""
              />
              <Box height={'200px'} my={5}>
                {formValues?.letterHead && (
                  <Image
                    src={formValues?.letterHead}
                    height={'200px'}
                    width={'200px'}
                    objectFit={'contain'}
                  />
                )}
              </Box>
            </FormControl>
          </Box>
        </Flex>
      </form>
    </VStack>
  );
};

export default BrandForm;
