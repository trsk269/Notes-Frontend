import NavBar from "../modules/NavBar";
import DefaultAdd from "../modules/DefaultAdd";
import Options from "../modules/Options";
import Results from "../modules/Results";

export default function HomePage() {
  return (
    <>
      <div className="h-auto w-full flex flex-col gap-6 items-center justify-start p-5 overflow-y-auto">
        <NavBar />
        <DefaultAdd />
        <Options />
        <Results />
      </div>
    </>
  );
}
