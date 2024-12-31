import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"], 
});
// partition and consumer group
const consumer = kafka.consumer({ groupId: "my-phone3" });

const run = async() => {
await consumer.connect();
await consumer.subscribe({ topic: "payment-done" ,fromBeginning: true});
await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            partition,
            offset: message.offset,
            value: message.value?.toString(),
        });
    },
});
}
run().catch(console.error);