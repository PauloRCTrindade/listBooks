import { Box, BoxedRow, ButtonLayout, ButtonSecondary, IconButton, IconHeartFilled, IconHeartLight, Image, ResponsiveLayout } from '@telefonica/mistica';
import HeaderApp from '../../Components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { favoritesBooksRedux } from '../../store/Favorites/Books/favoritesBooks.actions';


export default function FavoritesBooks() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const favoritesBooks = useSelector((state) => state.favoritesBooks)

  const handleUnfavorite = (id) => {

    const unFavoriteBook = favoritesBooks.filter(item => item.id !== id)

    dispatch(favoritesBooksRedux(unFavoriteBook));
  }


  return (
    <>
      <HeaderApp amount={'Favorites Books'} />
      <ResponsiveLayout>

        <Box
          paddingTop={32}
          paddingRight={16}
          paddingLeft={16}
          paddingBottom={16}
        >

          <Box className='BoxContainer' >

            {
              favoritesBooks && (
                favoritesBooks.map(item => (
                  <>

                    <Box className='boxCard'>
                      <Box className='boxBook'>

                        <Link style={{ textDecoration: 'none' }} to={`details/${item.id}`} >
                          <BoxedRow
                            title={item.title}
                            subtitle={item.author}
                            titleLinesMax={2}
                            asset={<Image height={120} width={80} src={item.image} />}
                          />
                        </Link>
                      </Box>

                      <Box className='boxIcon'>

                        {
                          (
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

          </Box>

        </Box>

        <Box paddingTop={36} paddingBottom={36}>

          <ButtonLayout>

            <ButtonSecondary onPress={() => navigate('/')} >Home</ButtonSecondary>

          </ButtonLayout>
        </Box>

      </ResponsiveLayout>
    </>

  )
};