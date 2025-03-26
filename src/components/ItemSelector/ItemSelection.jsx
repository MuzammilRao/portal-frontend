import { useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';

const Item = ({ item, selectedItems, setSelectedItems }) => {
  const [isActive, setIsActive] = useState(selectedItems.includes(item._id));

  const handleSelection = () => {
    setIsActive((prevIsActive) => {
      const newSelectedItems = [...selectedItems];

      if (prevIsActive) {
        const index = newSelectedItems.indexOf(item._id);
        if (index !== -1) {
          newSelectedItems.splice(index, 1);
        }
      } else {
        newSelectedItems.push(item._id);
      }

      setSelectedItems(newSelectedItems);
      return !prevIsActive;
    });
  };

  return (
    <Flex
      alignItems="center"
      borderRadius="24px"
      px="0.8rem"
      py="0.3rem"
      cursor="pointer"
      backgroundColor={isActive ? '#0C4767' : ''}
      onClick={handleSelection}
    >
      {/* <img src={isActive ? checkIcon : plusIcon} alt="icon" /> */}
      <Box as="span" color={isActive && '#ffffff'}>
        {item?.name}
      </Box>
    </Flex>
  );
};

export default Item;
