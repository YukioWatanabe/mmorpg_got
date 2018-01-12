class IndexController{
    constructor(app){
        this._app = app;
    }

    index(req,res) {
        res.render('index');
    }
}

module.exports = (app) => {
    return new IndexController(app);
}