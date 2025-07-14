import React from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./Components/AuthContext";
import Layout from "./Layout/Layout";
import { AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-datepicker/dist/react-datepicker.css";

import Header from "./Components/Header";
import Header2 from "./Components/Header2";
import MobileHeader from "./Components/MobileHeader";
import { Footer } from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import PageWrapper from "./Components/PageWrapper";

import Home from "./Pages/Home";
import Personal from "./Pages/Personal";
import Business from "./Pages/Business";
import AboutUs from "./Pages/AboutUs";
import { SearchResults } from "./Pages/SearchResults";

import SavingsAccount from "./Pages/accounts/SavingsAccount";
import CurrentAccount from "./Pages/accounts/CurrentAccount";
import BusinessAccount from "./Pages/accounts/BusinessAccount";
import StudentAccount from "./Pages/accounts/StudentAccount";

import DebitCards from "./Pages/cardsLoans/DebitCards";
import CreditCards from "./Pages/cardsLoans/CreditCards";
import PersonalLoans from "./Pages/cardsLoans/PersonalLoans";
import BusinessLoans from "./Pages/cardsLoans/BusinessLoans";

import MobileBanking from "./Pages/services/MobileBanking";
import InternetBanking from "./Pages/services/InternetBanking";
import CardlessWithdrawal from "./Pages/services/CardlessWithdrawal";

import HelpCenter from "./Pages/support/HelpCenter";
import ContactUs from "./Pages/support/ContactUs";
import FAQs from "./Pages/support/FAQs";
import LiveChat from "./Pages/support/LiveChat";
import Support from "./Pages/Support";
import OpenAccount from "./Pages/accounts/OpenAccount";
import Troubleshooting from "./Pages/support/Troubleshooting";
import Security from "./Pages/support/Security";
import BusinessTools from "./Pages/support/BusinessTools";
import GettingStarted from "./Pages/support/GettingStarted";
import SecureBanking from "./Pages/services/SecureBanking";
import TrackFinances from "./Pages/services/TrackFinances";
import SmartCards from "./Pages/cardsLoans/SmartCards";
import CardApplication from "./Pages/cardsLoans/applyCard";
import AccountOpeningForm from "./Pages/accounts/AccountOpeningForm";
import PrivateBanking from "./Pages/PrivateBanking";
import AffluentBanking from "./Pages/AffluentBanking";
import FinancialReports from "./Pages/support/FinancialReports";
import WelcomeDashboard from "./Pages/WelcomeDashboard";
import TransactionHistory from "./Pages/TransactionHistory";
import Frequent from "./Pages/Frequent";
import UserProfile from "./Pages/UserProfile";
import AccSettings from "./Pages/AccSettings";
import PrivacyPolicy from "./Pages/support/PrivacyPolicy";
import Transfers from "./Pages/Transfers";
import URBTransfer from "./Pages/URBTransfer";
import OtherTrans from "./Pages/OtherTrans";
import Bills from "./Pages/Bills";
import Register from "./Pages/internet-banking/Register";
import ForgotPin from "./Pages/internet-banking/ForgotPin";
import ResetPin from "./Pages/internet-banking/ResetPin";
import AdminApproval from "./Pages/AdminApproval";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import PendingCards from "./Pages/PendingCards";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";
import VerifyInternetBanking from "./Pages/VerifyInternetBanking";

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <>
      <Layout>
        <ScrollToTop />

        {/* Desktop Headers
      <div className="hidden md:block">
        <Header />
        <Header2 />
      </div> */}

        {/* Mobile Header
      <div className="block md:hidden">
        <MobileHeader />
      </div> */}

        {/* Page Routes */}
        <main className="">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />
              <Route
                path="/personal"
                element={
                  <PageWrapper>
                    <Personal />
                  </PageWrapper>
                }
              />
              <Route
                path="/business"
                element={
                  <PageWrapper>
                    <Business />
                  </PageWrapper>
                }
              />
              <Route
                path="/support"
                element={
                  <PageWrapper>
                    <Support />
                  </PageWrapper>
                }
              />
              <Route
                path="/about"
                element={
                  <PageWrapper>
                    <AboutUs />
                  </PageWrapper>
                }
              />

              <Route
                path="/services/internet-banking/verify"
                element={
                  <PageWrapper>
                    <VerifyInternetBanking />
                  </PageWrapper>
                }
              />

              <Route
                path="/private-banking"
                element={
                  <PageWrapper>
                    <PrivateBanking />
                  </PageWrapper>
                }
              />
              <Route
                path="/affluent-banking"
                element={
                  <PageWrapper>
                    <AffluentBanking />
                  </PageWrapper>
                }
              />
              <Route
                path="/accounts/savings"
                element={
                  <PageWrapper>
                    <SavingsAccount />
                  </PageWrapper>
                }
              />
              <Route
                path="/accounts/current"
                element={
                  <PageWrapper>
                    <CurrentAccount />
                  </PageWrapper>
                }
              />
              <Route
                path="/accounts/business"
                element={
                  <PageWrapper>
                    <BusinessAccount />
                  </PageWrapper>
                }
              />
              <Route
                path="/accounts/student"
                element={
                  <PageWrapper>
                    <StudentAccount />
                  </PageWrapper>
                }
              />
              <Route
                path="/accounts/open-account"
                element={
                  <PageWrapper>
                    <OpenAccount />
                  </PageWrapper>
                }
              />
              <Route
                path="/accounts/account-opening-form"
                element={
                  <PageWrapper>
                    <AccountOpeningForm />
                  </PageWrapper>
                }
              />
              <Route
                path="/cards-loans/debit"
                element={
                  <PageWrapper>
                    <DebitCards />
                  </PageWrapper>
                }
              />
              <Route
                path="/cards-loans/applycard"
                element={
                  <PageWrapper>
                    <CardApplication />
                  </PageWrapper>
                }
              />
              <Route
                path="/cards-loans/credit"
                element={
                  <PageWrapper>
                    <CreditCards />
                  </PageWrapper>
                }
              />
              <Route
                path="/cards-loans/smart-cards"
                element={
                  <PageWrapper>
                    <SmartCards />
                  </PageWrapper>
                }
              />
              <Route
                path="/cards-loans/personal-loans"
                element={
                  <PageWrapper>
                    <PersonalLoans />
                  </PageWrapper>
                }
              />
              <Route
                path="/cards-loans/business-loans"
                element={
                  <PageWrapper>
                    <BusinessLoans />
                  </PageWrapper>
                }
              />
              <Route
                path="/services/mobile-banking"
                element={
                  <PageWrapper>
                    <MobileBanking />
                  </PageWrapper>
                }
              />
              <Route
                path="/services/secure-banking"
                element={
                  <PageWrapper>
                    <SecureBanking />
                  </PageWrapper>
                }
              />
              <Route
                path="/services/internet-banking"
                element={
                  <PageWrapper>
                    <InternetBanking />
                  </PageWrapper>
                }
              />
              <Route
                path="/services/cardless-withdrawal"
                element={
                  <PageWrapper>
                    <CardlessWithdrawal />
                  </PageWrapper>
                }
              />

              <Route
                path="/services/track-finances"
                element={
                  <PageWrapper>
                    <TrackFinances />
                  </PageWrapper>
                }
              />
              <Route
                path="/support/help-center"
                element={
                  <PageWrapper>
                    <HelpCenter />
                  </PageWrapper>
                }
              />
              <Route
                path="/support/contact-us"
                element={
                  <PageWrapper>
                    <ContactUs />
                  </PageWrapper>
                }
              />
              <Route
                path="/support/financial-reports"
                element={
                  <PageWrapper>
                    <FinancialReports />
                  </PageWrapper>
                }
              />
              <Route
                path="/support/faqs"
                element={
                  <PageWrapper>
                    <FAQs />
                  </PageWrapper>
                }
              />
              <Route
                path="/support/live-chat"
                element={
                  <PageWrapper>
                    <LiveChat />
                  </PageWrapper>
                }
              />

              <Route
                path="/support/help-center/getting-started"
                element={
                  <PageWrapper>
                    <GettingStarted />
                  </PageWrapper>
                }
              />
              <Route
                path="/support/help-center/business-tools"
                element={
                  <PageWrapper>
                    <BusinessTools />
                  </PageWrapper>
                }
              />
              <Route
                path="/support/help-center/security"
                element={
                  <PageWrapper>
                    <Security />
                  </PageWrapper>
                }
              />
              <Route
                path="/support/help-center/troubleshooting"
                element={
                  <PageWrapper>
                    <Troubleshooting />
                  </PageWrapper>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <PageWrapper>
                    <WelcomeDashboard />
                  </PageWrapper>
                }
              />

              <Route
                path="/transaction-history"
                element={
                  <PageWrapper>
                    <TransactionHistory />
                  </PageWrapper>
                }
              />

              <Route
                path="/frequent"
                element={
                  <PageWrapper>
                    <Frequent />
                  </PageWrapper>
                }
              />

              <Route
                path="/profile"
                element={
                  <PageWrapper>
                    <UserProfile />
                  </PageWrapper>
                }
              />

              <Route
                path="/acc-settings"
                element={
                  <PageWrapper>
                    <AccSettings />
                  </PageWrapper>
                }
              />

              <Route
                path="/support/privacy-policy"
                element={
                  <PageWrapper>
                    <PrivacyPolicy />
                  </PageWrapper>
                }
              />

              <Route
                path="/transfer"
                element={
                  <PageWrapper>
                    <Transfers />
                  </PageWrapper>
                }
              />

              <Route
                path="/URB-transfer"
                element={
                  <PageWrapper>
                    <URBTransfer />
                  </PageWrapper>
                }
              />

              <Route
                path="/other"
                element={
                  <PageWrapper>
                    <OtherTrans />
                  </PageWrapper>
                }
              />

              <Route
                path="/bills"
                element={
                  <PageWrapper>
                    <Bills />
                  </PageWrapper>
                }
              />

              <Route
                path="/internet-banking/register"
                element={
                  <PageWrapper>
                    <Register />
                  </PageWrapper>
                }
              />

              <Route
                path="/internet-banking/forgot-pin"
                element={
                  <PageWrapper>
                    <ForgotPin />
                  </PageWrapper>
                }
              />

              <Route
                path="/internet-banking/reset-pin"
                element={
                  <PageWrapper>
                    <ResetPin />
                  </PageWrapper>
                }
              />
              <Route
                path="/admin"
                element={
                  <PageWrapper>
                    <ProtectedAdminRoute>
                      <AdminApproval />
                    </ProtectedAdminRoute>
                  </PageWrapper>
                }
              />

              <Route
                path="/admin-login"
                element={
                  <PageWrapper>
                    <AdminLogin />
                  </PageWrapper>
                }
              />

              <Route
                path="/admin-dashboard"
                element={
                  <PageWrapper>
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  </PageWrapper>
                }
              />

              <Route
                path="/admin/pending-cards"
                element={
                  <PageWrapper>
                    <ProtectedAdminRoute>
                      <PendingCards />
                    </ProtectedAdminRoute>
                  </PageWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        {/* <Footer /> */}
      </Layout>
    </>
  );
}

export default App;

// ✅ Best Solution: Move Layout Inside the Protected Route
// Instead of wrapping <Layout> globally, you should wrap it inside each route, so that it's only shown when the route is allowed.

// 💡 Updated Route Example
// Instead of:

// jsx
// Copy
// Edit
// <Route
//   path="/admin-dashboard"
//   element={
//     <PageWrapper>
//       <ProtectedAdminRoute>
//         <AdminDashboard />
//       </ProtectedAdminRoute>
//     </PageWrapper>
//   }
// />
// Do this:

// jsx
// Copy
// Edit
// <Route
//   path="/admin-dashboard"
//   element={
//     <ProtectedAdminRoute>
//       <Layout>
//         <PageWrapper>
//           <AdminDashboard />
//         </PageWrapper>
//       </Layout>
//     </ProtectedAdminRoute>
//   }
// />
// And in App.jsx, remove the global <Layout> from around <Routes>. Let each route handle its own layout conditionally.

// ✅ Bonus: Centralize Auth Layouts
// You could also create different layouts:

// MainLayout → For general pages

// AdminLayout → For admin pages

// AuthLayout → For login/register

// This way, you only show Header/Footer if the user is allowed to see them.

// 🧪 Summary of Fix
// Remove global <Layout> wrapper from App.jsx

// Wrap layout inside protected routes

// This ensures no flickering from unprotected layout components

// Let me know if you want help refactoring your App.jsx this way — I can do a quick rewrite for you.
