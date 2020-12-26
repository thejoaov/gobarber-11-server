# Anotações / Notas

- Talvez por costume, ou sei lá, mas senti altamente necessário configurar o dotenv pra não guardar as credenciais de acesso ao banco no repositório do git, fiz isso usando o dotenv-safe, que é uma lib que além de ser baseada no dotenv normal, ela verifica se as variáveis declaradas no arquivo .env batem com as do arquivo de exemplo .env.example

# Módulo 1 - Banco de dados

## Aula 4 - Criando tabela de agendamentos

### Migrations

- Só se pode alterar uma migration se ela ainda não foi pro controle de versão (GIT)
- Caso ela já tenha ido, se deve criar uma nova migration

#### Linha do tempo

- 1ª semana: Criada tabela de Agendamentos
- 2ª semana: Criada tabela de Usuários
- 3ª semana: Novo dev entrou e fez uma edição na tabela de agendamentos
- 4ª semana: Você cria uma tabela de Compras, porém seu bd local não possui essas alterações do novo dev, e agora? -> M I G R A T I O N S

#### Migrations são pro banco de dados, o que o GIT é pro código

- Funcionamento parecido com o do GIT
- Elas controlam a versão do banco de dados e alterações simultâneas para todos os devs
- O dev altera as migrations com as alterações que ele quer no banco de dados
- Quando outros devs forem pegar o código, executam as migrations e o banco de dados de desenvolvimento local de cada dev sempre vai ser igual, tudo o que os outros devs fizerem no banco de dados.
- Evita que os bancos de dados estejam em diferentes versões, independente do número de devs
- Sempre vai ter a estrutura do banco de dados IGUAL entre todos os ambientes e todos os desenvolvedores do projeto

#### UP:

- O que vai ser incluído no banco de dados quando a migration for executada

#### DOWN:

- Método de fallback; Se acontecer algum problema, desfazer o que faz no método up

# Módulo 2 - Cadastro de Usuários

## Aula 2 - Relacionamento nos models

### Migrations

#### DOWN

- O método DOWN sempre deve desfazer as alterações do método UP em ordem reversa

### Relacionamentos

- Um para Um (OneToOne)
- Um para Muits (OneToMany)
- Muitos para Muitos (ManyToMany)

### KISS

#### Keep It Simple & Stupid

- Manter o código simples e estúpido;

- Não tentar colocar coisa demais prematuramente, manter simples, e melhorar conforme necessário apenas

## Aula 3 - Criação de Registros

- O `delete user.password` serve pra não enviar o password no retorno da rota

# Módulo 3 - Autenticação

## Aula 1 - Conceitos de JWT

- JWT é uma metodologia/forma de autenticação em api's REST;
- Tradução -> _JSON Web Token_, ou seja, um token em formato **json**
- Separado em 3 partes por ponto `.`:
  - 1ª parte: Headers
    - Tipo de token, algoritmo
  - 2ª parte: Payload
    - Dados adicionais
    - Pode conter informações do usuário
    - Não enviar informações sensíveis como por exemplo, senha
    - Enviar informações que possam ser utilizadas depois, como id,por exemplo
  - 3ª parte: Assinatura
    - Garante que o token não foi modificado
    - Garante que o token seja à prova de edições

## Aula 3 - Gerando Token JWT

- Modifiquei pra que o secret gerado do JWT seja hasheado em md5, e definido pelo `.env`

# Módulo 5 - Tratando exceções

## Aula 1 - Criando classe de erro

### O que é Exception Handling

- Lidar com erros/exceções dentro da aplicação

## Aula 2 - Lidando com erros

### O que é um Global Exception Handler

- Um middleware que capta todos os erros aplicação, de forma centralizada, não importanto de qual arquivo que tenha originado o erro
