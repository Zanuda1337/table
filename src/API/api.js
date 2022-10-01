import axios from 'axios';

const URL = process.env.REACT_APP_API;
const api = axios.create();

export const getTableData = (params) =>
  api.get(URL + '/getTableData', {
    params,
  });