import React from 'react';
import { Box, BoxedRow, IconButton, IconHeartFilled, IconHeartLight } from '@telefonica/mistica';
import '../Card/styles.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Card({ title, subtitle, titleLinesMax, asset, favoriteOnPress, linkTo, id }) {
  const favoritesApi = useSelector((state) => state.favorites)

  console.log(id)

  return (
    <>

      <Box className='boxCard'>
        <Box className='boxBook'>

          <Link style={{ textDecoration: 'none' }} to={linkTo} >
            <BoxedRow
              title={title}
              subtitle={subtitle}
              titleLinesMax={titleLinesMax}
              asset={asset}
              id={id}
            />
          </Link>
        </Box>

        <Box className='boxIcon'>

          {
            !favoritesApi.active && (
              <IconButton onPress={favoriteOnPress}>
                <IconHeartLight />
              </IconButton>
            )
          }

          {
            favoritesApi.active && (
              <IconButton onPress={favoriteOnPress}>
                <IconHeartFilled color='red' />
              </IconButton>
            )
          }

        </Box>

      </Box>

    </>
  )
};