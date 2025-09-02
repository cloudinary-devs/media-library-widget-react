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
      if (window.cloudinary) {
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
                  // Asset inserted successfully
                });
              },
            }
          );
        } catch (error) {
          // Handle initialization error silently
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
  }, [cloudName, apiKey]);

  const openMediaLibrary = () => {
    if (mediaLibraryRef.current) {
      try {
        mediaLibraryRef.current.show();
      } catch (error) {
        // Handle error silently
      }
    }
  };

  return (
    <div className="media-library-widget">
      <h1>Implementing the Media Library Widget in React</h1>
      <p>
        Please provide your <i>cloud_name</i> and <i>api_key</i> in the <code>src/App.tsx</code> file.
      </p>
      <button onClick={openMediaLibrary} className="open-btn">
        Access the Media Library
      </button>
      <hr />
    </div>
  );
};
