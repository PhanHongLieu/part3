// controllers/authController.js
const User = require('../models/User');

exports.registerForm = (req, res) => {
  res.render('register');
};

exports.register = async (req, res) => {
  const { username, password, email, phone } = req.body;
  try {
    const user = new User({ username, password, email, phone });
    await user.save();
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('register', { error: err.message });
  }
};

exports.loginForm = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.render('login', { error: 'Sai thông tin đăng nhập' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.render('login', { error: 'Sai thông tin đăng nhập' });
  req.session.user = { id: user._id, username: user.username };
  const redirectTo = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.clearCookie('sessionId');
    res.redirect('/');
  });
};

// quên mật khẩu: ở đây chỉ hiện form (thực tế cần email service)
exports.forgotForm = (req, res) => {
  res.render('forgot');
};
