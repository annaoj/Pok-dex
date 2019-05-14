
import { shallow, mount } from 'enzyme';
import React from 'react';
import Pokemon from '../components/Pokemon/Pokemon';
import App from '../pages/index.js';

describe('Pokemon component with data', () => {

  let wrapper;
  beforeEach(async () => {
    const props = {
      name: "bulbasaur",
      pokeId: 1,
      url: "https://pokeapi.co/api/v2/pokemon-species/1/"
    }
    wrapper = shallow(<Pokemon {...props} />)
  });

  it('Pokemon component display name of pokemon "bulbasaur" in upper cases with pokeId ', () => {
    expect(wrapper.find('h6').text()).toEqual('1. BULBASAUR');
  });

})

