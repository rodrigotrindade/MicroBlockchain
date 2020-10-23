# Transações e Mineração de Recompensas
Nesta fase foi criada uma simples criptomoeda, onde foi preciso implementar duas coisas:
1) Possibilidade de um bloco conter várias transações.
2) Pagamento recompensas aos mineradores.
Com isso foi criada a classe Transação que recebe a carteira de origem, a carteira de destino e a quantia. A classe bloco também foi alterada para que recebesse um vetor de transações, em vez do texto simples que estávamos utilizando. Retiramos o método criarBloco e incluímos o método minerarTransacoesPendentes, que efetua a mineração dos blocos com suas múltiplas transações e paga a recompensa para a carteira mineradora.