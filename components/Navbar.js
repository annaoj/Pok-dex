import Link from 'next/link';


const Navbar = () => (
  <nav className="navbar navbar-expand navbar-dark bg-primary mb-4">
    <div className="container">
    <Link href="/"><a className="navbar-brand" href="#">Pokedex</a></Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link  href="https://github.com/annaoj/Pok-dex/blob/master/README.md"><a className="nav-link active">About</a></Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
);

export default Navbar;