import PostComponent from "@/components/Pages/PostPage";

export default function PostPage() {
  return (
    <PostComponent
      title="Projeto do LASER e TRIL é matéria do Jornal Nacional"
      text={`Desenvolvido por alunos do TRIL, o sistema de correção de redações do ENEM, feito em parceria com Estudo Play e o laboratório @LASER, foi destaque em uma reportagem no Jornal Nacional.

A reportagem, que foi ao ar no dia 20 de julho, aborda o impacto do produto desenvolvido pelos alunos do laboratório no início do ano. O sistema já está em operação e corrigiu mais de 200 mil redações em mais de 2000 escolas da rede pública de Minas Gerais.`}
      user={{
        image: "https://via.placeholder.com/150",
        name: "TRIL",
        type: "LAB",
      }}
      datePublished="5 dias atrás"
      upVotes={23}
    />
  );
}
