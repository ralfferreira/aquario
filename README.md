# Aquário

> **👨‍💻 Desenvolvedores**: Para guia técnico completo, veja [README-DEV.md](README-DEV.md)

![Logo](assets/logo.png)

## Visão Geral

O **Aquário** é um projeto open source focado em centralizar informações relevantes para os alunos do Centro de Informática (CI). A plataforma visa resolver problemas como a falta de informação e o excesso de locais para buscar informações, facilitando o acesso e a comunicação entre alunos, professores e laboratórios.

## Funcionalidades

### 1. Blog/Notícias/Posts

- **Usuários com contas cadastradas** podem compartilhar posts e publicações.
- **Tipos de Publicações**:
  - Informações específicas de centros acadêmicos.
  - Projetos pessoais e de laboratórios.
  - Dicas de alunos veteranos.
  - Dicas de professores.

### 2. Laboratórios e Seus Projetos

- **Banco de Dados de Laboratórios**:
  - Cada laboratório possui uma conta verificada.
  - Publicações de projetos com informações como membros, linguagens de programação, detalhes públicos e casos de uso de soluções.

### 3. Vagas de Estágio/Emprego

- **Publicações de Vagas**:
  - Contas verificadas de laboratório e professores podem publicar vagas, abrangendo estágio, monitoria, projetos voluntários, iniciação científica e etc.
- **Benefícios**:
  - Redução da superlotação de e-mails.
  - Melhor organização das informações de vagas.

### 4. Achados e Perdidos

- **Scraping do E-mail Acadêmico** para adicionar itens automaticamente.
- **Adições Manuais** de itens encontrados ou perdidos (Tadea terá seu perfil oficial)

### 5. FAQ

- **Guias** sobre diversos assuntos para alunos dos períodos inicias.
- **As Dúvidas e Respostas** mais buscadas por alunos acerca dos cursos, centros, processos e diversos outros assuntos.
- **Documentos** mais importantes e utilizados pelos alunos.

## Objetivo

O objetivo do projeto Aquário é centralizar as informações do CI e oferecer uma solução eficiente para problemas de comunicação e disseminação de informações, facilitando o acesso e o compartilhamento de informações importantes entre todos os membros da comunidade acadêmica.

## Modelo de Dados

Abaixo está o diagrama de classes UML que representa a estrutura de dados do projeto.

![Diagrama UML](assets/uml.svg)

## Design

O design, ainda em desenvolvimento, está no link do figma: https://www.figma.com/design/9got8rICitaYaapG3n1COx/Aquario?node-id=9-92&t=J3rS2QW7M6zhEWLI-1

## Contribuidores

Agradecemos a todos os contribuidores que ajudaram a tornar este projeto possível!

### Opção 1: Contribuidores com Avatares (Simples)

![Contributors](https://contrib.rocks/image?repo=ralfferreira/aquario&anon=1)

### Opção 2: Contribuidores com Estatísticas

![Contributors](https://contrib.rocks/image?repo=ralfferreira/aquario&columns=8&anon=1&show_stats=true)

### Opção 3: Contribuidores com Contadores de Commit

![Contributors](https://contrib.rocks/image?repo=ralfferreira/aquario&columns=6&anon=1&show_stats=true&stats=true)

### Opção 4: Contribuidores Compacto (4 Colunas)

![Contributors](https://contrib.rocks/image?repo=ralfferreira/aquario&columns=4&anon=1)

### Opção 5: Contribuidores com Mais Detalhes

![Contributors](https://contrib.rocks/image?repo=ralfferreira/aquario&columns=10&anon=1&show_stats=true&stats=true&max=20)

### Opção 6: GitHub Nativo - Gráfico de Contribuidores

![GitHub Contributors](https://github.com/ralfferreira/aquario/graphs/contributors)

### Opção 7: GitHub Nativo - Estatísticas do Repositório

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=ralfferreira&show_icons=true&theme=default&hide_border=true)

### Opção 8: Linguagens Mais Usadas

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=ralfferreira&layout=compact&theme=default&hide_border=true)

### Opção 9: Estatísticas do Repositório Específico

![Repository Stats](https://github-readme-stats.vercel.app/api/pin/?username=ralfferreira&repo=aquario&theme=default&hide_border=true)

### Opção 10: Contribuidores com Temas Personalizados

![Contributors](https://contrib.rocks/image?repo=ralfferreira/aquario&columns=8&anon=1&show_stats=true&theme=dark)

### Opção 11: Contribuidores com Bordas Arredondadas

![Contributors](https://contrib.rocks/image?repo=ralfferreira/aquario&columns=6&anon=1&show_stats=true&border_radius=10)

### Opção 12: Contribuidores com Cores Personalizadas

![Contributors](https://contrib.rocks/image?repo=ralfferreira/aquario&columns=8&anon=1&show_stats=true&bg_color=0D1117&title_color=58A6FF&text_color=C9D1D9)

---

## 📊 **Estatísticas Reais de Contribuidores**

### Opção 17: GitHub Nativo - Gráfico de Contribuidores com Commits

![GitHub Contributors](https://github.com/ralfferreira/aquario/graphs/contributors)

### Opção 18: Estatísticas do Repositório (Commits, Stars, Forks)

![Repository Stats](https://github-readme-stats.vercel.app/api/pin/?username=ralfferreira&repo=aquario&theme=default&hide_border=true)

### Opção 19: Linguagens Mais Usadas no Projeto

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=ralfferreira&layout=compact&theme=default&hide_border=true&langs_count=8)

### Opção 20: Estatísticas Gerais do Usuário Principal

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=ralfferreira&show_icons=true&theme=default&hide_border=true)

### Opção 21: Streak de Contribuições

![GitHub Streak](https://streak-stats.demolab.com/?user=ralfferreira&theme=default&hide_border=true)

---

## 🔧 **Soluções para Estatísticas Detalhadas por Contribuidor**

### GitHub Action para Análise de Contribuidores

````yaml
# .github/workflows/contributor-stats.yml
name: Contributor Statistics
on:
  schedule:
    - cron: "0 0 * * 0" # Weekly
jobs:
  generate-stats:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Generate Contributor Stats
        run: |
          echo "# 📊 Estatísticas de Contribuidores" > CONTRIBUTOR_STATS.md
          echo "" >> CONTRIBUTOR_STATS.md
          echo "## Commits por Contribuidor" >> CONTRIBUTOR_STATS.md
          echo "" >> CONTRIBUTOR_STATS.md
          echo '```' >> CONTRIBUTOR_STATS.md
          git shortlog -s -n >> CONTRIBUTOR_STATS.md
          echo '```' >> CONTRIBUTOR_STATS.md
          echo "" >> CONTRIBUTOR_STATS.md
          echo "## Linhas de Código por Contribuidor" >> CONTRIBUTOR_STATS.md
          echo "" >> CONTRIBUTOR_STATS.md
          echo '```' >> CONTRIBUTOR_STATS.md
          git log --pretty=format:%aE | sort | uniq | while read email; do
            echo "Author: $email"
            git log --author="$email" --pretty=tformat: --numstat | awk '{add+=$1; del+=$2} END {printf "Added: %d, Deleted: %d\n\n", add, del}'
          done >> CONTRIBUTOR_STATS.md
          echo '```' >> CONTRIBUTOR_STATS.md
````

### Script Manual para Estatísticas

```bash
# Contar commits por contribuidor
git shortlog -s -n

# Contar linhas adicionadas/deletadas por contribuidor
git log --pretty=format:%aE | sort | uniq | while read email; do
  echo "Author: $email"
  git log --author="$email" --pretty=tformat: --numstat | awk '{add+=$1; del+=$2} END {printf "Added: %d, Deleted: %d\n\n", add, del}'
done
```

## Como Contribuir

O **Aquário** é um projeto open source e as contribuições são muito bem-vindas! Veja como você pode contribuir:

1. **Fork este repositório** e clone o fork para o seu ambiente local.
2. **Crie uma nova branch** para a sua feature ou correção de bug:
   ```sh
   git checkout -b minha-feature
   ```
3. **Faça as modificações** necessárias no código.
4. **Faça commit das suas alterações** (importante seguir o nosso padrão de commits)
   ```sh
   git commit -m "Minhas alterações"
   ```
5. **Envie as suas alterações** para o seu fork no GitHub:
   ```sh
   git push origin minha-feature
   ```
6. **Abra um Pull Request** neste repositório, descrevendo detalhadamente as suas alterações.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

Se você tiver alguma dúvida, sugestão ou feedback, sinta-se à vontade para abrir uma [issue](https://github.com/ralfferreira/aquario/issues) ou enviar um e-mail para [ralf.ferreira@academico.ufpb.br](mailto:ralf.ferreira@academico.ufpb.br).

---

Esperamos que você goste de usar o Aquário e que ele facilite a sua vida acadêmica. Contribua e ajude a melhorar esta plataforma!
