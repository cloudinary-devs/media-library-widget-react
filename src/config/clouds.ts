/**
 * Cloudinary cloud configurations
 * Edit this file to add your product environments
 */

export interface CloudConfig {
  name: string;
  cloudName: string;
  apiKey: string;
}

export const cloudConfigs: CloudConfig[] = [
  {
    name: "Production",
    cloudName: "your_cloud_name_1",
    apiKey: "your_api_key_1"
  },
  {
    name: "Staging",
    cloudName: "your_cloud_name_2", 
    apiKey: "your_api_key_2"
  }
  // Add more environments as needed...
];

/**
 * Checks if any valid cloud configurations are available
 */
export const hasCloudConfigs = (): boolean => {
  return cloudConfigs.filter(config => 
    config.name && 
    config.cloudName && 
    config.apiKey &&
    !config.name.includes('your_') &&
    !config.cloudName.includes('your_') &&
    !config.apiKey.includes('your_')
  ).length > 0;
};
