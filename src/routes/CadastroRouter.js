class CadastroRouter{
    constructor(app){
        this._app = app;
        this.telaCadastro();
        this.cadastrar();
    }
    
    telaCadastro(){
        this._app.get('/cadastro', (req, res) => {
            this._app.src.controllers.CadastroController.cadastro(req,res);
        });    
    }

    cadastrar(){
        this._app.post('/cadastro', (req,res) => {
            this._app.src.controllers.CadastroController.cadastrar(req,res);
        });
    }
}

module.exports = (app) => {
    return new CadastroRouter(app);
}