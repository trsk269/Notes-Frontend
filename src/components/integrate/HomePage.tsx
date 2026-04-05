import NavBar from "../modules/NavBar";
import DefaultAdd from "../modules/DefaultAdd";
import Options from "../modules/Options";
import Results from "../modules/Results";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-[#F9FAFB] flex flex-col items-center overflow-x-hidden">
      {/* Optimized content width for dashboard feel */}
      <div className="w-full max-w-2xl flex flex-col gap-6 py-8 px-4 sm:px-6">
        <NavBar />

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <DefaultAdd />
          <Options />
        </div>

        <div className="mt-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Results />
        </div>
      </div>
    </main>
  );
}
