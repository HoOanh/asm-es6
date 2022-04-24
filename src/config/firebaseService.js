import BaseAPI from './baseAPI.js';

export default class FireBaseService extends BaseAPI {
  getAllData(collection) {
    return this.get(collection);
  }

  getDataByKey(collection, key) {
    return this.get(`${collection}/${key}`);
  }

  createData(collection, data) {
    return this.post(collection, data);
  }

  updateData(collection, key, data) {
    return this.put(`${collection}/${key}`, data);
  }

  deleteData(collection, key) {
    return this.delete(`${collection}/${key}`);
  }
}
