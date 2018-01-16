class JogoRouter{
    constructor(app){
        this._app = app;
        this.telaJogo();
        this.sairJogo();
        this.suditos();
        this.pergaminhos();
    }

    telaJogo(){
        this._app.get('/jogo', (req, res) => {
            this._app.src.controllers.JogoController.jogo(req,res);
        });
    }

    sairJogo(){
        this._app.get('/sair', (req, res) => {
            this._app.src.controllers.JogoController.sair(req,res);
        });
    }

    suditos(){
        this._app.get('/suditos', (req, res) => {
            this._app.src.controllers.JogoController.suditos(req,res);
        });
    }

    pergaminhos(){
        this._app.get('/pergaminhos', (req, res) => {
            this._app.src.controllers.JogoController.pergaminhos(req,res);
        });
    }
}

module.exports = (app) => {
    return new JogoRouter(app);
}