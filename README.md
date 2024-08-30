### **DOCUMENTAÇÃO**

https://ai.google.dev/gemini-api/docs/api-key

https://ai.google.dev/gemini-api/docs/vision

## TODO:

- [X]  Criar entidade de Documento(Imagem)

Fazer validação da entidade do Documento

- [X]  Validar o tipo de dados dos parâmetros enviados (inclusive o base64)
- [X]  Verificar se já existe uma leitura no mês naquele tipo de leitura.
- [X]  Integrar com uma API de LLM para extrair o valor da imagem
-----

O endpoint **POST** */upload* ira retornar

- [X]  Retornar temporário para a imagem
- [X]  Um GUID
- [X]  O valor numérico reconhecido pela LLM
- [X]  Criar rota de confirmação **PATCH**  */confirm*

Validar:
- [X] O tipo de dados dos parametros enviados
- [X] Se o código de leitura informado existe
- [X] Se o código de leitura já foi informado
- [X]  Salvar no banco de dados o novo valor informado
- [X]  Retornar resposta de OK ou Erro dependendo do valor informado

- [X]  Criar rota GET /<customer-code>/list - Listar medidas realizadas por um determinado cliente
    - [X]  Receber um código como parâmetro
    - [X]  Também pode receber um query parameter “measure_type”, que deve ser “WATER” ou “GAS”
        - [X]  A validação deve ser CASE INSENSITIVE
        - [X]  Se o parametro for informado listar apenas os valores do tipo especificado, se não, retornar todos os tipos
- [X]  Retornar uma lista com todas leituras realizadas daquele cliente

-----
- [ ]  Dockerizar a aplicação
- [X]  Fazer tratamento de erros das rotas
- [ ]  Fazer teste unitários