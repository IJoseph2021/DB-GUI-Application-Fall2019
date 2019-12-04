/*
exports.becomeCandidate = function(req,res){
    mysqlConnection.query(`INSERT INTO CANDIDATE(USERID) VALUES(${req.session.userId})`,function(err,rows,fields){
        if(err){
            res.send("err");
        } else {
            res.send("candidate updated");
        }
    });
}
*/

import axios from 'axios';

class AdminFunctions {
  URL = "https://electionbuddy.skylerlt.com:8000";
  // URL = "http://127.0.0.1:8000"; //localhost

    verifyCandidate(user){
        return new Promise((resolve, reject) => {
            return axios.get(this.URL + '/admin/session/verify/' +  user.userId)
                .then(resp => {
                  resolve(resp.data)})
                .catch(resp => reject(resp));
        })
    }

    getUnverified(){
      return new Promise((resolve, reject) => {
          return axios.get(this.URL + '/admin/getUnverified/')
              .then(resp => {
                resolve(resp.data)})
              .catch(resp => reject(resp));
      })
    }



}

export default AdminFunctions;
