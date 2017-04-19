/**
 * Código para las llamadas al API de GitHub.
 */

var axios = require('axios');

module.exports = {
    obtenerReposPopulares: function (lenguaje) {
        let uriCodificada = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + lenguaje
            + '&sort=stars&order=desc&type=Repositories');
        return axios.get(uriCodificada).then(function (respuesta) {
            return respuesta.data.items;
        });
    }
};