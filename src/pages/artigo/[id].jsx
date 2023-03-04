import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { baseUrl } from "./../../assets/baseUrl";
import axios from "axios";
import { Header } from "../../components/HeaderPages";
import Head from "next/head";
import { format, utcToZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

const Artigo = ({ dados }) => {
  const utcDate = dados.published;
  const timeZone = "America/Sao_Paulo";

  const date = utcToZonedTime(utcDate, timeZone);
  const formattedDate = format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });

  console.log(dados);

  return (
    <>
      <Head>
        <title>{dados.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Flex mt="20px" minH="calc(100vh - 60px)" w="100%" pb="20px">
        <Box w="10%"></Box>
        <Box w="55%">
          <Heading as="h2" size="lg" color="#419FB9">
            {dados.title}
          </Heading>
          <Text mt="30px" borderLeft="5px solid #FF93C7" pl="20px">
            {dados.headline}
          </Text>
          <Image
            mt="20px"
            w="100%"
            h="auto"
            mx="auto"
            objectFit="cover"
            src={dados.featured_media?.large}
            borderRadius="sm"
            alt={dados.title}
          />
          <Text mt="10px">{dados.excerpt}</Text>
        </Box>
        <Box pl='20px' w="35%">
          <Text>
            Escrito por{" "}
            <strong style={{ color: "#265E6C" }}>
              <a target="_blank" href={dados.author.link}>
                {dados.author.name}
              </a>
            </strong>
          </Text>
          <Text fontSize='12px' mt="10px">Categoria: {dados.categories[0].name}</Text>
          <Text fontSize='12px' >Data de publicação: {formattedDate}</Text>
        </Box>
      </Flex>
    </>
  );
};

export default Artigo;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  try {
    let response = await axios.get(`${baseUrl}/wp-json/mc/v1/posts/${id}`);
    const data = response.data;
    return {
      props: { dados: data },
    };
  } catch (error) {
    console.log(error);
  }
}
