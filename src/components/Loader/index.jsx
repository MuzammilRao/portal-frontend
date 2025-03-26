import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex
      position="absolute"
      top="0"
      left="0"
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent={'center'}
    >
      <Spinner
        zIndex={99}
        thickness="10px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.themeOrange"
        size="xl"
      />
    </Flex>
  );
};

export default Loading;
