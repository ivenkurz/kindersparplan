import FrameComponent2 from "./FrameComponent2";
import ElementLogo from "./ElementLogo";
import PocketDesign from "./PocketDesign";
import PropTypes from "prop-types";

const Root = ({ className = "" }) => {
  return (
    <div
      className={`max-w-full flex flex-col items-end pt-[0rem] pb-[11.437rem] pl-[8.687rem] pr-[10.875rem] box-border gap-[6.812rem] leading-[normal] tracking-[normal] mq450:gap-[1.688rem] mq450:pr-[1.25rem] mq450:box-border mq2500:gap-[3.375rem] mq2500:pl-[2.125rem] mq2500:pr-[2.688rem] mq2500:box-border ${className}`}
    >
      <FrameComponent2 />
      <ElementLogo />
      <PocketDesign />
    </div>
  );
};

Root.propTypes = {
  className: PropTypes.string,
};

export default Root;
