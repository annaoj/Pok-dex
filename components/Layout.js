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
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous"></script>     

    </Head>
    <Navbar/>
    <div className="container">
      {props.children}
    </div>
    <style jsx global>{`
      body { 
        background: #fbf8f8;
        font: 11px menlo;
        font-family: Helvetica;
      }
      .bg-primary {
        background-color: #FF6862!important;
    }
    `}</style>
  </div>
);

export default Layout;