// mqtt-handler.js
const mqtt = require('mqtt');
const Data = require("../models/data");

const startMQTT = () => {
    const mqttClient = mqtt.connect(process.env.MQTT_SERVER_HOST, {
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        port: process.env.MQTT_PORT
    });

    const topic = 'esp32/data';

    mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker');
        mqttClient.subscribe(topic, (err) => {
            if (err) {
                console.error('MQTT subscription error:', err);
            } else {
                console.log('Subscribed to esp32/data topic');
            }
        });
    });

    mqttClient.on('message', async (topic, message) => {
        try {
            console.log('Received message:', message.toString());
            const data = JSON.parse(message.toString());
            console.log('Parsed message:', data);
            
            const sensorData = await new Data({
                distance: data.distance,
                status: data.motion
            });
            
            await sensorData.save();
            console.log('Data saved successfully');
        } catch (err) {
            console.error('Error processing MQTT message:', err);
        }
    });

    mqttClient.on('error', (err) => {
        console.error('MQTT error:', err);
    });

    return mqttClient;
};

module.exports = startMQTT;