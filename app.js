// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const supplierRoutes = require('./routes/suppliers');
const indexRoutes = require('./routes/index');

const app = express();

// ====== Kết nối MongoDB ======
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/restful_session_app')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ====== View engine ======
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ====== Middlewares ======
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layout'); // mặc định dùng views/layout.ejs

// Session + Cookie
app.use(session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/restful_session_app',
    collectionName: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    secure: false, // đổi thành true nếu chạy HTTPS
    maxAge: 1000 * 60 * 60, // 1 giờ
    sameSite: 'lax'
  }
}));

// Gửi biến currentUser cho tất cả view
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// ====== Routes ======
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);

// ====== Start server ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
