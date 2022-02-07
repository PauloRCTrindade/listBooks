import React from 'react';

import HeaderApp from '../../Components/Header';
import Input from '../../Components/Input';
import './styles.css';

import {
  Box,
  HighlightedCard,
  IconSearchLight,
} from '@telefonica/mistica';

export default function Home() {
  const handleInput = (e) => {
    console.log(e)
  }

  return (

    <>
      <HeaderApp />

      <Box
        paddingTop={32}
        paddingRight={16}
        paddingLeft={16}
        paddingBottom={16}>

        <Box paddingBottom={16}>

          <Input
            label={"Busca"}
            placeholder={"Digite sua Busca"}
            onChange={handleInput}
            endIcon={<IconSearchLight />} />

        </Box>

        <Box className='BoxContainer' >

          <HighlightedCard
            title='Livro 01'
            description='Descrição do Livro'
            imageUrl='https://i.imgur.com/jeDSXBU.jpg'
            imageFit='fit' />

          <HighlightedCard
            title='Livro 01'
            description='Descrição do Livro'
            imageUrl='https://i.imgur.com/jeDSXBU.jpg'
            imageFit='fit' />
        </Box>

      </Box>

    </>

  )
};