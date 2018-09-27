var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Denieall'
    }

    setTimeout(() => {
        callback(user);
    }, 2000);

};

getUser(35, (user) => {
    console.log(user.id);
    console.log(user.name);
});
