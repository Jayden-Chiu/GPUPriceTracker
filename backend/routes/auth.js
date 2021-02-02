const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', async (req, res, next) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		var user = null;
		// hash password with bcrypt
		const hash = await bcrypt.hash(password, 10);

		if (!username || !/^(?=.{4})[a-z\d]*_?[a-z\d]+$/i.test(username))
			res.json({ message: 'Invalid username', user });

		if (User.find(username))
			res.json({ message: 'Username already exists', user });

		user = await User.create({ username, password: hash });

		res.json({
			message: 'Signup successful',
			user,
		});
	} catch (err) {
		console.log(err);
		res.json({ message: 'An error has occurred', user });
	}
});

router.post('/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err || !user) {
				return res.status(400).json({
					message: info,
					user: user,
				});
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, username: user.username };
				const token = jwt.sign({ user: body }, 'test', { expiresIn: '60m' });

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

router.get(
	'/authenticated',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// console.log(req.user);
		res.json({ authenticated: true, user: req.user });
	}
);

module.exports = router;
