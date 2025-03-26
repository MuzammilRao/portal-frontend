import React, { useEffect, useState } from 'react';
import styles from './Project.module.css';
import plusIcon from '../../../../images/plusIcon.png';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { api } from '../../../../services/api';
import threeDots from '../../../../images/threeDots.png';
import { useInvoiceContext } from '../../../../hooks/useInvoiceContext';
import { ToastContainer, toast } from 'react-toastify';
import { useFetch } from '../../../../hooks/useFetch';
import CurrencyFormatter from '../../../../utils/currencyFormatter';
// import { useRef } from 'react';

import { ArrowLeft, Settings } from 'lucide-react';

const Project = () => {
  const { id } = useParams();

  const projectUrl = `/api/v1/jobs/client/${id}`;

  // console.log('projectUrl>>>>', projectUrl);
  const { data: allProjects, isLoading, error } = useFetch(projectUrl, 'GET');
  const [activeBtn1, setActiveBtn1] = useState(true);
  const [activeBtn2, setActiveBtn2] = useState(false);
  const [activeBtn3, setActiveBtn3] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const { dispatch, allJobs } = useInvoiceContext();
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: 'GET_ALL_JOBS',
      payload: allProjects?.data,
    });
  }, [dispatch, allProjects]);

  const handleShowPopup = (id) => {
    const newJobs = allJobs?.map((job) => {
      if (job._id === id) {
        return { ...job, isSelected: !job.isSelected };
      } else {
        return job;
      }
    });

    dispatch({
      type: 'GET_ALL_JOBS',
      payload: newJobs,
    });
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(`/api/v1/jobs/${id}`);

      if (data) {
        console.log('data>>>>', data);
        dispatch({
          type: 'DELETE__JOBS',
          payload: id,
        });
        showToastMessage('Job Deleted Sucessfully.');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getByDate = async (value) => {
    const date = new Date().toJSON();

    setSelectedOption(value);
    try {
      const { data } = await api.get(`/api/v1/jobs/client/${id}?date=${date}&type=${value}`);

      if (data) {
        dispatch({
          type: 'GET_BY_DATE',
          payload: data?.data,
        });
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  // FUNCTION FOR TOAST MESSAGE
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const fetchTypeViceJobs = async (url) => {
    const data = await fetchQueryJobs(url);

    dispatch({
      type: 'GET_ALL_JOBS',
      payload: data?.data,
    });

    let newUrl = url.split('=')[1];
    if (newUrl === 'incomplete') {
      setActiveBtn1(false);
      setActiveBtn2(true);
      setActiveBtn3(false);
    }
    if (newUrl === 'complete') {
      setActiveBtn1(false);
      setActiveBtn2(false);
      setActiveBtn3(true);
    }
  };

  const fetchAllJobs = () => {
    setActiveBtn1(true);
    setActiveBtn2(false);
    setActiveBtn3(false);
    dispatch({
      type: 'GET_ALL_JOBS',
      payload: allProjects?.data,
    });
  };

  const fetchQueryJobs = async (url) => {
    try {
      const { data } = await api.get(url);
      if (data) {
        return data;
      }
    } catch (error) {}
  };

  const handleCompleteJob = async (id) => {
    try {
      const { data } = await api.patch(`/api/v1/jobs/${id}?status="complete"`);
      if (data) {
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Project</h1>
        <Link style={{ color: '#fff' }} onClick={() => navigate(-1)}>
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#1B9DE4',
            }}
          >
            <ArrowLeft fontSize={'2rem'} />
            Back
          </h2>
        </Link>
      </div>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <button
            onClick={fetchAllJobs}
            style={{
              backgroundColor: activeBtn1 && '#1B9DE4',
              color: activeBtn1 && '#ffffff',
            }}
          >
            All
          </button>
          <button
            onClick={() => fetchTypeViceJobs(`/api/v1/jobs/client/${id}?isCompleted=incomplete`)}
            style={{
              backgroundColor: activeBtn2 && '#1B9DE4',
              color: activeBtn2 && '#ffffff',
            }}
          >
            Ongoing
          </button>
          <button
            onClick={() => fetchTypeViceJobs(`/api/v1/jobs/client/${id}?isCompleted=complete`)}
            style={{
              backgroundColor: activeBtn3 && '#1B9DE4',
              color: activeBtn3 && '#ffffff',
            }}
          >
            Finished
          </button>
        </div>

        <div className={styles.topRight}>
          <select value={selectedOption} onChange={(e) => getByDate(e.target.value)} name="" id="">
            <option value="today">Today</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <Link to={`/dashboard/projects/create/${id}`} className={styles.btn}>
            <img src={plusIcon} alt="" />
            <span>Create</span>
          </Link>
        </div>
      </div>

      {/********* Tables *************/}

      <div className={styles.project_dashboard_table}>
        {isLoading && <h1 className={styles.isLoading}>Loading...</h1>}
        {error && <div className={styles.error}>{error.message}</div>}
        {allJobs?.length === 0 && (
          <div
            style={{
              width: '100%',
              fontSize: '1.7rem',

              marginTop: '3rem',
              color: '#0C4767',
            }}
          >
            No jobs yet, Please Add One.
          </div>
        )}
        {!error && !isLoading && allJobs?.length !== 0 && (
          <table>
            <thead>
              <tr className={styles.table__header}>
                <th>Project Name</th>
                <th>Project Budget</th>

                <th>Status</th>
                <th>Action</th>
                <th>
                  <Settings style={{ color: '#ffffff', height: '20px' }} />
                </th>
              </tr>
            </thead>
            {console.log('allJobs>>>>', allJobs)}
            <tbody className={styles.gfg}>
              {allJobs &&
                allJobs?.map((jobs, id) => (
                  <tr key={jobs._id} className={styles.table__row}>
                    {/* MODAL_FOR_JOB_COMPLETETION */}

                    <td
                      onClick={() =>
                        navigate('/dashboard/projectDetails', {
                          state: { jobDetail: jobs, path: pathname },
                        })
                      }
                    >
                      {jobs?.projectName}
                    </td>
                    <td
                      onClick={() =>
                        navigate('/dashboard/projectDetails', {
                          state: { jobDetail: jobs, path: pathname },
                        })
                      }
                      style={{ color: '#6BDB65' }}
                    >
                      <CurrencyFormatter amount={jobs?.projectBudget} />
                    </td>

                    <td
                      onClick={() =>
                        navigate('/dashboard/projectDetails', {
                          state: { jobDetail: jobs, path: pathname },
                        })
                      }
                      style={{ textTransform: 'capitalize' }}
                    >
                      {jobs?.isCompleted === 'complete' ? 'Completed' : 'Incomplete'}
                    </td>
                    {jobs?.isCompleted === 'incomplete' ? (
                      <td className={styles.select_btn}>
                        <button onClick={() => handleCompleteJob(jobs?._id)}>Complete Job</button>
                      </td>
                    ) : (
                      <td className={styles.select_btn}>
                        <button disabled style={{ opacity: '0.5' }}>
                          Complete Job
                        </button>
                      </td>
                    )}
                    <td>
                      <img
                        src={threeDots}
                        alt=""
                        style={{ cursor: 'pointer', height: '28px' }}
                        onClick={() => handleShowPopup(jobs?._id)}
                      />

                      {jobs.isSelected && (
                        <div
                          className={styles.popup1}
                          style={{
                            zIndex: '999',
                            position: 'absolute',
                            color: 'grey',
                            right: '20px',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            boxShadow: '0px 1px 5px -1px rgba(0, 0, 0, 0.75)',
                            borderRadius: '8px',
                          }}
                        >
                          <div
                            onClick={() =>
                              navigate(`/dashboard/invoices/${jobs._id}`, {
                                state: {
                                  client: jobs?.client?._id,
                                  projectName: jobs?.projectName,
                                },
                              })
                            }
                          >
                            Invoice
                          </div>
                          <div onClick={() => handleDelete(jobs._id)}>Delete</div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Project;
