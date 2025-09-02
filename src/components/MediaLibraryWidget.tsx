import { useEffect, useRef, useState } from 'react';
import type { CloudConfig } from '../config/clouds';
import { cloudConfigs, hasCloudConfigs } from '../config/clouds';

declare global {
  interface Window {
    cloudinary: {
      createMediaLibrary: (
        config: any,
        handlers: any,
        target?: HTMLElement
      ) => any;
    };
  }
}

export const MediaLibraryWidget: React.FC = () => {
  const mediaLibraryRef = useRef<any>(null);
  const [availableClouds, setAvailableClouds] = useState<CloudConfig[]>([]);
  const [selectedCloud, setSelectedCloud] = useState<CloudConfig | null>(null);
  const [isCloudReady, setIsCloudReady] = useState(false);

  // Load cloud configurations from config file
  useEffect(() => {
    // Filter out placeholder configurations
    const validClouds = cloudConfigs.filter(config => 
      config.name && 
      config.cloudName && 
      config.apiKey &&
      !config.name.includes('your_') &&
      !config.cloudName.includes('your_') &&
      !config.apiKey.includes('your_')
    );
    
    setAvailableClouds(validClouds);
    
    if (validClouds.length > 0) {
      setSelectedCloud(validClouds[0]);
    }
  }, []);

  useEffect(() => {
    const initWidget = async () => {
      if (window.cloudinary && selectedCloud) {
        try {
          console.log('Initializing widget for cloud:', selectedCloud.name);
          
          console.log('Creating Media Library Widget...');
          mediaLibraryRef.current = window.cloudinary.createMediaLibrary(
            {
              cloud_name: selectedCloud.cloudName,
              api_key: selectedCloud.apiKey,
              remove_header: false,
              max_files: '3',
              insert_caption: 'Insert',
              default_transformations: [
                [{"quality": "auto"}, {"fetch_format": "auto"}]
              ],
              button_caption: 'Select Image or Video',
              integration: {
                type: "react_widget",
                platform: "react",
                version: "1.0",
                environment: "prod",
              }
            },
            {
              insertHandler: function (data: any) {
                data.assets.forEach((asset: any) => {
                  // IMPORTANT: Check for transformations and use derived URLs
                  // This addresses the most common integration issue
                  const urlToUse = asset.derived || asset.secure_url || asset.url;
                  
                  // Log the asset details for debugging
                  console.log('Asset inserted:', {
                    originalUrl: asset.secure_url,
                    derivedUrl: asset.derived,
                    finalUrl: urlToUse,
                    transformations: asset.derived ? 'Applied' : 'None',
                    assetType: asset.resource_type,
                    format: asset.format
                  });
                });
              },
            }
          );
          console.log('Widget created successfully');
          setIsCloudReady(true);
        } catch (error) {
          console.error('Error initializing widget:', error);
          setIsCloudReady(false);
        }
      }
    };

    // Wait for Cloudinary to be available
    if (window.cloudinary) {
      initWidget();
    } else {
      // Poll for Cloudinary to be available
      const interval = setInterval(() => {
        if (window.cloudinary) {
          clearInterval(interval);
          initWidget();
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [selectedCloud]);

  const openMediaLibrary = () => {
    if (mediaLibraryRef.current && isCloudReady) {
      try {
        mediaLibraryRef.current.show();
      } catch (error) {
        // Handle error silently
      }
    }
  };

  const handleCloudChange = (cloudIndex: number) => {
    if (cloudIndex >= 0 && cloudIndex < availableClouds.length) {
      setSelectedCloud(availableClouds[cloudIndex]);
      setIsCloudReady(false);
      // Widget will be reinitialized in useEffect
    }
  };

  // Empty state when no product environments are configured
  if (!hasCloudConfigs()) {
    return (
      <div className="media-library-widget">
        <h1>Implementing the Media Library Widget in React</h1>
        
        <div className="empty-state">
          <h2>No Product Environment Credentials Found</h2>
          <p>
            To get started, you need to configure your Cloudinary environments in the configuration file.
          </p>
          
          <div className="setup-instructions">
            <h3>Setup Instructions:</h3>
            <ol>
              <li>Edit <code>src/config/clouds.ts</code></li>
              <li>Replace the placeholder values with your actual Cloudinary credentials:</li>
              <ul>
                <li><strong>Product Environment Name</strong> - Give each environment a descriptive name (e.g., "Production", "Staging")</li>
                <li><strong>Cloud Name</strong> - Your Cloudinary cloud name</li>
                <li><strong>API Key</strong> - Your Cloudinary API key</li>
              </ul>
              <li>Remove or comment out any environments you don't want to use</li>
              <li>Save the file and refresh your browser</li>
            </ol>
            
            <div className="config-example">
              <h4>Example configuration in <code>src/config/clouds.ts</code>:</h4>
              <pre>
{`export const cloudConfigs: CloudConfig[] = [
  {
    name: "Production",
    cloudName: "mycompany123",
    apiKey: "123456789012345"
  },
  {
    name: "Staging",
    cloudName: "mycompany456", 
    apiKey: "987654321098765"
  }
  // Add more environments as needed...
];`}
              </pre>
            </div>
            
            <div className="important-note">
              <h4>Important Notes:</h4>
              <ul>
                <li>Only product environments with real credentials (no placeholders) will appear in the dropdown</li>
                <li>Changes to the config file will take effect after refreshing the browser</li>
                <li>You can add as many environments as you need</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product environment selection and widget interface
  return (
    <div className="media-library-widget">
      <h1>Implementing the Media Library Widget in React</h1>
      
      {/* Product Environment Selector */}
      <div className="cloud-selector">
        <label htmlFor="cloud-select">Select Product Environment:</label>
        <select
          id="cloud-select"
          value={availableClouds.findIndex(cloud => cloud.cloudName === selectedCloud?.cloudName)}
          onChange={(e) => handleCloudChange(parseInt(e.target.value))}
        >
          {availableClouds.map((cloud, index) => (
            <option key={index} value={index}>
              {cloud.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Environment Status */}
      {selectedCloud && (
        <div className="cloud-status">
          <p>Current Environment: <strong>{selectedCloud.name}</strong></p>
          <p>Cloud Name: <strong>{selectedCloud.cloudName}</strong></p>
          <p>Status: <strong>{isCloudReady ? 'Ready' : 'Initializing...'}</strong></p>
        </div>
      )}

      <p>
        Your product environments are configured! Select a product environment above and click the button below to open the Media Library Widget.
      </p>
      
      <button 
        onClick={openMediaLibrary} 
        className="open-btn"
        disabled={!isCloudReady}
      >
        {isCloudReady ? 'Open Media Library Widget' : 'Initializing...'}
      </button>
      
      <hr />
    </div>
  );
};
