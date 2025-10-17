import React from 'react';

const ComponentWithTailwind: React.FC = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-2.5">
        <div className="border-2 rounded-2xl p-4 flex flex-col justify-between items-start h-40">
          <img className="h-8" src="/images/settings.svg"></img>
          <h2 className="text-base">Engenharia da Computação</h2>
        </div>
        <div className="col-span-2 border-2 rounded-2xl p-4 flex flex-col justify-between items-start h-40">
          <img className="h-8" src="/images/file-text.svg" width="30px"></img>
          <h2 className="text-base">Documentação</h2>
          <p className="text-xs">Veja guias, perguntas prequentes e documentos importantes acerca do curso.</p>
        </div>
        <div className="border-2 rounded-2xl p-4 flex flex-col justify-between items-start h-40">
          <img src="/images/monitor.svg"></img>
          <h2 className="text-base">Ciência da Computação</h2>
        </div>
        <div className="col-span-2 border-2 rounded-2xl p-4 flex flex-col justify-between items-start h-40">
          <img src="/images/grid-2x2-check.svg"></img>
          <h2 className="text-base">Seletor de Cadeiras</h2>
          <p className="text-xs">O seletor de cadeiras utiliza de grafos para permitir uma melhor visualização das suas cadeiras, os pré-requisito e a ementa do curso.</p>
        </div>
        <div className="border-2 rounded-2xl p-4 flex flex-col justify-between items-start h-40">
          <img src="/images/zap.svg"></img>
          <h2 className="text-base">Ciência de Dados e Inteligência Artificial</h2>
        </div>
      </div>
    </div>
  );
};

export default ComponentWithTailwind;
