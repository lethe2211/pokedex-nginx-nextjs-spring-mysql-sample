import { gql, useQuery } from '@apollo/client';
import { NextPage } from 'next';

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

const PokedexList: NextPage = () => {
    const { loading, error, data } = useQuery<AllPokedexData>(GET_ALL_POKEDEX_DATA_QUERY);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>
    }

    const { getAllPokedexData: allPokedexData } = data || {};


    return (<>
        <ul>
            {allPokedexData?.map((pokedexData, i) => (
                <li key={i}>
                    {pokedexData.id}: {pokedexData.nameEn}
                </li>
            ))}
        </ul>
        <p>
             Debug: {JSON.stringify(allPokedexData)}
        </p>
    </>);
}

export default PokedexList;