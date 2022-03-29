/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

import HeaderApp from '../../Components/Header';
import Input from '../../Components/Input';
import { books } from '../../store/Books/books.actions';
import { favoritesBooksRedux } from '../../store/Favorites/Books/favoritesBooks.actions'
import { getBooksApi, getSearchBooksApi } from '../../Services/api';
import { mockBooksApi } from '../../___mocks___/mockBooksApi';
import './styles.css';
import {
  Box,
  BoxedRow,
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

  const navigate = useNavigate()

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showSpiner, setShowSpiner] = useState(true);
  const [valueInput, setValueInput] = useState("");

  const dispatch = useDispatch();

  const booksListShow = useSelector((state) => state.books)

  const favoritesBooks = useSelector((state) => state.favoritesBooks)

  const searchBooks = async () => {
    setShowSpiner(true);

    await getSearchBooksApi.data(`/books?search=${search}%20great`).then(response => {
      dispatch(books(response))
    }).catch(error => console.log(error)).finally(setShowSpiner(false));

  }

  const getApi = async () => {

    setShowSpiner(true);

    await getBooksApi.data(`/books/?page=${page}`).then(response => {

      dispatch(books(response))

    }).catch(error => console.log(error)).finally(setShowSpiner(false));

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

  const handleFavorite = (id, title, author, image) => {

    const favoriteBook = {
      id: id,
      title: title,
      author: author,
      image: image
    }

    dispatch(favoritesBooksRedux([...favoritesBooks, favoriteBook]))
  }

  const handleUnfavorite = (id) => {


    const unFavoriteBook = favoritesBooks.filter(item => item.id !== id)


    dispatch(favoritesBooksRedux(unFavoriteBook));
  }

  return (

    <>
      <HeaderApp amount={`${page} / ${numberPage(booksListShow.count)}`} />
      <ResponsiveLayout>

        <Box
          paddingTop={32}
          paddingRight={16}
          paddingLeft={16}
          paddingBottom={16}
        >

          <Box className='boxSearch' paddingBottom={16}>
            <Input
              value={valueInput}
              label={"Search"}
              placeholder={"busca"}
              onChange={handleInput}
              endIcon={<IconSearchLight />}
            />

            <ButtonLayout>

              <ButtonSecondary onPress={() => navigate('/favoritesBooks')} >Favorites</ButtonSecondary>

            </ButtonLayout>
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

                booksListShow.results.map(item => (

                  <>

                    <Box className='boxCard'>
                      <Box className='boxBook'>

                        <Link style={{ textDecoration: 'none' }} to={`details/${item.id}`} >
                          <BoxedRow
                            title={item.title}
                            subtitle={item.authors[0]?.name}
                            titleLinesMax={2}
                            asset={<Image height={120} width={80} src={item.formats['image/jpeg']} />}
                          />
                        </Link>
                      </Box>

                      <Box className='boxIcon'>

                        {
                          item.id !== favoritesBooks.find(element => element.id === item.id)?.id && (

                            <IconButton onPress={() => handleFavorite(item.id, item.title, item.authors[0]?.name, item.formats['image/jpeg'])}>
                              <IconHeartLight />
                            </IconButton>
                          )

                        }


                        {
                          item.id === favoritesBooks.find(element => element.id === item.id)?.id && (
                            <IconButton onPress={() => handleUnfavorite(item.id)}>
                              <IconHeartFilled color='#df2323' />
                            </IconButton>
                          )
                        }

                      </Box>

                    </Box>

                  </>

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

