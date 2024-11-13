import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import Tipos_camarao from './Camarao.js';  // Importa o modelo de Tipos_camarao

const Cativeiros = connection.define('Cativeiros', {
  id_cativeiro: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_tipo_camarao: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tipos_camarao',
      key: 'id_tipo_camarao',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  data_instalacao: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  foto_cativeiro: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  temp_media_diaria: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  ph_medio_diario: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  amonia_media_diaria: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
}, {
  tableName: 'Cativeiros',
});
Cativeiros.belongsTo(Tipos_camarao, {
  foreignKey: 'id_tipo_camaraoxcativeiro',  // A chave estrangeira
  as: 'camarao',  // Alias para a relação reversa
});


export default Cativeiros;
