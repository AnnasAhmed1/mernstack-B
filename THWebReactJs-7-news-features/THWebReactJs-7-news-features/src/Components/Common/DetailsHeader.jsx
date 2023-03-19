import React from "react";
import FBLogo from "../../Assets/logo/facebook.png";
import EmailLogo from "../../Assets/logo/email.png";
import TeleLogo from "../../Assets/logo/telegram.png";
import TwitLogo from "../../Assets/logo/twitter.png";
import PintLogo from "../../Assets/logo/pinterest.png";
import { Link } from "react-router-dom";

// categories is the prop
function DetailsHeader({ categories = ["News & Features", "Art & Culture"] }) {
  return (
    <div className="detail-header">
      <p className="header-title">
        {categories?.map((category, i) => {
          return (
            <>
              {category}
              {categories.length !== i + 1 && (
                <span className="dot" key={i}></span>
              )}
            </>
          );
        })}
      </p>

      <div className="share-icon">
        <p>Share This: </p>
        <ul>
          <li>
            <Link to="#">
              <img src={FBLogo} alt="facebook" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={EmailLogo} alt="email" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={TeleLogo} alt="telegram" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={TwitLogo} alt="twitter" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={PintLogo} alt="pinterest" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DetailsHeader;
