const amqp = require("amqplib");

async function sendMsgToTask(){
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const queueName = "task"
    await channel.assertQueue(queueName, {durable : true});
    channel.sendToQueue(queueName, Buffer.from("Hello rabbitMQ"), {persistent : true});
    console.log("Message sent to service");
    setTimeout(() => {
        connection.close();
    }, 1000);
}
setInterval(() => sendMsgToTask(), 1000);