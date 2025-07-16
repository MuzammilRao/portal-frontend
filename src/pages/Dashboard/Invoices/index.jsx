import React, { useEffect, useState } from 'react';
import usePermissionCheck from '../../../hooks/usePermissionCheck';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '../../../hooks/useToast';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
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
import { Paginate } from 'react-paginate-chakra-ui';
import Modal from '../../../components/Modal/Modal';
import { Edit, RefreshCw, Trash2, View } from 'lucide-react';
import {
  deleteInvoice,
  getOneInvoice,
  getUserInvoices,
  setSingleInvoiceNull,
  updateInvoice,
} from '../../../redux/invoiceSlice';
import CONSTANTS from '../../../utils/constants';

const InvoiceComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleInvoice, invoices, total } = useSelector((state) => state.invoice);
  const { showSuccessToast, showErrorToast } = useToast();

  const [currentId, setCurrentId] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    sort: '',
    limit: 50,
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
    dispatch(getUserInvoices(filters));
    dispatch(setSingleInvoiceNull());
  }, [dispatch, filters]);

  const refresh = () => {
    dispatch(getUserInvoices(filters));
  };

  const handleDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setCurrentId(id);
  };

  const onDeleteConfirm = () => {
    dispatch(deleteInvoice({ id: currentId })).then(() => {
      showSuccessToast('Invoice Deleted');
      setDeleteModalOpen(false);
    });
  };

  const handleEditmodal = (e) => {
    setEditModalOpen(true);
    setCurrentId(e._id);
    dispatch(getOneInvoice({ id: e._id })).then(() => {});
  };

  const onChangeStatus = (e) => {
    let payload = { status: e };
    dispatch(updateInvoice({ id: singleInvoice?._id, payload: payload }))
      .then((response) => {
        showSuccessToast('Invoice Updated Succesfully.');
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        showErrorToast(error?.message);
      });
  };

  const { isCreateAllowed, isReadAllowed, isUpdateAllowed, isDeleteAllowed, user } =
    usePermissionCheck(CONSTANTS.modules.INVOICES);

  return (
    <>
      {isReadAllowed && (
        <VStack spacing="6" align="stretch" p="4">
          <Flex justifyContent="space-between" alignItems="end">
            <DashboardHeading>Invoices</DashboardHeading>
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
                  Add Invoice
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
                <Th color="brand.text">Number</Th>
                <Th color="brand.text">Total Due</Th>
                <Th color="brand.text">Client </Th>
                <Th color="brand.text">clientEmail</Th>
                <Th color="brand.text">Status</Th>
                <Th color="brand.text">Merchant</Th>
                <Th color="brand.text">Brand</Th>

                <Th color="brand.text"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {invoices?.map((e, i) => (
                <Tr key={i} style={{ cursor: 'pointer' }}>
                  <Td>
                    <Text
                      color="brand.primary"
                      textTransform="capitalize"
                    >{`${e?.invoiceNumber}`}</Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary">
                      {e?.currency} {e?.totalDue}
                    </Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary" textTransform={'capitalize'}>
                      {' '}
                      {e?.clientName}{' '}
                    </Text>
                  </Td>

                  <Td>
                    <Text color="brand.primary">{e?.clientEmail}</Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary" textTransform={'capitalize'}>
                      {e?.status}
                    </Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary" textTransform={'capitalize'}>
                      {e?.merchant}
                    </Text>
                  </Td>

                  <Td>
                    <Text color="brand.primary" textTransform={'capitalize'}>
                      {e?.brandName}{' '}
                    </Text>
                  </Td>

                  <Td>
                    <HStack color="brand.primary" gap={2}>
                      {isReadAllowed && <View onClick={() => navigate(`${e._id}`)} size={18} />}
                      {/* {isUpdateAllowed && (
                        <Edit
                          // onClick={() => {
                          //   navigate(`update/${e._id}`);
                          // }}
                          onClick={() => handleEditmodal(e)}
                          size={18}
                        />
                      )} */}
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
            {!!invoices?.length && !!total && (
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

      {editModalOpen && (
        <Modal isOpen={editModalOpen} onRequestClose={() => setEditModalOpen(false)}>
          <Box as="div" mt={5}>
            <Heading as="h3" fontSize={20} color={'#808080'}>
              Update Invoice Status
            </Heading>
            <Flex mt={5} alignItems={'center'} gap={4}>
              {singleInvoice?.status === 'paid' && (
                <Button onClick={() => onChangeStatus('unpaid')} bg={'#750815'} color={'white'}>
                  Mark Unpaid
                </Button>
              )}
              {singleInvoice?.status === 'unpaid' && (
                <Button onClick={() => onChangeStatus('paid')} bg={'brand.primary'} color={'white'}>
                  Mark as Paid
                </Button>
              )}
              <Button bg={'#000'} color={'#fff'} onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
            </Flex>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default InvoiceComponent;
