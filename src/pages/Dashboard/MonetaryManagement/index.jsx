import { Link } from 'react-router-dom';
import styles from '../Clients/Client/Client.module.css';
// import threeDots from '../../../../images/threeDots.png';
// import SettingsIcon from '../../../../images/threeDots.png';

const sublinks = [
  { page: 'Targets', link: '/targets' },
  { page: 'Budgets', link: '/budgets' },
  { page: 'Achevied', link: '/Acheived' },
  { page: 'Refunds', link: '/refunds' },
  { page: 'Chargebacks', link: '/chargebacks' },
  { page: 'Expenses', link: '/expenses' },
];

const MonetarysManagement = () => {
  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <h1 style={{ fontSize: '2rem' }}>Monetary Management</h1>
      </div>
      {/* <div className={styles.project_dashboard_table}>
        <table>
          <thead>
            <tr className={styles.table__header}>
              <th>Full Name</th>
              <th>Pseudo Name</th>
              <th>Email</th>
              <th>US Number</th>
              <th>PK Number </th>
              <th>
                <img src={SettingsIcon} alt="SettingsIcon" />
              </th>
            </tr>
          </thead>

          <tbody className={styles.gfg}>
            {[1, 2, 3, 4].map((clients, id) => (
              <tr key={clients._id} className={styles.table__row}>
                <td style={{ color: '#6BDB65' }}>John</td>
                <td style={{ textTransform: 'capitalize' }}>Name</td>
                <td>info@gmail.com</td>
                <td>123 4567 8902</td>
                <td>123 4567 8902</td>
                <td>
                  <img
                    src={threeDots}
                    alt=""
                    style={{
                      cursor: 'pointer',
                      width: '25px',
                      objectFit: 'contain',
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className={styles.tabContainer}>
        {sublinks.map((e) => (
          <Link className={styles.eachTab} to={`/dashboard/monetary-managment${e.link}`}>
            {e.page}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MonetarysManagement;
