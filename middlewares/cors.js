import cors from 'cors';

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:3000',
    'http://localhost:5500'
]

export const corsMiddleware = ({corsAcceptedOrigins =  ACCEPTED_ORIGINS} = {}) => {
    origin : (origin, callback) => {

        if (corsAcceptedOrigins.includes(origin)) {
            return callback(null, true)

        } else if(!origin) {
            return callback(null, true)
            
        }else {
            return callback(new Error('Not allowed by CORS'))
        }
    }
}