"use client"


import GradientHeaderComponent from "@/components/Shared/GradientHeader";
import PostCard from "@/components/Shared/PostCard";



export default function Test() {
    const handleButtonClick = () => {
      alert('Button clicked!');
    };

    return (
      <div className="space-y-6 bg-gray-50 dark:bg-black min-h-screen flex flex-col">

      <GradientHeaderComponent 
          academicCenter="Centro de Informática" 
          courses={["Ciência da Computação", "Engenharia da Computação", "Ciências de Dados e Inteligência Artificial"]} 
          currentCourse="Ciência da Computação"
      />     

      <PostCard
          projectName="Site da TAIL"
          projectImage="https://aria.ci.ufpb.br/wp-content/uploads/2020/08/Captura-de-Tela-2020-08-16-a%CC%80s-11.57.39.png"
          users={[{name: "Nicholas", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRti0RAguUknG12sOt1xvIuxEx5r3rzC1It_K204hZxG779N4WSR3Vke2cFT2vRYWf3TlY&usqp=CAU", type:"pessoa"}, {name: "Candido", image: "https://avatars.githubusercontent.com/u/69730206?v=4", type:"pessoa"}, {name: "Mauro", image: "https://media.licdn.com/dms/image/D4D03AQFmv3KDcISwOA/profile-displayphoto-shrink_200_200/0/1715379518076?e=2147483647&v=beta&t=Y9rNZfEc4_gVMlt6h6QL-UwTvS69vCRmmh44_v9Bhr4", type: "pessoa"}, {name: "Guilherme Huther", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_jdzX8hzHgjtUSDdeo9VPCFQbGy_yfLjZYnXw_AEpAuMxgMf6HmpN38r5knckOl_OJ6g&usqp=CAU", type:"pessoa"}]} 
          ></PostCard>

      <PostCard
        projectName="WaveFlow"
        projectImage="https://images.squarespace-cdn.com/content/v1/6101b5092ca2836967ed7b15/cc15288d-a008-4108-a4d7-4f387641eb29/1.jpg"
        users={[{name: "TAIL", image: "https://media.licdn.com/dms/image/v2/C4D0BAQE-lG_lJ9CTew/company-logo_200_200/company-logo_200_200/0/1630463497639/tailufpb_logo?e=2147483647&v=beta&t=VQCri_9uJ2Z1F6XT3IEGCy1SzmcXBR6-mW3ymJWlB5g", type: "laboratorio"}]}
        ></PostCard>

      </div>

      
      
    );
}
  