## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

# 1. Getting Started

## Creating a new project

To create a Next.js app, open your terminal, [cd](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line#basic_built-in_terminal_commands) into the folder you'd like to keep your project, and run the following command:

```bash
npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"
```

## Exploring the project

Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you. This better reflects real-world development, where you'll likely be working with existing codebases.

Our goal is to help you focus on learning the main features of Next.js, without having to write all the application code.

After installation, open the project in your code editor and navigate to nextjs-dashboard.

```bash
cd nextjs-dashboard
```

Let's spend some time exploring the project.

## Folder structure

> - `/app`: Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
> - `/app/lib`: Contains functions used in your application, such as reusable utility functions and data fetching functions.
> - `/app/ui`: Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.
> - `/public`: Contains all the static assets for your application, such as images.
> - `/scripts`: Contains a seeding script that you'll use to populate your database in a later chapter.
> - `Config Files`: You'll also notice config files such as next.config.js at the root of your application. Most of these files are created and pre-configured when you start a new project using create-next-app. You will not need to modify them in this course.

## Placeholder data

When you're building user interfaces, it helps to have some placeholder data. If a database or API is not yet available, you can:

> - Use placeholder data in JSON format or as JavaScript objects.
> - Use a 3rd party service like [mockAPI](https://mockapi.io/).
>   For this project, we've provided some placeholder data in `app/lib/placeholder-data.js`. Each JavaScript object in the file represents a table in your database. For example, for the invoices table:

`/app/lib/placeholder-data.js`

```TypeScript
const invoices = [
{
customer_id: customers[0].id,
amount: 15795,
status: 'pending',
date: '2022-12-06',
},
{
customer_id: customers[1].id,
amount: 20348,
status: 'pending',
date: '2022-11-14',
},
// ...
];
```

In the chapter on [setting up your database](https://nextjs.org/learn/dashboard-app/setting-up-your-database), you'll use this data to seed your database (populate it with some initial data).

## TypeScript

You may also notice most files have a `.ts` or `.tsx` suffix. This is because the project is written in TypeScript. We wanted to create a course that reflects the modern web landscape.

It's okay if you don't know TypeScript - we'll provide the TypeScript code snippets when required.

For now, take a look at the `/app/lib/definitions.ts` file.

By using TypeScript, you can ensure you don't accidentally pass the wrong data format to your components or database, like passing a `string` instead of a `number` to invoice `amount`.

> ### If you're a TypeScript developer:
>
> We're manually declaring the data types, but for better type-safety, we recommend [Prisma](https://www.prisma.io/), which automatically generates types based on your database schema.
> Next.js detects if your project uses TypeScript and automatically installs the necessary packages and configuration. Next.js also comes with a [TypeScript plugin](https://nextjs.org/docs/app/building-your-application/configuring/typescript#typescript-plugin) for your code editor, to help with auto-completion and type-safety.

## Running the development server

Run npm i to install the project's packages.

```bash
npm i
```

Followed by npm run dev to start the development server.

```bash
npm run dev
```

Let's check to see if it's working. Open http://localhost:3000 on your browser.
![Unstyled page with the title 'Acme', a description, and login link.](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Facme-unstyled.png&w=1920&q=75&dpl=dpl_AGVpExNSxGb3dC5jrZYnL2rzPEsj "Unstyled page with the title 'Acme', a description, and login link.")

# 2. CSS Styling

## Global styles

If you look inside the `/app/ui` folder, you'll see a file called `global.css`. You can use this file to add CSS rules to all the routes in your application - such as CSS reset rules, site-wide styles for HTML elements like links, and more.

You can import global.css in any component in your application, but it's usually good practice to add it to your top-level component. In Next.js, this is the [root layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required).

Add global styles to your application by navigating to `/app/layout.tsx` and importing the global.css

```TypeScript
import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

With the development server still running, save your changes and preview them in the browser. Your home page should now look like this:
![Styled page with the logo 'Acme', a description, and login link.](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fhome-page-with-tailwind.png&w=1080&q=75&dpl=dpl_AGVpExNSxGb3dC5jrZYnL2rzPEsj "Styled page with the logo 'Acme', a description, and login link.")
But wait a second, you didn't add any CSS rules, where did the styles come from?

If you take a look inside `global.css`, you'll notice some @tailwind directives:

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Tailwind

[Tailwind](https://tailwindcss.com/) is a CSS framework that speeds up the development process by allowing you to quickly write [utility classes](https://tailwindcss.com/docs/utility-first) directly in your TSX markup.

In Tailwind, you style elements by adding class names. For example, adding the class `"text-blue-500"` will turn the `<h1>` text blue:

```HTML
<h1 className="text-blue-500">I'm blue!</h1>
```

Although the CSS styles are shared globally, each class is singularly applied to each element. This means if you add or delete an element, you don't have to worry about maintaining separate stylesheets, style collisions, or the size of your CSS bundle growing as your application scales.

When you use `create-next-app` to start a new project, Next.js will ask if you want to use Tailwind. If you select yes, Next.js will automatically install the necessary packages and configure Tailwind in your application.

If you look at `/app/page.tsx`, you'll see that we're using Tailwind classes in the example.

```TypeScript
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
return (
// These are Tailwind classes:

<main className="flex min-h-screen flex-col p-6">
<div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
// ...
)
}
```

Don't worry if this is your first time using Tailwind. To save time, we've already styled all the components you'll be using.

Let's play with Tailwind! Copy the code below and paste it above the `<p>` element in `/app/page.tsx`:

```TypeScript
<div
  className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"
/>
```

> ### It’s time to take a quiz!
>
> What shape do you see when using the code snippet above?
> `A black triangle`

## CSS Modules

[CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support) allow you to scope CSS to a component by automatically creating unique class names, so you don't have to worry about style collisions as well.

We'll continue using Tailwind in this course, but let's take a moment to see how you can achieve the same results from the quiz above using CSS modules.

Inside `/app/ui`, create a new file called `home.module.css` and add the following CSS rules:

`/app/ui/home.module.css`

```CSS
.shape {
height: 0;
width: 0;
border-bottom: 30px solid black;
border-left: 20px solid transparent;
border-right: 20px solid transparent;
}
```

Then, inside your `/app/page.tsx` file import the styles and replace the tailwind class names from the `<div>` you've added with [styles.shape]:

`/app/page.tsx`

```TypeScript
import styles from '@/app/ui/home.module.css';

//...

<div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
    <div className={styles.shape}></div>;
// ...
```

Save your changes and preview them in the browser. You should see the same shape as before.

Tailwind and CSS modules are the two most common ways of styling Next.js applications. Whether you use one or the other is a matter of preference - you can even use both in the same application!

> ### It’s time to take a quiz!
>
> What is one benefit of using CSS modules?
> `Provide a way to make CSS classes locally scoped to components by default, reducing the risk of styling conflicts.`

## Using the clsx library to toggle class names

There may be cases where you may need to conditionally style an element based on state or some other condition.

[clsx](https://www.npmjs.com/package/clsx) is a library that lets you toggle class names easily. We recommend taking a look at [documentation](https://github.com/lukeed/clsx) for more details, but here's the basic usage:

- Suppose that you want to create an `InvoiceStatus` component which accepts `status`. The status can be `'pending'` or ['paid'].
- If it's `'paid'`, you want the color to be `green`. If it's `'pending'`, you want the color to be `gray`.
  You can use `clsx` to conditionally apply the classes, like this:

`/app/ui/invoices/status.tsx`

```TypeScript
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
return (
<span
className={clsx(
'inline-flex items-center rounded-full px-2 py-1 text-sm',
{
'bg-gray-100 text-gray-500': status === 'pending',
'bg-green-500 text-white': status === 'paid',
},
)} >
// ...
)}
```

`Quiz`
Search for "clsx" in your code editor, what components use it to conditionally apply class names?
`status.tsx` and `pagination.tsx`

## Other styling solutions

In addition to the approaches we've discussed, you can also style your Next.js application with:

- `Sass` which allows you to import `.css` and `.scss` files.
- `CSS-in-JS` libraries such as [styled-jsx](https://github.com/vercel/styled-jsx), [styled-components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components), and [emotion](https://github.com/vercel/next.js/tree/canary/examples/with-emotion).
  Take a look at the [CSS documentation](https://nextjs.org/docs/app/building-your-application/styling) for more information.

##
