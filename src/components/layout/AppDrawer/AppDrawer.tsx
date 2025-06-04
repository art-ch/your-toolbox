'use client';

import React from 'react';

import { Overlay } from './components/Overlay/Overlay';
import { Header } from './components/Header/Header';
import { Content } from './components/Content/Content';
import { Container } from './components/Container/Container';
import { Footer } from './components/Footer/Footer';

export const AppDrawer = () => {
  return (
    <div>
      <Overlay />
      <Container>
        <Header />
        <Content />
        <Footer />
      </Container>
    </div>
  );
};
