/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
// Services
import "react-toastify/dist/ReactToastify.css";

// Redux

// Styled Elements
import { LoginStyles } from "assets/styles/auth";

// Images
import TikmanLogo from "assets/images/auth/tikman-logo.svg";

const PageOne = ({ page, setPage }) => {
  useEffect(() => {
    if (localStorage.getItem("firstTime") === null) {
      setTimeout(() => page === 1 && setPage(2), 2000);
    } else {
      setTimeout(() => page === 1 && setPage(3), 2000);
    }
  }, []);

  return (
    <LoginStyles.PageOneBody
    // onClick={() => {
    //   setPage(2);
    // }}
    >
      <LoginStyles.PageOneImage>
        <img src={TikmanLogo} alt="TikmanLogo" />
      </LoginStyles.PageOneImage>
      <LoginStyles.PageOneDetail>
        <div style={{ color: "#e67205", fontSize: "9vh", fontWeight: "400" }}>
          تیک‌من
        </div>
        <div style={{ color: "#183573", fontSize: "7vh", fontWeight: "300" }}>
          دستیار من
        </div>
      </LoginStyles.PageOneDetail>
    </LoginStyles.PageOneBody>
  );
};

export default PageOne;
