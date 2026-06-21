import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import TopBar from "./components/TopBar";
import ModelLibraryDetailPage from "./pages/ModelLibraryDetailPage";
import ModelLibraryPage from "./pages/ModelLibraryPage";
import HomePage from "./pages/HomePage";
import TryItOutPage from "./pages/TryItOutPage";

function LegacyLibraryEntryRedirect() {
  const { slug } = useParams<{ slug: string }>();

  return <Navigate replace to={slug ? `/library/${slug}` : "/library"} />;
}

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/try" element={<TryItOutPage />} />
        <Route path="/library" element={<ModelLibraryPage />} />
        <Route path="/library/:slug" element={<ModelLibraryDetailPage />} />
        <Route path="/saved-flows" element={<Navigate replace to="/library" />} />
        <Route
          path="/saved-flows/:slug"
          element={<LegacyLibraryEntryRedirect />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
