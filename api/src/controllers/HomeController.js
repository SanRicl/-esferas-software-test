import Contato from '../models/Contato';

class HomeController {
  async index(req, res) {
    try {
      const contatos = await Contato.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'cpf', 'telefone'],
      });
      return res.json(contatos);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const user = await Contato.findByPk(req.params.id);

      const {
 id, nome, sobrenome, email, telefone, cpf,
} = user;
      return res.json({
        id,
        nome,
        sobrenome,
        email,
        telefone,
        cpf,
      });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID nao enviado'],
        });
      }
      const contato = await Contato.findByPk(req.params.id);

      if (!contato) {
        return res.status(400).json({
          errors: ['Contato nao existe'],
        });
      }

      const novosDados = await contato.update(req.body);
      const {
 id, nome, sobrenome, email, telefone, cpf,
} = novosDados;
      return res.json({
        id,
        nome,
        sobrenome,
        email,
        telefone,
        cpf,
      });
    } catch (e) {
     return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID nao enviado'],
        });
      }
      const contato = await Contato.findByPk(req.params.id);

      if (!contato) {
        return res.status(400).json({
          errors: ['Contato nao existe'],
        });
      }

      await contato.destroy();
      return res.json(contato);
    } catch (error) {
      return res.json(null);
    }
  }

  async store(req, res) {
    try {
      const novoContato = await Contato.create(req.body);
      const {
 id, nome, sobrenome, email, telefone, cpf,
} = novoContato;
      return res.json({
        id,
        nome,
        sobrenome,
        email,
        telefone,
        cpf,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

/*
 index - get
 store/create - post
 delete - delete
 show - get contato individual
 update - patch ou put
 */

export default new HomeController();
