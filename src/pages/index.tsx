/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";
import type React from "react";
import { inferQueryResponse } from "./api/trpc/[trpc]";

const Home: NextPage = () => {
  const [ids, setIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteMutation = trpc.useMutation(["cast-vote"]);

  const voteForRoundest = (selected: number) => {
    if (selected === first) {
      console.log(first);
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    } else {
      console.log(second);
      voteMutation.mutate({ votedFor: second, votedAgainst: first });
    }

    setIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">
        Which Pokémon is <strong>ROUNDER?</strong>
      </div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        {!firstPokemon.isLoading && !secondPokemon.isLoading && (
          <>
            <PokemonListing
              pokemon={firstPokemon.data}
              vote={() => voteForRoundest(first)}
            />
            <div className="p-8">VS</div>
            <PokemonListing
              pokemon={secondPokemon.data}
              vote={() => voteForRoundest(second)}
            />
          </>
        )}
      </div>
      <div className="p-2"></div>
    </div>
  );
};

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={props.pokemon.sprites.front_default!}
        alt="pokemon"
        className="w-56"
      />
      <div className="capitalize">{props.pokemon.name}</div>
      <button className="voteButton" onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};

export default Home;
