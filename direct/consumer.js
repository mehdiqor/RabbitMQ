const amqp = require("amqplib");

async function receiveFromProducer(){
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const queueName = "task"
    await channel.assertQueue(queueName, {durable : true});
    console.log("I wait for receive messages");
    let index = 0;
    await channel.consume(queueName, msg => {
        const random = (Math.floor(Math.random() * 10)) * 1000;
        setTimeout(() => {
            console.log(random);
            console.log(`${index}: `, msg.content.toString());
            index++;
            channel.ack(msg);
        }, random);
    })
}
receiveFromProducer();