import './App.css';
import { GeoDataContextProvider } from './contexts/GeoDataContext';
import Dashboard from './pages/Dashboard';

const App = (): JSX.Element => {
  return (
    <div className="app">
        <GeoDataContextProvider>
            <Dashboard />
        </GeoDataContextProvider>
    </div>
  );
}

export default App;
