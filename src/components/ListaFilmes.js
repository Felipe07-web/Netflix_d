import React, { useState, useRef } from "react";
import './ListaFilmes.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ListaFilmes = ({ title, items }) => {
    const [scrollX, setScrollX] = useState(0);
    const listRef = useRef(null);
    const itemWidth = 150; // Ajuste o tamanho do item conforme necessário

    // Move a lista para a esquerda ou direita
    const moveList = (direction) => {
        if (listRef.current) {
            const totalWidth = listRef.current.scrollWidth;
            const clientWidth = listRef.current.clientWidth;
            const maxScrollX = totalWidth - clientWidth;

            setScrollX(prevScrollX => {
                let newScrollX;
                if (direction === 'left') {
                    newScrollX = prevScrollX - itemWidth;
                    if (newScrollX < 0) {
                        newScrollX = 0; // Mantém a posição no início
                    }
                } else {
                    newScrollX = prevScrollX + itemWidth;
                    if (newScrollX > maxScrollX) {
                        newScrollX = maxScrollX; // Mantém a posição no final
                    }
                }

                return newScrollX;
            });
        }
    };

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={() => moveList('left')}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movieRow--right" onClick={() => moveList('right')}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="ListaFilmes--listarea">
                <div
                    className="movieRow--list"
                    style={{ transform: `translateX(-${scrollX}px)` }}
                    ref={listRef}
                >
                    {/* Verifica se há resultados antes de mapear */}
                    {items.results && items.results.length > 0 && items.results.map((item, key) => (
                        <div
                            key={key}
                            className="movieRow--item"
                        >
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListaFilmes;
