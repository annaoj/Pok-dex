import React, { Component } from 'react';
import Link from 'next/link';
import { getPokeImg } from '../../utils/pokeImage';
import { PokeTypeColors } from '../../utils/pokeColor';
class PokeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            base_happiness: '',
            color: '',
            types: [],
            description: '',
            stats: {},
            height: '',
            weight: '',
            eggGroup: '',
            ability: '',
            genderRationFem: '',
            genderRationMale: '',
            evs: '',
            hatchSteps: '',
            capture_rate: '',
            lang: 'en'

        };

    }


    componentDidMount() {
        const { pokemonDetails, speciesDetails } = this.props;
        const { lang } = this.state;
        const imgUrl = getPokeImg(speciesDetails.id);
        const bkgColor = speciesDetails.color.name;
        document.body.style = `background:${bkgColor}`;


        let speciesInfo = {};
        let pokeDetailsInfo = {};

        if (pokemonDetails) pokeDetailsInfo = this.getPokeDetails(pokemonDetails);
        if (speciesDetails) speciesInfo = this.getSpeciesInfo(speciesDetails, lang);


        this.setState({ imgUrl, bkgColor, ...speciesInfo, ...pokeDetailsInfo });
    }

    componentWillUnmount() {
        document.body.style = null;
    }

    getStats = (stats) => {
        let hp, attack, defense, speed, stk, sdef = '';
        stats.map(st => {
            switch (st.stat.name) {
                case 'hp':
                    hp = st["base_stat"];
                    break;
                case 'attack':
                    attack = st["base_stat"];
                    break;
                case 'defense':
                    defense = st["base_stat"];
                    break;
                case 'speed':
                    speed = st["base_stat"];
                    break;
                case 'special-attack':
                    stk = st["base_stat"];
                    break;
                case 'special-defense':
                    sdef = st["base_stat"];
                    break;
            }

        });
        const statsInfo = {
            hp, attack, defense, speed, stk, sdef
        }
        return statsInfo;
    };

    getPokeDetails = (pokemonDetails) => {
        let stats = {};
        if (pokemonDetails.stats) stats = this.getStats(pokemonDetails.stats);

        const height = pokemonDetails.height / 10;
        const weight = pokemonDetails.weight / 10;
        const types = pokemonDetails.types.map(type => type.type.name);
        const ability = pokemonDetails.abilities.map(ability => {
            return ability.ability.name
        }).join(',');

        const evs = pokemonDetails.stats.filter(st => {
            if (st.effort > 0) return true;
            return false;
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`
        }).join(',');
        const pokeDetailsInfo = {
            height, weight, types, ability, evs, stats
        }
        return pokeDetailsInfo;

    }

    getSpeciesInfo = (speciesData, lang) => {
        let description = '';
        speciesData.flavor_text_entries.some(txt => {
            if (txt.language.name === lang) {
                description = txt.flavor_text;
                return;
            }
        });

        const genderRationFem = (100 / 8) * speciesData.gender_rate;
        const genderRationMale = (100 / 8) * (8 - speciesData.gender_rate);

        const capture_rate = Math.round((100 / 255) * speciesData.capture_rate);

        const eggGroup = speciesData.egg_groups.map(group => {
            return group.name
        }).join(',');


        const hatchSteps = 255 * (speciesData.hatch_counter * 1);
        const speciesInfo = {
            description,
            genderRationFem,
            genderRationMale,
            capture_rate,
            eggGroup,
            hatchSteps
        }
        return speciesInfo;
    }

    render() {
        const { pokemonDetails, speciesDetails } = this.props;
        const { imgUrl, stats, description, weight, height,
            hatchSteps, eggGroup, evs, ability, gender_rate,
            genderRationFem, genderRationMale, capture_rate
        } = this.state;

        if (!speciesDetails) return (
            <div>
                <p>Error with data</p>
            </div>
        );

        //type
        const renderTypes = this.state.types.map(type => {
            return (

                <div
                    key={type}
                    className="col-5 ml-2 text-center"
                    style={{
                        backgroundColor: `${PokeTypeColors[type]}`,
                        color: 'white',
                        padding: '2px'
                    }}
                >{type}
                </div>

            );
        });

        //stats
        const renderStats = Object.keys(this.state.stats).map(stat => {
            console.log(stats[stat]);
            let name = '';
            switch (stat) {
                case 'stk':
                    name = 'sp Atk';
                    break;
                case 'sdef':
                    name = 'sp Def';
                    break;
                default:
                    name = stat;
            }

            return (
                <div className="row">
                    <div className='col-md-3 '>
                        <p className="ml-3 ">{name.toUpperCase()}</p>
                    </div>

                    <div className='col-md-9 '>
                        <div className="progress ml-3 mr-3">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                    width: `${stats[stat]}%`
                                }}
                                aria-valuenow="100"
                                aria-valuemin="0"
                                aria-valuemax="100">
                                <small>{stats[stat]}</small>
                            </div>

                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="col-12 col-sm-10 col-md-8 mx-auto">
                <div className="card poke-card" >
                    <img
                        className="  mx-auto mt-2 pokeImg"
                        src={imgUrl || null}
                        alt={speciesDetails.name}
                    />
                    <div className="card-block">
                        <h4 className="card-title text-center mt-3">{speciesDetails.name.toUpperCase()}</h4>
                    </div>
                    <div className='row mb-3 mt-3'>
                        <div className='col-4'>
                            <p className='ml-3'> <strong>Habitat:</strong>  {speciesDetails.habitat.name.toUpperCase()}</p>
                        </div>
                        <div className='col-2'>
                            <p ><strong>Type:</strong> </p>
                        </div>

                        <div className='col-6'>
                            <div className='row mr-3'>
                                {renderTypes}
                            </div>
                        </div>
                    </div>

                    <div >
                        {renderStats}
                    </div>
                    <div className='ml-3 mb-3 mt-3'>
                        <h6 >Description: </h6>
                        <p>{description}</p>
                    </div>
                    <section>
                        <div
                            className="sectionHeader mb-3"
                            style={{
                                backgroundColor: this.state.bkgColor,
                                color: 'white',
                                padding: '4px'
                            }}>
                            Profile
                        </div>
                        <div className="row">
                            <div className='col-6  '>
                                <div className="row ml-2">
                                    <div className='col-6  '>
                                        <h6 className=""> Height: </h6>
                                    </div>

                                    <div className='col-6'>
                                        <p className=""> {height} m </p>
                                    </div>

                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="row">
                                    <div className='col-6  '>
                                        <h6 className=""> Weight:</h6>
                                    </div>

                                    <div className='col-6'>
                                        <p className=""> {weight}</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className='col-6  '>
                                <div className="row ml-2">
                                    <div className='col-6  '>
                                        <h6 className=""> Catch Rate</h6>
                                    </div>

                                    <div className='col-6'>
                                        <p className=""> {capture_rate}%</p>
                                    </div>

                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="row ">
                                    <div className='col-5  '>
                                        <h6 className="">Gender</h6>
                                    </div>

                                    <div className='col-7'>
                                        <p> &#9792;{genderRationFem}  &#9794;{genderRationMale}% </p>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className='col-6  '>
                                <div className="row ml-2">
                                    <div className='col-6  '>
                                        <h6 className=""> Egg Groups</h6>
                                    </div>

                                    <div className='col-6'>
                                        <p className=""> {eggGroup}</p>
                                    </div>

                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="row ">
                                    <div className='col-5  '>
                                        <h6 className=""> Abilities</h6>
                                    </div>

                                    <div className='col-7 float-left'>
                                        <p className=" mr-2"> {ability}</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className='col-6  '>
                                <div className="row ml-2">
                                    <div className='col-6  '>
                                        <h6 className="">Hatch Steps: </h6>
                                    </div>

                                    <div className='col-6'>
                                        <p className=""> {hatchSteps}</p>
                                    </div>

                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="row">
                                    <div className='col-5'>
                                        <h6 className=""> EVs: </h6>
                                    </div>

                                    <div className='col-7'>
                                        <p>{evs}</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </section>

                    <section>
                        <div
                            className="sectionHeader mb-3"
                            style={{
                                backgroundColor: this.state.bkgColor,
                                color: 'white',
                                padding: '4px'
                            }}>
                            Evolution
                        </div>
                    </section>
                </div>
                <style jsx>
                    {`
                        .pokeImg{
                            width: auto;

                        }

                        .poke-card {
                            border-radius: 2px;
                            background: #fff;
                            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                            transition: all 0.56s cubic-bezier(0.25, 0.8, 0.25, 1);
                            font-size: 14px;
                            margin-bottom 40px;
                        }
                        
                        .poke-card:hover, .poke-card:focus {
                            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px
                                rgba(0, 0, 0, 0.22);
                        }
                        
                        .poke-card:focus-within {
                            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px
                                rgba(0, 0, 0, 0.22);
                        }
                        .btnType{
                            width: 20px;
                        }
                        .sectionHeader{
                            border: 1px solid #ededed;
                            padding: 5px;
                            font-size: 18px;
                            margin: auto 5px ;
                        }
                     `}
                </style>
            </div>
        );
    }
}

export default PokeInfo;