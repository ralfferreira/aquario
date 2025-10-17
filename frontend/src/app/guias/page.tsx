"use client";

import React from 'react';
import MarkdownRenderer from '@/components/Shared/MarkdownRender';
import { GuideIndex } from '@/components/Shared/GuideIndex';
import GradientHeaderComponent from '@/components/Shared/GradientHeader';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from 'lucide-react';


export default function Home() {
  const formatTitleFromPath = (path: string) => {
    return path
      .replace(/\//g, ' ')         
      .replace(/-/g, ' ')          
      .replace(/\b\w/g, (char) => char.toUpperCase()); 
  };

  const pathname = usePathname();

  const title = formatTitleFromPath(pathname);

  const data = [
    {
      "Guias Iniciais": [
        { "nomedapagina": "Introdução Aquário", "id": 6010 },
        { "nomedapagina": "Introdução ao curso", "id": 6011 },
        { "nomedapagina": "Centro de Informática", "id": 6012 },
        { "nomedapagina": "Grade curricular", "id": 6013 },
        { "nomedapagina": "Como entrar em um projeto", "id": 6014 },
        { "nomedapagina": "Contribuir", "id": 6015 }
      ],
      "Matrícula e Cadeiras": [
        { "nomedapagina": "Matrícula", "id": 6020 },
        { "nomedapagina": "Matrícula Extraordinária", "id": 6021 },
        { "nomedapagina": "Equivalentes", "id": 6022 },
        { "nomedapagina": "Dispensa de horas", "id": 6023 }
      ],
      "Estágio": [
        { "nomedapagina": "Como conseguir", "id": 6030 },
        { "nomedapagina": "Como cadastrar", "id": 6031 },
        { "nomedapagina": "Estágio Não Supervisionado", "id": 6032 },
        { "nomedapagina": "Estágio Supervisionado", "id": 6033 },
        { "nomedapagina": "Como dispensar", "id": 6034 }
      ],
      "Extensão": [
        { "nomedapagina": "Como conseguir", "id": 6040 },
        { "nomedapagina": "Como cadastrar", "id": 6041 },
        { "nomedapagina": "Como dispensar", "id": 6042 }
      ],
      "Monitoria e Tutoria": [
        { "nomedapagina": "Como conseguir", "id": 6050 },
        { "nomedapagina": "Como cadastrar", "id": 6051 },
        { "nomedapagina": "Como dispensar", "id": 6052 }
      ],
      "Documentos Úteis": [
        { "nomedapagina": "Documentos Úteis", "id": 6060 }
      ],
      "Estágiozao": [
        { "nomedapagina": "Como conseguir", "id": 6030 },
        { "nomedapagina": "Como cadastrar", "id": 6031 },
        { "nomedapagina": "Estágio Não Supervisionado", "id": 6032 },
        { "nomedapagina": "Estágio Supervisionado", "id": 6033 },
        { "nomedapagina": "Como dispensar", "id": 6034 }
      ]
    }
  ];

  const markdownContent = `
  # Título
  ## Subtítulo
  **Texto em negrito**
  
  - Item 1
  - Item 2
  - Item 3
  
  [Link para Google](https://google.com)
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis eget urna vel posuere. Etiam iaculis, est eu sagittis lobortis, sapien nuldsasdasdla dictum leo, nec maximus nulla tortor nec nisi. Ut et dignissim magna. Etiam nunc libero, ultricies eget tortor eu, convallis pharetra velit. Pellentesque sed placerat tellus. Duis condimentum lacus eget malesuada aliquet. Donec feugiat leo at metus rutrum, et accumsan purus mollis. Praesent ligula ipsum, ullamcorper vitae enim ac, accumsan cursus libero. Donec ac lacinia nisl, non lobortis ligula. Vestibulum ac tellus in eros porta aliquet eget sit amet purus. Vestibulum molestie ultrices justo, pretium laoreet magna scelerisque non.

Nunc ac massa magna. Nulla facilisi. Nulla et laoreet lacus. Aenean id auctor elit. Integer pellentesque sit amet magna at ultrices. Suspendisse sed nisi convallis, pellentesque turpis at, blandit libero. Nulla malesuada imperdiet est. Nam eu tincidunt orci. Nulla enim eros, tincidunt elementum commodo ut, rhoncus nec lacus. Donec gravida ultrices venenatis.

Ut vitae tincidunt nibh. In scelerisque lacinia eleifend. Sed justo augue, commodo ac tellus eget, luctus aliquam lectus. In convallis massa ut porttitor pretium. Aenean placerat accumsan dapibus. Vestibulum sem sapien, efficitur ac nulla et, luctus rutrum magna. Duis in dui lectus. Quisque nec interdum odio. Etiam et egestas leo.

Etiam vestibulum felis lorem, non mattis eros condimentum non. Morbi luctus orci quis suscipit mattis. Donec vestibulum pharetra lacus id laoreet. Cras cursus odio vitae tempor mollis. Phasellus varius rhoncus accumsan. Donec eleifend urna justo, et maximus sem ultrices vitae. Sed congue ante rhoncus, feugiat tellus eu, dapibus enim. Morbi euismod enim diam, aliquet vulputate diam ultrices ac. Morbi in vulputate nisi. Nam aliquet aliquam luctus. Suspendisse lobortis eleifend nibh vel dignissim. Vivamus eget nisl eu dui volutpat rutrum vel sit amet magna. In vel tortor elementum, imperdiet quam ac, convallis nibh.

Morbi commodo magna in ex iaculis ultrices eu quis nisi. Donec at tincidunt ante, et mattis orci. Nunc pellentesque ipsum sed sapien tincidunt consequat. Pellentesque ac iaculis ex. Nam dictum felis non iaculis feugiat. Mauris in ultrices felis. Morbi elementum, magna ut euismod pharetra, est mi euismod diam, vitae varius sapien metus sit amet risus. Donec nec auctor sem.

Morbi commodo magna in ex iaculis ultrices eu quis nisi. Donec at tincidunt ante, et mattis orci. Nunc pellentesque ipsum sed sapien tincidunt consequat. Pellentesque ac iaculis ex. Nam dictum felis non iaculis feugiat. Mauris in ultrices felis. Morbi elementum, magna ut euismod pharetra, est mi euismod diam, vitae varius sapien metus sit amet risus. Donec nec auctor sem.

Morbi commodo magna in ex iaculis ultrices eu quis nisi. Donec at tincidunt ante, et mattis orci. Nunc pellentesque ipsum sed sapien tincidunt consequat. Pellentesque ac iaculis ex. Nam dictum felis non iaculis feugiat. Mauris in ultrices felis. Morbi elementum, magna ut euismod pharetra, est mi euismod diam, vitae varius sapien metus sit amet risus. Donec nec auctor sem.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis eget urna vel posuere. Etiam iaculis, est eu sagittis lobortis, sapien nuldsasdasdla dictum leo, nec maximus nulla tortor nec nisi. Ut et dignissim magna. Etiam nunc libero, ultricies eget tortor eu, convallis pharetra velit. Pellentesque sed placerat tellus. Duis condimentum lacus eget malesuada aliquet. Donec feugiat leo at metus rutrum, et accumsan purus mollis. Praesent ligula ipsum, ullamcorper vitae enim ac, accumsan cursus libero. Donec ac lacinia nisl, non lobortis ligula. Vestibulum ac tellus in eros porta aliquet eget sit amet purus. Vestibulum molestie ultrices justo, pretium laoreet magna scelerisque non.

Nunc ac massa magna. Nulla facilisi. Nulla et laoreet lacus. Aenean id auctor elit. Integer pellentesque sit amet magna at ultrices. Suspendisse sed nisi convallis, pellentesque turpis at, blandit libero. Nulla malesuada imperdiet est. Nam eu tincidunt orci. Nulla enim eros, tincidunt elementum commodo ut, rhoncus nec lacus. Donec gravida ultrices venenatis.

Ut vitae tincidunt nibh. In scelerisque lacinia eleifend. Sed justo augue, commodo ac tellus eget, luctus aliquam lectus. In convallis massa ut porttitor pretium. Aenean placerat accumsan dapibus. Vestibulum sem sapien, efficitur ac nulla et, luctus rutrum magna. Duis in dui lectus. Quisque nec interdum odio. Etiam et egestas leo.

Etiam vestibulum felis lorem, non mattis eros condimentum non. Morbi luctus orci quis suscipit mattis. Donec vestibulum pharetra lacus id laoreet. Cras cursus odio vitae tempor mollis. Phasellus varius rhoncus accumsan. Donec eleifend urna justo, et maximus sem ultrices vitae. Sed congue ante rhoncus, feugiat tellus eu, dapibus enim. Morbi euismod enim diam, aliquet vulputate diam ultrices ac. Morbi in vulputate nisi. Nam aliquet aliquam luctus. Suspendisse lobortis eleifend nibh vel dignissim. Vivamus eget nisl eu dui volutpat rutrum vel sit amet magna. In vel tortor elementum, imperdiet quam ac, convallis nibh.

Morbi commodo magna in ex iaculis ultrices eu quis nisi. Donec at tincidunt ante, et mattis orci. Nunc pellentesque ipsum sed sapien tincidunt consequat. Pellentesque ac iaculis ex. Nam dictum felis non iaculis feugiat. Mauris in ultrices felis. Morbi elementum, magna ut euismod pharetra, est mi euismod diam, vitae varius sapien metus sit amet risus. Donec nec auctor sem.

Morbi commodo magna in ex iaculis ultrices eu quis nisi. Donec at tincidunt ante, et mattis orci. Nunc pellentesque ipsum sed sapien tincidunt consequat. Pellentesque ac iaculis ex. Nam dictum felis non iaculis feugiat. Mauris in ultrices felis. Morbi elementum, magna ut euismod pharetra, est mi euismod diam, vitae varius sapien metus sit amet risus. Donec nec auctor sem.

Morbi commodo magna in ex iaculis ultrices eu quis nisi. Donec at tincidunt ante, et mattis orci. Nunc pellentesque ipsum sed sapien tincidunt consequat. Pellentesque ac iaculis ex. Nam dictum felis non iaculis feugiat. Mauris in ultrices felis. Morbi elementum, magna ut euismod pharetra, est mi euismod diam, vitae varius sapien metus sit amet risus. Donec nec auctor sem.

  `;

  return (
    <div className='flex flex-1 flex-col'>
      <GradientHeaderComponent 
          academicCenter="Centro de Informática" 
          courses={["Ciência da Computação", "Engenharia da Computação", "Ciências de Dados e Inteligência Artificial"]} 
          currentCourse="Ciência da Computação"
      />  
      <div className="flex md:flex-row w-full flex-col">
        <div className='relative w-[300px] hidden md:block'>
          <GuideIndex data={data} />
        </div>
        <div className='md:hidden pl-4 pt-4 pb-4'>
          <Sheet key={'left'}>
            <SheetTrigger asChild>
              <Button variant="outline"><AlignJustify size={12}/></Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle className='pb-4'>O que procura?</SheetTitle>
              </SheetHeader>
                <GuideIndex data={data} />
            </SheetContent>
          </Sheet>
        </div>
        <div className="w-[1.5px] min-h-full bg-gray-500 opacity-30"></div>
        <div className='px-8 w-full overscroll-contain '><MarkdownRenderer content={markdownContent} title={title} /></div>
      </div>
    </div>
  );
}