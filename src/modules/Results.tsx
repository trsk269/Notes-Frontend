import Card from "../molecules/Card";

export default function Result() {
  return (
    <div className="w-full grid grid-cols-2 gap-1 h-auto border border-black p-2">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
