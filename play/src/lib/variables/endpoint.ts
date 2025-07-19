const isDevelopment = process.env.NODE_ENV === "development";

export const endpointServer = isDevelopment ? "http://localhost:3001" : "";
