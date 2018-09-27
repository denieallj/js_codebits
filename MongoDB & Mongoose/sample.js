const {mongoose} = require('./mongoose');

// ------------------------------------------------------------------------------------
//  Model for todos collection
// ------------------------------------------------------------------------------------

// TODO: Tell mongoose to use es6 built in promise library
mongoose.Promise = global.Promise;

// TODO: Create db connection
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }).catch(
    (err) => {
        console.log(err);
    }
);

// TODO: Add a new model --- returns a class
let Todo = mongoose.model('Todo', {
    text:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// TODO: Use the class generated from model and pass in object in model as constructor
let newTodo = new Todo({
    text: "Go to office for meeting at 10.30 in the morning."
});

// TODO: Save the new document
newTodo.save().then(
    (doc) => {
        console.log("Saved todo", doc);
    },

    (err) => {
        console.log("Unable to save todo");
    }
);