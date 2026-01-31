import { useMemo } from "react";
import PropTypes from "prop-types";

const FrameComponent = ({
  className = "",
  evergreenWorkmarkLogo,
  brandColorsGap,
  imNeuenBrandingVerwendenWir,
}) => {
  const brandColorsStyle = useMemo(() => {
    return {
      gap: brandColorsGap,
    };
  }, [brandColorsGap]);

  return (
    <section
      className={`w-[24.5rem] flex flex-col items-start gap-[7.2rem] max-w-full text-left text-[5rem] text-gray-200 font-saans mq450:gap-[3.625rem] ${className}`}
    >
      <div className="flex items-start py-[0rem] px-[0.062rem]">
        <img
          className="h-[1.175rem] w-[6.5rem] relative"
          alt=""
          src={evergreenWorkmarkLogo}
        />
      </div>
      <div
        className="self-stretch flex flex-col items-start gap-[2.375rem] mq450:gap-[1.188rem]"
        style={brandColorsStyle}
      >
        <h1 className="m-0 relative text-[length:inherit] tracking-num--0_03 leading-[100%] font-[inherit] mq450:text-[1.5rem] mq450:leading-[2rem] mq2500:text-[2.5rem] mq2500:leading-[3rem]">
          <span className="font-light">
            Icon
            <br />
          </span>
          <b className="font-family">Welt</b>
        </h1>
        <div className="self-stretch relative text-[1rem] leading-[140%] text-dimgray-100">
          {imNeuenBrandingVerwendenWir}
        </div>
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  evergreenWorkmarkLogo: PropTypes.string,
  imNeuenBrandingVerwendenWir: PropTypes.string,

  /** Style props */
  brandColorsGap: PropTypes.string,
};

export default FrameComponent;
