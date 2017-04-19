/**
 * Barra de navegación.
 */

var React = require('react');

// NavLink permite agregar estilos a un <a> cuando se está en la ruta del NavLink.
// Útil cuando se quiere resaltar un enlace cuando se está en la url que marca el enlace.
import {NavLink} from 'react-router-dom';

function Nav(props) {
    return (<ul className="nav">
        <li><NavLink activeClassName="activo" exact to="/">Inicio</NavLink></li>
        <li><NavLink activeClassName="activo" to="/batalla">Batalla</NavLink></li>
        <li><NavLink activeClassName="activo" to="/popular">Popular</NavLink></li>
    </ul>);
}

module.exports = Nav;
