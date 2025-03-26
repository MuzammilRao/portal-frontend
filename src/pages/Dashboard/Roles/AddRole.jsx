import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import DashboardHeading from '../../../components/DashboardHeading';
import { getAllModules } from '../../../redux/moduleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { addRole } from '../../../redux/roleSlice';
import useToast from '../../../hooks/useToast';
import { useNavigate } from 'react-router-dom';

const AddRole = () => {
  const dispatch = useDispatch();
  const roleRef = useRef();
  const navigate = useNavigate();
  const { modules } = useSelector((state) => state.module);
  const { showErrorToast, showSuccessToast } = useToast();
  const [selectedModules, setSelectedModules] = useState([]);
  const [modulePermissions, setModulePermissions] = useState([]);

  useEffect(() => {
    dispatch(getAllModules());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roleRef.current.value) {
      alert('Role Name is Required');
      return;
    }
    const roleName = roleRef.current.value;

    const payload = {
      name: roleName,
      modulePermissions,
    };

    dispatch(addRole({ payload: payload }))
      .then((action) => {
        if (addRole.fulfilled.match(action)) {
          if (action.payload) {
            showSuccessToast('Role Added Succesfully.');
            navigate(-1);
            return;
          } else {
            showErrorToast('Failed to Add Role.');
          }
        } else {
          showErrorToast('Failed to Add!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        showErrorToast(error?.message);
      });
  };

  function convertToBooleanObject(actionsArray) {
    const booleanObject = {};
    actionsArray.forEach((action) => {
      booleanObject[action] = true;
    });
    return booleanObject;
  }

  const permissionHandler = (values, module) => {
    let actions = convertToBooleanObject(values);
    let _modulePermissions = {
      module: module._id,
      actions: actions,
    };
    setModulePermissions((prev) => {
      const existingIndex = prev.findIndex((e) => e.module === module._id);
      if (existingIndex !== -1) {
        const updatedPermissions = [...prev];
        updatedPermissions.splice(existingIndex, 1);
        return [...updatedPermissions, _modulePermissions];
      } else {
        return [...prev, _modulePermissions];
      }
    });
  };

  return (
    <VStack spacing="6" align="stretch" p="4">
      <Flex justifyContent="space-between">
        <DashboardHeading>Add a Role</DashboardHeading>
      </Flex>
      <Box>
        <form onSubmit={handleSubmit}>
          <FormControl mb={10}>
            <FormLabel color="brand.primary" htmlFor="name">
              Role Name
            </FormLabel>
            <Input
              ref={roleRef}
              color="brand.primary"
              name="name"
              placeholder="Role Name"
              size="md"
              w="50%"
            />
          </FormControl>
          {modules &&
            modules?.map((module) => (
              <Flex
                key={module._id}
                flex="1"
                color="brand.primary"
                my={4}
                borderBottom="1px dotted #808080"
              >
                <Flex gap={2} flex="0.5">
                  <Checkbox
                    colorScheme="blue"
                    isChecked={selectedModules.includes(module._id)}
                    onChange={() => {
                      if (selectedModules.includes(module._id)) {
                        setSelectedModules(selectedModules.filter((id) => id !== module._id));
                      } else {
                        setSelectedModules([...selectedModules, module._id]);
                      }
                    }}
                  />
                  <Text textTransform="capitalize">{module?.name}</Text>
                </Flex>
                {selectedModules.includes(module._id) && (
                  <Flex flex="0.5">
                    <CheckboxGroup
                      colorScheme="blue"
                      onChange={(e) => permissionHandler(e, module)}
                    >
                      <Stack spacing={5} direction={'row'}>
                        <Checkbox value="read">Read</Checkbox>
                        <Checkbox value="create">Create</Checkbox>
                        <Checkbox value="update">Update</Checkbox>
                        <Checkbox value="delete">Delete</Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </Flex>
                )}
              </Flex>
            ))}
          <Button bg="brand.themeOrange" color="brand.text" type="submit">
            Add
          </Button>
        </form>
      </Box>
    </VStack>
  );
};

export default AddRole;
