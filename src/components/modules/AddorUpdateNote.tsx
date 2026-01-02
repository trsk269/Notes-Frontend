import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { LuBellPlus } from "react-icons/lu";
import { RiInboxArchiveLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscSymbolColor } from "react-icons/vsc";
import { PiTextAUnderlineBold } from "react-icons/pi";
import { MdAdd } from "react-icons/md";

interface AddorUpdateNoteProps {
  mode: "add" | "update";
}

const AddorUpdateNote = ({ mode }: AddorUpdateNoteProps) => {
  return (
    <div className="h-full bg-black p-4">
      <div className="flex items-center justify-between">
        <div className="w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full cursor-pointer">
          <IoMdArrowBack className="text-white" />
        </div>
        <div className="flex gap-2">
          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <LuBellPlus className="text-white" />
          </div>

          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <RiInboxArchiveLine className="text-white" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col overflow-y-scroll mt-12">
        <input
          type="text"
          placeholder="Title"
          className="p-2 outline-none text-white text-3xl"
        />

        <input
          type="text"
          placeholder="Note"
          className="p-2 outline-none text-white text-xl"
        />
      </div>

      <div className="flex items-center justify-between fixed bottom-4 left-4 right-4">
        <div className="flex gap-2">
          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <MdAdd className="text-white" />
          </div>

          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <PiTextAUnderlineBold className="text-white" />
          </div>

          <div className="w-[1.5rem] h-[1.5rem] border border-white flex items-center justify-center rounded-md cursor-pointer">
            <VscSymbolColor className="text-white" />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full cursor-pointer">
            <BsThreeDotsVertical className="text-white" />
          </div>

          <button className="text-white">
            {mode === "add" ? "Add Note" : "Update Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddorUpdateNote;
