class UsuariosRepository{
	constructor(connection){
		this._connection = connection.collection("usuarios");
	}
	
	inserirUsuario (usuario){
		this._connection.insert(usuario);
	}
}

module.exports = function(){
	return UsuariosRepository;
}