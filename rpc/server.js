const amqp = require("amqplib");
const { v4 : uuidv4 } = require("uuid");
const uuid = uuidv4();
const args = process.argv.slice(2);
const queueName = "rpc";

async function processTask(){
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {exclusive : true});
    console.log("waiting for new task to process...");
    channel.consume(queueName, msg => {
        console.log("Received: ", msg.content.toString());
        const data = parseInt(msg.content.toString());
        let temp = 0;
        for (let index = 0; index <= data; index++) {
            temp += (data * index);
        }
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(temp.toString()), {
            correlationId : msg.properties.correlationId
        });
        channel.ack(msg);
    });
}
processTask();