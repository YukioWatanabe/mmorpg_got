class JogoController{
    constructor(app){
        this._app = app;
    }

    jogo(req,res) {
        res.render('jogo');
    }
}
module.exports.jogo = (app) => {
    return new JogoController();
}