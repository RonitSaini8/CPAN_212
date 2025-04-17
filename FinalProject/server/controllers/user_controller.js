import User from '../models/user.js';
import bcrypt from 'bcrypt';
import auth from '../middleware/auth.js';

const register = async (req, res) => {
    const {username, email, password, bio = ''} = req.body

    bcrypt.hash(password, 10)
    .then((hashedPassword) => {
        let newUser = new User({
            username,
            email,
            bio,
            password: hashedPassword,
        });
        newUser
        .save()
        .then(() => {
            res.json({ message: 'Account Registered !' });
        })
        .catch((err) => {
            console.log(err);
            return res.json({ message: 'Email already in use !' });
        });
    })
    .catch((err) => {
        console.error('Hashing error: ', err),
        res.status(500).json({ message: 'Internal Server Error' });
    })
};

const login = async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body)

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter both the email and password !'});
    }

    User.findOne({ email: email })
    .then((user_account) => {
        if (!user_account) {
            return res.status(400).json({ message: 'Could not find the user !' });
        }

        bcrypt
        .compare(password, user_account.password)
        .then((isMatched) => {
            if (!isMatched) {
                return res.status(400).json({ message: 'Invalid password !' });
            }
            const token = auth.generateToken(user_account);
            res.json({ message: 'Login was successful !', token });
        })
        .catch((err) => {
            console.log('Error comparing passwords: ', err);
            res.status(500).json({ message: 'Could not complete the request !' });
        });
    })
    .catch((err) => {
        console.log('Error finding user: ', err);
        res.status(500).json({ message: 'Could not complete the request !'});
    });
};

const logout = (req, res) => {
    res.status(200).json({ message: "Logout successful" });
  };

const all = async (req, res) => {
    User.find()
      .then((results) => {
        console.log(results); 
      res.json(results);
    })
      .catch((error) => res.status(500).json({ message: "Error fetching users", error }));
  };

const fetchUser = async (req, res) => {
    const { id } = req.params;

    User.findById(id)
    .then((user) => {
        if(!user) {
            return res.status(400).json({ message: 'User not found !' });
        }
        res.json(user);
        console.log(user);
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: 'Could not fetch user !' });
    });
};

    export default {
        register,
        login,
        logout,
        all,
        fetchUser
    };