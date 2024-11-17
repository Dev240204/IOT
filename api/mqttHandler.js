// mqtt-handler.js
const mqtt = require('mqtt');
const Data = require("../models/data");

const startMQTT = () => {
    const mqttUrl = `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

    const options = {
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        clean: true,
        reconnectPeriod: 5000,
        connectTimeout: 30 * 1000,
        rejectUnauthorized: false
    };

    const mqttClient = mqtt.connect(mqttUrl, options);

    const topic = 'esp32/data';

    mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker');
        mqttClient.subscribe(topic,{qos: 1}, (err) => {
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