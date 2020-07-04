# GoBarber

Aplicação web onde os prestadores de serviço poderão consultar sua agenda e disponibilidade de horário, além de alterar seu perfil

[![Netlify Status](https://api.netlify.com/api/v1/badges/8c215123-5b28-4768-b407-c972b9301b87/deploy-status)](https://go-barber-web.netlify.app/)
![CI](https://github.com/laraludwig18/gobarber-web/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/laraludwig18/gobarber-web/badge.svg?branch=master)](https://coveralls.io/github/laraludwig18/gobarber-web?branch=master)

## Telas

<img src="https://i.imgur.com/MJdndYn.png" title="source: imgur.com" />
<img src="https://i.imgur.com/8ilUhdb.png" title="source: imgur.com" />
<img src="https://i.imgur.com/9ovDEyt.png" title="source: imgur.com" />
<img src="https://i.imgur.com/AiyWDQI.png" title="source: imgur.com" />

## Inicialização

Instalar dependências:
```
yarn
```
Rodar projeto:
```
yarn start
```

## TODO

- [x] Deslogar usuário quando token expirar
- [x] Separar AvatarInput em outra pasta dentro de profile
- [ ] Adicionar loader no botão
- [ ] Criar estado global de loading usando context api
- [ ] Adicionar tratamento caso usuário não tenha avatar
- [ ] Separar tipagens que estejam duplicadas
