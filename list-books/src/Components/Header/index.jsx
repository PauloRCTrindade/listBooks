import { Header, HeaderLayout } from '@telefonica/mistica';
import React from 'react';

export default function HeaderApp({amount}) {

  return (

    <HeaderLayout 
      header={
        <Header subtitle={amount} title="List Books" />
      }
    >
    </HeaderLayout>

  )
};