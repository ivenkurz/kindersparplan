import { useMemo } from "react";
import EigenstndigerLink from "./EigenstndigerLink";
import PropTypes from "prop-types";

const getContentCardComponentStyle = (styleKey) => {
  switch (styleKey) {
    case "true-true-Mobile default-true-true":
      return "[&]:rounded-num-24 [&]:[flex-shrink:unset] [&]:p-[1rem]";
  }
};
const getHeadingBoxContainerStyle = (styleKey) => {
  switch (styleKey) {
    case "true-true-Mobile default-true-true":
      return "[&]:w-[18.563rem]";
  }
};
const getSymbolHeaderContainerStyle = (styleKey) => {
  switch (styleKey) {
    case "true-true-Mobile default-true-true":
      return "[&]:w-[unset] [&]:self-stretch";
  }
};
const getSymbolHeadingContainerStyle = (styleKey) => {
  switch (styleKey) {
    case "true-true-Mobile default-true-true":
      return "[&]:[flex-shrink:unset]";
  }
};
const getHeadingH3GoesStyle = (styleKey) => {
  switch (styleKey) {
    case "true-true-Mobile default-true-true":
      return "[&]:w-[unset] [&]:[display:unset] [&]:[flex-shrink:unset] [&]:self-stretch";
  }
};
const getCaptionGoesHereStyle = (styleKey) => {
  switch (styleKey) {
    case "true-true-Mobile default-true-true":
      return "[&]:w-[unset] [&]:[display:unset] [&]:[flex-shrink:unset] [&]:self-stretch";
  }
};
const getIAmTheStyle = (styleKey) => {
  switch (styleKey) {
    case "true-true-Mobile default-true-true":
      return "[&]:w-[unset] [&]:[display:unset] [&]:self-stretch";
  }
};

const ContentCardComponent = ({
  className = "",
  bodyText = true,
  caption = true,
  device = "Mobile (default)",
  heading = true,
  link = true,
  contentCardComponentWidth,
  bodyText1,
  caption1,
  device1 = "Desktop",
  heading1,
  link1,
  eigenstndigerLink,
  eigenstndigerLinkWidth,
}) => {
  const variantKey = [bodyText, caption, device, heading, link].join("-");

  const contentCardComponentStyle = useMemo(() => {
    return {
      width: contentCardComponentWidth,
    };
  }, [contentCardComponentWidth]);

  return (
    <div
      className={`w-[45.063rem] shadow-[0px_4px_56px_rgba(2,_32,_17,_0.1)] rounded-static-radius-2xl bg-secondary-color-ref-neutral-0 border-secondary-color-ref-neutral-10 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start p-[2rem] text-left text-[1.5rem] text-secondary-color-ref-neutral-100- font-saans mq2500:flex-1 mq2500:min-w-full ${getContentCardComponentStyle(variantKey)} ${className}`}
      style={contentCardComponentStyle}
    >
      <div className="self-stretch flex flex-col items-start gap-[2rem]">
        <div
          className={`w-[41rem] flex flex-col items-start gap-[1.5rem] ${getHeadingBoxContainerStyle(variantKey)}`}
        >
          <div
            className={`w-[40.813rem] flex flex-col items-start gap-[1rem] ${getSymbolHeaderContainerStyle(variantKey)}`}
          >
            <div
              className={`self-stretch flex flex-col items-start gap-[1rem] shrink-0 ${getSymbolHeadingContainerStyle(variantKey)}`}
            >
              <div className="w-[4.5rem] h-[4.5rem] rounded-static-radius-lg bg-primary-yellow-range-color-ref-yellow-60- overflow-hidden shrink-0 flex flex-col items-center justify-center p-[1.25rem] box-border">
                <img
                  className="w-[2rem] h-[2rem] relative"
                  alt=""
                  src="/Commerce-Finance-sparkles.svg"
                />
              </div>
              <h3
                className={`m-0 w-[41rem] relative text-[length:inherit] leading-[2.25rem] font-semibold font-[inherit] inline-block shrink-0 ${getHeadingH3GoesStyle(variantKey)}`}
              >
                Heading (H3) goes here!
              </h3>
            </div>
            <div
              className={`w-[41rem] relative text-[0.875rem] leading-[1.313rem] text-secondary-color-ref-neutral-70- inline-block shrink-0 ${getCaptionGoesHereStyle(variantKey)}`}
            >{`Caption goes here `}</div>
          </div>
          <div
            className={`w-[41rem] relative text-[1.125rem] leading-[1.688rem] font-medium text-secondary-color-ref-neutral-70- inline-block ${getIAmTheStyle(variantKey)}`}
          >
            I am the body text. Man sagt es sind die Schmetterlinge die den
            Bauch beflügeln | Das Überdenken der Gedanken | Und das Träumen ohne
            Schranken | Trotzdem frag ich mich
          </div>
        </div>
        <EigenstndigerLink
          bodyText={bodyText1}
          caption={caption1}
          device={device1}
          heading={heading1}
          link={link1}
          eigenstndigerLinkWidth={eigenstndigerLinkWidth}
          eigenstndigerLink={eigenstndigerLink}
        />
      </div>
    </div>
  );
};

ContentCardComponent.propTypes = {
  className: PropTypes.string,
  bodyText1: PropTypes.any,
  caption1: PropTypes.any,
  device1: PropTypes.any,
  heading1: PropTypes.any,
  link1: PropTypes.any,
  eigenstndigerLink: PropTypes.string,
  eigenstndigerLinkWidth: PropTypes.any,

  /** Variant props */
  bodyText: PropTypes.string,
  caption: PropTypes.string,
  device: PropTypes.string,
  heading: PropTypes.string,
  link: PropTypes.string,

  /** Style props */
  contentCardComponentWidth: PropTypes.string,
};

export default ContentCardComponent;
