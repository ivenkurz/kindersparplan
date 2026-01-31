import { useMemo } from "react";
import PropTypes from "prop-types";

const EigenstndigerLink = ({
  className = "",
  bodyText = true,
  caption = true,
  device = "Mobile (default)",
  heading = true,
  link = true,
  type,
  eigenstndigerLinkWidth,
  eigenstndigerLink,
}) => {
  const eigenstndigerLinkStyle = useMemo(() => {
    return {
      width: eigenstndigerLinkWidth,
    };
  }, [eigenstndigerLinkWidth]);

  return (
    <div
      className={`w-[41rem] flex items-center gap-[0.25rem] text-left text-[1.125rem] text-primary-orange-range-color-ref-orange-90- font-saans ${className}`}
      style={eigenstndigerLinkStyle}
    >
      <div className="relative [text-decoration:underline] leading-[1.688rem] font-medium">
        {eigenstndigerLink}
      </div>
      <img
        className="h-[1.5rem] w-[1.5rem] relative"
        alt=""
        src="/Group-26090345.svg"
      />
    </div>
  );
};

EigenstndigerLink.propTypes = {
  className: PropTypes.string,
  eigenstndigerLink: PropTypes.string,

  /** Variant props */
  bodyText: PropTypes.string,
  caption: PropTypes.string,
  device: PropTypes.string,
  heading: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string,

  /** Style props */
  eigenstndigerLinkWidth: PropTypes.string,
};

export default EigenstndigerLink;
