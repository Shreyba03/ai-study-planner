const express = require('express');
const cors = require('cors');

const app = express();

// Setup CORS middleware — THIS MUST BE BEFORE ANY ROUTES
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Additional CORS headers for preflight requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Middleware to parse JSON body
app.use(express.json());

// Define your route
app.post('/generate-plan', (req, res) => {
  console.log('Received request:', req.body);
  
  const { subject, deadline, timePerDay } = req.body;
  
  // Basic validation
  if (!subject || !deadline || !timePerDay) {
    return res.status(400).json({ 
      error: 'Missing required fields: subject, deadline, or timePerDay' 
    });
  }
  
  // Your plan generation logic would go here
  // For now, just return a success response
  res.json({ 
    message: 'Plan generated successfully!',
    data: {
      subject,
      deadline: `${deadline} weeks`,
      dailyTime: `${timePerDay} hours`
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});