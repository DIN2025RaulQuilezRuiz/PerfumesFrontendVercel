/**
 * Contenedor
 *
 * Layout wrapper component that provides the main content landmark and a container
 * section for nested route content rendered via react-router's <Outlet />.
 *
 * Structure and behavior:
 * - Renders a <main> element with:
 *   - id="main-content" to be targetable by skip links and anchors.
 *   - role="main" to explicitly mark the primary content region.
 *   - tabIndex="-1" to allow programmatic focus when skipping to main content.
 *   - className="main-contenedor primary-bg" for layout and background styling.
 * - Contains a <section> with className="inner-section" that hosts the <Outlet />.
 *
 * Usage:
 * - Intended as a layout route element (e.g., <Route element={<Contenedor />} />).
 * - Accepts no props; nested route components are rendered via <Outlet />.
 *
 * Accessibility:
 * - The main landmark and tabIndex support skip-link and focus management patterns.
 *
 * @component
 * @returns {JSX.Element} The main layout wrapper rendering the outlet for nested routes.
 */
import { Outlet } from "react-router-dom";

function Contenedor() { 
  return (
    <main
      id="main-content"
      role="main"
      tabIndex="-1"
      className="main-contenedor primary-bg"
    >
      <section
        className="inner-section"
      >
        <Outlet/>
      </section>
    </main>
  );
}

export default Contenedor;