/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './styles.css' 

import { getDetaisBookApi } from '../../Services/api';
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

  const navigate = useNavigate();

  const favoritesBooks = useSelector((state) => state.favoritesBooks)

  const { id } = useParams();

  const [detailsBook, setDetailsBook] = useState('');

  const getDetailsBook = async () => {

    await getDetaisBookApi.data(`/books/${id}`).then(response => {
      setDetailsBook([response])
    }).catch(error => console.log(error)).finally();

  }

  useEffect(() => {
    getDetailsBook()
  }, [])

  const description = (item) => {
    return (
      <>
        <>{item.subjects}</>

        <>{`Autor: ${item.authors[0]?.name} - Viveu de: ${item.authors[0]?.birth_year} a ${item.authors[0]?.death_year}`}</>

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
            detailsBook && (

              detailsBook.map(item => (

                <>
                  <Box paddingBottom={10}>

                    <MediaCard
                      key={item => item}
                      headline={
                        <div className='tags' >
                          <Tag type='promo' > {`Idioma: ${(item.languages)} - Baixado: ${Number(item.download_count).toLocaleString()} vezes`} </Tag>

                          {item.id === favoritesBooks.find(element => element.id === item.id)?.id && (

                            <Tag>Favotite</Tag>
                          )

                          }

                        </div>
                      }
                      title={item.title}
                      description={description(item)}
                      media={{ src: item.formats['image/jpeg'] }}
                    />

                  </Box>

                </>

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