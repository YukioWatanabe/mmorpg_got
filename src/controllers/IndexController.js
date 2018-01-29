class IndexController{
    constructor(app){
        this._app = app;
        this._crypto = require('crypto');
    }

    index(req,res) {
        res.render('index', { erros : {}});
    }

    autenticar(req,res){
        const dados = req.body;

        req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
        req.assert('senha', 'Senha não pode ser vazia').notEmpty();

        const erros = req.validationErrors();

        if(erros){
            res.render('index', { erros });
            return;
        }

        dados.senha = this._crypto.createHash('md5').update(dados.senha).digest("hex");
        console.log(dados.senha);

        const connection = this._app.config.DbConnection.getConnection();
        const usuariosRepository = new this._app.src.models.UsuariosRepository(connection);
        const jogoRepository     = new this._app.src.models.JogoRepository(connection);

        usuariosRepository.autenticar(dados).then((jogador) => {
            const autenticado = !!jogador;

            if(autenticado){
                req.session.autenticado = autenticado;
                req.session.jogador = jogador;
                return jogoRepository.getParametrosUsuario( jogador.usuario );
            }else{
                return Promise.reject({ page : "index", msg : "Usuário ou senha inválidos" });
            }
        }).then((parametros) => {
            req.session.jogo = { parametros };
            res.redirect("/jogo");
        }).catch((error) => {
            if(error.page){
                res.render(error.page, { erros : [ { msg : error.msg } ]});
            }else{
                console.log(error);
            }
        });
    }
}

module.exports = (app) => {
    return new IndexController(app);
}