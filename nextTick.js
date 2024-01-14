// process.nextTick() fires immediately on the same phase
// setImmediate() fires on the following iteration or 'tick' of the event loop

// Function to simulate an asynchronous task
function asyncTask(name, callback) {
    console.log(`Starting task: ${name}`);
    process.nextTick(() => {
        console.log(`Completing task: ${name}`);
        callback();
    });
}

// Main execution flow
console.log('Program started');

asyncTask('Task 1', () => {
    console.log('Callback of Task 1');

    asyncTask('Nested Task 1.1', () => {
        console.log('Callback of Nested Task 1.1');
    });

    process.nextTick(() => {
        console.log('Next Tick inside Callback of Task 1');
        asyncTask('Nested Task 1.2', () => {
            console.log('Callback of Nested Task 1.2');
        });
    });
});

asyncTask('Task 2', () => {
    console.log('Callback of Task 2');
    process.nextTick(() => {
        console.log('Next Tick inside Callback of Task 2');
    });
});

console.log('Program scheduled tasks');

// Final state observation
setImmediate(() => {
    console.log('Final state reached');
});
