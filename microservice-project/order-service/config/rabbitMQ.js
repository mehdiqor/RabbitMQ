const amqp = require("amqplib");
const { OrderModel } = require("../model/order.model");

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
const createQueue = async (queueName) => {
    const channel = await returnChannel();
    await channel.assertQueue(queueName);
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
const createOrderWithQueue = async (queueName) => {
    await createQueue(queueName);
    channel.consume(queueName, async msg => {
        if(msg.content){
            const {products, userEmail} = JSON.parse(msg.content.toString());
            const newOrder = new OrderModel({
                products,
                userEmail,
                totalPrice : (products.map(p => +p.price)).reduce((prev, curr) => prev + curr, 0)
            });
            await newOrder.save();
            channel.ack(msg);
            pushToQueue("PRODUCT", newOrder);
        }
    })
}

module.exports = {
    connectTOChannel,
    returnChannel,
    pushToQueue,
    createQueue,
    createOrderWithQueue
}