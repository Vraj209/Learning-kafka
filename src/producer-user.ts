import { Kafka } from "kafkajs";


const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"], 
});
const producer = kafka.producer();

const run = async() => {
await producer.connect();
await producer.send({
    topic: "payment-done",
    messages: [{ 
        value: "Hi there !",
        key:"user1" // user1 => assign partition key hash to 0,1,2 
     }],
});
}

run().catch(console.error);