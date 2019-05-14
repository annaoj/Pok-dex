import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import axios from 'axios';
import PokemonList from '../components/Pokemon/PokemonList';
import Pokemon from '../components/Pokemon/Pokemon';
import Error from './_error';
import Link from 'next/link';

export default class Index extends Component {
  static async getInitialProps({ req, res, query }) {
    let pokemonData = null;

    try {
      const res = await axios(`https://pokeapi.co/api/v2/pokedex/1`);
      pokemonData = res.data;
    } catch (error) {
      pokemonData = null;
    }
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
    const { pokemonData } = this.props;
    if (!pokemonData) {
      return <Error statusCode={503} />
    }

    return (
      <Layout>
        <div className="container">
          <h6>Welcome to Pokemon National world!</h6>
          <PokemonList pokemonData={pokemonData} />
        </div>
      </Layout>
    )
  }
}


