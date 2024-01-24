import React from 'react';
import './Footer.css';

const SwagLabsFooter = () => {
  return (
    <footer className="footer">
      {/* <div className="footer_container"> */}
      <ul className="social">
        <li className="social_twitter" data-cy="twitter">
          <a
            href="https://twitter.com/saucelabs"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </li>
        <li className="social_facebook" data-cy="facebook">
          <a
            href="https://www.facebook.com/saucelabs"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </li>
        <li className="social_linkedin" data-cy="linkedin">
          <a
            href="https://www.linkedin.com/company/sauce-labs/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </li>
      </ul>

      <div className="footer_copy" data-cy="copyrights">
        &copy; {new Date().getFullYear()} Sauce Labs. All Rights Reserved. Terms
        of Service | Privacy Policy
      </div>
      {/* </div> */}
    </footer>
  );
};

export default SwagLabsFooter;
