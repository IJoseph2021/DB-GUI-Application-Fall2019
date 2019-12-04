import axios from 'axios';

class Forms {
  URL = "http://electionbuddy.skylerlt.com:8000";
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

}

export default Forms;
