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
      <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/journal/bootstrap.min.css" 
      rel="stylesheet" 
      integrity="sha384-ciphE0NCAlD2/N6NUApXAN2dAs/vcSAOTzyE202jJx3oS8n4tAQezRgnlHqcJ59C" 
      crossOrigin="anonymous" />
      {/* <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/journal/bootstrap.min.css" 
      rel="stylesheet" 
      integrity="sha384-ciphE0NCAlD2/N6NUApXAN2dAs/vcSAOTzyE202jJx3oS8n4tAQezRgnlHqcJ59C" 
      crossOrigin="anonymous" /> */}
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
    `}</style>
  </div>
);

export default Layout;