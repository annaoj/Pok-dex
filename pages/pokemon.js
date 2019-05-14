import { Component } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import PokeInfo from '../components/Pokemon/PokeInfo';
import Error from './_error';
import Link from 'next/link';

class Pokemon extends Component {

  static async getInitialProps({req, res, query}) {
    let pokemonDetails = null;
    let speciesDetails = null;
    try {
      const resSpecies = await axios(`https://pokeapi.co/api/v2/pokemon-species/${query.id}/`);
      const resPokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${query.id}/`);
      // const res = await axios(`https://pokeapi.co/api/v2/pokemon-species/${query.id}/`);

      speciesDetails = resSpecies.data;
      pokemonDetails = resPokemon.data;

    } catch (error) {

      pokemonDetails = null;
      speciesDetails = null;
    }
    return {
      pokemonDetails,
      speciesDetails
    };

  }


  render() {
    const { pokemonDetails, speciesDetails } = this.props;
    if (!pokemonDetails || !speciesDetails) {
      return <Error statusCode={503} />
    }

    return (
      <Layout>
        <div className="container">
          <PokeInfo 
            pokemonDetails={pokemonDetails} 
            speciesDetails={speciesDetails}
          />
        </div>
      </Layout>
    )
  }
}
export default Pokemon;