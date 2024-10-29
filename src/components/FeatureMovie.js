import React from "react";
import './FeatureMovie.css';

const FeatureMovie = ({ item }) => {
    // Formata a data do primeiro episódio
    const firstData = new Date(item.first_air_date);

    // Extrai os nomes dos gêneros
    const genres = item.genres.map(genre => genre.name);

    // Cria uma descrição curta se for muito longa
    let description = item.overview;
    if (description.length > 200) { // Corrigido 'lenght' para 'length'
        description = description.substring(0, 200) + '...';
    }

    return (
        <div>
            <section
                className="featured"
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
                }}
            >
                <div className="featured--vertical">
                    <div className="featured--horizontal">
                        <div className="featured--name">{item.original_name}</div>
                        <div className="featured--info">
                            <div className="featured--points">{item.vote_average} pontos</div>
                            <div className="featured--year">{firstData.getFullYear()}</div>
                            <div className="featured--seasons">
                                {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}
                            </div>
                            <div className="featured--description">{description}</div>
                            <div className="featured--buttons">
                                <a href="#watch" className="featured--watchbutton">Assistir</a>
                                <a href="#mylist" className="featured--mylisthbutton">+ Minha Lista</a> {/* Correção do nome da classe */}
                            </div>
                            <div className="featured--genres">
                                <strong>Gêneros:</strong> {genres.join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeatureMovie;
