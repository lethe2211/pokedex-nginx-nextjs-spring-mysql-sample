import type { NextPageWithLayout } from './_app'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import PokedexList from '../components/pokedex-list'
import styles from '../styles/Home.module.css'

const Home: NextPageWithLayout = () => {
  return (
    <div className='container'>
      <Head>
        <title>Pokedex app</title>
      </Head>

      <PokedexList />
    </div>
  )
}

Home.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  );
}

export default Home
