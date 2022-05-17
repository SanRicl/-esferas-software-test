import Sequelize, { Model } from 'sequelize';

export default class Contato extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 50],
                        msg: 'Campo nome deve ter entre 3 e 255 caracteres.',
                    },
                },
            },
            sobrenome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 50],
                        msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres.',
                    },
                },
            },
            email: {
              type: Sequelize.STRING,
              defaultValue: '',
              unique: {
                msg: 'Email ja existe',
              },
              validate: {
                isEmail: {
                  msg: 'E-mail inválido',
                },
              },
            },

            cpf: {
                type: Sequelize.STRING,
                defaultValue: '',
            },

            telefone: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                   is: {
                        args: /^[0-9]+$/i,
                        msg: 'Voce deve informar um numero de celular valido.',
                    },
                    len: {
                      args: [11, 11],
                      msg: 'Voce deve informar um numero de telefone valido.',
                    },
                },
            },

        }, {
            sequelize,
        });
        return this;
    }
}
