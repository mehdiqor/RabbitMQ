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
        await returnChannel();
        await channel.assertQueue(queueName);
        return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(error.message);
    }
}
const createQueue = async (queueName) => {
    await returnChannel();
    await channel.assertQueue(queueName);
    return channel
}

module.exports = {
    connectTOChannel,
    returnChannel,
    pushToQueue,
    createQueue
}