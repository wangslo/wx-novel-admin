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
  //首页数据
  dataList:(params) =>{
    return orgAxios.post('/novelcms/count/simreport.html',qs.stringify(params)).then(res=>res.data);
  },
  //充值列表
  orderList:(params) =>{
    return orgAxios.post('/novelcms/order/list.html',qs.stringify(params)).then(res=>res.data);
  },
  //推广统计列表
  dataPromotionList:(params) =>{
    return orgAxios.post('/novelcms/gzh/referral/load',qs.stringify(params)).then(res=>res.data);
  },
  //推广统计数据明细
  dataPromotionDetail:(params) =>{
    return orgAxios.post('/novelcms/gzh/referral/counter',qs.stringify(params)).then(res=>res.data);
  },
  //推广统计链接删除
  deletePromotionUrl:(params) =>{
    return orgAxios.post('/novelcms/gzh/referral/del',qs.stringify(params)).then(res=>res.data);
  },

  //充值档位
  gradeList:(params) =>{
    return orgAxios.post('/novelcms/pay/gradelist.html',qs.stringify(params)).then(res=>res.data);
  },
  optionList:(params) =>{
    return orgAxios.post('/novelcms/pay/optionslist.html',qs.stringify(params)).then(res=>res.data);
  },
  customgrade:(params) =>{
    return orgAxios.post('/novelcms/pay/customgrade.html',qs.stringify(params)).then(res=>res.data);
  },
}

export const msgModuleApi = {
  // 1、获取小说接口
  getNovels:(params) =>{
    return orgAxios.post('/novelcms/gzh/novel/load',qs.stringify(params)).then(res=>res.data);
  },
  // 2、小说列表接口
  getNovelLists:(params) =>{
    return orgAxios.post('/novelcms/gzh/novel/list',qs.stringify(params)).then(res=>res.data);
  },
  // 3、小说搜索接口
  searchNovel:(params) =>{
    return orgAxios.post('/novelcms/gzh/novel/search',qs.stringify(params)).then(res=>res.data);
  },
  // 4、获取单个消息模板接口
  getSingleMsg:(params) =>{
    return orgAxios.post('/novelcms/gzh/kwd/loadsingletem',qs.stringify(params)).then(res=>res.data);
  },
  // 5、消息模板列表接口
  getMsgtem:(params) =>{
    return orgAxios.post('/novelcms/gzh/kwd/loadmsgtem',qs.stringify(params)).then(res=>res.data);
  },
  // 6、下架消息模板
  delMsgtem:(params) =>{
    return orgAxios.post('/novelcms/gzh/kwd/delmsgtem',qs.stringify(params)).then(res=>res.data);
  },
  // 7、添加消息模板
  addMsgtem:(params) =>{
    return orgAxios.post('/novelcms/gzh/kwd/addmsgtem',qs.stringify(params)).then(res=>res.data);
  },
  // 8、修改消息模板
  updateMsgtem:(params) =>{
    return orgAxios.post('/novelcms/gzh/kwd/updmsgtem',qs.stringify(params)).then(res=>res.data);
  },
  // 9、上传图片
  uploadFile:(params) =>{
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return orgAxios.post('/novelcms/file/upload/msgpic',params, config).then(res=>res.data);
  },
  // 10、根据分类获取小说接口
  getNovelsBySort:(params) =>{
    return orgAxios.post('/novelcms/gzh/novel/filter',qs.stringify(params)).then(res=>res.data);
  },
  // 11、获取书籍详情
  getBookInfos:(params) =>{
    return orgAxios.post('/novelcms/gzh/novel/chapterlist',qs.stringify(params)).then(res=>res.data);
  },
  // 12、生产推广链接
  createUrl:(params) =>{
    return orgAxios.post('/novelcms/gzh/referral/create',qs.stringify(params)).then(res=>res.data);
  },
}
