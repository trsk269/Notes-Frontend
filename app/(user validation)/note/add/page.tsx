import AddorUpdateNote from "@/src/modules/AddorUpdateNote";

const page = () => {
  return (
    <div className="h-screen w-full">
      <AddorUpdateNote mode="add" />
    </div>
  );
};

export default page;
