// ReusableTable.js
import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Box, Button } from '@chakra-ui/react';
import { Edit, Eye, Trash2 } from 'lucide-react';

const PaginatedTable = ({
  headers,
  data,
  viewAllowed = false,
  onView = () => {},
  editAllowed = false,
  onEdit = () => {},
  deleteAllowed = false,
  onDelete = () => {},
  itemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = data?.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  return (
    <>
      <Table colorScheme="blue" variant="simple" bg="brand.primary">
        <Thead>
          <Tr
            borderTopLeftRadius="10px"
            py="10px"
            fontWeight="600"
            fontSize="16px"
            bg="brand.secondary"
          >
            {headers?.map((header) => (
              <Th color="brand.text" key={header}>
                {header}
              </Th>
            ))}
            <Th color="brand.text">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData?.map((row) => (
            <Tr key={row.id}>
              {Object.values(row).map((value, index) => (
                <Td key={index}>{value}</Td>
              ))}
              <Td>
                <Box display="flex" justifyContent="space-around">
                  {!!viewAllowed && <Eye onClick={() => onEdit(row.id)} aria-label="View" />}
                  {editAllowed === true && (
                    <Edit onClick={() => onEdit(row.id)} aria-label="Edit" />
                  )}
                  {deleteAllowed === true && (
                    <Trash2 onClick={() => onDelete(row.id)} aria-label="Delete" />
                  )}
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button
          variant="outline"
          colorScheme="teal"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          colorScheme="teal"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          ml={2}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default PaginatedTable;
