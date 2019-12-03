import axios from 'axios';

export default class CandidateFunctions {
  URL = "http://electionbuddy.skylerlt.com:8000";
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
}
