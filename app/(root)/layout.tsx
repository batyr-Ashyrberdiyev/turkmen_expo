import { PropsWithChildren } from 'react';

import { Header } from '@/components/colontitle/Header';
import { Footer } from '@/components/colontitle/Footer';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col h-full wrapper w-full overflow-x-hidden relative">
      <Header />
      <main className="flex-auto bg-blueBg">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
