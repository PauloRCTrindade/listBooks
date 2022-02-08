import React, { useEffect, useState } from 'react';

import HeaderApp from '../../Components/Header';
import Input from '../../Components/Input';
import './styles.css';
import { api } from '../../services/api';

import {
  Box,
  HighlightedCard,
  IconSearchLight,
  Touchable,
} from '@telefonica/mistica';

export default function Home() {
  const [data, setData] = useState([]);

  async function getBooks() {
    await api.get('/books').then(response => {
      setData([response.data]);
    });

  }

  const getImage = (value)=>{

   const result = Object.keys(value).filter(item => item === 'image/jpeg');
   console.log(result[0])
   return result[0]

  }

  useEffect(() => {

    getBooks();

  }, []);

  const handleInput = (e) => {
    console.log(e);
  }

  console.log(data)

  return (

    <>
      <HeaderApp />

      <Box
        paddingTop={32}
        paddingRight={16}
        paddingLeft={16}
        paddingBottom={16}>

        <Box paddingBottom={16}>

          <Input
            label={"Busca"}
            placeholder={"Digite sua Busca"}
            onChange={handleInput}
            endIcon={<IconSearchLight />} />

        </Box>

        <Box className='BoxContainer' >

          {
            data && (
              data.map(item => (
                <>
                  {item.results.map(item => (
                    <div>
                      <Touchable onPress={()=> console.log("clicou")}>
                        <HighlightedCard
                          title={item.title}
                          imageFit='fit'
                          description={item.authors[0].name}
                          imageUrl={console.log(Object.entries(item.formats))} />
                      </Touchable>
                    </div>

                  ))}
                </>
              ))
            )
          }

        </Box>

      </Box>

    </>

  )
};



