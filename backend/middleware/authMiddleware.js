import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
   
    token = req.cookies.jwt; // this we are able to do because of ther cookieParser 

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password'); //************gives u the user
            next();

        } catch (error) {
            res.status(401);
            throw new Error('Invalid token');
        }
    }else{
        res.status(401);
        throw new Error('Not authoeized, no token');
    }

})

export { protect };