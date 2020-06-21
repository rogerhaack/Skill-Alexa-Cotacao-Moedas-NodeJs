Skill para a Alexa da Amazon criada em NodeJs para consultar cotação de moedas.
Está sendo utilizado a api https://api.exchangeratesapi.io/ para fazer as consultas.

**Funções:**
- Consulta de uma moeda pela última cotação.
- Consulta de uma moeda por uma data específica.

**Instalação:**
- Passo 1: Criar um Slot Type personalizado com o nome de **currency** e importar os nomes das moedas que estão no arquivo **slot-type-currency.csv**.

- Passo 2: Criar um Intent com o nome **PriceByCurrencyIntent**, importar os Utterances que estão no arquivo **PriceByCurrencyIntent-utterances.csv** e adicionar o slot type criado no passo 1 com o nome de **currency**.

- Passo 3: Criar um Intent com o nome **PriceByCurrencyAndDateIntent**, importar os Utterances que estão no arquivo **PriceByCurrencyAndDateIntent-utterances.csv** e adicionar o slot type criado no passo 1 com o nome de currency e outro com o nome **date** do tipo **AMAZON.DATE**

- Passo 4: Buildar modelo.

- Passo 5: Importar código.

- Passo 6: Deploy do código.


**Moedas aceitas:**
- Zloty
- Won Sul Coreano
- Novo Shekel Israelense
- Dólar Australiano
- Dólar De Singapura
- Peso Mexicano
- Rand
- Dólar Neozelandês
- Coroa Norueguesa
- Renminbi
- Lira Turca
- Lev Búlgaro
- Ringgit Malaio
- Franco Suíço
- Bate
- Iene
- Kuna Croata
- Rublo Russo
- Real
- Rupia Indiana
- Rupia Indonésia
- Coroa Sueca
- Leu Romeno
- Libra Esterlina
- Coroa Checa
- Florim Húngaro
- Coroa Dinamarquesa
- Peso Filipino
- Coroa Islandesa
- Dólar Hong Kong
- Dólar Canadense
- Euro
- Dólar