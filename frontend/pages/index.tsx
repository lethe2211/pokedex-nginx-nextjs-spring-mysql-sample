import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import PokedexList from '../components/pokedex-list'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Pokedex app</title>
      </Head>

      <main className=''>
        <h1 className=''>
          Pokedex app
        </h1>

        <PokedexList></PokedexList>
      </main>
    </div>
  )
}

export default Home
