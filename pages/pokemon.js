import { Component } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import PokeInfo from '../components/Pokemon/PokeInfo';
import Error from './_error';


class Pokemon extends Component {

  static async getInitialProps({req, res, query}) {
    let pokemonDetails = null;
    let speciesDetails = null;
    try {
      const resSpecies = await axios(`https://pokeapi.co/api/v2/pokemon-species/${query.id}/`);
      const resPokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${query.id}/`);

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