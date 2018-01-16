class CadastroController{
    constructor(app){
        this._app = app;
    }

    cadastro(req,res) {
        res.render('cadastro', { erros : {}, dados : {} });
    }

    cadastrar(req,res) {
        const connection = this._app.config.DbConnection.getConnection();
        const usuariosRepository = new this._app.src.models.UsuariosRepository(connection);
        const jogoRepository = new this._app.src.models.JogoRepository(connection);

        const dados = req.body;
    
        req.assert('nome', 'Nome não pode ser vazio').notEmpty();
        req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
        req.assert('senha', 'Senha não pode ser vazia').notEmpty();
        req.assert('casa', 'Uma casa deve ser selecionada').notEmpty();
    
        let erros = req.validationErrors() || [];

        usuariosRepository.existeUsuario(dados.usuario).then((usuario) => {
            if(usuario){
                erros.push({ msg : "Usuário já existe" });
            }

            const hasErrors = erros.length != 0;

            if(hasErrors){
                res.render('cadastro', { erros, dados });
                return;
            }
        
            usuariosRepository.inserirUsuario(dados);
            jogoRepository.gerarParametrosUsuario(dados.usuario);
        
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = (app) => {
    return new CadastroController(app);
}