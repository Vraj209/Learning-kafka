import { Kafka } from "kafkajs";


const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"], 
});

const consumer = kafka.consumer({ groupId: "test" });


const producer = kafka.producer();
const run = async() => {
    await producer.connect();
    await producer.send({
        topic: "quickstart-events",
        messages: [{ value: "Hello KafkaJS !" }],
    });


    await consumer.connect();
    await consumer.subscribe({ topic: "quickstart-events" ,fromBeginning: true});

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
