const db = require('../databaseConnector');
const bcrypt = require('bcrypt');

exports.SignUp = async (req, res) => {
    const { first_name, last_name, email, phone_number, password } = req.body;

    
    db.query(
        'SELECT * FROM  customer WHERE email = ? OR phone_number = ?',
        [email, phone_number], 
        async (err, results) => {
            if (results.length > 0) {
                return res.status(400).send('Email or phone number already in use' );
            } 
            
            
            const password_hash = await bcrypt.hash(password, 10);

           
            db.query(
                'INSERT INTO customer (first_name, last_name, email, phone_number, user_password) VALUES (?, ?, ?, ?, ?)',
                [first_name, last_name, email, phone_number, password_hash],
                (err, results) => {
                    if (err) {
                        return res.status(500).send('An error occurred');
                    }

                    
                    req.session.userId = results.insertId;
                    console.log(results);

                    return res.status(201).send('User created successfully');
                }
            );
        }
    );
};

exports.SignIn = async (req, res) => {
    const { email, user_password } = req.body;

    db.query('SELECT * FROM customer WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).send('An error occurred');
        }

        if (results.length === 0) {
            return res.status(400).send('Account doesn\'t exist');
        }

        const customer = results[0];

        const isMatch = await bcrypt.compare(user_password, customer.user_password); 
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        req.session.userId = customer.user_id;
        res.send('ok');
    });
};