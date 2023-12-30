import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: '',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
