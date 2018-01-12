class JogoRouter{
    constructor(app){
        this._app = app;
        this.telaJogo();
    }

    telaJogo() {
        this._app.get('/jogo', (req, res) => {
            this._app.src.controllers.JogoController.jogo(req,res);
        });
    }
}

module.exports = (app) => {
    return new JogoRouter(app);
}