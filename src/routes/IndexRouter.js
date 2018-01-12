class IndexRouter{
	constructor(app){
		this._app = app;
		this.telaIndex();
		this.autenticar();
	}

	telaIndex(){
		this._app.get('/', (req, res) => {
			this._app.src.controllers.IndexController.index(req,res);
		});
	}

	autenticar(){
		this._app.post('/autenticar', (req, res) => {
			this._app.src.controllers.IndexController.autenticar(req,res);
		});
	}
}

module.exports = (app) => {
	return new IndexRouter(app);
}