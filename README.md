<h1 align="center">Micro Blockchain</h1>
<p>
O objetivo deste projeto é possibilitar o entendimento do que está 
por trás de um blockchain usando um código simples. Não é uma implementação completa, 
mas o suficiente para entender como os blockchains funcionam e como eles garantem 
que os blocos nunca possam ser alterados.</p>

## :warning: Importante  
**Lembre-se que único propósito do Micro Blockchain é o aprendizado. Ele não deve ser utilizado para outros fins!**
<p>Siga o roteiro a seguir para obter uma cópia funcional do Micro Blockchain no seu computador.</p> 

---

## :small_blue_diamond: Passo 1: Instalação do Node.js (pré-requisito)<a name = "passo1"></a>
Para instalar o Micro Blockchain e rodá-lo em sua máquina local é necessário ter o Node.js previamente instalado em sua máquina. Caso ainda não possua o Node.js, [clique aqui](https://nodejs.org/) e siga os procedimentos de instalação descritos no site.
<br><br>

## :small_blue_diamond: Passo 2: Instalação do Micro Blockchain<a name = "passo2"></a>
Para que o Micro Blockchain seja instalado em sua máquina é necessário que o repositório seja clonado a partir do Github. Para isto o seguinte comando deverá ser executado:
```
git clone https://github.com/rodrigotrindade/MicroBlockchain 
``` 

Quando a cópia do Micro Blockchain já estiver finalizada, você deverá acessar a pasta **/Web** e digitar o comando para a instalação automática das dependências. Não se preocupe, precisará fazer isso uma única vez:

```
npm install -y
```

## :checkered_flag: Passo 3: Rodando o Micro Blockchain<a name = "passo3"></a>
Para rodar o Micro Blockchain, você deve acessar a pasta **/Web** e digitar o seguinte comando:
```
ng serve
```
Em seguinda abra o seu navegador de internet e digite http://localhost:4200

---
## :mortar_board: Utilizando o Micro Blockchain
**Página Inicial:** Nesta página os blocos podem ser visualizados de forma amigável da cadeia MicroBlockchain. As transações armazenadas em cada bloco podem ser visualizadas bastando clicar no quadro que representa o bloco.
![](https://github.com/rodrigotrindade/MicroBlockchain/blob/master/Historico/Capturas/blocos-na-cadeia.png)

**Criando Transações** É possível criar transações, enviando qualquer quantia uma carteira. Optando pela simplicidade, a aplicação não efetua validação, porém o objetivo é mostrar que uma nova transação seja incluída na lista de transações pendentes, ficando pronta para ser incluída no próximo bloco.
![](https://github.com/rodrigotrindade/MicroBlockchain/blob/master/Historico/Capturas/assinando-e-criando-transacoes.png)