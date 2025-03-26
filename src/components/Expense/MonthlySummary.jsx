import React, { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Box } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlySummary } from '../../redux/expenseSlice';
import { useLocation } from 'react-router-dom';

const SummaryTab = () => {
  const dispatch = useDispatch();
  const { summaryData, isLoading } = useSelector((state) => state.expense);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const yearParam = parseInt(params.get('year')) || new Date().getFullYear();
  //   const [year, setYear] = useState(yearParam ? parseInt(yearParam) : new Date().getFullYear());

  useEffect(() => {
    dispatch(getMonthlySummary({ year: yearParam }));
  }, [dispatch, yearParam]);
  useEffect(() => {
    dispatch(getMonthlySummary({ year: yearParam }));
  }, [dispatch]);

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalOpeningBalance" fill="#4f8c55" name="Opening Balance" />
            <Bar dataKey="totalExpenses" fill="#ff3c13" name="Total Expenses" />
            <Bar dataKey="remainingAmount" fill="#ffc658" name="Remaining Amount" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default SummaryTab;
