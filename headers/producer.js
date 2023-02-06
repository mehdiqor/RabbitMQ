const amqp = require('amqplib');
const exchangeName = 'headersMessage';

const sendData = async() => {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'headers');
    channel.publish(exchangeName, '', Buffer.from('myMessage'), {headers : {
        author : "mehdi",
        runTime : "react",
        price : 560,
        comments : []
    }});
    setTimeout(() => {
        process.exit(0);
    });
}
sendData();