import qs from 'qs'
import {Message,Loading} from 'element-ui'
var baseURLStr = process.env.API_ROOT
const orgAxios = axios.create({
  baseURL: baseURLStr,
  timeout: 30000,
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
    if(response.data.code == '301000'){
      window.location.href = 'http://' + window.location.host + '/#/login'
    }
    return response;
  },
  error => {
    if (!error.response || error.response.status == 404 || error.response.status == 401 || error.response.status == 500) {
      Message.error({message: '服务器被吃了⊙﹏⊙∥'})
    }
    return Promise.reject(error)  // 返回接口返回的错误信息
  });

export const orgModuleApi = {
  login:(params) =>{
    return orgAxios.post('/novelcms/pub/dologin.html',qs.stringify(params)).then(res=>res.data);
  },
  logout:(params) =>{
    return orgAxios.post('/novelcms/pub/logout.html',qs.stringify(params)).then(res=>res.data);
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
  // banner管理
  getBannerList:(params) =>{
    return orgAxios.post('/novelcms/banner/list.html',qs.stringify(params)).then(res=>res.data);
  },
  getBannerInfo:(params) =>{
    return orgAxios.post('/novelcms/banner/info.html',qs.stringify(params)).then(res=>res.data);
  },
  setBannerOrder:(params) =>{
    return orgAxios.post('/novelcms/banner/resetodr.html',qs.stringify(params)).then(res=>res.data);
  },
  getOnlineBanner:(params) =>{
    return orgAxios.post('/novelcms/banner/online.html',qs.stringify(params)).then(res=>res.data);
  },
  editBanner:(params) =>{
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return orgAxios.post('/novelcms/banner/edit.html',params, config).then(res=>res.data);
  },
  offBanner:(params) =>{
    return orgAxios.post('/novelcms/banner/off.html', qs.stringify(params)).then(res=>res.data);
  },
  // 推荐书籍
  editRecommendBook:(params) => {
    return orgAxios.post('/novelcms/recmd/edit.html', qs.stringify(params)).then(res => res.data);
  },
  listRecommendBook:(params) => {
    return orgAxios.post('/novelcms/recmd/load.html', qs.stringify(params)).then(res => res.data);
  },
  // 推荐列表log
  getRecommendBookLogList: (params) => {
    return orgAxios.post('novelcms/recmd/list.html', qs.stringify(params)).then(res => res.data);
  },
  // 删除推荐书籍
  deleteRecommendBook: (params) => {
    return orgAxios.post('novelcms/recmd/delete.html', qs.stringify(params)).then(res => res.data);
  },
  // 推荐书籍操作记录
  recommendBookHistory: (params) => {
    return orgAxios.post('novelcms/recmd/history.html', qs.stringify(params)).then(res => res.data);
  },
  userManagerList: (params) => {
    return orgAxios.post('novelcms/gzh/userconfig/list.html', qs.stringify(params)).then(res => res.data);
  },
  userUpdateStatus: (params) => {
    return orgAxios.post('novelcms/gzh/userconfig/black.html', qs.stringify(params)).then(res => res.data);
  },
  userManagerDetail: (params) => {
    return orgAxios.post('novelcms/gzh/userconfig/detail.html', qs.stringify(params)).then(res => res.data);
  },
  userBlackList: (params) => {
    return orgAxios.post('novelcms/gzh/userconfig/blackList.html', qs.stringify(params)).then(res => res.data);
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
  // 12、生成推广链接
  createUrl:(params) =>{
    return orgAxios.post('/novelcms/gzh/referral/create',qs.stringify(params)).then(res=>res.data);
  },
  // 13、获取推广链接
  jumpPage: (params) => {
    return orgAxios.post('/novelcms/gzh/referral/findbyid', qs.stringify(params)).then(res => res.data);
  },
  //书库列表
  bookList:(params) => {
    return orgAxios.post('novelcms/gzh/noveldatabase/list', qs.stringify(params)).then(res => res.data);
  },
  //书籍切换上下架
  bookUpdateStatus:(params) => {
    return orgAxios.post('novelcms/gzh/noveldatabase/updatestatus', qs.stringify(params)).then(res => res.data);
  },
  //更改收费起始章节
  updateBookStartChapter:(params) => {
    return orgAxios.post('novelcms/gzh/noveldatabase/updatecoststartchapter', qs.stringify(params)).then(res => res.data);
  },
  //获取书库书籍详情
  getStackBookDetail:(params) => {
    return orgAxios.post('novelcms/gzh/noveldatabase/searchoptiondetails', qs.stringify(params)).then(res => res.data);
  },
  //书库分页章节查询
  getStackChapters:(params) => {
    return orgAxios.post('novelcms/gzh/noveldatabase/searchchapter', qs.stringify(params)).then(res => res.data);
  },
  //书库章节详情查询
  getStackChapterDetail:(params) => {
    return orgAxios.post('novelcms/gzh/noveldatabase/searchChapterNum', qs.stringify(params)).then(res => res.data);
  },

}
