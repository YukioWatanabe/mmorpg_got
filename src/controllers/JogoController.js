class JogoController{
    constructor(app){
        this._app = app;
    }

    jogo(req,res){
        if(req.session.autenticado){
            res.render('jogo');
        }else{
            res.render('index', { erros : [ { msg : "Necessário fazer o login" } ] });
        }
    }

    sair(req,res){
        if(req.session.autenticado){
            req.session.destroy((err) => {
                if(err){
                    console.error(err);
                }
            });
        }

        res.redirect('/');
    }
}
module.exports = (app) => {
    return new JogoController();
}