import { Box } from '@chakra-ui/react';
import { BackgroundCircle, BackgroundCircle2 } from '../../images';

const GradientBg = () => {
  return (
    <Box>
      <Box as="div" minH={'max-content'} position="absolute" top="0" left="0">
        {/* <img src={BackgroundCircle} style={{}} alt="bgGradient1" /> */}
      </Box>
      <Box as="div" position="absolute" bottom="0" right="0">
        {/* <img src={BackgroundCircle2} alt="bgGradient2" /> */}
      </Box>
    </Box>
  );
};

export default GradientBg;
