/**
 * Header component that displays the main page header
 * @component
 * @returns {JSX.Element} The header element containing the site title and navigation
 * @example
 * return (
 *   <Header />
 * )
 */
import Nav from './Nav'

function Header() {
    return(
        <header className="main-header">
            <h1 className="header-title">FRASCO</h1> 
            <Nav/> 
        </header>
    )
}

export default Header