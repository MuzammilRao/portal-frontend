// import styles from '../Clients/Client/Client.module.css';
// import threeDots from '../../../images/threeDots.png';
// import SettingsIcon from '../../../images/setting-normal.png';
// import { useEffect, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useInvoiceContext } from '../../../hooks/useInvoiceContext';
// import { dotIconStyles, dropDownStyles } from '../../../utils/globalStyles';
// import useApi from '../../../hooks/useApi';
// import useToast from '../../../hooks/useToast';

// const BrandManagement = () => {
//   const { showSuccessToast } = useToast();
//   const { apiCall } = useApi();
//   const navigate = useNavigate();
//   const { dispatch, brands } = useInvoiceContext();

//   const fetchItems = useCallback(
//     async (url, dispatchType) => {
//       try {
//         const data = await apiCall(url);
//         if (data) {
//           dispatch({
//             type: dispatchType,
//             payload: data?.data,
//           });
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     [dispatch],
//   );

//   useEffect(() => {
//     fetchItems('/api/v1/admin/brand', 'GET_BRANDS');
//   }, [fetchItems]);

//   const handleShowPopup = (id) => {
//     const _brands = brands?.map((brand) => {
//       if (brand._id === id) {
//         return { ...brand, isSelected: !brand.isSelected };
//       } else {
//         return brand;
//       }
//     });
//     dispatch({
//       type: 'GET_BRANDS',
//       payload: _brands,
//     });
//   };

//   const deleteBrand = async (id) => {
//     try {
//       await apiCall(`/api/v1/admin/brand/${id}`, 'delete');
//       dispatch({
//         type: 'DELETE_BRAND',
//         payload: id,
//       });
//       showSuccessToast('Brand deleted successfully!');
//     } catch (error) {
//       console.log('Delete_Error', error);
//     }
//   };

//   return (
//     <section className={styles.container}>
//       <div className={styles.top}>
//         <h1 style={{ fontSize: '2rem' }}>Brand Management</h1>
//         <div className={styles.icon}>
//           <div>
//             <button
//               variant="outlined"
//               onClick={() => navigate('/dashboard/brand-managment/create')}
//             >
//               + Create Brand
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className={styles.project_dashboard_table}>
//         <table>
//           <thead>
//             <tr className={styles.table__header}>
//               <th>Logo</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Address</th>
//               <th>
//                 <img src={SettingsIcon} alt="SettingsIcon" />
//               </th>
//             </tr>
//           </thead>

//           <tbody className={styles.gfg}>
//             {brands?.map((brand) => (
//               <tr key={brand._id} className={styles.table__row}>
//                 <td style={{ display: 'flex', justifyContent: 'center' }}>
//                   <img src={brand?.logo} alt="brand-logo" />
//                 </td>
//                 <td>{brand?.name}</td>
//                 <td>{brand?.email}</td>
//                 <td>{brand?.address}</td>

//                 <td>
//                   <img
//                     src={threeDots}
//                     alt=""
//                     style={dotIconStyles}
//                     onClick={() => handleShowPopup(brand._id)}
//                   />

//                   {brand.isSelected && (
//                     <div className={styles.popup1} style={dropDownStyles}>
//                       <div onClick={() => deleteBrand(brand._id)}>Delete</div>
//                       <div>
//                         <Link
//                           to={`/dashboard/brand-managment/${brand._id}`}
//                           className={styles.popup__text}
//                         >
//                           Update
//                         </Link>
//                       </div>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

// export default BrandManagement;

import React, { useEffect, useState } from 'react';
import CONSTANTS from '../../../utils/constants';
import usePermissionCheck from '../../../hooks/usePermissionCheck';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '../../../hooks/useToast';
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
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
import DashboardHeading from '../../../components/DashboardHeading';
import { deleteBrand, getAllBrands, setSingleBrandNull } from '../../../redux/brandSlice';
import { Paginate } from 'react-paginate-chakra-ui';
import Modal from '../../../components/Modal/Modal';
import { Edit, RefreshCw, Trash2, View } from 'lucide-react';

const Leads = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { brands, total } = useSelector((state) => state.brand);
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
    dispatch(getAllBrands(filters));
    dispatch(setSingleBrandNull());
  }, [dispatch, filters]);

  const refresh = () => {
    dispatch(getAllBrands(filters));
  };

  const handleDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setCurrentId(id);
  };

  const onDeleteConfirm = () => {
    dispatch(deleteBrand({ id: currentId })).then(() => {
      showSuccessToast('Brand Deleted');
      setDeleteModalOpen(false);
    });
  };

  const { isCreateAllowed, isReadAllowed, isUpdateAllowed, isDeleteAllowed, user } =
    usePermissionCheck(CONSTANTS.modules.ADMIN_BRANDS);

  return (
    <>
      {isReadAllowed && (
        <VStack spacing="6" align="stretch" p="4">
          <Flex justifyContent="space-between" alignItems="end">
            <DashboardHeading>Brands</DashboardHeading>
            <Flex gap={4} alignItems={'end'}>
              <Input
                type="text"
                color={'brand.secondary'}
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
              />

              {(isCreateAllowed ||
                user?.roles?.name === 'admin' ||
                user?.roles?.name === 'marketing') && (
                <Button
                  px={10}
                  onClick={() => navigate('add')}
                  bg="brand.themeOrange"
                  color="brand.text"
                >
                  Add Brand
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
                <Th color="brand.text">Logo</Th>
                <Th color="brand.text">Name</Th>
                <Th color="brand.text">URL</Th>
                <Th color="brand.text">Address</Th>
                <Th color="brand.text"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {brands?.map((e, i) => (
                <Tr h={20} key={i} style={{ cursor: 'pointer' }}>
                  <Td>
                    <Image w={16} h={16} objectFit={'contain'} src={e?.logo} />
                  </Td>
                  <Td>
                    <Text color="brand.primary">{e?.name}</Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary"> {e?.email} </Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary">{e?.address} </Text>
                  </Td>

                  <Td>
                    <HStack color="brand.primary" gap={2}>
                      {/* {isReadAllowed && <View onClick={() => navigate(`${e._id}`)} size={18} />} */}
                      {isUpdateAllowed && (
                        <Edit onClick={() => navigate(`update/${e._id}`)} size={18} />
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
            {!!brands.length && !!total && (
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

export default Leads;
