# Cloudinary Media Library Widget Demo

This is a React demo showcasing the Cloudinary Media Library Widget integration with support for multiple product environments and proper transformation handling.

## Features

- **Media Library Widget**: Browse and select images/videos from Cloudinary
- **Multiple Product Environment Support**: Configure and switch between different product environments
- **Dynamic Configuration**: Supports unlimited number of product environments via environment variables
- **Transformation-Aware**: Automatically handles transformed vs original URLs
- **React Integration**: Built with React and TypeScript
- **Modern UI**: Clean, responsive design with environment switching

## Setup

1. **Get Cloudinary Credentials**:
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Get your `cloud_name`, `api_key`, and `api_secret` from the [API Keys](https://console.cloudinary.com/app/settings/api-keys) page

2. **Configure Product Environments**:
   - Copy `env.example` to `.env`
   - Enter your actual Cloudinary credentials for each product environment:

    ```bash
    # Product Environment 1
    VITE_PRODUCT_ENVIRONMENT_1_NAME="Environment Name 1"
    VITE_PRODUCT_ENVIRONMENT_1_CLOUD_NAME="your_cloud_name_1"
    VITE_PRODUCT_ENVIRONMENT_1_API_KEY="your_api_key_1"
    VITE_PRODUCT_ENVIRONMENT_1_API_SECRET="your_api_secret_1"

    # Product Environment 2 (optional)
    VITE_PRODUCT_ENVIRONMENT_2_NAME="Environment Name 2"
    VITE_PRODUCT_ENVIRONMENT_2_CLOUD_NAME="your_cloud_name_2"
    VITE_PRODUCT_ENVIRONMENT_2_API_KEY="your_api_key_2"
    VITE_PRODUCT_ENVIRONMENT_2_API_SECRET="your_api_secret_2"

    # Add more environments as needed...
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

1. **Configuration Check**: The app checks for configured product environments
2. **Empty State**: If no environments are configured, shows setup instructions
3. **Environment Selection**: Once configured, shows dropdown to select product environment
4. **Widget Initialization**: Media Library Widget initializes with selected environment
5. **Environment Switching**: Users can switch between different product environments

## Key Implementation Details

### Multiple Product Environment Support
- Configure unlimited product environments using environment variables
- Each environment can have different names, API keys, and secrets
- Automatic environment discovery and validation
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
