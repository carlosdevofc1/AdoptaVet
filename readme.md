#  AdoptaVet - Sistema de Gestão de Resgates e Adoção

**Disciplina:** [Insira o nome da disciplina aqui]  
**Projeto:** Trabalho Prático Individual Evolutivo - Etapa 3  
**Autor:** [Seu Nome / Carlos Fernando Vieira da Cruz]  

---

##  Sobre o Projeto
O **AdoptaVet** é uma aplicação web voltada para clínicas veterinárias e ONGs parceiras, projetada para gerenciar o histórico médico, status e adoção de animais resgatados. O sistema foi concebido com foco em usabilidade, acessibilidade e um design "Neomórfico" amigável, transmitindo o acolhimento necessário para o tema.

Este repositório contém a entrega da **Etapa 3**, englobando a interface completa, persistência de dados no navegador e consumo de API pública.

---

##  Funcionalidades (Requisitos Atendidos)

- **CRUD Completo:** Permite cadastrar, visualizar, editar e excluir registros de animais resgatados.
- **Filtros e Ordenação:** Pesquisa dinâmica por nome ou raça, filtro por espécie (Cão/Gato) e ordenação por idade.
- **Persistência de Dados:** Uso de `LocalStorage` para armazenar o banco de dados localmente. Os dados não são perdidos ao recarregar a página.
- **Consumo de API Externa:** Integração com a **The Dog API / The Cat API** via `fetch`. Ao cadastrar um animal, o sistema busca características comportamentais e expectativa de vida baseadas na raça informada, enriquecendo o prontuário médico.
- **Dashboard Analítico:** Página de relatórios que calcula, em tempo real, o total de animais resgatados, adotados e em tratamento.

---

##  Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação acessível utilizando tags como `<main>`, `<article>`, `<section>`, `<search>` e `<figure>`.
- **CSS3 & Bootstrap 5:** Estilização baseada na paleta *Verde Selva* com design **Neomórfico** (sombras de extrusão e intrusão para sensação tátil), totalmente responsivo.
- **JavaScript (Vanilla):** Manipulação da DOM, gerenciamento assíncrono (Promises/Async-Await para a API) e lógica de persistência de dados.

---

##  Estrutura de Diretórios

O projeto foi organizado de forma modular para facilitar a manutenção e escalabilidade:

```text
📦 adoptavet
 ┣ 📂 assets
 ┃ ┣ 📂 css
 ┃ ┃ ┣ 📜 style.css       # Estilos globais e variáveis de tema
 ┃ ┃ ┣ 📜 index.css       # Estilos específicos do dashboard
 ┃ ┃ ┣ 📜 detalhes.css    # Estilos da página de visualização
 ┃ ┃ ┗ 📜 relatorios.css  # Estilos do painel de métricas
 ┃ ┗ 📂 js
 ┃   ┣ 📜 database.js     # Lógica de conexão com o LocalStorage
 ┃   ┣ 📜 main.js         # Manipulação da DOM (Listagem, Filtros, Relatórios)
 ┃   ┗ 📜 form.js         # Lógica de validação e consumo da API Pública
 ┗ 📂 pages
   ┣ 📜 index.html        # Dashboard principal e listagem de animais
   ┣ 📜 form-animal.html  # Formulário de cadastro e edição
   ┣ 📜 detalhes.html     # Visualização detalhada do prontuário
   ┗ 📜 relatorios.html   # Painel de métricas do abrigo
 ┣ 📜 README.md           # Documentação do projeto