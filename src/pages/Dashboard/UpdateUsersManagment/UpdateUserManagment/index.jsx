import { useCallback, useEffect, useState } from 'react';
import ItemSelection from '../../../../components/ItemSelector/ItemSelection';
import classes from '../../UserSettings/UserSettings/UserSetting.module.css';
import { api } from '../../../../services/api';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useInvoiceContext } from '../../../../hooks/useInvoiceContext';
import OptionSelector from '../../../../components/OptionSelector/OptionSelector';
import { renderCheckboxes } from '../../../../utils/helpers';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
  Checkbox,
  HStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import DashboardHeading from '../../../../components/DashboardHeading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles } from '../../../../redux/roleSlice';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';

const UpdateUserManagment = () => {
  const navigate = useNavigate();
  const dispatchOfRedux = useDispatch();
  const roles = useSelector((state) => state.role.roles);
  const { brands, businessUnit, dispatch } = useInvoiceContext();
  const [singleUser, setSingleUser] = useState(null);
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const { id } = useParams();
  const { user } = useAuthContext();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedBusinessUnit, setBusinessUnit] = useState(null);
  const [isHead, setIsHead] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const fetchItems = useCallback(
    async (url, dispatchType) => {
      try {
        const { data } = await api.get(url, {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        });
        if (data) {
          dispatch({
            type: dispatchType,
            payload: data?.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [user, dispatch],
  );

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await api.get(`/api/v1/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        setSingleUser(data?.data);

        setSelectedRole(data?.data?.role);
        setIsHead(data?.data?.isHead);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user, id]);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const { data } = await api.get(`/api/v1/admin/merchant`, {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        });
        if (data) {
          setMerchants(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMerchants();
    dispatchOfRedux(getAllRoles());
  }, []);

  useEffect(() => {
    fetchItems('/api/v1/admin/brand', 'GET_BRANDS');
    fetchItems('/api/v1/admin/business-unit', 'GET_BUSINESS_UNIT');
    fetchUser();
  }, [fetchItems, fetchUser]);

  const saveUser = async (url, payload) => {
    try {
      const { data } = await api.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        console.log('User Updated', data?.data);
        navigate('/dashboard/user-managment');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = (e) => {
    e.preventDefault();
    if (selectedBrands.length === 0) {
      return alert('Brands not Selected.');
    }
    if (!selectedBusinessUnit) {
      return alert('Please select any business unit.');
    }

    const payload = {
      businessUnit: selectedBusinessUnit,
      brands: selectedBrands,
      merchants: selectedMerchants,
      role: selectedRole,
      isHead: isHead,
    };
    console.log(payload);
    if (singleUser?.active) {
      saveUser(`/api/v1/admin/user/${singleUser?._id}`, payload);
      console.log('Save_User');
    } else {
      saveUser(`/api/v1/admin/approve-user/${singleUser?._id}`, payload);
    }
  };

  const handleCheckboxChange = (_id) => {
    setSelectedMerchants((prevSelected) =>
      prevSelected.includes(_id)
        ? prevSelected.filter((merchantId) => merchantId !== _id)
        : [...prevSelected, _id],
    );
  };

  const handleCheckboxChangeBrands = (_id) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(_id)
        ? prevSelected.filter((brandId) => brandId !== _id)
        : [...prevSelected, _id],
    );
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleResetPassword = async () => {
    setPasswordError('');
    if (!newPassword) {
      setPasswordError('Password is required.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    try {
      const { data } = await api.patch(
        `/api/v1/admin/user/${singleUser?._id}/reset-password`,
        { newPassword: newPassword },
        {
          headers: { Authorization: `Bearer ${user?.data?.token}` },
        },
      );
      if (data) {
        setNewPassword('');
        setPasswordError('');
        closeResetModal();
        toast.success('Password updated successfully!');
      }
    } catch (error) {
      setPasswordError('Failed to update password.');
    }
  };

  const openResetModal = () => {
    setIsResetModalOpen(true);
    setShowPassword(false);
    setNewPassword('');
    setPasswordError('');
  };
  const closeResetModal = () => {
    setIsResetModalOpen(false);
    setNewPassword('');
    setPasswordError('');
  };

  useEffect(() => {
    if (Array.isArray(singleUser?.merchants)) {
      setSelectedMerchants(singleUser?.merchants);
    }
    if (Array.isArray(singleUser?.brands)) {
      setSelectedBrands(singleUser?.brands);
    }
    setBusinessUnit(singleUser?.businessUnit);
  }, [singleUser]);

  return (
    <VStack bg={'brand.themeGray'} color={'theme.primary'} spacing="6" align="stretch" p="4">
      <Flex justifyContent="space-between" alignItems="center">
        <DashboardHeading>USER</DashboardHeading>
        <Button onClick={updateUser} color="white" bg="brand.themeOrange">
          {singleUser?.active ? 'Save' : 'Approve'}
        </Button>
      </Flex>
      <Box bg="brand.themeWhite" p={5} borderRadius={10}>
        <form>
          <Flex flex={1} height={'50%'}>
            <Flex flexDirection={'column'} gap={2} flex={0.5} py={5} px={2} height={'300px'}>
              <Flex flex={1}>
                <Text flex={0.25} color="brand.primary">
                  Name :
                </Text>
                <Text
                  flex={0.5}
                  color="brand.secondary"
                  fontSize="large"
                  textTransform={'capitalize'}
                >
                  {singleUser?.name}
                </Text>
              </Flex>
              <Flex flex={1}>
                <Text flex={0.25} color="brand.primary">
                  Pseudo :
                </Text>
                <Text
                  flex={0.5}
                  color="brand.secondary"
                  fontSize="large"
                  textTransform={'capitalize'}
                >
                  {singleUser?.pseudo}
                </Text>
              </Flex>
              <Flex flex={1}>
                <Text flex={0.25} color="brand.primary">
                  Email :
                </Text>
                <Text flex={0.5} color="brand.secondary" fontSize="large">
                  {singleUser?.email}
                </Text>
              </Flex>
              <Flex flex={1}>
                <Text flex={0.25} color="brand.primary">
                  US Number :
                </Text>
                <Text
                  flex={0.5}
                  color="brand.secondary"
                  fontSize="large"
                  textTransform={'capitalize'}
                >
                  {singleUser?.usNumber}
                </Text>
              </Flex>
              <Flex flex={1}>
                <Text flex={0.25} color="brand.primary">
                  PK Number :
                </Text>
                <Text
                  flex={0.5}
                  color="brand.secondary"
                  fontSize="large"
                  textTransform={'capitalize'}
                >
                  {singleUser?.pkNumber}
                </Text>
              </Flex>
              <Flex flex={1} alignItems="center" gap={2}>
                <Text flex={0.25} color="brand.primary">
                  Reset Password:
                </Text>
                <Box flex={0.75}>
                  <Button colorScheme="orange" size="sm" onClick={openResetModal}>
                    Reset Password
                  </Button>
                  <Modal isOpen={isResetModalOpen} onClose={closeResetModal} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Reset User Password</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text mb={2} color="gray.600">Set a new password for this user. Password must be at least 6 characters.</Text>
                        <InputGroup>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            color="black"
                            bg="white"
                            fontWeight="500"
                            _placeholder={{ color: 'gray.400' }}
                            _focus={{ color: 'black', bg: 'white' }}
                          />
                          <InputRightElement width="3rem">
                            <Button h="1.5rem" size="sm" variant="ghost" onClick={() => setShowPassword((v) => !v)}>
                              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        {passwordError && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {passwordError}
                          </Text>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme="orange" mr={3} onClick={handleResetPassword} isDisabled={!singleUser}>
                          Set Password
                        </Button>
                        <Button variant="ghost" onClick={closeResetModal}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              </Flex>
            </Flex>
            <Box border={'1px solid white'} mx={4}></Box>
            <Flex
              flex={0.5}
              py={5}
              px={2}
              height={'100%'}
              // overflowY={'scroll'}
              flexDirection={'column'}
            >
              <FormControl my={4}>
                <FormLabel color={'black'} htmlFor="Business_Unit">
                  Select Business Unit
                </FormLabel>
                <Select
                  name="Business_Unit"
                  value={selectedBusinessUnit}
                  onChange={(e) => {
                    setBusinessUnit(e.target.value);
                  }}
                >
                  {businessUnit?.map((b, i) => (
                    <OptionSelector key={i} item={b} />
                  ))}
                </Select>
              </FormControl>
              <FormControl my={4}>
                <HStack color={'black'} spacing={4}>
                  <Checkbox
                    name="isHead"
                    onChange={(e) => setIsHead(e.target.checked)}
                    isChecked={isHead}
                  />
                  <FormLabel htmlFor="isHead">Is Head </FormLabel>
                </HStack>
              </FormControl>
              <FormControl my={4}>
                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box color={'black'} as="span" flex="1" textAlign="left">
                        Assign a Role
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel color={'black'} pb={4}>
                      {roles &&
                        roles?.map((e) => (
                          <Flex key={e?._id} gap={3}>
                            <Checkbox
                              onChange={handleRoleChange}
                              isChecked={selectedRole === e?._id}
                              // checked={selectedRole === e?._id}
                              value={e?._id}
                            />
                            <Text>{e?.name}</Text>
                          </Flex>
                        ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </FormControl>

              <FormControl my={4}>
                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box color={'black'} as="span" flex="1" textAlign="left">
                        Assign Brands
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel color={'black'} pb={4}>
                      <Flex>
                        {renderCheckboxes(brands, selectedBrands, handleCheckboxChangeBrands)}
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </FormControl>

              <FormControl my={4}>
                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box color={'black'} as="span" flex="1" textAlign="left">
                        Assign Merchants
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel color={'black'} pb={4}>
                      <Flex>
                        {renderCheckboxes(merchants, selectedMerchants, handleCheckboxChange)}
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </FormControl>
            </Flex>
          </Flex>
        </form>
      </Box>
    </VStack>
  );
};

export default UpdateUserManagment;
