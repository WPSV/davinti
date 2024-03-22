import React from 'react';
import { telefone, idade } from "./mask";
import style from "./Input.module.css";

const PhoneInput = ({mask, ...props}) => {

  const handleKeyUp = (event) => {
    if (mask === "telefone") {
      telefone(event);
    } 

    if (mask === "idade") {
      idade(event);
    }
  }

  return (
    <input className={style.input} {...props} onKeyUp={handleKeyUp} />
  )
}

export default PhoneInput;