# 🗂️ Desafio Kanban - Gerenciador de Tarefas Web

Um sistema web completo de gerenciamento de tarefas estilo **Kanban**, desenvolvido com foco em organização, usabilidade e boas práticas de desenvolvimento front-end.

---

## 🎯 Objetivo

Desenvolver uma aplicação web com:

- 🔐 Interface de **Login** e **Cadastro de Usuários**
- 🧩 Tela **Kanban dinâmica**, com múltiplas colunas e tarefas interativas
- 👤 Página de **Perfil do Usuário** com opção de **edição de informações**
- 📦 Dados persistidos com **LocalStorage**, simulando um back-end

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (puro)**
- **Bootstrap 5**
- **SweetAlert2**
- **jQuery**

---

## 🗃️ Estrutura de Pastas

```
desafio-kanban/
│
├── index.html               # Página inicial (Kanban)
│
├── js/                      # Scripts principais
│   ├── cadastro.js
│   ├── kanban.js
│   ├── login.js
│   └── perfil.js
│
├── estilos/                 # Estilos personalizados
│   ├── kanban.css
│   ├── login.css
│   └── perfil.css
│
├── imgs/                    # Imagens do projeto (ex: fotos de perfil, ícones)
```

---

## ✅ Funcionalidades

- 📝 **Cadastro e Login** de usuários com validação
- 📌 **Kanban com colunas dinâmicas**:
  - Adição e remoção de colunas
  - Tarefas arrastáveis entre colunas
  - Edição e exclusão de tarefas
- 🔒 **Controle de acesso:** tela Kanban é inacessível sem login
- 👁️ **Foto de perfil personalizada**, exibida no Kanban após login
- 👤 **Tela de perfil do usuário** com:
  - Visualização de nome, email e foto
  - Edição do nome e da imagem de perfil
- 📂 **Persistência local por usuário:** cada usuário possui seu próprio quadro Kanban salvo no navegador
- 💾 Todos os dados são armazenados em **LocalStorage**

---

## 🚀 Como Executar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/otavio-vicente/projeto-kanban.git
   ```

2. Abra o arquivo `index.html` em seu navegador  
   > Recomendado: utilizar **Live Server** ou similar para melhor funcionamento.

3. Cadastre um novo usuário ou use um dos usuários de teste (caso existam no `localStorage`).

---

## 💡 Observações

- O projeto é totalmente front-end, sem banco de dados ou servidor.
- Ideal para fins acadêmicos, aprendizado de lógica, e estudo de CRUD com JavaScript.
- Pode ser facilmente adaptado para integrar com APIs ou back-end real.

---

## 👨‍💻 Desenvolvido por

Otávio  
[LinkedIn](https://www.linkedin.com/in/otávio-henrique-vicente-a669b6206/) | [Instagram](https://www.instagram.com/otaviovicente_rw/)

---

## 📸 Preview

![image](https://github.com/user-attachments/assets/e9d03354-a31e-45fb-b58b-abf46cdd9adb)
![image](https://github.com/user-attachments/assets/89e1d001-5c41-4b97-8493-5d8b9d96cf5d)
![image](https://github.com/user-attachments/assets/cfbf1950-f11f-491c-93b3-57df5d6abfa0)
![image](https://github.com/user-attachments/assets/a5a655cb-ca0b-4ff1-a652-c32da9541465)


---

## 🧠 Aprendizados

Este projeto reforça conceitos como:

- Organização de estrutura de arquivos front-end
- Manipulação dinâmica do DOM com JavaScript
- Gerenciamento de dados com `localStorage`
- Interações com o usuário utilizando `SweetAlert2`
- Estilização com Bootstrap e CSS customizado
- Implementação de CRUD completo sem back-end

---

⭐ Se você gostou do projeto, deixe uma estrela no repositório e contribua com ideias ou melhorias!

