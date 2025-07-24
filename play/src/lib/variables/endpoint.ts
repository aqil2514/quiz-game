const isDevelopment = process.env.NODE_ENV === "development";

export const endpointServer = process.env.SERVER_API_URL!;    
export const endpointApiRoute = isDevelopment ? "http://localhost:3000" : "https://quiz-game-play.vercel.app";