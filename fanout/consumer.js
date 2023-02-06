const amqp = require('amqplib');

async function receiveMsg(){
    const exchangeName = 'logs';
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'fanout');
    const assertedQueue = await channel.assertQueue('', {exclusive : true});
    console.log("Binding Queue by queueName: ", assertedQueue.queue);
    channel.bindQueue(assertedQueue.queue, exchangeName, '');
    channel.consume(assertedQueue.queue, msg => {
        if(!msg.content) console.log("message not received...!");
        console.log(msg.content.toString());
        channel.ack(msg);
    })
}
receiveMsg();