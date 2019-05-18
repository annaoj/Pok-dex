import Head from 'next/head';
import Navbar from './Navbar';

const Layout = (props) => (
  <div>
    <Head>
      <title>Pokedex</title>
      <meta name="description" content= "a web applicaion to display pokemons " />
      <meta name="robots" content="noindex, nofollow" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    </Head>
    <Navbar/>
    <div className="container">
      {props.children}
    </div>
    <style jsx global>{`
      body { 
        background: #fbf8f8;
        font: 14px menlo;
        font-family: Helvetica;
      }
      .bg-primary {
        background-color: #FF6862!important;
    }
    `}</style>
  </div>
);

export default Layout;