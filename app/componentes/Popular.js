var React = require('react');
var PropTypes = require('prop-types');

class LenguajeSeleccionado extends React.Component {
    render() {
        let lenguajes = ['Todos', 'JavaScript', 'Ruby', 'Java', 'Python', 'CSS'];
        return (<ul className="lenguajes">
            {lenguajes.map(item => (
                <li key={item} onClick={this.props.alSeleccionar.bind(null, item)}
                    className={this.props.lenguajeActivo === item ? 'activo' : ''}>{item}</li>
            ))}
        </ul>);
    }
}

LenguajeSeleccionado.propTypes = {
    lenguajeActivo: PropTypes.string.isRequired,
    alSeleccionar: PropTypes.func.isRequired
};

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lenguajeActivo: 'Todos'
        };
        this.actualizarLenguaje = this.actualizarLenguaje.bind(this);
    }

    actualizarLenguaje(leng) {
        this.setState(function () {
            return {
                lenguajeActivo: leng
            }
        })
    }

    render() {
        return (<div>
            <LenguajeSeleccionado lenguajeActivo={this.state.lenguajeActivo}
                                  alSeleccionar={this.actualizarLenguaje}/>
        </div>);
    }
}

module.exports = Popular;
