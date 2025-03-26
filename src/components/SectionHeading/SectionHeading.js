import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const SectionHeading = ({ headingText, headingPara }) => {
  const navigate = useNavigate();

  return (
    <Box w="40%">
      <Heading as="h1" fontWeight="700" color="black" fontSize="large" textTransform="capitalize">
        {headingText}
      </Heading>
      <Text fontSize="13px" my="20px" mx="0px">
        {headingPara}
      </Text>
      <Button
        rightIcon={<ArrowUpRight />}
        color="brand.text"
        bg="brand.primary"
        onClick={() => navigate('/login')}
      >
        Try Now
      </Button>
    </Box>
  );
};

export default SectionHeading;
