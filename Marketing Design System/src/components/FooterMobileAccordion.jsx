import PropTypes from "prop-types";

const FooterMobileAccordion = ({ className = "", status1 = "closed" }) => {
  return (
    <div
      className={`w-[20.375rem] flex items-center gap-[1rem] text-left text-[1.5rem] text-primary-yellow-range-color-ref-yellow-10- font-saans ${className}`}
    >
      <h3 className="m-0 w-[17.813rem] relative text-[length:inherit] leading-[2.25rem] font-semibold font-[inherit] inline-block shrink-0">
        Footer Accordion closed
      </h3>
      <img
        className="h-[1.5rem] w-[1.5rem] relative"
        alt=""
        src="/UI-plus.svg"
      />
    </div>
  );
};

FooterMobileAccordion.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  status1: PropTypes.string,
};

export default FooterMobileAccordion;
