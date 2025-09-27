let allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3700',
    'https://cyberspacetechhub.vercel.app',
    'https://www.cyberspacetechhub.vercel.app',
    'https://cyberspacetechhub.onrender.com'
]

let environment = process.env.NODE_ENV || 'development'
if(environment === 'development'){
    allowedOrigins = ['*']
}

module.exports = allowedOrigins;