class UsuariosRepository{
	constructor(connection){
		this._connection = connection.collection("usuarios");
	}
	
	inserirUsuario (usuario){
		this._connection.insert(usuario);
	}

	autenticar(usuario){
		return this._connection.findOne(usuario, { fields : { _id : 0, senha : 0 }});
	}
}

module.exports = function(){
	return UsuariosRepository;
}