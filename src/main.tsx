// import { createContext, StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';

// interface State {
//   store: Store;
// }
// import Store from './store/store.ts';
// const store = new Store();

// // создаем contextapi
// export const Context = createContext<State>({
//   store,
// });

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Context.Provider value={{store}}>
//       <App />
//     </Context.Provider>
//   </StrictMode>
// );

// main.tsx
import { createRoot } from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
