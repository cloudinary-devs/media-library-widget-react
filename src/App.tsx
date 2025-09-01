import { MediaLibraryWidget } from './components/MediaLibraryWidget';
import './App.css';

function App() {
  return (
    <div className="App">
      <MediaLibraryWidget 
        cloudName="yelenik"
        apiKey="367982113469381"
      />
    </div>
  );
}

export default App;
