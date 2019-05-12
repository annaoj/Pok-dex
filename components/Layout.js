import Head from 'next/head';
import Navbar from './Navbar';

const Layout = (props) => (
  <div>
    <Head>
      <title>Pokedex</title>
      <meta name="description" content= "a web applicaion to display pokemons " />
      <meta name="robots" content="noindex, nofollow" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />


      <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css"/>
    </Head>
    <Navbar/>
    <div className="container">
      {props.children}
    </div>
    <style jsx global>{`
      body { 
        background: #fbf8f8;
        font: 11px menlo;
      }
    `}</style>
  </div>
);

export default Layout;