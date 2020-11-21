const current_user = getUser()

export function getUser(){
    let user = {
        userName: "",
        email: "",
        password: "",
        matchPoint: [],
        friends: [],
        highestGameScore: 0
    }
    user.userName = "给世上最美好的SWW献上赞歌"
    user.email = "sww@sww.com"
    user.password = "xxx"
    user.matchPoint = [10,10,10,10,10]
    user.friends = []
    user.highestGameScore = 0

    return user
}

export async function getUsers(){
    try{
        const result = await axios({
            method: 'get',
            url: 'https://us-central1-comp426-firebase.cloudfunctions.net/users'
        })
        console.log(result.data[0])
        // const userObject = JSON.parse(result.data);
    
        // console.log(userObject);
        return result.data
    } catch {
        console.error("something went wrong pulling users");
    }
    
       

    // let user6 = {
    //     userName: "比SWW强的托尼马",
    //     email: "tnm@lol.com",
    //     password: "123",
    //     matchPoint: [2,3,5,7,8],
    //     friends: [],
    //     highestGameScore: 0
    // }
    // let user5 = {
    //     userName: "光仔的力量",
    //     email: "lyg@lol.com",
    //     password: "123",
    //     matchPoint: [5,5,5,5,5],
    //     friends: [],
    //     highestGameScore: 0
    // }
    // let user4 = {
    //     userName: "银河系长yjl",
    //     email: "yjl@lol.com",
    //     password: "123",
    //     matchPoint: [4,4,4,4,4],
    //     friends: [],
    //     highestGameScore: 0
    // }
    // let user3 = {
    //     userName: "大闹天宫hjh",
    //     email: "hjh@lol.com",
    //     password: "123",
    //     matchPoint: [2,2,2,2,2],
    //     friends: [],
    //     highestGameScore: 0
    // }
    // let user2 = {
    //     userName: "暴风星云JD",
    //     email: "jd@lol.com",
    //     password: "123",
    //     matchPoint: [3,3,3,3,3],
    //     friends: [],
    //     highestGameScore: 0
    // }
    // let user1 = {
    //     userName: "呀SHI啦LHH",
    //     email: "lhh@lol.com",
    //     password: "123",
    //     matchPoint: [6,6,6,6,6],
    //     friends: [],
    //     highestGameScore: 0
    // }
    // return [user1,user2,user3,user4, user5, user6]
}

export function upDateUser(finalScore){
    console.log("user info updated")
    console.log(finalScore)
}

export function addFriend(event){
    let target = event.target
    let id = target.id
    console.log("Friend added: " + id)
}

export async function testAxios(){
    //const result = "ss"
    const result = await axios({
        method: 'get',
        url: 'https://us-central1-comp426-firebase.cloudfunctions.net/users'
    })
    console.log(result)
    return result        
}
