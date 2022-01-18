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
      <img
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20"
        src="https://i.stack.imgur.com/kOnzy.gif"
        alt=""
      />
    );

  const voteForRoundest = (selected: number) => {
    // todo: fire muttion to persist changes
    setIds(getOptionsForVote())
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">
        Which Pokémon is <strong>ROUNDER?</strong>
      </div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-48 flex flex-col items-center">
          <img
            src={firstPokemon.data?.sprites.front_default!}
            alt="pokemon"
            className="w-full"
          />
          <div className="capitalize">{firstPokemon.data?.name}</div>
          <button className="voteButton" onClick={() => voteForRoundest()}>Rounder</button>
        </div>
        <div className="p-8">VS</div>
        <div className="w-48 flex flex-col items-center">
          <img
            src={secondPokemon.data?.sprites.front_default!}
            alt="pokemon"
            className="w-full"
          />
          <div className="capitalize">{secondPokemon.data?.name}</div>
          
          <button className="voteButton" onClick={() => voteForRoundest()}>Rounder</button>

        </div>
      </div>
      <div className="mb-3"></div>
    </div>
  );
};

export default Home;
