# Frontend - Guides, rules and good practices (beta)

## Language (natural and coding)

### Natural Communication

As you are seeing here, we will follow a general rule of commenting in english. This includes: documentation, commenting on code and variable creation on code. As a rule of thumb, always use english.

### Coding languages

As you will see here later, we will use React in Next.js to build this project. Our main language inside the project will be Typescript, which is more annoying but will allow for more scalebility. We will be allowed to use both pure CSS and TailwindCSS.

## Organization

### Team

The team has the following members:

Leader:

- Tiago Trindade

Main Members

- Ian Bittencourt
- Mauro Coimbra
- Emyle Lucena
- Paixão

### Tasks and responsabilities

Ideally, we would follow the system of the leader passing tasks through a software like Jira or Miro, giving a date for it, and the members exercizing the tasks. In this scenario, it would be the members' responsability to finish the given tasks, and the leader's to attribute the tasks to each member.

**_However, as for the first steps_**, we will have a different approach. Our focus will be on the learning aspect of the members. We will follow a structure of the members being given simple tasks and the leader helping them through it. With time, we will look at how it's going and improve from there.

### Communication

Our main communication will be, initially, at the WhatsApp group. With time, we will need to schedule meetings. This may occur in place or online. In place if wee see that we meet a lot at TRIL Lab, and online if we don't. If we do them online, it will problably be in a dedicated Discord server, though it could be in Google Meet as well.

These meetings could be every week, or every two weeks. We will define it with time.

### Github

We will use github to keep track or the project and manage and share the code. Before starting, you will fork the main repository. From that, you will make your tasks or changes as you need. After making the changes, you will make a Pull Request.

**\*However, do not make the pull request to the main repository.** You will make the Pull Request to the leader's repository. Then, he will evaluate, merge (or not), and then send it to the main repository. This will allow us to maintain a good control of everything.

## Coding

This a Next.js project. Next uses React, a framework that allows you to make components out of things. That means you can reuse a lot of the things you make which is good. That also means you can import components made by other people, that's even better.

In this project, we will use the [shadcn](https://ui.shadcn.com/) component library. The has multiple components what are present in our project. Basically, we can simply import an already made thing and use it. Of course, it's not that simple, since we have to integrate with our work, but it does make things a lot faster. This also helps mantaining a good design, and allows also for easily implementing dark and light mode change in our website, of which we will try to do.

As for the language, we will use Typescript. As said before, typescript is more annoying, but when talking about large project, it is a better idea to use it since it makes it safes to scale.

### What is a component?

Since many of you problably didn't have as much of a contact with frontend development, I will try to explain one of the most important concepts you need to know: components.

Imagine a pure html, css and javascript website. If you ever done one, you may have noticed that a file can get very very large. Imagine a very big page on the internet, the code will look even bigger. Now imagine, for a moment, that there are many parts of this very large website that are repeated. For example, there's a card or a button that appear multiple times. And, obviously, the code repeats it a lot of times as well. And this happens not only in one page, but across pages, with the repetition of this button, card, or whatever.

You can notice that is not at all a good idea to have to be changing this element in all of the project manually if you need, for example, to change a little detail about it.

That's what React allows us to easily do. We can get this element and, for example, transform it into a javascript function that return the html and css elements. In other words, we create a function, for example in a brend new file, that returns what this element (component) was returning before: the html and css. So now, we remove all of the cards, for example, in the code, and replace it with that function. Now, if we want to change the card, we can simply open the file made specially for it (for organization purproses) and change there, which will apply to every single part of the website that calls the function.

That is basically what a component is. It is quite literally like a function in any language, it allows you to reuse it more easily. Not only that, but it can also receive arguments. Imagine you created a component Button. Now you can reuse a specially stylized button in all pages and all places. But what if you wanted the button to vary in the text it displays? You can simply allow the component (function) to receive a parameter (title), and display it. Now, when calling the component (function) in any part of the website, you can pass the title.

This is the basics of components. It allows for a way more organized project, reusability, and the importing of outside already made components, which we will do as well.

Notice that this concept of component doesn't only apply to small things like buttons or cards, but the logic is the same for, for example, an entire page. It is simply a function that returns the content.

In fact, the pages are exactly that. A page is a component with multiple components inside it, which itself may have multiple components inside it, etc.

### Project Structure

If not familiar with Next or React, this project folder will seem like a lot. But let's go through every folder and see what is like.

First of all, if you are on the repository root folder, focus on the "aquario" folder. Forget everything else. This is the folder that has the frontend on it, and this is what we care about at the moment.

Secondly, if you are interested in seeing how to start the project, it's pretty simple (depending on what stage you are): simply type "npm i" and then "npm run dev" (assuming you have Node installed). Or just look at the "README.md" file here.

So, starting from the basics, we have a lot of files and two folders. Most of the files, you won't need to care about at the start. Most of them are simply configuration files that you will change in very specific moments, or you will not even look at them.

As for the folders, you see the "public" folder and the "scr" folder. The public folder contains assets that will be used in the project, you won't be looking at it too much either. Now for the src folder, that is the source, the main thing here.

Most of the folders we will ignore at the start. I only put them for you to be able to see what the future holds here.

Here's a simple organization of the project, which follows the folders already put there.

src/
├── app/
│ ├── layout.tsx # Main layout component for the app
│ ├── page.tsx # Root page using the App Router
│ ├── about/
│ │ ├── page.tsx # About page using the App Router
│ ├── posts/
│ │ ├── page.tsx # Posts page using the App Router
│ └── ...
├── api/
│ ├── posts.ts # API functions for posts
│ ├── users.ts # API functions for user-related actions
│ └── ...
├── components/
│ ├── Header.tsx # Header component
│ ├── Footer.tsx # Footer component
│ └── ...
├── contexts/
│ ├── AuthContext.tsx # Context for authentication
│ ├── ThemeContext.tsx # Context for theme management
│ └── ...
├── services/
│ ├── authService.ts # Service functions for authentication
│ ├── userService.ts # Service functions for user-related operations
│ └── ...
├── utils/
│ ├── helpers.ts # Utility functions
│ ├── validators.ts # Validation functions
│ ~~└── ...~~
├── .eslintrc.json # ESLint configuration
├── tsconfig.json # TypeScript configuration
├── next.config.js # Next.js configuration
└── README.md # Project documentation

#### app

This folder contains the pages. This folder is the one used for the routing of the website. So, basically, if you create a folder named "About" inside the app folder, and a page file inside it, Next will automatically make a route "/About" that leads to this page. That's what it is used for.

And each page in there will very certainly import components

#### components

In this folder we will have all components made. For organization purposes, we created two folders in it: Pages and Shared.

In the Shared folder, we will put all components that are shared between pages.

In the Pages folder, there will be a folder for each of the pages in the website for the components that are present only in the specific page.

There will be also an "ui" folder, which will be automatically created as soon as we import external components, of which will be placed there.

#### ...

The others we will look at later.

### Libraries

#### Components Libraries - Shadcn

##### What is shadcn?

[shadcn](https://ui.shadcn.com/docs/components/accordion)

Shadcn is a component library. That mean it has a lot of components that we can simply import like we were importing a function. This makes our production way faster, since we have a base to build uppon. Shadcn also has colors and themes. These are configurations like systems that allows us to easily change how everything looks like. For example, they have multiple color schemes that if we change them, everything we used of them will change instantly. They also make it vary easy to make light and dark theme modes. Check their website to see how it looks like.

##### How to use it?

As I said, their website explains it pretty good. But here's an example. Let's say we have configured it already to use it (you won't need to, since I already will). And let's say I want to use their Button component.

In the terminal, i put:

`npx shadcn-ui@latest add button `

And, to use it, i simply import it in the file:

`import { Button } from "@/components/ui/button" `

Now it is like any other component.

#### Icon Libraries - Lucide.dev

Like the components, whe can also use a Icon/Image library. We will use mostly [Lucide.dev](https://lucide.dev/icons/), though we can use others as well (avoid not using, to keep a visual).

Just like the Shadcn, when configured, we can simply import the icons and use it directly in the code as it were a component.

### TypeScript Coding Standards and Type Definitions

#### Language and Commenting

- **Language**: All code and comments should be written in English to maintain consistency and clarity across the team.
- **Comments**: Use comments judiciously to explain complex logic, describe the purpose of functions or variables, and document TypeScript types and interfaces.

  ```typescript
  // Example comment for a function
  /**
   * Computes the total price based on the quantity and unit price.
   * @param quantity - The number of items.
   * @param unitPrice - The price per item.
   * @returns The computed total price.
   */
  function calculateTotal(quantity: number, unitPrice: number): number {
    return quantity * unitPrice;
  }
  ```

#### Naming Conventions

- **Variables**: Choose descriptive names that reflect their purpose and use camelCase.

  ```typescript
  let isLoggedIn: boolean;
  let userName: string;
  let itemCount: number;
  ```

- **Types and Interfaces**: Employ PascalCase (VariableName) for type names and interfaces to differentiate them from variables and functions.

  ```typescript
  interface User {
    id: number;
    username: string;
    email: string;
  }

  type ProductCategory = "Electronics" | "Clothing" | "Books";
  ```

- **Functions**: Name functions in camelCase (variableName), focusing on actions or operations.

  ```typescript
  function getUserById(id: number): User {
    // Function implementation
  }

  function calculateDiscountedPrice(
    originalPrice: number,
    discountPercentage: number
  ): number {
    // Function implementation
  }
  ```

#### Type Definitions

- **Basic Types**: Define primitive types such as string, number, and boolean directly where they are used.

  ```typescript
  let userName: string;
  let itemCount: number;
  let isLoggedIn: boolean;
  ```

- **Custom Types and Interfaces**: Use TypeScript's type system to create clear, precise types for complex data structures and entities.

  ```typescript
  interface Product {
    id: number;
    name: string;
    price: number;
  }

  type ShoppingCart = {
    items: Product[];
    total: number;
  };
  ```
