// adminAuth.js - Simple token based auth for admin routes
// Uses ADMIN_TOKEN env variable. In production, replace with robust auth.

module.exports = (req, res, next) => {
  const token = req.headers['x-admin-token'];
  const expected = process.env.ADMIN_TOKEN;
  // Allow token bypass in non-production environments for easier development and testing
  if (process.env.NODE_ENV !== 'production') {
    // Optional: log when bypassing authentication
    if (!token) {
      console.info('Admin auth bypassed in development mode (no token provided)');
    }
    return next();
  }
  if (!expected) {
    console.warn('ADMIN_TOKEN not set in env');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }
  if (token !== expected) {
    return res.status(401).json({ error: 'Unauthorized: invalid admin token' });
  }
  next();
};
