import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'Akam Chops — Premium Small Chops, Shawarma & Event Catering in Abuja',
  description:
    'The Taste You Deserve. Premium Nigerian small chops, signature Abuja shawarma, peppered grills, Akam Naturals drinks, and bespoke event catering from Jabi, Abuja.',
  icons: {
    icon: '/images/akam-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
