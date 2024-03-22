import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import useFetch from "../../hooks/useFetch";
import { CONTACT_DELETE, CONTACT_GET, CONTACT_GET_FILTERED, TELEFONE_DELETE } from "../../Api";
import Success from "../../components/Success";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import styles from "./VisualizarContatos.module.css";
import { FaFilter } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import { PiPencilSimpleLight } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";

const VisualizarContatos = () => {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const { data, error, success, loading, request } = useFetch();

  const [contacts, setContacts] = useState();

  const removeDuplicates = (data) => {

    const newData = [];
    data.forEach((item) => {
      const { idcontato, nome, idade, idtelefone, numero } = item;
      const index = newData.findIndex((element) => element.nome === nome && element.idade === idade);
      if (index === -1) {
        newData.push({ idcontato, nome, idade, numeros: [{ idtelefone: idtelefone, numero: numero }] });
      } else {
        if (!newData[index].numeros.includes(numero)) {
          newData[index].numeros.push({ idtelefone: idtelefone, numero: numero });
        }
      }
    });

    setContacts(newData);
  }

  const fetchContacts = () => {
    const { url, options } = CONTACT_GET();
    request(url, options);
  }

  useEffect(() => {
    if (!nome && !numero) {
      fetchContacts();
    }
  }, [nome, numero]);

  useEffect(() => {
    if (data) {
      removeDuplicates(data);
    }
  }, [data]);

  const handleFilter = (event) => {
    event.preventDefault();

    const { url, options } = CONTACT_GET_FILTERED({ nome, numero });
    request(url, options);
  }

  const handleRemoveContato = (id) => {
    const { url, options } = CONTACT_DELETE(id);
    request(url, options);
  }

  const handleRemoveTelefone = (id) => {
    const { url, options } = TELEFONE_DELETE(id);
    request(url, options);
  }

  const handleClearFilter = () => {
    fetchContacts();
    setNome("");
    setNumero("");
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Contatos</h1>
        <div className={styles.filter}>
          <form className={styles.formFilter} onSubmit={(event) => handleFilter(event)}>
            <Input type="text" id="nome" placeholder="Nome" value={nome} onChange={(event) => setNome(event.target.value)} />
            <Input id="telefone" placeholder="Telefone" mask="telefone" value={numero} onChange={(event) => setNumero(event.target.value)} />
            <Button style={{marginRight: '5px'}}><FaFilter /></Button>
          </form>
          <Button onClick={(event) => handleClearFilter(event)}><RiFilterOffFill /></Button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nome</th>
              <th scope="col">Idade</th>
              <th scope="col">Telefone</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="5"><Loading /></td></tr>}
            {(contacts && contacts.length > 0) ? (contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.idcontato}</td>
                <td>{contact.nome}</td>
                <td>{contact.idade}</td>
                <td>{contact.numeros.map((numero, index) => (
                  <div className={styles.contactNumber} key={index}>
                    {numero.numero}
                    <Link className={styles.iconUpdateNumber} to="/cadastrar-contatos"
                      state={{
                        idContato: contact.idcontato,
                        nomeContato: contact.nome,
                        idadeContato: contact.idade,
                        idTelefone: numero.idtelefone,
                        numeroTelefone: numero.numero
                      }}>
                      <PiPencilSimpleLight />
                    </Link>
                    <button className={styles.iconRemoveNumber} onClick={() => handleRemoveTelefone(numero.idtelefone)}><TiDelete /></button>
                  </div>
                ))}</td>
                <td><Button onClick={() => handleRemoveContato(contact.idcontato)}>Excluir Contato</Button></td>
              </tr>
            ))) : (<tr><td colSpan="5" className={styles.contactsNotFound}>Nenhum contato encontrado!</td></tr>)}
          </tbody>
        </table>
        <div className={styles.addButton}>
          <Link className={styles.button} to="/cadastrar-contatos">Cadastrar</Link>
        </div>
        {success && <Success message={success} />}
      </div>
    </div>
  )
}

export default VisualizarContatos;
