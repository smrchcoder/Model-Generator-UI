import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import GenerateModelPage from "./pages/GenerateModelPage";
import GenerationStatusPage from "./pages/GenerationStatusPage";
import HomePage from "./pages/HomePage";
import LibraryModelPage from "./pages/LibraryModelPage";
import PublicLibraryPage from "./pages/PublicLibraryPage";

function LegacyLibraryEntryRedirect() {
  const { runId } = useParams<{ runId: string }>();

  return <Navigate replace to={runId ? `/library/${runId}` : "/library"} />;
}

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/try" element={<GenerateModelPage />} />
        <Route path="/runs/:runId" element={<GenerationStatusPage />} />
        <Route path="/library" element={<PublicLibraryPage />} />
        <Route path="/library/:runId" element={<LibraryModelPage />} />
        <Route path="/saved-flows" element={<Navigate replace to="/library" />} />
        <Route
          path="/saved-flows/:runId"
          element={<LegacyLibraryEntryRedirect />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
