import { gql, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import Layout from '../components/layout'
import NextPageWithLayout from '../pages/_app';

const GET_ALL_POKEDEX_DATA_QUERY = gql`
    query {
        getAllPokedexData {
            id
            nameEn
        }
    }
`

interface Type {
    name: string
}

interface Ability {
    name: string
}

interface PokedexData {
    id: string
    nameEn: string
    height: number
    weight: number
    types: Type[]
    abilities: Ability[]
}

interface AllPokedexData {
    getAllPokedexData: PokedexData[]
}

const PokedexList = () => {
    const { loading, error, data } = useQuery<AllPokedexData>(GET_ALL_POKEDEX_DATA_QUERY);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>
    }

    const { getAllPokedexData: allPokedexData } = data || {};

    return (
        <section>
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {allPokedexData?
                        .slice(0, 809) // TODO: API should remove pokemons that do not have any image
                        .map((pokedexData, i) => {
                            const pokemonIdStr = `#${String(pokedexData.id).padStart(3, "0")}`;
                            const imageUrl = `/images/pokemon/${String(pokedexData.id).padStart(3, "0")}.png`;
                            const linkUrl = `/pokemon/${String(pokedexData.id).padStart(3, "0")}`;

                            return (
                                <div key={i} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                                    <article className="overflow-hidden rounded-lg shadow-lg">
                                        <Link href={linkUrl}>
                                            <a>
                                                {/* <Image
                                                    src={imageStr}
                                                    alt={pokedexData.nameEn}
                                                    layout="fill" /> */}
                                                <img src={imageUrl} alt={pokedexData.nameEn} />
                                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                                    <h1 className="text-lg">
                                                        {pokedexData.nameEn}
                                                    </h1>
                                                    <p className="text-grey-darker text-sm">
                                                        {pokemonIdStr}
                                                    </p>
                                                </header>
                                            </a>
                                        </Link>
                                    </article>
                                </div>
                            );
                        }
                )}
            </div>
        </div>
    </section>
    );
}

export default PokedexList;