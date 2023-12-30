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

> ### It’s time to take a quiz!
>
> Search for "clsx" in your code editor, what components use it to conditionally apply class names?
> `status.tsx` and `pagination.tsx`

## Other styling solutions

In addition to the approaches we've discussed, you can also style your Next.js application with:

- `Sass` which allows you to import `.css` and `.scss` files.
- `CSS-in-JS` libraries such as [styled-jsx](https://github.com/vercel/styled-jsx), [styled-components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components), and [emotion](https://github.com/vercel/next.js/tree/canary/examples/with-emotion).
  Take a look at the [CSS documentation](https://nextjs.org/docs/app/building-your-application/styling) for more information.

# 3. Optimizing Fonts and Images

## Why optimize fonts?

Fonts play a significant role in the design of a website, but using custom fonts in your project can affect performance if the font files need to be fetched and loaded.

[Cumulative Layout Shift](https://web.dev/cls/) is a metric used by Google to evaluate the performance and user experience of a website. With fonts, layout shift happens when the browser initially renders text in a fallback or system font and then swaps it out for a custom font once it has loaded. This swap can cause the text size, spacing, or layout to change, shifting elements around it.
![Mock UI showing initial load of a page, followed by a layout shift as the custom font loads.](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffont-layout-shift.png&w=1920&q=75&dpl=dpl_AGVpExNSxGb3dC5jrZYnL2rzPEsj 'Mock UI showing initial load of a page, followed by a layout shift as the custom font loads.')

> ### It’s time to take a quiz!
>
> How does Next.js optimize fonts?
> `It hosts font files with other static assets so that there are no additional network requests.`

## Adding a primary font

Let's add a custom Google font to your application to see how this works!

In your `/app/ui` folder, create a new file called `fonts.ts`. You'll use this file to keep the fonts that will be used throughout your application.

Import the `Inter` font from the `next/font/google` module - this will be your primary font. Then, specify what [subset](https://fonts.google.com/knowledge/glossary/subsetting) you'd like to load. In this case, `'latin'`:

`/app/ui/fonts.ts`

```Typescript
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
```

Finally, add the font to the `<body>` element in `/app/layout.tsx`:

`/app/layout.tsx`

```Typescript
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
children,
}: {
    children: React.ReactNode;
}) {
return (

<html lang="en">
    <body className={`${inter.className} antialiased`}>{children}</body>
</html>
);
}
```

By adding `Inter` to the `<body>` element, the font will be applied throughout your application. Here, you're also adding the Tailwind [antialiased](https://tailwindcss.com/docs/font-smoothing) class which smooths out the font. It's not necessary to use this class, but it adds a nice touch.

Navigate to your browser, open dev tools and select the body element. You should see `Inter` and `Inter_Fallback` are now applied under styles.

## Practice: Adding a secondary font

You can also add fonts to specific elements of your application.

Now it's your turn! In your `fonts.ts` file, import a secondary font called `Lusitana` and pass it to the `<p>` element in your `/app/page.tsx` file. In addition to specifying a subset like you did before, you'll also need to specify the font **weight**.

Once you're ready, expand the code snippet below to see the solution.

> ### Hints:
>
> If you're unsure what weight options to pass to a font, check the TypeScript errors in your code editor.
> Visit the [Google Fonts](https://fonts.google.com/) website and search for `Lusitana` to see what options are available.
> See the documentation for [adding multiple fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#using-multiple-fonts) and the [full list of options](https://nextjs.org/docs/app/api-reference/components/font#font-function-arguments).

Finally, the `<AcmeLogo />` component also uses `Lusitana`. It was commented out to prevent errors, you can now uncomment it:

`/app/page.tsx`

```Typescript
// ...

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                <AcmeLogo />
                {/* ... */}
            </div>
        </main>
    );
}
```

Great, you've added two custom fonts to your application! Next, let's add a hero image to the home page.

## Why optimize images?

Next.js can serve **static assets**, like images, under the top-level [/public](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets) folder. Files inside `/public` can be referenced in your application.

With regular HTML, you would add an image as follows:

```HTML
<img
  src="/hero.png"
  alt="Screenshots of the dashboard project showing desktop version"
/>
```

However, this means you have to manually:

- Ensure your image is responsive on different screen sizes.
- Specify image sizes for different devices.
- Prevent layout shift as the images load.
- Lazy load images that are outside the user's viewport.
- Image Optimization is a large topic in web development that could be considered a specialization in itself. Instead of manually implementing these optimizations, you can use the `next/image` component to automatically optimize your images.

## The <Image> component

The `<Image>` Component is an extension of the HTML `<img>` tag, and comes with automatic image optimization, such as:

Preventing layout shift automatically when images are loading.
Resizing images to avoid shipping large images to devices with a smaller viewport.
Lazy loading images by default (images load as they enter the viewport).
Serving images in modern formats, like [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp) and [AVIF](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif_image), when the browser supports it.

## Adding the desktop hero image

Let's use the `<Image>` component. If you look inside the `/public` folder, you'll see there are two images: `hero-desktop.png` and `hero-mobile.png`. These two images are completely different, and they'll be shown depending if the user's `device` is a `desktop` or `mobile`.

In your `/app/page.tsx` file, import the component from `next/image`. Then, add the image under the comment:

`/app/page.tsx`

```TS
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
return (
// ...

<div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
{/* Add Hero Images Here */}
<Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
</div>
//...
);
}
```

Here, you're setting the width to 1000 and height to 760 pixels. It's good practice to set the width and height of your images to avoid layout shift, these should be an aspect ratio identical to the source image.

You'll also notice the class hidden to remove the image from the DOM on mobile screens, and md:block to show the image on desktop screens.

This is what your home page should look like now:
![Styled home page with a custom font and hero image](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fhome-page-with-hero.png&w=1080&q=75&dpl=dpl_AGVpExNSxGb3dC5jrZYnL2rzPEsj 'Styled home page with a custom font and hero image')

## Practice: Adding the mobile hero image

Now it's your turn! Under the image you've just added, add another `<Image>` component for `hero-mobile.png`.

- The image should have a `width` of `560` and `height` of `620` pixels.
- It should be shown on `mobile screens`, and `hidden on desktop` - you can use dev tools to check if the desktop and mobile images are swapped correctly.
  Once you're ready, expand the code snippet below to see the solution.

`/app/page.tsx`

```TS
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    // ...
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
    </div>
    //...
  );
}
```

Great! Your home page now has a custom font and hero images.

> ### It’s time to take a quiz!
>
> True or False: Images without dimensions and web fonts are common causes of layout shift.
> `True`

## Recommended reading

There's a lot more to learn about these topics, including optimizing remote images and using local font files. If you'd like to dive deeper into fonts and images, see:

- [Image Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Font Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Improving Web Performance with Images (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia)
- [Web Fonts (MDN)](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)

# 4. Creating Layouts and Pages

## Nested routing

Next.js uses file-system routing where **folders** are used to create nested routes. Each folder represents a **route segment** that maps to a **URL segment**.
![Diagram showing how folders map to URL segments](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffolders-to-url-segments.png&w=1920&q=75&dpl=dpl_AGVpExNSxGb3dC5jrZYnL2rzPEsj 'Diagram showing how folders map to URL segments')

Diagram showing how folders map to URL segments
You can `create` separate UIs for each route using `layout.tsx` and `page.tsx` files.

`page.tsx` is a special Next.js file that exports a React component, and it's required for the route to be accessible. In your application, you already have a page file: `/app/page.tsx` - this is the home page associated with the route `/`.

To create a nested route, you can nest folders inside each other and add `page.tsx` files inside them. For example:
![Diagram showing how adding a folder called dashboard creates a new route '/dashboard'](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fdashboard-route.png&w=1920&q=75&dpl=dpl_AGVpExNSxGb3dC5jrZYnL2rzPEsj "Diagram showing how adding a folder called dashboard creates a new route '/dashboard'")

`/app/dashboard/page.tsx` is associated with the `/dashboard` path. Let's create the page to see how it works!

## Creating the dashboard page

Create a new folder called dashboard inside `/app`. Then, create a new `page.tsx` file inside the dashboard folder with the following content:

`/app/dashboard/page.tsx`

```TS
export default function Page() {
  return <p>Dashboard Page</p>;
}
```

Now, make sure that the development server is running and visit http://localhost:3000/dashboard. You should see the "Dashboard Page" text.

This is how you can create different `pages` in Next.js: create a new route segment using a folder, and add a `page` file inside it.

By having a special name for page files, Next.js allows you to [colocate](https://nextjs.org/docs/app/building-your-application/routing#colocation) UI components, test files, and other related code with your routes. Only the content inside the page file will be publicly accessible. For example, the `/ui` and `/lib` folders are colocated inside the `/app` folder along with your routes.

## Practice: Creating the dashboard pages

Let's practice creating more routes. In your dashboard, create two more pages:

1. **Customers Page:** The page should be accessible on http://localhost:3000/dashboard/customers. For now, it should return a `<p>Customers Page</p>` element.
2. **Invoices Page:** The invoices page should be accessible on http://localhost:3000/dashboard/invoices. For now, also return a `<p>Invoices Page</p>` element.

Spend some time tackling this exercise, and when you're ready, expand the toggle below for the solution:

You should have the following folder structure:
![Diagram showing how adding a folder called login creates a new route '/login'](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Frouting-solution.png&w=1920&q=75&dpl=dpl_AGVpExNSxGb3dC5jrZYnL2rzPEsj "Diagram showing how adding a folder called login creates a new route '/login'")

Diagram showing how adding a folder called login creates a new route `'/login'`
**Customers Page:**
`/app/dashboard/customers/page.tsx`

```TS
export default function Page() {
return <p>Customers Page</p>;
}
```

**Invoices Page:**
`/app/dashboard/invoices/page.tsx`

```TS
export default function Page() {
return <p>Invoices Page</p>;
}
```

## Creating the dashboard layout

Dashboards have some sort of navigation that is shared across multiple pages. In Next.js, you can use a special layout.tsx file to create UI that is shared between multiple pages. Let's create a layout for the dashboard pages!

Inside the `/dashboard` folder, add a new file called `layout.tsx` and paste the following code:

`/app/dashboard/layout.tsx`

```TS
import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
```

A few things are going on in this code, so let's break it down:

First, you're importing the `<SideNav />` component into your layout. Any components you import into this file will be part of the layout.

The `<Layout />` component receives a `children` prop. This child can either be a page or another layout. In your case, the pages inside `/dashboard` will automatically be nested inside a `<Layout />` like so:
![Folder structure with dashboard layout nesting the dashboard pages as children](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fshared-layout.png&w=1920&q=75&dpl=dpl_AGVpExNSxGb3dC5jrZYnL2rzPEsj 'Folder structure with dashboard layout nesting the dashboard pages as children')

Folder structure with dashboard layout nesting the dashboard pages as children
Check that everything is working correctly by saving your changes and checking your localhost. You should see the following:
![Dashboard page with a sidenav and a main content area](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fshared-layout-page.png&w=1080&q=75&dpl=dpl_AGVpExNSxGb3dC5jrZYnL2rzPEsj 'Dashboard page with a sidenav and a main content area')

Dashboard page with a sidenav and a main content area
One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called [partial rendering](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#3-partial-rendering):
![Folder structure showing the dashboard layout nesting the dashboard pages, but only the pages UI swap on navigation](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fpartial-rendering-dashboard.png&w=1920&q=75&dpl=dpl_AGVpExNSxGb3dC5jrZYnL2rzPEsj 'Folder structure showing the dashboard layout nesting the dashboard pages, but only the pages UI swap on navigation')

## Root layout

In Chapter 3, you imported the Inter font into another layout: `/app/layout.tsx`. As a reminder:

`/app/layout.tsx`

```TS
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="en">
<body className={`${inter.className} antialiased`}>{children}</body>
</html>
);
}
```

This is called a [root layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required) and is required. Any UI you add to the root layout will be shared across **all** pages in your application. You can use the root layout to modify your `<html>` and `<body>` tags, and add metadata (you'll learn more about metadata in [a later chapter](https://nextjs.org/learn/dashboard-app/adding-metadata)).

Since the new layout you've just created (`/app/dashboard/layout.tsx`) is unique to the dashboard pages, you don't need to add any UI to the root layout above.

> ### It’s time to take a quiz!
>
> What is the purpose of the layout file in Next.js?
> `To share UI across multiple pages`

# 5. Navigating Between Pages

## Why optimize navigation?

To link between pages, you'd traditionally use the `<a>` HTML element. At the moment, the sidebar links use `<a>` elements, but notice what happens when you navigate between the home, invoices, and customers pages on your browser.

Did you see it?

There's a full page refresh on each page navigation!

## The <Link> component

In Next.js, you can use the `<Link />` Component to link between pages in your application. `<Link>` allows you to do [client-side navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works) with JavaScript.

To use the `<Link />` component, open `/app/ui/dashboard/nav-links.tsx`, and import the Link component from [next/link](https://nextjs.org/docs/app/api-reference/components/link). Then, replace the `<a>` tag with `<Link>`:

`/app/ui/dashboard/nav-links.tsx`

```TS
import {
 UserGroupIcon,
 HomeIcon,
 DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// ...
export default function NavLinks() {
 return (
   <>
     {links.map((link) => {
       const LinkIcon = link.icon;
       return (
         <Link
           key={link.name}
           href={link.href}
           className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
         >
           <LinkIcon className="w-6" />
           <p className="hidden md:block">{link.name}</p>
         </Link>
       );
     })}
   </>
 );
}
```

As you can see, the `Link` component is similar to using `<a>` tags, but instead of `<a href="…">`, you use `<Link href="…">`.

Save your changes and check to see if it works in your localhost. You should now be able to navigate between the pages without seeing a full refresh. Although parts of your application are rendered on the server, there's no full page refresh, making it feel like a web app. Why is that?

> ### It’s time to take a quiz!
>
> What does Next.js do when a <Link> component appears in the browser’s viewport in a production environment?
> `Prefetches the code for the linked route`

## Pattern: Showing active links

A common UI pattern is to show an active link to indicate to the user what page they are currently on. To do this, you need to get the user's current path from the URL. Next.js provides a hook called [usePathname()](https://nextjs.org/docs/app/api-reference/functions/use-pathname) that you can use to check the path and implement this pattern.

Since [usePathname()](https://nextjs.org/docs/app/api-reference/functions/use-pathname) is a hook, you'll need to turn `nav-links.tsx` into a Client Component. Add React's `"use client"` directive to the top of the file, then import `usePathname()` from `next/navigation`:

`/app/ui/dashboard/nav-links.tsx`

```TS
'use client';

import {
  UserGroupIcon,
  HomeIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ...
```

Next, assign the path to a variable called pathname inside your `<NavLinks />` component:

`/app/ui/dashboard/nav-links.tsx`

```TS
export default function NavLinks() {
  const pathname = usePathname();
  // ...
}
```

You can use the `clsx` library introduced in the chapter on [CSS styling](https://nextjs.org/learn/dashboard-app/css-styling) to conditionally apply class names when the link is active. When `link.href` matches the `pathname`, the link should displayed with blue text and a light blue background.

Here's the final code for `nav-links.tsx`:

`/app/ui/dashboard/nav-links.tsx`

```TS
'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// ...

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
```

Save and check your localhost. You should now see the active link highlighted in blue.

# 6. Setting Up Your Database

##

##

##

##

###

# 7.

##

##

##

##

###

# 8.

##

##

##

##

###
