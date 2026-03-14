let allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3700',
    'https://inntechlabs.vercel.app',
    'https://www.inntechlabs.vercel.app',
    'https://korelynk.onrender.com',
    'https://flyerforge-design.vercel.app'
]

let environment = process.env.NODE_ENV || 'development'
if(environment === 'development'){
    allowedOrigins = ['*']
}

module.exports = allowedOrigins;