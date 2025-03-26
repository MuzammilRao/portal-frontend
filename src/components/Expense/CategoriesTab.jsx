import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Box,
  Flex,
  Text,
  Badge,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/expenseSlice';

const CategoriesTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.expense);
  const [categoryForm, setCategoryForm] = useState({ name: '' });

  const handleAddCategory = () => {
    dispatch(addCategory({ payload: categoryForm }));
    setCategoryForm({ name: '' });
    onClose();
  };

  return (
    <>
      <Button colorScheme="orange" onClick={onOpen} mb={6}>
        Add Category
      </Button>
      <Box>
        {categories.length > 0 ? (
          <Flex flexWrap="wrap" gap={4}>
            {categories.map((category) => (
              <Box
                key={category._id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                shadow="md"
                bg="gray.50"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.05)', shadow: 'lg' }}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="lg" fontWeight="bold" textTransform="capitalize">
                    {category?.name}
                  </Text>
                  <Badge colorScheme="orange" ml={2}>
                    Category
                  </Badge>
                </Flex>
              </Box>
            ))}
          </Flex>
        ) : (
          <Text fontSize="lg" color="gray.500">
            No categories added yet.
          </Text>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Category Name</FormLabel>
              <Input
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ name: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={handleAddCategory}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoriesTab;
