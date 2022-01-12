import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["hello", { text: "Adrian" }]);
  if (isLoading) return <div>Loading...</div>;

  if (data) return <div>{data.greeting}</div>;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-16 h-16 bg-red-200" />
        <div className="p-8">VS</div>
        <div className="w-16 h-16 bg-red-200" />
      </div>
      <div></div>
    </div>
  );
};

export default Home;
