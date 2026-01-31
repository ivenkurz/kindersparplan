import { useMemo } from "react";
import PropTypes from "prop-types";

const FrameComponent1 = ({
  className = "",
  evergreenWorkmarkLogo,
  frameDivGap,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      gap: frameDivGap,
    };
  }, [frameDivGap]);

  return (
    <section
      className={`w-[24.5rem] flex flex-col items-start pt-[1.125rem] px-[0rem] pb-[0rem] box-border max-w-full text-left text-[5rem] text-gray-200 font-saans ${className}`}
    >
      <div className="self-stretch flex flex-col items-start gap-[7.2rem] mq450:gap-[3.625rem]">
        <div className="flex items-start py-[0rem] px-[0.062rem]">
          <img
            className="h-[1.175rem] w-[6.5rem] relative"
            alt=""
            src={evergreenWorkmarkLogo}
          />
        </div>
        <div
          className="self-stretch flex flex-col items-start gap-[2.875rem] mq450:gap-[1.438rem]"
          style={frameDivStyle}
        >
          <h1 className="m-0 relative text-[length:inherit] tracking-num--0_03 leading-[90%] font-[inherit] mq450:text-[1.5rem] mq450:leading-[1.813rem] mq2500:text-[2.5rem] mq2500:leading-[2.688rem]">
            <span className="font-light">Design</span>
            <b className="font-family">
              <br />
              Elemente
            </b>
          </h1>
          <div className="self-stretch relative text-[1rem] leading-[140%] text-dimgray-100">
            Von UX/UI auch als Komponenten bezeichnet. <br />
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
  evergreenWorkmarkLogo: PropTypes.string,

  /** Style props */
  frameDivGap: PropTypes.string,
};

export default FrameComponent1;
