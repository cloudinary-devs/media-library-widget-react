# Cloudinary Media Library Widget Demo

This is a React demo showcasing the Cloudinary Media Library Widget integration with support for multiple product environments and proper transformation handling.

## Features

- **Media Library Widget**: Browse and select images/videos from Cloudinary
- **Multiple Product Environment Support**: Configure and switch between different product environments
- **Simple Configuration**: Easy-to-edit configuration file for cloud environments
- **Transformation-Aware**: Automatically handles transformed vs original URLs
- **React Integration**: Built with React and TypeScript
- **Modern UI**: Clean, responsive design with environment switching

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/media-library-widget-react.git
   cd media-library-widget-react
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure your Cloudinary environments** (see detailed setup below)

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:5173`

## Detailed Setup

### 1. Get Cloudinary Credentials

- **Sign up**: Create an account at [Cloudinary](https://cloudinary.com/)
- **Get credentials**: Navigate to [API Keys](https://console.cloudinary.com/app/settings/api-keys) in your dashboard
- **Note down**: Your `cloud_name` and `api_key` (you don't need the API secret for this widget)

### 2. Configure Product Environments

Edit `src/config/clouds.ts` and replace the placeholder values with your actual Cloudinary credentials:

```typescript
export const cloudConfigs: CloudConfig[] = [
  {
    name: "Production",
    cloudName: "mycompany123",
    apiKey: "123456789012345"
  },
  {
    name: "Staging",
    cloudName: "mycompany456", 
    apiKey: "987654321098765"
  },
  {
    name: "Development",
    cloudName: "mycompany789",
    apiKey: "111222333444555"
  }
  // Add more environments as needed...
];
```

**Important**: 
- Only product environments with real credentials (no placeholders) will appear in the dropdown
- You can add as many product environments as you need
- Each product environment can have a different name, cloud name, and API key

### 3. Test the Configuration

1. **Start the app**: `npm run dev`
2. **Check the dropdown**: You should see your configured environments
3. **Select a product environment**: The Media Library Widget should initialize
4. **Test the widget**: Click "Open Media Library" to verify it works

## How It Works

1. **Configuration Check**: The app loads cloud configurations from `src/config/clouds.ts`
2. **Environment Filtering**: Only product environments with real credentials are displayed
3. **Widget Initialization**: Media Library Widget initializes with the selected environment
4. **Environment Switching**: Users can switch between different product environments via dropdown
5. **Asset Handling**: Automatically uses transformed URLs (`asset.derived`) when available

## Key Implementation Details

### Multiple Product Environment Support
- **Unlimited environments**: Add as many as you need in the config file
- **Easy switching**: Dropdown allows users to switch between environments
- **Automatic filtering**: Placeholder configurations are automatically hidden
- **Real-time updates**: Widget reinitializes when switching environments

### Transformation Handling
The widget automatically detects and uses the correct URLs:
- **With transformations**: Uses `asset.derived` (transformed URL)
- **Without transformations**: Falls back to `asset.secure_url` (original URL)

This prevents the common integration issue of storing wrong URLs when transformations are applied.

### Configuration Structure
```typescript
interface CloudConfig {
  name: string;        // Display name (e.g., "Production", "Staging")
  cloudName: string;   // Cloudinary cloud name
  apiKey: string;      // Cloudinary API key
}
```

## Customization

### Widget Configuration
Modify the widget settings in `src/components/MediaLibraryWidget.tsx`:
- `max_files`: Number of files that can be selected
- `default_transformations`: Default image transformations applied
- `integration`: Custom integration details for analytics

### Styling
- **CSS**: Edit `src/App.css` for custom styling
- **Layout**: Modify `src/components/MediaLibraryWidget.tsx` for UI changes
- **Themes**: Add CSS variables for easy theming

## Troubleshooting

### Common Issues

**"No environments configured" message**:
- Check that `src/config/clouds.ts` has real credentials (no placeholders)
- Ensure all three fields (name, cloudName, apiKey) are filled in
- Restart the development server after making changes

**Widget not initializing**:
- Verify your Cloudinary credentials are correct
- Check browser console for error messages
- Ensure your cloud name and API key match exactly

**Environment not appearing in dropdown**:
- Make sure the configuration doesn't contain placeholder text like "your_cloud_name_1"
- Check that all required fields are populated
- Restart the server after configuration changes

### Development Tips

- **Hot reload**: Most changes will automatically reload in the browser
- **Console logging**: Check browser console for detailed widget initialization logs
- **Environment switching**: Test switching between different environments to ensure all work

## Technologies Used

- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development experience
- **Vite** - Fast build tool and development server
- **Cloudinary Media Library Widget** - Official Cloudinary widget for media selection

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
