'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      });
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: "confirmado" }, //no controller, teria q usar where: status....
        as: "AulasMatriculadas" //cria nome para usar propriedade get
      });
    }
  }
  Pessoas.init({
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email:{
       type: DataTypes.STRING,
       validate: {
          isEmail: {
            args: true,
            msg: 'Esse formato de email nao eh valido!'
          }
       }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    defaultScope: {
      where:{
        ativo: true
      }
    },
    scopes:{
      todoMundo: {
        where: {/*condicao, mas quero all, ent n vou filtrar*/}
      }
      /*outroescopo: {
        where: {}
      }*/
    },
    modelName: 'Pessoas',
  });
  return Pessoas;
};