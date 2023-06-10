import React from 'react';
import Header from './Header';

type Props = {
  children: React.ReactNode;
  cls?: string;
};

const Layout = ({ children, cls }: Props) => {
  return (
    <div className={`px-12 py-6 ${cls ? cls : ''}`}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
