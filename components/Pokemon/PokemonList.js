import React, { Component } from 'react';
import Pokemon from './Pokemon';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      currentPage: 1,
      itemsPerPage: 40
    };

  }
  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const {pokemonData} = this.props;
    const { currentPage, itemsPerPage } = this.state;

    if (!this.props.pokemonData) return (
      <div>
        <p>Error with data</p>
      </div>
    );

    // Logic for displaying current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pokemonData && pokemonData.pokemon_entries.slice(indexOfFirstItem, indexOfLastItem);

    const renderItems = currentItems.map((poke, i) => {
      return (
            <Pokemon
              key={i}
              name={poke.pokemon_species.name}
              url={poke.pokemon_species.url}
              pokeId={poke.entry_number}

            />
      )
    });


    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pokemonData.pokemon_entries.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button
        className="button is-light mr-2"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </button>
      );
    });

    return (
      <div>
         <div className="row">
          {renderItems}
       </div>
        <div className="row mt-5 mb-5" >
         {renderPageNumbers}
        </div>
      </div>
    );
  }
}

export default PokemonList;