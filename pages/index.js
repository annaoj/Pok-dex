import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import axios from 'axios';
import PokemonList from '../components/Pokemon/PokemonList';
import Pokemon from '../components/Pokemon/Pokemon';
import Error from './_error';
import Link from 'next/link';
// const Index = (props) => (
export default class Index extends Component {


  static async getInitialProps({req, res, query}) {
    let pokemonData = null;

    try {

      // const res = await axios('https://pokeapi.co/api/v2/pokedex/1/?limit=20&offset=20');
      // const res = await axios(`http://pokeapi.co/api/v2/pokemon/?limit=721&offset=${offset}`);
      const res = await axios(`https://pokeapi.co/api/v2/pokedex/1`);

      pokemonData = res.data;


    } catch (error) {

      pokemonData = null;

    }

    // const statusCode = res.status > 200 ? res.status : false;
    return {
      pokemonData
    };

  }
  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful", registration);
        })
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });
    }
  }
  render() {
    const { statusCode, pokemonData, offset,
      page } = this.props;
    if (pokemonData.length == 0 || !pokemonData) {
      return <Error statusCode={503} />
    }

    return (
      <Layout>
        <div className="container">
          <h1>Welcome to Pokedex.org</h1>
          <PokemonList pokemonData={pokemonData} />
        </div>
      </Layout>
    )
  }


}


