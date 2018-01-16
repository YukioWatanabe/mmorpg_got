class JogoRepository{
    constructor(connection){
        this._connection = connection.collection('jogo');
    }

    getParametrosUsuario(usuario){
        return this._connection.findOne({ usuario });
    }

    gerarParametrosUsuario(usuario){
        this._connection.insert( this._gerarUsuario(usuario) );
    }

    _gerarUsuario(usuario){
        return {
                    usuario : usuario,
                    moeda : 15, 
                    suditos : 10, 
                    temor : this._gerarParametro(),  
                    sabedoria : this._gerarParametro(), 
                    comercio : this._gerarParametro(), 
                    magia : this._gerarParametro() 
               };
    }
    
    _gerarParametro(){
        return Math.floor( Math.random() * 1000 );
    }
}

module.exports = () => {
    return JogoRepository;
}