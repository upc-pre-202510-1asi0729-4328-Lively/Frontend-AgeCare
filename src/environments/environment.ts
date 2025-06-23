export const environment = {
  production: true,
  // Server Base Path for Fake REST API (usando JSON Server)
  serverBasePath: 'http://localhost:3000',

  // Server Base Path for Spring Boot REST API (cuando esté integrado)
  // serverBasePath: 'http://localhost:8091/api/v1',

  // Endpoint para los recibos (Bounded Context de Pagos)
  receiptsEndpointPath: '/receipts'
};
