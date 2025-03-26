import { useLocation, useParams } from 'react-router-dom';
import { useFetch } from '../../../../hooks/useFetch';
import styles from '../../allInvoices/allInvoice/AllInvoice.module.css';

const UserDetail = () => {
  // const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  // const allUserInvoicesUrl = `/api/v1/superadmin/users/${id}`;
  // const { data: allUserInvoices, isLoading, error } = useFetch(allUserInvoicesUrl, 'GET');

  return (
    <div className={styles.invoiceContainer}>
      <h1 style={{ textTransform: 'capitalize' }}>{state.name} Invoices</h1>

      <div className={styles.invoiceInfoTable}>
        {/* Invoice Info Table */}
        <div className={styles.invoiceInfo_dashboard_table}>
          <table>
            <thead>
              <tr className={styles.header__table}>
                <th>Client</th>
                <th>Date</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Project/Job</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5]?.map((invoice, i) => (
                <tr key={i} className={styles.body__row}>
                  <td>
                    <div className={styles.invoiceUserInfo}>
                      <div>
                        <span>firstName</span>
                        <span style={{ color: '#9BABC5' }}>invNumber</span>
                      </div>
                    </div>
                  </td>
                  <td>date o Issue</td>
                  <td>client Email</td>
                  <td>projectBudget</td>
                  <td style={{ color: '#9BABC5' }}>projectName</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
