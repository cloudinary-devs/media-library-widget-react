import { MediaLibraryWidget } from './components/MediaLibraryWidget';
import './App.css';

function App() {
  return (
    <div className="App">
      <MediaLibraryWidget 
        cloudName="<your_cloud_name>"
        apiKey="<your_api_key>"
      />
    </div>
  );
}

export default App;
