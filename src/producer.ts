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
    messages: [{ value: "Hello KafkaJS payment-done !" }],
});
}

run().catch(console.error);