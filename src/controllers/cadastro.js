module.exports.cadastro = (app,req,res) => {
    res.render('cadastro', { erros : {}, dados : {} });
}

module.exports.cadastrar = (app,req,res) => {
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

    const connection = app.config.DbConnection.getConnection();
    const usuariosRepository = new app.src.models.UsuariosRepository(connection);

    usuariosRepository.inserirUsuario(dados);

    res.render('index');
}