import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeading from '../../../components/DashboardHeading';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  VStack,
  Select as ChakraSelect,
} from '@chakra-ui/react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '../../../hooks/useToast';
import { setSingleClientNull, getAllClients, getOneClientAdmin } from '../../../redux/clientSlice';
import { addInvoiceAdmin } from '../../../redux/invoiceSlice';
import { initialInvoice, initialProductLine } from '../../../utils/invoice/initialData';
import EditableInput from '../../../components/Invoice/EditableInput';
import { BadgeX } from 'lucide-react';
import EditableRichText from '../../../components/Invoice/EditableRichText';
import { getUserMerchants } from '../../../redux/merchantSlice';

const currencies = [{ value: 'USD' }, { value: 'CAD' }];

const InvoiceForm = () => {
  const { showErrorToast, showSuccessToast } = useToast();

  const clients = useSelector((state) => state.client.clients);
  const [invoice, setInvoice] = useState({ ...initialInvoice });
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const merchants = useSelector((state) => state.merchant.merchants);
  const client = useSelector((state) => state.client.singleClient);
  const filters = {
    page: 1,
    sort: '',
    limit: 1700,
    search: '',
  };
  useEffect(() => {
    dispatch(getAllClients(filters));
    dispatch(setSingleClientNull());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserMerchants());
  }, [dispatch]);

  const clientSelectHandler = (e) => {
    setSelectedClient(e.value);
    dispatch(getOneClientAdmin({ id: e.value })).then((res) => {
      const _client = res?.payload?.data;
      setInvoice({
        ...invoice,
        logo: _client?.brand?.logo,
        brand: _client?.brand?._id,
        brandName: _client?.brand?.name,
        brandAddress: _client?.brand?.address,
        brandCity: _client?.brand?.city,
        brandState: _client?.brand?.state,
        brandZip: _client?.brand?.zip,
        brandCountry: _client?.brand?.country,
        terms: _client?.brand?.termsAndConditions,
        invoiceNumber: `${_client?.brand?.invoicePrefix}-${
          Number(_client?.brand?.invoiceNumber) + 1
        }`,
        clientName: `${_client?.firstName} ${_client?.lastName}`,
        clientBusinessName: `${_client?.businessName}`,
        client: _client?._id,
        clientAddress: _client?.address,
        clientCity: _client?.city,
        clientCountry: _client?.country,
        clientZip: _client?.zip,
        clientEmail: _client?.clientEmail,
        merchant: _client?.merchant?.name,
        invoiceBgColor: _client?.brand?.invoiceBgColor,
        textColorPrimary: _client?.brand?.textColorPrimary,
        textColorSecondary: _client?.brand?.textColorSecondary,
        user: _client?.user,
      });
      const updatedSelectedOption = {
        label: `${_client?.firstName} ${_client?.lastName}`,
        value: _client._id,
      };

      setSelectedClient(updatedSelectedOption);
    });
  };

  const handleChange = (e) => {
    if (e.target.name !== 'productLines') {
      const newInvoice = { ...invoice };

      if (e.target.name !== 'logoWidth' && typeof e.target.value === 'string') {
        newInvoice[e.target.name] = e.target.value;
      } else {
        newInvoice[e.target.name] = e.target.value;
      }

      setInvoice(newInvoice);
    }
  };

  const handleProductLineChange = (index, name, value) => {
    const productLines = invoice.productLines.map((productLine, i) => {
      if (i === index) {
        const newProductLine = { ...productLine };
        if (name === 'description') {
          newProductLine[name] = value;
        } else {
          if (
            value[value.length - 1] === '.' ||
            (value[value.length - 1] === '0' && value.includes('.'))
          ) {
            newProductLine[name] = value;
          } else {
            const n = parseFloat(value);

            newProductLine[name] = (n ? n : 0).toString();
          }
        }

        return newProductLine;
      }

      return { ...productLine };
    });

    setInvoice({ ...invoice, productLines });
  };

  const handleRemove = (i) => {
    const productLines = invoice.productLines.filter((productLine, index) => index !== i);

    setInvoice({ ...invoice, productLines });
  };

  const handleAdd = () => {
    const productLines = [...invoice.productLines, { ...initialProductLine }];

    setInvoice({ ...invoice, productLines });
  };

  const calculateAmount = (quantity, rate) => {
    const quantityNumber = parseFloat(quantity);
    const rateNumber = parseFloat(rate);
    const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;

    return amount;
  };

  useEffect(() => {
    let subTotal = 0;

    invoice.productLines.forEach((productLine) => {
      const quantityNumber = parseFloat(productLine.quantity);
      const rateNumber = parseFloat(productLine.rate);
      const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;

      subTotal += amount;
    });

    setInvoice({ ...invoice, subTotal: subTotal });
  }, [invoice.productLines]);

  useEffect(() => {
    const match = invoice.taxPercent;
    const taxRate = match ? parseFloat(match) : 0;
    const saleTax = invoice.subTotal ? (invoice.subTotal * taxRate) / 100 : 0;

    let _total = Number(invoice.subTotal + saleTax);

    setInvoice({ ...invoice, taxAmount: saleTax, totalDue: _total });
  }, [invoice.subTotal, invoice.taxPercent]);

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(addInvoiceAdmin({ payload: invoice }))
      .then((action) => {
        if (addInvoiceAdmin.fulfilled.match(action)) {
          if (action.payload) {
            showSuccessToast('Invoice Added Succesfully.');
            navigate(-1);
            return;
          } else {
            showErrorToast('Failed to Add Invoice.');
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

  const handleMerchantChange = (e) => {
    // console.log(e.target.value);
    setInvoice({ ...invoice, merchant: e.target.value });
  };

  const currencySelectHandler = (e) => {
    setInvoice({ ...invoice, currencyCode: e.target.value });
  };

  useEffect(() => {
    console.log(selectedCurrency, 'Selected Currency');
    if (!merchants || merchants.length === 0) return;

    // Filter merchants based on selectedCurrency
    const _filteredMerchants = merchants.filter((merchant) => {
      if (invoice.currencyCode === 'USD') {
        return merchant.name !== 'WI_MONERIS_CA';
      }
      if (invoice.currencyCode === 'CAD') {
        return merchant.name === 'WI_STRIPE' || merchant.name === 'WI_MONERIS_CA';
      }
      return true; // Default case, show all merchants
    });

    setFilteredMerchants(_filteredMerchants);
  }, [invoice.currencyCode, merchants]);

  return (
    <VStack spacing="6" align="stretch" p="4">
      <form onSubmit={formHandler}>
        <Flex mb={6} justifyContent="space-between" alignItems="end">
          {/* <DashboardHeading>{!!id ? 'Update Invoice' : 'Create New Invoice'}</DashboardHeading> */}
          <DashboardHeading>{false ? 'Update Invoice' : 'Create New Invoice'}</DashboardHeading>
          <Flex gap={4} alignItems={'end'}>
            {false ? (
              <Button type="submit" bg="brand.themeOrange" color="brand.text">
                Update
              </Button>
            ) : (
              <Button type="submit" bg="brand.themeOrange" color="brand.text">
                Create
              </Button>
            )}
          </Flex>
        </Flex>

        <Flex flexDir={'column'} gap={10}>
          <Flex w={'100%'} gap={2} color={'brand.secondary'} my="10px">
            <FormControl w={'50%'}>
              <FormLabel color={'brand.secondary'}>Select a client</FormLabel>
              <Select
                value={selectedClient}
                placeholder={`Search Client`}
                onChange={clientSelectHandler}
                options={clients?.map((client) => ({
                  label: `${client?.firstName} ${client?.lastName}`,
                  value: client._id,
                }))}
              />
            </FormControl>
            <Box width={'20%'}>
              <FormControl>
                <FormLabel color={'brand.secondary'}>Select a Currency</FormLabel>
                <ChakraSelect
                  value={invoice.currencyCode}
                  placeholder={`Select Currency`}
                  onChange={currencySelectHandler}
                  defaultValue={invoice.currencyCode}
                >
                  {currencies.map((e, i) => (
                    <option key={i} value={e?.value}>
                      {e?.value}
                    </option>
                  ))}
                </ChakraSelect>
              </FormControl>
            </Box>
            {/* <Flex w={'30%'} justifyContent={'flex-end'}>
              <Box w="45%" mr="30px">
                <FormControl my="10px">
                  <FormLabel color={'brand.secondary'}>Merchant </FormLabel>
                  <Flex flexWrap={'wrap'} flexDirection={'column'} gap={3}>
                    {merchants?.map((merchant, i) => (
                      <Checkbox
                        color={'brand.primary'}
                        onChange={(e) => handleMerchantChange(e)}
                        isChecked={merchant?.name === invoice?.merchant}
                        key={i}
                        value={merchant.name}
                      >
                        {merchant?.name}
                      </Checkbox>
                    ))}
                  </Flex>
                </FormControl>
              </Box>
            </Flex> */}
            <Flex w={'30%'} justifyContent={'flex-end'}>
              <Box w="45%" mr="30px">
                <FormControl my="10px">
                  <FormLabel color={'brand.secondary'}>Merchant</FormLabel>
                  <Flex flexWrap={'wrap'} flexDirection={'column'} gap={3}>
                    {filteredMerchants?.map((merchant, i) => {
                      return (
                        <Checkbox
                          color={'brand.primary'}
                          onChange={(e) => handleMerchantChange(e)}
                          isChecked={merchant?.name === invoice?.merchant}
                          key={i}
                          value={merchant.name}
                        >
                          {merchant?.name}
                        </Checkbox>
                      );
                    })}
                  </Flex>
                </FormControl>
              </Box>
            </Flex>
          </Flex>

          {!!client && (
            <Box
              boxShadow={'2px 5px 5px #808080'}
              border={'1px solid #808080'}
              as="div"
              // maxHeight={'1400px'}
              bg={!!client?.brand?.invoiceBgColor ? client?.brand?.invoiceBgColor : 'white'}
              height={'min-content'}
              maxWidth={'900'}
              fontFamily={'Poppins'}
              py={12}
              px={4}
            >
              <Box color={'black'} as="div" zIndex={10}>
                <Flex justifyContent={'space-between'}>
                  <VStack spacing={6} flex={'0.5'} align={'self-start'}>
                    <Image width={'200px'} objectFit={'contain'} src={client?.brand?.logo} />
                    <Box>
                      <Heading as={'h4'} fontSize={'22'}>
                        {client?.brand?.name}
                      </Heading>
                      <Text> {client?.brand?.address}</Text>
                      <Text> {client?.brand?.city}</Text>
                      <Text> {client?.brand?.state}</Text>
                      <Text> {client?.brand?.zip}</Text>
                      <Text> {client?.brand?.country}</Text>
                    </Box>

                    <Box my={10}>
                      <Box>
                        <Heading as={'h4'} fontSize={'22'}>
                          Bill To
                        </Heading>
                        <Text> {`${client?.businessName}`}</Text>
                        <Text> {`${client?.firstName} ${client?.lastName}`}</Text>
                        <Text> {client?.address}</Text>
                        <Text> {client?.city}</Text>
                        <Text> {client?.country}</Text>
                        <Text> {client?.zip}</Text>
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
                      <Text textAlign={'right'}>{`${client?.brand?.invoicePrefix}-${
                        Number(client?.brand?.invoiceNumber) + 1
                      }`}</Text>

                      <Box as="div" mt={20}>
                        <Heading textAlign={'end'} as="h2" fontWeight={'600'} fontSize={20}>
                          Balance Due
                        </Heading>
                        <Text textAlign={'end'}>{`${invoice.currency} ${invoice.totalDue}`}</Text>
                      </Box>
                    </Box>
                    <Flex w={'100%'} my={10} flexDir={'column'} gap={2}>
                      <Flex flex={1} gap={2} alignItems={'baseline'}>
                        <Text flex={0.3}>Date</Text>
                        <Input
                          flex={0.7}
                          onChange={handleChange}
                          name="invoiceDate"
                          value={invoice.invoiceDate}
                          type="date"
                        />
                      </Flex>
                      <Flex gap={2} alignItems={'baseline'}>
                        <Text flex={0.3}>Due Date</Text>
                        <Input
                          flex={0.7}
                          onChange={handleChange}
                          placeholder={invoice.invoiceDueDate}
                          name="invoiceDueDate"
                          value={invoice.invoiceDueDate}
                          type="date"
                        />
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
                    <Box flex={0.1}></Box>
                  </Flex>
                  {invoice.productLines.map((productLine, i) => (
                    <Flex alignItems={'center'} key={i} flex={1}>
                      <Box
                        bg={client?.brand?.invoiceBgColor ?? 'white'}
                        flex={0.5}
                        py={4}
                        px={2}
                        pb={2}
                      >
                        <EditableRichText
                          placeholder="Enter item name/description"
                          value={productLine?.description}
                          onChange={(value) => handleProductLineChange(i, 'description', value)}
                        />
                      </Box>
                      <Box as="div" flex={0.1} py={4} px={2} pb={2}>
                        <EditableInput
                          className="dark right"
                          value={productLine.quantity}
                          onChange={(value) => handleProductLineChange(i, 'quantity', value)}
                        />
                      </Box>
                      <Box as="div" flex={0.15} py={4} px={2} pb={2}>
                        <EditableInput
                          value={productLine.rate}
                          onChange={(value) => handleProductLineChange(i, 'rate', value)}
                        />
                      </Box>
                      <Box as="div" flex={0.15} py={4} px={2} pb={2}>
                        <Text>{calculateAmount(productLine.quantity, productLine.rate)}</Text>
                      </Box>
                      <Box as="div" flex={0.1} py={4} px={2} pb={2}>
                        <Button color={'red'} onClick={() => handleRemove(i)}>
                          <BadgeX size="16" />
                        </Button>
                      </Box>
                    </Flex>
                  ))}
                  <Button bg={'brand.secondary'} color={'white'} onClick={handleAdd}>
                    Add Item
                  </Button>

                  <Flex flex={1} justifyContent={'flex-end'}>
                    <Flex flexDir={'column'}>
                      <Flex justifyContent={'space-between'} gap={10}>
                        <Text>Subtotal</Text>
                        <Text
                          textAlign={'end'}
                          justifySelf={'flex-end'}
                        >{`${invoice.currency} ${invoice?.subTotal}`}</Text>
                      </Flex>
                      <Flex justifyContent={'space-between'} alignItems={'baseline'} gap={10}>
                        <Text>Tax</Text>
                        <Flex alignItems={'baseline'} mr={10}>
                          <Text>%</Text>
                          <Text w={20} textAlign={'end'} justifySelf={'flex-end'}>
                            <EditableInput
                              value={invoice.taxPercent}
                              onChange={(value) => setInvoice({ ...invoice, taxPercent: value })}
                            />
                          </Text>
                        </Flex>
                        <Text>{`${invoice?.currency} ${invoice.taxAmount}`}</Text>
                      </Flex>

                      <Box border={'1px solid #808080'} my={4} />
                      <Flex justifyContent={'space-between'} gap={10}>
                        <Text>Total</Text>
                        <Text
                          textAlign={'end'}
                          justifySelf={'flex-end'}
                        >{`${invoice.currency} ${invoice?.totalDue}`}</Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex my={2} gap={2}>
                    <Text>Terms and Conditions</Text>
                    <Text>{client?.brand?.termsAndConditions}</Text>
                  </Flex>
                </Box>
              </Box>
            </Box>
          )}
        </Flex>
      </form>
    </VStack>
  );
};

export default InvoiceForm;
