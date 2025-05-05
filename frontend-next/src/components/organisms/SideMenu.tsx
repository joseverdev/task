'use client'
import Link from 'next/link';

import { ButtonLogout } from '../atoms/ButtonLogout/ButtonLogout';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { UserCtx } from '../../context/UserCtx';

export default function SideMenu() {
  const pathname = usePathname();
  const {user} = useContext(UserCtx)


  return (
    <div className=" bg-slate-800">
      <nav className="p-8 w-96  text-white">
        <h1 className="text-3xl">Tasks of {user}</h1>
        <ButtonLogout/>
        <hr className="mt-8 mb-8" />
        <ul className='flex flex-col gap-4'>
          <li>
            <Link href={'/home/all'} className={pathname === '/home/all'?'text-blue-500 font-bold':''}>All tasks</Link>
          </li>
          <li>
            <Link href={'/home/pending'} className={pathname === '/home/pending'?'text-blue-500 font-bold':''}>Pending tasks</Link>
          </li>
          <li>
            <Link href={'/home/completed'} className={pathname === '/home/completed'?'text-blue-500 font-bold':''}>Completed tasks</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}