import app from "./app";
import './database';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' })


app.listen(app.get('port'));

console.log('Server on port', app.get('port'));
