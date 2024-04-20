import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  weight:'700',
  subsets:['latin','greek',],
  display: "swap"
})

export const metadata = {
  title: "Learn Next 14",
  description: "I learn next 14 here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={roboto.className}>
        {/* <NavBar></NavBar> */}
          {children}
      </body>
    </html>
  );
}
