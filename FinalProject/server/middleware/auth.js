import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user._id.toString(),
            username: user.username,
            email: user.email,
            bio: user.bio
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Authorization token required !'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token !'});
    }
}

export default { generateToken, verifyToken }