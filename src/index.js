import app from './app';

//este importe es para cuando se hace 'nmp run build' 'npm start'
import '@babel/polyfill';

async function main() {
    await app.listen(2000);
    console.log('Server on port 2000');
};

main();