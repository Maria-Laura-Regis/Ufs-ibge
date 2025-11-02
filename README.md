## 🌎 Desafio 2: Consulta de Localidades no Brasil (IBGE API)

Este projeto é uma aplicação web dinâmica que permite ao usuário consultar a lista de municípios de uma Unidade Federativa (UF) específica. Todos os dados são buscados em tempo real diretamente da API pública do Instituto Brasileiro de Geografia e Estatística (IBGE).


### ✨ Tecnologias Utilizadas

| Categoria | Tecnologia | Uso |
| :--- | :--- | :--- |
| **Frontend** | **HTML5** | Estrutura da página. |
| **Estilização** | **Bootstrap 5** | Estilização rápida, responsiva e moderna para os elementos (`<select>`, `<table>`, etc.). |
| **Lógica** | **JavaScript** | Lógica de preenchimento de dados, tratamento de eventos e manipulação do DOM. |
| **Comunicação** | **jQuery (`$.getJSON`)** | Utilizado para realizar chamadas assíncronas à API do IBGE de forma robusta, contornando problemas de CORS em ambientes de desenvolvimento e produção. |
| **Dados** | **API do IBGE** | Fonte de dados oficial para a lista de UFs e Municípios. |

---

### ⚙️ Como Rodar e Testar Localmente

Para testar o projeto, é necessário um servidor web local simples devido às restrições de segurança do navegador (CORS) ao realizar chamadas AJAX/`fetch`.

**Uso da extensão Live Server do VS Code:**

1.  **Instale o Node.js/npm:** (Se já usou para o proxy, está pronto).
2.  **Instale o Live Server:** Instale a extensão **Live Server** (por Ritwick Dey) no Visual Studio Code.
3.  **Abra o Projeto:** Abra a pasta raiz do seu projeto (`desfio-ibge-pages`) no VS Code.
4.  **Execute:** Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
5.  **Acesso:** O projeto será aberto em uma URL como `http://127.0.0.1:5500`. Neste ambiente, o carregamento da API via jQuery funcionará corretamente.

---
