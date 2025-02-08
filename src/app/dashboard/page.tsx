import { getDBUser } from "@/lib/data-access";

export default async function Dashboard() {
  const user = await getDBUser();

  if (!user) {
    return <div>Loading...</div>;
  }
  return <div>Dashboard</div>;
}
