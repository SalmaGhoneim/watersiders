import { GeoDataContextProvider } from './contexts/GeoDataContext';
import Dashboard from './pages/Dashboard';

const App = (): JSX.Element => {
  return (
    <GeoDataContextProvider>
        <Dashboard />
    </GeoDataContextProvider>
  );
}

export default App;
