// After a request is completed create an enviroment variable from the generated response
// Put this in "Tests" tab in Postman
var token = postman.getResponseHeader('x-auth');

pm.environment.unset("x-auth");

pm.environment.set("x-auth", token);