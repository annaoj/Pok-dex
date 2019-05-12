import React, { Component } from 'react';
import Link from 'next/link';

class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            name: '',
            imgUrl: '',
            pokeId: '',
            imageLoading:true,
            errorImg: false
        };

    }


    componentDidMount() {
        const { url, name } = this.props;
        const pokeId = url.split('/')[url.split('/').length - 2];
        const imgUrl = `/static/sprites/${pokeId}.png`;
        // const imgUrl = `http://pokestadium.com/sprites/xy/${name}.gif`;
        // const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokeId}.png?raw=true`;
        this.setState({imgUrl, pokeId});
    }

    render() {
        const { pokemonData, name, url } = this.props;
        const { pokeId, imgUrl } = this.state;

        if (!this.props) return (
            <div>
                <p>Error with data</p>
            </div>
        );

        return (
            <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
            <div className="card"  >
                <img 
                    className="card-img-top d-block mx-auto mt-2 pokeImg" 
                    src={imgUrl || null}
                    alt={name}
                    // onLoad={()=>this.setState({imageLoading:false})}
                    // onError={()=>this.setState({errorImg:true})}
                />
                <div className="card-block">
                    <h4 className="card-title mt-3">{name}</h4>
                    <div className="card-text">
                        {url} 
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-secondary float-right btn-sm">
                    <Link  href={`/pokemonDetails?id=${pokeId}`} ><a href={`/${pokeId}`}>Info</a></Link>
                    </button>
                </div>
            </div>
            <style jsx>
            {`
            .pokeImg{
                width: auto;

            }
            body {
                background-color: #cdcdcd;
             }
            `}
            </style>
          </div>
        );
    }
}

export default Pokemon;