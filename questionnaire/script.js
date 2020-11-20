function getUser(){
    let user = {
        userName: "",
        email: "",
        password: "",
        matchPoint: 0,
        friends: [],
        highestGameScore: 0
    }
    user.userName = "SWW大帅逼"
    user.email = "sww@sww.com"
    user.password = "xxx"
    user.matchPoint = "0"
    user.friends = []
    user.highestGameScore = 0

    return user
}

export default getUser