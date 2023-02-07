const amqp = require("amqplib");

let channel;
const connectTOChannel = async() => {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        return (await connection.createChannel());
    } catch (error) {
        console.log("cannot connect to the RabbitMQ server");
    }
}
const returnChannel = async() => {
    if(!channel){
        channel = await connectTOChannel();
    }
    return channel
}
const pushToQueue = async(queueName, data) => {
    try {
        await channel.assertQueue(queueName);
        return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    connectTOChannel,
    returnChannel,
    pushToQueue
}