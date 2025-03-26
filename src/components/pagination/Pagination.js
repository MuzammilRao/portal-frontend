import React, { useEffect, useMemo, useState } from 'react';
import styles from './pagination.module.css';

const Pagination = ({
  // invPerPage,
  // totalInvoices,
  // paginate,
  // setCurrentPage,
  setCurrentInvoices,
  allInvoices,
  invsPerPage,
}) => {
  const [currectPage, setCurrentPage] = useState(1);
  const [invPerPage] = useState(invsPerPage || 10);

  let currentInvoices;

  const indexOfLastInvoice = currectPage * invPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invPerPage;

  // caching value and recalculating only allinvoices and current page changes
  const memoizedCurrentInvoices = useMemo(
    () => (currentInvoices = allInvoices?.slice(indexOfFirstInvoice, indexOfLastInvoice)),
    [allInvoices, currectPage],
  );

  const totalInvoices = allInvoices?.length;

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalInvoices / invPerPage); i++) {
    pageNumber.push(i);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    setCurrentInvoices(memoizedCurrentInvoices);
  }, [allInvoices]);

  // console.log("pageNumber>>>", pageNumber.length);
  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumber.length > 1
          ? pageNumber.map((number) => (
              <li className={styles.page_item} key={number}>
                <a href="#" onClick={() => paginate(number)} className={styles.page_link}>
                  {number}
                </a>
              </li>
            ))
          : null}
      </ul>
    </nav>
  );
};

export default Pagination;
