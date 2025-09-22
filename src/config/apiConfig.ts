// API Configuration Constants
export const GATEWAY_BASE_ADDRESS = 'https://payment-solution-gateway.azurewebsites.net';
export const IDENTITY_SERVICE_URL = 'https://payment-solution-identity.azurewebsites.net';
export const SANDBOX_GATEWAY_BASE_ADDRESS = 'https://www.firstchekoutdev.com/apigateway';
export const SANDBOX_IDENTITY_SERVICE_URL = 'https://www.firstchekoutdev.com/identityserver';

// Environment-based configuration
export const getApiConfig = (isProduction = false) => ({
  gatewayBaseAddress: isProduction ? GATEWAY_BASE_ADDRESS : SANDBOX_GATEWAY_BASE_ADDRESS,
  identityServiceUrl: isProduction ? IDENTITY_SERVICE_URL : SANDBOX_IDENTITY_SERVICE_URL
});

// Default to sandbox for documentation examples
export const API_CONFIG = getApiConfig(false);