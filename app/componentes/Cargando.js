/**
 * Componente que muestra una animación de carga.
 */

var React = require('react');
var PropTypes = require('prop-types');

var estilos = {
    contenido: {
        textAlign: 'center',
        fontSize: '35px'
    }
};

class Cargando extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: props.texto,
            velocidad: props.velocidad
        };
    }

    componentDidMount() {
        this.intervalo = window.setInterval(() => {
            var parar = this.props.texto.endsWith('...');
            if (parar) {
                this.setState((prevState, props) => {
                    return {
                        texto: this.props.texto
                    };
                });
            } else {
                this.setState((prevState, props) => {
                    return {
                        texto: prevState.texto + '.'
                    };
                });
            }
        }, this.props.velocidad);
    }

    componentWillUnmount() {
        window.clearInterval(this.intervalo);
    }

    render() {
        return (<p style={estilos.contenido}>{this.state.texto}</p>);
    }
}

Cargando.propTypes = {
    texto: PropTypes.string,
    velocidad: PropTypes.number
};

Cargando.defaultProps = {
    texto: 'Cargando',
    velocidad: 300
};

module.exports = Cargando;
