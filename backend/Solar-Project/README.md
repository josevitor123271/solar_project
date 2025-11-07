# Solar Project - Backend

Backend Django REST Framework para o Solar Project.

## Instalação

1. Crie um ambiente virtual (se ainda não tiver):
```bash
python -m venv venv
```

2. Ative o ambiente virtual:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

## Configuração do Banco de Dados

Execute as migrações:
```bash
python manage.py makemigrations
python manage.py migrate
```

## Executar o Servidor

```bash
python manage.py runserver
```

O servidor estará disponível em: http://localhost:8000

## Endpoints da API

- `GET /api/pessoas-fisicas/` - Listar todas as pessoas físicas
- `POST /api/pessoas-fisicas/` - Criar pessoa física
- `GET /api/pessoas-fisicas/{id}/` - Obter pessoa física por ID
- `PUT /api/pessoas-fisicas/{id}/` - Atualizar pessoa física
- `DELETE /api/pessoas-fisicas/{id}/` - Deletar pessoa física

- `GET /api/pessoas-juridicas/` - Listar todas as pessoas jurídicas
- `POST /api/pessoas-juridicas/` - Criar pessoa jurídica
- `GET /api/pessoas-juridicas/{id}/` - Obter pessoa jurídica por ID
- `PUT /api/pessoas-juridicas/{id}/` - Atualizar pessoa jurídica
- `DELETE /api/pessoas-juridicas/{id}/` - Deletar pessoa jurídica

## Admin do Django

Acesse: http://localhost:8000/admin

Para criar um superusuário:
```bash
python manage.py createsuperuser
```

