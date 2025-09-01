import { useEffect, useRef } from 'react';

interface MediaLibraryWidgetProps {
  cloudName: string;
  apiKey: string;
}

declare global {
  interface Window {
    cloudinary: {
      createMediaLibrary: (
        config: any,
        handlers: any
      ) => any;
    };
  }
}

export const MediaLibraryWidget: React.FC<MediaLibraryWidgetProps> = ({
  cloudName,
  apiKey,
}) => {
  const mediaLibraryRef = useRef<any>(null);

  useEffect(() => {
    const initWidget = () => {
      console.log('Checking Cloudinary availability...');
      console.log('window.cloudinary:', window.cloudinary);
      console.log('window.cloudinary.createMediaLibrary:', window.cloudinary?.createMediaLibrary);
      
      if (window.cloudinary) {
        console.log('Initializing Cloudinary Media Library Widget...');
        
        try {
          mediaLibraryRef.current = window.cloudinary.createMediaLibrary(
            {
              cloud_name: cloudName,
              api_key: apiKey,
              remove_header: false,
              max_files: '1',
              insert_caption: 'Insert',
              default_transformations: [[]],
              button_class: 'myBtn',
              button_caption: 'Access the Media Library',
            },
            {
              insertHandler: function (data: any) {
                data.assets.forEach((asset: any) => {
                  console.log('Inserted asset:', JSON.stringify(asset, null, 2));
                });
              },
            }
          );
          console.log('Widget initialized successfully:', mediaLibraryRef.current);
          console.log('Widget methods:', Object.getOwnPropertyNames(mediaLibraryRef.current));
        } catch (error) {
          console.error('Error initializing widget:', error);
        }
      } else {
        console.log('Cloudinary not ready');
        console.log('window.cloudinary:', window.cloudinary);
      }
    };

    // Wait for Cloudinary to be available
    if (window.cloudinary) {
      initWidget();
    } else {
      console.log('Cloudinary not available, starting polling...');
      // Poll for Cloudinary to be available
      const interval = setInterval(() => {
        if (window.cloudinary) {
          console.log('Cloudinary became available!');
          clearInterval(interval);
          initWidget();
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [cloudName, apiKey]);

  const openMediaLibrary = () => {
    console.log('Button clicked, mediaLibraryRef:', mediaLibraryRef.current);
    if (mediaLibraryRef.current) {
      console.log('Calling show() method...');
      
      try {
        console.log('About to call show()...');
        const result = mediaLibraryRef.current.show();
        console.log('show() result:', result);
        
        // Check if widget appeared
        setTimeout(() => {
          const widgetElements = document.querySelectorAll('#widget_container > div');
          console.log('Widget elements found:', widgetElements.length);
          widgetElements.forEach((el, index) => {
            console.log(`Widget element ${index}:`, el);
          });
        }, 1000);
        
      } catch (error) {
        console.error('Error showing widget:', error);
      }
    } else {
      console.log('Widget not initialized yet');
    }
  };

  return (
    <div className="media-library-widget">
      <h1>Implementing the Media Library Widget in React</h1>
      <p>
        Please provide your <i>cloud_name</i> and <i>api_key</i> in the Media
        Library Widget component.
      </p>
      <button onClick={openMediaLibrary} className="open-btn">
        Access the Media Library
      </button>
      <hr />
    </div>
  );
};
