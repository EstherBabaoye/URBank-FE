import { Link } from "react-router-dom";
import URBankLogo from "../assets/URB LOGO2.png";

export const Footer = () => {
  return (
    <div className="relative  bg-[#051d40] print:hidden">
      <svg
        className="absolute top-12 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-white"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="px-4 pt-32 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <div className="inline-flex items-center cursor-default">
              <img src={URBankLogo} alt="URBank Logo" className="h-16 w-auto" />
              <span className="ml-2 text-xl font-bold tracking-wide text-white uppercase">
                URBank
              </span>
            </div>

            <div className="mt-4 lg:max-w-sm">
              <div className="flex flex-wrap xl:flex-nowrap items-center space-x-3 mr-6">
                <a
                  href="https://x.com/_labims?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border bg-white p-2 rounded-full hover:shadow-md hover:bg-gray-100 transition-transform transform hover:-translate-y-0.5"
                >
                  <i className="fab fa-twitter text-sm text-[#051d40] hover:text-[#fbbf24]" />
                </a>
                <a
                  href="https://github.com/EstherBabaoye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border bg-white p-2 rounded-full hover:shadow-md hover:bg-gray-100 transition-transform transform hover:-translate-y-0.5"
                >
                  <i className="fab fa-github text-sm text-[#051d40] hover:text-[#fbbf24]" />
                </a>
                <a
                  href="https://www.linkedin.com/in/esther-babaoye-b6636b190/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border bg-white p-2 rounded-full hover:shadow-md hover:bg-gray-100 transition-transform transform hover:-translate-y-0.5"
                >
                  <i className="fab fa-linkedin-in text-sm text-[#051d40] hover:text-[#fbbf24]" />
                </a>
                <a
                  href="https://www.instagram.com/_labims/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border bg-white p-2 rounded-full hover:shadow-md hover:bg-gray-100 transition-transform transform hover:-translate-y-0.5"
                >
                  <i className="fab fa-instagram text-sm text-[#051d40] hover:text-[#fbbf24]" />
                </a>
              </div>
              <p className="mt-2 text-md font-semibold text-white">
                Operational Headquarters - 148/150, Bode Thomas Street,
                Surulere, Lagos State.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-semibold tracking-wide text-gray-500">
                Accounts
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/accounts/savings"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Savings Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accounts/current"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Current Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accounts/business"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Business Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accounts/student"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Student Account
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-gray-500">
                Cards & Loans
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/cards-loans/debit"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Debit Cards
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cards-loans/credit"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Credit Cards
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cards-loans/personal-loans"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Personal Loans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cards-loans/business-loans"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Business Loans
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-gray-500">
                Digital Services
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/services/mobile-banking"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Mobile Banking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/internet-banking"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Internet Banking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/cardless-withdrawal"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Cardless Withdrawal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/track-finances"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Track Finances
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-gray-500">
                Support
              </p>
              <ul className="mt-2 space-y-2">
                
                <li>
                  <Link
                    to="/support"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support/faqs"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support/live-chat"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Live Chat
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support/privacy-policy"
                    className="transition-colors duration-300 text-white hover:text-[#fbbf24]"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-white text-center my-12">
          <h3 className="text-3xl mb-3 font-semibold">
            Download our Mobile App
          </h3>
          <p>Stay connected. All day, every day.</p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-10">
            {/* Google Play Badge */}
            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download the app from Google Play Store"
              className="hover:scale-105 transition transform"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-14 w-auto"
              />
            </a>

            {/* Apple App Store Badge */}
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download the app from Apple App Store"
              className="hover:scale-105 transition transform"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-14 w-auto"
              />
            </a>

            {/* Microsoft Store Badge */}
            <a
              href="https://apps.microsoft.com/home/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download the app from Microsoft Store"
              className="hover:scale-105 transition transform"
            >
              <img
                src="https://developer.microsoft.com/store/badges/images/English_get-it-from-MS.png"
                alt="Get it from Microsoft"
                className="h-14 w-auto"
              />
            </a>
          </div>
        </div>

        <div className="pt-5 pb-10 border-t border-[#72cded] text-center">
          <p className="text-white mx-auto">© Copyright 2025 URBank.</p>
          <p className="text-white mx-auto">All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
