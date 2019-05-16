import qs from 'qs'
var baseURLStr = process.env.API_ROOT
const orgAxios = axios.create({
  baseURL: baseURLStr,
  timeout: 5000,
  withCredentials: true,
});

// http request 拦截器
orgAxios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
orgAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.response || error.response.status == 404 || error.response.status == 401 || error.response.status == 500) {

    }
    return Promise.reject(error)  // 返回接口返回的错误信息
  });

export const orgModuleApi = {
  login:(params) =>{
    return orgAxios.post('/novelcms/pub/dologin.html',qs.stringify(params)).then(res=>res.data);
  },
  loginout:(params) =>{
    return orgAxios.get('/d_login/logout',{params:params}).then(res=>res.data);
  },
  loginInfo:(params) =>{
    return orgAxios.get('/d_myaccount/index',{params:params}).then(res=>res.data);
  },
  getAuthList:(params) =>{
    return orgAxios.post('/novelcms/user/privileges.html',qs.stringify(params)).then(res=>res.data);
  },
  getAccountList:(params) =>{
    return orgAxios.post('/novelcms/user/list.html',qs.stringify(params)).then(res=>res.data);
  },
  getAccountInfo:(params) =>{
    return orgAxios.get('/d_daccount/info',{params:params}).then(res=>res.data);
  },
  editAccountInfo:(params) =>{
    return orgAxios.get('/d_daccount/edit',{params:params}).then(res=>res.data);
  },
  addAccountInfo:(params) =>{
    return orgAxios.post('/novelcms/user/create.html',qs.stringify(params)).then(res=>res.data);
  },
  operatAccount:(params) =>{
    return orgAxios.get('/d_daccount/status',{params:params}).then(res=>res.data);
  },
  updatePwd:(params) =>{
    return orgAxios.get('/d_myaccount/edit',{params:params}).then(res=>res.data);
  },

  //公众号
  wechatList:(params) =>{
    return orgAxios.post('/novelcms/gzh/list.html',qs.stringify(params)).then(res=>res.data);
  },
  createWechat:(params) =>{
    return orgAxios.post('/novelcms/gzh/create.html',qs.stringify(params)).then(res=>res.data);
  },
  wechatRelationToUser:(params) =>{
    return orgAxios.post('/novelcms/user/umap.html',qs.stringify(params)).then(res=>res.data);
  },
}
export const uploadModuleApi = {
  uploadImg: (params) =>{
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return axios.post('http://test-dev.admin.dftoutiao.com/banner/upload',params,config).then(res=>res.data);
  },
}
