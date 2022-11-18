import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Layout from './layouts';
import Home from './pages/Home';
import TestPage from './pages/TestPage';
import Match from './pages/Match';
import Rule from './pages/Rule';
import useInvite from '@/hooks/useInvite';

function App() {
  useInvite();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/match/:matchId" element={<Match />} />
        <Route path="/rule" element={<Rule />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
