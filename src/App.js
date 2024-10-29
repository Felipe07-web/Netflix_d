import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import ListaFilmes from "./components/ListaFilmes";
import FeatureMovie from "./components/FeatureMovie";
import Header from './components/Header'; // A capitalização deve corresponder exatamente

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [FeaturedDATA, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      try {
        // Pegando a lista total, JÁ TEMOS TODAS AS INFORMAÇÕES DA API DOS FILMES ATRAVÉS DESSA FUNÇÃO getHomeList
        let list = await Tmdb.getHomeList();
        setMovieList(list);

        // Pegar filme em destaque featured, Original Netflix
        let originals = list.find(item => item.slug === 'originals');
        if (originals && originals.items && originals.items.results.length > 0) {
          let randomChosen = Math.floor(Math.random() * originals.items.results.length);
          let chosen = originals.items.results[randomChosen];
          if (chosen) {
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
          } else {
            console.error("Nenhum filme escolhido encontrado.");
          }
        } else {
          console.error("Nenhum conteúdo 'originals' encontrado ou lista vazia.");
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    // Adiciona o listener para o evento de scroll
    window.addEventListener('scroll', scrollListener);

    // Remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []); // O array vazio indica que o efeito deve ser executado apenas uma vez, após o primeiro render

  return (
    <div className="page">
      <Header black={blackHeader} />

      {FeaturedDATA && <FeatureMovie item={FeaturedDATA} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <ListaFilmes key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito Com <span role="img" aria-label="coração">❤️</span><br />
        Direitos de imagem para Netflix<br />
        Dados pegos do site Themoviedb.org
      </footer>

    </div>
  );
};
