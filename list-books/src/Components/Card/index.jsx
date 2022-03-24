import React from 'react';
import { Box, BoxedRow, IconHeartLight } from '@telefonica/mistica';
import '../Card/styles.css'
import { Link } from 'react-router-dom';

export default function Card({ title, subtitle, titleLinesMax, asset, icon,linkTo }) {

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
            />
          </Link>
        </Box>

        <Box icon={icon} className='boxIcon'>
          {
            icon && (
              <IconHeartLight />
            )
          }
        </Box>

      </Box>

    </>
  )
};


{/* <BoxedRow
  title={item.title}
  subtitle={item.authors[0]?.name}
  titleLinesMax={2}
  asset={<Image height={120} width={80} src={item.formats['image/jpeg']} />}

>

</BoxedRow> */}