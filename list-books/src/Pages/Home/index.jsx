/* eslint-disable no-mixed-operators */
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
  IconButton,
  IconHeartFilled,
  IconHeartLight,
  IconSearchLight,
  Image,
  ResponsiveLayout,
  Spinner,
} from '@telefonica/mistica';

function Home() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showSpiner, setShowSpiner] = useState(true);
  const [valueInput, setValueInput] = useState("");
  const [favoriteOnPress, setFavoriteOnPress] = useState(false);
  const [booksApi, setBooksApi] = useState([]);

  const dispacth = useDispatch();

  const booksListShow = useSelector((state) => state.books)

  const searchBooks = async () => {
    setShowSpiner(true);

    await getSearchBooksApi.data(`/books?search=${search}%20great`).then(response => {
      setBooksApi([response])
    }).catch(error => console.log(error)).finally(setShowSpiner(false));

  }

  const getApi = async () => {

    setShowSpiner(true);

    await getBooksApi.data(`/books/?page=${page}`).then(response => {

      setBooksApi([response])

    }).catch(error => console.log(error)).finally(setShowSpiner(false));

  }

  const newListBooks = () => {
    const booksListApi = booksApi.map(item => item.results)
    const booksListRedux = []

    if (booksListApi.length) {
      for (var i = 0; i < booksListApi[0].length; i++) {
        const newBook = [
          {
            id: booksListApi[0][i].id,
            title: booksListApi[0][i].title,
            authors: booksListApi[0][i].authors[0],
            image: booksListApi[0][i].formats['image/jpeg'],
            favorites: false,

          }
        ]
        booksListRedux.push(newBook)
      }

    }
    dispacth(books(booksListRedux))

  }

  const getBooks = () => {

    if (search) {
      searchBooks()

    } else {
      getApi();

    }

  }

  useEffect(() => {

    getBooks();

  }, [search, page]);


  useEffect(() => {

    newListBooks()

  }, [booksApi]);



  const handleInput = (e) => {

    if (e.length >= 4) {
      setSearch(e)
    } else {
      setPage(1)
    }

    setValueInput(e)

  }

  const numberPage = (value) => {

    if (booksListShow) {
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

  const handleFavoriteOnPress = (value) => {

    favoriteOnPress ? setFavoriteOnPress(false) : setFavoriteOnPress(true);

    console.log(value)


  }

  return (

    <>
      <HeaderApp />
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
              booksListShow && (

                booksListShow.map(item => (

                  item.map(item => (

                    <>

                      <Box className='boxCard'>
                        <Box className='boxBook'>

                          <Link style={{ textDecoration: 'none' }} to={`details/${item.id}`} >
                            <BoxedRow
                              title={item.title}
                              subtitle={item.authors?.name}
                              titleLinesMax={2}
                              asset={<Image height={120} width={80} src={item.image} />}
                            />
                          </Link>
                        </Box>

                        <Box className='boxIcon'>

                          {
                            item.favorites === false && (

                              <IconButton onPress={() => handleFavoriteOnPress()}>
                                <IconHeartLight />
                              </IconButton>
                            )

                          }


                          {
                            item.favorites === true && (
                              <IconButton onPress={() => handleFavoriteOnPress()}>
                                <IconHeartFilled color='black' />
                              </IconButton>
                            )
                          }

                        </Box>

                      </Box>

                    </>

                  ))
                ))


              )
            }


            {
              booksListShow && (

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

