<template>
  <div class="imgPromotion-page">
    <div class="novel-body">
      <div class="title">
        <h3 v-show="!ifEdit" @click="editTitle">{{title}}</h3>
        <div class="edit-title" v-show="ifEdit">
          <el-input type="textarea" :rows="2" v-model="title" resize="none" autofocus="true"></el-input>
          <div class="title-btn">
            <el-button type="primary" size="mini" @click="editTitle">确认</el-button>
            <el-button size="mini" @click="editTitle">取消</el-button>
          </div>
        </div>
      </div>
      <div class="header-img">
        <el-upload
          class="avatar-uploader"
          action=""
          drag>
          <img src="" class="avatar">
          <div class="el-upload__text">
            <span style="margin-bottom: 20px;">请将图片拖至此</span>
            <span>（上传图片尺寸为XXX*XXX）</span>
            <span>可上传本地图片，支持jpg、jpeg、png格式，大小不超过2M，</span>
            <span>请勿上传含版权争议的图片</span>
          </div>
        </el-upload>
      </div>
      <section class="content">
        <h3>第1章 兵王‘凌天’</h3>
        <p>古香古色的房间里，凌天突然醒了。

          　　“不好，中计了！”

          　　他甚至来不及睁开眼睛，就下意识抬手往身下一拍，想借助反震之力跃起、逃离……

          　　这是一个优秀特种兵的本能反应！

          　　手刚落下，触电般的酸痛传来，一阵无力。

          　　我怎么会这么虚弱？！

          　　心中猛然一颤之时，凌天睁开了双眼。

          　　“天儿，你终于醒了。”

          　　耳边传来一阵温柔而惊喜的女人的声音。

          　　凌天闻声看去，看到了一张精致的面孔，正一脸关怀地注视着他。

          　　这是一位古典美女，美得让人窒息，完全可以用倾国倾城来形容她的美貌。

          　　这是怎么回事？

          　　我不是中了R国人的诡计，被乱枪射杀了吗？

          　　凌天的脑海里，涌入一段熟悉的回忆……

          　　凌天，华国人。

          　　曾在华国最出色的狼牙特种作战部队服役，服役期间，立功无数。

          　　他参加过世界级特种兵比试，赢得单兵作战能力第一的个人荣誉，被公认为‘兵王之王’！

          　　后来，在一次跨国SSS级任务中，因为他个人的一点小过失，导致一位战友牺牲。

          　　自责之下，他选择退役，离开了狼牙。

          　　退役后，他沉寂了一段时间，选择了出国，成为了国际上最具盛名的某雇佣兵组织中的王牌。

          　　只要是他出手的任务，成功率就是前无古人的百分百！

          　　虽从狼牙退役多年，但他还是心系祖国。

          　　只要是对华国不利的任务，他不只不会接，还会揪出发布任务之人，进行惨无人道的虐杀。

          　　久而久之，他成为了除华国外各国的眼中钉、肉中刺。

          　　在别的国家眼里，他就是一颗定时炸弹。

          　　只要是他去过的地方，都会掀起一场腥风血雨。

          　　各国开始围绕他进行各种阴谋，不惜花费重金雇佣世界顶尖杀手……

          　　然而，随着一个个杀手人间蒸发，凌天却是越活越滋润，再也没有杀手敢接这个‘死亡任务’。

          　　杀凌天，无异于自寻死路！

          　　这是世界雇佣兵界、杀手界公认的一句话。

          　　凌天，不只是一位强大的兵王，更是一位修炼出了内力的形意拳宗师……

          　　纵观地球，罕逢敌手，不曾一败！

          　　前不久，凌天从自己最信任的经纪人那里收到一个消息。</p>
      </section>
      <div class="footer-img">
        <el-upload
          class="avatar-uploader"
          action=""
          drag>
          <img src="" class="avatar">
          <div class="el-upload__text">
            <span style="margin-bottom: 20px;">请将图片拖至此</span>
            <span>（上传图片尺寸为XXX*XXX）</span>
            <span>可上传本地图片，支持jpg、jpeg、png格式，大小不超过2M，</span>
            <span>请勿上传含版权争议的图片</span>
          </div>
        </el-upload>
      </div>
      <div class="footer">
        <span>点击下方“阅读原文”查看更多</span>
      </div>
    </div>
    <div class="right-box">
      <div class="right-box-inner">
        <div class="right-content">
          <h3>（功能操作）</h3>
          <div class="create-box" @click="closeCreateBox">生成推广链接</div>
        </div>
      </div>
    </div>
    <div class="dialog-box">
      <el-dialog title="生成《凌天战尊》推广链接" :visible.sync="createDialog" width="500px">
        <div class="dialog-body">
          <span>渠道名称默认带入“日期”，可自行修改！</span>
          <div class="url_param">
            <span class="channel">渠道名称：</span>
            <el-input v-model="channel_name" style="width: 200px;" size="mini"></el-input>
          </div>
          <div class="url_param">
            <span>强关设置：</span>
            <el-radio v-model="concern" label="1">强制关注</el-radio>
            <el-radio v-model="concern" label="2">主动关注</el-radio>
            <el-radio v-model="concern" label="3">不设置强关</el-radio>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialog = false">取 消</el-button>
          <el-button type="primary" @click="goToPromo">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'imgPromotion',
    data() {
      return {
        ifEdit: false,
        title: '为了心爱女人的手术费，他忍痛卖血……',
        createDialog: false,
        channel_name: '',
        concern: 2,
      }
    },
    methods: {
      editTitle() {
        this.ifEdit = !this.ifEdit
      },
      closeCreateBox() {
        this.createDialog = !this.createDialog
      },
      goToPromo() {
        this.$router.push({
          name: 'promotion'
        })
      }
    }
  }
</script>
<style lang="scss">
  .imgPromotion-page{
    width: 740px;
    margin: 0 auto;
    .novel-body{
      padding-left: 20px;
      padding-right: 20px;
      .title{
        .edit-title{
          margin-top: 20px;
          .title-btn{
            float: right;
          }
        }
      }
      .header-img{
        text-align: center;
        .avatar-uploader{
          .el-upload-dragger{
            width: 700px;
            height: 300px;
            padding-top: 50px;
            span{
              display: block;
            }
          }
        }
      }
      .content{
        padding: 30px;
        background: #e8e8e7;
        border-left: 2px solid #E44A40;
      }
      .footer-img{
        text-align: center;
        .avatar-uploader{
          .el-upload-dragger{
            width: 700px;
            height: 200px;
            padding-top: 20px;
            span{
              display: block;
            }
          }
        }
      }
      .footer{
        margin-bottom: 50px;
      }
    }
    .right-box{
      position: fixed;
      top: 20px;
      left: 0;
      right: 0;
      color: #717375;
      text-align: center;
      .right-box-inner{
        position: relative;
        width: 740px;
        margin-left: auto;
        margin-right: auto;
        .right-content{
          width: 180px;
          right: -198px;
          box-shadow: rgba(30, 30, 30, 0.027451) 2px 4px 16px;
          border: 1px solid rgb(222, 222, 222);
          position: absolute;
          top: 0;
          padding: 5px;
          background-color: #fff;
          word-wrap: break-word;
          word-break: break-all;
          h3{
            background: #6a7583;
            color: white;
            padding: 8px;
            font-size: 14px;
            margin: 0;
            border-radius: 4px;
          }
          .create-box{
            width: 120px;
            font-size: 14px;
            line-height: 1;
            margin: 20px auto;
            padding: 10px 8px;
            background: #4caf50;
            color: #ffffff;
            border-radius: 4px;
          }
        }
      }
    }
    .dialog-box{
      .dialog-body{
        text-align: left;
      }
      .url_param{
        display: flex;
        margin-top: 20px;
        span{
          line-height: 1;
        }
        .channel{
          margin-top: 5px;
        }
        .el-radio{
          margin-right: 10px;
          line-height: 1;
        }
      }
    }
  }
</style>
