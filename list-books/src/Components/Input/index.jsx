import { TextField } from '@telefonica/mistica';
import React from 'react';

export default function Input({ value, onChange,placeholder,label,endIcon}) {
  return (
    <>

      <TextField value={value} data-testid='input' endIcon={endIcon} label={label} placeholder={placeholder}  onChangeValue={ (e) => onChange(e)} />

    </>
  )
};