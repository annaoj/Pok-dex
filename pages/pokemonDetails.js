import { Component } from 'react';

class PokemonDetails extends Component {
    static async getInitialProps({req, res, query}) {
        let pokemonData = null;
    
console.log(query);
    
      }
    render(){
        return <div>details</div>
    }
}
export default PokemonDetails;