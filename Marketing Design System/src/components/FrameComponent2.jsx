import FrameComponent1 from "./FrameComponent1";
import FooterMobileAccordion from "./FooterMobileAccordion";
import FrameComponent from "./FrameComponent";
import PropTypes from "prop-types";

const FrameComponent2 = ({ className = "" }) => {
  return (
    <section
      className={`flex items-start justify-center pt-[0rem] px-[0rem] pb-[0.625rem] box-border gap-[4.312rem] max-w-full text-left text-[4.188rem] text-black font-saans mq450:gap-[1.063rem] mq450:flex-wrap mq2500:gap-[2.125rem] mq2500:flex-wrap mq4525:flex-wrap mq6525:flex-wrap ${className}`}
    >
      <div className="mt-[-0.438rem] w-[124.063rem] flex flex-col items-start max-w-full shrink-0">
        <div className="bg-oldlace overflow-hidden flex items-start py-[1.875rem] px-[3.75rem] box-border gap-[3.625rem] max-w-full mq2500:gap-[1.813rem] mq2500:flex-wrap mq2500:py-[1.25rem] mq2500:px-[1.875rem] mq2500:box-border">
          <FrameComponent1 evergreenWorkmarkLogo="/Evergreen-Workmark-Logo1.svg" />
          <div className="flex-1 rounded-num-60 bg-secondary-color-ref-neutral-0 flex flex-col items-start pt-[8.406rem] pb-[1.562rem] pl-[5.125rem] pr-[3.812rem] box-border gap-[4.25rem] min-w-[54.813rem] max-w-full mq450:gap-[1.063rem] mq2500:gap-[2.125rem] mq2500:pt-[3.563rem] mq2500:pb-[1.25rem] mq2500:pl-[2.563rem] mq2500:pr-[1.875rem] mq2500:box-border mq2500:min-w-full">
            <img
              className="w-[84.375rem] h-[63.75rem] relative rounded-num-60 hidden max-w-full shrink-0"
              alt=""
              src="/Rectangle-1565.svg"
            />
            <div className="w-[56.875rem] flex items-start py-[0rem] px-[0.625rem] box-border max-w-full shrink-0">
              <div className="flex-1 flex items-start relative isolate max-w-full">
                <h2 className="!!m-[0 important] w-[35.75rem] absolute top-[-4.094rem] left-[0rem] text-[length:inherit] leading-[4.313rem] font-light font-[inherit] inline-block z-[1] shrink-0 mq450:text-[2.5rem] mq450:leading-[2.563rem] mq2500:text-[3.375rem] mq2500:leading-[3.438rem]">
                  Accordion
                </h2>
                <div className="flex-1 flex flex-col items-start gap-[0.593rem] max-w-full shrink-0 text-[1.125rem] text-secondary-color-ref-neutral-70-">
                  <div className="self-stretch h-[0rem] flex items-start justify-end py-[0rem] px-[4.375rem] box-border">
                    <div className="h-[0rem] w-[2.5rem] relative">
                      <img
                        className="absolute top-[0rem] left-[0rem] w-[0rem] h-[0rem] object-cover z-[1]"
                        alt=""
                        src="/flower-e@2x.png"
                      />
                      <img
                        className="absolute top-[0rem] left-[2.5rem] w-[0rem] h-[0rem] object-cover z-[1]"
                        alt=""
                        src="/flower-e@2x.png"
                      />
                    </div>
                  </div>
                  <div className="self-stretch h-[3.375rem] relative leading-[1.688rem] font-medium inline-block shrink-0 z-[1]">
                    Ein Akkordeon ist eine vertikal gestapelte Liste von
                    Überschriften, die zugehörige Inhaltsabschnitte ein- oder
                    ausblenden.
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex items-start gap-[2.312rem] max-w-full shrink-0 mq2500:gap-[1.125rem] mq2500:flex-wrap">
              <div className="w-[33.375rem] relative shadow-[0px_4px_56px_rgba(2,_32,_17,_0.1)] rounded-num-24 max-h-full max-w-full z-[1] flex items-center justify-center">
                <img
                  className="w-full shadow-[0px_4px_56px_rgba(2,_32,_17,_0.1)] z-[1] object-contain absolute left-[0rem] top-[0.25rem] h-full [transform:scale(1.21)] mq2500:flex-1"
                  loading="lazy"
                  alt=""
                  src="/Frame-4-1@2x.png"
                />
              </div>
              <section className="flex-1 flex flex-col items-end gap-[6.562rem] min-w-[25.813rem] max-w-full text-center text-[0.875rem] text-secondary-color-ref-neutral-50 font-saans mq450:gap-[1.625rem] mq2500:gap-[3.25rem] mq2500:min-w-full">
                <div className="self-stretch h-[17.813rem] shadow-[0px_4px_56px_rgba(2,_32,_17,_0.1)] rounded-num-24 bg-secondary-color-ref-neutral-0 overflow-hidden shrink-0 flex flex-col items-start pt-[3.125rem] pb-[2.437rem] pl-[1.75rem] pr-[0.687rem] box-border gap-[9.375rem] max-w-full z-[1] mq450:gap-[2.313rem] mq450:pt-[2rem] mq450:pb-[1.563rem] mq450:box-border mq2500:gap-[4.688rem]">
                  <div className="self-stretch h-[12.25rem] flex items-start py-[0rem] pl-[0.125rem] pr-[0rem] box-border max-w-full shrink-0">
                    <div className="self-stretch flex-1 flex flex-col items-start gap-[1.093rem] shrink-0 max-w-full">
                      <div className="self-stretch flex items-start py-[0rem] px-[0.375rem] box-border max-w-full">
                        <img
                          className="flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
                          loading="lazy"
                          alt=""
                          src="/Accordion-1@2x.png"
                        />
                      </div>
                      <div className="self-stretch flex-1 flex flex-col items-start gap-[0.312rem] max-w-full">
                        <div className="w-[36rem] flex items-start py-[0rem] px-[8.687rem] box-border max-w-full mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border mq2500:pl-[4.313rem] mq2500:pr-[4.313rem] mq2500:box-border">
                          <div className="flex-1 relative leading-[1.313rem]">
                            Hover: yellow 20
                          </div>
                        </div>
                        <div className="self-stretch flex-1 rounded-[27px] border-secondary-color-ref-neutral-100- border-solid border-[2px] box-border flex items-start py-[0.25rem] pl-[0.375rem] pr-[0.125rem] max-w-full z-[1]">
                          <img
                            className="flex-1 relative max-w-full overflow-hidden max-h-full object-cover shrink-0"
                            loading="lazy"
                            alt=""
                            src="/Accordion-1@2x.png"
                          />
                          <div className="h-[4rem] w-[37.188rem] relative rounded-[27px] border-secondary-color-ref-neutral-100- border-solid border-[2px] box-border hidden max-w-full shrink-0" />
                        </div>
                      </div>
                      <div className="w-[36rem] flex items-start py-[0rem] px-[8.687rem] box-border max-w-full mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border mq2500:pl-[4.313rem] mq2500:pr-[4.313rem] mq2500:box-border">
                        <div className="flex-1 relative leading-[1.313rem]">
                          Fokus für Tab-Navigation
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    className="w-[1.5rem] h-[1.5rem] relative shrink-0"
                    alt=""
                    src="/UI-circle-check.svg"
                  />
                </div>
                <div className="flex items-start justify-end py-[0rem] px-[0.25rem] box-border max-w-full text-left text-[1.5rem] text-primary-yellow-range-color-ref-yellow-10-">
                  <div className="rounded-[13px] bg-secondary-color-ref-neutral-100- flex items-start pt-[1.75rem] px-[1.5rem] pb-[1.687rem] box-border max-w-full z-[1]">
                    <div className="h-[21.188rem] w-[25.875rem] relative rounded-[13px] bg-secondary-color-ref-neutral-100- hidden max-w-full shrink-0" />
                    <div className="h-[17.75rem] w-[22.875rem] rounded-num-5 border-blueviolet border-dashed border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start pt-[1.25rem] px-[1.25rem] pb-[2.875rem] gap-[7.25rem] z-[2]">
                      <FooterMobileAccordion status1="closed" />
                      <div className="w-[20.375rem] flex flex-col items-start gap-[2.562rem]">
                        <div className="self-stretch flex items-center gap-[1rem]">
                          <h3 className="m-0 w-[17.813rem] relative text-[length:inherit] leading-[2.25rem] font-semibold font-[inherit] inline-block shrink-0">
                            Footer Accordion open
                          </h3>
                          <img
                            className="h-[1.5rem] w-[1.5rem] relative"
                            alt=""
                            src="/UI-minus.svg"
                          />
                        </div>
                        <div className="self-stretch flex flex-col items-start text-[1.125rem] text-secondary-color-ref-neutral-0">
                          <div className="self-stretch relative leading-[1.688rem] font-medium">
                            put the items here
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[-0.438rem] w-[120rem] bg-secondary-color-ref-neutral-0 overflow-hidden shrink-0 flex items-start pt-[3rem] px-[3.75rem] pb-[3.75rem] box-border gap-[3.625rem] max-w-full mq2500:gap-[1.813rem] mq2500:flex-wrap mq2500:pt-[1.25rem] mq2500:px-[1.875rem] mq2500:pb-[1.563rem] mq2500:box-border">
        <FrameComponent
          evergreenWorkmarkLogo="/Evergreen-Workmark-Logo1.svg"
          imNeuenBrandingVerwendenWir="Im neuen Branding verwenden wir ausschließlich unsere eigene Icon-Bibliothek."
        />
        <div className="flex-1 flex flex-col items-start pt-[0.75rem] px-[0rem] pb-[0rem] box-border min-w-[54.813rem] max-w-full mq2500:min-w-full">
          <div className="self-stretch rounded-num-60 bg-oldlace flex flex-col items-start pt-[2.937rem] px-[10.937rem] pb-[20.25rem] box-border gap-[8rem] max-w-full mq450:gap-[1rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border mq2500:gap-[2rem] mq2500:pt-[1.25rem] mq2500:px-[2.688rem] mq2500:pb-[8.563rem] mq2500:box-border">
            <div className="w-[84.375rem] h-[60rem] relative rounded-num-60 bg-oldlace hidden max-w-full shrink-0" />
            <section className="flex items-start py-[0rem] px-[1.062rem] box-border max-w-full shrink-0">
              <div className="flex-1 flex items-end gap-[3.281rem] max-w-full mq2500:gap-[1.625rem] mq2500:flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.312rem] box-border max-w-full mq2500:min-w-full">
                  <img
                    className="self-stretch h-[6.25rem] relative max-w-full overflow-hidden shrink-0 z-[1]"
                    loading="lazy"
                    alt=""
                    src="/Evergreen-Workmark-Logo.svg"
                  />
                </div>
                <img
                  className="h-[9.313rem] w-[9.313rem] relative rounded-[26.2px] z-[1]"
                  loading="lazy"
                  alt=""
                  src="/App-Icon.svg"
                />
              </div>
            </section>
            <section className="self-stretch flex flex-col items-start gap-[2.437rem] z-[2] shrink-0 mq2500:gap-[1.188rem]">
              <div className="self-stretch flex items-center justify-between gap-[1.25rem] mq2500:flex-wrap mq2500:justify-center">
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  loading="lazy"
                  alt=""
                  src="/Arrows-Directions-arrow-elbow-up.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-home-2.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-hamburger-menu.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-plus1.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-x.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-volume-mute.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-volume-medium.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-WiFi.svg"
                />
              </div>
              <div className="self-stretch flex items-center justify-between gap-[1.25rem] mq2500:flex-wrap mq2500:justify-center">
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-lock.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-users.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-battery-75.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-user.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-globe.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-circle-check2.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-sliders.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-light-high.svg"
                />
              </div>
              <div className="self-stretch flex items-center justify-between gap-[1.25rem] mq2500:flex-wrap mq2500:justify-center">
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-calendar.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative object-cover"
                  alt=""
                  src="/UI-circle-info@2x.png"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-download.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-globe.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-share.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-hand-pointer.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-zoom-in.svg"
                />
                <img
                  className="h-[4.875rem] w-[4.875rem] relative"
                  alt=""
                  src="/UI-search.svg"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="mt-[-0.438rem] w-[125.813rem] flex flex-col items-start max-w-full shrink-0">
        <div className="w-[120rem] bg-secondary-color-ref-neutral-0 overflow-hidden flex items-start pt-[3rem] px-[3.75rem] pb-[3.75rem] box-border gap-[3.625rem] max-w-full mq2500:gap-[1.813rem] mq2500:flex-wrap mq2500:pt-[1.25rem] mq2500:px-[1.875rem] mq2500:pb-[1.563rem] mq2500:box-border">
          <section className="w-[24.5rem] flex flex-col items-start gap-[7.2rem] max-w-full text-left text-[5rem] text-gray-200 font-saans mq450:gap-[3.625rem]">
            <div className="flex items-start py-[0rem] px-[0.062rem]">
              <img
                className="h-[1.175rem] w-[6.5rem] relative"
                alt=""
                src="/Evergreen-Workmark-Logo1.svg"
              />
            </div>
            <div className="self-stretch flex flex-col items-start mq450:gap-[1.875rem]">
              <h1 className="m-0 w-[28.063rem] relative text-[length:inherit] tracking-num--0_03 leading-[100%] inline-block shrink-0 font-[inherit] mq450:text-[1.5rem] mq450:leading-[2rem] mq2500:text-[2.5rem] mq2500:leading-[3rem]">
                <span className="font-light">Die</span>
                <b className="font-family">
                  <br />
                  Schriftarten
                </b>
              </h1>
            </div>
          </section>
          <div className="flex-1 flex flex-col items-start pt-[0.75rem] px-[0rem] pb-[0rem] box-border min-w-[54.813rem] max-w-full mq2500:min-w-full">
            <div className="self-stretch rounded-num-60 bg-oldlace flex items-start py-[6.875rem] pl-[8.5rem] pr-[4.125rem] box-border gap-[11.125rem] max-w-full mq450:gap-[1.375rem] mq2500:gap-[2.75rem] mq2500:flex-wrap mq2500:py-[2.875rem] mq2500:pl-[2.125rem] mq2500:pr-[2.063rem] mq2500:box-border">
              <div className="h-[60rem] w-[84.375rem] relative rounded-num-60 bg-oldlace hidden max-w-full shrink-0" />
              <section className="flex-1 flex flex-col items-start gap-[3.125rem] min-w-[19.563rem] max-w-full shrink-0 text-left text-[3.75rem] text-gray-200 font-saans mq2500:gap-[1.563rem]">
                <div className="flex items-start pt-[0rem] px-[0rem] pb-[0.437rem] box-border max-w-full">
                  <div className="self-stretch flex-1 flex flex-col items-start gap-[0.437rem] max-w-full">
                    <div className="relative tracking-num--0_03 leading-[100%] font-light mq450:text-[2.25rem] mq450:leading-[2.25rem] mq2500:text-[3rem] mq2500:leading-[3rem]">
                      AaBbCcDdEeFfGg
                      <br />
                      1234567890
                    </div>
                    <h3 className="m-0 relative text-[1.25rem] leading-[90%] text-center font-[inherit] mq450:text-[1rem] mq450:leading-[0.875rem]">
                      <span className="font-semibold">{`Saans • Light — `}</span>
                      <i>by Displaay</i>
                    </h3>
                  </div>
                </div>
                <div className="flex items-start pt-[0rem] px-[0rem] pb-[0.437rem] box-border max-w-full">
                  <div className="self-stretch flex-1 flex flex-col items-start gap-[0.437rem] max-w-full">
                    <div className="relative tracking-num--0_03 leading-[100%] mq450:text-[2.25rem] mq450:leading-[2.25rem] mq2500:text-[3rem] mq2500:leading-[3rem]">
                      AaBbCcDdEeFfGg
                      <br />
                      1234567890
                    </div>
                    <h3 className="m-0 relative text-[1.25rem] leading-[90%] text-center font-[inherit] mq450:text-[1rem] mq450:leading-[0.875rem]">
                      <span className="font-semibold">{`Saans • Regular — `}</span>
                      <i>by Displaay</i>
                    </h3>
                  </div>
                </div>
                <div className="self-stretch flex-1 flex flex-col items-start gap-[0.437rem]">
                  <div className="relative tracking-num--0_03 leading-[100%] font-medium mq450:text-[2.25rem] mq450:leading-[2.25rem] mq2500:text-[3rem] mq2500:leading-[3rem]">
                    AaBbCcDdEeFfGg
                    <br />
                    1234567890
                  </div>
                  <h3 className="m-0 relative text-[1.25rem] leading-[90%] text-center font-[inherit] mq450:text-[1rem] mq450:leading-[0.875rem]">
                    <span className="font-semibold">{`Saans • Medium — `}</span>
                    <i>by Displaay</i>
                  </h3>
                </div>
                <div className="self-stretch flex-1 flex flex-col items-start gap-[0.437rem]">
                  <div className="relative tracking-num--0_03 leading-[100%] font-semibold mq450:text-[2.25rem] mq450:leading-[2.25rem] mq2500:text-[3rem] mq2500:leading-[3rem]">
                    AaBbCcDdEeFfGg
                    <br />
                    1234567890
                  </div>
                  <h3 className="m-0 relative text-[1.25rem] leading-[90%] text-center font-[inherit] mq450:text-[1rem] mq450:leading-[0.875rem]">
                    <span className="font-semibold">{`Saans • SemiBold — `}</span>
                    <i>by Displaay</i>
                  </h3>
                </div>
              </section>
              <section className="flex-1 flex flex-col items-start gap-[27.312rem] min-w-[19.813rem] max-w-full shrink-0 text-left text-[3.75rem] text-gray-200 font-test-family mq2500:gap-[13.625rem]">
                <div className="self-stretch flex flex-col items-start gap-[1rem] z-[2]">
                  <b className="self-stretch flex-1 relative tracking-num--0_02 leading-[100%] mq450:text-[2.25rem] mq450:leading-[2.25rem] mq2500:text-[3rem] mq2500:leading-[3rem]">
                    AaBbCcDdEeFfGg
                    <br />
                    1234567890
                  </b>
                  <h3 className="m-0 relative text-[1.25rem] leading-[90%] text-center font-saans-trial mq450:text-[1rem] mq450:leading-[0.875rem]">
                    <span className="font-semibold">{`Family • Bold — `}</span>
                    <i className="font-semibold">by Klim</i>
                  </h3>
                </div>
                <div className="w-[29.375rem] flex-1 flex flex-col items-start gap-[0.437rem] max-w-full z-[1] font-saans">
                  <i className="relative tracking-num--0_03 leading-[100%] mq450:text-[2.25rem] mq450:leading-[2.25rem] mq2500:text-[3rem] mq2500:leading-[3rem]">
                    AaBbCcDdEeFfGg
                    <br />
                    1234567890
                  </i>
                  <h3 className="m-0 relative text-[1.25rem] leading-[90%] text-center font-[inherit] mq450:text-[1rem] mq450:leading-[0.875rem]">
                    <span className="font-semibold">{`Saans • Regular Italic — `}</span>
                    <i>by Displaay</i>
                  </h3>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[120rem] bg-secondary-color-ref-neutral-0 overflow-hidden shrink-0 flex items-start pt-[3rem] px-[3.75rem] pb-[3.75rem] box-border gap-[0.5rem] max-w-full mq2500:flex-wrap mq2500:pt-[1.25rem] mq2500:px-[1.875rem] mq2500:pb-[1.563rem] mq2500:box-border">
        <section className="w-[27.625rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[3.125rem] box-border gap-[7.2rem] max-w-full text-left text-[1rem] text-gray-200 font-saans mq450:gap-[3.625rem] mq450:pr-[1.25rem] mq450:box-border">
          <div className="flex items-start py-[0rem] px-[0.062rem]">
            <img
              className="h-[1.175rem] w-[6.5rem] relative"
              alt=""
              src="/Evergreen-Workmark-Logo1.svg"
            />
          </div>
          <div className="self-stretch flex flex-col items-start gap-[2.687rem] mq450:gap-[1.313rem]">
            <h1 className="m-0 relative text-[5rem] leading-[100%] shrink-0 font-[inherit] mq450:text-[1.5rem] mq450:leading-[2rem] mq2500:text-[2.5rem] mq2500:leading-[3rem]">
              <span className="tracking-num--0_03">
                <span className="font-light">{`Farb `}</span>
              </span>
              <b className="font-family">
                <span className="tracking-num--0_03">&nbsp;</span>
                <span className="tracking-num--0_02">Verwendung</span>
              </b>
            </h1>
            <div className="self-stretch relative leading-[150%] text-dimgray-100 shrink-0">
              Off-White und Weiß sind die Hauptflächenfarben der Marke. Alle
              anderen Farben liegen visuell über diesen Grundflächen. Die grauen
              Neutral­töne kommen in der Typografie, in Icons und Linien
              innerhalb des Designsystems zum Einsatz. Die Sekundärpalette
              ergänzt das Farbspektrum und sorgt für zusätzliche gestalterische
              Vielfalt – beispielsweise bei Kacheln für Diagramm- oder
              Grafikinformationen.
            </div>
            <div className="w-[11.875rem] flex flex-col items-start gap-[1.5rem] shrink-0 font-saans-trial">
              <div className="self-stretch flex items-center gap-[1rem]">
                <div className="w-[4.75rem] flex flex-col items-start gap-[1rem]">
                  <div className="self-stretch relative leading-[140%] font-semibold">
                    Primary
                  </div>
                  <div className="self-stretch flex items-center gap-[0.25rem]">
                    <img
                      className="h-[1.875rem] w-[1.875rem] relative rounded-num-110"
                      alt=""
                      src="/Rectangle-15832.svg"
                    />
                    <img
                      className="h-[1.875rem] w-[1.875rem] relative rounded-num-110"
                      alt=""
                      src="/Rectangle-1584.svg"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[1rem]">
                  <div className="self-stretch relative leading-[140%] font-semibold">{`Secondary `}</div>
                  <div className="self-stretch flex items-center gap-[0.25rem]">
                    <img
                      className="h-[1.875rem] w-[1.875rem] relative rounded-num-110"
                      alt=""
                      src="/Rectangle-15833.svg"
                    />
                    <img
                      className="h-[1.875rem] w-[1.875rem] relative rounded-num-110"
                      alt=""
                      src="/Rectangle-15843.svg"
                    />
                    <img
                      className="h-[1.875rem] w-[1.875rem] relative rounded-num-110"
                      alt=""
                      src="/Rectangle-15852.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-[1rem]">
                <div className="self-stretch relative leading-[140%] font-semibold">
                  Neutrals
                </div>
                <div className="self-stretch flex items-center gap-[0.25rem]">
                  <img
                    className="h-[1.875rem] w-[1.875rem] relative rounded-num-110"
                    alt=""
                    src="/Rectangle-1583.svg"
                  />
                  <img
                    className="h-[1.875rem] w-[1.875rem] relative rounded-num-110"
                    alt=""
                    src="/Rectangle-15841.svg"
                  />
                  <img
                    className="h-[1.875rem] w-[1.875rem] relative rounded-num-110"
                    alt=""
                    src="/Rectangle-1585.svg"
                  />
                  <img
                    className="h-[1.875rem] w-[1.875rem] relative rounded-num-110"
                    alt=""
                    src="/Rectangle-15862.svg"
                  />
                  <img
                    className="h-[1.875rem] w-[1.875rem] relative rounded-num-110"
                    alt=""
                    src="/Rectangle-1587.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex-1 flex flex-col items-start pt-[0.75rem] px-[0rem] pb-[0rem] box-border min-w-[27.25rem] max-w-full mq2500:min-w-full">
          <div className="self-stretch rounded-num-60 bg-primary-yellow-range-color-ref-yellow-10- flex items-start justify-center pt-[6.125rem] pb-[6.062rem] pl-[1.312rem] pr-[1.25rem] box-border max-w-full mq2500:pt-[2.625rem] mq2500:pb-[2.563rem] mq2500:box-border">
            <img
              className="h-[60rem] w-[41.938rem] relative rounded-num-60 hidden max-w-full shrink-0"
              alt=""
              src="/Rectangle-15652.svg"
            />
            <div className="flex flex-col items-start gap-[2.812rem] shrink-0">
              <img
                className="w-[5.625rem] h-[5.625rem] relative rounded-num-110"
                loading="lazy"
                alt=""
                src="/Rectangle-15831.svg"
              />
              <img
                className="w-[5.625rem] h-[5.625rem] relative rounded-num-110"
                loading="lazy"
                alt=""
                src="/Rectangle-15842.svg"
              />
              <img
                className="w-[5.625rem] h-[3.75rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-15851.svg"
              />
              <img
                className="w-[5.625rem] h-[3.75rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-1586.svg"
              />
              <img
                className="w-[5.625rem] h-[3.75rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-15871.svg"
              />
              <img
                className="w-[5.625rem] h-[1.875rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-1588.svg"
              />
              <img
                className="w-[5.625rem] h-[1.875rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-1589.svg"
              />
              <img
                className="w-[5.625rem] h-[1.875rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-1590.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start pt-[0.75rem] px-[0rem] pb-[0rem] box-border min-w-[27.25rem] max-w-full mq2500:min-w-full">
          <div className="self-stretch rounded-num-60 bg-secondary-color-ref-neutral-0 flex items-start justify-center pt-[6.125rem] pb-[6.062rem] pl-[1.312rem] pr-[1.25rem] box-border max-w-full mq2500:pt-[2.625rem] mq2500:pb-[2.563rem] mq2500:box-border">
            <img
              className="h-[60rem] w-[41.938rem] relative rounded-num-60 hidden max-w-full shrink-0"
              alt=""
              src="/Rectangle-1566.svg"
            />
            <div className="flex flex-col items-start gap-[2.812rem] shrink-0">
              <img
                className="w-[5.625rem] h-[5.625rem] relative rounded-num-110"
                loading="lazy"
                alt=""
                src="/Rectangle-15831.svg"
              />
              <img
                className="w-[5.625rem] h-[5.625rem] relative rounded-num-110"
                loading="lazy"
                alt=""
                src="/Rectangle-15842.svg"
              />
              <img
                className="w-[5.625rem] h-[3.75rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-15851.svg"
              />
              <img
                className="w-[5.625rem] h-[3.75rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-1586.svg"
              />
              <img
                className="w-[5.625rem] h-[3.75rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-15871.svg"
              />
              <img
                className="w-[5.625rem] h-[1.875rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-1588.svg"
              />
              <img
                className="w-[5.625rem] h-[1.875rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-1589.svg"
              />
              <img
                className="w-[5.625rem] h-[1.875rem] relative rounded-num-110"
                alt=""
                src="/Rectangle-1590.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
