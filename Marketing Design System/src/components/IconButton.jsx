import PropTypes from "prop-types";

const getEllipseStyle = (styleKey) => {
  switch (styleKey) {
    case "Default-Card Flip":
    case "Default-Play":
    case "Default-Pause":
      return "group-hover:bg-secondary-color-ref-neutral-90 group-active:bg-secondary-color-ref-neutral-70-";
    case "Disabled-Card Flip":
    case "Disabled-Play":
    case "Disabled-Pause":
      return "[&]:bg-secondary-color-ref-neutral-20";
  }
};
const getHandTouchIconStyle = (styleKey) => {
  switch (styleKey) {
    case "Default-Play":
    case "Default-Pause":
      return "[&]:[object-fit:unset] group-hover:[object-fit:unset] group-active:[object-fit:unset]";
    case "Default-Card Flip":
      return "group-active:object-cover";
    case "Disabled-Card Flip":
      return "[&]:object-cover";
    case "Disabled-Play":
    case "Disabled-Pause":
      return "[&]:[object-fit:unset]";
  }
};

const IconButton = ({
  className = "",
  state = "Default",
  type = "Card Flip",
  uIhandTouch,
}) => {
  const variantKey = [state, type].join("-");

  return (
    <div className={`w-[3.5rem] h-[3.5rem] relative group ${className}`}>
      <div
        className={`absolute w-full top-[0rem] right-[0%] left-[0%] rounded-num-50 bg-secondary-color-ref-neutral-100- h-[3.5rem] ${getEllipseStyle(variantKey)}`}
      />
      <img
        className={`absolute w-[57.14%] top-[calc(50%_-_16px)] right-[21.43%] left-[21.43%] max-w-full overflow-hidden h-[2rem] object-cover z-[1] ${getHandTouchIconStyle(variantKey)}`}
        loading="lazy"
        alt=""
        src={uIhandTouch}
      />
    </div>
  );
};

IconButton.propTypes = {
  className: PropTypes.string,
  uIhandTouch: PropTypes.string,

  /** Variant props */
  state: PropTypes.string,
  type: PropTypes.string,
};

export default IconButton;
