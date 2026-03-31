// Middleware barrel export - import all middleware from a single entry point
// Usage: import { authMiddleware, adminMiddleware, errorHandler, isOwner } from './middleware';

export { authMiddleware } from './auth';
export { adminMiddleware } from './admin';
export { isOwner } from './authorization';
export { errorHandler, notFoundHandler } from './errorHandler';
export type { AppError } from './errorHandler';
