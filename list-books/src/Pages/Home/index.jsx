/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

import HeaderApp from '../../Components/Header';
import Input from '../../Components/Input';
import { books } from '../../store/Books/books.actions';
import { getBooksApi, getSearchBooksApi } from '../../Services/api';
import { mockBooksApi } from '../../___mocks___/mockBooksApi';
import './styles.css';
import {
  Box,
  BoxedRow,
  BoxedRowList,
  ButtonLayout,
  ButtonPrimary,
  ButtonSecondary,
  IconHeartLight,
  IconSearchLight,
  Image,
  ResponsiveLayout,
  Spinner,
} from '@telefonica/mistica';
import Card from '../../Components/Card';

function Home() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showSpiner, setShowSpiner] = useState(true);
  const [valueInput, setValueInput] = useState("");

  const dispacth = useDispatch();

  const booksApi = useSelector((state) => state.books)

  const searchBooks = async () => {
    setShowSpiner(true);

    await getSearchBooksApi.data(`/books?search=${search}%20great`).then(response => {
      dispacth(books(response));
    }).catch(error => console.log(error)).finally(setShowSpiner(false));

  }

  const pagesBooks = async () => {

    setShowSpiner(true);

    await getBooksApi.data(`/books/?page=${page}`).then(response => {

      dispacth(books(response))

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
      setPage(1)
    }

    setValueInput(e)

  }

  const numberPage = (value) => {

    if (booksApi) {
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
      <HeaderApp amount={booksApi ? `Página ${page} de ${numberPage(booksApi[0].count)}` : ""} />
      <ResponsiveLayout>

        <Box
          paddingTop={32}
          paddingRight={16}
          paddingLeft={16}
          paddingBottom={16}
        >

          <Box paddingBottom={16}>
            <Input
              value={valueInput}
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
              booksApi && (
                booksApi.map(item => (
                  <React.Fragment >
                    {item.results.map(item => (

                      <div>
                        <BoxedRowList >

                          <Card
                            title={item.title}
                            subtitle={item.authors[0]?.name}
                            titleLinesMax={2}
                            asset={<Image height={120} width={80} src={item.formats['image/jpeg']} />}
                            icon={true}
                            linkTo={`details/${item.id}`}
                          />
                        </BoxedRowList>

                      </div>

                    ))}
                  </React.Fragment>
                ))
              )
            }

            {
              booksApi && (

                <Box paddingTop={36} paddingBottom={36}>
                  <ButtonLayout>

                    <ButtonPrimary onPress={() => setPage(page + 1)} >Póxima Página</ButtonPrimary>

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

export default connect()(Home);


