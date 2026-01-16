import serverless from "serverless-http";
import app from "../../app.js";
console.log("ESM API FUNCTION LOADED");
export const handler = serverless(app);