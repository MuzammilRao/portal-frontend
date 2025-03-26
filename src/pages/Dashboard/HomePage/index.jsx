import React, { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  VStack,
  Divider,
  Flex,
  Select,
  HStack,
  Input,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardReports } from '../../../redux/dashboardSlice';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.reports);

  // State for custom date range and filter
  const [filter, setFilter] = useState('this_year');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  useEffect(() => {
    const params = { filter };
    if (filter === 'custom' && customStartDate && customEndDate) {
      params.startDate = customStartDate;
      params.endDate = customEndDate;
    }
    dispatch(getDashboardReports(params));
  }, [dispatch, filter, customStartDate, customEndDate]);

  // Chart data
  const chartData = [
    { name: 'Total Invoice Amount', value: parseFloat(data?.totalInvoiceAmount), color: '#F04E23' },
    { name: 'Paid', value: parseFloat(data?.totalPaidInvoiceAmount), color: '#38A169' },
    { name: 'Unpaid', value: parseFloat(data?.totalUnpaidInvoiceAmount), color: '#333333' },
  ];

  // Check if all values are zero
  const isAllZero = chartData.every((item) => item.value === 0);

  // Add a default segment if all data values are zero
  const pieData = isAllZero
    ? [{ name: 'No Data', value: 1, color: '#d3d3d3' }] // Gray color for empty circle
    : chartData;

  return (
    <VStack spacing={8} p={6}>
      <Flex w={'100%'} justifyContent={'space-between'}>
        <Heading color={'brand.primary'} as="h1" size="lg" width="100%">
          Dashboard Overview
        </Heading>
        <Box>
          <HStack spacing={4} mb={6} width="100%">
            <Select
              width={{ base: '100%', md: '200px' }}
              placeholder="Select Date Filter"
              color={'brand.primary'}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="this_year">This Year</option>
              <option value="custom">Custom</option>
            </Select>
          </HStack>

          {/* Custom Date Range Inputs */}
          {filter === 'custom' && (
            <HStack spacing={4} mb={6}>
              <Input
                color={'brand.primary'}
                type="date"
                placeholder="Start Date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
              />
              <Input
                color={'brand.primary'}
                type="date"
                placeholder="End Date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
              />
              <Button
                onClick={() => {
                  if (customStartDate && customEndDate) {
                    dispatch(
                      getDashboardReports({
                        filter: 'custom',
                        startDate: customStartDate,
                        endDate: customEndDate,
                      }),
                    );
                  }
                }}
              >
                Apply
              </Button>
            </HStack>
          )}
        </Box>
      </Flex>

      {/* Top section with Pie Chart on the right */}
      <Flex
        width="100%"
        justify="space-between"
        align="flex-start"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Flex
          width={'50%'}
          height={'auto'}
          wrap="wrap"
          gap={6} // Adds spacing between each item
          // width="100%" // Full width for responsive behavior
        >
          <StatCard label="Total Clients" value={data?.totalClientsAdded} />
          <StatCard label="Total Invoices" value={data?.totalInvoices} />
          <StatCard label="Paid Invoices" value={data?.invoiceStatusSummary.paid} />
          <StatCard label="Unpaid Invoices" value={data?.invoiceStatusSummary.unpaid} />
          <StatCard label="Overdue Invoices" value={data?.overdueInvoices} />
        </Flex>

        <Box
          width={{ base: '100%', lg: '50%' }}
          height="350px"
          ml={{ base: 0, lg: 8 }}
          mt={{ base: 8, lg: 0 }}
        >
          <Heading as="h2" textAlign={'center'} color={'brand.primary'} size="md" mb={4}>
            Invoice Amount Breakdown
          </Heading>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={80} // Increased inner radius
                outerRadius={130} // Increased outer radius
                fill="#8884d8"
                label={({ name, value }) => (isAllZero ? '' : `${name}: $${value.toFixed(2)}`)}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => (isAllZero ? '' : `$${value.toFixed(2)}`)} />
              <Legend verticalAlign="bottom" height={26} margin={10} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Flex>

      <Divider />

      <Box width="100%" height="400px">
        <Heading as="h2" color={'brand.primary'} size="md" mb={4}>
          Monthly Sales
        </Heading>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Bar dataKey="sales" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Divider />

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} width="100%">
        <StatCard label="Average Invoice Amount" value={`$${data?.averageInvoiceAmount}`} />
        <StatCard label="Total Tax Collected" value={`$${data?.totalTaxCollected}`} />
        <StatCard label="Total Revenue Collected" value={`$${data?.totalRevenueCollected}`} />
      </SimpleGrid>
    </VStack>
  );
};

// Helper component to render each statistic card
const StatCard = ({ label, value }) => (
  <Stat
    p={4}
    border="1px"
    borderColor="gray.200"
    borderRadius="md"
    color={'brand.primary'}
    shadow="md"
    minW={266}
    width={266}
    height={160}
    overflow={'hidden'}
  >
    <StatLabel fontSize={'30'}>{label}</StatLabel>
    <StatNumber color={'brand.themeOrange'} fontWeight={'bold'} fontSize={'40'}>
      {value}
    </StatNumber>
  </Stat>
);

export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   SimpleGrid,
//   Stat,
//   StatLabel,
//   StatNumber,
//   Heading,
//   VStack,
//   Divider,
//   Flex,
//   Select,
//   HStack,
//   Input,
//   Button,
// } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDashboardReports } from '../../../redux/dashboardSlice';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Bar,
// } from 'recharts';

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.dashboard.reports);

//   // State for custom date range and filter
//   const [filter, setFilter] = useState('this_year');
//   const [customStartDate, setCustomStartDate] = useState('');
//   const [customEndDate, setCustomEndDate] = useState('');

//   useEffect(() => {
//     const params = { filter };
//     if (filter === 'custom' && customStartDate && customEndDate) {
//       params.startDate = customStartDate;
//       params.endDate = customEndDate;
//     }
//     dispatch(getDashboardReports(params));
//   }, [dispatch, filter, customStartDate, customEndDate]);

//   // Chart data
//   const chartData = [
//     { name: 'Total Invoice Amount', value: parseFloat(data?.totalInvoiceAmount), color: '#F04E23' },
//     { name: 'Paid', value: parseFloat(data?.totalPaidInvoiceAmount), color: '#38A169' },
//     { name: 'Unpaid', value: parseFloat(data?.totalUnpaidInvoiceAmount), color: '#333333' },
//   ];

//   // Check if all values are zero
//   const isAllZero = chartData.every((item) => item.value === 0);

//   // Add a default segment if all data values are zero
//   const pieData = isAllZero
//     ? [{ name: 'No Data', value: 1, color: '#d3d3d3' }] // Gray color for empty circle
//     : chartData;

//   return (
//     <VStack spacing={8} p={6}>
//       <Flex w={'100%'} justifyContent={'space-between'}>
//         <Heading color={'brand.primary'} as="h1" size="lg" width="100%">
//           Dashboard Overview
//         </Heading>
//         <Box>
//           <HStack spacing={4} mb={6} width="100%">
//             <Select
//               width={{ base: '100%', md: '200px' }}
//               placeholder="Select Date Filter"
//               color={'brand.primary'}
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             >
//               <option value="today">Today</option>
//               <option value="this_week">This Week</option>
//               <option value="this_month">This Month</option>
//               <option value="this_year">This Year</option>
//               <option value="custom">Custom</option>
//             </Select>
//           </HStack>

//           {/* Custom Date Range Inputs */}
//           {filter === 'custom' && (
//             <HStack spacing={4} mb={6}>
//               <Input
//                 color={'brand.primary'}
//                 type="date"
//                 placeholder="Start Date"
//                 value={customStartDate}
//                 onChange={(e) => setCustomStartDate(e.target.value)}
//               />
//               <Input
//                 color={'brand.primary'}
//                 type="date"
//                 placeholder="End Date"
//                 value={customEndDate}
//                 onChange={(e) => setCustomEndDate(e.target.value)}
//               />
//               <Button
//                 onClick={() => {
//                   if (customStartDate && customEndDate) {
//                     dispatch(
//                       getDashboardReports({
//                         filter: 'custom',
//                         startDate: customStartDate,
//                         endDate: customEndDate,
//                       }),
//                     );
//                   }
//                 }}
//               >
//                 Apply
//               </Button>
//             </HStack>
//           )}
//         </Box>
//       </Flex>

//       {/* Top section with Pie Chart on the right */}
//       <Flex
//         width="100%"
//         justify="space-between"
//         align="flex-start"
//         flexDirection={{ base: 'column', lg: 'row' }}
//       >
//         <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} width={{ base: '100%', lg: '60%' }}>
//           <StatCard label="Total Clients Added" value={data?.totalClientsAdded} />
//           <StatCard label="Total Invoices" value={data?.totalInvoices} />
//           <StatCard label="Overdue Invoices" value={data?.overdueInvoices} />
//           <StatCard label="Paid Invoices" value={data?.invoiceStatusSummary.paid} />
//           <StatCard label="Unpaid Invoices" value={data?.invoiceStatusSummary.unpaid} />
//         </SimpleGrid>

//         <Box
//           width={{ base: '100%', lg: '35%' }}
//           height="300px"
//           ml={{ base: 0, lg: 8 }}
//           mt={{ base: 8, lg: 0 }}
//         >
//           <Heading as="h2" size="md" mb={4}>
//             Invoice Amount Breakdown
//           </Heading>
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={chartData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
//               >
//                 {chartData?.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
//               <Legend verticalAlign="bottom" height={36} />
//             </PieChart>
//           </ResponsiveContainer>
//         </Box>
//       </Flex>

//       <Divider />

//       <Box width="100%" height="400px">
//         <Heading as="h2" color={'brand.primary'} size="md" mb={4}>
//           Monthly Sales
//         </Heading>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={data?.monthlySales}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
//             <Bar dataKey="sales" fill="#3182CE" />
//           </BarChart>
//         </ResponsiveContainer>
//       </Box>
//       <Divider />

//       <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} width="100%">
//         <StatCard label="Average Invoice Amount" value={`$${data?.averageInvoiceAmount}`} />
//         <StatCard label="Total Tax Collected" value={`$${data?.totalTaxCollected}`} />
//         <StatCard label="Total Revenue Collected" value={`$${data?.totalRevenueCollected}`} />
//       </SimpleGrid>
//     </VStack>
//   );
// };

// // Helper component to render each statistic card
// const StatCard = ({ label, value }) => (
//   <Stat
//     p={4}
//     border="1px"
//     borderColor="gray.200"
//     borderRadius="md"
//     color={'brand.primary'}
//     shadow="md"
//   >
//     <StatLabel>{label}</StatLabel>
//     <StatNumber>{value}</StatNumber>
//   </Stat>
// );

// export default Dashboard;
