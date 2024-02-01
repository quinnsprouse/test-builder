import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "4d2f2f8e",
      amount: 200,
      status: "processing",
      email: "q@gmail.com",
    },
    {
      id: "f8e2d2f4",
      amount: 300,
      status: "success",
      email: "test@gmail.com",
    },
    {
      id: "f8e2d2f4",
      amount: 300,
      status: "failed",
      email: "testemail@gmail.com",
    },
    {
      id: "f8e2d2f4",
      amount: 300,
      status: "success",
      email: "evenmore@gmail.com",
    },

    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
