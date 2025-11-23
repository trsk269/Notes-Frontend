"use client";

import { useState } from "react";
import NavBar from "../modules/NavBar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation Schema
const noteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  date: z.string().min(1, { message: "Date is required" }),
});

type NoteForm = z.infer<typeof noteSchema>;

interface AddorUpdateNoteProps {
  mode: "add" | "update";
  defaultData?: {
    title: string;
    content: string;
    date: string;
  };
}

export default function AddorUpdateNote({
  mode,
  defaultData,
}: AddorUpdateNoteProps) {
  const [isEditing, setIsEditing] = useState(mode === "add");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
    defaultValues: defaultData || {
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0], // Today's date as default
    },
  });

  const onSubmit = (data: NoteForm) => {
    console.log("Note data:", data);
    if (mode === "add") {
      alert("Note created successfully!");
      reset();
    } else {
      alert("Note updated successfully!");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (mode === "add") {
      reset();
    } else {
      setIsEditing(false);
      reset(defaultData);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="h-screen w-full flex flex-col gap-6 items-center justify-start p-5 overflow-y-auto">
      <NavBar />
      <div className="h-full w-full max-w-2xl border border-gray-300 rounded-lg flex flex-col gap-4 bg-white shadow-md">
        {/* Header Section */}
        <div className="border-b border-gray-200 p-4">
          {isEditing ? (
            <div className="flex flex-col space-y-3">
              <input
                {...register("title")}
                placeholder="Enter note title"
                className="text-xl font-semibold p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Date:</label>
                <input
                  type="date"
                  {...register("date")}
                  className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-semibold">
                {defaultData?.title || "No Title"}
              </h1>
              <p className="text-xs text-gray-500">
                {defaultData?.date
                  ? new Date(defaultData.date).toLocaleDateString()
                  : "No Date"}
              </p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1">
          {isEditing ? (
            <div className="h-full flex flex-col">
              <textarea
                {...register("content")}
                placeholder="Enter your note content"
                className="flex-1 w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.content.message}
                </p>
              )}
            </div>
          ) : (
            <div className="h-full p-3 border border-gray-200 rounded bg-gray-50">
              <p className="whitespace-pre-wrap">
                {defaultData?.content || "No content available"}
              </p>
            </div>
          )}
        </div>

        {/* Buttons Section */}
        <div className="w-full flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSubmit(onSubmit)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                {mode === "add" ? "Create" : "Update"}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
