import React from 'react';

const IanWithTailwind: React.FC = () => {
  return (
    //outerbox
    <div className="grid grid-cols-[100px_1fr_200px] border-[1px] border-[#b8b8b8] rounded-lg w-[1000px]">
       {/* image */}
        <div className='flex justify-center items-center'>
            <img className="w-[60px] h-[60px] rounded-full" src="public/images/ian.jpeg." alt="profile picture" />
        </div>
        {/* name */}
        <div className='flex flex-col justify-start items-start'>
            {/* upperbox */}
            <div className='flex flex-row justify-end items-end mt-4 font-sans pt-[15px]'>
                <h2 className="text-2xl font-light pr-[10px]">Ian Rocha Bittencourt</h2>
                <p className="flex justify-center items-center bg-[#b8b8b8] text-base text-white rounded-lg w-[40px] h-[20px] mb-[3px]">PES</p>
            </div>
            {/* lowerbox */}
            <div className='flex justify-center items-center text-base font-normal text-[#726e6e] font-sans mb-20px'>
                <p className='mt-[5px] mb-[20px]'>Ciência da Computação</p>
            </div>
        </div>
        {/* button */}
        <div className='flex justify-center items-center'>
            <button className="bg-black text-white w-[100px] h-[30px] border-0 rounded-[1.2rem] text-basis font-bold">Site</button>
        </div>
    </div>
  );
};

export default IanWithTailwind;