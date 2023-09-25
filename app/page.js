"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className=" bg-slate-700 h-screen flex flex-col items-center">
      <div className="cursor-pointer">
        <div className="bg-transparent">
          <section className="relative h-auto flex items-center flex-col w-full  z-10 justify-center bg-transparent">
            <div className=" space-y-2 flex flex-col items-center  text-white absolute z-20">
              <div className="text-3xl md:text-6xl  font-bold ">
                Unlimited movies, TV{" "}
              </div>
              <div className="text-4xl font-bold"> shows and more.</div>
              <div className="text-xl hidden  sm:inline-block">
                Watch anywhere. Cancel anytime.
              </div>
              <div className="text-lg px-8 hidden pb-40 sm:inline-block">
                Ready to watch? Enter your email to create or restart your
                membership.
              </div>
            </div>
            <div className=" relative h-full  ">
              <div className="absolute w-full  h-60 bg-gradient-to-b from-black   ">
                <div className="flex  items-center py-4 px-20 w-full justify-between">
                  <div className="w-40 text-red-500">
                    <span
                      className=" nfLogo"
                      data-uia="netflix-header-svg-logo-noclick"
                    ></span>
                  </div>
                  <div className="flex space-x-6  sm:inline-flex">
                    <div className=""></div>
                  </div>
                </div>
              </div>
              <div className="h-full bg-gradient-to-t absolute from-stone-900 text-white bottom-0 w-full">
                {" "}
              </div>
              <img
                className=" flex w-full  object-fit "
                src="https://assets.nflxext.com/ffe/siteui/vlv3/c43f3cc0-6f02-4b8a-9470-7b1732eb937d/7ae82418-beea-4868-8594-dddd284dc46c/IN-en-20210315-popsignuptwoweeks-perspective_alpha_website_small.jpg"
              />
            </div>
          </section>
          <section className=" border-t-8   h-full flex-col sm:flex-row  flex  border-gray-700     w-full z-50 text-white   bg-black">
            <div className="flex my-auto  h-full justify-center   items-center  flex-col sm:w-1/2 w-full p-12">
              <div className="text-4xl text-left  w-full font-bold">
                Enjoy on your TV.
              </div>
              <div className="text-xl">
                Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                Blu-ray players and more.
              </div>
            </div>
            <div className="sm:w-1/2 w-full bg-black">
              <div className="relative max-w-2xl  my-auto w-full my-auto  overflow-hidden">
                <img
                  alt=""
                  className="absolute  right-0 z-10"
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                />
                <video
                  className=" p-20 w-full"
                  autoPlay=""
                  playsInline=""
                  muted=""
                  loop=""
                >
                  <source
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-in-0819.m4v"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </section>
        </div>

        <section className="flex-col sm:flex-row py-10  flex  border-gray-700 border-t-8  min-half-screen  w-full z-50 text-white   bg-black">
          <div className="flex my-auto  justify-center   items-center  flex-col sm:w-1/2 w-full ">
            <div className="relative ">
              <div className="flex justify-center w-full">
                <div className="absolute w-full  justify-between  max-w-sm flex bottom-0  bg-black border border-gray-500 p-4">
                  <div className="">
                    <img
                      className="h-16"
                      src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                    />
                  </div>
                  <div className="our-story-card-animation-text">
                    <div id="" className="text-0" data-uia="">
                      Stranger Things
                    </div>
                    <div id="" className="text-1" data-uia="">
                      Downloading...
                    </div>
                  </div>
                  <div className="">
                    <svg
                      className="text-white w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" />
            </div>
          </div>
          <div className="flex my-auto  h-full justify-center   items-center  flex-col sm:w-1/2 w-full p-12">
            <div className="text-4xl text-left  w-full font-bold">
              Watch everywhere.
            </div>
            <div className="text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV. .
            </div>
          </div>
        </section>
        <section className="  flex  flex-col sm:flex-row  border-gray-700 border-t-8  min-half-screen  w-full z-50 text-white   bg-black">
          <div className="flex my-auto  h-full justify-center   items-center  flex-col sm:w-1/2 w-full p-12">
            <div className="text-4xl text-left  w-full font-bold">
              Watch everywhere.
            </div>
            <div className="text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV. .
            </div>
          </div>
          <div className="sm:w-1/2 w-full bg-black">
            <div className="relative max-w-2xl  my-auto w-full my-auto  overflow-hidden">
              <img
                alt=""
                className="absolute  right-0 z-10"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png"
              />
              <video
                className=" p-20 w-full"
                autoPlay=""
                playsInline=""
                muted=""
                loop=""
              >
                <source
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices-in.m4v"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </section>
        <section className=" border-gray-700 border-b-8 border-t-8 bg-black text-center  text-white"></section>
        {/*  */}
        <footer className="w-full bg-black text-gray-400">
          <div className="w-full p-10 space-y-2">
            <div className="pb-5">Questions? Call 000-800-040-1843</div>
            <div className="flex flex-wrap w-full flex my-4">
              <div className="sm:w-1/4 w-1/2">
                <ul className="space-y-6">
                  <li>FAQ </li>
                  <li>Investor Relations</li>
                  <li>Privacy</li>
                  <li>Speed Test</li>
                </ul>
              </div>
              <div className="sm:w-1/4 w-1/2">
                <ul className="space-y-6">
                  <li className="">Help Centre </li>
                  <li className=""> Jobs</li>
                  <li className=""> Cookie Preferences</li>
                  <li className=""> Legal Notices</li>
                </ul>
              </div>
              <div className="sm:w-1/4 w-1/2">
                <ul className="space-y-6">
                  <li className="">Account </li>
                  <li className="">Ways to Watch </li>
                  <li className="">Corporate Information </li>
                  <li className="">StreamMax Originals </li>
                </ul>
              </div>
              <div className="sm:w-1/4 w-1/2">
                <ul className="space-y-6">
                  <li className=""> Media Centre</li>
                  <li className="">Terms of Use </li>
                  <li className="">Contact Us </li>
                </ul>
              </div>
            </div>
            <div className=" space-y-4 pt-3">
              <div className="">StreamMax India</div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
