import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isEmail } from "validator";
import { toast } from "react-toastify";
import { get } from "lodash";
import history from "../../services/history";
import axios from "../../services/axios";
import validator from "validar-telefone";


import { Form, Title } from "./styled";
import { Container } from "../../styles/GlobalStyles";


const EditarContato = (props) => {
    const { id } = useParams();

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");

    useEffect(() => {
        if (!id) return;
        async function getData() {
            try {
                const { data } = await axios.get(`/${id}`);

                setNome(data.nome);
                setSobrenome(data.sobrenome);
                setEmail(data.email);
                setCpf(data.cpf);
                setTelefone(data.telefone);
            } catch (err) {
                const status = get(err, "response.status", 0);
                const errors = get(err, "response.data.errors", []);

                if (status === 400) errors.map((err) => toast.error(err));
                history.back('/')
            }
        }
        getData();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        let formErrors = false;

        if (nome.length < 3 || nome.length > 255) {
            formErrors = true;
            toast.error("Campo Nome deve ter entre 3 e 255 caracteres");
        }

        if (sobrenome.length < 3 || nome.length > 255) {
            formErrors = true;
            toast.error("Campo Sobrenome deve ter entre 3 e 255 caracteres");
        }

        if (!isEmail(email)) {
            formErrors = true;
            toast.error("Email invalido.");
        }

        if (validator(telefone.length)) {
            formErrors = true;
            toast.error("Voce deve informar um numero de telefone valido");
        }

        if (formErrors) return;

        try {
            if (id) {
                await axios.put(`/${id}`, {
                    nome,
                    sobrenome,
                    email,
                    cpf,
                    telefone,
                });
                toast.success("Contato editado com sucesso!");
                history.back('/')
            } else {
                await axios.post(`/`, {
                    nome,
                    sobrenome,
                    email,
                    cpf,
                    telefone,
                });
                toast.success("Contato criado com sucesso!");
                history.back('/')
            }
        } catch (err) {
            const status = get(err, "response.status", 0);
            const data = get(err, "response.data", {});
            const errors = get(data, "errors", []);

            if (errors.length > 0) {
                errors.map((error) => toast.error(error));
            } else {
                toast.error("Erro desconhecido");
            }
        }
    }

    return (
        <Container>
            <Title>{id ? "Editar Contato" : "Criar Contato"}</Title>
            <Form onSubmit={handleSubmit}>
                <input
                    type={"text"}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder={"Nome"}
                />

                <input
                    type={"text"}
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    placeholder={"Sobrenome"}
                />

                <input
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={"Email"}
                />

                <input
                    type={"text"}
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder={"Cpf"}
                />

                <input
                    type={"text"}
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder={"Telefone"}
                />

                <button type="submit">Enviar</button>
            </Form>
        </Container>
    );
};

export default EditarContato;
