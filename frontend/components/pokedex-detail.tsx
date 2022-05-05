import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import PokedexData from "../models/pokedex-data";
import "../libs/string-util";
import Link from "next/link";

const GET_POKEDEX_DATA_QUERY = gql`
  query getPokedexData($pokemonId: ID) {
    getPokedexData(id: $pokemonId) {
      id
      nameEn
      height
      weight
      types {
        nameEn
      }
      abilities {
        nameEn
      }
    }
  }
`;

const selectColor = (name: string) => {
  switch (name) {
    case "normal":
      return "#A8A77A";
    case "fire":
      return "#ee8130";
    case "water":
      return "#6390f0";
    case "electric":
      return "#f7d02c";
    case "grass":
      return "#7ac74c";
    case "ice":
      return "#96d9d6";
    case "fighting":
      return "#c22e28";
    case "poison":
      return "#a33ea1";
    case "ground":
      return "#e2bf65";
    case "flying":
      return "#a98ff3";
    case "psychic":
      return "#f95587";
    case "bug":
      return "#a6b91a";
    case "rock":
      return "#b6a136";
    case "ghost":
      return "#735797";
    case "dragon":
      return "#6f35fc";
    case "dark":
      return "#705746";
    case "steel":
      return "#b7b7ce";
    case "fairy":
      return "#d685ad";
    default:
      return undefined;
  }
};

interface PokedexDataResponse {
  getPokedexData: PokedexData;
}

type Props = {
  pokemonId: number;
};

const PokedexDetail: React.VFC<Props> = ({ pokemonId }) => {
  const { loading, error, data } = useQuery<PokedexDataResponse>(
    GET_POKEDEX_DATA_QUERY,
    { variables: { pokemonId: pokemonId } }
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  const { getPokedexData: getPokedexData } = data || {};

  const imageUrl = `/images/pokemon/${String(pokemonId).padStart(3, "0")}.png`;
  const name = getPokedexData?.nameEn;
  const weight = getPokedexData?.weight;
  const height = getPokedexData?.height;
  const types = getPokedexData?.types;

  const previousPokemonUrl =
    pokemonId - 1 >= 1
      ? `/pokemon/${String(pokemonId - 1).padStart(3, "0")}`
      : "N/A";
  const nextPokemonUrl =
    pokemonId + 1 <= 809
      ? `/pokemon/${String(pokemonId + 1).padStart(3, "0")}`
      : "N/A";

  return (
    <section>
      <div className="container">
        <div className="flex justify-center my-3 gap-x-9">
          <div className="flex w-16">
            {previousPokemonUrl != "N/A" && (
              <div className="flex items-center">
                <Link href={previousPokemonUrl} passHref>
                  <button className="text-yellow-500 hover:bg-yellow-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex">
            <Image src={imageUrl} alt={name} width={300} height={300} />
          </div>
          <div className="flex flex-col gap-y-9 w-96">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold mr-9">
                {name?.capitalizeFirstChar()}
              </span>
              <span className="text-2xl">#{pokemonId}</span>
            </div>
            <table>
              <tbody className="flex flex-col gap-y-1 w-96">
                <tr className="flex items-center justify-between">
                  <td className="flex w-2/5">
                    <span className="text-xl">Type</span>
                  </td>
                  <td className="flex gap-x-1">
                    {types?.map((type, i) => (
                      <span
                        className="text-gray-50 rounded p-0.5"
                        key={i}
                        style={{ backgroundColor: selectColor(type.nameEn) }}
                      >
                        {type.nameEn.capitalizeFirstChar()}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr className="flex items-center justify-between">
                  <td className="flex w-2/5">
                    <span className="text-xl">Height</span>
                  </td>
                  <td className="flex">
                    <span className="">{height} m</span>
                  </td>
                </tr>
                <tr className="flex items-center justify-between">
                  <td className="flex w-2/5">
                    <span className="text-xl">Weight</span>
                  </td>
                  <td className="flex">
                    <span className="">{weight} kg</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex w-16">
            {nextPokemonUrl != "N/A" && (
              <div className="flex items-center">
                <Link href={nextPokemonUrl} passHref>
                  <button className="text-yellow-500 hover:bg-yellow-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default PokedexDetail;
