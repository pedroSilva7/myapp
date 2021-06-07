# Configurar app

'npm install' na pasta do projecto para instalar as dependencias do projecto.

# Iniciar app

'npm start' na pasta do projecto e a app é iniciada no localhost:3000 por defeito.

# Testar app

'npm run test' na pasta do projecto e são iniciados os testes.

# Fluxo da página

Ao entrar na página pela primeira vez, é feito um pedido http, onde é recebido uma lista com 10 pessoas de sexo masculino ou feminino(a escolha é feita de forma aleatória), se pressionar o botão é iniciado mais outro pedido para recolher mais 10 pessoas do mesmo sexo que o primeiro pedido.

As pessoas estão apresentadas em cards, sendo que cada vez que se faz o pedido são adicionadas mais 10 cards às existentes.

Enquanto o pedido não terminar(+-2s) o botão de adicionar está bloqueado e com indicação de loading, tal como a componente das cards.

# URL de request

https://randomuser.me/api/?results=10&gender=male ou https://randomuser.me/api/?results=10&gender=female

# Testes

- Converter o objecto recebido no pedido http para um formato desejado;
- Fazer o pedido http e receber um array com 10 elementos que pelo menos contenham as seguintes propriedades: ['name']['title'], ['name']['first'], ['name']['last'], ['picture']['large'];
- Fazer pedido http a um URL errado e verificar se foi recebido o valor nulo como esperado no catch.

# Ficheiros

public/index.html - Ficheiro da página principal.
src/index.js - Ficheiro onde é indicado para fazer o render da App na div "root" do index.html.
src/App.js - Ficheiro onde é feito o render dos componentes das cards e do botão na App.
src/components - Ficheiros da componente das cards e do botão.
src/tests/getUsers.test.js - Ficheiro de testes.
package.json - Ficheiro com dependencias do projecto.

# Testado com

Reactjs 17.0.2
Node.js v14.17.0
Npm 6.14.13
Firefox 89.0
Windows 10 20h2