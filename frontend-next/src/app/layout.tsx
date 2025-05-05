import { ReactNode } from 'react';
import './global.css'
import { Nunito } from 'next/font/google';



const nunito = Nunito({
  subsets: ['latin'],
})


export default async function layout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body>
        <main className={`${nunito.className} bg-slate-800 h-screen`}>
          {/* <Tasks> */}
            {children}
          {/* </Tasks> */}
        </main>
      </body>
    </html>
  );
}