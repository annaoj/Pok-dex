
import { shallow, mount } from 'enzyme';
import React from 'react';
import PokemonList from '../components/Pokemon/PokemonList';
import App from '../pages/index.js';
import Error from '../pages/_error';

describe('With pokemon data', () => {

  let index;

  beforeEach(async () => {
    const props = await App.getInitialProps('http', '', '')
    index = shallow(<App {...props} />)
  });

  it('Index page shows "Welcome to Pokemon National world!"', () => {
    expect(index.find('h6').text()).toEqual('Welcome to Pokemon National world!')
  });

  it('Index page renders <PokemonList> component', () => {
    expect(index.find(PokemonList).length).toEqual(1);
  });
})


describe('Without pokemon data', () => {
  const mockpokemonData = null;
  const mockStatusCode = 503;
  it('Index page display error if there is no data returned', () => {
    const index = shallow(<App pokemonData={mockpokemonData} />)
    expect(index.find(Error).length).toEqual(1);
  });
})