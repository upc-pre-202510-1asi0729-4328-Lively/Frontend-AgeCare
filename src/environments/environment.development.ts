// src/environments/environment.development.ts
export const environment = {
  production: false,
  agecareProviderApiBaseUrl: 'https://agecareapi.com',
  // Para desarrollo con Swagger en el puerto 8091:
  serverBasePath: 'http://localhost:8091/api/v1',
  // si quisieras json-server, descomenta:
  // serverBasePath: 'http://localhost:3000/api/v1',
  residentsEndpointPath: '/residents',
  medicationsEndpointPath: '/medications',
  mentalHealthRecordsEndpointPath: '/mental-health-records',
  medicalHistoryEndpointPath: '/medical-histories',
  useJsonServer: false,
};
