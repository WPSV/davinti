import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Input from "../../components/Input/Input";
import useFetch from "../../hooks/useFetch";
import { CONTACT_POST, CONTACT_PUT } from "../../Api";
import Error from "../../components/Error";
import Success from "../../components/Success";
import styles from "./CadastrarContatos.module.css";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { PiPencilSimpleLight } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";


const CadastrarContatos = () => {

  const [idContato, setIdContato] = useState();
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [idTelefone, setIdTelefone] = useState();
  const [telefone, setTelefone] = useState("");
  const [numeros, setNumeros] = useState([]);
  const [currentTelefone, setCurrentTelefone] = useState("");

  const location = useLocation();
  const stateParams = location.state;

  const isUpdate = stateParams && Object.keys(stateParams).length > 0;

  const { error, setError, success, loading, request } = useFetch();

  useEffect(() => {
    if (isUpdate) {
      setIdContato(stateParams?.idContato)
      setNome(stateParams?.nomeContato);
      setIdade(stateParams?.idadeContato);
      setIdTelefone(stateParams?.idTelefone)
      setCurrentTelefone(stateParams?.numeroTelefone);
    }
  }, [isUpdate, stateParams])


  const handleAddNumber = (event) => {
    event.preventDefault();

    if (!numeros.includes(telefone) && telefone !== "") {
      setNumeros([...numeros, telefone]);
      setTelefone("");
    }
  }

  const handleRemoveNumber = (currentNumero) => {
    const newNumeros = numeros.filter((numero) => {
      return numero !== currentNumero;
    })

    setNumeros(newNumeros);
  }

  const handleUpdateNumber = (currentNumber) => {
    setTelefone(currentNumber);
    handleRemoveNumber(currentNumber);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!(idade > 0)) {
      setError("Idade não pode ser 0!");
    } else {
      if (isUpdate) {
        const { url, options } = CONTACT_PUT({ idContato, nome, idade, idTelefone, currentTelefone, numeros });
        request(url, options);
      } else {
        const { url, options } = CONTACT_POST({ nome, idade, numeros });
        request(url, options);
      }

      setNome("");
      setIdade("");
      setTelefone("");
      setNumeros([]);
      setCurrentTelefone("");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {isUpdate ? <h1 className={styles.title}>Atualizar Contato</h1> : <h1 className={styles.title}>Cadastrar Contato</h1>}
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className={styles.boxInput}>
            <label htmlFor="nome">Nome: </label><br />
            <Input type="text" id="nome" value={nome}
              onChange={(event) => setNome(event.target.value)} placeholder="Nome" required />
          </div>
          <div className={styles.boxInput}>
            <label htmlFor="idade">Idade: </label><br />
            <Input id="idade" placeholder="Idade" mask="idade" value={idade} onChange={(event) => setIdade(event.target.value)} />
          </div>
          <div className={styles.boxInput}>
            <label htmlFor="telefone">Telefone: </label><br />
            <div className={styles.addNumber}>
              <Input id="telefone" placeholder="Telefone" mask="telefone" value={telefone} onChange={(event) => setTelefone(event.target.value)} />
              <Button onClick={(event) => handleAddNumber(event)}><FaPlus /></Button>
            </div>
          </div>
          <div className={styles.boxNewNumbers}>
            {numeros && numeros.length > 0 && <h3 style={{textAlign: 'center', borderBottom: '1px solid #f78259', marginBottom: '5px'}}>Novos números</h3>}
            {numeros?.map((numero, index) => (
              <div className={styles.newNumbers} key={index}>
                <span>{numero}</span>
                <button className={styles.iconUpdateNumber} onClick={() => handleUpdateNumber(numero)}><PiPencilSimpleLight /></button >
                <button className={styles.iconRemoveNumber} onClick={() => handleRemoveNumber(numero)}><TiDelete /></button>
              </div>
            ))}
          </div>
          {isUpdate && (
            <div className={styles.currentNumber}>
              <label htmlFor="currentTelefone">Telefone atual: </label><br />
              <Input id="currentTelefone" placeholder="Telefone atual" mask="telefone" value={currentTelefone} onChange={(event) => setCurrentTelefone(event.target.value)} />
            </div>
          )}
          <div className={styles.boxButtons}>
            <Link className={styles.button} to="/">Voltar</Link>
            {
              isUpdate
                ? (loading ? <button className={styles.button}>Atualizando...</button> : <button className={styles.button}>Atualizar</button>)
                : (loading ? <button className={styles.button}>Cadastrando...</button> : <button className={styles.button}>Cadastrar</button>)
            }
          </div>
        </form>
        {error && <Error message={error} />}
        {success && <Success message={success} />}
      </div>
    </div>
  )
}

export default CadastrarContatos;