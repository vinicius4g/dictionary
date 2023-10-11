# Documentação da API e do Aplicativo

## API Backend

Inicialmente, criei uma API básica em Node.js para disponibilizar os dados necessários para o aplicativo. Essa etapa foi realizada para garantir que o aplicativo tivesse acesso às informações necessárias.

Configurei um banco de dados local utilizando o SQLite e elaborei as tabelas para armazenar informações cruciais. Estas tabelas incluem a "WORDS", que registra o valor das palavras e suas respectivas chaves (id); a "USERS", que armazena dados do usuário logado, como nome de usuário, senha e id; além das tabelas "FAVORITES" e "HISTORY", que eram semelhantes e incluíam campos para a id da palavra e a id do usuário. A utilização de chaves estrangeiras (FOREIGN KEYS) nessas tabelas foi uma escolha estratégica para possibilitar relacionamentos e facilitar a obtenção de dados.

## Front-end

Comecei projetando o layout e os componentes do aplicativo manualmente, criando um esboço para entender onde poderia reutilizar componentes e determinando quais elementos seriam necessários em cada tela. Essa etapa ajudou a estruturar o projeto de maneira eficiente.

Optei por desenvolver o aplicativo com o React Native CLI devido à sua robustez e abrangência.

Após a etapa de design, dediquei tempo a estudar as bibliotecas que seriam utilizadas no projeto e estruturei o código com componentização, aderindo aos princípios de "Higher Order Components" (HOC).

Utilizei a biblioteca "styled-components" para gerenciar a estilização, mantendo um padrão global que aprimorou a legibilidade do código.

Configurei as rotas do aplicativo com o "@react-navigation/native", fazendo uso do "react-navigation/bottom-tabs" para a navegação por meio de abas inferiores e "@react-navigation/native-stack" para a autenticação no aplicativo.

Para evitar a propagação excessiva de props, implementei o "Context API" para gerenciar o estado do aplicativo, tornando mais fácil o compartilhamento de dados e chamadas à API entre as telas.

Integrei a lib "react-native-mmkv" para manter os usuários logados, armazenando valores no armazenamento do dispositivo. Essa integração seguiu padrões de injeção de dependência e inversão de dependência. Criei uma pasta "storage" com interfaces para inicializar o armazenamento com base em uma declaração no início do aplicativo (arquivo "App.tsx"), desacoplando a necessidade de uma lib específica.

Configurei as chamadas à API no arquivo "api.ts" utilizando o Axios e, em algumas situações, o "react-query" para fazer cache de requisições, como solicitado.

A reprodução de áudio proveniente da API foi tratada com a biblioteca "react-native-track-player". Optei por essa lib devido à sua reputação, participação na comunidade e histórico de atualizações.

Utilizei a "@shopify/flash-list" para renderizar listas de forma eficiente.

Inseri ícones no aplicativo com o auxílio da lib "react-native-svg".

Empreguei a biblioteca "reanimated" para criar animações suaves, como as presentes na tela de login.

## Desempenho

Com o objetivo de aprimorar o desempenho, incluí o "memo" nos componentes de palavras para evitar repetições à medida que a lista crescia com a rolagem, combinando-o com a "@shopify/flash-list".

Tratei de maneira eficiente o armazenamento de cache em requisições utilizando o "react-query".

Melhorei o armazenamento local com uma biblioteca de alto desempenho.

## Testes

Não consegui realizar os testes devido a restrições de tempo, mas possuo conhecimento e experiência em testes unitários e E2E.

Para os testes unitários, planejei usar o Jest em conjunto com o "@testing-library/react-native" para avaliar o aplicativo de forma isolada, testando cliques, renderizações, estados e respostas da API.

Em relação aos testes E2E, mencionei o uso do Detox, uma biblioteca que simula o comportamento do usuário e fornece feedback visual durante os testes. A principal finalidade seria garantir a estabilidade do código e detectar precocemente bugs, especialmente após implementações realizadas por outras equipes.

# Executando o projeto

### OBS: O app só irá funcionar com todas as funcionalidades se rodar o backend (api).

## Executar a API

- Clone o repositório.
- Rode `yarn install`ou `npm install` para instalar as dependências.
- Rode o `yarn run dev` para iniciar a aplicação.

## Executar o APP Mobile

- Clone o repositório.
- Rode `yarn install` para instalar as dependências.
- Rode o `yarn start` para iniciar a aplicação.
- Rode o `yarn ios` ou `yarn android` para rodar no emulador.
