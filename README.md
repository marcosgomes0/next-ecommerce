Este projeto consiste em uma aplicação de ecommerce fullstack desenvolvida a partir do Next.js.


SOBRE O PROJETO:

O ecommerce tem por objetivo ser um projeto de estudo, porém é completo e poderia ser utilizado em uma aplicação real. Todo o projeto foi desenvolvivo em Next.js, tanto o front-end quanto o backend utilizando Next API.
O login no ecommerce é realizado a partir do next-auth.

SOBRE O FRONTEND:

O projeto possui uma interface de produtos completa, começando pela home que inicia pelo header. O header é basicamente um componente fixo utilizado durante todo o escopo do site. Nele estão inclusos um caminho para a própria home(logo), um link de acesso as
categorias de produtos, um link de busca de produtos e um link de login ao ecommerce. Logo abaixo, encontramos uma apresentação incial de um produto, podendo este ser o produto destaque do seu ecommerce. Logo abaixo deste, encontramos os principais produtos do site, estes são feitos a partir de um componente de card que é reutilizado durante todo o escopo do site. Cada card apresenta uma imagem do produto com link de acessa a página individual, um coração para inclusão na lista de desejos, o nome e um botão de adicionar ao carrinho.

- sobre a página individual e o carrinho

Cada produto do site possui uma página individual, contruída a partir de uma página dinâmica, que contém maiores detalhes, incluindo mais fotos sobre o produto, uma descrição mais telhada do produto e a possibilidade de conferir o feedback de usuários que adquiriram o produto através dos comentários, que incluem a possibilidade avaliar, também, por estrelas. Após o usuário ter conferido o produto ele pode decidir comprar o produto clicando em um botão de ação que levará o item para o carrinho. O carrinho armazana os produtos que o usuário tem intenção de comprar no instante, descrevendo a quantidade de produtos escolhidos, o valor do item, bem como a soma total de todos os itens escolhidos. Há a possibilidade de retirar ou acrescentar mais itens dentre os selecionados, podendo removê-los caso seja interesse do usuário não adquirir mais um produto específico. Após a decição de comprar ser certa, o usuário pode seguir para o checkout do(s) produto(s).

- sobre o checkout

Para que o usuário possa comprar um produto, é necessário incluir informações sobre a entrega, caso esteja logado, as infomações de entrega são preenchidas de modo automático. Feito isso e tendo pressionado o botão de checkout, o cliente é guiado para a página de pagamento do Stripe. O usuário pode fazer o pagamento através de boleto ou cartão de débito ou crédito. Finalizado, ele é guiado para o carrinho novamente, recebendo um feedback positivo de compra realizada.

- sobre as outras páginas

O ecommerce inclui uma página de categoria, a qual inclui cards categorizados pelos diferentes produtos que compoem o site. A partir dessa página geral de categorias é possível acessar uma página de categoria individual, nela podemos ter um filtro ainda maior, selecionando características mais particulares, como tamanho de armazenamento, cor, etc. O usuário também pode acessar um página de login, onde encontrará dados de pedidos realizados, informações pessoais e a lista de desejo, poderá também fazer alterações nesse mesmo local, alterações na lista de desejo e em dados como endereço fixo de entrega.

- decorações

Todos os componentes do site aparecem após uma animação de entrada de fade-in utilizada somente para tornar a experiência mais agradável. Outro ponto, quando um produto é adicionado ao carrinho, ocorre uma animação simples da imagem do produtos subindo para o header, o que gera um feedback instantâneo e divertivo.


SOBRE O BACKEND: 

Todo o processo de validação e armazenamento é feito a partir da Next API. Cada sessão do site possui uma rota de get, post e update criada para atender a demanda de modo específico, sendo a maior parte das validações e tratamento de dados realizadas dentro dessas rotas.


OUTRAS QUESTÕES RELEVANTES:

O site tem como banco de dados o MongoDB, onde estão armazenadas todas as informações dos usuários, os dados dos produtos(incluindo os endereços das imagens) e a informações da lista de desejo e pedidos realizados. O armazenamento de imagens é feito a partir do AWS bucket da Amazon. O Pagamento é realizado a partir da plataforma Stripe.js

PROBLEMAS E MELHORIAS:

Todo o processo de compra deve passar por um filtro mais rígido de validação de dados e feedback de erros. Primeiramente deve ser incluído um hook de validação do tipo de dado(nome, idade, password, email) através de regex e, feito isso, deve ser gerado retorno individual para o usuário de acordo.


MENÇÕES E AGRADECIMENTO:

O projeto completo só foi possível através do auxílio e base do canal "Coding with Dawid" no youtube. 






