import express from "express";
import connection from './config/sequelize-config.js';
const app = express();

//importar models aqui
import Tipos_camarao from "./models/Camarao.js"; 
import Cativeiros from "./models/Cativeiro.js"; 
import Dietas from "./models/Dieta.js";
import Condicoes_ideais from "./models/Condicao_ideal.js";


//importar controllers aqui
import CamaroesController from "./controllers/CamaroesController.js";
import CativeirosController from "./controllers/CativeirosController.js";
import DietasController from "./controllers/DietasController.js";
import Condicoes_ideaisController from "./controllers/Condicoes_ideaisController.js"

app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs');
app.use(express.static('public'));

//rota dos controllers aqui
app.use("/", CamaroesController);
app.use("/", CativeirosController);
app.use("/",DietasController);
app.use("/", Condicoes_ideaisController);

//Conexao com o bd
connection.authenticate().then(() => {
    console.log("Conexão feita com sucesso");

    return connection.query('CREATE DATABASE IF NOT EXISTS camarize_bd;');
}).then(() => {
    console.log("Banco criado");
    // Sincronizar tabelas
    return Promise.all([
        Tipos_camarao.sync({ force: false }), 
        Condicoes_ideais.sync({ force: false }), 
        //Especif_camarao.sync({ force: false }),
        Dietas.sync({ force: false }), 
        Cativeiros.sync({ force: false }), 
        //Dispensadores.sync({ force: false }), 
        //Alimentacao.sync({ force: false }),
        //SensoresXcativeiros.sync({ force: false }),
        //Sensores.sync({ force: false }), 
        //Tipos_sensor.sync({ force: false }), 
        //Relatorio_individual.sync({ force: false }), 
        //Parametros_atuais.sync({ force: false }), 
        //SitiosxCativeiros.sync({ force: false }), 
        //Sitios.sync({ force: false }), 
        //UsuariosxSitios.sync({ force: false }), 
        //Usuarios.sync({ force: false }), 
        //Recomendacoes.sync({ force: false }), 
        //Relatorio_geral.sync({ force: false }), 
        //Notificacoes.sync({ force: false })

    ]);
}).then(() => {
    console.log("Tabelas sincronizadas com sucesso");
}).catch((error) => {
    console.log("Erro na conexão ou criação do banco:", error);
});

// Rota principal
app.get("/", function(req, res) {
    res.render("index");
});

app.listen(3000, function(erro) {
    if (erro) {
        console.log("Ocorreu um erro!");
    } else {
        console.log("Servidor iniciado com sucesso!");
    }
});