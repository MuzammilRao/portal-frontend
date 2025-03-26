import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import DashboardHeading from '../../../components/DashboardHeading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllRoles } from '../../../redux/roleSlice';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { deleteRole } from '../../../redux/roleSlice/actions';

const Roles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roles } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getAllRoles());
  }, []);

  const handleDeleteRole = (roleId) => {
    dispatch(deleteRole({ id: roleId }));
    // dispatch(getAllRoles());
  };

  return (
    <VStack spacing="6" align="stretch" p="4">
      <Flex justifyContent="space-between" alignItems="center">
        <DashboardHeading>Roles</DashboardHeading>
        <Button bg="brand.themeOrange" color="brand.text" onClick={() => navigate('add')}>
          Add New Role
        </Button>
      </Flex>
      <Box>
        {roles &&
          roles?.map((role) => (
            <Box key={role._id}>
              <Accordion allowMultiple>
                <AccordionItem>
                  <AccordionButton>
                    <Flex w={'100%'} justifyContent="space-between" alignItems="center">
                      <Text
                        color="brand.primary"
                        fontSize={22}
                        fontWeight={700}
                        textTransform="capitalize"
                      >
                        {role?.name}
                      </Text>
                      <Box
                        color="brand.primary"
                        sx={{
                          _hover: {
                            color: 'red',
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <Trash2 onClick={() => handleDeleteRole(role._id)} size={20} />
                      </Box>
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    {!!role?.modulePermissions?.length &&
                      role?.modulePermissions.map((p, i) => (
                        <Flex
                          px={14}
                          key={i}
                          flex="1"
                          color="brand.primary"
                          my={4}
                          borderBottom="1px dotted #808080"
                        >
                          <Flex gap={2} flex="0.5">
                            <Text textTransform="capitalize">{p?.module?.name}</Text>
                          </Flex>

                          <Flex flex="0.5">
                            <CheckboxGroup colorScheme="blue">
                              <Stack spacing={5} direction={'row'}>
                                <Checkbox isChecked={p?.actions?.read}>Read</Checkbox>
                                <Checkbox isChecked={p?.actions?.create}>Create</Checkbox>
                                <Checkbox isChecked={p?.actions?.update}>Update</Checkbox>
                                <Checkbox isChecked={p?.actions?.delete}>Delete</Checkbox>
                              </Stack>
                            </CheckboxGroup>
                          </Flex>
                        </Flex>
                      ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          ))}
      </Box>
    </VStack>
  );
};

export default Roles;
