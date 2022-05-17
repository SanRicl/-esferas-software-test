import axios from "../../services/axios";
import { FaExclamation } from "react-icons/fa";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Container, EditarContato } from "./styled";

function ListarContatos() {
    const [contatos, setContatos] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await axios.get();
            setContatos(response.data);
        }

        getData();
    }, [setContatos]);

    const handleDeleteAsk = (e) => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute("display", "block");
        e.currentTarget.remove();
    };

    const handleDelete = async (e, id, index) => {
        e.persist();

        try {
            await axios.delete(`/${id}`);
            const novosContatos = [...contatos];
            novosContatos.splice(index, 1);
            setContatos(novosContatos);
        } catch (err) {
            const status = get(err, "response.status", 0);

            if ((status === 404) | 400 | 401 | 500) {
                toast.error("Ocorreu um erro ao excluir aluno");
            }
        }
    };
    return (
        <Container >
            <Link to={"/registrar"}>Novo Contato </Link>

            <Table className="table-bordered text-center">
                <thead >
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Email</th>
                        <th>Cpf</th>
                        <th>telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {contatos.map((contato, index) => (
                        <tr key={String(contato.id)}>
                            <td>{contato.nome}</td>
                            <td>{contato.sobrenome}</td>
                            <td>{contato.email}</td>
                            <td>{contato.cpf}</td>
                            <td>{contato.telefone}</td>
                            <td>
                        
                                <EditarContato to={`/contato/${contato.id}/editar`} >
                                    <Button color="info" size="sm">
                                        Editar
                                    </Button>
                                </EditarContato>

                                <Button
                                    color="danger"
                                    size="sm"
                                    onClick={handleDeleteAsk}
                                    to={`/${contato.id}/delete`}
                                >
                                    Deletar
                                </Button>

                                <FaExclamation
                                    size={16}
                                    display="none"
                                    cursor="pointer"
                                    onClick={(e) =>
                                        handleDelete(e, contato.id, index)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ListarContatos;
