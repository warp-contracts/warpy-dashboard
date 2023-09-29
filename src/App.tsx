import { Component, createEffect, createSignal } from 'solid-js';
import Header from './layouts/Header/Header';
import './App.scss';
import Main from './layouts/Main/Main';

const App: Component = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;
