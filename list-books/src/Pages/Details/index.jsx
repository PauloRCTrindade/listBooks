import React from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderApp from '../../Components/Header';
import {
  Box,
  ButtonLayout,
  ButtonSecondary,
  MediaCard,
  ResponsiveLayout,
  Tag
} from '@telefonica/mistica';

export default function Details() {

  const navigate = useNavigate()

  const dataDetailsBook = [JSON.parse(localStorage.getItem('detailsBooks'))]

  const description = (item) => {
    return (
      <>
        <p>{item.subjects}</p>

        <p>{`Autor: ${item.authors[0]?.name} - Viveu de: ${item.authors[0]?.birth_year} a ${item.authors[0]?.death_year}`}</p>

      </>
    );
  }

  return (
    <>
      <HeaderApp amount={'Detalhes'} />
      <ResponsiveLayout>
        <Box
          paddingTop={32}
          paddingRight={16}
          paddingLeft={16}
          paddingBottom={16}
        >

          {
            dataDetailsBook && (

              dataDetailsBook.map(item => (

                <MediaCard
                  key={item => item}
                  headline={<Tag type='promo' > {`Idioma: ${(item.languages)} - Baixado: ${Number(item.download_count).toLocaleString()} vezes`} </Tag>}
                  title={item.title}
                  description={description(item)}
                  media={{ src: item.formats['image/jpeg'] }}
                />

              ))
            )
          }

          <Box paddingTop={32}>
            <ButtonLayout>

              <ButtonSecondary onPress={() =>
                navigate('/')} >Página Inicial</ButtonSecondary>

            </ButtonLayout>
          </Box>



        </Box>
      </ResponsiveLayout>

    </>
  )
};