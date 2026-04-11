import AddorUpdateNote from "../../../../src/components/modules/AddorUpdateNote";

import { use } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return <AddorUpdateNote mode="update" noteId={id} />;
};

export default Page;
