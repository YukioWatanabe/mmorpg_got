class AcaoRepository{
    constructor(connection){
        this._connection = connection.collection('acao');
    }

    insertAcao(acao){
        return this._connection.insert(acao);
    }
}

module.exports = () => {
    return AcaoRepository;
}