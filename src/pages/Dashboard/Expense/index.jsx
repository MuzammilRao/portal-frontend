import React, { useEffect, useState } from 'react';
import {
  Box,
  Select,
  Text,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllExpenses, getCategories, getReports } from '../../../redux/expenseSlice';
import ExpensesTab from '../../../components/Expense/ExpensesTab';
import OpeningBalanceTab from '../../../components/Expense/OpeningBalanceTab';
import CategoriesTab from '../../../components/Expense/CategoriesTab';
import usePermissionCheck from '../../../hooks/usePermissionCheck';
import CONSTANTS from '../../../utils/constants';
import SummaryTab from '../../../components/Expense/MonthlySummary';

const Expense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalExpenses, totalOpeningBalance, remainingAmount, isLoading } = useSelector(
    (state) => state.expense,
  );
  


  const defaultMonth = new Date().getMonth() + 1; // Current Month
  const defaultYear = new Date().getFullYear();

  const [month, setMonth] = useState(parseInt(searchParams.get('month')) || defaultMonth);
  const [year, setYear] = useState(parseInt(searchParams.get('year')) || defaultYear);

  useEffect(() => {
    if (!searchParams.get('month') || !searchParams.get('year')) {
      const updatedParams = new URLSearchParams(searchParams);
      if (!searchParams.get('month')) {
        updatedParams.set('month', defaultMonth);
      }
      if (!searchParams.get('year')) {
        updatedParams.set('year', defaultYear);
      }
      setSearchParams(updatedParams);
    }
  }, [searchParams, setSearchParams, defaultMonth, defaultYear]);
 
  
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllExpenses({ month, year }));
    dispatch(getReports({ month, year }));
  }, [dispatch, month, year]);



  const updateFilters = (newMonth, newYear) => {
    const params = new URLSearchParams();
    params.set('month', newMonth);
    params.set('year', newYear);
    navigate(`?${params.toString()}`); // Update URL without reloading
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    updateFilters(newMonth, year);
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
    updateFilters(month, newYear);
  };


  const { isUpdateAllowed } = usePermissionCheck(CONSTANTS.modules.EXPENSE);

  return (
    <Box p={4} color={'black'}>
      {/* Filters */}
      <Flex justifyContent={'flex-end'} mb={4} gap={2} alignItems={'center'}>
        <Text fontWeight={'600'} fontSize={'20'}>
          Filters:{' '}
        </Text>
        <Select width={48} value={month} onChange={handleMonthChange}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
            </option>
          ))}
        </Select>
        <Select width={48} value={year} onChange={handleYearChange}>
          {[2025, 2024, 2023, 2022].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
      </Flex>

      {/* Summary */}
      <Box
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
        sx={{ boxShadow: '2px -2px 5px 0px rgba(0,0,0,0.75);' }}
        mb={6}
      >
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Summary
        </Text>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Flex justifyContent="space-between">
              <Text>Opening Balance:</Text>
              <Text fontWeight="bold" color={'green.500'}>
                ${totalOpeningBalance || 0}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Total Spent:</Text>
              <Text fontWeight="bold" color={'red.500'}>
                ${totalExpenses || 0}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Remaining Balance:</Text>
              <Text fontWeight="bold" color={remainingAmount < 0 ? 'red.500' : '#ffc658'}>
                ${remainingAmount || 0}
              </Text>
            </Flex>
          </>
        )}
      </Box>

      {/* Tabs */}
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Monthly Summary</Tab>
          <Tab>Expenses</Tab>
          <Tab>Opening Balance</Tab>
          <Tab>Categories</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SummaryTab />
          </TabPanel>
          <TabPanel>
            <ExpensesTab />
          </TabPanel>
          <TabPanel>
            <OpeningBalanceTab />
          </TabPanel>
          <TabPanel>
            <CategoriesTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Expense;
