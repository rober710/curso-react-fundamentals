var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

var Cargando = require('./Cargando');

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

function MallaRepos(props) {
    return (<ul className="lista-repositorios">
        {props.repos.map((item, indice) => (<li key={item.name}>
            <span className="ord">#{indice + 1}</span>
            <img className="imagen" src={item.owner.avatar_url}
                 alt={'Repo de ' + item.owner.login}/>
            <a className="repo-url" href={item.html_url}>{item.name}</a>
            <span className="repo-propietario">@{item.owner.login}</span>
            <span className="repo-estrellas">{item.stargazers_count} estrellas</span>
        </li>))}
    </ul>);
}

MallaRepos.propTypes = {
    repos: PropTypes.array.isRequired
};

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lenguajeActivo: 'Todos',
            repos: null
        };
        this.actualizarLenguaje = this.actualizarLenguaje.bind(this);
    }

    componentDidMount() {
        this.actualizarLenguaje(this.state.lenguajeActivo);
    }

    actualizarLenguaje(leng) {
        console.log(leng);
        this.setState(function () {
            return {
                lenguajeActivo: leng,
                repos: null
            }
        });

        api.obtenerReposPopulares(this.state.lenguajeActivo).then(repos => {
            this.setState(() => {
                return {repos}
            });
        });
    }

    render() {
        return (<div>
            <LenguajeSeleccionado lenguajeActivo={this.state.lenguajeActivo}
                                  alSeleccionar={this.actualizarLenguaje}/>
            { !this.state.repos ? <Cargando/> : <MallaRepos repos={this.state.repos}/> }
        </div>);
    }
}

module.exports = Popular;
