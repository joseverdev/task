import SideMenu from "../../components/organisms/SideMenu";

import { ReactNode } from 'react';
import { Tasks } from "../../context/TaskCtx";
import { UserProvider } from "../../context/UserCtx";

interface HomeProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeProps) {
  return (
    <div>
      <section >
        <div className="flex w-3/4 mx-auto">
          <UserProvider>
            <SideMenu />
          </UserProvider>
          <Tasks>
            {children}
          </Tasks>
        </div>
      </section>
    </div>
  )
}