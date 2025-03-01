import { DirectionProvider } from '@radix-ui/react-direction';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Buy from './Buy';
import List from './List';

const App = () => {
  return (
    <DirectionProvider dir="rtl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/buy" element={<Buy />} />
        </Routes>
      </BrowserRouter>
    </DirectionProvider>
  );
};

export default App;
