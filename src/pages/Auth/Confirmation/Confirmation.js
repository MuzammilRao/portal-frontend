import AuthHeading from '../../../components/AuthHeading/AuthHeading';
import classes from './Confirmation.module.css';

const Confirmation = () => {
  return (
    <div className={classes.confirmContainer}>
      <div className={classes.confirmInner}>
        <center>{/* <img src={inbox} alt="" /> */}</center>

        <AuthHeading
          headingTitle="Email Confirmation"
          headingText="See your growth finance here and let see your profit you get now"
        />

        <div className={classes.checkbox}>
          <input type="checkbox" />
          <span>Accept all applicable terms and conditions </span>
        </div>
        <center>
          <button>Verify your email</button>
        </center>
      </div>
    </div>
  );
};

export default Confirmation;
