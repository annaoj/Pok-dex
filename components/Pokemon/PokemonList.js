import React, { Component } from 'react';
import Pokemon from './Pokemon';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };

  }

  render() {
    const { pokemonData } = this.props;
    if (!pokemonData) return (
      <div>
        <p>Error with data</p>
      </div>
    );

    // console.log(pokemonData.pokemon_entries);

    return (
      <div className="row">
      {pokemonData ? (
         pokemonData.pokemon_entries.map((poke, i) => {
        // pokemonData.results.map((poke, i) => {
        return (
          <Pokemon
            // key={i}
            // name={poke.name}
            // url = {poke.url}
              key={i}
              name={poke.pokemon_species.name}
              url = {poke.pokemon_species.url}
              pokeId = {poke.entry_number}
      
          />

        );
      })) : (
        <h1> Loading </h1>
      )
    }
    </div>
      // <div className="row">
      //   {(pokemonData && pokemonData.pokemon_entries) ? (
      //     pokemonData.pokemon_entries.map((poke, i) => {
      //     return (
      //       <Pokemon
      //         key={i}
      //         name={poke.pokemon_species.name}
      //         url = {poke.pokemon_species.url}
      //         pokeId = {poke.entry_number}
      //       />

      //     );
      //   })) : (
      //     <h1> Loading </h1>
      //   )
      // }
      // </div>
    );
  }
}

export default PokemonList;