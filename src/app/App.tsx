import { ClientNavbar } from "./components/ClientNavbar";
import { OperationalScopesGrid } from "./components/OperationalScopesGrid";
import { FileSubmissionSection } from "./components/FileSubmissionSection";
import { ClientFooter } from "./components/ClientFooter";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ClientNavbar />
      <OperationalScopesGrid />
      <FileSubmissionSection />
      <ClientFooter />
    </div>
  );
}