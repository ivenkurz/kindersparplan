import PropTypes from "prop-types";

const Default = ({ className = "" }) => {
  return (
    <div
      className={`w-[9rem] h-[3.5rem] flex items-start gap-[2rem] ${className}`}
    >
      <img
        className="h-[3.5rem] w-[3.5rem] relative z-[2]"
        loading="lazy"
        alt=""
        src="/Group-26090825.svg"
      />
      <img
        className="h-[3.5rem] w-[3.5rem] relative z-[1]"
        loading="lazy"
        alt=""
        src="/Group-260908243.svg"
      />
    </div>
  );
};

Default.propTypes = {
  className: PropTypes.string,
};

export default Default;
