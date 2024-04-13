import React from 'react';
import Helmet from 'react-helmet';
import '../../Components/Pages/Tutorials.css';
import { BlockMath } from 'react-katex';
import Latex_inline from '../../Components/Latex/Inline';
import '../../../node_modules/katex/dist/katex.css';
import Image from '../../Components/Image/Image';
import Disqus from 'disqus-react';
const Tutorial1 = () => {
    const disqusShortname = 'marofe-github-io';
        const disqusConfig = {
            url: 'https://marofe.github.io/?p=tutorials/rastreamento_usando_visao_filtro_kalman',
            identifier: 'rastreamento_usando_visao_filtro_kalman',
            title: 'Rastreamento de Objetos usando Visão Computacional e Filtro de Kalman'
        };
        console.log(process.env.PUBLIC_URL+'/tutorials/rastreamento_usando_visao_filtro_kalman');
    return <article>
      <Helmet>
        <title>Rastreamento de Objetos usando Visão Computacional e Filtro de Kalman | Marcos Rogério Fernandes</title>
        <meta name="description" content="Welcome to my personal website. Here you will find my reserach interest and contributions. " />
    </Helmet>
    <h1>Rastreamento de Objetos usando Visão Computacional e Filtro de Kalman</h1>
    <Image src="https://4.bp.blogspot.com/-J-tkGAP5-DA/WV7cvNDr5mI/AAAAAAAAAV4/hHQS3uj5H-gK040plU-Ikg6MSpQjtSmDwCLcBGAs/s400/Untitled.jpg" alt="Computer Vision" legend="Rastreamento de Objetos" />
<p>Este trabalho apresenta um algoritmo em tempo real para rastreamento de objetos
    em visão computacional, usando o Filtro de Kalman como mecanismo de predição para situações de oclusão e ou
    contaminação da cena por ruído. O principal objetivo deste trabalho é de apresentar de forma didática o
    desenvolvimento de um algoritmo de rastreamento de objetos baseado em cor. O algoritmo apresentado faz o
    rastreamento do maior objeto simétrico de uma cor pré-definida presente na cena. É apresentado em detalhes a
    implementação da etapa de segmentação da imagem, e posteriormente é apresentado uma estratégia para tratar situações
    com dois objetos da mesma cor. Por fim é demonstrado o uso do Filtro de Kalmam.</p>
    <p>Última atualização:  13 de Dezembro de 2015.</p>
<h3>INTRODUÇÃO</h3>
<p>
O rastreamento de objetos é uma das mais importantes áreas da visão computacional, com
    extensas aplicações tanto para indústria pesada como automobilismo, assim como para a indústria do entretenimento,
    além de ser uma poderosa ferramenta na área médica (Pinho et al., 2004). Visão computacional consiste em técnicas
    computacionais no qual possibilita interpretar imagens (WANGENHEIM et al., 2001). Segundo (Freitas et
    al.,2010), as principais aplicações do rastreamento de objetos em imagens são para diagnósticos médicos, interfaces
    Homem-Computador para controle de jogos eletrônicos e na área de segurança, para o monitoramento de ambientes com
    grandes fluxos de pessoas, tais como aeroportos, plataformas de trens e estacionamentos. O objetivo principal na
    área de segurança é detectar através dos sistemas de rastreamento de objetos atividades indesejadas, contribuindo
    para a tomada de decisões dos profissionais de segurança (Relli, 2014).Um algoritmo de rastreamento de
    objetos busca a partir de cenas provindas de um sensor óptico, como uma câmera, identificar a trajetória que um ou
    mais objetos descrevem. No entanto, existem diversos fatores que dificultam a identificação da trajetória descrita
    por um objeto no mundo real. Seja por variações de iluminação, como o ascender ou apagar de luzes, ruídos de fundo e
    principalmente oclusões que eventualmente o objeto sofra (Weng et al., 2006). Para contornar as dificuldades do
    mundo real para o rastreamento de objetos, é feito o uso de diversas estratégias de predição como o Filtro de
    Partículas e o Filtro de Kalman (Iraei and Faez, 2015).Os sistemas de rastreamento de objetos usando
    visão computacional podem ser divido em três estágios, conforme ilustrado na Figura 1. O primeiro estágio é onde
    ocorre a segmentação da imagem, o segundo estágio é onde faz-se o rastreamento ao longo do tempo do objeto ou alvo
    (<i>target</i>) e no ultimo estágio, faz-se a classificação dos objetos quanto a suas ações executadas.
</p>
<Image src="https://3.bp.blogspot.com/-Mad91z12UTo/WV7e5j1RkRI/AAAAAAAAAV8/1uTcrkXLTxodkvw2r_DDTnEBA3smrcfAQCLcBGAs/s320/sys_rast.png"
                        alt="Workflow" legend="Figura 1 - Etapas" />

    <h3>O Filtro de Kalman </h3>
    <p>
    O Filtro de Kalman consiste em um conjunto de equações que possibilitam a
    implementação recursiva de um estimador, gerando predição ótima dos estados futuros de um sistema linear a partir de
    uma observação presente (Welch and Bishop, 1995). Foi desenvolvido em meados de 1960 por Rudolf Emil Kalman (Kalman
    et al., 1960), inicialmente para aplicações aeroespaciais. No entanto, logo vislumbraram-se diversas aplicações em
    outras áreas, como robótica móvel, rastreamento de alvos, identificação de sistemas, controle de processos, análise
    e processamento de sinais entre outros (Funk, 2003). Existem hoje variações para sistemas não-lineares, como o
    Filtro de Kalman Estendido (EKF) e o Filtro de Kalman Unscented (UKF). Neste trabalho será feito o uso do Filtro de
    Kalman linear (KF) que busca gerar estimativas ótimas dos estados de um sistema descrito por</p>
    <BlockMath math="\begin{aligned}
    x_{k+1}&=Ax_k+Bu_k+w_k\\
    y_k &= Cx_k + v_k\end{aligned}"/>
    No qual <Latex_inline math="x_k \in \mathbb{R}^n"/> é o vetor de estados, <Latex_inline math="A \in \mathbb{R}^{n\times n}"/> é a matriz de estado, <Latex_inline math="B \in \mathbb{R}^{n\times m}"/> é a matriz de entrada, <Latex_inline math="u_k \in \mathbb{R}^m"/> é o vetor de entrada, <Latex_inline math="w_k"/> representa a incerteza associada a
    modelagem do processo, no qual é assumido como sendo uma distribuição gaussiana, com média nula, <Latex_inline math="y_k \in \mathbb{R}^p"/> o vetor de saída, <Latex_inline math="C \in \mathbb{R}^{p\times n}"/> a matriz de saída e <Latex_inline math="v_k"/> a incerteza associada a
    medição da saída. Da mesma forma, $v_k$ é assumido como sendo gaussiano, com média nula e <Latex_inline math="w_k"/> e <Latex_inline math="v_k"/> não possuem
    correlação. Para este caso, o filtro de Kalman pode ser implementado
    por:
    <BlockMath math="
    \begin{aligned}
    \hat{x}_{k+1|k} &= A\hat{x}_{k|k}+Bu_{k}\\
    P_{k+1|k}&=AP_{k|k} A^T+Q\\
    K_k&=P_{k+1|k} C^T(R +CP_{k+1|k} C^T)^{-1} \\
    \hat{x}_{k+1|k+1} &=\hat{x}_{k+1|k}+K_k(y_{k+1}-C\hat{x}_{k+1|k}) \\
    P_{k+1|k+1}&= (I-K_kC)P_{k+1|k}(I-K_kC)^T+K_kRK_k^T 
    \end{aligned}"/>
<p>    
Com <Latex_inline math="P \in \mathbb{R}^{n\times n}"/> sendo a matriz de covariância da estimativa, <Latex_inline math="K \in \mathbb{R}^{m\times n}"/> o ganho ótimo de Kalman, <Latex_inline math="Q \in \mathbb{R}^{n\times n}"/> a
matriz de covariância do modelo, <Latex_inline math="R \in \mathbb{R}^{m\times m}"/> a matriz de covariância das entradas, <Latex_inline math="I \in  \mathbb{R}^{n \times n}"/> é a matriz identidade de dimensão comptível e <Latex_inline math="\hat{x}_k"/> é o vetor de estimativas dos
    estados no instante <Latex_inline math="k"/>. O Filtro de Kalman funciona em duas etapas, chamadas de predição e correção. Na etapa de
    predição o filtro gera uma estimativa <i>a priori</i> do vetor de estados, e na etapa de correção, caso disponível,
    o filtro toma uma medição provinda de um sensor e faz a atualização, gerando uma estimativa <i>a posteriori</i>.
    Note que nas equações do filtro, a notação k+1|k indica o instante $k+1$ <i>a priori</i>, ou seja, não possuindo
    ainda uma medição, enquanto a notação k+1|k+1 indica o instante k+1 dado que já é conhecido uma medição. O ciclo
    de funcionamento do filtro é ilustrado na Figura 2.
</p>
<Image src="https://2.bp.blogspot.com/-gF3dW3XMZLE/WV7fa-0sBLI/AAAAAAAAAWA/y8jpvSb5ngYka6SS4QW00z_dlTPvBvAXQCLcBGAs/s320/predicao.png"
                        alt="Etapas do Filtro de Kalman" legend="Figura 2 - Filtro de Kalman" />
<p>As matrizes <Latex_inline math="Q"/> e <Latex_inline math="R"/> são parâmetros de sintonia do filtro de Kalman, no qual
    possibilitam fazer com que ele passe a "confiar" mais na modelagem, conforme ilustrado na Figura 3, ou na medição,
    conforme ilustrado na Figura 4. As respectivas figuras apresentam as Funções de Densidade de Probabilidade (FDP) da
    saída do modelo, das medições e da saída do Filtro de Kalman. Para ilustrar o comportamento do filtro, suponha a
    matriz <Latex_inline math="Q=qI"/> e a matriz <Latex_inline math="R=rI"/>, sendo <Latex_inline math="I"/> a matriz identidade de dimensão compátivel e <Latex_inline math="q,r \in \mathbb{R}"/>. Note
    que para o caso no qual <Latex_inline math="q<r"/>, a FDP do Filtro de Kalman está mais próxima da FDP do modelo. Ou seja, nesse caso,
    o filtro está tendendo a gerar saídas próximas as do modelo. E no caso que <Latex_inline math="q>r"/>, o filtro apresenta uma FDP mais
    próxima da FDP das medidas. Assim a saída do filtro tende a gerar valores próximos aos medidos.
</p>
<Image src="https://2.bp.blogspot.com/--KLJOSzaIhI/WV7gPsqjMKI/AAAAAAAAAWE/UjdyAw1ToOgbsD2osrlHaYFLU1maoV0YwCLcBGAs/s320/kalman_q.jpg"
         alt="Confiança do filtro" legend="Figura 3 - Maior confiança no modelo." />
      <Image src="https://2.bp.blogspot.com/-xBBvXPJZYPs/WV7gPuUxFqI/AAAAAAAAAWI/id0-JAHpvuIofQ2b3s527-EMv4vBoFFIQCLcBGAs/s320/kalman_r.jpg"
             alt="Confiança do filtro" legend="Figura 4 - Maior confiança na medição." />
<p>
    O objetivo principal deste trabalho é apresentar de forma didática as principais
    etapas de implementação de um sistema de rastreamento de objetos em tempo real. Fazendo uso de abordagens
    encontradas na literatura. Para aquisição da imagem, é utilizado uma câmera de baixo custo (<i>webcam</i>) e a
    plataforma de programação Matlab®, no qual já conta com diversas ferramentas para processamento de imagens. O
    sistema de rastreamento apresentado visa rastrear o maior objeto na cor vermelha presente na cena. E ainda lidar
    também com situações de rápidas oclusões, parciais ou totais, através do uso do Filtro de Kalman.
</p>
    <h3>SEGMENTAÇÃO DA IMAGEM</h3>
<p>
    Conforme mencionado anteriormente para todo algoritmo de rastreamento de objetos
    em visão computacional, existe um estágio de segmentação, de forma a identificar em cada quadro, provindo da câmera,
    a posição do objeto. Uma das estratégias mais simples para a identificação de objetos numa cena é através de um
    processo de limiarização. A limiarização é uma das abordagens mais importantes da segmentação de imagens. O
    princípio da limiarização consiste em separar as regiões da imagem em duas classes, o fundo (<i>background</i>) e o
    objeto (<i>target</i>) (ARTERO and TOMMASELLI, 2000).Neste trabalho foi optado por trabalhar com imagens
    no espaço RGB (<i>Red, Green e Blue</i>). Por ser este trabalho voltado para aplicações em tempo real, o espaço de
    cores RGB demonstra-se computacionalmente menos custoso, pois em geral, os dispositivos de aquisição de imagens já
    trabalham neste padrão, não sendo necessário uma etapa de transformação de espaço de cores. Assim as imagens obtidas
    pelo dispositivo de captura são em geral formadas por três canais de cores, representadas por matrizes. Sendo que as
    entradas das matrizes são respectivamente a informação relativa ao vermelho, verde e azul para cada <i>pixel</i>,
    conforme ilustrado na Figura 5.
</p>    
<Image src="https://2.bp.blogspot.com/--w3ugv-udTs/WV7hd-7ZFNI/AAAAAAAAAWQ/M4cYdEph-yIwHy2ko6LT4kmAJkOFx7nUACLcBGAs/s320/rgb.png"
                      alt="imagem rgb" legend="Figura 5 - Imagem RGB."/>

<p>A estratégia de limiarização adotada neste trabalho foi a subtração dos canais de
    cores verde e azul do canal de cor vermelho, uma vez que busca-se rastrear os objetos na cor vermelha presente na
    cena. E então considerou-se um valor limiar (<i>threshold</i>), de forma que os <i>pixels</i> resultantes com
    valores inferiores a este limiar são descartados e os <i>pixels</i> com valores maiores são considerados como parte
    do objeto a ser rastreado, conforme apresentado na Figura 6.
</p>
    <Image src="https://4.bp.blogspot.com/-pnYFUlaJSms/WV7ibAa9MBI/AAAAAAAAAWY/nizRhmsKjTUn6y0rjASWBKx82LuQLNbfACLcBGAs/s320/limiar.png"
                          alt="Limiarização" legend="Figura 6 - Limiarização." />
    <i>Obs: O valor de <Latex_inline math="L"/> foi obtido empiricamente,
                através de vários testes. Até chegar no valor ideal para as condições de iluminação no qual a câmera se
                encontrava no momento da implementação.</i>
    <p>
    Como resultado da limiarização é
    obtido uma imagem binária, ou seja, cujo os <i>pixels</i> possuem valores de 0 ou 1, resultando em uma imagem do
    tipo preto e branca, no qual a região branca representa o objeto vermelho presente na cena. Na Figura 7 é
    apresentado o resultado obtido.</p>
   <Image src="https://3.bp.blogspot.com/-hO9_WqmaZUg/WV7itsUjNGI/AAAAAAAAAWc/34FZnxTwtXEZ4eJnJUeWSkv4daxUOPEeACLcBGAs/s320/bin.png"
                            alt="Resultado" legend="Figura 7 - Resultado da Limiarização." />
    <h4>Tratando dois objetos vermelhos na cena</h4>
    <p>
    Uma situação possível no qual é desejado que o algoritmo
    apresente robustez, é no caso de existirem dois objetos na cor vermelha presente na imagem, ou mesmo a presença de
    pequenos detalhes vermelhos no fundo da imagem. O resultado da limiarização para este caso, possui duas ou mais
    regiões brancas conforme a Figura 8, no qual apresenta o resultado da limiarização quando é posicionado dois objetos
    vermelhos diante da câmera.</p>
   <Image src="https://1.bp.blogspot.com/-HugKp3SFnYo/WV7jDSoUkTI/AAAAAAAAAWg/NGsh3PWAebo0XRJC5SFmx6LYn27jLCdpgCLcBGAs/s320/bin_multo.png"
                            alt="Limiarização com dois objetos" legend="Figura 8 - Limiarização com dois objetos."/>
    <p>O objetivo deste trabalho é rastrear o maior objeto vermelho presente na cena. Portanto, faz-se
    necessário a implementação de um mecanismo para buscar a posição do maior objeto vermelho. Visando o mínimo de
    consumo computacional, de forma a garantir um bom funcionamento em tempo real, foi implementado o algoritmo que faz
    a acumulação dos <i>pixels</i> da imagem binária, tanto na horizontal, como na vertical. Define-se a imagem binária
    como sendo uma matriz <Latex_inline math="O \in \mathbb{N}^{N\times M}"/> definida como <Latex_inline math="O = \{o_{ij}\}"/>, com <Latex_inline math="1\leq i \leq N"/> e <Latex_inline math="1\leq j
    \leq M"/>, cuja entradas são 0 ou 1. O vetor de acumulação horizontal <Latex_inline math="H \in \mathbb{N}^N"/> é definido
    como:
    <BlockMath math="
    \begin{aligned}H=[h_1~h_2~\cdots~ h_N]^T ,\quad h_i=\sum_{j=1}^{M}o_{ij}, \quad
    i=1,2,\ldots,N\end{aligned}"/>
    E o vetor de acumulação vertical <Latex_inline math="V \in \mathbb{N}^M"/>
    como:</p>
    <BlockMath math="
    \begin{aligned}V=[v_1~v_2~\cdots~ v_M]^T ,\quad v_j=\sum_{i=1}^{N}o_{ij}, \quad
    j=1,2,\ldots,M\end{aligned}"/>
    
    <p>
    Dessa forma, o ponto <Latex_inline math="(x_{max},y_{max})"/> com a maior
    concentração de pixels vermelhos na imagem é dado por:
    </p>
    <BlockMath math="
    \begin{aligned}x_{max}=max(V), \quad
    y_{max}=max(H)\end{aligned}"/>
    <p>
    Na Figura 9 é ilustrado a acumulação dos <i>pixels</i> da imagem binária e
    os respectivos pontos de máximo, que coincidem com o ponto na imagem que contém a maior concentração de
    <i>pixels</i> vermelhos.</p>
   <Image src="https://1.bp.blogspot.com/-btt2yn24EY4/WV7jXqyCaPI/AAAAAAAAAWk/o_w3fjIhM2wIqeWjF-LIFgLZtPm12ULswCLcBGAs/s320/acumulacao.png"
                           alt="Acumulação" legend="Figura 9 - Acumulação" />
<p> Após a identificação da região onde possui o maior objeto vermelho na cena, define-se uma região de
    interesse, formada considerando-se o intervalo de $10\%$, para cima, para baixo e para os lados, em torno do ponto
    <Latex_inline math="(x_{max},y_{max})"/>. Em seguida é determinado a coordenada <Latex_inline math="(x_{c},y_{c})"/> do objeto aplicando-se o cálculo do centro
    geométrico na região de interesse, através das equações:
    </p>   
    <BlockMath math="      
    \begin{aligned}
    x_c &=\frac{\sum_{i=1}^{N}o_{ij}i}{\sum_{i=1}^{N}\sum_{j=1}^{M}o_{ij}}\\
    y_c &=\frac{\sum_{i=1}^{M}o_{ij}j}{\sum_{i=1}^{N}\sum_{j=1}^{M}o_{ij}}
    \end{aligned}"/>
    <h3>TRATAMENTO DE OCLUSÕES</h3>
    <p>
    Note que para o caso no qual é possível visualizar o objeto na cena, o
    procedimento apresentado na seção anterior é suficiente para fazer o rastreamento. Porém, caso este objeto sofra uma
    oclusão, o procedimento descrito falha em buscar as coordenadas do objeto. Para contornar este problema, foi tomado
    como ferramenta o Filtro de Kalman e então, nas situações de oclusão, não mais é feito o processamento da imagem,
    mas é gerado estimativas da posição do objeto baseando-se no ultimo instante no qual foi possível visualizar o
    objeto.Para implementar o Filtro de Kalman deve-se considerar um modelo para a dinâmica do movimento do
    objeto, neste trabalho optou-se por utilizar o modelo linear dado por:</p>
    <BlockMath math="
    \begin{aligned}
    \left[
    \begin{array}{cccc}
    \hat{x}_1(k+1) \\ 
    \hat{x}_2(k+1) \\ 
    \hat{x}_3(k+1) \\ 
    \hat{x}_4(k+1)
    \end{array} \right] =\left[ \begin{array}{cccc}
        1 & 0 & \Delta t & 0 \\
        0 & 1 & 0 & \Delta t \\
        0 & 0 & 1 & 0\\
        0 & 0 & 0 & 1
        \end{array} \right] \left[ \begin{array}{cccc}
            \hat{x}_1(k) \\
            \hat{x}_2(k) \\
            \hat{x}_3(k) \\
            \hat{x}_4(k)\end{array} \right]+\left[ \begin{array}{cccc}
                \frac{1}{2}\Delta t^2 & 0 \\
                0 & \frac{1}{2}\Delta t^2\\
                \Delta t & 0 \\
                0 & \Delta t \\
                \end{array} \right]\left[
    \begin{array}{cccc}
    u_1(k) \\
    u_2(k) \end{array} \right],\\
    \left[
    \begin{array}{cccc}
    z_1(k) \\
    z_2(k)\end{array} \right]=\left[
    \begin{array}{cccc}
    1 & 0 & 0 & 0 \\
    0 & 1 & 0 & 0\end{array} \right]\left[ \begin{array}{cccc}
        \hat{x}_1(k) \\
        \hat{x}_2(k) \\
        \hat{x}_3(k) \\
        \hat{x}_4(k) \end{array}
    \right]\end{aligned}"/>
   
   <p>
    Sendo que <Latex_inline math="\hat{x}_1=\hat{x}_c"/> é a estimativa da
    coordenada horizontal, <Latex_inline math="\hat{x}_2=\hat{y}_c"/> é a estimativa da coordenada vertical, <Latex_inline math="\hat{x}_3=\hat{v}_x"/> é a
    estimativa da velocidade na horizontal, <Latex_inline math="\hat{x}_4=\hat{v}_y"/> é a estimativa da velocidade na vertical, <Latex_inline math="u_1=a_x"/> é
    a aceleração horizontal e <Latex_inline math="u_2=a_y"/> é a aceleração vertical. Note que o modelo descreve um movimento retilíneo
    uniformemente variado (MURV) e o $\Delta t$ presente, indica o tempo de amostragem, que para este caso, é o tempo no
    qual o Matlab® leva para processar cada quadro da cena.
    </p>
 <i>Obs: Os valores de <Latex_inline math="a_x"/> e <Latex_inline math="a_y"/> são obtidos
                através dos frames anteriores, fazendo aproximação da derivada segunda da posição.</i>
                <p>
   Com o modelo definido, pode-se aplicar as equações do Filtro de Kalman apresentadas na introdução
    e então gerar estimativas para a posição do objeto vermelho. Porém, como é desejado o tratamento de oclusões, foi
    optado por utilizar não apenas um, mas dois Filtros de Kalman, sendo que o primeiro é sintonizado para ter
    "confiança" na medição. E o segundo "confiança" no modelo. Assim obtêm-se um algoritmo com maior robustez. A Figura
    10 apresenta o diagrama conceitual da estrutura utilizada.
    </p>
<Image src="https://1.bp.blogspot.com/-XpoyRu0bpdc/WV7jsc2OIlI/AAAAAAAAAWo/pZh80J0V2LQqaG3vI_MHqad1PTcIiyIAwCLcBGAs/s320/diagram.png"
                           alt="estrutura" legend="Figura 10 - Estrutura." />
<p>Note que a saída passa a ser <Latex_inline math="Y_1"/> e <Latex_inline math="Y_2"/>, que são selecionadas conforme a
    detecção ou não de oclusões. Nos instantes em que não existe oclusão, a saída é aquela provinda do Filtro de
    Kalman que "confia" mais na medição. E quando verifica-se uma oclusão, é selecionado a saída do Filtro de Kalman que
    "confia" mais no modelo. Esta estratégia foi necessária pois, o filtro sintonizado para confiar no modelo apresenta
    bons resultados nas situações de oclusão, porém uma baixa eficiência na situações sem oclusão e
    vice-versa.
    </p>
    <h3>RESULTADO</h3>O resultado obtido pelo algoritmo de rastreamento desenvolvido é apresentado nesta seção.
    Para situações sem oclusão, o resultado é conforme apresentado na Figura 11.
   <Image src="https://4.bp.blogspot.com/-yAXdYw8HpeI/WV7j6jeVzHI/AAAAAAAAAWs/cgOV-Jz_lqYWKwdVxT8POMYlABE7guPJQCLcBGAs/s320/frame_so.png"
                            alt="sem oclusão" legend="Figura 11 - Sem oclusão." />
    Para as situações com oclusão, o resultado é apresentado na Figura 12.
    <Image src="https://1.bp.blogspot.com/-DESUcQuAcL0/WV7kHCAeJzI/AAAAAAAAAWw/QNZ-F05mHA0QI_gjyHi_Ao0_g0v-Ti5qACLcBGAs/s320/frame_co.png"
                           alt="Com oclusão" legend="Figura 12 - Com oclusão"/>

Nos instantes em que não é possível visualizar o objeto, é tomado os valores
    obtidos pelo Filtro de Kalman sintonizado para "confiar" no modelo, então baseando-se no ultimo instante que foi
    possível visualizar o objeto, é gerado estimativas da trajetória do objeto conforme apresentado na Figura
    13.
    <Image src="https://2.bp.blogspot.com/-HTJYIdaKPfo/WV7ksya140I/AAAAAAAAAW0/mVVB5ByEcfEHSD14V-LR56SWBKW8Moj7QCLcBGAs/s320/trajetoria.jpg"
                            alt="trajetória" legend="Figura 13 - Trajetória." />

Note que como o modelo utilizado é linear, a estimativa obtida é de uma
    trajetória retilínea. No entanto, para situações sem oclusão, por ser utilizado um filtro sintonizado para "confiar"
    na medição, obtêm-se um bom desempenho para movimentos não-lineares, conforme apresentado na Figura 14.
    <Image src="https://2.bp.blogspot.com/-WSzLStoHZcE/WV7lE7OI4LI/AAAAAAAAAW4/x2HsJzoqSawuF4gBJ_cjsNQQQjFWFFFkACLcBGAs/s320/trajet2.jpg"
                           alt="não-linear" legend="Figura 14 - Movimentos não-lineares"/>
    <h3>VÍDEO DEMONSTRAÇÃO</h3>
<center>
   <iframe allowfullscreen=""
            class="YOUTUBE-iframe-video" data-thumbnail-src="https://i.ytimg.com/vi/tREbIw9DxHA/0.jpg" frameborder="0"
            height="480" src="https://www.youtube.com/embed/tREbIw9DxHA?feature=player_embedded" width="650"></iframe>
</center>
    <h3>CÓDIGO FONTE</h3> 
    <center>
<a href="https://github.com/Marofe/Object-Tracking/blob/master/kalman_live.m">https://github.com/Marofe/Object-Tracking/blob/master/kalman_live.m</a>
</center>
<h3>CONCLUSÃO</h3>
    <p>
    Com o desenvolvimento deste trabalho foi possível verificar na prática o desempenho do
    Filtro de Kalman para estimar a trajetória de objetos com situações no qual existe falta de informação. Também foi
    apresentado os principais detalhes de implementação do sistema de visão computacional, voltando-se para a área de
    rastreamento de objetos. Mostrou-se que é possível obter um desempenho satisfatório para rastreamento de objetos em
    cenas obtidas por uma câmera de baixo custo, mesmo com a presença de mais de um objeto da mesma cor. O algoritmo
    apresentou boa eficiência para situações de rápidas oclusões observou-se que este projeto ilustra de forma simples o
    potencial do Filtro de Kalman e sua relativa simplicidade de implementação.
    </p>
    <h3>REFERÊNCIAS</h3>
    <p>
    <b>ARTERO, A. and TOMMASELLI, A. (2000)</b>. Limiarização automática de imagens digitais,
    Boletim de Ciências Geodésicas 6(1): 38–48.
    </p>
<p>
    <b>Freitas, G. M. et al. (2010)</b>. Rastreamento de objetos
    em vídeos e separação em classes.
    </p>  
    <p>
    <b>Funk, N. (2003)</b>. A study of the kalman filter applied to visual
    tracking, University of Alberta, Project for CMPUT 652(6).
    </p>
    <p>
    <b>Iraei, I. and Faez, K. (2015)</b>. Object
    tracking with occlusion handling using mean shift, kalman filter and edge histogram, Pattern Recognition and Image
    Analysis (IPRIA), 2015 2nd International Conference on, IEEE, pp. 1–6.
    </p>  
    <p>
    <b>Kalman, R. E. et al. (1960)</b>. A new approach to linear filtering and prediction problems, Journal of basic Engineering 82(1):
    35–45.
    </p> 
    <p>
    <b>Pinho, R. R., Tavares, J. M. R. S. and Correia, M. F. P. V. (2004).</b> Introdução à análise de
    movimento usando visão computacional.
    </p>
    <p>
    <b>Relli, C. (2014)</b>. Caracterização de algoritmos de
    rastreamento de objetos em video considerando situações de oclusão, RETEC-Revista de Tecnologias
    6(1).
    </p> 
    <p>
    <b>Van den Bergh, M. and Van Gool, L. (2011)</b>. Combining rgb and tof cameras for real-time 3d
    hand gesture interaction, Applications of Computer Vision (WACV), 2011 IEEE Workshop on, IEEE,p.
    66–72.
    </p>
    <p>
    <b>WANGENHEIM, A. v. et al. (2001)</b>. Seminario introdução a visão computacional, Visão
    Computacional Aldon von Wangenheim’s HomePage.
    </p>
    <p>
    <b>Welch, G. and Bishop, G. (1995)</b>. An introduction to
    the kalman filter.
    </p>
    <p>
    <b>Weng, S.-K., Kuo, C.-M. and Tu, S.-K. (2006)</b>. Video object tracking using
    adaptive kalman filter,Journal of Visual Communication and Image Representation 17(6): 1190–1208.
    </p>
    <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </article>    
}
export default Tutorial1;
