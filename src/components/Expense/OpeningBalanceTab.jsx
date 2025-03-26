import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOpeningBalance,
  getOpeningBalance,
  getReports,
  deleteOpeningBalance,
} from '../../redux/expenseSlice';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const OpeningBalanceTab = () => {
  const addDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useAuthContext();

  const params = new URLSearchParams(location.search);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const month = parseInt(params.get('month')) || currentMonth;
  const year = parseInt(params.get('year')) || currentYear;

  const { allOpeningBalances, isLoading } = useSelector((state) => state.expense);
  const [openingBalanceForm, setOpeningBalanceForm] = useState({ amount: '', note: '' });
  const [selectedBalanceId, setSelectedBalanceId] = useState(null);

  // console.log(user);

  useEffect(() => {
    dispatch(getOpeningBalance({ month, year }));
  }, [dispatch, month, year]);

  const handleOpeningBalanceSubmit = async () => {
    await dispatch(setOpeningBalance({ payload: openingBalanceForm }));
    setOpeningBalanceForm({ amount: '' });
    await dispatch(getOpeningBalance({ month, year }));
    await dispatch(getReports({ month, year }));
    addDisclosure.onClose();
  };

  const handleDeleteBalance = async () => {
    await dispatch(deleteOpeningBalance({ id: selectedBalanceId }));
    await dispatch(getOpeningBalance({ month, year }));
    await dispatch(getReports({ month, year }));
    deleteDisclosure.onClose();
    setSelectedBalanceId(null);
  };

  return (
    <>
      <Button colorScheme="orange" onClick={addDisclosure.onOpen} mb={4}>
        Add Opening Balance
      </Button>

      {isLoading ? (
        <Spinner />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Note</Th>
              <Th>Amount</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allOpeningBalances.map((balance) => (
              <Tr key={balance._id}>
                <Td>{new Date(balance.createdAt).toLocaleDateString()}</Td>
                <Td>{balance.note}</Td>
                <Td>${balance.totalOpeningBalance}</Td>
                <Td>
                  {user?.data?.role === 'super-admin' && (
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => {
                        setSelectedBalanceId(balance._id);
                        deleteDisclosure.onOpen();
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Add Opening Balance Modal */}
      <Modal isOpen={addDisclosure.isOpen} onClose={addDisclosure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Opening Balance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                value={openingBalanceForm.amount}
                onChange={(e) =>
                  setOpeningBalanceForm({ ...openingBalanceForm, amount: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Note</FormLabel>
              <Input
                type="text"
                value={openingBalanceForm.note}
                onChange={(e) =>
                  setOpeningBalanceForm({ ...openingBalanceForm, note: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={handleOpeningBalanceSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this opening balance? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={deleteDisclosure.onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteBalance}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OpeningBalanceTab;
