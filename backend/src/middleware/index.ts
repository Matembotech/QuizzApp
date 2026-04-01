// Middleware barrel export - import all middleware from a single entry point
// Usage: import { authMiddleware, adminMiddleware, errorHandler, isOwner } from './middleware';

export { authMiddleware } from "./auth.js";
export { adminMiddleware } from "./admin.js";
export { isOwner } from "./authorization.js";
export { errorHandler, notFoundHandler } from "./errorHandler.js";
export type { AppError } from "./errorHandler.js";
