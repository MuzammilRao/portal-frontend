import { useState } from 'react';
import { yearsList } from '../../utils/helpers';
import { Link, useNavigate } from 'react-router-dom';
import OptionSelector from '../OptionSelector/OptionSelector';
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import useApi from '../../hooks/useApi';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import useToast from '../../hooks/useToast';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';

const Form = ({ pageTitle, postUrl = '', dispatchType }) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { user } = useAuthContext();
  const { users, dispatch } = useInvoiceContext();
  const navigate = useNavigate();
  const { error, loading, apiCall } = useApi();
  const [amount, setAmount] = useState(null);
  const [selectedBusinessUnit, setBusinessUnit] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiCall('/api/v1/admin/user');
        if (data) {
          dispatch({
            type: 'GET_USERS',
            payload: data?.data,
          });
        }
      } catch (error) {
        console.log('Fetch Error', error);
      }
    };
    fetchUsers();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return showErrorToast('Please select Business Unit Head.');
    }
    const payload = {
      user: selectedBusinessUnit,
      amount,
      month: selectedMonth,
      year: selectedYear,
    };
    try {
      const data = await apiCall(postUrl, 'post', payload);
      if (data) {
        dispatch({
          type: dispatchType,
          payload: data?.data,
        });
        showSuccessToast(`${pageTitle.split(' ')[1]} created successfully!`);
        navigate(-1);
      }
    } catch (error) {
      console.log('Post-Error', error);
    }
  };

  return (
    <Box as="div">
      <Box as="div">
        <Heading as="h1" color="brand.secondary">
          {pageTitle}
        </Heading>
      </Box>
      <Flex
        bg="brand.primary"
        justifyContent="space-between"
        borderRadius="10px"
        p="30px"
        mt="1rem"
      >
        <Box as="form" w="100%" onSubmit={handleSubmit}>
          <Flex>
            <Box w="50%" mr="30px">
              <FormControl my="10px">
                <FormLabel>Amount </FormLabel>
                <Input
                  type="Number"
                  placeholder="Enter target amount."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
              <FormControl my="10px">
                <FormLabel>Select Month </FormLabel>
                <Select
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  placeholder="Select a Month"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((b) => (
                    <OptionSelector optionTitle="Select Month" key={b} item={b} />
                  ))}
                </Select>
              </FormControl>{' '}
            </Box>
            <Box w="50%" mr="30px">
              <FormControl my="10px">
                <FormLabel>Select Year </FormLabel>
                <Select
                  onChange={(e) => setSelectedYear(e.target.value)}
                  placeholder="Select a year"
                >
                  {yearsList()?.map((b) => (
                    <OptionSelector optionTitle="Select Year" key={b} item={b} />
                  ))}
                </Select>
              </FormControl>
              <FormControl my="10px">
                <FormLabel>Select Business Unit Head </FormLabel>
                <Select
                  color={'#000'}
                  onChange={(e) => setBusinessUnit(e.target.value)}
                  placeholder="Select Busines Unit Head"
                >
                  {users?.map((b) => (
                    <OptionSelector optionTitle="Select Business Unit" key={b._id} item={b} />
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Flex>
          {/* {error && <p style={{ color: 'red', fontSize: '0.8rem', margin: '20px 0' }}>{error}</p>} */}
          <Box h="20px" />
          <Button bg="brand.secondary" type="submit" disabled={loading} isLoading={loading}>
            Add
          </Button>

          <Link onClick={() => navigate(-1)}>
            <Button ml="20px" bg="brand.secondary">
              Cancel
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Form;
