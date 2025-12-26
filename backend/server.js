const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// ========== FIXED CORS SETTINGS ==========
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Other middleware
app.use(helmet());
app.use(express.json());

// JWT Secret
const JWT_SECRET = 'your-super-secret-key-change-in-production';

// ==================== DATABASE ====================
let users = [];

// Create admin user on startup
async function createAdminUser() {
    const adminExists = users.find(u => u.email === 'admin@test.com');
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        users.push({
            id: 1,
            email: 'admin@test.com',
            password: hashedPassword,
            role: 'admin'
        });
        console.log('✅ Admin user created: admin@test.com / admin123');
    }
}
createAdminUser();

// ==================== ROUTES ====================

// REGISTER
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = {
            id: users.length + 1,
            email,
            password: hashedPassword,
            role: 'user'
        };
        
        users.push(user);
        console.log('📝 New user registered:', email);
        
        // Create token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
})

// LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('🔐 Login attempt for:', email);
        
        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            console.log('❌ User not found:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('❌ Wrong password for:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Create token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        console.log('✅ Login successful for:', email);
        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// PROTECTED ROUTE - GET USER PROFILE
app.get('/api/profile', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.id === decoded.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({
            id: user.id,
            email: user.email,
            role: user.role,
            message: 'Profile retrieved successfully'
        });
        
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// ADMIN ROUTE - GET ALL USERS
app.get('/api/admin/users', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Check if user is admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        // Return all users without passwords
        const safeUsers = users.map(user => ({
            id: user.id,
            email: user.email,
            role: user.role
        }));
        
        res.json({
            users: safeUsers,
            count: safeUsers.length
        });
        
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// ==================== START SERVER ====================
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log(`📊 Total users: ${users.length}`);
    console.log(`\n🔗 Test endpoints:`);
    console.log(`   POST http://localhost:${PORT}/api/register`);
    console.log(`   POST http://localhost:${PORT}/api/login`);
    console.log(`   GET  http://localhost:${PORT}/api/profile`);
    console.log(`   GET  http://localhost:${PORT}/api/admin/users`);
    console.log(`\n💡 Admin login: admin@test.com / admin123`);
    console.log(`⚠️  CORS enabled for all origins`);
});