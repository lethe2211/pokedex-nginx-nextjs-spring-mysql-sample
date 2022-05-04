import type { NextPageWithLayout } from '../_app';
import Layout from '../../components/layout'
import { useRouter } from "next/router";
import PokedexDetail from '../../components/pokedex-detail';
import Head from 'next/head';
import { ReactElement } from 'react';

const PokemonDetail: NextPageWithLayout = () => {
    const router = useRouter();
    const idStr = router.query['id'];

    let id;
    if (typeof idStr === 'string') {
        id = parseInt(idStr);
    } else if (Array.isArray(idStr) && idStr.length >= 1) {
        id = parseInt(idStr[0]);
    } else {
        id = 0;
    }

    return (
        <div className='container'>
            <Head>
                <title>Pokedex app</title>
            </Head>

            <PokedexDetail pokemonId={id} />
        </div>
    );
}

PokemonDetail.getLayout = (page: ReactElement) => {
    return (
      <Layout>{page}</Layout>
    );
}
export default PokemonDetail;