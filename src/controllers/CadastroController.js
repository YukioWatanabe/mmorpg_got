class CadastroController{
    constructor(app){
        this._app = app;
    }

    cadastro(req,res) {
        res.render('cadastro', { erros : {}, dados : {} });
    }

    cadastrar(req,res) {
        const dados = req.body;
    
        req.assert('nome', 'Nome não pode ser vazio').notEmpty();
        req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
        req.assert('senha', 'Senha não pode ser vazio').notEmpty();
        req.assert('casa', 'Casa não pode ser vazio').notEmpty();
    
        const erros = req.validationErrors();
    
        if(erros){
            res.render('cadastro', { erros, dados });
            return;
        }
    
        const connection = this._app.config.DbConnection.getConnection();
        const usuariosRepository = new this._app.src.models.UsuariosRepository(connection);
    
        usuariosRepository.inserirUsuario(dados);
    
        res.redirect('/');
    }
}

module.exports = (app) => {
    return new CadastroController(app);
}