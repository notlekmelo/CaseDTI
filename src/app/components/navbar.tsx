import Link from "next/link";
export function Navbar() {

  return (
        <div className="App">
        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Descontos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
}