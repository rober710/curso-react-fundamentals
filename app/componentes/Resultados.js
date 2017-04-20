/**
 * Componente de resultados
 */

var queryString = require('query-string');

var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

var api = require('../utils/api');
var VistaJugador = require('./VistaJugador');

function ResultadoJugador(props) {
    return (<div>
        <h1 style={{textAlign: 'center'}}>{props.etiqueta}</h1>
        <h3 style={{textAlign: 'center'}}>Puntaje: {props.puntaje}</h3>
        <VistaJugador img={props.perfil.avatar_url} nombreUsuario={props.perfil.login}>
            <ul className="perfil">
                {props.perfil.name && <li>{props.perfil.name}</li>}
                {props.perfil.location && <li>{props.perfil.location}</li>}
                {props.perfil.company && <li>{props.perfil.company}</li>}
                <li>Seguidores: {props.perfil.followers}</li>
                <li>Siguiendo: {props.perfil.following}</li>
                <li>Repositorios públicos: {props.perfil.public_repos}</li>
                {props.perfil.blog && <li><a href={props.perfil.blog}>{props.perfil.blog}</a></li>}
            </ul>
        </VistaJugador>
    </div>);
}

ResultadoJugador.propTypes = {
    etiqueta: PropTypes.string.isRequired,
    puntaje: PropTypes.number.isRequired,
    perfil: PropTypes.object.isRequired
};

class Resultados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ganador: null,
            perdedor: null,
            error: null,
            cargando: true
        };
    }
    componentDidMount() {
        let jugadores = queryString.parse(this.props.location.search);
        api.batalla([jugadores.nombreJugador1, jugadores.nombreJugador2])
            .then(resultados => {
                if (resultados === null) {
                    this.setState((prevState, props) => {
                        return {
                            error: 'Parece que hubo un error al consultar el API de Github!',
                            cargando: false
                        };
                    });
                }

                this.setState((prevState, props) => {
                    return {
                        error: null,
                        cargando: false,
                        ganador: resultados[0],
                        perdedor: resultados[1]
                    };
                });
        });
    }
    render() {
        if (this.state.cargando) {
            return (<p>Cargando...</p>);
        }

        if (this.state.error) {
            return (<div>
                <p>{this.state.error}</p>
                <Link to="/batalla">Volver a iniciar</Link>
            </div>);
        }

        return (<div className="contenedor-resultados">
            <ResultadoJugador etiqueta="Ganador" puntaje={this.state.ganador.puntaje} perfil={this.state.ganador.perfil}/>
            <ResultadoJugador etiqueta="Perdedor" puntaje={this.state.perdedor.puntaje} perfil={this.state.perdedor.perfil}/>
        </div>);
    }
}

module.exports = Resultados;