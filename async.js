// Display 1st
console.log('Starting App');

// Display 5th
setTimeout(() => {
    console.log("Callback for set timeout 1");
}, 2000);

// Display 4th
setTimeout(() => {
    console.log("Callback for set timeout 2");
}, 1000);

// Display 3rd
setTimeout(() => {

    console.log(`Callback for set timeout 3`);
}, 0);

// Display 2nd
console.log('Finish');
