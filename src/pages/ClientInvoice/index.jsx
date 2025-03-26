import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import { api } from '../../services/api';
// import CurrencyFormatter from '../../utils/currencyFormatter';
import Stripe from './Stripe/index';
// import PaypalFinitive from './PaypalFinitive';
// import PaypalAxolot from './PaypalAxolot';
// import PayArc from './PayArc';
// import Sumup from './Sumup';
import { useDispatch, useSelector } from 'react-redux';
import { getOneInvoice } from '../../redux/invoiceSlice';
import { Box, Flex, Heading, Image, Text, VStack, useColorMode } from '@chakra-ui/react';
import CONSTANTS from '../../utils/constants';
import StripeProvider from './Stripe/StripeProvider';
import Moneris from './Moneris';

const ClientInvoice = () => {
  const { id } = useParams();
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.singleInvoice);

  console.log('----', invoice);

  useEffect(() => {
    if (id) {
      dispatch(getOneInvoice({ id }));
    }
    if (colorMode === 'dark') {
      toggleColorMode();
    }
  }, [dispatch, id, toggleColorMode, colorMode]);

  useEffect(() => {
    // console.log(invoice);
    if (!!invoice) {
      document.title = invoice?.brandName;
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = invoice?.logo;
    }
  }, [invoice]);

  return (
    <Box as="div" display={'flex'} flexDirection={['column', 'column', 'row-reverse']} flex={1}>
      <Box flex={0.5} px={2}>
        {!!invoice && (
          <Box
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
            my={4}
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
                      {invoice?.clientBusinessName && (
                        <Text> {`${invoice?.clientBusinessName}`}</Text>
                      )}
                      {invoice?.clientName && <Text> {`${invoice?.clientName} `}</Text>}
                      {invoice?.clientAddress && <Text> {invoice?.clientAddress}</Text>}
                      {invoice?.clientCity && <Text> {invoice?.clientCity}</Text>}
                      {invoice?.clientCountry && <Text> {invoice?.clientCountry}</Text>}
                      {invoice?.clientZip && <Text> {invoice?.clientZip}</Text>}
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
                    {/* <Box bg={invoice?.invoiceBgColor ?? 'white'} flex={0.5} py={4} px={2} pb={2}>
                    <Text>{`${productLine?.description}`}</Text>
                  </Box> */}
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
        )}
      </Box>
      <Box as="div" display={'flex'} flex={0.5} justifyContent={'center'}>
        {invoice?.status === 'paid' ? (
          <Box my={10} py={4}>
            <Text color={'#808080'} fontWeight={'700'} fontSize={22} textAlign={'center'}>
              Invoice Status: Paid
            </Text>
          </Box>
        ) : (
          <Box>
            <Flex justifyContent={'center'}>
              {invoice?.merchant === CONSTANTS.merchants.WI_STRIPE && (
                <StripeProvider
                  invoiceData={invoice}
                  stripe_publishable_key={process.env.REACT_APP_WI_STRIPE_KEY}
                  merchants_api_url={'wi-stripe/create-payment'}
                />
              )}
              {invoice?.merchant === CONSTANTS.merchants.WIZ_PUB_STRIPE && (
                <StripeProvider
                  invoiceData={invoice}
                  stripe_publishable_key={process.env.REACT_APP_WIZ_PUB_STRIPE_KEY}
                  merchants_api_url={'wizpub-stripe/create-payment'}
                />
              )}

              {invoice?.merchant === CONSTANTS.merchants.WP_MONERIS && (
                <Moneris invoiceData={invoice} storeName={'wizpub'} />
              )}
              {invoice?.merchant === CONSTANTS.merchants.WI_MONERIS && (
                <Moneris invoiceData={invoice} storeName={'web-inventix'} />
              )}
              {invoice?.merchant === CONSTANTS.merchants.WI_MONERIS_CA && (
                <Moneris invoiceData={invoice} storeName={'web-inventix-ca'} />
              )}
            </Flex>
            {/* <Flex justifyContent={'center'} my={20}>
            {invoice?.merchant === 'Stripe 1' && <PayArc invoiceData={invoice} />}
          </Flex> */}
            {/* <Flex justifyContent={'center'} my={20}>
            {invoice?.merchant === 'Paypal Finitive' && <PaypalFinitive invoice={invoice} />}
          </Flex> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ClientInvoice;
