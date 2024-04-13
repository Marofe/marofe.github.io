import React from 'react';
import './Tutorials.css';
const TutorialList = (prop) => {
    return <div className="divPage">
    <div class='listCell'>
    <h2><a href="/tutorials/rastreamento_usando_visao_filtro_kalman">Rastreamento de objetos usando Visão Computacional e Filtro de Kalman</a></h2>
    <p>Este trabalho apresenta um algoritmo em tempo real para rastreamento de objetos
em visão computacional, usando o Filtro de Kalman como mecanismo de predição para situações de oclusão e ou
contaminação da cena por ruído. O principal objetivo deste trabalho é de apresentar de forma didática o
desenvolvimento de um algoritmo de rastreamento de objetos baseado em cor. O algoritmo apresentado faz o
rastreamento do maior objeto simétrico de uma cor pré-definida presente na cena. É apresentado em detalhes a
implementação da etapa de segmentação da imagem, e posteriormente é apresentado uma estratégia para tratar situações
com dois objetos da mesma cor. Por fim é demonstrado o uso do Filtro de Kalmam.</p>
<p>Última atualização:  13 de Dezembro de 2015.</p>
</div>
</div>
}
export default TutorialList;