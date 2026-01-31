import FrameComponent1 from "./FrameComponent1";
import CardListComponent from "./CardListComponent";
import EigenstndigerLink from "./EigenstndigerLink";
import FrameComponent from "./FrameComponent";
import PropTypes from "prop-types";

const PocketDesign = ({ className = "" }) => {
  return (
    <section
      className={`flex items-start justify-center gap-[4.875rem] max-w-full text-left text-[5rem] text-gray-200 font-saans mq450:gap-[1.188rem] mq450:flex-wrap mq2500:gap-[2.438rem] mq2500:flex-wrap mq4525:flex-wrap mq6525:flex-wrap ${className}`}
    >
      <div className="w-[120rem] flex flex-col items-start pt-[3.437rem] px-[0rem] pb-[0rem] box-border max-w-full mq2500:pt-[1.438rem] mq2500:box-border">
        <div className="self-stretch bg-oldlace overflow-hidden flex items-start py-[1.875rem] px-[3.75rem] box-border gap-[2.375rem] max-w-full mq2500:gap-[1.188rem] mq2500:flex-wrap mq2500:py-[1.25rem] mq2500:px-[1.875rem] mq2500:box-border">
          <FrameComponent1
            evergreenWorkmarkLogo="/Evergreen-Workmark-Logo1.svg"
            frameDivGap="3.75rem"
          />
          <div className="w-[84.375rem] flex items-start relative isolate max-w-full">
            <div className="h-[13.25rem] w-[52.063rem] !!m-[0 important] absolute right-[-1rem] bottom-[23.563rem] rounded-num-5 border-blueviolet border-dashed border-[1px] box-border overflow-hidden shrink-0 flex items-start pt-[3.375rem] px-[3.187rem] pb-[3.312rem] z-[1]">
              <div className="h-[6.563rem] w-[21.5rem] shadow-[0px_4px_56px_rgba(2,_32,_17,_0.1)] rounded-num-24 bg-secondary-color-ref-neutral-0 border-secondary-color-ref-neutral-10 border-solid border-[1px] box-border overflow-hidden shrink-0 flex items-center p-[1rem]" />
            </div>
            <div className="flex-1 rounded-num-60 bg-secondary-color-ref-neutral-0 flex flex-col items-start pt-[4.125rem] px-[3.375rem] pb-[9.562rem] box-border gap-[0.75rem] max-w-full shrink-0 mq2500:pt-[1.75rem] mq2500:px-[1.688rem] mq2500:pb-[4rem] mq2500:box-border">
              <img
                className="w-[84.375rem] h-[63.75rem] relative rounded-num-60 hidden max-w-full shrink-0"
                alt=""
                src="/Rectangle-1565.svg"
              />
              <section className="w-[58.625rem] flex items-start py-[0rem] px-[1.5rem] box-border max-w-full shrink-0 text-left text-[4.188rem] text-black font-saans">
                <div className="flex-1 flex flex-col items-start gap-[0.375rem] max-w-full">
                  <h2 className="m-0 w-[35.75rem] relative text-[length:inherit] leading-[4.313rem] font-light font-[inherit] inline-block max-w-full z-[1] mq450:text-[2.5rem] mq450:leading-[2.563rem] mq2500:text-[3.375rem] mq2500:leading-[3.438rem]">
                    Cards
                  </h2>
                  <div className="relative text-[1.125rem] leading-[1.688rem] font-medium text-secondary-color-ref-neutral-70- z-[1]">
                    Karten sind vielfältig einsetzbar. Sie bieten effektive
                    Handlungsaufforderungen und die verschiedenen verfügbaren
                    Designs passen zu einer breiten Palette von Inhalten.
                  </div>
                </div>
              </section>
              <div className="w-[52.063rem] h-[41.25rem] rounded-num-5 border-blueviolet border-dashed border-[1px] box-border overflow-hidden shrink-0 flex items-start py-[6.187rem] px-[3.187rem] z-[2]">
                <div className="h-[28.875rem] w-[21.5rem] shadow-[0px_4px_56px_rgba(2,_32,_17,_0.1)] rounded-num-24 bg-secondary-color-ref-neutral-0 border-secondary-color-ref-neutral-10 border-solid border-[1px] box-border overflow-hidden shrink-0 flex items-start p-[1rem]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[120.625rem] flex flex-col items-start pt-[1.875rem] pb-[0rem] pl-[0rem] pr-[0.625rem] box-border max-w-full">
        <div className="self-stretch bg-oldlace overflow-hidden flex flex-col items-start pt-[3rem] px-[3.812rem] pb-[10.875rem] box-border relative isolate gap-[16.762rem] max-w-full mq450:gap-[2.125rem] mq2500:gap-[4.188rem] mq2500:pt-[1.25rem] mq2500:px-[1.875rem] mq2500:pb-[4.563rem] mq2500:box-border">
          <img
            className="w-[6.5rem] h-[1.175rem] relative shrink-0"
            alt=""
            src="/Evergreen-Workmark-Logo1.svg"
          />
          <div className="w-[24.5rem] !!m-[0 important] absolute top-[11.375rem] left-[3.75rem] flex flex-col items-start gap-[3.75rem] z-[1] shrink-0">
            <h2 className="m-0 relative text-[length:inherit] tracking-num--0_03 leading-[90%] font-[inherit] mq450:text-[1.5rem] mq450:leading-[1.813rem] mq2500:text-[2.5rem] mq2500:leading-[2.688rem]">
              <span className="font-light">Design</span>
              <b className="font-family">
                <br />
                Elemente
              </b>
            </h2>
            <div className="self-stretch relative text-[1rem] leading-[140%] text-dimgray-100">
              Von UX/UI auch als Komponenten bezeichnet. <br />
            </div>
          </div>
          <section className="w-[65.375rem] flex items-start justify-center max-w-full shrink-0 text-left text-[1.125rem] text-secondary-color-ref-neutral-100- font-saans">
            <div className="h-[35.688rem] w-[52.375rem] rounded-num-5 border-blueviolet border-dashed border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start py-[3rem] pl-[26.937rem] pr-[2.437rem] gap-[1.812rem] z-[1]">
              <CardListComponent device="Desktop" type="Title" />
              <div className="w-[23rem] shadow-[0px_4px_56px_rgba(2,_32,_17,_0.1)] rounded-num-24 bg-secondary-color-ref-neutral-0 border-secondary-color-ref-neutral-10 border-solid border-[1px] box-border overflow-hidden flex items-center p-[2rem] gap-[0.5rem]">
                <div className="h-[4.5rem] w-[4.5rem] rounded-static-radius-lg bg-primary-yellow-range-color-ref-yellow-60- overflow-hidden shrink-0 flex flex-col items-center justify-center p-[1.25rem] box-border">
                  <img
                    className="w-[2rem] h-[2rem] relative"
                    loading="lazy"
                    alt=""
                    src="/Commerce-Finance-sparkles.svg"
                  />
                </div>
                <div className="w-[13.875rem] flex flex-col items-start gap-[0.125rem]">
                  <div className="self-stretch relative leading-[1.688rem] font-medium">
                    +49 341 2425 0070
                  </div>
                  <div className="self-stretch relative text-[0.875rem] leading-[1.313rem] text-secondary-color-ref-neutral-70-">
                    Montag bis Freitag <br />
                    09:00 bis 11:30 Uhr
                    <br />
                    13:30 bis 17:00 Uhr
                  </div>
                </div>
              </div>
              <div className="w-[23rem] shadow-[0px_4px_56px_rgba(2,_32,_17,_0.1)] rounded-num-24 bg-secondary-color-ref-neutral-0 border-secondary-color-ref-neutral-10 border-solid border-[1px] box-border overflow-hidden flex items-center p-[2rem] gap-[0.5rem] z-[1]">
                <div className="h-[4.5rem] w-[4.5rem] rounded-static-radius-lg bg-primary-yellow-range-color-ref-yellow-60- overflow-hidden shrink-0 flex flex-col items-center justify-center p-[1.25rem] box-border">
                  <img
                    className="w-[2rem] h-[2rem] relative"
                    alt=""
                    src="/Commerce-Finance-sparkles.svg"
                  />
                </div>
                <EigenstndigerLink
                  device="Desktop"
                  type="Link only"
                  eigenstndigerLinkWidth="unset"
                  eigenstndigerLink="hello@evergreen.de"
                />
              </div>
            </div>
          </section>
          <div className="w-[84.375rem] !!m-[0 important] absolute top-[calc(50%_-_510px)] right-[5rem] rounded-num-60 bg-secondary-color-ref-neutral-0 flex flex-col items-start pt-[4.125rem] pb-[51.562rem] pl-[4.875rem] pr-[1.25rem] box-border gap-[0.375rem] max-w-full shrink-0 text-[4.188rem] text-black">
            <img
              className="w-[84.375rem] h-[63.75rem] relative rounded-num-60 hidden max-w-full shrink-0"
              alt=""
              src="/Rectangle-1565.svg"
            />
            <h2 className="m-0 w-[55.625rem] relative text-[length:inherit] leading-[4.313rem] font-light font-[inherit] inline-block max-w-full z-[1] shrink-0 mq450:text-[2.5rem] mq450:leading-[2.563rem] mq2500:text-[3.375rem] mq2500:leading-[3.438rem]">
              Card List Component
            </h2>
            <div className="w-[55.625rem] relative text-[1.125rem] leading-[1.688rem] font-medium text-secondary-color-ref-neutral-70- inline-block max-w-full z-[1] shrink-0">
              Karten sind vielfältig einsetzbar. Sie bieten effektive
              Handlungsaufforderungen und die verschiedenen verfügbaren Designs
              passen zu einer breiten Palette von Inhalten.
            </div>
          </div>
        </div>
      </div>
      <div className="w-[124.063rem] flex flex-col items-start max-w-full">
        <div className="w-[120rem] bg-oldlace overflow-hidden flex items-start py-[1.875rem] px-[3.75rem] box-border gap-[2.375rem] max-w-full mq2500:gap-[1.188rem] mq2500:flex-wrap mq2500:py-[1.25rem] mq2500:px-[1.875rem] mq2500:box-border">
          <FrameComponent1
            evergreenWorkmarkLogo="/Evergreen-Workmark-Logo1.svg"
            frameDivGap="3.75rem"
          />
          <div className="w-[84.375rem] rounded-num-60 bg-secondary-color-ref-neutral-0 flex flex-col items-end pt-[6.125rem] pb-[3.375rem] pl-[5.375rem] pr-[13.375rem] box-border gap-[5.562rem] max-w-full mq450:gap-[1.375rem] mq450:pr-[1.25rem] mq450:box-border mq2500:gap-[2.75rem] mq2500:pt-[2.625rem] mq2500:pb-[1.438rem] mq2500:pl-[1.313rem] mq2500:pr-[3.313rem] mq2500:box-border">
            <img
              className="w-[84.375rem] h-[63.75rem] relative rounded-num-60 hidden max-w-full shrink-0"
              alt=""
              src="/Rectangle-1565.svg"
            />
            <section className="self-stretch flex items-start max-w-full shrink-0 text-left text-[4.188rem] text-black font-saans">
              <div className="w-[55.625rem] flex flex-col items-start gap-[0.375rem] max-w-full">
                <h2 className="m-0 w-[35.75rem] relative text-[length:inherit] leading-[4.313rem] font-light font-[inherit] inline-block max-w-full z-[1] mq450:text-[2.5rem] mq450:leading-[2.563rem] mq2500:text-[3.375rem] mq2500:leading-[3.438rem]">
                  Links
                </h2>
                <div className="self-stretch h-[2.875rem] relative text-[1.125rem] leading-[1.688rem] font-medium text-secondary-color-ref-neutral-70- inline-block shrink-0 z-[1]">
                  Links werden als Navigationselemente verwendet. Sie leiten die
                  Nutzer zu einem anderen Ort, z. B. zu einer anderen Website,
                  einer Ressource oder einem Abschnitt innerhalb derselben
                  Seite.
                </div>
              </div>
            </section>
            <div className="w-[53.875rem] flex flex-col items-start gap-[1.75rem] max-w-full shrink-0">
              <section className="self-stretch flex items-start gap-[3rem] max-w-full text-left text-[1.125rem] text-primary-orange-range-color-ref-orange-90- font-saans mq450:gap-[1.5rem] mq2500:flex-wrap">
                <div className="h-[18.438rem] flex-[0.8624] rounded-num-24 bg-primary-yellow-range-color-ref-yellow-10- overflow-hidden flex flex-col items-start pt-[4.125rem] px-[1.75rem] pb-[3.562rem] box-border gap-[2.375rem] min-w-[16.563rem] max-w-full z-[1] mq450:h-num-auto mq450:gap-[1.188rem] mq450:flex-1 mq2500:pt-[2.688rem] mq2500:pb-[2.313rem] mq2500:box-border">
                  <div className="w-[14.313rem] flex items-start py-[0rem] px-[1.25rem] box-border shrink-0">
                    <div className="flex-1 flex items-start gap-[0.025rem] mq450:flex-wrap">
                      <div className="flex-1 flex flex-col items-start pt-[0.375rem] px-[0rem] pb-[0rem] box-border min-w-[6.688rem]">
                        <div className="self-stretch h-[0.813rem] relative [text-decoration:underline] leading-[1.688rem] font-medium inline-block shrink-0">
                          Eigenständiger Link
                        </div>
                      </div>
                      <img
                        className="h-[1.5rem] w-[1.538rem] relative shrink-0"
                        alt=""
                        src="/Group-26090093.svg"
                      />
                    </div>
                  </div>
                  <div className="flex items-start py-[0rem] px-[1.25rem] shrink-0">
                    <div className="flex items-start gap-[0.125rem]">
                      <div className="flex flex-col items-start pt-[0.312rem] px-[0rem] pb-[0rem]">
                        <div className="h-[0.813rem] relative leading-[1.688rem] font-medium inline-block min-w-[3.188rem] shrink-0">
                          Hover
                        </div>
                      </div>
                      <img
                        className="h-[1.5rem] w-[1.538rem] relative shrink-0"
                        alt=""
                        src="/Group-26090093.svg"
                      />
                    </div>
                  </div>
                  <div className="h-[10.5rem] flex items-start pt-[0rem] px-[0.312rem] pb-[7.5rem] box-border shrink-0">
                    <div className="self-stretch flex-1 border-secondary-color-ref-neutral-100- border-solid border-[2px] flex items-start pt-[0.5rem] pb-[0.625rem] pl-[0.937rem] pr-[0.25rem] z-[2]">
                      <div className="w-[3.4rem] flex flex-col items-start pt-[0.375rem] px-[0rem] pb-[0rem] box-border shrink-0">
                        <div className="self-stretch h-[0.813rem] relative [text-decoration:underline] leading-[1.688rem] font-medium inline-block z-[1]">
                          Fokus
                        </div>
                      </div>
                      <img
                        className="h-[1.5rem] w-[1.538rem] relative shrink-0"
                        alt=""
                        src="/Group-26090093.svg"
                      />
                      <div className="h-[3rem] w-[6.375rem] relative border-secondary-color-ref-neutral-100- border-solid border-[2px] box-border hidden shrink-0" />
                    </div>
                  </div>
                  <img
                    className="w-[1.5rem] h-[1.5rem] relative shrink-0"
                    alt=""
                    src="/UI-circle-x.svg"
                  />
                </div>
                <div className="flex-1 flex flex-col items-start pt-[0.062rem] px-[0rem] pb-[0rem] box-border min-w-[16.563rem] max-w-full">
                  <div className="self-stretch h-[18.25rem] rounded-num-24 bg-primary-yellow-range-color-ref-yellow-10- overflow-hidden shrink-0 flex flex-col items-start pt-[3.562rem] px-[1.75rem] pb-[3.75rem] box-border gap-[10.25rem] z-[1] mq450:gap-[5.125rem] mq2500:pt-[2.313rem] mq2500:pb-[2.438rem] mq2500:box-border">
                    <div className="self-stretch h-[10.938rem] relative shrink-0">
                      <div className="absolute top-[0rem] left-[0rem] leading-[1.688rem] font-medium inline-block w-full h-full">
                        <span className="text-secondary-color-ref-neutral-70-">{`Die kostenlosen Inhalte dieser Webseite `}</span>
                        <span className="[text-decoration:underline]">
                          Inline Link
                        </span>
                        <span className="text-secondary-color-ref-neutral-70-">{` wurden mit größtmöglicher Sorgfalt erstellt. `}</span>
                        <span className="text-primary-orange-range-color-ref-orange-90-">
                          Hover
                        </span>
                        <span className="text-secondary-color-ref-neutral-70-">{` Der Anbieter dieser Webseite übernimmt jedoch keine `}</span>
                        <span className="[text-decoration:underline]">
                          Fokus
                        </span>
                        <span className="text-primary-orange-range-color-ref-orange-60-">{` `}</span>
                        <span className="text-secondary-color-ref-neutral-70-">
                          Gewähr für die Richtigkeit und Aktualität der
                          bereitgestellten kostenlosen und frei zugänglichen
                          Inhalte.
                        </span>
                      </div>
                      <div className="absolute top-[4.438rem] left-[17.188rem] border-secondary-color-ref-neutral-100- border-solid border-[2px] box-border w-[3.938rem] h-[2.25rem] z-[1]" />
                    </div>
                    <img
                      className="w-[1.5rem] h-[1.5rem] relative shrink-0"
                      alt=""
                      src="/UI-circle-x.svg"
                    />
                  </div>
                </div>
              </section>
              <section className="w-[26.563rem] flex items-start py-[0rem] px-[0.562rem] box-border max-w-full text-left text-[1.125rem] text-secondary-color-ref-neutral-0 font-saans">
                <div className="h-[20.938rem] flex-1 rounded-num-24 bg-secondary-color-ref-neutral-100- overflow-hidden flex flex-col items-start pt-[3rem] px-[1.75rem] pb-[2.812rem] box-border gap-[1.812rem] max-w-full z-[1] mq450:h-num-auto mq450:pt-[1.938rem] mq450:pb-[1.813rem] mq450:box-border">
                  <div className="w-[18.813rem] flex items-start py-[0rem] px-[1.25rem] box-border shrink-0">
                    <div className="flex-1 relative leading-[1.688rem] font-medium">{`Interner Footer Link `}</div>
                  </div>
                  <div className="w-[14.688rem] flex items-start pt-[0rem] px-[1.25rem] pb-[1.437rem] box-border shrink-0">
                    <div className="flex-1 flex items-start gap-[0.062rem] mq450:flex-wrap">
                      <div className="flex-1 flex flex-col items-start pt-[0.375rem] px-[0rem] pb-[0rem] box-border min-w-[6.875rem]">
                        <div className="self-stretch h-[0.813rem] relative leading-[1.688rem] font-medium inline-block">{`Externer Footer Link `}</div>
                      </div>
                      <img
                        className="w-[1.5rem] relative max-h-full"
                        alt=""
                        src="/Arrows-Directions-arrow-line-up-right.svg"
                      />
                    </div>
                  </div>
                  <div className="flex items-start pt-[0rem] px-[1.25rem] pb-[0.937rem] shrink-0 text-primary-orange-range-color-ref-orange-60-">
                    <div className="h-[1.125rem] relative [text-decoration:underline] leading-[1.125rem] font-medium inline-block min-w-[3.188rem]">
                      Hover
                    </div>
                  </div>
                  <div className="h-[7.813rem] flex items-start pt-[0rem] px-[0.312rem] pb-[4.812rem] box-border shrink-0">
                    <div className="self-stretch border-primary-orange-range-color-ref-orange-60- border-solid border-[2px] flex items-start pt-[0.875rem] pb-[0.937rem] pl-[0.937rem] pr-[0.875rem] z-[1]">
                      <div className="h-[0.813rem] relative leading-[0.813rem] font-medium inline-block min-w-[3.188rem] shrink-0">
                        Fokus
                      </div>
                      <div className="h-[3rem] w-[5rem] relative border-primary-orange-range-color-ref-orange-60- border-solid border-[2px] box-border hidden shrink-0" />
                    </div>
                  </div>
                  <img
                    className="w-[1.5rem] h-[1.5rem] relative shrink-0"
                    alt=""
                    src="/UI-circle-x.svg"
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[120rem] flex flex-col items-start pt-[3.562rem] px-[0rem] pb-[0rem] box-border max-w-full mq2500:pt-[1.5rem] mq2500:box-border">
        <div className="self-stretch bg-oldlace overflow-hidden flex items-start pt-[3rem] px-[3.75rem] pb-[3.75rem] box-border gap-[3.625rem] max-w-full mq2500:gap-[1.813rem] mq2500:flex-wrap mq2500:pt-[1.25rem] mq2500:px-[1.875rem] mq2500:pb-[1.563rem] mq2500:box-border">
          <FrameComponent
            evergreenWorkmarkLogo="/Evergreen-Workmark-Logo1.svg"
            brandColorsGap="2.875rem"
            imNeuenBrandingVerwendenWir="Diese funktionalen Farben gehören nicht zum Hauptfarbsystem."
          />
          <div className="w-[89.125rem] flex flex-col items-start pt-[0.75rem] px-[0rem] pb-[0rem] box-border max-w-full shrink-0">
            <div className="self-stretch h-[60rem] relative max-w-full mq2500:h-num-auto mq2500:min-h-[60rem]">
              <div className="absolute top-[0rem] left-[0rem] rounded-num-60 bg-secondary-color-ref-neutral-0 w-[84.375rem] h-[60rem] flex flex-col items-start p-[8.125rem] box-border gap-[13.606rem] max-w-full mq2500:h-num-auto">
                <div className="w-[84.375rem] h-[60rem] relative rounded-num-60 bg-secondary-color-ref-neutral-0 hidden max-w-full shrink-0" />
                <section className="w-[59rem] flex flex-col items-start gap-[1.8rem] max-w-full z-[3] shrink-0 text-left text-[1.138rem] text-gray-100 font-saans-trial">
                  <div className="self-stretch flex items-center gap-[1.8rem] max-w-full mq2500:flex-wrap">
                    <div className="h-[8.988rem] w-[28.45rem] shadow-[0px_0px_71.9px_rgba(0,_0,_0,_0.05)] rounded-num-20_8 bg-secondary-color-ref-neutral-0 border-whitesmoke-100 border-solid border-[1.2px] box-border flex flex-col items-start py-[1.187rem] px-[1.25rem] gap-[1.206rem] max-w-full mq2500:h-num-auto">
                      <div className="w-[28.45rem] h-[9.081rem] relative rounded-num-20_8 bg-secondary-color-ref-neutral-0 border-whitesmoke-100 border-solid border-[1.2px] box-border hidden shrink-0" />
                      <div className="hidden items-center gap-[0.325rem] max-w-full shrink-0 mq2500:flex-wrap">
                        <img
                          className="h-[1.944rem] w-[1.944rem] relative"
                          alt=""
                          src="/UI-toggle-left.svg"
                        />
                        <div className="w-[23.6rem] relative tracking-num--0_02 leading-[1.788rem] font-medium inline-block shrink-0 max-w-full">
                          Monthly plan: 100,00 €
                        </div>
                      </div>
                      <div className="flex items-start gap-[0.975rem] shrink-0 mq2500:flex-wrap">
                        <div className="rounded-num-20_8 bg-gray-200 flex items-start pt-[0.893rem] px-[0.875rem] pb-[0.906rem] z-[1]">
                          <div className="h-[3.894rem] w-[3.894rem] relative rounded-num-20_8 bg-gray-200 hidden shrink-0" />
                          <img
                            className="h-[2.094rem] w-[2.094rem] relative z-[1] shrink-0"
                            alt=""
                            src="/Commerce-Finance-chart-growth-positive.svg"
                          />
                        </div>
                        <div className="w-[17.863rem] flex flex-col items-start pt-[0.325rem] px-[0rem] pb-[0rem] box-border">
                          <div className="flex flex-col items-start gap-[0.725rem]">
                            <div className="w-[11.838rem] h-[0.813rem] relative leading-[1.944rem] font-medium inline-block z-[1]">
                              Mon 18 June
                            </div>
                            <h2 className="m-0 w-[12.731rem] h-[1.625rem] relative text-[2.269rem] tracking-num--0_02 leading-[1.944rem] font-medium font-[inherit] text-gray-200 inline-block z-[1] mq450:text-[1.375rem] mq450:leading-[1.188rem] mq2500:text-[1.813rem] mq2500:leading-[1.563rem]">
                              54.208,80€
                            </h2>
                          </div>
                        </div>
                        <div className="flex flex-col items-start pt-[0.512rem] px-[0rem] pb-[0rem] text-center text-[0.906rem] text-dimgray-100">
                          <div className="w-[1.631rem] h-[1.631rem] rounded-num-58_1 border-dimgray-100 border-solid border-[2.4px] box-border flex flex-col items-center justify-center py-[0.25rem] px-[0.312rem]">
                            <div className="self-stretch relative tracking-num--0_02 leading-[140%] font-extrabold">
                              i
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start py-[0rem] px-[4.75rem] shrink-0 text-seagreen">
                        <div className="flex items-end">
                          <img
                            className="h-[0.975rem] w-[1.3rem] relative"
                            alt=""
                            src="/Frame-429.svg"
                          />
                          <div className="relative leading-[1.3rem] font-semibold">
                            24.38 %
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[8.988rem] w-[28.45rem] shadow-[0px_0px_71.9px_rgba(0,_0,_0,_0.05)] rounded-num-20_8 bg-oldlace border-whitesmoke-100 border-solid border-[1.2px] box-border flex flex-col items-start py-[1.187rem] px-[1.25rem] gap-[1.206rem] max-w-full mq2500:h-num-auto">
                      <div className="w-[28.45rem] h-[9.081rem] relative rounded-num-20_8 bg-oldlace border-whitesmoke-100 border-solid border-[1.2px] box-border hidden shrink-0" />
                      <div className="hidden items-center gap-[0.325rem] max-w-full shrink-0 mq2500:flex-wrap">
                        <img
                          className="h-[1.944rem] w-[1.944rem] relative"
                          alt=""
                          src="/UI-toggle-left.svg"
                        />
                        <div className="w-[23.6rem] relative tracking-num--0_02 leading-[1.788rem] font-medium inline-block shrink-0 max-w-full">
                          Monthly plan: 100,00 €
                        </div>
                      </div>
                      <div className="flex items-start gap-[0.968rem] shrink-0 mq2500:flex-wrap">
                        <div className="rounded-num-20_8 bg-gray-200 flex items-start pt-[0.893rem] px-[0.875rem] pb-[0.906rem] z-[1]">
                          <div className="h-[3.894rem] w-[3.894rem] relative rounded-num-20_8 bg-gray-200 hidden shrink-0" />
                          <img
                            className="h-[2.094rem] w-[2.094rem] relative z-[1] shrink-0"
                            alt=""
                            src="/Commerce-Finance-chart-growth-positive.svg"
                          />
                        </div>
                        <div className="w-[17.875rem] flex flex-col items-start pt-[0.325rem] px-[0rem] pb-[0rem] box-border">
                          <div className="flex flex-col items-start gap-[0.725rem]">
                            <div className="w-[11.838rem] h-[0.813rem] relative leading-[1.944rem] font-medium inline-block z-[1]">
                              Mon 18 June
                            </div>
                            <h2 className="m-0 w-[12.731rem] h-[1.625rem] relative text-[2.269rem] tracking-num--0_02 leading-[1.944rem] font-medium font-[inherit] text-gray-200 inline-block z-[1] mq450:text-[1.375rem] mq450:leading-[1.188rem] mq2500:text-[1.813rem] mq2500:leading-[1.563rem]">
                              54.208,80€
                            </h2>
                          </div>
                        </div>
                        <div className="flex flex-col items-start pt-[0.512rem] px-[0rem] pb-[0rem] text-center text-[0.906rem] text-dimgray-100">
                          <div className="w-[1.631rem] h-[1.631rem] rounded-num-58_1 border-dimgray-100 border-solid border-[2.4px] box-border flex flex-col items-center justify-center py-[0.25rem] px-[0.312rem]">
                            <div className="self-stretch relative tracking-num--0_02 leading-[140%] font-extrabold">
                              i
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start py-[0rem] px-[4.75rem] shrink-0 text-seagreen">
                        <div className="flex items-end">
                          <img
                            className="h-[0.975rem] w-[1.3rem] relative"
                            alt=""
                            src="/Frame-429.svg"
                          />
                          <div className="relative leading-[1.3rem] font-semibold">
                            24.38 %
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-[1.8rem] max-w-full mq2500:flex-wrap">
                    <div className="h-[8.988rem] w-[28.45rem] shadow-[0px_0px_71.9px_rgba(0,_0,_0,_0.05)] rounded-num-20_8 bg-secondary-color-ref-neutral-0 border-whitesmoke-100 border-solid border-[1.2px] box-border flex flex-col items-start py-[1.187rem] px-[1.25rem] gap-[1.206rem] max-w-full mq2500:h-num-auto">
                      <div className="w-[28.45rem] h-[9.081rem] relative rounded-num-20_8 bg-secondary-color-ref-neutral-0 border-whitesmoke-100 border-solid border-[1.2px] box-border hidden shrink-0" />
                      <div className="hidden items-center gap-[0.325rem] max-w-full shrink-0 mq2500:flex-wrap">
                        <img
                          className="h-[1.944rem] w-[1.944rem] relative"
                          alt=""
                          src="/UI-toggle-left.svg"
                        />
                        <div className="w-[23.6rem] relative tracking-num--0_02 leading-[1.788rem] font-medium inline-block shrink-0 max-w-full">
                          Monthly plan: 100,00 €
                        </div>
                      </div>
                      <div className="flex items-start gap-[0.975rem] shrink-0 mq2500:flex-wrap">
                        <div className="rounded-num-20_8 bg-gray-200 flex items-start pt-[0.893rem] px-[0.875rem] pb-[0.906rem] z-[1]">
                          <div className="h-[3.894rem] w-[3.894rem] relative rounded-num-20_8 bg-gray-200 hidden shrink-0" />
                          <img
                            className="h-[2.094rem] w-[2.094rem] relative z-[1] shrink-0"
                            loading="lazy"
                            alt=""
                            src="/Commerce-Finance-chart-growth-positive.svg"
                          />
                        </div>
                        <div className="w-[17.863rem] flex flex-col items-start pt-[0.325rem] px-[0rem] pb-[0rem] box-border">
                          <div className="flex flex-col items-start gap-[0.725rem]">
                            <div className="w-[11.838rem] h-[0.813rem] relative leading-[1.944rem] font-medium inline-block z-[1]">
                              Mon 18 June
                            </div>
                            <h2 className="m-0 w-[12.731rem] h-[1.625rem] relative text-[2.269rem] tracking-num--0_02 leading-[1.944rem] font-medium font-[inherit] text-gray-200 inline-block z-[1] mq450:text-[1.375rem] mq450:leading-[1.188rem] mq2500:text-[1.813rem] mq2500:leading-[1.563rem]">
                              54.208,80€
                            </h2>
                          </div>
                        </div>
                        <div className="flex flex-col items-start pt-[0.512rem] px-[0rem] pb-[0rem] text-center text-[0.906rem] text-dimgray-100">
                          <div className="w-[1.631rem] h-[1.631rem] rounded-num-58_1 border-dimgray-100 border-solid border-[2.4px] box-border flex flex-col items-center justify-center py-[0.25rem] px-[0.312rem]">
                            <div className="self-stretch relative tracking-num--0_02 leading-[140%] font-extrabold">
                              i
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start py-[0rem] px-[4.75rem] shrink-0 text-crimson">
                        <div className="flex items-end">
                          <img
                            className="h-[0.975rem] w-[1.3rem] relative"
                            alt=""
                            src="/Frame-4292.svg"
                          />
                          <div className="relative leading-[1.3rem] font-semibold">
                            24.38 %
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[8.988rem] w-[28.45rem] shadow-[0px_0px_71.9px_rgba(0,_0,_0,_0.05)] rounded-num-20_8 bg-oldlace border-whitesmoke-100 border-solid border-[1.2px] box-border flex flex-col items-start py-[1.187rem] px-[1.25rem] gap-[1.206rem] max-w-full mq2500:h-num-auto">
                      <div className="w-[28.45rem] h-[9.081rem] relative rounded-num-20_8 bg-oldlace border-whitesmoke-100 border-solid border-[1.2px] box-border hidden shrink-0" />
                      <div className="hidden items-center gap-[0.325rem] max-w-full shrink-0 mq2500:flex-wrap">
                        <img
                          className="h-[1.944rem] w-[1.944rem] relative"
                          alt=""
                          src="/UI-toggle-left.svg"
                        />
                        <div className="w-[23.6rem] relative tracking-num--0_02 leading-[1.788rem] font-medium inline-block shrink-0 max-w-full">
                          Monthly plan: 100,00 €
                        </div>
                      </div>
                      <div className="flex items-start gap-[0.968rem] shrink-0 mq2500:flex-wrap">
                        <div className="rounded-num-20_8 bg-gray-200 flex items-start pt-[0.893rem] px-[0.875rem] pb-[0.906rem] z-[1]">
                          <div className="h-[3.894rem] w-[3.894rem] relative rounded-num-20_8 bg-gray-200 hidden shrink-0" />
                          <img
                            className="h-[2.094rem] w-[2.094rem] relative z-[1] shrink-0"
                            loading="lazy"
                            alt=""
                            src="/Commerce-Finance-chart-growth-positive.svg"
                          />
                        </div>
                        <div className="w-[17.875rem] flex flex-col items-start pt-[0.325rem] px-[0rem] pb-[0rem] box-border">
                          <div className="flex flex-col items-start gap-[0.725rem]">
                            <div className="w-[11.838rem] h-[0.813rem] relative leading-[1.944rem] font-medium inline-block z-[1]">
                              Mon 18 June
                            </div>
                            <h2 className="m-0 w-[12.731rem] h-[1.625rem] relative text-[2.269rem] tracking-num--0_02 leading-[1.944rem] font-medium font-[inherit] text-gray-200 inline-block z-[1] mq450:text-[1.375rem] mq450:leading-[1.188rem] mq2500:text-[1.813rem] mq2500:leading-[1.563rem]">
                              54.208,80€
                            </h2>
                          </div>
                        </div>
                        <div className="flex flex-col items-start pt-[0.512rem] px-[0rem] pb-[0rem] text-center text-[0.906rem] text-dimgray-100">
                          <div className="w-[1.631rem] h-[1.631rem] rounded-num-58_1 border-dimgray-100 border-solid border-[2.4px] box-border flex flex-col items-center justify-center py-[0.25rem] px-[0.312rem]">
                            <div className="self-stretch relative tracking-num--0_02 leading-[140%] font-extrabold">
                              i
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start py-[0rem] px-[4.75rem] shrink-0 text-crimson">
                        <div className="flex items-end">
                          <img
                            className="h-[0.975rem] w-[1.3rem] relative"
                            alt=""
                            src="/Frame-4292.svg"
                          />
                          <div className="relative leading-[1.3rem] font-semibold">
                            24.38 %
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="w-[41.5rem] flex items-center gap-[1.5rem] max-w-full z-[2] shrink-0 text-left text-[1rem] text-gray-200 font-saans-trial mq2500:flex-wrap">
                  <div className="w-[8.5rem] flex flex-col items-start gap-[1.25rem]">
                    <img
                      className="w-[5.625rem] h-[5.625rem] relative rounded-num-110"
                      loading="lazy"
                      alt=""
                      src="/Elements-Color.svg"
                    />
                    <div className="relative leading-[140%]">
                      <span className="font-semibold">
                        Red Functional <br />
                      </span>
                      <span className="text-dimgray-100">
                        <span className="font-saans-trial">{`RGB `}</span>
                        <span className="font-helvetica">•</span>
                        <span>
                          {` 194.0.36`}
                          <br />
                          {`Hex `}
                        </span>
                        <span className="font-helvetica">•</span>
                        <span className="font-saans-trial"> C20024</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-[8.5rem] flex flex-col items-start gap-[1.25rem]">
                    <img
                      className="w-[5.625rem] h-[5.625rem] relative rounded-num-110"
                      loading="lazy"
                      alt=""
                      src="/Rectangle-15673.svg"
                    />
                    <div className="w-[7.875rem] relative leading-[140%] inline-block">
                      <span className="font-semibold">
                        Green Functional
                        <br />
                      </span>
                      <span className="text-dimgray-100">
                        <span className="font-saans-trial">{`RGB `}</span>
                        <span className="font-helvetica">•</span>
                        <span>
                          {` 0.133.66`}
                          <br />
                          {`Hex `}
                        </span>
                        <span className="font-helvetica">•</span>
                        <span className="font-saans-trial"> 008542</span>
                      </span>
                    </div>
                  </div>
                </section>
              </div>
              <section className="absolute top-[39rem] left-[37.938rem] w-[51.188rem] h-[11.875rem] flex items-start max-w-full text-left text-[1.25rem] text-dimgray-100 font-saans mq2500:h-num-auto">
                <div className="flex-1 flex flex-col items-start gap-[0.625rem] shrink-0">
                  <h3 className="m-0 self-stretch relative text-[length:inherit] leading-[140%] font-medium font-[inherit] opacity-[0.6] mq450:text-[1rem] mq450:leading-[1.375rem]">
                    Use this colors for lines in realistic Chart-Graphs
                  </h3>
                  <div className="self-stretch flex items-center gap-[1.5rem] text-[1rem] text-gray-200 mq2500:flex-wrap">
                    <div className="w-[8.5rem] flex flex-col items-start gap-[1.25rem]">
                      <img
                        className="w-[5.625rem] h-[5.625rem] relative rounded-num-110"
                        loading="lazy"
                        alt=""
                        src="/Data-Labels-Value.svg"
                      />
                      <div className="self-stretch relative leading-[140%]">
                        <span className="font-semibold">
                          First Value
                          <br />
                        </span>
                        <span className="text-dimgray-100">
                          <span className="font-saans">{`RGB `}</span>
                          <span className="font-helvetica">•</span>
                          <span>
                            {` 5.71.38`}
                            <br />
                            {`Hex `}
                          </span>
                          <span className="font-helvetica">•</span>
                          <span className="font-saans"> 054726</span>
                        </span>
                      </div>
                    </div>
                    <div className="w-[8.5rem] flex flex-col items-start gap-[1.25rem]">
                      <img
                        className="w-[5.625rem] h-[5.625rem] relative rounded-num-110"
                        loading="lazy"
                        alt=""
                        src="/Rectangle-15672.svg"
                      />
                      <div className="w-[7.938rem] relative leading-[140%] inline-block">
                        <span className="font-semibold">
                          Second Value
                          <br />
                        </span>
                        <span className="text-dimgray-100">
                          <span className="font-saans">{`RGB `}</span>
                          <span className="font-helvetica">•</span>
                          <span>
                            {` 86.132.202`}
                            <br />
                            {`Hex `}
                          </span>
                          <span className="font-helvetica">•</span>
                          <span className="font-saans"> 5684CA</span>
                        </span>
                      </div>
                    </div>
                    <div className="w-[8.5rem] flex flex-col items-start gap-[1.25rem]">
                      <img
                        className="w-[5.625rem] h-[5.625rem] relative rounded-num-110"
                        loading="lazy"
                        alt=""
                        src="/Rectangle-1567.svg"
                      />
                      <div className="self-stretch relative leading-[140%]">
                        <span className="font-semibold">
                          Third Value
                          <br />
                        </span>
                        <span className="text-dimgray-100">
                          <span className="font-saans">{`RGB `}</span>
                          <span className="font-helvetica">•</span>
                          <span>
                            {` 187.191.189`}
                            <br />
                            {`Hex `}
                          </span>
                          <span className="font-helvetica">•</span>
                          <span className="font-saans"> BBBFBD</span>
                        </span>
                      </div>
                    </div>
                    <div className="w-[8.5rem] flex flex-col items-start gap-[1.25rem]">
                      <img
                        className="w-[5.625rem] h-[5.625rem] relative rounded-num-110"
                        loading="lazy"
                        alt=""
                        src="/Rectangle-15671.svg"
                      />
                      <div className="relative leading-[140%]">
                        <span className="font-semibold">
                          Forth Value
                          <br />
                        </span>
                        <span className="text-dimgray-100">
                          <span className="font-saans">{`RGB `}</span>
                          <span className="font-helvetica">•</span>
                          <span>
                            {` 255.249.235`}
                            <br />
                            {`Hex `}
                          </span>
                          <span className="font-helvetica">•</span>
                          <span className="font-saans"> FFF9EB</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PocketDesign.propTypes = {
  className: PropTypes.string,
};

export default PocketDesign;
