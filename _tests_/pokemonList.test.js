
import { shallow, mount } from 'enzyme';
import React from 'react';
import PokemonList from '../components/Pokemon/PokemonList';
import Pokemon from '../components/Pokemon/Pokemon';


describe('PokemonList component', () => {

  let wrapper;

  beforeEach(async () => {
    const props = {
      pokemonData:
      {
        descriptions: [],
        id: '1',
        is_main_series: true,
        name: 'national',
        names: [],
        pokemon_entries: [
              {
                entry_number:1,
                pokemon_species:
                  {
                    name: "bulbasaur",
                    url: "https://pokeapi.co/api/v2/pokemon-species/1/"
                  }
              },
              {
                entry_number: 2,
                pokemon_species:
                  {
                    name: "ivysaur",
                    url: "https://pokeapi.co/api/v2/pokemon-species/2/"
                  }
              }
         ]
      }
    }
    wrapper = shallow(<PokemonList {...props} />)
  });

  it('should dispaly 2 Pokemon components', () => {
    expect(wrapper.find(Pokemon).length).toEqual(2);
  });

})

