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
    return orgAxios.post('/novelcms/user/getuinfo.html',qs.stringify(params)).then(res=>res.data);
  },
  editAccountInfo:(params) =>{
    return orgAxios.post('/novelcms/user/updauth.html',qs.stringify(params)).then(res=>res.data);
  },
  addAccountInfo:(params) =>{
    return orgAxios.post('/novelcms/user/create.html',qs.stringify(params)).then(res=>res.data);
  },
  operatAccount:(params) =>{
    return orgAxios.get('/d_daccount/status',{params:params}).then(res=>res.data);
  },
  updatePwd:(params) =>{
    return orgAxios.post('/novelcms/user/updatepwd.html',qs.stringify(params)).then(res=>res.data);
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

// 消息服务接口
const msgAxios = axios.create({
  baseURL: 'http://test.dpqct.com',
  timeout: 5000,
  withCredentials: true,
});
export const msgModuleApi = {
  // 1、获取小说接口
  getNovels:(params) =>{
    return msgAxios.post('/novelcms/gzh/novel/load',qs.stringify(params)).then(res=>res.data);
  },
  // 2、小说列表接口
  getNovelLists:(params) =>{
    return msgAxios.post('/novelcms/gzh/novel/list',qs.stringify(params)).then(res=>res.data);
  },
  // 3、小说搜索接口
  searchNovel:(params) =>{
    return msgAxios.post('/novelcms/gzh/novel/search',qs.stringify(params)).then(res=>res.data);
  },
  // 4、获取单个消息模板接口
  getSingleMsg:(params) =>{
    return msgAxios.post('/novelcms/gzh/kwd/loadsingletem',qs.stringify(params)).then(res=>res.data);
  },
  // 5、消息模板列表接口
  getMsgtem:(params) =>{
    return msgAxios.post('/novelcms/gzh/kwd/loadmsgtem',qs.stringify(params)).then(res=>res.data);
  },
  // 6、下架消息模板
  delMsgtem:(params) =>{
    return msgAxios.post('/novelcms/gzh/kwd/delmsgtem',qs.stringify(params)).then(res=>res.data);
  },
  // 7、添加消息模板
  addMsgtem:(params) =>{
    return msgAxios.post('/novelcms/gzh/kwd/addmsgtem',qs.stringify(params)).then(res=>res.data);
  },
  // 8、修改消息模板
  updateMsgtem:(params) =>{
    return msgAxios.post('/novelcms/gzh/kwd/updmsgtem',qs.stringify(params)).then(res=>res.data);
  },
}
