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
    name: "My Org - Production",
    cloudName: "yelenik",
    apiKey: "112462679192568"
  },
  {
    name: "Development",
    cloudName: "in-development", 
    apiKey: "528627591592873"
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
