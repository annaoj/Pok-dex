import React, { Component } from 'react';
import Link from 'next/link';
import { getPokeImg } from '../../utils/pokeImage';

class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            name: '',
            imgUrl: '',
            pokeId: '',
            imageLoading: true,
            errorImg: false
        };

    }
    static getDerivedStateFromProps(props, state){
        // console.log(props);
        // console.log(state);
        if( state.pokeId !== props.pokeId){
            const imgUrl = props.pokeId ? getPokeImg(props.pokeId) : null;
            const pokeId = props.pokeId;
            // this.setState({ imgUrl });
            return {imgUrl, pokeId};
        }

    }



    componentDidMount() {
        const { url } = this.props;
        if(!this.props) this.setState({ error :true });
        const pokeId = url ? url.split('/')[url.split('/').length - 2] : null;
        //const imgUrl = pokeId ? getPokeImg(pokeId) : null;
        this.setState({ pokeId });
    }

    render() {
        const { pokemonData, name, url } = this.props;
        const { pokeId, imgUrl, error } = this.state;

        if (!this.props || error) return (
            <div>
                <p>Error with data</p>
            </div>
        );

        
        return (
            <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
             <Link href={`/pokemon?id=${pokeId}`}>
                <div className="card poke-card"  >
                    <img
                        className="card-img-top d-block mx-auto mt-2 pokeImg"
                        src={imgUrl || null}
                        alt={name}
                    />
                    <div className="card-block">
                        <p className="card-title text-center  mt-2">{pokeId}. {name.toUpperCase()}</p>
                    </div>
                    
                </div>
                </Link>
                <style jsx>
                    {`
                        .pokeImg{
                            width: auto;

                        }
                        body {
                            background-color: #cdcdcd;
                        }
                        .poke-card {
                            border-radius: 2px;
                            background: #fff;
                            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                            transition: all 0.56s cubic-bezier(0.25, 0.8, 0.25, 1);
                            max-width: 500px;
                            padding: 30px;
                            margin: 10px auto;
                            cursor: pointer;
                            max-height: 225px;
                        }
                        
                        .poke-card:hover, .poke-card:focus {
                            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px
                                rgba(0, 0, 0, 0.22);
                        }
                        
                        .poke-card:focus-within {
                            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px
                                rgba(0, 0, 0, 0.22);
                        }
                     `}
                </style>
            </div>
        );
    }
}

export default Pokemon;