var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var Popular = require('./Popular');
var Nav = require('./Nav');
var Inicio = require('./Inicio');
var Batalla = require('./Batalla');
var Resultados = require('./Resultados');

class App extends React.Component {
    render() {
        return (<Router>
            <div className="contenedor">
                <Nav/>
                <Switch>
                    <Route exact path="/" component={Inicio}/>
                    <Route exact path="/batalla" component={Batalla}/>
                    <Route path="/batalla/resultados" component={Resultados}/>
                    <Route path="/popular" component={Popular}/>
                    <Route render={function () {
                        return (<p>Página no encontrada :(</p>);
                    }}/>
                </Switch>
            </div>
        </Router>);
    }
}

module.exports = App;
