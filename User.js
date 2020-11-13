class User{

    constructor(id, userName, email, password, highestScore, friends){
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.highestScore = highestScore;
        this.friends = friends;
    }

}

User.getAllIDs = () => {
    // return of all user IDs.
    return [0,1,2,3,4,5];
}

module.exports = User;