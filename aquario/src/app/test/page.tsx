import ComponentWithTailwind from "../../Tests & Examples/ComponentWithTailwind";
import ComponentWithShadcn from "../../Tests & Examples/ComponentWithShadcn";
import ComponentWithCss from "../../Tests & Examples/ComponentWithCss/ComponentWithCss";

export default function Test() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Test Page</p>
        <ComponentWithTailwind />
        <ComponentWithShadcn />
        <ComponentWithCss />
      </main>
    );
}
  