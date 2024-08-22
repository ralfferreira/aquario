"use client"

import { Label } from "@/components/ui/label"

import ComponentWithTailwind from "../../Tests & Examples/Week1 - CSS, Tailwind and Shadcn/ComponentWithTailwind";
import ComponentWithShadcn from "../../Tests & Examples/Week1 - CSS, Tailwind and Shadcn/ComponentWithShadcn";
import ComponentWithCss from "../../Tests & Examples/Week1 - CSS, Tailwind and Shadcn/ComponentWithCss/ComponentWithCss";

import WrapperComponent from "@/Tests & Examples/Week2 - Props/WrapperComponent";
import ProfileComponent from "@/Tests & Examples/Week2 - Props/ProfileComponent";
import ButtonComponent from "@/Tests & Examples/Week2 - Props/ButtonComponent";
import CardComponent from "@/Tests & Examples/Week2 - Props/CardComponent";

export default function Test() {
    const handleButtonClick = () => {
      alert('Button clicked!');
    };

    return (
      <div className="p-8 mt-10 space-y-6 bg-gray-50 min-h-screen flex flex-col">

        <Label className="mt-10">Wrapper Component: Passing Text as children prop</Label>
        <WrapperComponent>
          <h1 className="text-3xl font-bold text-center">Welcome to My App</h1>
        </WrapperComponent>

        <Label className="mt-10">Profile Component: Passing name, age and occupation information as props</Label>
        <ProfileComponent name="John Doe" age={30} occupation="Engineer" />

        <Label className="mt-10">Button Component: Passing function of opening alert as prop</Label>
        <ButtonComponent label="Click Me" onClick={handleButtonClick} />

        <Label className="mt-10">Card Component: Passing multiple things as props.</Label>
        <CardComponent title="My Card" onButtonClick={handleButtonClick}>
          <p className="text-gray-700">This is the content of the card.</p>
        </CardComponent>
      </div>
    );
}
  