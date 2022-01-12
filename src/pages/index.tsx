/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";
import Image from "next/image";

const Home: NextPage = () => {
  const [ids, setIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        LOADING...
      </div>
    );

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="transition ease-in-out delay-150 w-40 h-40 bg-green-200 rounded-full hover:bg-violet-400 flex flex-col items-center">
          <img
            src={firstPokemon.data?.sprites.front_default}
            alt="pokemon"
            className="w-full"
          />
          <div className="capitalize">{firstPokemon.data?.name}</div>
        </div>
        <div className="p-8">VS</div>
        <div className="transition ease-in-out delay-150 w-40 h-40 bg-green-200 rounded-full hover:bg-violet-400 flex flex-col items-center">
          <img
            src={secondPokemon.data?.sprites.front_default}
            alt="pokemon"
            className="w-full"
          />
          <div className="capitalize">{secondPokemon.data?.name}</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
