/**
 * Footer component that displays copyright information and project credits.
 * 
 * @component
 * @returns {JSX.Element} A footer element containing copyright year and project attribution.
 * 
 * @example
 * return (
 *   <Footer />
 * )
 */
function Footer() {
    return (
        <footer className="footer-layout">
            <p>&copy; {new Date().getFullYear()} FRASCO | Proyecto desarrollado por **Raúl Quílez Ruiz**.</p>
        </footer>
    );
}

export default Footer;