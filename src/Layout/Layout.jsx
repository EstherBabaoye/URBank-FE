import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Header2 from "../Components/Header2";
import MobileHeader from "../Components/MobileHeader";
import { Footer } from "../Components/Footer";

export default function Layout({ children }) {
  const location = useLocation();

  // Routes where you want to completely hide global layout
  const hiddenRoutes = [
    "/dashboard",
    "/transaction-history",
    "/transfer",
    "/bills",
    "/acc-settings",
    "/beneficiaries",
    "/frequent",
    "/feedback",
    "/profile",
    
  ];

  const shouldHideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && (
        <>
          {/* Desktop Header */}
          <div className="hidden md:block">
            <Header />
            <Header2 />
          </div>

          {/* Mobile Header */}
          <div className="block md:hidden">
            <MobileHeader />
          </div>
        </>
      )}

      <main>{children}</main>

      {!shouldHideLayout && <Footer />}
    </>
  );
}
