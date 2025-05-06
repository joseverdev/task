import { ReactNode } from 'react';
import './global.css'
import { Nunito } from 'next/font/google';



const nunito = Nunito({
  subsets: ['latin'],
})


export default async function layout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <head>
        <title>Task</title>
      </head>

      <body>
        <main className={`${nunito.className} bg-slate-800 h-screen`}>
            {children}
        </main>
      </body>
    </html>
  );
}