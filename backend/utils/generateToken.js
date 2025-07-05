import jwt from 'jsonwebtoken';

const generateToken = ( res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    // jwt is the name of the cookie, token is the value
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

export default generateToken

/*
 * Cookies: 
 * 
 * A cookie is a small piece of data that a server sends to a user's web browser. 
 * The browser stores this data and sends it back to the server with each subsequent request. 
 * Cookies are primarily used to remember information about the user, such as login sessions and preferences.
 * 
 * Why Use Cookies for Tokens:
 * 
 * 1. Security: Cookies can be marked as HttpOnly, making them inaccessible to JavaScript 
 *    and preventing XSS (Cross-Site Scripting) attacks. This is a significant advantage 
 *    over local storage, which is vulnerable to XSS since its data can be accessed by scripts.
 * 
 * 2. Automatic Handling: Cookies are automatically included in HTTP requests to the server 
 *    for the domain that set them, simplifying token management. In contrast, local storage 
 *    requires manual token attachment to each request.
 * 
 * 3. CSRF Protection: Cookies support SameSite attributes to help prevent CSRF (Cross-Site Request Forgery) 
 *    attacks by controlling when cookies are sent with cross-origin requests. Local storage does not 
 *    have this automatic protection mechanism.
 * 
 * Cookie Options Explained:
 * 
 * - httpOnly: 
 *   - Prevents access to the cookie from JavaScript, reducing the risk of XSS attacks.
 * 
 * - secure: 
 *   - Ensures that the cookie is only sent over HTTPS connections. This protects the cookie 
 *     from being intercepted over unencrypted HTTP, especially in production environments.
 * 
 * - sameSite: 
 *   - Controls when cookies are sent with cross-origin requests. 
 *   - 'strict': The cookie is only sent for same-site requests, providing strong CSRF protection.
 *   - 'lax': The cookie is sent for same-site requests and top-level navigation GET requests, 
 *     allowing for some cross-origin usage while still offering CSRF protection.
 * 
 * - maxAge: 
 *   - Sets the duration (in milliseconds) for which the cookie should be stored in the user's browser. 
 *     After this period, the cookie will expire, which helps manage session longevity.
 * 
 * Overall, using cookies for authentication tokens provides enhanced security and convenience 
 * compared to local storage, making them a preferred choice in web applications.
 */
