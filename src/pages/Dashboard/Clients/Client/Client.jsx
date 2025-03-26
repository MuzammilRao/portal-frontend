import React, { useEffect, useState } from 'react';
import CONSTANTS from '../../../../utils/constants';
import usePermissionCheck from '../../../../hooks/usePermissionCheck';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '../../../../hooks/useToast';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import DashboardHeading from '../../../../components/DashboardHeading';
import { Paginate } from 'react-paginate-chakra-ui';
import Modal from '../../../../components/Modal/Modal';
import { Edit, RefreshCw, Trash2, View } from 'lucide-react';
import { getUserClients, setSingleClientNull } from '../../../../redux/clientSlice';
import { deleteClient } from '../../../../redux/clientSlice/actions';

const ClientsComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clients, total } = useSelector((state) => state.client);
  const { showSuccessToast, showErrorToast } = useToast();

  const [currentId, setCurrentId] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    sort: '',
    limit: 10,
    search: '',
  });

  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.key === 'Backspace') {
      setFilters({ ...filters, search: searchInput });
    }
  };

  const handlePageClick = (e) => {
    setFilters({ ...filters, page: e + 1 });
  };

  useEffect(() => {
    dispatch(getUserClients(filters));
    dispatch(setSingleClientNull());
  }, [dispatch, filters]);

  const refresh = () => {
    dispatch(getUserClients(filters));
  };

  const handleDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setCurrentId(id);
  };

  const onDeleteConfirm = () => {
    dispatch(deleteClient({ id: currentId })).then(() => {
      showSuccessToast('Client Deleted');
      setDeleteModalOpen(false);
    });
  };

  const { isCreateAllowed, isReadAllowed, isUpdateAllowed, isDeleteAllowed, user } =
    usePermissionCheck(CONSTANTS.modules.CLIENTS);

  return (
    <>
      {isReadAllowed && (
        <VStack spacing="6" align="stretch" p="4">
          <Flex justifyContent="space-between" alignItems="end">
            <DashboardHeading>Clients</DashboardHeading>
            <Flex gap={4} alignItems={'end'}>
              <Input
                type="text"
                color={'brand.secondary'}
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
              />

              {isCreateAllowed && (
                <Button
                  px={10}
                  onClick={() => navigate('add')}
                  bg="brand.themeOrange"
                  color="brand.text"
                >
                  Add Client
                </Button>
              )}
              <Button onClick={refresh} bg="brand.themeOrange" color="brand.text">
                <RefreshCw />
              </Button>
            </Flex>
          </Flex>

          <Table colorScheme="black" variant="simple" bg="brand.themeGray">
            <Thead>
              <Tr
                borderTopLeftRadius="10px"
                py="10px"
                fontWeight="600"
                fontSize="16px"
                bg="brand.themeOrange"
              >
                <Th color="brand.text">Name</Th>
                <Th color="brand.text">Email</Th>
                <Th color="brand.text">Phone</Th>
                <Th color="brand.text">Brand</Th>

                <Th color="brand.text"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients?.map((e, i) => (
                <Tr key={i} style={{ cursor: 'pointer' }}>
                  <Td>
                    <Text
                      color="brand.primary"
                      textTransform="capitalize"
                    >{`${e?.firstName} ${e?.lastName}`}</Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary">{e?.clientEmail}</Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary"> {e?.phone} </Text>
                  </Td>

                  <Td>
                    <Text color="brand.primary" textTransform={'capitalize'}>
                      {e?.brand?.name}{' '}
                    </Text>
                  </Td>

                  <Td>
                    <HStack color="brand.primary" gap={2}>
                      {isReadAllowed && <View onClick={() => navigate(`${e._id}`)} size={18} />}
                      {isUpdateAllowed && (
                        <Edit
                          onClick={() => {
                            navigate(`update/${e._id}`);
                          }}
                          size={18}
                        />
                      )}
                      {isDeleteAllowed && (
                        <Trash2 size={18} onClick={() => handleDeleteModal(e._id)} />
                      )}
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justifyContent={'flex-end'}>
            {!!clients?.length && !!total && (
              <Box>
                <Flex justifyContent={'center'} alignItems={'center'}>
                  <Text fontSize={12} color="brand.primary">
                    Showing {(filters.page - 1) * filters.limit + 1} -{' '}
                    {total < (filters.page - 1) * filters.limit + filters.limit
                      ? total
                      : (filters.page - 1) * filters.limit + filters.limit}
                    &nbsp; of {total}
                  </Text>
                  <Paginate
                    page={filters.page}
                    count={total}
                    pageSize={filters.limit}
                    onPageChange={handlePageClick}
                    margin={2}
                    // pageCount={Math.ceil(results / filters.limit)}
                    color="brand.primary"
                    fontWeight="600"
                    variant="outline"
                    border="2px solid #F04E23"
                    w="50%"
                  />
                </Flex>
              </Box>
            )}
          </Flex>
        </VStack>
      )}

      {deleteModalOpen && (
        <Modal
          isOpen={deleteModalOpen}
          onRequestClose={() => setDeleteModalOpen(false)}
          heading={'Confirmation'}
        >
          <Box as="div" mt={5}>
            <Text color={'#808080'}>Are you sure you want to delete this Item?</Text>
            <Flex mt={5} alignItems={'center'} gap={4}>
              <Button onClick={onDeleteConfirm} bg={'#750815'} color={'white'}>
                Confirm
              </Button>
              <Button bg={'#000'} color={'#fff'} onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
            </Flex>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ClientsComponent;

// import { useEffect, useState } from 'react';
// import styles from '../../Clients/Client/Client.module.css';
// import { dropDownStyles, flexStyles } from '../../../../utils/globalStyles';
// import threeDots from '../../../../images/threeDots.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { useInvoiceContext } from '../../../../hooks/useInvoiceContext';
// import { api } from '../../../../services/api';
// import { useAuthContext } from '../../../../hooks/useAuthContext';
// import Pagination from '../../../../components/pagination/Pagination';

// const ClientManagement = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentClient, setCurrentClient] = useState();
//   const { user } = useAuthContext();

//   const { dispatch, allClients } = useInvoiceContext();
//   const navigate = useNavigate();

//   const fetchClients = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const { data } = await api.get('/api/v1/admin/client', {
//         headers: {
//           Authorization: `Bearer ${user?.data?.token}`,
//         },
//       });
//       if (data) {
//         dispatch({
//           type: 'GET_ALL_CLIENTS',
//           payload: data?.data,
//         });
//       }
//       setIsLoading(false);
//       setError(null);
//     } catch (error) {
//       setIsLoading(false);

//       setError(error);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//   }, [dispatch]);

//   const handleShowPopup = (id) => {
//     const newClients = allClients?.map((client) => {
//       if (client._id === id) {
//         return { ...client, isSelected: !client.isSelected };
//       } else {
//         return client;
//       }
//     });
//     dispatch({
//       type: 'GET_ALL_CLIENTS',
//       payload: newClients,
//     });
//   };

//   // const handleClient = (client_id) => {
//   //   navigate(`/dashboard/clients/${client_id}`);
//   // };

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <h1>Client Management</h1>
//       </div>
//       <div className={styles.cardContainer}>
//         {isLoading && <h1 className={styles.isLoading}>Loading...</h1>}
//         {error && <div className={styles.error}>{error.message}</div>}
//         {!isLoading && currentClient?.length === 0 && (
//           <p
//             style={{
//               width: '100%',
//               fontSize: '1.7rem',
//               marginTop: '3rem',
//               color: '#0C4767',
//             }}
//           >
//             No Clients!
//           </p>
//         )}

//         {!error && !isLoading && currentClient?.length !== 0 && (
//           <div className={styles.project_dashboard_table}>
//             <table>
//               <thead>
//                 <tr className={styles.table__header}>
//                   <th>Client Name</th>
//                   <th>User</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   {/* <th>Services</th> */}
//                   {/* <th></th> */}
//                 </tr>
//               </thead>

//               <tbody className={styles.gfg}>
//                 {currentClient &&
//                   currentClient?.map((clients, id) => (
//                     <tr key={clients._id} className={styles.table__row}>
//                       <td style={flexStyles}>
//                         <img
//                           style={{ objectFit: 'cover', borderRadius: '50%' }}
//                           src={clients?.image}
//                           alt=""
//                         />
//                         <span>{clients.firstName}</span>
//                       </td>
//                       <td style={{ color: '#fff' }}>{clients?.user?.name}</td>
//                       <td style={{ color: '#23EA6B' }}>{clients?.clientEmail}</td>
//                       <td>{clients.phone ?? '-'}</td>
//                       {/* <td>
//                         <Link style={linkStyles}>View</Link>
//                         <Link style={{ ...linkStyles, marginLeft: '10px' }}>Add</Link>
//                       </td> */}
//                       {/* <td>
//                         <img
//                           src={threeDots}
//                           alt=""
//                           style={{
//                             cursor: 'pointer',
//                             width: '25px',
//                             objectFit: 'contain',
//                           }}
//                           // onClick={() => handleShowPopup(clients._id)}
//                         />
//                         {clients?.isSelected && (
//                           <div className={styles.popup1} style={dropDownStyles}>
//                        <div onClick={() => handleClient(clients._id)}>
//                               Delete
//                             </div>
//                             <div>
//                               <Link
//                                 to="/dashboard/updateClients"
//                                 className={styles.popup__text}
//                                 state={{ client: clients }}
//                               >
//                                 View
//                               </Link>
//                             </div>
//                           </div>
//                         )}
//                       </td> */}
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//       <Pagination invsPerPage={12} allInvoices={allClients} setCurrentInvoices={setCurrentClient} />
//     </div>
//   );
// };

// export default ClientManagement;

// import React, { useEffect, useState } from 'react';
// import styles from './Client.module.css';
// import hamburger from '../../../../images/hamburger.png';
// import dashboardIcon from '../../../../images/dashboardIcon.png';
// import threeDots from '../../../../images/threeDots.png';
// import phone from '../../../../images/phone.png';
// import email from '../../../../images/email.png';
// import date from '../../../../images/date.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { useInvoiceContext } from '../../../../hooks/useInvoiceContext';
// import { api } from '../../../../services/api';
// import { useAuthContext } from '../../../../hooks/useAuthContext';
// import { ToastContainer } from 'react-toastify';
// import Pagination from '../../../../components/pagination/Pagination';

// import { Button, Heading } from '@chakra-ui/react';

// const Client = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [tableView, setTableView] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentClient, setCurrentClient] = useState();
//   const { user } = useAuthContext();

//   const { dispatch, allClients } = useInvoiceContext();
//   const navigate = useNavigate();

//   const fetchClients = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const { data } = await api.get('/api/v1/clients', {
//         headers: {
//           Authorization: `Bearer ${user?.data?.token}`,
//         },
//       });
//       if (data) {
//         dispatch({
//           type: 'GET_ALL_CLIENTS',
//           payload: data?.data,
//         });
//       }
//       setIsLoading(false);
//       setError(null);
//     } catch (error) {
//       setIsLoading(false);

//       setError(error);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//   }, [dispatch]);

//   const handleShowPopup = (id) => {
//     const newClients = allClients?.map((client) => {
//       if (client._id === id) {
//         return { ...client, isSelected: !client.isSelected };
//       } else {
//         return client;
//       }
//     });
//     dispatch({
//       type: 'GET_ALL_CLIENTS',
//       payload: newClients,
//     });
//   };

//   const handleClient = (client_id) => {
//     localStorage.setItem('client_id', client_id);
//     navigate(`/dashboard/clients/${client_id}`);
//   };

//   const handleTableRowNavigate = (clients) => {
//     navigate('/dashboard/clientsettings', {
//       state: { client: clients },
//     });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <Heading as="h2" size="xl" color="brand.primary">
//           Clients
//         </Heading>
//         <div className={styles.icon}>
//           <div>
//             <Button
//               onClick={() => navigate('/dashboard/createClients')}
//               colorScheme="brand.secondary"
//             >
//               Add Client
//             </Button>
//           </div>
//           <div onClick={() => setTableView(true)}>
//             <img src={hamburger} alt="" />
//           </div>
//           <div onClick={() => setTableView(false)}>
//             <img src={dashboardIcon} alt="" />
//           </div>
//         </div>
//       </div>

//       <div className={styles.cardContainer}>
//         {isLoading && <h1 className={styles.isLoading}>Loading...</h1>}
//         {error && <div className={styles.error}>{error.message}</div>}
//         {!isLoading && currentClient?.length === 0 && (
//           <p
//             style={{
//               width: '100%',
//               fontSize: '1.7rem',
//               marginTop: '3rem',
//               color: '#0C4767',
//             }}
//           >
//             No Clients Yet! Please Add One.
//           </p>
//         )}
//         {!tableView &&
//           !isLoading &&
//           currentClient?.map((clients) => {
//             return (
//               <div className={styles.card} key={clients._id}>
//                 <div className={styles.profile}>
//                   <Link
//                     style={{ textDecoration: 'none', width: '95%' }}
//                     to="/dashboard/clientsettings"
//                     state={{ client: clients }}
//                   >
//                     <div>
//                       <img style={{ objectFit: 'cover' }} src={clients?.image} alt="" />
//                       <div className={styles.clientName}>
//                         <span>{clients.firstName + ' ' + clients.lastName}</span>
//                       </div>
//                     </div>
//                   </Link>
//                   <img
//                     src={threeDots}
//                     alt=""
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => handleShowPopup(clients._id)}
//                   />
//                 </div>
//                 <Link
//                   style={{ textDecoration: 'none' }}
//                   to="/dashboard/clientsettings"
//                   state={{ client: clients }}
//                 >
//                   <div className={styles.paymentAndDate}>
//                     <div className={styles.left}>
//                       <span>Contact</span>
//                       <div className={styles.phone}>
//                         <img src={phone} alt="" />
//                         <span>+{clients.phone}</span>
//                       </div>
//                       <div className={styles.phone}>
//                         <img src={email} alt="" />
//                         <span>{clients.clientEmail}</span>
//                       </div>
//                     </div>

//                     <div className={styles.right}>
//                       <span>Business Name</span>
//                       <div className={styles.phone}>
//                         <img src={date} alt="" />
//                         <span>{clients.businessName}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>

//                 {clients.isSelected && (
//                   <div className={styles.popup}>
//                     <div onClick={() => handleClient(clients._id)}>view details</div>
//                     <div>
//                       <Link
//                         to="/dashboard/updateClients"
//                         className={styles.popup__text}
//                         state={{ client: clients }}
//                       >
//                         Update
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//         {tableView && !error && !isLoading && currentClient?.length !== 0 && (
//           <div className={styles.project_dashboard_table}>
//             <table>
//               <thead>
//                 <tr className={styles.table__header}>
//                   <th></th>
//                   <th>Client</th>
//                   <th>Contact</th>
//                   <th>Email</th>
//                   <th>Business </th>
//                   <th> </th>
//                 </tr>
//               </thead>

//               <tbody className={styles.gfg}>
//                 {currentClient &&
//                   currentClient?.map((clients, id) => (
//                     <tr key={clients._id} className={styles.table__row}>
//                       <td onClick={() => handleTableRowNavigate(clients)}>
//                         <img
//                           style={{ objectFit: 'cover', borderRadius: '50%' }}
//                           src={clients?.image}
//                           alt=""
//                         />
//                       </td>
//                       <td
//                         style={{ color: '#6BDB65' }}
//                         onClick={() => handleTableRowNavigate(clients)}
//                       >
//                         {clients.firstName + ' ' + clients.lastName}
//                       </td>
//                       <td
//                         style={{ textTransform: 'capitalize' }}
//                         onClick={() => handleTableRowNavigate(clients)}
//                       >
//                         +{clients.phone}
//                       </td>
//                       <td onClick={() => handleTableRowNavigate(clients)}>{clients.clientEmail}</td>
//                       <td onClick={() => handleTableRowNavigate(clients)}>
//                         {clients.businessName}
//                       </td>
//                       <td>
//                         {' '}
//                         <img
//                           src={threeDots}
//                           alt=""
//                           style={{
//                             cursor: 'pointer',
//                             width: '25px',
//                             objectFit: 'contain',
//                           }}
//                           onClick={() => handleShowPopup(clients._id)}
//                         />
//                         {clients.isSelected && (
//                           <div
//                             className={styles.popup1}
//                             style={{
//                               zIndex: '999',
//                               position: 'absolute',
//                               color: 'grey',
//                               right: '20px',
//                               backgroundColor: '#ffffff',
//                               display: 'flex',
//                               flexDirection: 'column',
//                               justifyContent: 'center',
//                               boxShadow: '0px 1px 5px -1px rgba(0, 0, 0, 0.75)',
//                               borderRadius: '8px',
//                               width: '120px',
//                               padding: '5px 0',
//                             }}
//                           >
//                             <div onClick={() => handleClient(clients._id)}>view details</div>
//                             <div>
//                               <Link
//                                 to="/dashboard/updateClients"
//                                 className={styles.popup__text}
//                                 style={{ color: 'gray !important' }}
//                                 state={{ client: clients }}
//                               >
//                                 Update
//                               </Link>
//                             </div>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//       <Pagination invsPerPage={12} allInvoices={allClients} setCurrentInvoices={setCurrentClient} />
//       <ToastContainer />
//     </div>
//   );
// };

// export default Client;
