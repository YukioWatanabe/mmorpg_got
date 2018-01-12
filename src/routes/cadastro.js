module.exports = (app) => {
    app.get('/cadastro', (req, res) => {
        app.src.controllers.cadastro.cadastro(app,req,res);
    });

    app.post('/cadastro', (req,res) => {
        app.src.controllers.cadastro.cadastrar(app,req,res);
    });
}