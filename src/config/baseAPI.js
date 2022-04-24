export default class BaseAPI {
  URL = 'https://asm-es6-9c736-default-rtdb.firebaseio.com';
  //get data
  get = async (collection) => {
    try {
      const response = await axios.get(`${this.URL}/${collection}.json`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  // add new data to collection
  post = async (collection, data) => {
    try {
      return await axios.post(`${this.URL}/${collection}.json`, data);
    } catch (err) {
      console.error(err);
    }
  };

  // update data to collection
  put = async (collection, data) => {
    try {
      return await axios.put(`${this.URL}/${collection}.json`, data);
    } catch (err) {
      console.error(err);
    }
  };

  // deleted collection
  delete = async (collection) => {
    try {
      return await axios.delete(`${this.URL}/${collection}.json`);
    } catch (err) {
      console.error(err);
    }
  };
}
