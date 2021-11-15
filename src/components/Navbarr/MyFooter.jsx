import "./topnav.css";
const MyFooter = () => {
  return (
    <div className="footer-box position-relative">
      <footer>
        <svg
          viewBox="0 -20 700 110"
          width="100%"
          height="110"
          preserveAspectRatio="none"
        >
          <path
            transform="translate(0, -20)"
            d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700"
            fill="#CEB964"
          />
          <path
            d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z"
            fill="#E6E7E9"
          />
        </svg>
      </footer>
    </div>
  );
};
export default MyFooter;
