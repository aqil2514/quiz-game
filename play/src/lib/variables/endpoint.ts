const isDevelopment = process.env.NODE_ENV === "development";

export const endpointServer = isDevelopment ? "http://localhost:3001" : process.env.SERVER_API_URL!;    
export const endpointApiRoute = isDevelopment ? "http://localhost:3000" : "https://quiz-game-play.vercel.app";