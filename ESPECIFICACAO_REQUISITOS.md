# Especificação de Requisitos do Sistema (SRS)
## Solar Project - Sistema de Gerenciamento

**Versão:** 1.0  
**Data:** 2025-11-07  
**Status:** Em Desenvolvimento

---

## 1. Visão Geral do Sistema

### 1.1 Descrição
O Solar Project é uma aplicação web para gerenciamento de pessoas físicas e jurídicas, desenvolvida com Django REST Framework (backend) e React com TypeScript (frontend).

### 1.2 Arquitetura
- **Backend:** Django 5.2.8 + Django REST Framework
- **Frontend:** React 19.2.0 + TypeScript + Tailwind CSS
- **Banco de Dados:** SQLite (desenvolvimento) / PostgreSQL (produção)
- **API:** RESTful JSON

---

## 2. Módulos do Sistema

### 2.1 Módulo 1: Gerenciamento de Usuários (Pessoas Físicas e Jurídicas)
**Status:** ✅ Implementado

Este módulo permite o cadastro, visualização, atualização e exclusão de pessoas físicas e jurídicas.

---

## 3. Estrutura de Páginas (Frontend)

### 3.1 Página de Registro (`/`)
**Componente:** `RegistrationPage.tsx`  
**Descrição:** Página inicial que permite selecionar o tipo de cadastro.

**Funcionalidades:**
- Botão para cadastro de Pessoa Física
- Botão para cadastro de Pessoa Jurídica
- Botão para acessar Dashboard

**Rotas Relacionadas:**
- `/pessoa-fisica` - Redireciona para formulário de Pessoa Física
- `/pessoa-juridica` - Redireciona para formulário de Pessoa Jurídica
- `/dashboard` - Redireciona para Dashboard

---

### 3.2 Página de Cadastro - Pessoa Física (`/pessoa-fisica`)
**Componente:** `PessoaFisica.tsx`  
**Formulário:** `PhysicalPersonForm.tsx`

**Campos do Formulário:**
1. Nome completo (obrigatório)
2. CPF (obrigatório, 11 dígitos, com máscara)
3. RG (obrigatório)
4. Data de nascimento (obrigatório)
5. E-mail (obrigatório)
6. Telefone principal (obrigatório, com máscara)
7. CEP (obrigatório, 8 dígitos, com máscara)
8. Logradouro (obrigatório)
9. Número (obrigatório)
10. Complemento (opcional)
11. Bairro (obrigatório)
12. Cidade (obrigatório)
13. Estado (obrigatório, 2 caracteres)
14. País (padrão: Brasil, somente leitura)

**Funcionalidades:**
- Validação de campos obrigatórios
- Máscaras de formatação (CPF, telefone, CEP)
- Validação de CPF (11 dígitos)
- Validação de CEP (8 dígitos)
- Envio de dados para API
- Redirecionamento automático para Dashboard após cadastro bem-sucedido
- Botão para alternar para cadastro de Pessoa Jurídica
- Botão para voltar à página inicial

**Validações:**
- CPF deve conter exatamente 11 dígitos numéricos
- CEP deve conter exatamente 8 dígitos numéricos
- E-mail deve ter formato válido

---

### 3.3 Página de Cadastro - Pessoa Jurídica (`/pessoa-juridica`)
**Componente:** `PessoaJuridica.tsx`  
**Formulário:** `LegalPersonForm.tsx`

**Campos do Formulário:**
1. Razão Social (obrigatório)
2. Nome Fantasia (obrigatório)
3. CNPJ (obrigatório, 14 dígitos, com máscara)
4. Inscrição Estadual (com máscara)
5. Data de abertura (obrigatório)
6. E-mail comercial (obrigatório)
7. Telefone principal (obrigatório, com máscara)
8. Site institucional (opcional)
9. CEP (obrigatório, 8 dígitos, com máscara)
10. Logradouro (obrigatório)
11. Número (obrigatório)
12. Complemento (opcional)
13. Bairro (obrigatório)
14. Estado (obrigatório, 2 caracteres)
15. País (padrão: Brasil, somente leitura)

**Funcionalidades:**
- Validação de campos obrigatórios
- Máscaras de formatação (CNPJ, telefone, CEP, IE)
- Validação de CNPJ (14 dígitos)
- Validação de CEP (8 dígitos)
- Envio de dados para API
- Redirecionamento automático para Dashboard após cadastro bem-sucedido
- Botão para alternar para cadastro de Pessoa Física
- Botão para voltar à página inicial

**Validações:**
- CNPJ deve conter exatamente 14 dígitos numéricos
- CEP deve conter exatamente 8 dígitos numéricos
- E-mail deve ter formato válido

---

### 3.4 Dashboard (`/dashboard`)
**Componente:** `Dashboard.tsx`

**Funcionalidades:**
- Visualização de todas as pessoas físicas cadastradas
- Visualização de todas as pessoas jurídicas cadastradas
- Sistema de abas (tabs) para alternar entre Pessoas Físicas e Jurídicas
- Exibição de contadores por tipo
- Cards informativos com dados completos de cada registro
- Botão de exclusão para cada registro (com confirmação)
- Botão para atualizar dados
- Botão para voltar à página de registro
- Tratamento de estados vazios (mensagem quando não há registros)
- Tratamento de erros de carregamento
- Loading state durante carregamento de dados

**Informações Exibidas - Pessoa Física:**
- Nome completo
- CPF (formatado)
- E-mail
- Telefone
- Data de nascimento (formatada)
- RG
- Endereço completo (logradouro, número, bairro, cidade, estado)
- CEP (formatado)

**Informações Exibidas - Pessoa Jurídica:**
- Razão Social
- Nome Fantasia
- CNPJ (formatado)
- E-mail comercial
- Telefone
- Data de abertura (formatada)
- Inscrição Estadual
- Site (se disponível)
- Endereço completo (logradouro, número, bairro, estado)

**Ações Disponíveis:**
- Excluir registro (com confirmação)
- Atualizar lista de dados
- Navegar para cadastro de novo registro

---

## 4. Rotas do Frontend (React Router)

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | `RegistrationPage` | Página inicial de seleção de tipo de cadastro |
| `/pessoa-fisica` | `PessoaFisica` | Formulário de cadastro de Pessoa Física |
| `/pessoa-juridica` | `PessoaJuridica` | Formulário de cadastro de Pessoa Jurídica |
| `/dashboard` | `Dashboard` | Dashboard com visualização de todos os registros |

---

## 5. Endpoints da API (Backend)

### 5.1 Base URL
```
http://localhost:8000/api/
```

### 5.2 Endpoints - Pessoa Física

#### 5.2.1 Listar Todas as Pessoas Físicas
- **Método:** `GET`
- **URL:** `/api/pessoas-fisicas/`
- **Descrição:** Retorna lista paginada de todas as pessoas físicas cadastradas
- **Resposta de Sucesso (200):**
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "cpf": "12345678901",
      "nome_completo": "João Silva",
      "data_nascimento": "1990-01-15",
      "rg": "123456789",
      "email": "joao@example.com",
      "telefone_principal": "11987654321",
      "cep": "01234567",
      "logradouro": "Rua Exemplo",
      "numero": "123",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP",
      "pais": "Brasil",
      "complemento": "Apto 45"
    }
  ]
}
```

#### 5.2.2 Buscar Pessoa Física por ID
- **Método:** `GET`
- **URL:** `/api/pessoas-fisicas/{id}/`
- **Parâmetros:** `id` (path parameter)
- **Resposta de Sucesso (200):** Objeto JSON com dados da pessoa física
- **Resposta de Erro (404):** Pessoa física não encontrada

#### 5.2.3 Criar Pessoa Física
- **Método:** `POST`
- **URL:** `/api/pessoas-fisicas/`
- **Content-Type:** `application/json`
- **Body:**
```json
{
  "cpf": "12345678901",
  "nome_completo": "João Silva",
  "data_nascimento": "1990-01-15",
  "rg": "123456789",
  "email": "joao@example.com",
  "telefone_principal": "11987654321",
  "cep": "01234567",
  "logradouro": "Rua Exemplo",
  "numero": "123",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "pais": "Brasil",
  "complemento": "Apto 45"
}
```
- **Resposta de Sucesso (201):** Objeto JSON com dados da pessoa física criada
- **Resposta de Erro (400):** Dados inválidos
- **Resposta de Erro (409):** CPF já cadastrado

#### 5.2.4 Atualizar Pessoa Física
- **Método:** `PUT`
- **URL:** `/api/pessoas-fisicas/{id}/`
- **Parâmetros:** `id` (path parameter)
- **Content-Type:** `application/json`
- **Body:** Objeto JSON com campos a serem atualizados
- **Resposta de Sucesso (200):** Objeto JSON com dados atualizados
- **Resposta de Erro (400):** Dados inválidos
- **Resposta de Erro (404):** Pessoa física não encontrada

#### 5.2.5 Deletar Pessoa Física
- **Método:** `DELETE`
- **URL:** `/api/pessoas-fisicas/{id}/`
- **Parâmetros:** `id` (path parameter)
- **Resposta de Sucesso (204):** Sem conteúdo
- **Resposta de Erro (404):** Pessoa física não encontrada

---

### 5.3 Endpoints - Pessoa Jurídica

#### 5.3.1 Listar Todas as Pessoas Jurídicas
- **Método:** `GET`
- **URL:** `/api/pessoas-juridicas/`
- **Descrição:** Retorna lista paginada de todas as pessoas jurídicas cadastradas
- **Resposta de Sucesso (200):**
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "razao_social": "Empresa Exemplo Ltda",
      "nome_fantasia": "Exemplo Solar",
      "data_abertura": "2020-01-15",
      "email_comercial": "contato@exemplo.com",
      "telefone_principal": "11987654321",
      "inscricao_estadual": "123456789",
      "cnpj": "12345678000190",
      "site": "https://www.exemplo.com",
      "complemento": "Sala 10",
      "logradouro": "Av. Exemplo",
      "bairro": "Centro",
      "estado": "SP",
      "numero": "456",
      "pais": "Brasil"
    }
  ]
}
```

#### 5.3.2 Buscar Pessoa Jurídica por ID
- **Método:** `GET`
- **URL:** `/api/pessoas-juridicas/{id}/`
- **Parâmetros:** `id` (path parameter)
- **Resposta de Sucesso (200):** Objeto JSON com dados da pessoa jurídica
- **Resposta de Erro (404):** Pessoa jurídica não encontrada

#### 5.3.3 Criar Pessoa Jurídica
- **Método:** `POST`
- **URL:** `/api/pessoas-juridicas/`
- **Content-Type:** `application/json`
- **Body:**
```json
{
  "razao_social": "Empresa Exemplo Ltda",
  "nome_fantasia": "Exemplo Solar",
  "data_abertura": "2020-01-15",
  "email_comercial": "contato@exemplo.com",
  "telefone_principal": "11987654321",
  "inscricao_estadual": "123456789",
  "cnpj": "12345678000190",
  "site": "https://www.exemplo.com",
  "complemento": "Sala 10",
  "logradouro": "Av. Exemplo",
  "bairro": "Centro",
  "estado": "SP",
  "numero": "456",
  "pais": "Brasil"
}
```
- **Resposta de Sucesso (201):** Objeto JSON com dados da pessoa jurídica criada
- **Resposta de Erro (400):** Dados inválidos
- **Resposta de Erro (409):** CNPJ já cadastrado

#### 5.3.4 Atualizar Pessoa Jurídica
- **Método:** `PUT`
- **URL:** `/api/pessoas-juridicas/{id}/`
- **Parâmetros:** `id` (path parameter)
- **Content-Type:** `application/json`
- **Body:** Objeto JSON com campos a serem atualizados
- **Resposta de Sucesso (200):** Objeto JSON com dados atualizados
- **Resposta de Erro (400):** Dados inválidos
- **Resposta de Erro (404):** Pessoa jurídica não encontrada

#### 5.3.5 Deletar Pessoa Jurídica
- **Método:** `DELETE`
- **URL:** `/api/pessoas-juridicas/{id}/`
- **Parâmetros:** `id` (path parameter)
- **Resposta de Sucesso (204):** Sem conteúdo
- **Resposta de Erro (404):** Pessoa jurídica não encontrada

---

## 6. Modelos de Dados (Backend)

### 6.1 PessoaFisica

| Campo | Tipo | Descrição | Validações |
|-------|------|-----------|------------|
| id | BigAutoField | Chave primária | Auto-incremento |
| cpf | CharField(11) | CPF | Único, 11 dígitos numéricos |
| nome_completo | CharField(150) | Nome completo | Obrigatório |
| data_nascimento | DateField | Data de nascimento | Obrigatório |
| rg | CharField(20) | RG | Obrigatório |
| email | EmailField(150) | E-mail | Obrigatório, formato válido |
| telefone_principal | CharField(15) | Telefone | Obrigatório |
| cep | CharField(8) | CEP | Obrigatório, 8 dígitos numéricos |
| logradouro | CharField(150) | Logradouro | Obrigatório |
| numero | CharField(10) | Número | Obrigatório |
| bairro | CharField(80) | Bairro | Obrigatório |
| cidade | CharField(100) | Cidade | Obrigatório |
| estado | CharField(2) | Estado | Obrigatório, choices (estados BR) |
| pais | CharField(50) | País | Padrão: "Brasil" |
| complemento | CharField(50) | Complemento | Opcional |

**Estados Disponíveis:** AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO

---

### 6.2 PessoaJuridica

| Campo | Tipo | Descrição | Validações |
|-------|------|-----------|------------|
| id | BigAutoField | Chave primária | Auto-incremento |
| razao_social | CharField(150) | Razão Social | Obrigatório |
| nome_fantasia | CharField(150) | Nome Fantasia | Obrigatório |
| data_abertura | DateField | Data de Abertura | Obrigatório |
| email_comercial | EmailField(150) | E-mail Comercial | Obrigatório, formato válido |
| telefone_principal | CharField(15) | Telefone Principal | Obrigatório |
| inscricao_estadual | CharField(20) | Inscrição Estadual | Obrigatório |
| cnpj | CharField(14) | CNPJ | Único, 14 dígitos numéricos |
| site | URLField(150) | Site | Opcional |
| complemento | CharField(50) | Complemento | Opcional |
| logradouro | CharField(150) | Logradouro | Obrigatório |
| bairro | CharField(80) | Bairro | Obrigatório |
| estado | CharField(2) | Estado | Obrigatório, choices (estados BR) |
| numero | CharField(10) | Número | Obrigatório |
| pais | CharField(50) | País | Padrão: "Brasil" |

**Estados Disponíveis:** AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO

---

## 7. Configurações Técnicas

### 7.1 Backend (Django)

**Arquivos Principais:**
- `setup/settings.py` - Configurações do Django
- `setup/urls.py` - URLs principais da API
- `solarproject/models.py` - Modelos de dados
- `solarproject/serializers.py` - Serializers da API
- `solarproject/views.py` - ViewSets da API
- `solarproject/admin.py` - Configuração do Admin

**Configurações Importantes:**
- CORS habilitado para `http://localhost:5173`
- REST Framework configurado com paginação (10 itens por página)
- Permissões: AllowAny (desenvolvimento)

### 7.2 Frontend (React)

**Arquivos Principais:**
- `src/App.tsx` - Componente principal e rotas
- `src/services/api.ts` - Serviços de API
- `src/pages/` - Páginas da aplicação
- `src/components/` - Componentes reutilizáveis

**Tecnologias:**
- React Router DOM para navegação
- TypeScript para tipagem
- Tailwind CSS para estilização
- Fetch API para requisições HTTP

---

## 8. Fluxos de Navegação

### 8.1 Fluxo de Cadastro - Pessoa Física
1. Usuário acessa `/`
2. Clica em "Pessoa Física (CPF)"
3. Redirecionado para `/pessoa-fisica`
4. Preenche formulário
5. Clica em "Cadastrar Pessoa Física"
6. Dados são enviados para `POST /api/pessoas-fisicas/`
7. Após sucesso, redirecionado para `/dashboard`
8. Dashboard exibe o novo registro

### 8.2 Fluxo de Cadastro - Pessoa Jurídica
1. Usuário acessa `/`
2. Clica em "Pessoa Jurídica (CNPJ)"
3. Redirecionado para `/pessoa-juridica`
4. Preenche formulário
5. Clica em "Cadastrar Empresa"
6. Dados são enviados para `POST /api/pessoas-juridicas/`
7. Após sucesso, redirecionado para `/dashboard`
8. Dashboard exibe o novo registro

### 8.3 Fluxo de Visualização - Dashboard
1. Usuário acessa `/dashboard` (ou é redirecionado após cadastro)
2. Sistema carrega dados via `GET /api/pessoas-fisicas/` e `GET /api/pessoas-juridicas/`
3. Exibe dados em cards organizados
4. Usuário pode alternar entre abas (Física/Jurídica)
5. Usuário pode excluir registros via `DELETE /api/pessoas-fisicas/{id}/` ou `DELETE /api/pessoas-juridicas/{id}/`

---

## 9. Validações e Regras de Negócio

### 9.1 Pessoa Física
- CPF deve ser único no sistema
- CPF deve conter exatamente 11 dígitos numéricos
- CEP deve conter exatamente 8 dígitos numéricos
- E-mail deve ter formato válido
- Estado deve ser uma das siglas válidas do Brasil

### 9.2 Pessoa Jurídica
- CNPJ deve ser único no sistema
- CNPJ deve conter exatamente 14 dígitos numéricos
- CEP deve conter exatamente 8 dígitos numéricos
- E-mail comercial deve ter formato válido
- Estado deve ser uma das siglas válidas do Brasil

---

## 10. Tratamento de Erros

### 10.1 Frontend
- Mensagens de erro exibidas em componentes de formulário
- Loading states durante requisições
- Confirmação antes de exclusão
- Tratamento de erros de rede
- Validação client-side antes de envio

### 10.2 Backend
- Validação de dados via serializers
- Mensagens de erro descritivas
- Códigos HTTP apropriados (400, 404, 409, 500)
- Validação de campos únicos (CPF, CNPJ)

---

## 11. Próximos Módulos (Planejados)

### 11.2 Módulo 2: [A definir]
- Descrição pendente

### 11.3 Módulo 3: [A definir]
- Descrição pendente

---

## 12. Informações de Desenvolvimento

### 12.1 Como Executar o Backend
```bash
cd solar_project/backend/Solar-Project
python manage.py runserver
```
**URL:** http://localhost:8000

### 12.2 Como Executar o Frontend
```bash
cd solar_project/solarProject
npm run dev
```
**URL:** http://localhost:5173

### 12.3 Migrações do Banco de Dados
```bash
cd solar_project/backend/Solar-Project
python manage.py makemigrations
python manage.py migrate
```

---

## 13. Contato e Suporte

**Projeto:** Solar Project  
**Versão do Documento:** 1.0  
**Última Atualização:** 2025-11-07

---

**Fim do Documento**

