import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FortniteMap.css';

const FortniteMap = () => {
  const [mapData, setMapData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fortnite-api.com/v1/map');
        console.log(response);  // Para depuração

        // Definindo os dados da API no estado
        setMapData(response.data.data);  // Acessando diretamente `data` que contém os dados relevantes
        setLoading(false); 
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar os dados.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="map-container">
      <h1>Mapa do Fortnite</h1>
      
      {/* Exibindo a imagem do mapa */}
      {mapData?.images?.blank && (
        <div className="map-image">
          <img src={mapData.images.blank} alt="Mapa Principal do Fortnite" />
        </div>
      )}
      
      {/* Exibindo os pontos de interesse */}
      <div className="pois">
        <h2>Pontos de Interesse</h2>
        {mapData?.pois?.length > 0 ? (
          <ul>
            {mapData.pois.map((poi, index) => (
              <li key={index}>
                <p><strong>Nome:</strong> {poi.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Sem pontos de interesse disponíveis.</p>
        )}
      </div>

      {/* Exibindo a segunda imagem (possivelmente com locais de interesse) */}
      {mapData?.images?.pois && (
        <div className="map-image">
          <img src={mapData.images.pois} alt="Mapa com Locais de Interesse" />
        </div>
      )}
    </div>
  );
};

export default FortniteMap; ///111111111111111111111111
