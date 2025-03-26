// import SectionHeading from '../../components/SectionHeading/SectionHeading';
// import Navbar from '../../components/Navbar/Navbar';

// import classes from './LandingPage.module.css';
// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import { Box, useColorMode } from '@chakra-ui/react';
// import { InvizLogo } from '../../images';
// import { useEffect } from 'react';

// const Landingpage = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const navigate = useNavigate();
//   const { user } = useAuthContext();

//   useEffect(() => {
//     if (colorMode === 'dark') {
//       toggleColorMode();
//     }
//   }, []);

//   const handleNavigation = () => {
//     if (user) {
//       navigate('/dashboard/main');
//     } else {
//       navigate('/login');
//     }
//   };
//   return (
//     <>
//       <Navbar />

//       <section className={classes.section1}>
//         <div className={classes.mainContent}>
//           <h1>Invoicing That Helps Small</h1>
//           <h1>Businesses Get Paid Faster</h1>
//           <p>
//             Torrel Alexis Invoicing that helps you get paid faster.Torrel Alexis Invoicing that
//             helps you get paid faster.Torrel Alexis Invoicing that helps you get paid faster.Torrel
//             Alexis Invoicing that helps you get paid faster.
//           </p>
//           <div className={classes.contentBtns}>
//             <button variant="outlined" onClick={handleNavigation}>
//               Get Started
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className={classes.section2}>
//         <div className={classes.heading}>
//           <p>Explore Small Business Invoicing </p>
//           <h2>Enjoy Our Invoicing Features</h2>
//         </div>
//         <div className={classes.featureFlex}>
//           <div>
//             {/* <img src={icon1} alt="" /> */}
//             <span>Send Invoices</span>
//           </div>
//           <div>
//             {/* <img src={icon2} alt="" /> */}
//             <span>Track Expenses </span>
//           </div>
//           <div>
//             {/* <img src={icon3} alt="" /> */}
//             <span>create reports </span>
//           </div>
//           <div>
//             {/* <img src={icon4} alt="" /> */}
//             <span> manage clients</span>
//           </div>
//           <div>
//             {/* <img src={icon5} alt="" /> */}
//             <span>track payments</span>
//           </div>
//           <div>
//             {/* <img src={icon6} alt="" /> */}
//             <span>multi currency</span>
//           </div>
//         </div>
//       </section>

//       <section className={classes.section3}>
//         <div className={classes.section3_first}>
//           <SectionHeading
//             headingText="Create professional invoices in seconds"
//             headingPara="Lorem ipsum dolor sit amet, consectetur
//             adipiscing elit.Lorem ipsum dolor sit amet, consectetur
//             adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
//           />
//           <div className={classes.imgContainer}>{/* <img src={desktop2} alt="" /> */}</div>
//         </div>
//         <div className={classes.section3_second}>
//           <SectionHeading
//             headingText=" Send Invoices by email"
//             headingPara="Lorem ipsum dolor sit amet, consectetur
//             adipiscing elit.Lorem ipsum dolor sit amet, consectetur
//             adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
//           />
//           <div className={classes.imgContainer}>{/* <img src={desktop3} alt="" /> */}</div>
//         </div>
//         <div className={classes.section3_third}>
//           <SectionHeading
//             headingText=" Keep track of who’s paid (and who hasn’t)"
//             headingPara="Lorem ipsum dolor sit amet, consectetur
//             adipiscing elit.Lorem ipsum dolor sit amet, consectetur
//             adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
//           />
//           <div className={classes.imgContainer}>{/* <img src={desktop4} alt="" /> */}</div>
//         </div>
//         <div className={classes.section3_fourth}>
//           <SectionHeading
//             headingText="Accept payments online"
//             headingPara="Lorem ipsum dolor sit amet, consectetur
//             adipiscing elit.Lorem ipsum dolor sit amet, consectetur
//             adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
//           />
//           <div className={classes.imgContainer}>{/* <img src={desktop5} alt="" /> */}</div>
//         </div>
//       </section>

//       <section className={classes.section5}>
//         <div className={classes.heading}>
//           <h2>
//             Spend less time creating and <br />
//             sending invoices
//           </h2>
//           <p>
//             And more time on the things that matter. Sign up to our free trial. No credit card
//             required.
//           </p>
//         </div>
//         <center>
//           <button variant="outlined" onClick={() => navigate('/login')}>
//             Get Started
//           </button>
//           <button variant="outlined" onClick={() => navigate('/login')}>
//             Try For Free
//           </button>
//         </center>
//       </section>

//       <Box bg={'white'} h={2}></Box>

//       <footer className={classes.footerSection}>
//         <div className={classes.footer}>
//           <div className={classes.first}>
//             <img src={InvizLogo} alt="" />
//             <div className={classes.firstInner}>
//               <span>hello@torrelalexis.com</span>
//               <span>Contact Form</span>

//               <div>
//                 <span>Torrel Limited </span>
//                 <span>2022 Wenlock Road</span>
//               </div>
//             </div>
//           </div>
//           <div className={classes.second}>
//             <h2>QIUCK LINKS</h2>
//             <div>
//               <span>Torrel Blog</span>
//               <span>Invoice Template</span>
//               <span>Business Plan</span>
//               <span>Credit Note</span>
//               <span>Small Business</span>
//             </div>
//           </div>
//           <div className={classes.third}>
//             <div>
//               <span>Help Center</span>
//               <span>Integration</span>
//               <span>Accounting </span>
//               <span>Sample Invoice </span>
//               <span>Find an accountant</span>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Landingpage;
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  useColorMode,
  Icon,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  FaFileInvoiceDollar,
  FaChartLine,
  FaUsers,
  FaCreditCard,
  FaGlobeAmericas,
  FaReceipt,
} from 'react-icons/fa';

const FeatureCard = ({ icon, title }) => (
  <VStack
    p={6}
    bg="white"
    borderRadius="md"
    boxShadow="md"
    align="center"
    justify="center"
    transition="transform 0.3s"
    _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
  >
    <Icon as={icon} w={10} h={10} color="blue.500" mb={3} />
    <Text fontWeight="semibold" textTransform="capitalize">
      {title}
    </Text>
  </VStack>
);

const SectionHeading = ({ title, description }) => (
  <VStack spacing={3} textAlign="center" mb={10}>
    <Heading as="h2" size="xl" fontWeight="bold">
      {title}
    </Heading>
    <Text color="gray.600" maxW="3xl" mx="auto">
      {description}
    </Text>
  </VStack>
);

const LandingPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (colorMode === 'dark') {
      toggleColorMode();
    }
  }, []);

  const handleNavigation = () => {
    if (user) {
      navigate('/dashboard/main');
    } else {
      navigate('/login');
    }
  };

  return (
    <Box bg="gray.50">
      {/* Nav Bar - Simplified */}
      <Navbar />

      {/* Hero Section */}
      <Box bg="brand.secondary" color="white" py={20}>
        <Container maxW="container.lg">
          <VStack spacing={6} textAlign="center">
            <Heading as="h1" size="2xl" fontWeight="bold" lineHeight="shorter">
              Invoicing That Helps Small Businesses Get Paid Faster
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              Streamline your billing process, track payments, and manage your clients with our
              intuitive invoicing platform designed for small businesses.
            </Text>
            <HStack spacing={4} pt={6}>
              <Button
                size="lg"
                bg="white"
                color="brand.primary"
                _hover={{ bg: 'gray.100' }}
                onClick={handleNavigation}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                _hover={{ bg: 'blue.600' }}
                onClick={() => navigate('/login')}
              >
                Try For Free
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={16}>
        <Container maxW="container.lg">
          <SectionHeading
            title="Enjoy Our Invoicing Features"
            description="Everything you need to manage your business finances in one place"
          />

          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
            <FeatureCard icon={FaFileInvoiceDollar} title="Send Invoices" />
            <FeatureCard icon={FaReceipt} title="Track Expenses" />
            <FeatureCard icon={FaChartLine} title="Create Reports" />
            <FeatureCard icon={FaUsers} title="Manage Clients" />
            <FeatureCard icon={FaCreditCard} title="Track Payments" />
            <FeatureCard icon={FaGlobeAmericas} title="Multi Currency" />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Key Benefits */}
      <Box bg="gray.100" py={16}>
        <Container maxW="container.lg">
          <VStack spacing={16}>
            <Box textAlign="center">
              <Heading as="h2" size="xl" mb={3}>
                Create professional invoices in seconds
              </Heading>
              <Text color="gray.600" maxW="2xl" mx="auto">
                Our easy-to-use templates help you craft professional invoices quickly, so you can
                focus on growing your business.
              </Text>
            </Box>

            <Box textAlign="center">
              <Heading as="h2" size="xl" mb={3}>
                Keep track of who's paid (and who hasn't)
              </Heading>
              <Text color="gray.600" maxW="2xl" mx="auto">
                Get real-time payment status updates and automated reminders to ensure you're always
                on top of your finances.
              </Text>
            </Box>

            <Box textAlign="center">
              <Heading as="h2" size="xl" mb={3}>
                Accept payments online
              </Heading>
              <Text color="gray.600" maxW="2xl" mx="auto">
                Make it easy for clients to pay you with integrated online payment options that
                deposit directly to your account.
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box py={16} textAlign="center">
        <Container maxW="container.md">
          <VStack spacing={8}>
            <Heading as="h2" size="xl">
              Spend less time creating and sending invoices
            </Heading>
            <Text fontSize="lg" color="gray.600">
              And more time on the things that matter. Sign up for our free trial. No credit card
              required.
            </Text>
            <HStack spacing={4}>
              <Button colorScheme="blue" size="lg" onClick={handleNavigation}>
                Get Started
              </Button>
              <Button
                variant="outline"
                colorScheme="blue"
                size="lg"
                onClick={() => navigate('/login')}
              >
                Try For Free
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.800" color="white" py={12}>
        <Container maxW="container.lg">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <VStack align="flex-start" spacing={4}>
              <Heading size="md">Inviz</Heading>
              <Text>hello@torrelalexis.com</Text>
              <Text>Torrel Limited</Text>
              <Text>2022 Wenlock Road</Text>
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Heading size="md">Quick Links</Heading>
              <Text cursor="pointer" _hover={{ color: 'blue.300' }}>
                Torrel Blog
              </Text>
              <Text cursor="pointer" _hover={{ color: 'blue.300' }}>
                Invoice Templates
              </Text>
              <Text cursor="pointer" _hover={{ color: 'blue.300' }}>
                Small Business Tips
              </Text>
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Heading size="md">Support</Heading>
              <Text cursor="pointer" _hover={{ color: 'blue.300' }}>
                Help Center
              </Text>
              <Text cursor="pointer" _hover={{ color: 'blue.300' }}>
                Integrations
              </Text>
              <Text cursor="pointer" _hover={{ color: 'blue.300' }}>
                Find an Accountant
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
