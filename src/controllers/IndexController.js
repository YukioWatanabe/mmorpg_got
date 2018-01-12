class IndexController{
    constructor(app){
        this._app = app;
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

        const connection = this._app.config.DbConnection.getConnection();
        const usuariosRepository = new this._app.src.models.UsuariosRepository(connection);

        usuariosRepository.autenticar(dados).then((user) => {
            const autenticado = !!user;

            if(autenticado){
                req.session.autenticado = autenticado;
                req.session.user = user;
                res.redirect("/jogo");
            }else{
                res.render("index", { erros : [ { msg : "Usuário ou senha inválidos" } ]});
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}

module.exports = (app) => {
    return new IndexController(app);
}