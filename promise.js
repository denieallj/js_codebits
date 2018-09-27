var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject("Arguments must be numbers");
            }

        }, 1500);
    });
};

var asyncMinus = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a - b);
            } else {
                reject("Arguments must be numbers");
            }

        }, 5000);
    });
};

// Wait for two promises to finish then do something with both their result
let addPromise = asyncAdd(4, 5);
let minusPromise = asyncMinus(100, 99);

Promise.all([addPromise, minusPromise]).then(

    (res) => {
        console.log("The combined result of the promise was: " + (res[0] + res[1]));
    }

).catch(
    (err) => {
        console.log("Error");
    }
);

// Chaining two promises
asyncAdd(23, 4).then(
    (res) => {
        console.log(res);
        return asyncMinus(res, 7);
    },
).then(
    (res) => {
        console.log('Final result:' + res);
    },
).catch(
    (msg) => {
        console.log(msg);
    }
);

// Simple use of promise
var somePromise = new Promise((resolve, reject) => {

    setTimeout(() => {
        //resolve('Process completed');
        reject('Process error');
    }, 2500);

});

somePromise.then(
    (msg) => {
        console.log("Success: " + msg);
    },

    (msg) => {
        console.log("Failed: " + msg);
    }
);
