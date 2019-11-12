import axios from 'axios';

class UserFunctions {
  URL = "http://electionbuddy.skylerlt.com:8000";

    login(user){
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/login/login/' + user.username + '/' + user.pass)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    signUp(newUser) {
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/create/' +
            newUser.username + '/' +
            newUser.fname + '/' +
            newUser.lname + '/' +
            newUser.pass + '/' +
            newUser.email
          )
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    updateUser(user) {
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/login/updateEmail/' +
            user.username + '/' +
            user.email
            ).then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    getUser(user){

    }

    getUserEmail(username) {
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/login/getEmail/' + username)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }
}

export default UserFunctions;
