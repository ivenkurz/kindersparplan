import PropTypes from "prop-types";

const getEllipseStyle = (styleKey) => {
  switch (styleKey) {
    case "1-3":
      return "[&]:bg-secondary-color-ref-neutral-70-";
  }
};
const getEllipse1Style = (styleKey) => {
  switch (styleKey) {
    case "1-3":
      return "[&]:bg-secondary-color-ref-neutral-70-";
  }
};
const getEllipse2Style = (styleKey) => {
  switch (styleKey) {
    case "1-3":
      return "[&]:bg-secondary-color-ref-neutral-70-";
  }
};
const getEllipse3Style = (styleKey) => {
  switch (styleKey) {
    case "1-3":
      return "[&]:bg-secondary-color-ref-neutral-70-";
  }
};
const getEllipse4Style = (styleKey) => {
  switch (styleKey) {
    case "1-3":
      return "[&]:bg-secondary-color-ref-neutral-70-";
  }
};
const getEllipse5Style = (styleKey) => {
  switch (styleKey) {
    case "1-3":
      return "[&]:bg-secondary-color-ref-neutral-70-";
  }
};
const getEllipse6Style = (styleKey) => {
  switch (styleKey) {
    case "1-3":
      return "[&]:bg-secondary-color-ref-neutral-70-";
  }
};
const getEllipse7Style = (styleKey) => {
  switch (styleKey) {
    case "1-3":
      return "[&]:bg-secondary-color-ref-neutral-70-";
  }
};

const Spinner = ({ className = "", state = 1, type = 1 }) => {
  const variantKey = [state, type].join("-");

  return (
    <div className={`h-[1.75rem] w-[1.75rem] relative ${className}`}>
      <div
        className={`absolute h-[16.79%] w-[16.79%] top-[58.21%] right-[-16.79%] bottom-[25%] left-[100%] rounded-num-50 bg-secondary-color-ref-neutral-0 [transform:_rotate(-180deg)] [transform-origin:0_0] ${getEllipseStyle(variantKey)}`}
      />
      <div
        className={`absolute h-[16.79%] w-[16.79%] top-[58.21%] right-[66.43%] bottom-[25%] left-[16.79%] rounded-num-50 bg-secondary-color-ref-neutral-0 [transform:_rotate(-180deg)] [transform-origin:0_0] ${getEllipse1Style(variantKey)}`}
      />
      <div
        className={`absolute h-[16.79%] w-[16.79%] top-[100%] right-[25%] bottom-[-16.79%] left-[58.21%] rounded-num-50 bg-secondary-color-ref-neutral-0 [transform:_rotate(-180deg)] [transform-origin:0_0] ${getEllipse2Style(variantKey)}`}
      />
      <div
        className={`absolute h-[16.79%] w-[16.79%] top-[16.79%] right-[25%] bottom-[66.43%] left-[58.21%] rounded-num-50 bg-secondary-color-ref-neutral-0 [transform:_rotate(-180deg)] [transform-origin:0_0] ${getEllipse3Style(variantKey)}`}
      />
      <div
        className={`absolute h-[16.79%] w-[16.79%] top-[91.07%] right-[62.5%] bottom-[-7.86%] left-[20.71%] rounded-num-50 bg-secondary-color-ref-neutral-0 [transform:_rotate(-135deg)] [transform-origin:0_0] ${getEllipse4Style(variantKey)}`}
      />
      <div
        className={`absolute h-[16.79%] w-[16.79%] top-[32.5%] right-[3.93%] bottom-[50.71%] left-[79.29%] rounded-num-50 bg-secondary-color-ref-neutral-0 [transform:_rotate(-135deg)] [transform-origin:0_0] ${getEllipse5Style(variantKey)}`}
      />
      <div
        className={`absolute h-[16.79%] w-[16.79%] top-[20.71%] right-[74.29%] bottom-[62.5%] left-[8.93%] rounded-num-50 bg-secondary-color-ref-neutral-0 [transform:_rotate(-45deg)] [transform-origin:0_0] ${getEllipse6Style(variantKey)}`}
      />
      <div
        className={`absolute h-[16.79%] w-[16.79%] top-[79.29%] right-[15.71%] bottom-[3.93%] left-[67.5%] rounded-num-50 bg-secondary-color-ref-neutral-0 [transform:_rotate(-45deg)] [transform-origin:0_0] ${getEllipse7Style(variantKey)}`}
      />
    </div>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  state: PropTypes.string,
  type: PropTypes.string,
};

export default Spinner;
