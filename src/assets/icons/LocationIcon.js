const LocationIcon = ({
  style = {},
  fill = "white",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 20 22"
}) => (
  <svg
    style={style}
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon ${className || ""}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.98888 2C8.47481 2 6.99473 2.44897 5.73582 3.29014C4.47691 4.1313 3.4957 5.32689 2.91627 6.7257C2.33684 8.12452 2.18521 9.66374 2.48057 11.1487C2.77591 12.6337 3.50494 13.9977 4.57547 15.0683C4.5755 15.0683 4.57544 15.0683 4.57547 15.0683L9.16715 19.6589C9.27504 19.7669 9.40359 19.853 9.5446 19.9115C9.68562 19.9699 9.83677 20 9.98942 20C10.1421 20 10.2932 19.9699 10.4342 19.9115C10.5753 19.853 10.7034 19.7673 10.8113 19.6593L15.4022 15.0684C15.4022 15.0684 15.4022 15.0684 15.4022 15.0684C16.4728 13.9978 17.2018 12.6337 17.4972 11.1487C17.7925 9.66374 17.6409 8.12452 17.0615 6.7257C16.4821 5.32689 15.5009 4.1313 14.2419 3.29014C12.983 2.44897 11.503 2 9.98888 2ZM4.62469 1.62719C6.2125 0.566266 8.07925 0 9.98888 0C11.8985 0 13.7653 0.566265 15.3531 1.62719C16.9409 2.68812 18.1784 4.19605 18.9092 5.96031C19.6401 7.72457 19.8313 9.66592 19.4588 11.5389C19.0863 13.4118 18.1667 15.1322 16.8164 16.4826L12.2262 21.0729C12.2261 21.073 12.2263 21.0727 12.2262 21.0729C11.9326 21.3666 11.5837 21.6 11.2001 21.759C10.8163 21.9181 10.4049 22 9.98942 22C9.57396 22 9.16257 21.9181 8.77878 21.759C8.39497 21.5999 8.0463 21.3668 7.75267 21.0729L3.16142 16.4827C1.81114 15.1323 0.891504 13.4118 0.518989 11.5389C0.146475 9.66592 0.337713 7.72457 1.06852 5.96031C1.79933 4.19605 3.03688 2.68812 4.62469 1.62719ZM9.98888 7.4093C9.39326 7.4093 8.82204 7.64591 8.40088 8.06707C7.97972 8.48823 7.74311 9.05945 7.74311 9.65507C7.74311 10.2507 7.97972 10.8219 8.40088 11.2431C8.82204 11.6642 9.39326 11.9008 9.98888 11.9008C10.5845 11.9008 11.1557 11.6642 11.5769 11.2431C11.998 10.8219 12.2346 10.2507 12.2346 9.65507C12.2346 9.05945 11.998 8.48823 11.5769 8.06707C11.1557 7.64591 10.5845 7.4093 9.98888 7.4093ZM6.98667 6.65286C7.7829 5.85662 8.86283 5.4093 9.98888 5.4093C11.1149 5.4093 12.1949 5.85662 12.9911 6.65286C13.7873 7.44909 14.2346 8.52902 14.2346 9.65507C14.2346 10.7811 13.7873 11.861 12.9911 12.6573C12.1949 13.4535 11.1149 13.9008 9.98888 13.9008C8.86283 13.9008 7.7829 13.4535 6.98667 12.6573C6.19043 11.861 5.74311 10.7811 5.74311 9.65507C5.74311 8.52902 6.19043 7.44909 6.98667 6.65286Z"
      fill={fill}
    />
  </svg>
);

export default LocationIcon;
