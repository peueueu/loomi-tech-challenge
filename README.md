# 🚀 Começando

## Pré-requisitos

- Node.js (versão LTS recomendada)
- **pnpm** instalado globalmente

Caso ainda não tenha o pnpm instalado:

```bash
npm install -g pnpm
```

Se a versão do Node.js for 16.13+ (ou 18+/20+), o Corepack vem incluído, então podemos executar:

```bash
corepack enable
```

Isso já disponibiliza o `pnpm` automaticamente.

Para conferir:

```bash
pnpm --version
```

---

## 📦 Instalação das dependências

Instale as dependências do projeto utilizando **pnpm**:

```bash
pnpm install
```

---

## ▶️ Executando o projeto em desenvolvimento

Inicie o servidor de desenvolvimento com:

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver a aplicação rodando.

As alterações são refletidas automaticamente no navegador.

---

## ⚙️ Variáveis de ambiente

Edite o arquivo `env-example` na raiz do projeto com o seguinte conteúdo:

```env
BACKEND_BASE_URL=
```

Insira a URL da `API` no váriavel de ambiente e renomeie o arquivo para `.env`.

Ou basta criar um arquivo novo `.env` e inserir a váriavel acima com a URL.

### Variáveis obrigatórias

| Variável         | Descrição                                |
| ---------------- | ---------------------------------------- |
| BACKEND_BASE_URL | URL base da API/backend utilizada no app |

> ⚠️ Ajuste o valor de acordo com o ambiente (local, staging ou produção).
