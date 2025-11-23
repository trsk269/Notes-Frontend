import AddorUpdateNote from "@/src/modules/AddorUpdateNote";

const page = () => {
  return (
    <AddorUpdateNote
      mode="update"
      defaultData={{
        title: "Existing Note Title",
        content: "This is the existing note content...",
        date: "2024-01-15",
      }}
    />
  );
};

export default page;
