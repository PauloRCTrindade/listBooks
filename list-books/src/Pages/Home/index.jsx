import React, { useEffect, useState } from 'react';

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
} from '@telefonica/mistica';

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  async function getBooks() {


    if (search) {
      console.log("search")
      await api.get(`/books?search=${search}%20great`).then(response => {
        setData([response.data]);
      });
    } else {
      console.log("page")
      await api.get(`/books/?page=${page}`).then(response => {
        setData([response.data])
      });
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

      return page
    }

  }

  useEffect(() => {

    getBooks();

  }, [search]);

  const handleInput = (e) => {
    setSearch(e)

  }

  console.log(data)

  return (

    <>
      <ResponsiveLayout>
        <HeaderApp amount={data[0] ? `Pagina ${page} de ${numberPage(data[0].count)}` : ""} />

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

                        <BoxedRowList>
                          <BoxedRow
                            title={item.title}
                            subtitle={item.authors[0]?.name}
                            titleLinesMax={2}
                            asset={<Image height={120} width={80} src={item.formats['image/jpeg']} />}

                          >
                          </BoxedRow>

                        </BoxedRowList>

                      </div>

                    ))}
                  </>
                ))


              )
            }

            <Box paddingBottom={36}>
              <ButtonLayout>

                <ButtonPrimary onPress={() => setPage(page + 1)} >Próxima Página</ButtonPrimary>

              </ButtonLayout>

              <ButtonLayout>

                <ButtonSecondary onPress={() => setPage(page - 1)} >Página Anterior</ButtonSecondary>

              </ButtonLayout>
            </Box>

          </Box>

        </Box>

      </ResponsiveLayout>

    </>

  )
};



