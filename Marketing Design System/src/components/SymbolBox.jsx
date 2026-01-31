import PropTypes from "prop-types";

const SymbolBox = ({ className = "", symbol = "Icon" }) => {
  return (
    <div
      className={`absolute top-[0rem] left-[12.938rem] rounded-static-radius-lg bg-primary-yellow-range-color-ref-yellow-60- w-[4.5rem] h-[4.5rem] overflow-hidden flex flex-col items-center justify-center pt-[1.25rem] px-[1.25rem] pb-[1rem] box-border text-center text-[1.5rem] text-black font-saans ${className}`}
    >
      <h3 className="m-0 w-[2rem] h-[2.25rem] relative text-[length:inherit] leading-[2.25rem] font-semibold font-[inherit] flex items-center justify-center">
        1
      </h3>
    </div>
  );
};

SymbolBox.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  symbol: PropTypes.string,
};

export default SymbolBox;
