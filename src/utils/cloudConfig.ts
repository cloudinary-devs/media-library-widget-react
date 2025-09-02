/**
 * Cloud configuration utilities for loading and managing multiple Cloudinary environments
 */

export interface CloudConfig {
  name: string;
  cloudName: string;
  apiKey: string;
}

/**
 * Loads cloud configurations from environment variables
 * Filters out placeholder configurations
 */
export const loadCloudConfigs = (): CloudConfig[] => {
  const configs: CloudConfig[] = [];
  
  // Look for VITE_PRODUCT_ENVIRONMENT_* variables
  let index = 1;
  while (true) {
    const nameKey = `VITE_PRODUCT_ENVIRONMENT_${index}_NAME`;
    const cloudNameKey = `VITE_PRODUCT_ENVIRONMENT_${index}_CLOUD_NAME`;
    const apiKeyKey = `VITE_PRODUCT_ENVIRONMENT_${index}_API_KEY`;
    
    const name = import.meta.env[nameKey];
    const cloudName = import.meta.env[cloudNameKey];
    const apiKey = import.meta.env[apiKeyKey];
    
    // Stop if we don't find the first required variable
    if (!name) break;
    
    // Only include configurations that have all required values and aren't placeholders
    if (name && cloudName && apiKey &&
        !name.includes('your_') && 
        !cloudName.includes('your_') &&
        !apiKey.includes('your_') &&
        !name.includes('test_') &&
        !cloudName.includes('test_') &&
        !apiKey.includes('test_')) {
      configs.push({
        name,
        cloudName,
        apiKey
      });
    }
    
    index++;
  }
  
  return configs;
};

/**
 * Checks if any valid cloud configurations are available
 */
export const hasCloudConfigs = (): boolean => {
  return loadCloudConfigs().length > 0;
};
