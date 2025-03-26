import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Flex, Grid, GridItem, Heading, Image, Text, VStack } from '@chakra-ui/react';
import DashboardHeading from '../../../components/DashboardHeading';
import { getOneInvoice, getOneInvoiceAdmin, sendInvoice } from '../../../redux/invoiceSlice';
import { useReactToPrint } from 'react-to-print';
import useToast from '../../../hooks/useToast';

const InvoiceInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.singleInvoice);
  const componentRef = useRef();
  const { showErrorToast, showSuccessToast } = useToast();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (id) {
      dispatch(getOneInvoiceAdmin({ id }));
    }
  }, [dispatch, id]);

  const handleSendInvoice = () => {
    dispatch(sendInvoice({ id }))
      .then((action) => {
        if (sendInvoice.fulfilled.match(action)) {
          if (action.payload) {
            showSuccessToast('Invoice Sent Succesfully.');
            return;
          } else {
            showErrorToast('Failed to Send.');
          }
        } else {
          showErrorToast('Failed to Send!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        showErrorToast(error?.message);
      });
  };

  return (
    <VStack spacing="6" align="stretch" p="4">
      <Flex mb={6} justifyContent="space-between" alignItems="end">
        <DashboardHeading>Invoice Details</DashboardHeading>
        <Flex gap={2}>
          <Button bg={'brand.themeOrange'} color={'#fff'} onClick={handlePrint}>
            Print
          </Button>
          <Button bg={'brand.themeOrange'} color={'#fff'} onClick={handleSendInvoice}>
            Send Invoice
          </Button>
          <Button bg={'brand.themeOrange'} color={'#fff'}>
            <a target="_blank" rel="noreferrer" href={`/invoice/payment-link/${id}`}>
              Generate Payment Link
            </a>
          </Button>
        </Flex>
      </Flex>
      <Box>
        <Flex color="brand.primary" fontSize={20} gap={5} alignItems={'center'}>
          <Text>Payment Link: &nbsp;</Text>
          <Text
            fontWeight={'700'}
          >{`${process.env.REACT_APP_URL}/invoice/payment-link/${id}`}</Text>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.REACT_APP_URL}/invoice/payment-link/${id}`,
              );
            }}
          >
            Copy Link
          </Button>
        </Flex>
      </Box>
      <Box
        ref={componentRef}
        boxShadow={'2px 5px 5px #808080'}
        border={'1px solid #808080'}
        as="div"
        // maxHeight={'1400px'}
        bg={!!invoice?.invoiceBgColor ? invoice?.invoiceBgColor : 'white'}
        height={'min-content'}
        maxWidth={'900'}
        fontFamily={'Poppins'}
        pt={12}
        pb={5}
        px={4}
      >
        <Box color={'black'} as="div" zIndex={10}>
          <Flex justifyContent={'space-between'}>
            <VStack spacing={6} flex={'0.5'} align={'self-start'}>
              <Image width={'200px'} objectFit={'contain'} src={invoice?.logo} />
              <Box>
                <Heading as={'h4'} fontSize={'22'}>
                  {invoice?.brandName}
                </Heading>
                <Text> {invoice?.brandAddress}</Text>
                <Text> {invoice?.brandCity}</Text>
                <Text> {invoice?.brandState}</Text>
                <Text> {invoice?.brandZip}</Text>
                <Text> {invoice?.brandCountry}</Text>
              </Box>

              <Box my={10}>
                <Box>
                  <Heading as={'h4'} fontSize={'22'}>
                    Bill To
                  </Heading>
                  <Text> {`${invoice?.clientBusinessName}`}</Text>
                  <Text> {`${invoice?.clientName} `}</Text>
                  <Text> {invoice?.clientAddress}</Text>
                  <Text> {invoice?.clientCity}</Text>
                  <Text> {invoice?.clientCountry}</Text>
                  <Text> {invoice?.clientZip}</Text>
                </Box>
              </Box>
            </VStack>
            <Flex
              spacing={6}
              flex={'0.5'}
              flexDir={'column'}
              justifyContent={'space-between'}
              align={'self-end'}
              pt={14}
            >
              <Box as="div">
                <Heading textAlign={'end'} as="h2" fontWeight={'600'} fontSize={26}>
                  Invoice
                </Heading>
                <Text>{`${invoice?.invoiceNumber}`}</Text>

                <Box as="div" mt={20}>
                  <Heading textAlign={'end'} as="h2" fontWeight={'600'} fontSize={20}>
                    {invoice?.status === 'paid' ? 'Amount Paid' : 'Balance Due'}
                  </Heading>
                  <Text textAlign={'end'}>{`${invoice?.currency} ${invoice?.totalDue}`}</Text>
                </Box>
              </Box>
              <Flex w={'100%'} my={10} flexDir={'column'} gap={2}>
                <Flex flex={1} gap={2} alignItems={'baseline'}>
                  <Text flex={0.3}>Date</Text>
                  <Text flex={0.7}>{invoice?.invoiceDate}</Text>
                </Flex>
                <Flex gap={2} alignItems={'baseline'}>
                  <Text flex={0.3}>Due Date</Text>
                  <Text flex={0.7}>{invoice?.invoiceDueDate}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Box as="div">
            <Flex px={2} borderTopRadius={4} flex={1} bg="#666">
              <Box flex={0.5}>
                <Text textAlign={'start'}>Item Description</Text>
              </Box>
              <Box flex={0.1}>
                <Text textAlign={'start'}>Qty</Text>
              </Box>
              <Box flex={0.15}>
                <Text>Rate</Text>
              </Box>
              <Box flex={0.15}>
                <Text>Amount</Text>
              </Box>
            </Flex>
            {invoice?.productLines?.map((productLine, i) => (
              <Flex alignItems={'flex-start'} key={i} flex={1}>
                <Box
                  className="richTextEditor"
                  bg={invoice?.invoiceBgColor ?? 'white'}
                  flex={0.5}
                  py={4}
                  px={2}
                  pb={2}
                >
                  {/* <Text>{`${productLine?.description}`}</Text> */}
                  <Box
                    as="div"
                    color={'black'}
                    dangerouslySetInnerHTML={{ __html: productLine?.description }}
                  ></Box>
                </Box>
                <Box as="div" flex={0.1} py={4} px={2} pb={2}>
                  <Text>{`${productLine?.quantity}`}</Text>
                </Box>
                <Box as="div" flex={0.15} py={4} px={2} pb={2}>
                  <Text>{productLine?.rate}</Text>
                </Box>
                <Box as="div" flex={0.15} py={4} px={2} pb={2}>
                  <Text>{`${productLine?.quantity * productLine?.rate}`}</Text>
                </Box>
              </Flex>
            ))}

            <Flex flex={1} justifyContent={'flex-end'}>
              <Flex flexDir={'column'}>
                <Flex justifyContent={'space-between'} gap={10}>
                  <Text>Subtotal</Text>
                  <Text
                    textAlign={'end'}
                    justifySelf={'flex-end'}
                  >{`${invoice?.currency} ${invoice?.subTotal}`}</Text>
                </Flex>
                <Flex justifyContent={'space-between'} alignItems={'baseline'} gap={10}>
                  <Text>Tax</Text>
                  <Flex alignItems={'baseline'} mr={10}>
                    <Text textAlign={'end'} justifySelf={'flex-end'}>
                      {invoice?.taxPercent}%
                    </Text>
                  </Flex>
                  <Text>{`${invoice?.currency} ${invoice?.taxAmount}`}</Text>
                </Flex>

                <Box border={'1px solid #808080'} my={4} />
                <Flex justifyContent={'space-between'} gap={10}>
                  <Text>Total</Text>
                  <Text
                    textAlign={'end'}
                    justifySelf={'flex-end'}
                  >{`${invoice?.currency} ${invoice?.totalDue}`}</Text>
                </Flex>
              </Flex>
            </Flex>

            <Flex my={2} gap={2}>
              <Text>Terms and Conditions</Text>
              <Text>{invoice?.terms}</Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};

export default InvoiceInfo;
