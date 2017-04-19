/**
 * Componente de la página de inicio.
 */

var React = require('react');
var Link = require('react-router-dom').Link;
// Esta forma de import no funciona. TODO: Revisar por qué.
//import Link from 'react-router-dom';

class Inicio extends React.Component {
    render() {
        return (<div className="contenedor-inicio">
            <h1>Batalla Github! Combate con tus amigos</h1>
            <Link className="boton" to="/batalla">Batalla</Link>
        </div>);
    }
}

module.exports = Inicio;