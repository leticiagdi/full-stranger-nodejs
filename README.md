# 🔬 Laboratório de Hawkins - Sistema Full Stack

Um sistema completo de cadastro e gerenciamento de sujeitos de experimentos telecinéticos, inspirado no universo de **Stranger Things**. Projeto didático demonstrando integração **React + Node.js + MongoDB**.

## 📋 Sobre o Projeto

Este projeto demonstra a criação de uma aplicação full stack com:
- **Frontend**: React com interface temática
- **Backend**: Node.js + Express + MongoDB
- **Banco de Dados**: MongoDB Atlas (nuvem)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 19.2.0
- **Bootstrap** 5.3.3 (CDN)
- **CSS3** com animações customizadas

### Backend
- **Node.js** com Express 5.1.0
- **MongoDB** 7.0.0 + **Mongoose** 8.19.3
- **dotenv** para variáveis de ambiente

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/leticiagdi/stranger-nodejs.git
cd stranger-nodejs
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto (2 terminais):

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm start
```

4. Acesse:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

## �️ Estrutura do Backend

```
src/server/
├── models/
│   └── sujeito.js          # Schema MongoDB
├── routes/
│   └── sujeitos.js         # Rotas CRUD
└── index.js                # Servidor Express
```

## 📊 API Endpoints

### 📝 **POST** `/api/sujeitos`
Criar novo sujeito
```json
{
  "nomeCompleto": "Jane Hopper",
  "idExperimento": "011",
  "dataNascimento": "1971-01-01",
  "classeTelecinetica": "Classe IV - Poder Psíquico Extremo", 
  "estadoAtual": "Liberado"
}
```

### 📋 **GET** `/api/sujeitos`
Listar todos os sujeitos (ordenados por data de criação)

### 🗑️ **DELETE** `/api/sujeitos/:id`
Remover sujeito por ID

### 💚 **GET** `/health`
Status do servidor e conexão com banco

## 🏗️ Schema do Banco (MongoDB)

```javascript
const SujeitoSchema = new mongoose.Schema({
 nomeCompleto: { type: String, required: true },
 idExperimento: { type: String, required: true, unique: true },
 dataNascimento: { type: Date, required: true },
 classeTelecinetica: { type: String, required: true },
 estadoAtual: { type: String, required: true }
}, { timestamps: true });
```

## ⚙️ Configuração do Banco

O projeto está configurado para usar **MongoDB Atlas** (nuvem). A string de conexão está no arquivo `.env`:

```env
DB_URL=
PORT=5000
```

> **📌 Nota**: Em projetos reais, **nunca** publique credenciais no GitHub. Este é apenas um banco de demonstração educacional.

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o frontend React
- `npm run server` - Inicia o backend Node.js  
- `npm run dev` - Inicia ambos simultaneamente (concurrently)
- `npm run build` - Build de produção do React

## 📚 Conceitos Demonstrados

### Backend
- ✅ **Servidor Express** com middlewares
- ✅ **Conexão MongoDB** com Mongoose
- ✅ **CRUD completo** (Create, Read, Delete)
- ✅ **Validações** de dados obrigatórios
- ✅ **Tratamento de erros** específicos
- ✅ **Status HTTP** apropriados
- ✅ **Variáveis de ambiente** (.env)

### Frontend  
- ✅ **Proxy** para comunicação com backend
- ✅ **Fetch API** para requisições HTTP
- ✅ **Estados React** (useState, useEffect)
- ✅ **Componentização** reutilizável
- ✅ **Tratamento de erros** de rede

### Integração
- ✅ **Comunicação Frontend ↔ Backend**
- ✅ **Persistência de dados** no MongoDB
- ✅ **Validação dupla** (frontend + backend)

## 🎭 Inspiração

Baseado no universo de **Stranger Things** (Netflix), especificamente no Laboratório Nacional de Hawkins e seus experimentos com crianças com habilidades psíquicas.

---

> **⚠️ CLASSIFICADO** - Este sistema é fictício e foi criado apenas para demonstração educacional de desenvolvimento full stack.


