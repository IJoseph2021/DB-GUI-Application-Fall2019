import axios from 'axios';

class UserFunctions {
  URL = "http://electionbuddy.skylerlt.com:8000";
  // URL = "http://127.0.0.1:8000"; //localhost

    login(user){
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/login/login/' + user.username + '/' + user.pass)
                .then(resp => {
                  // console.log(resp.data);
                  resolve(resp.data)})
                .catch(resp => reject(resp));
        })
    }

    signUp(newUser) {
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/login/create/' +
            newUser.user + '/' +
            newUser.fname + '/' +
            newUser.lname + '/' +
            newUser.pass + '/' +
            newUser.email
          )
                .then(resp => {
                  resolve(resp.data)
                })
                .catch(resp => reject(resp));
        })
    }

    updateUserEmail(user) {
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/login/updateEmail/' +
            user.username + '/' +
            user.email
            ).then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    updatePassword(user){
      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/login/session/updatePasword/' +
          user.newPass
          ).then(resp => resolve(resp.data))
              .catch(resp => reject(resp));
      })
    }

    getUserInfo(userIdOrName){
      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/login/getUserInfo/' +
          userIdOrName.userId
          ).then(resp => resolve(resp.data))
              .catch(resp => reject(resp));
      })
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
