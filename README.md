### **DOCUMENTAÇÃO**

https://ai.google.dev/gemini-api/docs/api-key

https://ai.google.dev/gemini-api/docs/vision

## TODO:

- [ ]  Criar entidade de Documento(Imagem)

Fazer validação da entidade do Documento

- [ ]  Validar o tipo de dados dos parâmetros enviados (inclusive o base64)
- [ ]  Verificar se já existe uma leitura no mês naquele tipo de leitura.
- [ ]  Integrar com uma API de LLM para extrair o valor da imagem
-----

O endpoint **POST** */upload* ira retornar

- [ ]  Retornar temporário para a imagem
- [ ]  Um GUID
- [ ]  O valor numérico reconhecido pela LLM
- [ ]  Criar rota de confirmação **PATCH**  */confirm*

Validar:
- [ ] O tipo de dados dos parametros enviados
- [ ] Se o código de leitura informado existe
- [ ] Se o código de leitura já foi informado
- [ ]  Salvar no banco de dados o novo valor informado
- [ ]  Retornar resposta de OK ou Erro dependendo do valor informado

- [ ]  Criar rota GET /<customer-code>/list - Listar medidas realizadas por um determinado cliente
    - [ ]  Criar entidade de Medição
    - [ ]  Receber um código como parâmetro
    - [ ]  Também pode receber um query parameter “measure_type”, que deve ser “WATER” ou “GAS”
        - [ ]  A validação deve ser CASE INSENSITIVE
        - [ ]  Se o parametro for informado listar apenas os valores do tipo especificado, se não, retornar todos os tipos
- [ ]  Retornar uma lista com todas leituras realizadas daquele cliente

-----
- [ ]  Dockerizar a aplicação
- [ ]  Fazer tratamento de erros das rotas
- [ ]  Fazer teste unitários