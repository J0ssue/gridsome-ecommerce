import axios from 'axios';

const baseURL = 'http://juicee-gridsome-design.test/api/';

// const Repository = axios.create({
//   baseURL,
// });
class Axios {
  constructor(url) {
    this.axios = axios;
    this.baseURL = url;
  }

  api() {
    return axios.create({
      baseURL: this.baseURL
    });
  }
}

const Repository = new Axios(baseURL);


export default Repository.api();