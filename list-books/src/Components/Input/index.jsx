import { TextField } from '@telefonica/mistica';
import React from 'react';

export default function Input({ onChange,placeholder,label,endIcon}) {
  return (
    <>

      <TextField endIcon={endIcon} label={label} placeholder={placeholder}  onChangeValue={ (e) => onChange(e)} />

    </>
  )
};