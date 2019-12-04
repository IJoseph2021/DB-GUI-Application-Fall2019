import axios from 'axios';

class UserFunctions {
  URL = "https://electionbuddy.skylerlt.com:8000";
  // URL = "http://127.0.0.1:8000"; //localhost

    login(user){
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/login/login/' + user.username + '/' + user.pass)
                .then(resp => {
                  console.log(resp.data);
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
            user.userId + '/' +
            user.email
            ).then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    getUserCurrentPassword(userId){
      //app.get('/login/getPassword/:ID', login.getPassword);

      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/login/getPassword/' +
          userId
          ).then(resp => resolve(resp.data))
              .catch(resp => reject(resp));
      })
    }

    updatePassword(user){
      //app.get('/login/updatePassword/:user/:newpass', login.changePassword);

      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/updatePassword/' +
          + user.userId + "/" + user.newPass
          ).then(resp => resolve(resp.data))
              .catch(resp => reject(resp));
      })
    }

    getUserId(user){
      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/getUserId/' +
          user.username
          ).then(resp =>
            {
              console.log(resp)
              resolve(resp.data)
            })
              .catch(resp => reject(resp));
      })
    }

    getUserIdCamel(user){
      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/getUserId/' +
          user.userName
          ).then(resp =>
            {
              console.log(resp)
              resolve(resp.data)
            })
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

    getUserEmail(userId) {
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/login/getEmail/' + userId)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    getRoles(userId) {
      //app.get('/login/getAllRoles/:user', login.getRoles);
      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/login/getAllRoles/' + userId)
              .then(resp => resolve(resp.data))
              .catch(resp => reject(resp));
      })
    }

    getVoterInfo(userId){
      //app.get('/voter/getInfoVoter/:userId', voter.getInfoVoter);
      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/voter/getInfoVoter/' + userId)
              .then(resp => resolve(resp.data))
              .catch(resp => reject(resp));
      })
    }

    updateVoterInfo(user){
      //app.get('/voter/updateInfoVoter/:userId/:partyCode/:zipCode/:state/:city', voter.updateInfoVoter);
      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/voter/updateInfoVoter/'
          + user.userId + '/'
          + user.partyCode + '/'
          + user.zipCode + '/'
          + user.state + '/'
          + user.city)
              .then(resp => resolve(resp.data))
              .catch(resp => reject(resp));
      })
    }

    addVoter(userId){
      //app.get('/voter/becomeVoter/:user', voter.userBecomeVoter);
      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/voter/becomeVoter/' + userId)
              .then(resp => resolve(resp.data))
              .catch(resp => reject(resp));
      })
    }
}

export default UserFunctions;
