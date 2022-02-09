/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import HeaderApp from '../../Components/Header';
import Input from '../../Components/Input';
import './styles.css';
import { api } from '../../services/api';

import {
  Box,
  BoxedRow,
  BoxedRowList,
  ButtonLayout,
  ButtonPrimary,
  ButtonSecondary,
  IconSearchLight,
  Image,
  ResponsiveLayout,
  Spinner,
} from '@telefonica/mistica';

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showSpiner, setShowSpiner] = useState(true);

  const navigate = useNavigate();


  const searchBooks = async () => {
    setShowSpiner(true);

    await api.get(`/books?search=${search}%20great`).then(response => {
      setData([response.data]);
    }).catch(error => console.log(error)).finally(setShowSpiner(false));

  }

  const pagesBooks = async () => {

    setShowSpiner(true);

    await api.get(`/books/?page=${page}`).then(response => {
      setData([response.data])
    }).catch(error => console.log(error)).finally(setShowSpiner(false));

  }

  const getBooks = () => {

    if (search) {
      searchBooks()

    } else {
      pagesBooks()
    }

  }

  useEffect(() => {

    getBooks();

  }, [search, page]);

  const handleInput = (e) => {

    if (e.length >= 4) {
      setSearch(e)
    } else {
      console.log("setpage")
      setPage(1)
    }

  }

  const numberPage = (value) => {

    if (data[0]) {
      let page = value / 32
      let pageTrunc = Math.trunc(page)
      if (page > pageTrunc) {
        page = pageTrunc + 1
      } else {
        page = pageTrunc
      }

      const length = data[0].results.length;
      console.log(length);

      return page
    }

  }

  const detaisBooks = (data) => {

    localStorage.setItem('detailsBooks', JSON.stringify(data));

    console.log(JSON.stringify(data));

    navigate('/details');

  }

  console.log(showSpiner)

  return (

    <>
      <HeaderApp amount={data[0] ? `Página ${page} de ${numberPage(data[0].count)}` : ""} />
      <ResponsiveLayout>

        <Box
          paddingTop={32}
          paddingRight={16}
          paddingLeft={16}
          paddingBottom={16}
        >

          <Box paddingBottom={16}>
            <Input
              label={"Busca"}
              placeholder={"Digite sua Busca"}
              onChange={handleInput}
              endIcon={<IconSearchLight />}
            />
          </Box>

          <Box className='BoxContainer' >

            {
              showSpiner && (
                <Box className='spinner'>
                  <Spinner size={42} />
                </Box>

              )
            }

            {
              data && (
                data.map(item => (
                  <React.Fragment >
                    {item.results.map(item => (

                      <div>
                        <BoxedRowList >
                          <BoxedRow
                            onPress={() => detaisBooks(item)}
                            title={item.title}
                            subtitle={item.authors[0]?.name}
                            titleLinesMax={2}
                            asset={<Image height={120} width={80} src={item.formats['image/jpeg']} />}
                          >
                          </BoxedRow>

                        </BoxedRowList>

                      </div>

                    ))}
                  </React.Fragment>
                ))

              )

            }

            {
              data && (

                <Box paddingTop={36} paddingBottom={36}>
                  <ButtonLayout>

                    <ButtonPrimary onPress={() => setPage(page + 1)} >Próxima Página</ButtonPrimary>

                  </ButtonLayout>

                  <ButtonLayout>

                    <ButtonSecondary onPress={() => setPage(page - 1)} >Página Anterior</ButtonSecondary>

                  </ButtonLayout>
                </Box>
              )

            }

          </Box>

        </Box>

      </ResponsiveLayout>

    </>

  )
};



