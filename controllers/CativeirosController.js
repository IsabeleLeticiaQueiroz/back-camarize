import express from 'express';
const router = express.Router();

import Cativeiros from "../models/Cativeiro.js";

// Rota principal - Exibir cativeiros
router.get("/cativeiros", function (req, res) {
    Cativeiros.findAll().then((cativeiros) => {
        res.render("cativeiros", {
            cativeiros: cativeiros
        });
    }).catch((error) => {
        console.log("Erro ao buscar cativeiros:", error);
        res.status(500).send("Erro ao buscar cativeiros.");
    });
});

// Cadastro de cativeiros
router.post("/cativeiros/new", (req, res) => {
    const { id_tipo_camarao, data_instalacao, foto_cativeiro, temp_media_diaria, ph_medio_diario, amonia_media_diaria } = req.body;

    Cativeiros.create({
      id_tipo_camarao,
      data_instalacao,
      foto_cativeiro,
      temp_media_diaria,
      ph_medio_diario,
      amonia_media_diaria,
    }).then(() => {
        res.redirect("/cativeiros");
    }).catch((error) => {
        console.log("Erro ao criar cativeiro:", error);
        res.status(500).send("Erro ao criar cativeiro.");
    });
});

// Excluir cativeiro
router.get("/cativeiros/delete/:id_cativeiro", (req, res) => {
    const id = req.params.id_cativeiro;

    Cativeiros.destroy({
        where: {
            id_cativeiro: id,
        },
    })
    .then(() => {
        res.redirect("/cativeiros");
    })
    .catch((error) => {
        console.log("Erro ao excluir cativeiro:", error);
        res.status(500).send("Erro ao excluir cativeiro.");
    });
});

// Editar cativeiro
router.get("/cativeiros/edit/:id_cativeiro", (req, res) => {
    const id = req.params.id_cativeiro;
    
    Cativeiros.findByPk(id).then((cativeiro) => {
        res.render("cativeirosEdit", {
            cativeiro: cativeiro, // Nome da variável ajustado
        });
    }).catch((error) => {
        console.log("Erro ao buscar cativeiro para edição:", error);
        res.status(500).send("Erro ao buscar cativeiro para edição.");
    });
});

// Atualizar cativeiro
router.post("/cativeiros/update", (req, res) => {
    const { id_cativeiro, id_tipo_camarao, data_instalacao, foto_cativeiro, temp_media_diaria, ph_medio_diario, amonia_media_diaria } = req.body;

    Cativeiros.update(
      { id_tipo_camarao, data_instalacao, foto_cativeiro, temp_media_diaria, ph_medio_diario, amonia_media_diaria },
      { where: { id_cativeiro } }
    )
    .then(() => {
        res.redirect("/cativeiros");
    })
    .catch((error) => {
        console.log("Erro ao atualizar cativeiro:", error);
        res.status(500).send("Erro ao atualizar cativeiro.");
    });
});

export default router;
