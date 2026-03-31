import { Request, Response, NextFunction } from 'express';

// Extended error interface for our app
export interface AppError extends Error {
  statusCode?: number;
  status?: string;
}

/**
 * Global Error Handler Middleware
 * Catches all errors from route handlers and sends formatted response
 *
 * Should be the LAST middleware registered in app.ts
 */
export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode: number = 500;
  let message: string = 'Internal server error';

  // If error has statusCode and message from our controllers
  if (err instanceof Error) {
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = 'Validation error';
    }
    // Mongoose duplicate key error
    else if (err.name === 'MongoServerError' && (err as any).code === 11000) {
      statusCode = 409;
      message = 'Duplicate field value';
    }
    // Cast error (invalid ObjectId)
    else if (err.name === 'CastError') {
      statusCode = 400;
      message = 'Invalid ID format';
    }
    // Custom error with status code
    else if ((err as AppError).statusCode) {
      statusCode = (err as AppError).statusCode || 500;
      message = err.message;
    }
    // Default error
    else {
      message = err.message || 'Internal server error';
    }
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      statusCode,
      message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
    });
  } else {
    // Minimal logging in production
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${statusCode}: ${message}`);
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    // Only send stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 Not Found Handler
 * Used when no route matches
 * Should be placed after all routes in app.ts
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};
