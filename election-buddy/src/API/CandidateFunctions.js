import axios from 'axios';

export default class CandidateFunctions {
  URL = "https://electionbuddy.skylerlt.com:8000";
  // URL = "http://127.0.0.1:8000"; //localhost

    getCandidatebypartyCode(partyCode){
      //app.get('/candidate/session/getCandidatebypartyCode/:partyCode',  candidate.getCandidatebypartyCode);

        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/candidate/session/getCandidatebypartyCode/' + partyCode)
                .then(resp => {
                  // console.log(resp.data);
                  resolve(resp.data)})
                .catch(resp => reject(resp));
        })
    }

    getCandidateFirstName(userId) {
      /*
      //Get Fname
      app.get('/login/getFname/:ID', login.getFname);

      //Get Lname
      app.get('/login/getLname/:ID', login.getLname);
      */
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/login/getFname/' + userId
          )
                .then(resp => {
                  resolve(resp.data)
                })
                .catch(resp => reject(resp));
        })
    }

    getCandidateLastName(userId) {
      /*
      //Get Fname
      app.get('/login/getFname/:ID', login.getFname);

      //Get Lname
      app.get('/login/getLname/:ID', login.getLname);
      */
        return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/login/getLname/' + userId

          )
                .then(resp => {
                  resolve(resp.data)
                })
                .catch(resp => reject(resp));
        })
    }

    getCandidateBio(userId) {
        return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/candidate/getBio/' + userId

          )
                .then(resp => {
                  resolve(resp.data)
                })
                .catch(resp => reject(resp));
        })
    }

    updateCandidateBio(userId, bio) {
      return new Promise((resolve, reject) => {
        return axios.get(this.URL + '/candidate/updateBio/' + userId + '/' + bio

        )
              .then(resp => {
                resolve(resp.data)
              })
              .catch(resp => reject(resp));
      })
  }

    getCandidateParty(userId) {
      return new Promise((resolve, reject) => {
        return axios.get(this.URL + '/candidate/getCandidateParty/' + userId

        )
              .then(resp => {
                resolve(resp.data)
              })
              .catch(resp => reject(resp));
      })
    }

    getCandidateQuestionsAsked(userId) {
      return new Promise((resolve, reject) => {
        return axios.get(this.URL + '/question/getQuestionsAsked/' + userId

        )
              .then(resp => {
                resolve(resp.data)
              })
              .catch(resp => reject(resp));
      })
    }

    getCandidateQuestionsAnswered(userId) {
      return new Promise((resolve, reject) => {
        return axios.get(this.URL + '/question/getQuestionsAnswered/' + userId

        )
              .then(resp => {
                resolve(resp.data)
              })
              .catch(resp => reject(resp));
      })
    }

    createQuestion(asker_ID, askee_ID, question) {
      return new Promise((resolve, reject) => {
        return axios.get(this.URL + '/questions/session/createQuestion/' +
        asker_ID + '/' +
        askee_ID + '/' +
        question
      )
            .then(resp => {
              resolve(resp.data)
            })
            .catch(resp => reject(resp));
    })
    }

    // //get all candidate info
    //
    // //update Candidate info
    // app.get('/candidate/updateCandidateInfo/:userId/:partyCode/:zipCode/:state/:city/:bio/:verified', candidate.updateCandidateInfo)

    getCandidateInfo(userId){
      // app.get('/candidate/getCandidateInfo/:userId', candidate.getCandidateInfo);
        return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/candidate/getCandidateInfo/' + userId

          )
                .then(resp => {
                  resolve(resp.data)
                })
                .catch(resp => reject(resp));
        })
    }

    updateCandidateInfo(user){
      // app.get('/candidate/updateCandidateInfo/:userId/:partyCode/:zipCode/:state/:city/:bio/:verified', candidate.updateCandidateInfo)
      return new Promise((resolve, reject) => {
        return axios.get(this.URL + '/candidate/updateCandidateInfo/' +
        user.userId + '/' +
        user.partyCode + '/' +
        user.zipCode + '/' +
        user.state + '/' +
        user.city + '/' +
        user.bio
        )
              .then(resp => {
                resolve(resp.data)
              })
              .catch(resp => reject(resp));
      })
    }

    addCandidate(candidate){

    }
}
