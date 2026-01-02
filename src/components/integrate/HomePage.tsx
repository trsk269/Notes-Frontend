import NavBar from "../modules/NavBar";
import DefaultAdd from "../modules/DefaultAdd";
import Options from "../modules/Options";
import Results from "../modules/Results";

export default function HomePage() {
  return (
    <>
      <div className="h-auto w-full min-h-screen flex flex-col gap-3 items-center justify-start p-2 overflow-y-auto bg-black">
        <NavBar />
        <DefaultAdd />
        <Options />
        <Results />
      </div>
    </>
  );
}
