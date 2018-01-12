class JogoRouter{
    constructor(app){
        this._app = app;
        this.telaJogo();
        this.sairJogo();
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
}

module.exports = (app) => {
    return new JogoRouter(app);
}