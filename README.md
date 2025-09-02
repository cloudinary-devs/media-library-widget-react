# Cloudinary Media Library Widget Demo

This is a React demo showcasing the Cloudinary Media Library Widget integration with support for multiple product environments and proper transformation handling.

## Features

- **Media Library Widget**: Browse and select images/videos from Cloudinary
- **Multiple Product Environment Support**: Configure and switch between different product environments
- **Simple Configuration**: Easy-to-edit configuration file for cloud environments
- **Transformation-Aware**: Automatically handles transformed vs original URLs
- **React Integration**: Built with React and TypeScript
- **Modern UI**: Clean, responsive design with environment switching

## Setup

1. **Get Cloudinary Credentials**:
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Get your `cloud_name` and `api_key` from the [API Keys](https://console.cloudinary.com/app/settings/api-keys) page

2. **Configure Product Environments**:
   - Edit `src/config/clouds.ts`
   - Replace the placeholder values with your actual Cloudinary credentials:

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
      }
      // Add more environments as needed...
    ];
    ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Demo**:
   ```bash
   npm run dev
   ```

## How It Works

1. **Configuration Check**: The app checks for configured product environments in `src/config/clouds.ts`
2. **Empty State**: If no environments are configured, shows setup instructions
3. **Environment Selection**: Once configured, shows dropdown to select product environment
4. **Widget Initialization**: Media Library Widget initializes with selected environment
5. **Environment Switching**: Users can switch between different product environments

## Key Implementation Details

### Multiple Product Environment Support
- Configure unlimited product environments by editing `src/config/clouds.ts`
- Each environment can have different names, cloud names, and API keys
- Automatic filtering of placeholder configurations
- Seamless switching between environments
- **Placeholder filtering**: Only environments with real credentials appear in the dropdown

### Transformation Handling
The widget automatically detects and uses the correct URLs:
- **Transformed assets**: Uses `asset.derived` URL
- **Original assets**: Falls back to `asset.secure_url`

This prevents the common issue of storing wrong URLs when transformations are applied.

## Customization

Modify the widget configuration in `src/components/MediaLibraryWidget.tsx`:
- `max_files`: Number of files that can be selected
- `default_transformations`: Default image transformations
- `integration`: Custom integration details

## Technologies Used

- React 19
- TypeScript
- Vite
- Cloudinary Media Library Widget
