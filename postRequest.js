const request = require('request');

let postData = {
    name: "Denieall Joenethen",
    job: "Software Developer"
};

request.post({url:'https://reqres.in/api/users', postData}, function(err,httpResponse,body){
    if (err) {
        console.log("A error has occured");
    } else {
        console.log("POST request successful");
    }
});
