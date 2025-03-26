import React from 'react';
import classes from './TermsAndConditions.module.css';
import { Link, useNavigate } from 'react-router-dom';

function TermsAndConditions() {
  const navigate = useNavigate();
  return (
    <div className={classes.main}>
      <div className={classes.navbar}>
        <nav className={classes.navbar__nav}>
          <div className={classes.navbar__left}>
            <div className={classes.backIcon} onClick={() => navigate(-1)}>
              Go Back
            </div>
            <div className={classes.nav__logo}>
              <Link to="/">
                Home
                {/* <img src={torrelLogo} alt="" /> */}
              </Link>
            </div>
          </div>
          <div>
            {' '}
            <h1>Terms and Conditions</h1>{' '}
          </div>

          <div></div>
        </nav>
      </div>
      <div className={classes.terms}>
        <p>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque animi quam earum
          deleniti dolorum! Inventore vero perferendis porro commodi in veritatis est quia totam
          facilis repellendus, praesentium esse neque voluptatum obcaecati sit?
        </p>
        <p>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque animi quam earum
          deleniti dolorum! Inventore vero perferendis porro commodi in veritatis est quia totam
          facilis repellendus, praesentium esse neque voluptatum obcaecati sit?
        </p>
        <p>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque animi quam earum
          deleniti dolorum! Inventore vero perferendis porro commodi in veritatis est quia totam
          facilis repellendus, praesentium esse neque voluptatum obcaecati sit?
        </p>
        <p>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque animi quam earum
          deleniti dolorum! Inventore vero perferendis porro commodi in veritatis est quia totam
          facilis repellendus, praesentium esse neque voluptatum obcaecati sit?
        </p>
        <p>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque animi quam earum
          deleniti dolorum! Inventore vero perferendis porro commodi in veritatis est quia totam
          facilis repellendus, praesentium esse neque voluptatum obcaecati sit?
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
