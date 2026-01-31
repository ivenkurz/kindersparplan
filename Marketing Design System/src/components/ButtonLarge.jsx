import PropTypes from "prop-types";

const getButtonLargeContainerStyle = (styleKey) => {
  switch (styleKey) {
    case "Default-Outlined":
      return "[&]:bg-[unset] [&]:[flex-shrink:unset] [&]:border-secondary-color-ref-neutral-100- [&]:border-solid [&]:border-[2px] [&]:z-[1] hover:bg-[unset] hover:[flex-shrink:unset] hover:border-secondary-color-ref-neutral-90 hover:border-solid hover:border-[2px] hover:z-[1] active:rounded-num-16 active:bg-[unset] active:[flex-shrink:unset] active:border-secondary-color-ref-neutral-70- active:border-solid active:border-[2px] active:z-[1]";
    case "Default-Secondary":
      return "[&]:bg-secondary-color-ref-neutral-100- [&]:[flex-shrink:unset] hover:bg-secondary-color-ref-neutral-90 hover:[flex-shrink:unset] active:rounded-num-16 active:bg-secondary-color-ref-neutral-70- active:[flex-shrink:unset]";
    case "Default-Primary":
      return "hover:bg-primary-orange-range-color-ref-orange-70 hover:shrink-0 active:rounded-num-16 active:bg-primary-orange-range-color-ref-orange-80 active:shrink-0";
    case "Disabled-Outlined":
      return "[&]:rounded-num-60 [&]:bg-[unset] [&]:[flex-shrink:unset] [&]:border-secondary-color-ref-neutral-20 [&]:border-solid [&]:border-[1px] [&]:z-[1]";
    case "Disabled-Secondary":
      return "[&]:rounded-num-60 [&]:bg-secondary-color-ref-neutral-20 [&]:[flex-shrink:unset]";
    case "Disabled-Primary":
      return "[&]:rounded-num-60 [&]:bg-secondary-color-ref-neutral-20 [&]:shrink-0";
  }
};
const getPrimaryButtonText3Style = (styleKey) => {
  switch (styleKey) {
    case "Default-Secondary":
      return "[&]:text-secondary-color-ref-neutral-0 group-hover:text-secondary-color-ref-neutral-0 group-active:text-secondary-color-ref-neutral-0";
    case "Default-Outlined":
      return "group-hover:text-secondary-color-ref-neutral-90 group-active:text-secondary-color-ref-neutral-70-";
    case "Default-Primary":
      return "group-hover:text-secondary-color-ref-neutral-100- group-active:text-secondary-color-ref-neutral-100-";
    case "Disabled-Outlined":
      return "[&]:text-secondary-color-ref-neutral-40";
    case "Disabled-Secondary":
    case "Disabled-Primary":
      return "[&]:text-secondary-color-ref-neutral-70-";
  }
};

const ButtonLarge = ({
  className = "",
  state = "Default",
  type = "Primary",
  primaryButton,
}) => {
  const variantKey = [state, type].join("-");

  return (
    <div
      className={`h-[3.75rem] rounded-num-60 bg-primary-orange-range-color-ref-orange-60- overflow-hidden shrink-0 flex items-center justify-center py-[1rem] px-[2rem] box-border text-center text-[1.25rem] text-secondary-color-ref-neutral-100- font-saans group ${getButtonLargeContainerStyle(variantKey)} ${className}`}
    >
      <h3
        className={`m-0 relative text-[length:inherit] leading-[1.625rem] font-semibold font-[inherit] ${getPrimaryButtonText3Style(variantKey)}`}
      >
        {primaryButton}
      </h3>
    </div>
  );
};

ButtonLarge.propTypes = {
  className: PropTypes.string,
  primaryButton: PropTypes.string,

  /** Variant props */
  state: PropTypes.string,
  type: PropTypes.string,
};

export default ButtonLarge;
