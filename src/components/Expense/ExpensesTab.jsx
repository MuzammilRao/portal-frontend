import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
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
  Textarea,
  Select,
  Box,
  Image,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addExpense,
  deleteExpense,
  getReports,
  updateExpense,
  getAllExpenses,
} from '../../redux/expenseSlice';
import { useLocation } from 'react-router-dom';
import usePermissionCheck from '../../hooks/usePermissionCheck';
import CONSTANTS from '../../utils/constants';
import { useAuthContext } from '../../hooks/useAuthContext';

const handleFile = (e) => {
  const file = e.target.files[0];

  return new Promise((resolve, reject) => {
    if (!file) {
      alert('Please select a File to upload!');
      reject('No file selected');
      return;
    }

    transformFile(file, (result) => {
      resolve({ file, preview: result });
    });
  });
};

const transformFile = (file, callback) => {
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      callback(reader.result);
    };
  }
};

const ExpensesTab = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { user } = useAuthContext();
  const month = parseInt(params.get('month')) || currentMonth;
  const year = parseInt(params.get('year')) || currentYear;

  const { expenses, isLoading, categories } = useSelector((state) => state.expense);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [form, setForm] = useState({ title: '', amount: '', category: '', file: null });
  const dispatch = useDispatch();
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (isEditMode) {
      await dispatch(updateExpense({ id: selectedExpense._id, payload: form }));
      await dispatch(getReports({ month, year }));
    } else {
      await dispatch(addExpense({ payload: form }));
      await dispatch(getReports({ month, year }));
    }
    setForm({ title: '', amount: '', category: '', file: null });
    setIsEditMode(false);
    setSelectedExpense(null);
    onClose();
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      file: null,
    });
    setIsEditMode(true);
    onOpen();
  };

  const expenseFileHandler = async (e) => {
    try {
      const { file, preview } = await handleFile(e);
      setForm({ ...form, file: preview, filePreview: preview });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExpense = async () => {
    await dispatch(deleteExpense({ id: selectedExpenseId }));
    await dispatch(getAllExpenses({ month, year }));
    await dispatch(getReports({ month, year }));
    deleteDisclosure.onClose();
    setSelectedExpenseId(null);
  };

  const { isUpdateAllowed } = usePermissionCheck(CONSTANTS.modules.EXPENSE);

  return (
    <>
      <Button colorScheme="orange" onClick={onOpen} mb={4}>
        Add Expense
      </Button>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Amount</Th>
              <Th>Category</Th>
              <Th>Date</Th>
              <Th>File</Th>

              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((expense) => (
              <Tr key={expense._id}>
                <Td>{expense.title}</Td>
                <Td>${expense.amount}</Td>
                <Td>{expense.category?.name}</Td>
                <Td>{expense.createdAt.slice(0, 10)}</Td>
                <Td>
                  {expense.file && (
                    <Button
                      size="sm"
                      colorScheme="teal"
                      onClick={() => window.open(expense.file, '_blank')}
                    >
                      Open File
                    </Button>
                  )}
                </Td>
                <Td>
                  {isUpdateAllowed && (
                    <Button size="sm" colorScheme="blue" onClick={() => handleEdit(expense)}>
                      Edit
                    </Button>
                  )}
                  {user?.data?.role === 'super-admin' && (
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => {
                        setSelectedExpenseId(expense._id);
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

      {/* Modal for Adding/Updating Expense */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditMode ? 'Edit Expense' : 'Add Expense'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Expense Title"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleInputChange}
                placeholder="Expense Amount"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories?.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No Categories Available</option>
                )}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>File</FormLabel>
              <Input type="file" onChange={expenseFileHandler} />
            </FormControl>
            {form.filePreview && (
              <Box mt={4}>
                {form.file?.type?.startsWith('image/') ? (
                  <Image src={form.filePreview} alt="Preview" maxH="200px" />
                ) : (
                  <a href={form.filePreview} target="_blank" rel="noopener noreferrer">
                    {form.file.name}
                  </a>
                )}
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={handleSubmit}>
              {isEditMode ? 'Update' : 'Save'}
            </Button>
            <Button variant="ghost" ml={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

       <Modal isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to delete this Expense? This action cannot be undone.
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={deleteDisclosure.onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleDeleteExpense}>
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    </>
  );
};

export default ExpensesTab;
