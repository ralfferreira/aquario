"use client"

import React, { useState, useRef, useEffect } from 'react';
import GradientHeaderComponent from "@/components/Shared/GradientHeader";
import FullScreenTextarea from "@/components/Shared/TextArea";

export default function Test() {
    const [textareas, setTextareas] = useState<{ id: number; content: string }[]>([{ id: 1, content: '' }]);
    const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
    const [textareaToFocus, setTextareaToFocus] = useState<number | null>(null);

    const addTextareaBelow = (index: number) => {
        const newTextareas = [...textareas];
        newTextareas.splice(index + 1, 0, { id: Math.random(), content: '' });
        setTextareas(newTextareas);
        setTextareaToFocus(index + 1);
    };

    useEffect(() => {
        if (textareaToFocus !== null && textareaRefs.current[textareaToFocus]) {
            textareaRefs.current[textareaToFocus].focus();
            setTextareaToFocus(null);
        }
    }, [textareaToFocus]);

    const removeTextarea = (index: number) => {
        if (textareas.length === 1) {
            const updatedTextareas = [...textareas];
            updatedTextareas[0].content = '';
            setTextareas(updatedTextareas);
        } else {
            const newTextareas = [...textareas];
            newTextareas.splice(index, 1);
            setTextareas(newTextareas);
        }
    };

    const handleTextareaChange = (index: number, newContent: string) => {
        const updatedTextareas = [...textareas];
        updatedTextareas[index].content = newContent;
        setTextareas(updatedTextareas);
    };

    return (
        <div className="space-y-6 bg-gray-50 dark:bg-black min-h-screen flex flex-col">
            <div>
                <GradientHeaderComponent 
                academicCenter="Centro de Informática" 
                courses={["Ciência da Computação", "Engenharia da Computação", "Ciências de Dados e Inteligência Artificial"]} 
                currentCourse="Ciência da Computação"/>     
            </div>
          
            <div className="mx-[100px] space-y-4">
                {textareas.map((textarea, index) => (
                    <div key={textarea.id} className="group"> {/* Adiciona a classe group para agrupar a div */}
                        <div className="flex items-center space-x-4 mb-4">
                            {/* Separação dos botões */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                                <button
                                    onClick={() => removeTextarea(index)}
                                    className="px-4 py-2 border-solid text-red-500 text-2xl rounded-full hover:bg-neutral-200 dark:hover:bg-zinc-950 transition-opacity duration-300"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => addTextareaBelow(index)}
                                    className="px-4 py-2 border-solid text-gray-500 text-2xl rounded-full hover:bg-neutral-200 dark:hover:bg-zinc-950 transition-all duration-300"
                                >
                                    +
                                </button>
                            </div>

                            {/* Textarea sempre visível */}
                            <FullScreenTextarea 
                                ref={(el) => {textareaRefs.current[index] = el;}}
                                value={textarea.content}
                                onChange={(e) => handleTextareaChange(index, e.target.value)}
                                onEnterPress={() => addTextareaBelow(index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
