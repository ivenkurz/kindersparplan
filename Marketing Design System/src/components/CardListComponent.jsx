import PropTypes from "prop-types";

const CardListComponent = ({
  className = "",
  device = "Desktop",
  type = "Title",
}) => {
  return (
    <div
      className={`w-[23rem] shadow-[0px_4px_56px_rgba(2,_32,_17,_0.1)] rounded-num-24 bg-secondary-color-ref-neutral-0 border-secondary-color-ref-neutral-10 border-solid border-[1px] box-border overflow-hidden flex items-center p-[2rem] gap-[0.5rem] z-[3] text-left text-[1.125rem] text-secondary-color-ref-neutral-100- font-saans ${className}`}
    >
      <div className="h-[4.5rem] w-[4.5rem] rounded-static-radius-lg bg-primary-yellow-range-color-ref-yellow-60- overflow-hidden shrink-0 flex flex-col items-center justify-center p-[1.25rem] box-border">
        <img
          className="w-[2rem] h-[2rem] relative"
          loading="lazy"
          alt=""
          src="/Commerce-Finance-sparkles.svg"
        />
      </div>
      <div className="w-[14.5rem] flex flex-col items-start shrink-0">
        <div className="w-[14.5rem] flex flex-col items-start">
          <div className="self-stretch relative leading-[1.688rem] font-medium">
            Deine Daten werden verschlüsselt übertragen
          </div>
        </div>
      </div>
    </div>
  );
};

CardListComponent.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  device: PropTypes.string,
  type: PropTypes.string,
};

export default CardListComponent;
