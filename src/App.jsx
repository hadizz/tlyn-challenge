import { DirectionProvider } from '@radix-ui/react-direction';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './List';

const App = () => {
  return (
    <DirectionProvider dir="rtl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
        </Routes>
      </BrowserRouter>
    </DirectionProvider>
  );
};

export default App;
