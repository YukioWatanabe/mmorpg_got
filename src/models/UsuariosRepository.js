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

	existeUsuario(usuario){
		return this._connection.findOne({ usuario });
	}
}

module.exports = function(){
	return UsuariosRepository;
}