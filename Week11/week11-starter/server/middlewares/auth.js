import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



const generateToken = () => {
    // First name, Object_id, 
    payload = {
        firstname: user.first_name,
        email: user.email,
        id: user._id
    }
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );
    return token;
}

const verifyToken = (req, res, next) => {
    // const token = req.header('')?.split(' ')[1];
    // let isMatched = jwt.verify(token, process.env.JWT_SECRET);

    // if (isMatched) {
    //     next()
    // }
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    // Verify with DB if the account information exists
    User.findById(decodedToken.id)
    .then((results) => {
        next()
    })
}

export default {generateToken};