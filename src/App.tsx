import { useHashRoute, parseRoute } from "./router";
import { Header, Footer, StickyWhatsApp } from "./components/Layout";
import { useReveal } from "./hooks/useReveal";
import { HomePage } from "./pages/Home";
import { StaysPage } from "./pages/Stays";
import { ListingPage } from "./pages/Listing";
import { OwnersPage } from "./pages/Owners";
import { NeighborhoodsIndex, NeighborhoodPage } from "./pages/Neighborhoods";
import { QuizPage } from "./pages/Quiz";
import { AdminLoginPage, AdminDashboardPage, AdminListingFormPage } from "./pages/Admin";

export default function App() {
  const route = useHashRoute();
  const r = parseRoute(route);
  useReveal();

  let page: React.ReactNode = <HomePage />;
  if (r.name === "home") page = <HomePage />;
  else if (r.name === "stays") page = <StaysPage />;
  else if (r.name === "listing") page = <ListingPage slug={r.param!} />;
  else if (r.name === "neighborhoods") page = <NeighborhoodsIndex />;
  else if (r.name === "neighborhood") page = <NeighborhoodPage slug={r.param!} />;
  else if (r.name === "owners") page = <OwnersPage />;
  else if (r.name === "quiz") page = <QuizPage />;
  else if (r.name === "admin-login") page = <AdminLoginPage />;
  else if (r.name === "admin") page = <AdminDashboardPage />;
  else if (r.name === "admin-new" || r.name === "admin-edit") page = <AdminListingFormPage />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{page}</div>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}
