const CONSTANTS = Object.freeze({
  ImportApi: 'https://staging.app.zusodental.com/api/',
  // api: 'http://10.1.1.16:5000/api/v1/',
   api: 'https://payment-terminal-7f21383129bf.herokuapp.com/api/v1/',
  // api: 'http://localhost:5002/api/v1/',

  modules: {
    ADMIN_USER: 'admin-users',
    DASHBOARD: 'dashboard',
    ADMIN_LEADS: 'admin-leads',
    LEADS: 'leads',
    ADMIN_CLIENTS: 'admin-clients',
    ADMIN_BRANDS: 'admin-brands',
    CLIENTS: 'clients',
    ADMIN_PROJECTS: 'admin-projects',
    ADMIN_INVOICES: 'admin-invoices',
    // ADMIN_MONETARY: 'admin-monetary',
    PROJECTS: 'projects',
    INVOICES: 'invoices',
    ITEMS: 'items',
    ROLES_AND_PERMISSIONS: 'RolesAndPermissions',
    LOGS: 'logs',
    EXPENSE: 'expense',
  },

  leadStatus: {
    ASSIGNED: 'assigned',
    UN_ASSIGNED: 'un-assigned',
    HOT_LEAD: 'hot-lead',
    NURCHERING: 'nurchering',
    PROSPECTING: 'prospectering',
    CLOSED: 'closed',
    DEAD: 'dead',
    DNC_DHU: 'dnc/dhu',
  },

  modalStyles: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      padding: '0px',
    },
  },

  // merchants: {
  //   WI_STRIPE: 'INVENTIX_STRIPE',
  //   WC_STRIPE: 'WC_STRIPE',
  //   WIZ_PUB_STRIPE: 'WIZ_PUB_STRIPE',
  //   WP_MONERIS: 'WP_MONERIS',
  //   WI_MONERIS: 'WI_MONERIS',
  //   WI_MONERIS_CA: 'WI_MONERIS_CA',
  // },

   merchants: {
    WI_STRIPE: 'INVENTIX_STRIPE',
    WC_STRIPE: 'CRAFT_STRIPE',
    WIZ_PUB_STRIPE: 'WIZ_PUBLISHING_STRIPE',
    WP_MONERIS: 'WIZ_PUBLISHING_MONERIS',
    WI_MONERIS: 'INVENTIX_MONERIS',
    WI_MONERIS_CA: 'INVENTIX_MONERIS_CA',
    WC_MONERIS: 'CRAFT_MONERIS',
  },
});

export default CONSTANTS;


//  merchants: {
//     WI_STRIPE: 'INVENTIX_STRIPE',
//     WC_STRIPE: 'CRAFT_STRIPE',
//     WIZ_PUB_STRIPE: 'WIZ_PUBLISHING_STRIPE',
//     WP_MONERIS: 'WIZ_PUBLISHING_MONERIS',
//     WI_MONERIS: 'INVENTIX_MONERIS',
//     WI_MONERIS_CA: 'INVENTIX_MONERIS_CA',
//   },


