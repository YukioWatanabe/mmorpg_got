class JogoController{
    constructor(app){
        this._app = app;
    }

    jogo(req,res){
        if(req.session.autenticado){
            res.render('jogo', { img_casa : req.session.jogador.casa, parametros : req.session.jogo.parametros, msg : {} });
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

    ordenarSudito(req,res){
        const dadosAcao = req.body;
        const connection = this._app.config.DbConnection.getConnection();
        const acaoRepository = new this._app.src.models.AcaoRepository(connection);
        const usuario = req.session.jogador.usuario;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        if(!usuario){
            res.redirect('/');
            return;
        }

        if(erros){
            res.redirect('jogo');
            return;
        }

        dadosAcao.acaoTerminaEm = this.calculaTerminoDaAcao(dadosAcao);
        dadosAcao.usuario = usuario;
        acaoRepository.insertAcao(dadosAcao);

        console.log(dadosAcao);
        res.send('ok');
    }

    calculaTerminoDaAcao({ acao }){
        return acao * 60 * 60000;
    }
}
module.exports = (app) => {
    return new JogoController(app);
}