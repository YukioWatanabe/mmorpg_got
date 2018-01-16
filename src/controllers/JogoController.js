class JogoController{
    constructor(app){
        this._app = app;
    }

    jogo(req,res){
        if(req.session.autenticado){
            res.render('jogo', { img_casa : req.session.jogador.casa, parametros : req.session.jogo.parametros });
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

    suditos(req,res){
        res.render('aldeoes', { validacao : {} });
    }

    pergaminhos(req,res){
        res.render('pergaminhos', { validacao : {} });
    }
}
module.exports = (app) => {
    return new JogoController();
}