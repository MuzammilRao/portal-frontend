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
import { deleteProject, getUserProjects, setSingleProjectNull } from '../../../redux/projectSlice';

const ProjectsComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects, total } = useSelector((state) => state.project);
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
    dispatch(getUserProjects(filters));
    dispatch(setSingleProjectNull());
  }, [dispatch, filters]);

  const refresh = () => {
    dispatch(getUserProjects(filters));
  };

  const handleDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setCurrentId(id);
  };

  const onDeleteConfirm = () => {
    dispatch(deleteProject({ id: currentId })).then(() => {
      showSuccessToast('Project Deleted');
      setDeleteModalOpen(false);
    });
  };

  const { isCreateAllowed, isReadAllowed, isUpdateAllowed, isDeleteAllowed, user } =
    usePermissionCheck(CONSTANTS.modules.PROJECTS);
  return (
    <>
      {isReadAllowed && (
        <VStack spacing="6" align="stretch" p="4">
          <Flex justifyContent="space-between" alignItems="end">
            <DashboardHeading>Projects</DashboardHeading>
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
                  px={5}
                  onClick={() => navigate('add')}
                  bg="brand.secondary"
                  color="brand.text"
                >
                  Add Project
                </Button>
              )}
              <Button onClick={refresh} bg="brand.secondary" color="brand.text">
                <RefreshCw />
              </Button>
            </Flex>
          </Flex>

          <Table colorScheme="blue" variant="simple" bg="brand.primary">
            <Thead>
              <Tr
                borderTopLeftRadius="10px"
                py="10px"
                fontWeight="600"
                fontSize="16px"
                bg="brand.secondary"
              >
                <Th color="brand.text">Name</Th>
                <Th color="brand.text">Client</Th>
                <Th color="brand.text">Client's Email</Th>
                <Th color="brand.text">Budgt</Th>
                <Th color="brand.text">Status</Th>
                <Th color="brand.text">Total Invoices</Th>

                <Th color="brand.text"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {!!projects?.length > 0 &&
                projects?.map((e, i) => (
                  <Tr key={i} style={{ cursor: 'pointer' }}>
                    <Td>
                      <Text textTransform="capitalize">{e?.projectName}</Text>
                    </Td>
                    <Td>
                      <Text>{e?.client?.firstName}</Text>
                    </Td>
                    <Td>
                      <Text> {e?.client?.clientEmail} </Text>
                    </Td>
                    <Td>
                      <Text>{e?.projectBudget} </Text>
                    </Td>

                    <Td>
                      <Text>{e?.isCompleted} </Text>
                    </Td>

                    <Td>
                      <Text>{e?.invoice?.length ?? '0'}</Text>
                    </Td>
                    <Td>
                      <HStack gap={2}>
                        {isReadAllowed && <View onClick={() => navigate(`${e._id}`)} size={18} />}
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

export default ProjectsComponent;
