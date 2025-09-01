# Cloudinary Media Library Widget Demo

This is a React demo showcasing the Cloudinary Media Library Widget integration. The widget allows users to browse and select media files from their Cloudinary account.

## Features

- **Media Library Widget**: Browse and select images/videos from Cloudinary
- **React Integration**: Built with React and TypeScript
- **Modern UI**: Clean, responsive design with custom styling
- **No iframe**: Direct integration without iframe limitations

## Setup

1. **Get Cloudinary Credentials**:
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Get your `cloud_name` and `api_key` from the [API Keys](https://console.cloudinary.com/app/settings/api-keys) page of the Console Settings

2. **Configure the Widget**:
   - Open `src/App.tsx`
   - Replace `<your_cloud_name>` with your actual Cloudinary cloud name
   - Replace `<your_api_key>` with your actual Cloudinary API key

   ```tsx
   <MediaLibraryWidget 
     cloudName="your_actual_cloud_name"
     apiKey="your_actual_api_key"
   />
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Demo**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   - Navigate to `http://localhost:5173`
   - Click "Select Image or Video" to open the Media Library Widget

## How It Works

The Media Library Widget is initialized when the component mounts and provides:
- A button to open the media library
- A container where the widget displays
- Event handlers for media selection
- Console logging of selected assets

## Customization

You can customize the widget by modifying the configuration in `src/components/MediaLibraryWidget.tsx`:

- `max_files`: Limit the number of files that can be selected
- `insert_caption`: Customize the insert button text
- `button_class`: Apply custom CSS classes to widget buttons
- `default_transformations`: Set default image transformations

## Technologies Used

- React 19
- TypeScript
- Vite
- Cloudinary Media Library Widget

## License

This project is for demonstration purposes.
