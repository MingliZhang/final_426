import {fakeppl} from './fakeppl.js'

const current_user = getUser()

export function getUser(){
    // reminber to change the async
    // const result = await axios({
    //     method: 'get',
    //     url: 'https://us-central1-comp426-firebase.cloudfunctions.net/users/${id}}'	
    //     });

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
        return result.data
    } catch {
        console.error("something went wrong pulling users");
    }
}

export function getFakeUsers(){
    return fakeppl
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
