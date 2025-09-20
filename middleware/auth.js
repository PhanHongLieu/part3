// middleware/auth.js

// Bắt buộc đăng nhập
function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/auth/login'); // hoặc res.status(401).json({ message: "Unauthorized" });
}

// Không cho login/register nếu đã đăng nhập
function isGuest(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect('/'); // quay về home nếu đã login
  }
  return next();
}

module.exports = {
  isLoggedIn,
  isGuest
};
