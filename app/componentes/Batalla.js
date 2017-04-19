/**
 * Componente para la página de batalla.
 */

var React = require('react');
var PropTypes = require('prop-types');

class IngresoJugador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreUsuario: ''
        };
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejadorBtnSubmit = this.manejadorBtnSubmit.bind(this);
    }

    manejarCambio(e) {
        let nombreUsuario = e.target.value;
        this.setState(() => {
            return {nombreUsuario};
        });
    }

    manejadorBtnSubmit(e) {
        e.preventDefault();
        this.props.alEnviar(this.props.id, this.state.nombreUsuario);
    }

    render() {
        return (<form className="frm-jugador" onSubmit={this.manejadorBtnSubmit}>
            <label htmlFor="txtusuario">{this.props.etiqueta}</label>
            <input id="txtusuario" placeholder="usuario de GitHub" type="text" autoComplete="off"
            value={this.state.nombreUsuario} onChange={this.manejarCambio}/>
            <button className="boton" type="submit"
                    disabled={!this.state.nombreUsuario}>Ingresar</button>
        </form>);
    }
}

IngresoJugador.propTypes = {
    id: PropTypes.string.isRequired,
    etiqueta: PropTypes.string.isRequired,
    alEnviar: PropTypes.func.isRequired
};

class Batalla extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreJugador1: '',
            nombreJugador2: '',
            imagenJugador1: null,
            imagenJugador2: null
        };
        this.manejarEnvio = this.manejarEnvio.bind(this);
    }

    manejarEnvio(id, nombreUsuario) {
        this.setState(() => {
            let nuevoEstado = {};
            nuevoEstado['nombre' + id] = nombreUsuario;
            nuevoEstado['imagen' + id] = `https://github.com/${nombreUsuario}.png?size=200`;
            return nuevoEstado;
        });
    }

    render() {
        return (<div>
            <div className="contenedor-jugador">
                {!this.state.nombreJugador1 && <IngresoJugador id="Jugador1" etiqueta="Jugador 1" alEnviar={this.manejarEnvio}/>}
                {!this.state.nombreJugador2 && <IngresoJugador id="Jugador2" etiqueta="Jugador 2" alEnviar={this.manejarEnvio}/>}
            </div>
        </div>);
    }
}

module.exports = Batalla;