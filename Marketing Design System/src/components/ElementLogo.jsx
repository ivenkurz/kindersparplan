import SymbolBox from "./SymbolBox";
import FrameComponent1 from "./FrameComponent1";
import IconButton from "./IconButton";
import ButtonLarge from "./ButtonLarge";
import Spinner from "./Spinner";
import Default from "./Default";
import Hover from "./Hover";
import Active from "./Active";
import Disabled from "./Disabled";
import ContentCardComponent from "./ContentCardComponent";
import PropTypes from "prop-types";

const ElementLogo = ({ className = "" }) => {
  return (
    <main
      className={`w-[500.625rem] flex items-start justify-between gap-[1.25rem] max-w-full text-left text-[4.188rem] text-black font-saans mq450:flex-wrap mq450:justify-center mq2500:flex-wrap mq2500:justify-center mq4525:flex-wrap mq4525:justify-center mq6525:flex-wrap mq6525:justify-center ${className}`}
    >
      <div className="w-[122.313rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[2.312rem] box-border max-w-full text-[1.125rem] text-primary-orange-range-color-ref-orange-90-">
        <div className="self-stretch bg-oldlace overflow-hidden flex flex-col items-start min-h-[67.5rem] max-w-full">
          <div className="self-stretch bg-oldlace overflow-hidden flex items-start py-[1.875rem] px-[3.75rem] box-border gap-[2.375rem] max-w-full mq2500:gap-[1.188rem] mq2500:flex-wrap mq2500:py-[1.25rem] mq2500:px-[1.875rem] mq2500:box-border">
            <section className="w-[24.5rem] flex flex-col items-start pt-[1.125rem] px-[0rem] pb-[0rem] box-border max-w-full text-left text-[5rem] text-gray-200 font-saans">
              <div className="self-stretch flex flex-col items-start gap-[7.2rem] mq450:gap-[3.625rem]">
                <div className="w-[6.625rem] flex items-start py-[0rem] px-[0.062rem] box-border">
                  <div className="h-[1.175rem] flex-1 relative">
                    <img
                      className="absolute top-[0rem] left-[0rem] w-full h-full z-[1]"
                      alt=""
                      src="/Evergreen-Workmark-Logo1.svg"
                    />
                    <img
                      className="absolute top-[0rem] left-[0rem] w-full h-full z-[2]"
                      loading="lazy"
                      alt=""
                      src="/Evergreen-Workmark-Logo1.svg"
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-[2.875rem] z-[1] mq450:gap-[1.438rem]">
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
            <div className="w-[84.375rem] rounded-num-60 bg-secondary-color-ref-neutral-0 flex flex-col items-end pt-[4.875rem] pb-[17.937rem] pl-[5.875rem] pr-[22.812rem] box-border gap-[9.5rem] max-w-full z-[3] mq450:gap-[1.188rem] mq450:pr-[1.25rem] mq450:box-border mq2500:gap-[2.375rem] mq2500:pt-[2.063rem] mq2500:pb-[7.625rem] mq2500:pl-[1.438rem] mq2500:pr-[5.688rem] mq2500:box-border">
              <img
                className="w-[84.375rem] h-[63.75rem] relative rounded-num-60 hidden max-w-full shrink-0"
                alt=""
                src="/Rectangle-1565.svg"
              />
              <section className="self-stretch flex flex-col items-start gap-[1.437rem] max-w-full shrink-0 text-left text-[4.188rem] text-black font-saans">
                <h2 className="m-0 w-[35.75rem] relative text-[length:inherit] leading-[4.313rem] font-light font-[inherit] inline-block max-w-full z-[4] mq450:text-[2.5rem] mq450:leading-[2.563rem] mq2500:text-[3.375rem] mq2500:leading-[3.438rem]">
                  Symbol Boxen
                </h2>
                <div className="self-stretch flex items-start py-[0rem] pl-[0.062rem] pr-[0rem] box-border max-w-full text-[1.125rem] text-secondary-color-ref-neutral-70-">
                  <div className="flex-1 relative leading-[1.688rem] font-medium inline-block max-w-full z-[4]">
                    Eine Kombination aus farbigem Hintergrund und Icon bzw.
                    Zahl.
                  </div>
                </div>
              </section>
              <section className="w-[38.75rem] flex items-start justify-center max-w-full shrink-0 text-center text-[1.5rem] text-black font-saans">
                <div className="w-[20.75rem] flex flex-col items-end gap-[3.75rem] max-w-full mq450:gap-[1.875rem]">
                  <div className="self-stretch flex items-start relative isolate max-w-full">
                    <img
                      className="h-full w-[4.5rem] !!m-[0 important] absolute top-[0rem] bottom-[0rem] left-[5.25rem] rounded-num-24 max-h-full z-[0]"
                      loading="lazy"
                      alt=""
                      src="/Symbol-Box.svg"
                    />
                    <div className="h-[4.5rem] flex-1 relative max-w-full">
                      <SymbolBox symbol="Number" />
                      <div className="absolute top-[0.313rem] left-[0rem] text-[1.125rem] leading-[1.688rem] font-medium text-secondary-color-ref-neutral-70- text-left inline-block w-[20.75rem] z-[5]">{` `}</div>
                    </div>
                  </div>
                  <div className="w-[19.563rem] flex items-start justify-end py-[0rem] px-[4.062rem] box-border mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
                    <div className="flex-1 flex flex-col items-end gap-[2.187rem]">
                      <div className="self-stretch flex items-start justify-end py-[0rem] pl-[0rem] pr-[0.187rem]">
                        <div className="flex-1 flex items-start justify-between gap-[1.25rem] mq450:flex-wrap mq450:gap-[1.25rem]">
                          <div className="rounded-num-20 bg-primary-yellow-range-color-ref-yellow-60- flex items-start p-[1.125rem] z-[4]">
                            <div className="h-[3.75rem] w-[3.75rem] relative rounded-num-20 bg-primary-yellow-range-color-ref-yellow-60- hidden shrink-0" />
                            <img
                              className="h-[1.5rem] w-[1.5rem] relative z-[1] shrink-0"
                              alt=""
                              src="/UI-circle-check1.svg"
                            />
                          </div>
                          <div className="rounded-num-20 bg-others-color-ref-lime flex items-start p-[1.125rem] z-[4]">
                            <div className="h-[3.75rem] w-[3.75rem] relative rounded-num-20 bg-others-color-ref-lime hidden shrink-0" />
                            <img
                              className="h-[1.5rem] w-[1.5rem] relative z-[1] shrink-0"
                              alt=""
                              src="/UI-circle-check1.svg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-[11.063rem] flex flex-col items-start gap-[2rem]">
                        <div className="self-stretch flex items-start justify-between gap-[1.25rem] mq450:flex-wrap mq450:gap-[1.25rem]">
                          <div className="rounded-num-20 bg-others-color-ref-pink flex items-start p-[1.125rem] z-[4]">
                            <div className="h-[3.75rem] w-[3.75rem] relative rounded-num-20 bg-others-color-ref-pink hidden shrink-0" />
                            <img
                              className="h-[1.5rem] w-[1.5rem] relative z-[1] shrink-0"
                              alt=""
                              src="/UI-circle-check1.svg"
                            />
                          </div>
                          <div className="rounded-num-20 bg-primary-orange-range-color-ref-orange-30 flex items-start p-[1.125rem] z-[4]">
                            <div className="h-[3.75rem] w-[3.75rem] relative rounded-num-20 bg-primary-orange-range-color-ref-orange-30 hidden shrink-0" />
                            <img
                              className="h-[1.5rem] w-[1.5rem] relative z-[1] shrink-0"
                              alt=""
                              src="/UI-circle-check1.svg"
                            />
                          </div>
                        </div>
                        <div className="self-stretch flex items-start justify-between gap-[1.25rem] mq450:flex-wrap mq450:gap-[1.25rem]">
                          <div className="rounded-num-20 bg-primary-orange-range-color-ref-orange-60- flex items-start p-[1.125rem] z-[4]">
                            <div className="h-[3.75rem] w-[3.75rem] relative rounded-num-20 bg-primary-orange-range-color-ref-orange-60- hidden shrink-0" />
                            <img
                              className="h-[1.5rem] w-[1.5rem] relative z-[1] shrink-0"
                              alt=""
                              src="/UI-circle-check1.svg"
                            />
                          </div>
                          <div className="flex flex-col items-start pt-[0.312rem] px-[0rem] pb-[0rem]">
                            <div className="rounded-num-20 bg-others-color-ref-sage flex items-start p-[1.125rem] z-[4]">
                              <div className="h-[3.75rem] w-[3.75rem] relative rounded-num-20 bg-others-color-ref-sage hidden shrink-0" />
                              <img
                                className="h-[1.5rem] w-[1.5rem] relative z-[1] shrink-0"
                                alt=""
                                src="/UI-circle-check1.svg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <img
            className="w-[84.375rem] relative rounded-num-60 max-h-full hidden max-w-full z-[2]"
            alt=""
            src="/Rectangle-1565.svg"
          />
          <div className="w-[25.438rem] h-[18.438rem] relative rounded-num-24 bg-primary-yellow-range-color-ref-yellow-10- overflow-hidden shrink-0 hidden max-w-full z-[3]">
            <img
              className="absolute top-[24.75rem] left-[1.75rem] w-[1.5rem] h-[1.5rem] shrink-0"
              alt=""
              src="/UI-circle-x.svg"
            />
            <img
              className="absolute top-[4.125rem] left-[13.275rem] w-[1.538rem] h-[1.5rem] shrink-0"
              alt=""
              src="/Group-26090093.svg"
            />
            <div className="absolute top-[4.5rem] left-[3rem] [text-decoration:underline] leading-[1.688rem] font-medium inline-block w-[10.25rem] shrink-0">
              Eigenständiger Link
            </div>
            <img
              className="absolute top-[8rem] left-[6.313rem] w-[1.538rem] h-[1.5rem] shrink-0"
              alt=""
              src="/Group-26090093.svg"
            />
            <div className="absolute top-[8.313rem] left-[3rem] leading-[1.688rem] font-medium inline-block w-[3.188rem] min-w-[3.188rem] shrink-0">
              Hover
            </div>
            <div className="absolute top-[11.875rem] left-[2.063rem] w-[6.375rem] h-[3rem] shrink-0">
              <img
                className="absolute top-[0.688rem] left-[4.338rem] w-[1.538rem] h-[1.5rem]"
                alt=""
                src="/Group-26090093.svg"
              />
              <div className="absolute top-[1.063rem] left-[0.938rem] [text-decoration:underline] leading-[1.688rem] font-medium inline-block w-[3.4rem] min-w-[3.4rem]">
                Fokus
              </div>
              <div className="absolute top-[0rem] left-[0rem] border-secondary-color-ref-neutral-100- border-solid border-[2px] box-border w-full h-full" />
            </div>
          </div>
          <div className="w-[25.438rem] h-[18.25rem] relative rounded-num-24 bg-primary-yellow-range-color-ref-yellow-10- overflow-hidden shrink-0 hidden max-w-full z-[4]">
            <img
              className="absolute top-[24.75rem] left-[1.75rem] w-[1.5rem] h-[1.5rem] shrink-0"
              alt=""
              src="/UI-circle-x.svg"
            />
            <div className="absolute top-[3.563rem] left-[1.75rem] w-[21.875rem] h-[10.938rem] shrink-0">
              <div className="absolute top-[0rem] left-[0rem] leading-[1.688rem] font-medium inline-block w-full h-full">
                <span className="text-secondary-color-ref-neutral-70-">{`Die kostenlosen Inhalte dieser Webseite `}</span>
                <span className="[text-decoration:underline]">Inline Link</span>
                <span className="text-secondary-color-ref-neutral-70-">{` wurden mit größtmöglicher Sorgfalt erstellt. `}</span>
                <span className="text-primary-orange-range-color-ref-orange-90-">
                  Hover
                </span>
                <span className="text-secondary-color-ref-neutral-70-">{` Der Anbieter dieser Webseite übernimmt jedoch keine `}</span>
                <span className="[text-decoration:underline]">Fokus</span>
                <span className="text-primary-orange-range-color-ref-orange-60-">{` `}</span>
                <span className="text-secondary-color-ref-neutral-70-">
                  Gewähr für die Richtigkeit und Aktualität der bereitgestellten
                  kostenlosen und frei zugänglichen Inhalte.
                </span>
              </div>
              <div className="absolute top-[4.438rem] left-[17.188rem] border-secondary-color-ref-neutral-100- border-solid border-[2px] box-border w-[3.938rem] h-[2.25rem]" />
            </div>
          </div>
          <div className="w-[25.438rem] h-[20.938rem] relative rounded-num-24 bg-secondary-color-ref-neutral-100- overflow-hidden shrink-0 hidden max-w-full z-[5] text-secondary-color-ref-neutral-0">
            <img
              className="absolute top-[24.75rem] left-[1.75rem] w-[1.5rem] h-[1.5rem] shrink-0"
              alt=""
              src="/UI-circle-x.svg"
            />
            <div className="absolute top-[3rem] left-[3rem] leading-[1.688rem] font-medium inline-block w-[16.313rem] shrink-0">{`Interner Footer Link `}</div>
            <div className="absolute top-[11.25rem] left-[3rem] [text-decoration:underline] leading-[1.688rem] font-medium text-primary-orange-range-color-ref-orange-60- inline-block min-w-[3.188rem] shrink-0">
              Hover
            </div>
            <div className="absolute top-[15.125rem] left-[2.063rem] w-[5rem] h-[3rem] shrink-0">
              <div className="absolute top-[1.063rem] left-[0.938rem] leading-[1.688rem] font-medium inline-block w-[3.188rem] min-w-[3.188rem]">
                Fokus
              </div>
              <div className="absolute top-[0rem] left-[0rem] border-primary-orange-range-color-ref-orange-60- border-solid border-[2px] box-border w-full h-full" />
            </div>
            <div className="absolute top-[6.875rem] left-[3rem] leading-[1.688rem] font-medium inline-block w-[10.625rem] shrink-0">{`Externer Footer Link `}</div>
            <img
              className="absolute top-[6.5rem] left-[13.688rem] w-[1.5rem] h-[1.5rem] shrink-0"
              alt=""
              src="/Arrows-Directions-arrow-line-up-right.svg"
            />
          </div>
          <div className="w-[32rem] flex items-start py-[0rem] px-[3.75rem] box-border max-w-full mt-[-56.125rem] relative text-[5rem] text-gray-200 mq2500:pl-[1.875rem] mq2500:pr-[1.875rem] mq2500:box-border">
            <div className="flex-1 flex flex-col items-start gap-[2.875rem] max-w-full mq450:gap-[1.438rem]">
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
        </div>
      </div>
      <div className="w-[120rem] flex flex-col items-start pt-[2.25rem] px-[0rem] pb-[0rem] box-border max-w-full">
        <div className="self-stretch bg-oldlace overflow-hidden flex items-start py-[1.875rem] px-[3.75rem] box-border gap-[2.375rem] max-w-full mq2500:gap-[1.188rem] mq2500:flex-wrap mq2500:py-[1.25rem] mq2500:px-[1.875rem] mq2500:box-border">
          <FrameComponent1
            evergreenWorkmarkLogo="/Evergreen-Workmark-Logo1.svg"
            frameDivGap="2.875rem"
          />
          <div className="rounded-num-60 bg-secondary-color-ref-neutral-0 flex flex-col items-start pt-[4.312rem] pb-[1rem] pl-[3.25rem] pr-[0.812rem] box-border relative isolate gap-[9.187rem] max-w-full mq450:gap-[1.125rem] mq2500:gap-[2.313rem] mq2500:pl-[1.625rem] mq2500:pt-[1.813rem] mq2500:pb-[1.25rem] mq2500:box-border">
            <img
              className="w-[84.375rem] h-[63.75rem] relative rounded-num-60 hidden max-w-full z-[0] shrink-0"
              alt=""
              src="/Rectangle-1565.svg"
            />
            <section className="w-[63.125rem] flex items-start py-[0rem] px-[3.75rem] box-border max-w-full shrink-0 text-left text-[4.188rem] text-black font-saans mq2500:pl-[1.875rem] mq2500:pr-[1.875rem] mq2500:box-border">
              <div className="flex-1 flex flex-col items-start gap-[0.375rem] max-w-full">
                <h2 className="m-0 w-[35.75rem] relative text-[length:inherit] leading-[4.313rem] font-light font-[inherit] inline-block max-w-full z-[1] mq450:text-[2.5rem] mq450:leading-[2.563rem] mq2500:text-[3.375rem] mq2500:leading-[3.438rem]">
                  Blog Komponenten
                </h2>
                <div className="self-stretch h-[2.875rem] relative text-[1.125rem] leading-[1.688rem] font-medium text-secondary-color-ref-neutral-70- inline-block shrink-0 z-[1]">
                  Mit Verlinkungen zu externen Seiten. Können auch abgewandelt
                  werden. Ist ein Stilelement.
                  <br />
                </div>
              </div>
            </section>
            <div className="w-[5.625rem] h-[5.625rem] absolute !!m-[0 important] bottom-[2.438rem] left-[17.938rem] z-[2] flex items-center justify-center shrink-0">
              <img
                className="w-full h-full z-[2] object-contain absolute left-[0rem] top-[0rem] [transform:scale(1.222)]"
                loading="lazy"
                alt=""
                src="/Group-26090137.svg"
              />
            </div>
            <div className="flex flex-col items-start max-w-full shrink-0">
              <section className="w-[75.063rem] flex items-start py-[0rem] px-[0.312rem] box-border max-w-full text-left text-[0.875rem] text-gray-200 font-saans">
                <div className="flex-1 flex items-start gap-[2.256rem] max-w-full mq2500:gap-[1.125rem] mq2500:flex-wrap">
                  <div className="w-[17.744rem] flex flex-col items-start pt-[1.75rem] pb-[6.6rem] pl-[1.562rem] pr-[1.25rem] box-border relative isolate gap-[2.75rem] mq450:gap-[1.375rem]">
                    <img
                      className="w-full h-full absolute !!m-[0 important] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-num-24 max-w-full overflow-hidden max-h-full z-[1] shrink-0"
                      alt=""
                      src="/Rectangle-6671173.svg"
                    />
                    <div className="w-[12.313rem] flex items-start gap-[0.543rem] shrink-0">
                      <img
                        className="w-[1.769rem] relative rounded-num-24 max-h-full shrink-0 z-[2]"
                        alt=""
                        src="/Office-book-open2.svg"
                      />
                      <div className="flex-1 flex flex-col items-start pt-[0.5rem] px-[0rem] pb-[0rem]">
                        <div className="self-stretch relative leading-[1.313rem] shrink-0 z-[2]">
                          Tagebucheintrag Nr. 37
                        </div>
                      </div>
                    </div>
                    <div className="relative text-[1.5rem] leading-[2.25rem] font-semibold text-secondary-color-ref-neutral-100- z-[2] shrink-0 mq450:text-[1.188rem] mq450:leading-[1.813rem]">
                      Curry und Futter zum Nachdenken
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-start pt-[0.312rem] px-[0rem] pb-[0rem] box-border min-w-[27.438rem] max-w-full mq2500:min-w-full">
                    <div className="w-[37.181rem] flex items-start gap-[1.693rem] max-w-full mq2500:flex-wrap">
                      <div className="flex-1 flex flex-col items-start pt-[1.437rem] px-[1.312rem] pb-[4.35rem] box-border relative isolate gap-[2.625rem] min-w-[11.563rem] mq450:gap-[1.313rem]">
                        <img
                          className="w-full h-full absolute !!m-[0 important] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-num-24 max-w-full overflow-hidden max-h-full z-[1] shrink-0"
                          alt=""
                          src="/Rectangle-6671173.svg"
                        />
                        <div className="w-[14.519rem] flex items-start gap-[0.331rem] shrink-0">
                          <img
                            className="h-[2.25rem] w-[2.25rem] relative z-[2]"
                            loading="lazy"
                            alt=""
                            src="/Media-Comm-chat.svg"
                          />
                          <div className="flex-1 flex flex-col items-start pt-[0.812rem] px-[0rem] pb-[0rem]">
                            <div className="self-stretch relative leading-[1.313rem] z-[2]">
                              Marktkommentar
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch flex items-start py-[0rem] pl-[0.187rem] pr-[0.25rem] shrink-0 text-[1.5rem] text-secondary-color-ref-neutral-100-">
                          <div className="relative leading-[2.25rem] font-semibold z-[2] mq450:text-[1.188rem] mq450:leading-[1.813rem]">
                            Zwischen Seitenlinie und aktivem Management
                          </div>
                        </div>
                      </div>
                      <div className="flex-[0.9752] flex flex-col items-start pt-[1.75rem] px-[1.5rem] pb-[2.1rem] box-border relative isolate gap-[2.75rem] min-w-[11.563rem] mq450:gap-[1.375rem] mq450:flex-1">
                        <img
                          className="w-full h-full absolute !!m-[0 important] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-num-24 max-w-full overflow-hidden max-h-full z-[1] shrink-0"
                          alt=""
                          src="/Rectangle-6671173.svg"
                        />
                        <div className="w-[14.313rem] flex items-start gap-[0.606rem] shrink-0">
                          <img
                            className="w-[1.769rem] relative max-h-full shrink-0 z-[2]"
                            alt=""
                            src="/Office-article.svg"
                          />
                          <div className="flex-1 flex flex-col items-start pt-[0.5rem] px-[0rem] pb-[0rem]">
                            <div className="self-stretch relative leading-[1.313rem] shrink-0 z-[2]">
                              Blogeintrag
                            </div>
                          </div>
                        </div>
                        <div className="relative text-[1.5rem] leading-[2.25rem] font-semibold text-secondary-color-ref-neutral-100- z-[2] shrink-0 mq450:text-[1.188rem] mq450:leading-[1.813rem]">
                          Warum ETFs nicht Deine private Altersvorsorge ersetzen
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[10rem] flex flex-col items-start pt-[12.5rem] px-[0rem] pb-[0rem] box-border text-[1rem] text-primary-orange-range-color-ref-orange-60- mq450:pt-[8.125rem] mq450:box-border">
                    <div className="self-stretch flex items-start relative isolate">
                      <div className="h-[9.625rem] relative leading-[100%] font-semibold inline-block z-[1]">
                        Form genutzt und für anderen Zwecke abgewandelt.
                      </div>
                      <div className="h-[0.106rem] w-[2.331rem] absolute !!m-[0 important] top-[4.728rem] left-[4.397rem] border-primary-orange-range-color-ref-orange-60- border-dashed border-[1px] box-border [transform:_rotate(90deg)] [transform-origin:0_0] z-[2]" />
                    </div>
                  </div>
                </div>
              </section>
              <section className="flex items-end gap-[3.625rem] max-w-full mt-[-3.75rem] relative text-left text-[0.875rem] text-gray-200 font-saans mq2500:gap-[1.813rem] mq2500:flex-wrap">
                <div className="w-[20.063rem] flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[1.437rem] box-border max-w-full">
                  <div className="self-stretch flex flex-col items-start pt-[3rem] px-[2.625rem] pb-[7.812rem] relative isolate gap-[1.312rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
                    <img
                      className="w-full h-full absolute !!m-[0 important] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-num-48 max-w-full overflow-hidden max-h-full z-[1] shrink-0"
                      alt=""
                      src="/Rectangle-6671171.svg"
                    />
                    <div className="flex items-start gap-[0.5rem] shrink-0">
                      <img
                        className="w-[2rem] relative rounded-num-48 max-h-full z-[2]"
                        alt=""
                        src="/Office-book-open.svg"
                      />
                      <div className="flex flex-col items-start pt-[0.625rem] px-[0rem] pb-[0rem]">
                        <div className="relative leading-[1.313rem] inline-block min-w-[2.313rem] z-[2]">
                          Nr. 38
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex items-start py-[0rem] pl-[0.187rem] pr-[0.25rem] shrink-0 text-[1.5rem] text-secondary-color-ref-neutral-100-">
                      <div className="h-[5.563rem] flex-1 relative leading-[2.25rem] font-semibold inline-block z-[2] mq450:text-[1.188rem] mq450:leading-[1.813rem]">
                        Von sozialen Sparfüchsen und guten Venen
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[28.25rem] flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[1.437rem] box-border max-w-full">
                  <div className="w-[20.063rem] flex flex-col items-start pt-[3rem] px-[2.625rem] pb-[10.062rem] box-border relative isolate gap-[1.312rem] max-w-full mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
                    <img
                      className="w-full h-full absolute !!m-[0 important] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-num-48 max-w-full overflow-hidden max-h-full z-[1] shrink-0"
                      alt=""
                      src="/Rectangle-6671172.svg"
                    />
                    <div className="flex items-start gap-[0.5rem] shrink-0">
                      <img
                        className="w-[2rem] relative rounded-num-48 max-h-full z-[2]"
                        alt=""
                        src="/Office-book-open.svg"
                      />
                      <div className="flex flex-col items-start pt-[0.687rem] px-[0rem] pb-[0rem]">
                        <div className="relative leading-[1.313rem] z-[2]">
                          Nr. 37
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex items-start py-[0rem] pl-[0.187rem] pr-[0.25rem] shrink-0 text-[1.5rem] text-secondary-color-ref-neutral-100-">
                      <div className="h-[3.313rem] flex-1 relative leading-[2.25rem] font-semibold inline-block z-[2] mq450:text-[1.188rem] mq450:leading-[1.813rem]">
                        Curry und Futter zum Nachdenken
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[24.75rem] rounded-[34.2px] border-primary-orange-range-color-ref-orange-60- border-solid border-[1px] box-border flex items-start pt-[1.75rem] px-[1.937rem] pb-[1.375rem] max-w-full z-[3] mq450:pt-[5rem] mq450:pb-[1.25rem] mq450:box-border">
                  <img
                    className="h-[19.938rem] flex-1 relative max-w-full overflow-hidden object-cover z-[2] shrink-0"
                    loading="lazy"
                    alt=""
                    src="/Group-26091157@2x.png"
                  />
                  <div className="h-[23.313rem] w-[24.75rem] relative rounded-[34.2px] border-primary-orange-range-color-ref-orange-60- border-solid border-[1px] box-border hidden max-w-full shrink-0" />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[121.625rem] flex flex-col items-start pt-[5.5rem] pb-[0rem] pl-[0rem] pr-[1.625rem] box-border max-w-full mq2500:pt-[2.313rem] mq2500:box-border">
        <div className="self-stretch bg-oldlace overflow-hidden flex items-start py-[1.875rem] px-[3.75rem] box-border gap-[2.375rem] max-w-full mq2500:gap-[1.188rem] mq2500:flex-wrap mq2500:py-[1.25rem] mq2500:px-[1.875rem] mq2500:box-border">
          <FrameComponent1
            evergreenWorkmarkLogo="/Evergreen-Workmark-Logo1.svg"
            frameDivGap="3.75rem"
          />
          <div className="w-[84.375rem] flex items-start relative isolate max-w-full">
            <section className="h-[21rem] w-[43.5rem] !!m-[0 important] absolute top-[18.625rem] right-[-24rem] rounded-num-5 border-blueviolet border-dashed border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start p-[1.25rem] gap-[1.5rem] z-[1]">
              <div className="w-[15.438rem] h-[3.5rem] flex items-start gap-[2.25rem]">
                <div className="h-[3.5rem] w-[3.938rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[0.437rem] box-border">
                  <IconButton
                    state="Default"
                    type="Card Flip"
                    uIhandTouch="/UI-hand-touch1@2x.png"
                  />
                </div>
                <IconButton
                  state="Default"
                  type="Play"
                  uIhandTouch="/Media-Comm-play.svg"
                />
                <IconButton
                  state="Default"
                  type="Pause"
                  uIhandTouch="/Media-Comm-pause1.svg"
                />
              </div>
              <div className="w-[15.438rem] h-[3.5rem] flex items-start gap-[2.25rem]">
                <div className="h-[3.5rem] w-[3.938rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[0.437rem] box-border">
                  <IconButton
                    state="Default"
                    type="Card Flip"
                    uIhandTouch="/UI-hand-touch1@2x.png"
                  />
                </div>
                <IconButton
                  state="Default"
                  type="Play"
                  uIhandTouch="/Media-Comm-play.svg"
                />
                <IconButton
                  state="Default"
                  type="Pause"
                  uIhandTouch="/Media-Comm-pause1.svg"
                />
              </div>
              <div className="w-[15.438rem] h-[3.5rem] flex items-start gap-[2.25rem]">
                <div className="h-[3.5rem] w-[3.938rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[0.437rem] box-border">
                  <IconButton
                    state="Default"
                    type="Card Flip"
                    uIhandTouch="/UI-hand-touch1@2x.png"
                  />
                </div>
                <IconButton
                  state="Default"
                  type="Play"
                  uIhandTouch="/Media-Comm-play.svg"
                />
                <IconButton
                  state="Default"
                  type="Pause"
                  uIhandTouch="/Media-Comm-pause1.svg"
                />
              </div>
              <div className="w-[15.438rem] h-[3.5rem] flex items-start gap-[2.25rem]">
                <div className="h-[3.5rem] w-[3.938rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[0.437rem] box-border">
                  <IconButton
                    state="Disabled"
                    type="Card Flip"
                    uIhandTouch="/UI-hand-touch2@2x.png"
                  />
                </div>
                <IconButton
                  state="Disabled"
                  type="Play"
                  uIhandTouch="/Media-Comm-play2.svg"
                />
                <IconButton
                  state="Disabled"
                  type="Pause"
                  uIhandTouch="/Media-Comm-pause.svg"
                />
              </div>
            </section>
            <div className="flex-1 rounded-num-60 bg-secondary-color-ref-neutral-0 flex items-end pt-[4.562rem] px-[5.562rem] pb-[2.875rem] box-border gap-[5.25rem] max-w-full shrink-0 mq450:gap-[1.313rem] mq2500:gap-[2.625rem] mq2500:flex-wrap mq2500:pt-[1.938rem] mq2500:px-[1.375rem] mq2500:pb-[1.25rem] mq2500:box-border">
              <img
                className="h-[63.75rem] w-[84.375rem] relative rounded-num-60 hidden max-w-full shrink-0"
                alt=""
                src="/Rectangle-1565.svg"
              />
              <div className="w-[55.625rem] flex flex-col items-start pt-[0rem] px-[0rem] pb-[5.937rem] box-border max-w-full shrink-0 mq450:pb-[2.5rem] mq450:box-border mq2500:pb-[3.875rem] mq2500:box-border">
                <div className="self-stretch flex flex-col items-start gap-[0.375rem] max-w-full">
                  <h2 className="m-0 w-[35.75rem] relative text-[length:inherit] leading-[4.313rem] font-light font-[inherit] inline-block max-w-full z-[1] mq450:text-[2.5rem] mq450:leading-[2.563rem] mq2500:text-[3.375rem] mq2500:leading-[3.438rem]">
                    Buttons
                  </h2>
                  <div className="self-stretch flex items-start pt-[0rem] px-[0rem] pb-[5.937rem] text-[1.125rem] text-secondary-color-ref-neutral-70-">
                    <div className="relative leading-[1.688rem] font-medium z-[1]">
                      Schaltflächen werden verwendet, um eine Aktion zu
                      initialisieren. Die Beschriftung der Schaltflächen drückt
                      aus, welche Aktion ausgeführt wird, wenn der Benutzer die
                      Schaltfläche betätigt.
                    </div>
                  </div>
                  <section className="flex items-start py-[0rem] px-[0.187rem] box-border max-w-full text-center text-[1.25rem] text-secondary-color-ref-neutral-100- font-saans">
                    <div className="h-[36rem] w-[53.813rem] rounded-num-5 border-blueviolet border-dashed border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start py-[1.25rem] px-[1.312rem] gap-[3.687rem] z-[1]">
                      <div className="w-[50.688rem] h-[3.75rem] flex items-start gap-[4.75rem]">
                        <div className="h-[3.75rem] w-[13.75rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[1.125rem] box-border">
                          <ButtonLarge
                            state="Default"
                            type="Primary"
                            primaryButton="Primary Button"
                          />
                        </div>
                        <ButtonLarge
                          state="Default"
                          type="Secondary"
                          primaryButton="Secondary Button"
                        />
                        <ButtonLarge
                          state="Default"
                          type="Outlined"
                          primaryButton="Outlined Button"
                        />
                      </div>
                      <div className="w-[50.688rem] h-[3.75rem] flex items-start gap-[4.75rem]">
                        <div className="h-[3.75rem] w-[13.75rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[1.125rem] box-border">
                          <ButtonLarge
                            state="Default"
                            type="Primary"
                            primaryButton="Primary Button"
                          />
                        </div>
                        <ButtonLarge
                          state="Default"
                          type="Secondary"
                          primaryButton="Secondary Button"
                        />
                        <ButtonLarge
                          state="Default"
                          type="Outlined"
                          primaryButton="Outlined Button"
                        />
                      </div>
                      <div className="w-[50.688rem] h-[3.75rem] flex items-start gap-[4.75rem]">
                        <div className="h-[3.75rem] w-[13.75rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[1.125rem] box-border">
                          <ButtonLarge
                            state="Default"
                            type="Primary"
                            primaryButton="Primary Button"
                          />
                        </div>
                        <ButtonLarge
                          state="Default"
                          type="Secondary"
                          primaryButton="Secondary Button"
                        />
                        <ButtonLarge
                          state="Default"
                          type="Outlined"
                          primaryButton="Outlined Button"
                        />
                      </div>
                      <div className="w-[50.688rem] h-[3.75rem] flex items-start gap-[4.75rem]">
                        <div className="h-[3.75rem] w-[13.75rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[1.125rem] box-border">
                          <div className="w-[12.625rem] h-[3.75rem] rounded-num-16 bg-primary-orange-range-color-ref-orange-80 overflow-hidden shrink-0 flex items-center justify-center py-[1rem] px-[5.437rem] box-border">
                            <Spinner state={1} type={1} />
                          </div>
                        </div>
                        <div className="h-[3.75rem] w-[14.313rem] rounded-num-16 bg-secondary-color-ref-neutral-70- overflow-hidden shrink-0 flex items-center justify-center py-[1rem] px-[6.25rem] box-border">
                          <Spinner state={1} type={2} />
                        </div>
                        <div className="h-[3.75rem] w-[13.125rem] rounded-num-16 border-secondary-color-ref-neutral-70- border-solid border-[2px] box-border overflow-hidden shrink-0 flex items-center justify-center py-[1rem] px-[5.687rem] z-[1]">
                          <Spinner state={1} type={3} />
                        </div>
                      </div>
                      <div className="w-[50.688rem] h-[3.75rem] flex items-start gap-[4.75rem]">
                        <div className="h-[3.75rem] w-[13.75rem] flex flex-col items-start py-[0rem] pl-[0rem] pr-[1.125rem] box-border">
                          <ButtonLarge
                            state="Disabled"
                            type="Primary"
                            primaryButton="Primary Button"
                          />
                        </div>
                        <ButtonLarge
                          state="Disabled"
                          type="Secondary"
                          primaryButton="Secondary Button"
                        />
                        <ButtonLarge
                          state="Disabled"
                          type="Outlined"
                          primaryButton="Outlined Button"
                        />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="flex flex-col items-start gap-[1.5rem] shrink-0">
                <Default />
                <Hover />
                <Active />
                <Disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[120rem] flex flex-col items-start pt-[3.75rem] px-[0rem] pb-[0rem] box-border max-w-full mq2500:pt-[1.563rem] mq2500:box-border">
        <div className="self-stretch bg-oldlace overflow-hidden flex items-start py-[1.875rem] px-[3.75rem] box-border gap-[2.375rem] max-w-full mq2500:gap-[1.188rem] mq2500:flex-wrap mq2500:py-[1.25rem] mq2500:px-[1.875rem] mq2500:box-border">
          <FrameComponent1
            evergreenWorkmarkLogo="/Evergreen-Workmark-Logo1.svg"
            frameDivGap="3.75rem"
          />
          <div className="w-[84.375rem] rounded-num-60 bg-secondary-color-ref-neutral-0 flex flex-col items-start pt-[4.125rem] px-[4.687rem] pb-[20.5rem] box-border gap-[0.375rem] max-w-full mq2500:pt-[1.75rem] mq2500:px-[2.313rem] mq2500:pb-[8.625rem] mq2500:box-border">
            <img
              className="w-[84.375rem] h-[63.75rem] relative rounded-num-60 hidden max-w-full shrink-0"
              alt=""
              src="/Rectangle-1565.svg"
            />
            <div className="w-[53.188rem] flex items-start py-[0rem] px-[0.187rem] box-border max-w-full shrink-0">
              <h2 className="m-0 flex-1 relative text-[length:inherit] leading-[4.313rem] font-light font-[inherit] inline-block max-w-full z-[1] mq450:text-[2.5rem] mq450:leading-[2.563rem] mq2500:text-[3.375rem] mq2500:leading-[3.438rem]">
                Content Card Component
              </h2>
            </div>
            <div className="w-[56rem] flex items-start pt-[0rem] px-[0.187rem] pb-[8.375rem] box-border max-w-full shrink-0 text-[1.125rem] text-secondary-color-ref-neutral-70-">
              <div className="h-[2.875rem] flex-1 relative leading-[1.688rem] font-medium inline-block z-[1]">
                Karten sind vielfältig einsetzbar. Sie bieten effektive
                Handlungsaufforderungen und die verschiedenen verfügbaren
                Designs passen zu einer breiten Palette von Inhalten.
              </div>
            </div>
            <section className="w-[71.688rem] h-[22.813rem] flex items-start justify-between gap-[1.25rem] max-w-full shrink-0 text-left text-[1.5rem] text-secondary-color-ref-neutral-100- font-saans mq2500:flex-wrap mq2500:gap-[1.25rem]">
              <ContentCardComponent
                bodyText
                caption
                device="Desktop"
                heading
                link
                bodyText1
                caption1
                device1="Desktop"
                heading1
                link1
                eigenstndigerLink="I am a single link "
              />
              <div className="self-stretch flex flex-col items-start pt-[0.062rem] px-[0rem] pb-[0rem] box-border max-w-full mq2500:flex-1 mq2500:min-w-full">
                <ContentCardComponent
                  bodyText
                  caption
                  device="Mobile default"
                  heading
                  link
                  contentCardComponentWidth="21.5rem"
                  bodyText1
                  caption1
                  device1="Mobile default"
                  heading1
                  link1
                  eigenstndigerLink="I am a single link "
                  eigenstndigerLinkWidth="19rem"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

ElementLogo.propTypes = {
  className: PropTypes.string,
};

export default ElementLogo;
