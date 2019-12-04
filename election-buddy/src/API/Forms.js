import axios from 'axios';

class Forms {
  URL = "https://electionbuddy.skylerlt.com:8000";
  // URL = "http://127.0.0.1:8000"; //localhost

    otherIssues(content){
        return new Promise((resolve, reject) => {
            return axios.post(this.URL + '/sendEmailOtherIssues' , content)
                .then(resp => {
                  resolve(resp.data)})
                .catch(resp => reject(resp));
        })
    }

    localAuth(content){
      return new Promise((resolve, reject) => {
          return axios.post(this.URL + '/sendEmailLocalAuth', content)
              .then(resp => {
                resolve(resp.data)})
              .catch(resp => reject(resp));
      })
    }

    convertCandidate(user){
      return new Promise((resolve, reject) => {
          return axios.post(this.URL + '/candidate/session/becomeCandidate/:id' , user)
              .then(resp => {
                resolve(resp.data)})
              .catch(resp => reject(resp));
      })
    }

}

export default Forms;
