var React = require('react');

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lenguajeSeleccionado: 'Todos'
        };
        this.actualizarLenguaje = this.actualizarLenguaje.bind(this);
    }

    actualizarLenguaje(leng) {
        this.setState(function () {
            return {
                lenguajeSeleccionado: leng
            }
        })
    }

    render() {
        let lenguajes = ['Todos', 'JavaScript', 'Ruby', 'Java', 'Python', 'CSS'];
        return (<ul className="lenguajes">
            {lenguajes.map(item => (<li key={item} onClick={this.actualizarLenguaje.bind(null, item)}
                                        className={this.state.lenguajeSeleccionado === item ? 'activo' : ''}>{item}</li>))}
        </ul>);
    }
}

module.exports = Popular;
