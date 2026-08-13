import type { Metadata } from 'next';
import './globals.css';
import ScrollTriggerRefresh from '@/components/animations/ScrollTriggerRefresh';

export const metadata: Metadata = {
  title: 'Vergel Villaranda — Full Stack Developer',
  description:
    'Portfolio of Vergel Villaranda, a Full Stack Developer building modern web applications and digital experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollTriggerRefresh />
        {children}
      </body>
    </html>
  );
}