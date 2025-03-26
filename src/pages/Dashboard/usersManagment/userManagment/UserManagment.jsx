import { useEffect, useState } from 'react';
import styles from '../../Clients/Client/Client.module.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../../components/Modal/Modal';
import useToast from '../../../../hooks/useToast';
import {
  Button,
  Flex,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Box,
  Input,
} from '@chakra-ui/react';
import { Edit, RefreshCw, Trash2, View } from 'lucide-react';
import DashboardHeading from '../../../../components/DashboardHeading';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, inviteUser } from '../../../../redux/userSlice';
import { Paginate } from 'react-paginate-chakra-ui';
import usePermissionCheck from '../../../../hooks/usePermissionCheck';
import CONSTANTS from '../../../../utils/constants';

const UserManagment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isCreateAllowed, isReadAllowed, isUpdateAllowed, isDeleteAllowed, isHead } =
    usePermissionCheck(CONSTANTS.modules.ADMIN_USER);

  const { users, total } = useSelector((state) => state.user);
  const { showSuccessToast, showErrorToast } = useToast();
  const [email, setEmail] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const [InvitationModalOpen, setInvitationModalOpen] = useState(false);
  const [userDeleteModalOpen, setUserDeleteModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    sort: '',
    limit: 10,
    search: '',
  });

  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.key === 'Backspace') {
      console.log(event.key);
      setFilters({ ...filters, search: searchInput });
    }
  };

  const handlePageClick = (e) => {
    setFilters({ ...filters, page: e + 1 });
  };

  useEffect(() => {
    dispatch(getAllUsers(filters));
  }, [dispatch, filters]);

  const refresh = () => {
    dispatch(getAllUsers(filters));
  };

  const closeInvitationModal = () => {
    setInvitationModalOpen(false);
  };

  const openInvitationModal = () => {
    setInvitationModalOpen(true);
  };

  const handleInvitaionSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      return showErrorToast('Please enter email.');
    }

    dispatch(inviteUser({ payload: { email } }))
      .then((action) => {
        if (inviteUser.fulfilled.match(action)) {
          if (action.payload) {
            showSuccessToast('Invitation Sent Succesfully.');
            navigate(-1);
            return;
          } else {
            showErrorToast('Failed to Invite User.');
          }
        } else {
          showErrorToast('Failed to Invite!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        showErrorToast(error?.message);
      });
  };

  const handleUserDeleteModal = (id) => {
    setUserDeleteModalOpen(true);
    setSelectedUserId(id);
  };

  const onDeleteConfirm = () => {
    dispatch(deleteUser({ id: selectedUserId })).then(() => {
      showSuccessToast('User Deleted');
      setUserDeleteModalOpen(false);
    });
  };

  return (
    <>
      {isReadAllowed && (
        <VStack spacing="6" align="stretch" p="4">
          <Flex justifyContent="space-between" alignItems="end">
            <DashboardHeading>Users</DashboardHeading>
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
                <Button onClick={openInvitationModal} bg="brand.themeOrange" color="brand.text">
                  Invite
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
                <Th color="brand.text">Pseudo</Th>
                <Th color="brand.text">Email</Th>
                <Th color="brand.text">US Number</Th>
                <Th color="brand.text">PK Number</Th>
                <Th color="brand.text">Role</Th>
                <Th color="brand.text">Status</Th>
                <Th color="brand.text"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((user) => (
                <Tr key={user._id} style={{ cursor: 'pointer' }}>
                  <Td>
                    <Text color="brand.primary" textTransform="capitalize">
                      {user?.name}
                    </Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary">{user?.pseudo}</Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary"> {user?.email} </Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary">{user?.usNumber} </Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary">{user?.pkNumber}</Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary">{user?.role?.name}</Text>
                  </Td>
                  <Td>
                    <Text color="brand.primary">{user?.active ? 'Approved' : 'Not Approved'}</Text>
                  </Td>
                  <Td>
                    <HStack color="brand.primary" gap={2}>
                      {isReadAllowed && <View onClick={() => navigate(`${user._id}`)} size={18} />}
                      {isUpdateAllowed && (
                        <Edit onClick={() => navigate(`${user._id}`)} size={18} />
                      )}
                      {isDeleteAllowed && (
                        <Trash2 size={18} onClick={() => handleUserDeleteModal(user._id)} />
                      )}
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justifyContent={'flex-end'}>
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
          </Flex>
        </VStack>
      )}
      {InvitationModalOpen && (
        <Modal isOpen={InvitationModalOpen} onRequestClose={closeInvitationModal}>
          <h2 className={styles.modalTitle}>Send Signup Invitation Link.</h2>
          <form className={styles.modal_form} onSubmit={handleInvitaionSubmit}>
            <input
              type="email"
              placeholder="Enter users email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button>Send</button>
          </form>
        </Modal>
      )}
      {userDeleteModalOpen && (
        <Modal
          isOpen={userDeleteModalOpen}
          onRequestClose={() => setUserDeleteModalOpen(false)}
          heading={'Confirmation'}
        >
          <Box as="div" mt={5}>
            <Text>Are you sure you want to delete this user?</Text>
            <Flex mt={5} alignItems={'center'} gap={4}>
              <Button onClick={onDeleteConfirm} bg={'#750815'} color={'white'}>
                Confirm
              </Button>
              <Button bg={'#000'} color={'#fff'} onClick={() => setUserDeleteModalOpen(false)}>
                Cancel
              </Button>
            </Flex>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default UserManagment;
