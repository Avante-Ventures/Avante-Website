# wir-hub-daily — robô diário do WIR Hub

Fonte de verdade **versionada** das instruções do robô diário do WIR Hub.
O contêiner remoto é efêmero (`~/.claude` não persiste entre sessões), então o
`SKILL.md` mora aqui, no repo, que é clonado fresco em cada sessão/execução.

## Arquivo
- [`SKILL.md`](./SKILL.md) — instruções completas dos 8 passos (calendário→Reuniões,
  mudanças de etapa, espelho Linear, digest Slack, métricas, briefing PT+EN,
  refresh do cockpit, GSC + MKT).

## Como deixar rodando todos os dias (Scheduled Task na web)
Crie a tarefa em [claude.ai/code](https://claude.ai/code), no environment que tem os
conectores (Notion, Google Calendar, Slack, Linear):

- **Name:** `wir-hub-daily`
- **Schedule:** Daily · **08:06**
- **Timezone:** `America/Bogota`
- **Enabled:** ✅
- **Prompt:**
  ```
  Lê e executa, de ponta a ponta e em ordem, as instruções em
  docs/automation/wir-hub-daily/SKILL.md (na raiz do repositório clonado).
  Termina com o resumo de 3 linhas em PT-BR exigido pelo SKILL.
  ```

> Apontar o prompt para o caminho **do repo** (`docs/automation/wir-hub-daily/SKILL.md`)
> e não para `~/.claude/...` — o primeiro está sempre presente; o segundo não persiste.

## Dependências do ambiente
- **Step 3b (content-engine):** só roda se a pasta local do engine estiver montada
  no ambiente remoto; caso contrário é pulado.
- **Step 8 (GSC):** só roda se houver conector GSC disponível na sessão.
