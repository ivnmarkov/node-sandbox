const EventEmitter = require('events');

class SensorEmitter extends EventEmitter {}
class MachineController extends EventEmitter {}
class LogEmitter extends EventEmitter {}
class AlarmEmitter extends EventEmitter {}

const sensorEmitter = new SensorEmitter();
const machineController = new MachineController();
const logEmitter = new LogEmitter();
const alarmEmitter = new AlarmEmitter();

// LogEmitter listens to all components and logs their activities
sensorEmitter.on('data', (data) => logEmitter.emit('log', `Sensor data received: ${JSON.stringify(data)}`));
machineController.on('control', (action) => logEmitter.emit('log', `Machine action: ${action}`));
alarmEmitter.on('alarm', (message) => logEmitter.emit('log', `ALARM: ${message}`));

// MachineController reacts to sensor data
sensorEmitter.on('data', (data) => {
    console.log(`SensorEmitter: Emitting data ${JSON.stringify(data)}`);
    if (data.temperature > 50) {
        console.log(`MachineController: High temperature detected.`);
        machineController.emit('control', 'cooling ON');
        alarmEmitter.emit('alarm', 'High temperature');
    }
});

// AlarmEmitter triggers on specific conditions
sensorEmitter.on('data', (data) => {
    if (data.pressure < 10) {
        console.log(`AlarmEmitter: Low pressure detected.`);
        alarmEmitter.emit('alarm', 'Low pressure');
    }
});

// LogEmitter logs all activities
logEmitter.on('log', (message) => {
    console.log(`Log: ${message}`);
});

// Example sensor data emitted
console.log("Emitting sensor data: { temperature: 55, pressure: 12 }");
sensorEmitter.emit('data', { temperature: 55, pressure: 12 });

console.log("Emitting sensor data: { temperature: 45, pressure: 8 }");
sensorEmitter.emit('data', { temperature: 45, pressure: 8 });
