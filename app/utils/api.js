/**
 * Código para las llamadas al API de GitHub.
 */

var axios = require('axios');

function obtenerPerfil(usuario) {
    return axios.get(`https://api.github.com/users/${usuario}`)
        .then(datosUsuario => datosUsuario.data);
}

function obtenerRepos(usuario) {
    return axios.get(`https://api.github.com/users/${usuario}/repos?per_page=100`);
}

function obtenerConteoEstrellas(repos) {
    return repos.data.reduce((conteo, item) => conteo + item.stargazers_count, 0);
}

function calcularPuntaje(perfil, repos) {
    let seguidores = perfil.followers;
    var totalEstrellas = obtenerConteoEstrellas(repos);
    return seguidores * 3 + totalEstrellas;
}

function manejarError(error) {
    console.warn(error);
    return null;
}

function obtenerDatosUsuario(nombreUsuario) {
    return axios.all([
        obtenerPerfil(nombreUsuario),
        obtenerRepos(nombreUsuario)
    ]).then(function (arrResultados) {
        let perfil = arrResultados[0];
        let repos = arrResultados[1];
        return {
            perfil,
            puntaje: calcularPuntaje(perfil, repos)
        };
    });
}

function ordenarJugadores(jugadores) {
    return jugadores.sort((a, b) => b.puntaje - a.puntaje);
}

module.exports = {
    batalla: function (jugadores) {
        return axios.all(jugadores.map(obtenerDatosUsuario)).then(ordenarJugadores)
            .catch(manejarError);
    },
    obtenerReposPopulares: function (lenguaje) {
        let uriCodificada = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + lenguaje
            + '&sort=stars&order=desc&type=Repositories');
        return axios.get(uriCodificada).then(function (respuesta) {
            return respuesta.data.items;
        });
    }
};