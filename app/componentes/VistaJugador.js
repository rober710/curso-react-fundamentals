/**
 * Componente que muestra la foto y el nombre de usuario de un jugador.
 */

var React = require('react');
var PropTypes = require('prop-types');

function VistaJugador(props) {
    return (<div>
        <div className="info-jugador">
            <img className="imagen" src={props.img} alt={props.nombreUsuario}/>
            <h2 className="nombre">@{props.nombreUsuario}</h2>
        </div>
        {props.children}
    </div>);
}

VistaJugador.propTypes = {
    img: PropTypes.string.isRequired,
    nombreUsuario: PropTypes.string.isRequired
};

module.exports = VistaJugador;