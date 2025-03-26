import React from 'react';
import { Page as PdfPage } from '@react-pdf/renderer';
import compose from '../styles/compose';
import { Box } from '@chakra-ui/react';

const Page = ({ className, pdfMode, children }) => {
  return (
    <>
      {pdfMode ? (
        <PdfPage size="A4" style={compose('page ' + (className ? className : ''))}>
          {children}
        </PdfPage>
      ) : (
        <Box
          as="div"
          boxShadow={' 0 0 17px 0 rgba(16, 40, 73, 0.09)'}
          pos={'relative'}
          background={'white'}
          py={'40px'}
          px={'35px'}
        >
          {children}
        </Box>
      )}
    </>
  );
};

export default Page;
