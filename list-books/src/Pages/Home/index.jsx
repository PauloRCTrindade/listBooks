/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

import HeaderApp from '../../Components/Header';
import Input from '../../Components/Input';
import { books } from '../../store/Books/books.actions';
import { api } from '../../Services/api';
import './styles.css';

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

function Home() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showSpiner, setShowSpiner] = useState(true);
  const dispacth = useDispatch();

  const result = useSelector((state) => state.books)

  const searchBooks = async () => {
    setShowSpiner(true);

    await api.get(`/books?search=${search}%20great`).then(response => {
      dispacth(books(response.data));
    }).catch(error => console.log(error)).finally(setShowSpiner(false));

  }

  const pagesBooks = async () => {

    setShowSpiner(true);

    await api.get(`/books/?page=${page}`).then(response => {
      dispacth(books(response.data))

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

    if (result) {
      let page = value / 32
      let pageTrunc = Math.trunc(page)
      if (page > pageTrunc) {
        page = pageTrunc + 1
      } else {
        page = pageTrunc
      }

      return page
    }

  }

  return (

    <>
      <HeaderApp amount={result ? `Página ${page} de ${numberPage(result[0].count)}` : ""} />
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
              placeholder={"busca"}
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
              result && (
                result.map(item => (
                  <React.Fragment >
                    {item.results.map(item => (

                      <div>
                        <BoxedRowList >

                          <Link style={{ textDecoration: 'none' }} to={`details/${item.id}`} >
                            <BoxedRow
                              title={item.title}
                              subtitle={item.authors[0]?.name}
                              titleLinesMax={2}
                              asset={<Image height={120} width={80} src={item.formats['image/jpeg']} />}
                            >
                            </BoxedRow>
                          </Link>

                        </BoxedRowList>

                      </div>

                    ))}
                  </React.Fragment>
                ))
              )
            }

            {
              result && (

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
      <div>
        <input type="text" placeholder='teste' />
      </div>
    </>

  )
};

export default connect()(Home);


