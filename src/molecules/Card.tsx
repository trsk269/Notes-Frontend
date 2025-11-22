import { MdOutlineModeEdit } from "react-icons/md";

export default function Card() {
  return (
    <div className="w-full h-auto flex flex-col border border-black rounded-lg p-2 gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold ">Not sure where this is going</h1>
        <p className="text-sm">4th Jan 2050</p>
      </div>

      <div className="">
        <p className="text-sm">
          Don't read the caption, its all same, you dumb dumb, did you even read
          this though
        </p>
      </div>

      <div className="w-fit h-fit">
        <MdOutlineModeEdit size={16} />
      </div>
    </div>
  );
}
