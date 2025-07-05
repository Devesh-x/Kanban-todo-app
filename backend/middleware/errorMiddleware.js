const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    
    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = `Resource not found`;
    }
    // When this condition is met, it means the application tried to find a resource using an invalid ID format. Instead of returning a 500 Internal Server Error (which suggests a server issue), the middleware updates the response to:
    // Status Code: 404 (Not Found)
    // Message: Resource not found
    // This makes the error response more accurate because the problem is with the client's request (the ID they provided) rather than with the server.
    
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler }