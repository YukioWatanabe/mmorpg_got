class IndexRouter{
	constructor(app){
		this._app = app;
		this.telaIndex();
	}

	telaIndex(){
		this._app.get('/', (req, res) => {
			this._app.src.controllers.IndexController.index(req,res);
		});
	}
}

module.exports = (app) => {
	return new IndexRouter(app);
}