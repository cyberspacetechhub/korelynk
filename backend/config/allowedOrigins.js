let allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3700',
    'https://inntechlab.online',
    'https://www.inntechlab.online',
    'https://academy.inntechlab.online',
    'https://api.inntechlab.online/',
    'https://inntechlab.vercel.app',
    'https://www.inntechlab.vercel.app',
    'https://inntechlabs.onrender.com',
    'https://flyerforge-design.vercel.app'
]

let environment = process.env.NODE_ENV || 'development'
if(environment === 'development'){
    allowedOrigins = ['*']
}

module.exports = allowedOrigins;