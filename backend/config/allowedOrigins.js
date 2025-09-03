let allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3700',
    'https://cyberspacetechhub.com',
    'https://www.cyberspacetechhub.com',
    'https://cyberspace-portfolio.vercel.app'
]

let environment = process.env.NODE_ENV || 'development'
if(environment === 'development'){
    allowedOrigins = ['*']
}

module.exports = allowedOrigins;