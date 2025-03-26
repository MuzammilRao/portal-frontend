import {
  FaHome,
  FaUsers,
  FaFileInvoice,
  FaProjectDiagram,
  FaBuilding,
  FaUserShield,
  FaTasks,
} from 'react-icons/fa';
import React, { lazy, Suspense } from 'react';
import Loader from '../components/Loader';
import Logs from '../pages/Dashboard/Logs';

const AddRoles = lazy(() => import('../pages/Dashboard/Roles/AddRole'));
const AllLeadInfo = lazy(() => import('../pages/Dashboard/Leads-Admin/LeadInfo'));
const AllLeads = lazy(() => import('../pages/Dashboard/Leads-Admin'));
const BrandForm = lazy(() => import('../pages/Dashboard/BrandManagement/BrandForm'));
const BrandManagement = lazy(() => import('../pages/Dashboard/BrandManagement/BrandManagement'));
const ClientForm = lazy(() => import('../pages/Dashboard/Clients/ClientForm'));
const ClientInvoice = lazy(() => import('../pages/ClientInvoice'));
const ClientManagement = lazy(() => import('../pages/Dashboard/ClientManagement'));
const ClientManagementForm = lazy(
  () => import('../pages/Dashboard/ClientManagement/ClientManagementForm'),
);
const ClientManagementInfo = lazy(
  () => import('../pages/Dashboard/ClientManagement/ClientManagementInfo'),
);
const Clients = lazy(() => import('../pages/Dashboard/Clients'));
const Clientinfo = lazy(() => import('../pages/Dashboard/Clients/Clientinfo'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const InvoiceComponent = lazy(() => import('../pages/Dashboard/Invoices'));
const InvoiceForm = lazy(() => import('../pages/Dashboard/Invoices/InvoiceForm'));
const InvoiceInfo = lazy(() => import('../pages/Dashboard/Invoices/InvoiceInfo'));
const InvoiceManagement = lazy(() => import('../pages/Dashboard/InvoiceManagement'));
const InvoiceManagementForm = lazy(
  () => import('../pages/Dashboard/InvoiceManagement/InvoiceManagementForm'),
);
const InvoiceManagementInfo = lazy(
  () => import('../pages/Dashboard/InvoiceManagement/InvoiceManagementInfo'),
);
const Landingpage = lazy(() => import('../pages/LandingPage/LandingPage'));
const LeadForm = lazy(() => import('../pages/Dashboard/Leads/LeadForm'));
const LeadInfo = lazy(() => import('../pages/Dashboard/Leads/LeadInfo'));
const Leads = lazy(() => import('../pages/Dashboard/Leads'));
const Login = lazy(() => import('../pages/Auth/Login/Login'));
const PaymentCancel = lazy(() => import('../pages/ClientInvoice/PaymentCancel'));
const ProjectForm = lazy(() => import('../pages/Dashboard/Projects/ProjectForm'));
const ProjectInfo = lazy(() => import('../pages/Dashboard/Projects/ProjectInfo'));
const ProjectManagement = lazy(
  () => import('../pages/Dashboard/ProjectManagement/ProjectManagement'),
);
const ProjectManagementForm = lazy(
  () => import('../pages/Dashboard/ProjectManagement/ProjectManagementForm'),
);
const ProjectManagementInfo = lazy(
  () => import('../pages/Dashboard/ProjectManagement/ProjectManagementInfo'),
);
const Projects = lazy(() => import('../pages/Dashboard/Projects'));
const Roles = lazy(() => import('../pages/Dashboard/Roles'));
const Signup = lazy(() => import('../pages/Auth/Signup/Signup'));
const StripeCompletion = lazy(() => import('../pages/ClientInvoice/Stripe/StripeCompletion'));
const Thankyou = lazy(() => import('../pages/ClientInvoice/Thankyou/Thankyou'));
const UpdateUsersManagment = lazy(() => import('../pages/Dashboard/UpdateUsersManagment'));
const UsersManagment = lazy(() => import('../pages/Dashboard/usersManagment'));
const Expense = lazy(() => import('../pages/Dashboard/Expense'));

const routesConfig = [
  {
    id: 'completion',
    screenName: 'completion',
    path: '/completion',
    element: (
      <Suspense fallback={<Loader />}>
        <StripeCompletion />
      </Suspense>
    ),
    authRequired: false,
  },
  {
    id: 'payment_cancel',
    screenName: 'Payment Cancel',
    path: '/payment_cancel',
    element: (
      <Suspense fallback={<Loader />}>
        <PaymentCancel />
      </Suspense>
    ),
    authRequired: false,
  },
  {
    id: 'payment-success',
    screenName: 'Thankyou',
    path: '/payment_success',
    element: (
      <Suspense fallback={<Loader />}>
        <Thankyou />
      </Suspense>
    ),
    authRequired: false,
  },
  {
    id: 'clientinvoice',
    screenName: 'ClientInvoice',
    path: '/invoice/payment-link/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <ClientInvoice />
      </Suspense>
    ),
    authRequired: false,
  },
  {
    id: 'landingpage',
    screenName: 'LandingPage',
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Landingpage />
      </Suspense>
    ),
    authRequired: false,
  },
  {
    id: 'signup',
    screenName: 'Signup',
    path: '/signup/:token',
    element: (
      <Suspense fallback={<Loader />}>
        <Signup />
      </Suspense>
    ),
    authRequired: false,
  },
  {
    id: 'login',
    screenName: 'Login',
    path: '/login',
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
    authRequired: false,
  },
  {
    id: 'dashboard',
    screenName: 'Dashboard',
    path: '/dashboard/main',
    element: (
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    ),
    icon: <FaHome />,
    authRequired: true,
  },
  {
    id: 'expense',
    screenName: 'Expense',
    path: '/dashboard/expense',
    element: (
      <Suspense fallback={<Loader />}>
        <Expense />
      </Suspense>
    ),
    icon: <FaHome />,
    authRequired: true,
  },
  // Clients and Client Management
  {
    id: 'clients',
    screenName: 'Clients',
    path: '/dashboard/clients',
    element: (
      <Suspense fallback={<Loader />}>
        <Clients />
      </Suspense>
    ),
    icon: <FaUsers />,
    authRequired: true,
  },
  {
    id: 'client-form',
    screenName: 'Add Client',
    path: '/dashboard/clients/add',
    element: (
      <Suspense fallback={<Loader />}>
        <ClientForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'client-update',
    screenName: 'Update Client',
    path: '/dashboard/clients/update/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <ClientForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'client-info',
    screenName: 'Client Info',
    path: '/dashboard/clients/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <Clientinfo />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'client-management',
    screenName: 'Client Management',
    path: '/dashboard/client-managment',
    element: (
      <Suspense fallback={<Loader />}>
        <ClientManagement />
      </Suspense>
    ),
    icon: <FaUsers />,
    authRequired: true,
  },
  {
    id: 'client-management-form',
    screenName: 'Add Client Management',
    path: '/dashboard/client-managment/add',
    element: (
      <Suspense fallback={<Loader />}>
        <ClientManagementForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'client-management-update',
    screenName: 'Update Client Management',
    path: '/dashboard/client-managment/update/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <ClientManagementForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'client-management-info',
    screenName: 'Client Management Info',
    path: '/dashboard/client-managment/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <ClientManagementInfo />
      </Suspense>
    ),
    authRequired: true,
  },
  // Projects and Project Management
  {
    id: 'projects',
    screenName: 'Projects',
    path: '/dashboard/projects',
    element: (
      <Suspense fallback={<Loader />}>
        <Projects />
      </Suspense>
    ),
    icon: <FaProjectDiagram />,
    authRequired: true,
  },
  {
    id: 'project-form',
    screenName: 'Add Project',
    path: '/dashboard/projects/add',
    element: (
      <Suspense fallback={<Loader />}>
        <ProjectForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'project-update',
    screenName: 'Update Project',
    path: '/dashboard/projects/update/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <ProjectForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'project-info',
    screenName: 'Project Info',
    path: '/dashboard/projects/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <ProjectInfo />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'project-management',
    screenName: 'Project Management',
    path: '/dashboard/project-managment',
    element: (
      <Suspense fallback={<Loader />}>
        <ProjectManagement />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'project-management-form',
    screenName: 'Add Project Management',
    path: '/dashboard/project-managment/add',
    element: (
      <Suspense fallback={<Loader />}>
        <ProjectManagementForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'project-management-update',
    screenName: 'Update Project Management',
    path: '/dashboard/project-managment/update/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <ProjectManagementForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'project-management-info',
    screenName: 'Project Management Info',
    path: '/dashboard/project-managment/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <ProjectManagementInfo />
      </Suspense>
    ),
    authRequired: true,
  },
  // Invoices and Invoice Management
  {
    id: 'invoices',
    screenName: 'Invoices',
    path: '/dashboard/invoices',
    element: (
      <Suspense fallback={<Loader />}>
        <InvoiceComponent />
      </Suspense>
    ),
    icon: <FaFileInvoice />,
    authRequired: true,
  },
  {
    id: 'invoice-form',
    screenName: 'Add Invoice',
    path: '/dashboard/invoices/add',
    element: (
      <Suspense fallback={<Loader />}>
        <InvoiceForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'invoice-update',
    screenName: 'Update Invoice',
    path: '/dashboard/invoices/update/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <InvoiceForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'invoice-info',
    screenName: 'Invoice Info',
    path: '/dashboard/invoices/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <InvoiceInfo />
      </Suspense>
    ),
    authRequired: true,
  },
  // Invoice Management
  {
    id: 'invoice-management',
    screenName: 'Invoice Management',
    path: '/dashboard/invoice-managment',
    element: (
      <Suspense fallback={<Loader />}>
        <InvoiceManagement />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'invoice-management-form',
    screenName: 'Add Invoice Management',
    path: '/dashboard/invoice-managment/add',
    element: (
      <Suspense fallback={<Loader />}>
        <InvoiceManagementForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'invoice-management-update',
    screenName: 'Update Invoice Management',
    path: '/dashboard/invoice-managment/update/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <InvoiceManagementForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'invoice-management-info',
    screenName: 'Invoice Management Info',
    path: '/dashboard/invoice-managment/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <InvoiceManagementInfo />
      </Suspense>
    ),
    authRequired: true,
  },
  // Brand Management
  {
    id: 'brand-management',
    screenName: 'Brand Management',
    path: '/dashboard/brand-managment',
    element: (
      <Suspense fallback={<Loader />}>
        <BrandManagement />
      </Suspense>
    ),
    icon: <FaBuilding />,
    authRequired: true,
  },
  {
    id: 'brand-form',
    screenName: 'Add Brand',
    path: '/dashboard/brand-managment/add',
    element: (
      <Suspense fallback={<Loader />}>
        <BrandForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'brand-update',
    screenName: 'Update Brand',
    path: '/dashboard/brand-managment/update/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <BrandForm />
      </Suspense>
    ),
    authRequired: true,
  },
  // Users Management
  {
    id: 'users-management',
    screenName: 'Users Management',
    path: '/dashboard/user-managment',
    element: (
      <Suspense fallback={<Loader />}>
        <UsersManagment />
      </Suspense>
    ),
    icon: <FaUsers />,
    authRequired: true,
  },
  {
    id: 'user-update',
    screenName: 'Update User',
    path: '/dashboard/user-managment/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <UpdateUsersManagment />
      </Suspense>
    ),
    authRequired: true,
  },
  // Roles
  {
    id: 'roles',
    screenName: 'Roles',
    path: '/dashboard/roles',
    element: (
      <Suspense fallback={<Loader />}>
        <Roles />
      </Suspense>
    ),
    icon: <FaUserShield />,
    authRequired: true,
  },
  {
    id: 'add-role',
    screenName: 'Add Role',
    path: '/dashboard/roles/add',
    element: (
      <Suspense fallback={<Loader />}>
        <AddRoles />
      </Suspense>
    ),
    authRequired: true,
  },
  // Leads and All Leads
  {
    id: 'leads',
    screenName: 'Leads',
    path: '/dashboard/leads',
    element: (
      <Suspense fallback={<Loader />}>
        <Leads />
      </Suspense>
    ),
    icon: <FaTasks />,
    authRequired: true,
  },
  {
    id: 'leads-add',
    screenName: 'Add Lead',
    path: '/dashboard/leads/add',
    element: (
      <Suspense fallback={<Loader />}>
        <LeadForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'lead-update',
    screenName: 'Update Lead',
    path: '/dashboard/leads/update/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <LeadForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'lead-info',
    screenName: 'Lead Info',
    path: '/dashboard/leads/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <LeadInfo />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'all-leads',
    screenName: 'All Leads',
    path: '/dashboard/all-leads',
    element: (
      <Suspense fallback={<Loader />}>
        <AllLeads />
      </Suspense>
    ),
    icon: <FaTasks />,
    authRequired: true,
  },
  {
    id: 'all-leads-add',
    screenName: 'Add All Leads',
    path: '/dashboard/all-leads/add',
    element: (
      <Suspense fallback={<Loader />}>
        <LeadForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'all-leads-update',
    screenName: 'Update All Leads',
    path: '/dashboard/all-leads/update/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <LeadForm />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'all-lead-info',
    screenName: 'All Lead Info',
    path: '/dashboard/all-leads/:id',
    element: (
      <Suspense fallback={<Loader />}>
        <AllLeadInfo />
      </Suspense>
    ),
    authRequired: true,
  },
  {
    id: 'logs',
    screenName: '',
    path: '/dashboard/logs',
    element: (
      <Suspense fallback={<Loader />}>
        <Logs />
      </Suspense>
    ),
    authRequired: true,
  },
];

export default routesConfig;
