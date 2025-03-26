import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { ChevronDownIcon, Moon, Sun } from 'lucide-react';
import { useLogout } from '../../../hooks/useLogout';

const Topbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [userSettingData, setUserSettingData] = useState(null);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long',
  };
  const today = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', options);
  const formattedDate = formatter.format(today);

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    setUserSettingData(JSON.parse(localStorage.getItem('User')));
  }, []);

  return (
    <Box
      bg="brand.themeGray"
      position={'sticky'}
      top={0}
      display={['none']}
      zIndex={9999}
      py={5}
      px="30px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column">
          <Text color={'brand.primary'} fontSize="2xl">
            Overview
          </Text>
          <Text color={'brand.primary'}>{`${formattedDate}`}</Text>
        </Flex>

        <Flex alignItems="flex-end" color={'brand.primary'}>
          <Flex alignItems="center" gap="8px">
            <Avatar name={user?.data?.name} src="" bg="brand.secondary" />
            <Flex flexDirection="column">
              <Text textTransform={'capitalize'} fontWeight={600} fontSize="24px">
                {user?.data?.name}
              </Text>
              <Text textTransform={'capitalize'} fontWeight={600} fontSize="16px">
                {user?.data?.roles?.name}
              </Text>
            </Flex>

            <Menu>
              <MenuButton
                as={Button}
                size="xs"
                bg="brand.primary"
                rightIcon={<ChevronDownIcon color="white" />}
              ></MenuButton>
              <MenuList color="brand.primary">
                <MenuItem onClick={() => navigate('/dashboard/usersettings')}>
                  <Link to="/dashboard/usersettings">User Profile</Link>
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
            <Button onClick={toggleColorMode}>{colorMode === 'light' ? <Moon /> : <Sun />}</Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Topbar;
