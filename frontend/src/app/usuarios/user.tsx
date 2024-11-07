// OutraPagina.tsx
import LabHeader from "@/components/Pages/Users/labCard";

export default function OutraPagina() {
  return (
    <div>
      <h1>Bem-vindo à outra página</h1>
      <LabHeader
        nome="João"
        subnome="Silva"
        imagemPerfil="/path/to/perfil.jpg"
        imagemLaboratorio="/path/to/laboratorio.jpg"
        numeroProjetos={5}
        numeroProjetosAtivos={3}
        numeroColaboradores={10}
        numeroColaboradoresAtivos={7}
      />
    </div>
  );
}