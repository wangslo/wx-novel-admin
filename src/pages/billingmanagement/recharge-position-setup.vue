<template>
    <div class="menu-config-page">
        <div class="menu-config-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >计费管理</el-breadcrumb-item>
                <el-breadcrumb-item >充值档位配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row >
            <div style="margin-left: 50px;font-weight:bold;background-color: #fcf8e3;padding: 20px;"><i class="el-icon-thumb"></i> {{titleAlertMsg}}</div>
        </el-row>
        <el-row  v-if="!nextButton" :gutter="40" style="margin-left: 50px;">
            <el-col :span="6">
                <div class="grid-content" id="noaddtion">
                    <h2>
                        无充赠档位
                    </h2>
                    <p>低额度，无赠币，吸引低R用户，至多1个</p>
                    <div style="max-height: 1px;min-height: 1px;over-flow:hidden;margin:6px 0 5px"></div>
                    <ul >
                        <template v-for="(item, index) in noAdditions">
                            <div :class="`level-item level-item${item.id}`">
                            <li class="page-c-recharge-item" @click="rechargeItemClick(index,$event)" :data-payid="item.id" data-type="normal">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>{{item.bookCoin}}</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle">

                                    </h5>
                                    <span class="page-c-recharge-num">￥{{item.money}}</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" class="one-first-level" @click="oneFirstLevelClick(index,$event)" name="onefirstPay" :value="item.id">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                        </template>
                    </ul>
                    <p>若选定为首充，只会给未充值过的用户展现，用户充值后消失，且该档位不占用6个档位名额</p>
                </div>


            </el-col>
            <el-col :span="10">
                <div class="grid-content">
                    <h2>
                        常规充赠档位
                    </h2>
                    <p>档位越高，赠币比例越高，选择档位后，可以在其中选择至多2个作为首充档位，首充金额为充值金额-2元，用户已充值过任何一档将不再满足首充优惠，充赠比>1:1（例30元档，首充为充28元赠3200书券，若用户已充值过任一档，该档位回落30元赠1000书券）</p>
                    <div style="max-height: 1px;min-height: 1px;over-flow:hidden;margin:6px 0 5px"></div>
                    <ul >
                        <template v-for="(item, index) in normalAdditions">
                            <div :class="`level-item level-item${item.id}`">
                            <li class="page-c-recharge-item" @click="rechargeItemClick(index,$event)" :data-payid="item.id" data-type="gift">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>得{{item.bookCoin}}</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle" style="color:rgb(255, 136, 0);">
                                        {{item.addition}}
                                    </h5>
                                    <span class="page-c-recharge-num">￥{{item.money}}</span>
                                </div>
                            </li>
                            <div class="first-recharge">
                                <div class="first-recharge-check">
                                    <input type="checkbox" class="first-level" @click="firstLevelClick(index,$event)" name="firstPay" :value="item.id">
                                    <h5>首充</h5>
                                </div>
                            </div>
                        </div>
                        </template>
                    </ul>
                </div>


            </el-col>
            <el-col :span="7">
                <div class="grid-content">
                    <h2>
                        包年档位
                    </h2>
                    <p>包年书库免费权益</p>
                    <div style="max-height: 1px;min-height: 1px;over-flow:hidden;margin:6px 0 5px"></div>
                    <ul >
                        <template v-for="(item, index) in yearAdditions">
                            <div class="level-item">
                            <li class="page-c-recharge-item orange" @click="rechargeItemClick(index,$event)" :data-payid="item.id" data-type="sale">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title">
                                        <span>包年VIP</span>
                                    </h4>
                                    <h5 class="page-c-recharge-mtitle" >
                                        获得包年VIP特权
                                    </h5>
                                    <span class="page-c-recharge-num">￥{{item.money}}</span>
                                </div>
                            </li>
                        </div>
                        </template>
                    </ul>
                </div>


            </el-col>


        </el-row>


        <el-row v-if="!nextButton">
            <el-button-group style="float: right">
                <el-button type="primary" size="mediumn" style="width: 70px" @click="clickButton('return')">返回</el-button>
                <el-button type="primary" size="mediumn" style="text-align:center; margin:0 30px;" @click="clickButton('next')">下一步</el-button>
            </el-button-group>
        </el-row>

        <el-row v-if="nextButton" :gutter="10" >
            <el-col :span="6">
                <div class="grid-content bg-purple menu-pic" @click="changeType(1)" style="background-image: url('//ywopen-1252317822.file.myqcloud.com/openwx/recommendimg/20190117/5c40386892ccd.png')">
                    <div  class="menu-check" :style="{'display' : index == 0 ? 'block' : 'none'}"><i class="fa fa-check-circle"></i></div>
                    <div style="border: 0;width: 100%;margin-top: 220px;">
                        <ul style="margin:10px 5px 0 5px;list-style: none;">
                            <!--<template v-for="(liItem,index2) in item.grades">-->
                                <!--<li :class="{'page-c-recharge-item':true,'red':liItem.first,'orange':liItem.option.type}">-->
                                    <!--<div class="page-c-recharge-box">-->
                                        <!--<h4 class="page-c-recharge-title"><span>得</span>{{liItem.option.times*liItem.option.amount}}</h4>-->
                                        <!--<h5 class="page-c-recharge-mtitle" v-if="liItem.option.addition">{{liItem.option.addition}}</h5>-->
                                        <!--<span class="page-c-recharge-num">¥{{liItem.option.amount}}</span>-->
                                    <!--</div>-->
                                <!--</li>-->
                            <!--</template>-->
                            <li class="page-c-recharge-item red">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title"><span>得</span>900</h4>
                                    <h5 class="page-c-recharge-mtitle" >asdfasdf</h5>
                                    <span class="page-c-recharge-num">¥9</span>
                                </div>
                            </li>
                            <li class="page-c-recharge-item orange">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title"><span>得</span>900</h4>
                                    <h5 class="page-c-recharge-mtitle" >asdfasdf</h5>
                                    <span class="page-c-recharge-num">¥9</span>
                                </div>
                            </li>
                            <li class="page-c-recharge-item red">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title"><span>得</span>900</h4>
                                    <h5 class="page-c-recharge-mtitle" >asdfasdf</h5>
                                    <span class="page-c-recharge-num">¥9</span>
                                </div>
                            </li>
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title"><span>得</span>900</h4>
                                    <h5 class="page-c-recharge-mtitle" >asdfasdf</h5>
                                    <span class="page-c-recharge-num">¥9</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style="width: 300px;
                        margin: 30px 1px 30px 160px;
                        height: 330px;
                        float: left;
                        cursor: pointer;
                        background-size: 100%;
                        background-repeat: no-repeat;
                        font-size: medium;
                        text-align: center;
                    ">
                    首充用户展示档位形态
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple menu-pic" @click="changeType(1)" style="background-image: url('//ywopen-1252317822.file.myqcloud.com/openwx/recommendimg/20190117/5c40386892ccd.png')">
                    <div  class="menu-check" :style="{'display' : index == 0 ? 'block' : 'none'}"><i class="fa fa-check-circle"></i></div>
                    <div style="border: 0;width: 100%;margin-top: 220px;">
                        <ul style="margin:10px 5px 0 5px;list-style: none;">
                            <!--<template v-for="(liItem,index2) in item.grades">-->
                            <!--<li :class="{'page-c-recharge-item':true,'red':liItem.first,'orange':liItem.option.type}">-->
                            <!--<div class="page-c-recharge-box">-->
                            <!--<h4 class="page-c-recharge-title"><span>得</span>{{liItem.option.times*liItem.option.amount}}</h4>-->
                            <!--<h5 class="page-c-recharge-mtitle" v-if="liItem.option.addition">{{liItem.option.addition}}</h5>-->
                            <!--<span class="page-c-recharge-num">¥{{liItem.option.amount}}</span>-->
                            <!--</div>-->
                            <!--</li>-->
                            <!--</template>-->
                            <li class="page-c-recharge-item red">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title"><span>得</span>900</h4>
                                    <h5 class="page-c-recharge-mtitle" >asdfasdf</h5>
                                    <span class="page-c-recharge-num">¥9</span>
                                </div>
                            </li>
                            <li class="page-c-recharge-item orange">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title"><span>得</span>900</h4>
                                    <h5 class="page-c-recharge-mtitle" >asdfasdf</h5>
                                    <span class="page-c-recharge-num">¥9</span>
                                </div>
                            </li>
                            <li class="page-c-recharge-item red">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title"><span>得</span>900</h4>
                                    <h5 class="page-c-recharge-mtitle" >asdfasdf</h5>
                                    <span class="page-c-recharge-num">¥9</span>
                                </div>
                            </li>
                            <li class="page-c-recharge-item">
                                <div class="page-c-recharge-box">
                                    <h4 class="page-c-recharge-title"><span>得</span>900</h4>
                                    <h5 class="page-c-recharge-mtitle" >asdfasdf</h5>
                                    <span class="page-c-recharge-num">¥9</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style="width: 300px;
                        margin: 30px 1px 30px 160px;
                        height: 330px;
                        float: left;
                        cursor: pointer;
                        background-size: 100%;
                        background-repeat: no-repeat;
                        font-size: medium;
                        text-align: center;
                    ">
                    非首充用户展现档位形态
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple menu-pic" @click="changeType(1)" >
                    <div  class="menu-check" :style="{'display' : index == 0 ? 'block' : 'none'}"><i class="fa fa-check-circle"></i></div>
                    <div style="border: 0;width: 100%;margin-top: 220px;">

                    </div>
                </div>
                <div style="width: 300px;
                        margin: 30px 1px 30px 160px;
                        height: 330px;
                        float: left;
                        cursor: pointer;
                        background-size: 100%;
                        background-repeat: no-repeat;
                        font-size: medium;
                        text-align: center;
                    ">
                    <el-button-group style="float: left">
                        <el-button type="primary" size="mediumn" style="" @click="clickButton('returnEdit')">返回编辑</el-button>
                        <el-button type="primary" size="mediumn" style="text-align:center; margin:0 30px;" @click="clickButton('confirmEdit')">确认修改</el-button>
                    </el-button-group>
                </div>
            </el-col>

        </el-row>




        <div class="dialog-div">
            <el-dialog title="消息提示" :visible.sync="defriendDialog" width="500px" center>
                <span>{{tmpMsg}}</span>
                <span slot="footer" class="dialog-footer">
            <el-button @click="defriendDialog = false">取 消</el-button>
            <el-button type="primary" @click="ajaxChange">确 认</el-button>
          </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>


  import ElRow from 'element-ui/packages/row/src/row'
  import {orgModuleApi} from '../../api/main'
  export default {
    components: {ElRow},
    name: 'recharge-position-setup',
    data() {
      return {
        defriendDialog: false,
        wechatType:1,
        tmpWechatType:1,
        titleAlertMsg:"规则：一共可以选择6个档位，其中至多两个为首充档位，至多一个为无充赠档位；若选择无充赠档位为首充档位，则该档位不计入总共6个档位中",
        tmpMsg:"确认了吗？",
        ulList:[],
        nextButton:false,
        noAdditions:[],
        normalAdditions:[],
        yearAdditions:[],
      }
    },
    created() {
      this.getGradeList()
      console.log('created')
      this.getOptionList()
      //this.customgrade()


    },
    mounted:function(){
      this.clickinit()
      this.clickOption()
    },
    methods: {
      clickButton(action){
        if(action == 'next'){
          this.titleAlertMsg = "请确认充值档位"
          this.nextButton = true;
        }else if(action == 'returnEdit'){
          this.titleAlertMsg = "规则：一共可以选择6个档位，其中至多两个为首充档位，至多一个为无充赠档位；若选择无充赠档位为首充档位，则该档位不计入总共6个档位中"
          this.nextButton = false;
        }else if(action == 'confirmEdit' || action == 'return'){
          this.$router.push({
            name:'rechargePosition',
          })
        }
      },
      oneFirstLevelClick(index,event){
        let _this = event.currentTarget
        let _levels = []
          , _firstLevels = []
          , _normalLevels = []
          , _oneFirstLevel = 0;
        let _m = {
          most: '最多',
          must: '必须',
          two: '选择2个常规充赠档位为首充档位',
          six: '选择6个充值档位（不含无充赠档位作为首充档位）',
          seven: '选择7个充值档位（含无充赠档位作为首充档位）',
        };
        var val = Number($(_this).val())
          , node = $('.level-item' + val);
        if ($(_this).is(":checked")) {
          var nval = 0;
          if (_normalLevels.length > 0) {
            nval = _normalLevels[0];
          }
          if (nval != val) {
            $('.level-item' + nval).removeClass('level-item-checked');
            $('.first-level' + nval).removeAttr("checked");
            $.inArray(nval, _levels) > -1 === true && _levels.splice($.inArray(nval, _levels), 1);
            _normalLevels.splice(0, 1);
            _normalLevels.push(val);
          }
          _oneFirstLevel = val;
        } else {
          _oneFirstLevel = 0;
          $.inArray(val, _firstLevels) > -1 === true && _firstLevels.splice($.inArray(val, _firstLevels), 1);
        }
        if ($(_this).is(":checked") && !node.hasClass('level-item-checked')) {
          if (_levels.length > 6) {
            _dialog.alert(_m.most + _m.seven);
            $(_this).removeAttr("checked");
            _oneFirstLevel = 0;
            return false;
          }
          _levels.push(val);
          node.addClass('level-item-checked');
        }
      },
      firstLevelClick(index,event){
        let _this = event.currentTarget
        let _levels = []
          , _firstLevels = []
          , _normalLevels = []
          , _oneFirstLevel = 0;
        let _m = {
          most: '最多',
          must: '必须',
          two: '选择2个常规充赠档位为首充档位',
          six: '选择6个充值档位（不含无充赠档位作为首充档位）',
          seven: '选择7个充值档位（含无充赠档位作为首充档位）',
        };
        var val = Number($(_this).val())
          , node = $('.level-item' + val);
        console.log('val:'+ val)
        if ($(_this).is(":checked")) {
          if (_firstLevels.length > 1) {
            _dialog.alert(_m.most + _m.two);
            $(_this).removeAttr("checked");
            return false;
          }
          _firstLevels.push(val);
        } else {
          $.inArray(val, _firstLevels) > -1 === true && _firstLevels.splice($.inArray(val, _firstLevels), 1);
        }
        if ($(_this).is(":checked") && !node.hasClass('level-item-checked')) {
          if (_levels.length > 5) {
            _dialog.alert(_m.most + _m.six);
            $(_this).removeAttr("checked");
            $.inArray(val, _firstLevels) > -1 === true && _firstLevels.splice($.inArray(val, _firstLevels), 1);
            return false;
          }
          _levels.push(val);
          node.addClass('level-item-checked');
        }
      },
      rechargeItemClick(index,event){
        let _this = event.currentTarget
        let _levels = []
          , _firstLevels = []
          , _normalLevels = []
          , _oneFirstLevel = 0;
        let _m = {
          most: '最多',
          must: '必须',
          two: '选择2个常规充赠档位为首充档位',
          six: '选择6个充值档位（不含无充赠档位作为首充档位）',
          seven: '选择7个充值档位（含无充赠档位作为首充档位）',
        };
        let node = $(_this).parent('.level-item')
          , val = $(_this).data('payid')
          , type = $(_this).data('type');
        if (node.hasClass('level-item-checked')) {
          $('.first-level' + val).removeAttr("checked");
          $.inArray(val, _firstLevels) > -1 === true && _firstLevels.splice($.inArray(val, _firstLevels), 1);
          $.inArray(val, _levels) > -1 === true && _levels.splice($.inArray(val, _levels), 1);
          $.inArray(val, _normalLevels) > -1 === true && _normalLevels.splice($.inArray(val, _normalLevels), 1);
          node.removeClass('level-item-checked');
        } else {
          console.log('this is color change')
          console.log(type)
          if (type == 'normal') {
            if (_normalLevels.length > 0) {
              var nval = _normalLevels[0];
              $('.level-item' + nval).removeClass('level-item-checked');
              $('.first-level' + nval).removeAttr("checked");
              $.inArray(nval, _levels) > -1 === true && _levels.splice($.inArray(nval, _levels), 1);
              _oneFirstLevel = 0;
              _normalLevels.splice(0, 1);
            }
            if ((_levels.length < 6 && _oneFirstLevel == 0) || (_levels.length < 7 && _oneFirstLevel > 0)) {
              _normalLevels.push(val);
            }
          }
          if (_levels.length > 5 && _oneFirstLevel == 0) {
            _dialog.alert(_m.most + _m.six);
            return false;
          }
          if (_levels.length > 6 && _oneFirstLevel > 0) {
            _dialog.alert(_m.most + _m.seven);
            return false;
          }
          _levels.push(val);
          console.log(_levels)
          node.addClass('level-item-checked');
          console.log('doneslsl')
        }
      },
      clickinit(){
        console.log('clickinit')
          $('.first-level').each(function() {
            $(this).removeAttr("checked");
          });
          $('.one-first-level').each(function() {
            $(this).removeAttr("checked");
          });
      },
      clickOption(){
        let _levels = []
          , _firstLevels = []
          , _normalLevels = []
          , _oneFirstLevel = 0;
        let _m = {
          most: '最多',
          must: '必须',
          two: '选择2个常规充赠档位为首充档位',
          six: '选择6个充值档位（不含无充赠档位作为首充档位）',
          seven: '选择7个充值档位（含无充赠档位作为首充档位）',
        };



          $('.first-level').click(function() {
            var val = Number($(this).val())
              , node = $('.level-item' + val);
            if ($(this).is(":checked")) {
              if (_firstLevels.length > 1) {
                _dialog.alert(_m.most + _m.two);
                $(this).removeAttr("checked");
                return false;
              }
              _firstLevels.push(val);
            } else {
              $.inArray(val, _firstLevels) > -1 === true && _firstLevels.splice($.inArray(val, _firstLevels), 1);
            }
            if ($(this).is(":checked") && !node.hasClass('level-item-checked')) {
              if (_levels.length > 5) {
                _dialog.alert(_m.most + _m.six);
                $(this).removeAttr("checked");
                $.inArray(val, _firstLevels) > -1 === true && _firstLevels.splice($.inArray(val, _firstLevels), 1);
                return false;
              }
              _levels.push(val);
              node.addClass('level-item-checked');
            }
          });
          $('.one-first-level').click(function() {
            var val = Number($(this).val())
              , node = $('.level-item' + val);
            if ($(this).is(":checked")) {
              var nval = 0;
              if (_normalLevels.length > 0) {
                nval = _normalLevels[0];
              }
              if (nval != val) {
                $('.level-item' + nval).removeClass('level-item-checked');
                $('.first-level' + nval).removeAttr("checked");
                $.inArray(nval, _levels) > -1 === true && _levels.splice($.inArray(nval, _levels), 1);
                _normalLevels.splice(0, 1);
                _normalLevels.push(val);
              }
              _oneFirstLevel = val;
            } else {
              _oneFirstLevel = 0;
              $.inArray(val, _firstLevels) > -1 === true && _firstLevels.splice($.inArray(val, _firstLevels), 1);
            }
            if ($(this).is(":checked") && !node.hasClass('level-item-checked')) {
              if (_levels.length > 6) {
                _dialog.alert(_m.most + _m.seven);
                $(this).removeAttr("checked");
                _oneFirstLevel = 0;
                return false;
              }
              _levels.push(val);
              node.addClass('level-item-checked');
            }
          });
          $('#nextBtn').click(function() {
            if (_levels.length != 6 && _oneFirstLevel == 0) {
              _dialog.alert(_m.must + _m.six);
              return false;
            }
            if (_levels.length != 7 && _oneFirstLevel > 0) {
              _dialog.alert('由于您选择无充赠档位为首充档位，则其他档位数量必须满足6个');
              return false;
            }
            var level = _levels.join('|')
              , first = _firstLevels.join('|');
            location.href = '/service/billinfo/preLevel?level=' + level + '&first=' + first + '&one_first=' + _oneFirstLevel;
          });

      },
      getOptionList(){
        var params = {}
        var _this = this
        orgModuleApi.optionList(params).then((res)=>{
          console.log(res)

          if(res.success){
            res.data.map((item,index)=>{
              if(item.type == 0 && item.addition == 0){
                _this.noAdditions.push({
                  id: item.id,
                  money:item.amount,
                  bookCoin:item.amount*item.times,
                })
              }else if(item.type == 0 && item.addition > 0){
                _this.normalAdditions.push({
                  id: item.id,
                  money:item.amount,
                  addition:item.addition,
                  bookCoin:item.amount*item.times,
                })
              }else if(item.type > 0){
                _this.yearAdditions.push({
                  id: item.id,
                  money:item.amount,
                })
              }
            })

          }
        })
      },
      customgrade(){
        var params = {}
        var _this = this
        params = {
          id:1,
          appid: this.common.appid,
          grades:{"1":true,"2":true,"3":true,"4":true},
        }
        orgModuleApi.customgrade(params).then((res)=>{
          console.log(res)

//          if(res.success){
//            res.data.data.map((item,index)=>{
//              _this.tableData.push({
//                id: item.id,
//                account: item.username,
//                realName: item.name,
//                branch: item.dept,
//                createTime: _this.common.getDate((item.registDate/1000)),
//                status: item.status==1?'正常':'禁用',
//              })
//            })
//            _this.totalSize = parseInt(res.data.total)
//          }
        })
      },
      gradeActive(){
        var params = {}
        var _this = this
        params = {
          appid:this.common.appid,
        }
        orgModuleApi.gradeList(params).then((res)=>{
          console.log(res)

//          if(res.success){
//            res.data.data.map((item,index)=>{
//              _this.tableData.push({
//                id: item.id,
//                account: item.username,
//                realName: item.name,
//                branch: item.dept,
//                createTime: _this.common.getDate((item.registDate/1000)),
//                status: item.status==1?'正常':'禁用',
//              })
//            })
//            _this.totalSize = parseInt(res.data.total)
//          }
        })
      },
      getGradeList(){
        var params = {}
        var _this = this
        params = {
          appid: this.common.appid,
        }
        orgModuleApi.gradeList(params).then((res)=>{
          console.log(res)
          this.ulList = res.data;

//          if(res.success){
//            res.data.data.map((item,index)=>{
//              _this.tableData.push({
//                id: item.id,
//                account: item.username,
//                realName: item.name,
//                branch: item.dept,
//                createTime: _this.common.getDate((item.registDate/1000)),
//                status: item.status==1?'正常':'禁用',
//              })
//            })
//            _this.totalSize = parseInt(res.data.total)
//          }
        })
      },
      ajaxChange(){
        this.defriendDialog = false
        this.wechatType = this.tmpWechatType
      },
      changeType(index) {
        this.defriendDialog = true
        this.tmpWechatType = index
        console.log(index)
      },
      openDialog() {
        this.useDialog = true
      }
    }
  }
</script>
<style lang="scss" scoped>
    h4 {
        margin-top: 1px;
        margin-bottom: 0px
    }

    .level-container {
        width: 1200px;
        margin: 0 auto
    }

    .level-pic {
        width: 280px;
        margin: 20px 10px 0;
        height: 512px;
        float: left;
        cursor: pointer;
        background-size: 100%;
        background-repeat: no-repeat;
        position: relative
    }

    .level-tips {
        width: 280px;
        margin: 10px 10px;
        float: left;
        font-size: 17px
    }

    .level-check {
        width: 70px;
        height: 50px;
        top: 160px;
        left: 100px;
        font-size: 90px;
        z-index: 1000;
        color: #0A0;
        position: absolute;
        display: none
    }

    .pic-checked {
        width: 283px;
        border: 3px solid #0A0
    }

    .page-c-recharge-list {
        font-size: 0
    }

    .page-c-recharge-item {
        width: calc(50% - 1.4rem);
        display: inline-block;
        vertical-align: top;
        margin-bottom: .9375rem;
        color: #333;
        position: relative
    }

    .page-c-recharge-box {
        overflow: hidden;
        min-height: 4.75rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        border-radius: .5rem;
        position: relative;
        padding: .7rem 0 .5rem;
        color: #333
    }

    .page-c-recharge-box::before {
        position: absolute;
        content: '';
        right: 0;
        bottom: 0;
        top: 0;
        left: 0
    }

    .page-c-recharge-item.orange {
        color: #F80
    }

    .page-c-recharge-item.orange .page-c-recharge-box {
        color: #fff;
        box-shadow: 0 4px 8px 0 rgba(255, 136, 0, 0.2);
        background-color: #F80
    }

    .page-c-recharge-item.orange .page-c-recharge-box::before {
        background: url(//ywopen-1252317822.file.myqcloud.com/openwx/recommendimg/20190115/5c3d88ee52ee9.png) no-repeat bottom right;
        background-size: contain
    }

    .page-c-recharge-item.red {
        color: #FF002B
    }

    .page-c-recharge-item.red .page-c-recharge-box {
        color: #fff;
        box-shadow: 0 4px 8px 0 rgba(255, 0, 43, 0.2);
        background-color: #FF002B
    }

    .page-c-recharge-item.red .page-c-recharge-box::before {
        background: url(//ywopen-1252317822.file.myqcloud.com/openwx/recommendimg/20190115/5c3d88ee63c6f.png) no-repeat bottom right;
        background-size: contain
    }

    .page-c-recharge-item.gray .page-c-recharge-mtitle {
        position: absolute;
        left: 0;
        right: 0;
        color: #F80;
        margin: auto;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden
    }

    .page-c-recharge-item.gray .page-c-recharge-title {
        margin-bottom: 2px;
        margin-top: 0px
    }

    .page-c-recharge-item.gray .page-c-recharge-num {
        padding-top: 1.085rem;
        padding-bottom: 0
    }

    .page-c-recharge-item.gray .page-c-recharge-box {
        border: 1px solid #E6E9EB
    }

    .page-c-recharge-item.red::after,.page-c-recharge-item.orange::after {
        position: absolute;
        content: '优惠';
        font-size: .75rem;
        width: 2.375rem;
        height: 1.125rem;
        background: url("data:image/svg+xml,%3Csvg width='38' height='18' viewBox='0 0 38 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h30a8 8 0 0 1 8 8v10H7.209a4 4 0 0 1-3.905-3.132L0 0z' fill='%23FFBB68' fill-rule='evenodd'/%3E%3C/svg%3E") center center no-repeat;
        background-size: cover;
        right: 0;
        top: 0;
        color: #FFF;
        text-align: center
    }

    .page-c-recharge-item.red::after {
        content: '首充';
        background: url("data:image/svg+xml,%3Csvg width='38' height='18' viewBox='0 0 38 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h30a8 8 0 0 1 8 8v10H7.209a4 4 0 0 1-3.905-3.132L0 0z' fill='%23FF7D7D' fill-rule='evenodd'/%3E%3C/svg%3E") center center no-repeat;
        background-size: cover
    }

    .page-c-recharge-item:nth-of-type(even) {
        margin-left: .4rem
    }

    .page-c-recharge-item:nth-of-type(odd) {
        margin-right: .4rem
    }

    .page-c-recharge-title {
        position: relative;
        color: currentColor;
        font-size: 22px;
        text-align: center;
        line-height: 1
    }

    .page-c-recharge-title span {
        font-size: .75rem;
        color: currentColor;
        margin-right: 5px
    }

    .page-c-recharge-mtitle {
        font-size: .75rem;
        color: currentColor;
        position: relative;
        text-align: center;
        margin-bottom: 0;
        margin-top: 2px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden
    }

    .page-c-recharge-num {
        font-family: 'special';
        color: currentColor;
        font-size: 18px;
        display: block;
        position: relative;
        text-align: center;
        margin-right: .3125rem
    }

    .page-c-recharge-mnum {
        text-decoration: line-through;
        font-weight: normal;
        margin-left: .3125rem;
        color: currentColor;
        font-style: normal;
        font-size: .75rem
    }

    .level-show {
        border: 0;
        width: 100%;
        margin-top: 180px
    }




    .level-item {
        display: inline-block;
        padding: 10px 5px 10px 10px;
        margin: 0 10px 10px 0;
        border-radius: 8px;
        border: 1px solid #eee;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    }
    .level-item-checked {
        border: 1px solid #00AA00;
        box-shadow: rgba(0, 255, 0, 0.2) 0px 4px 8px 0px;
    }
    .page-c-recharge-item {
        cursor: pointer;
        margin-bottom: 3px;
        width: 130px;
    }


    .orange {
        color: #FF892A !important;
    }
    .red {
        color: #dd350b !important;
    }

    .page-c-recharge-item.red .page-c-recharge-box {
        color: #fff;
        box-shadow: 0 4px 8px 0 rgba(255, 136, 0, 0.2);
        background-color:#FF002B;
    }

    .page-c-recharge-item.orange .page-c-recharge-box {
        color: #fff;
        box-shadow: 0 4px 8px 0 rgba(255, 136, 0, 0.2);
        background-color: #F80;
    }

    .page-c-recharge-item {
        width: calc(50% - 1.4rem);
        display: inline-block;
        vertical-align: top;
        margin-bottom: .9375rem;
        color: #333;
        position: relative;
    }
    .page-c-recharge-item {
        cursor: pointer;
        margin-bottom: 3px;
        width: 130px;
    }

    .page-c-recharge-box {
        overflow: hidden;
        min-height: 4.75rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        border-radius: .5rem;
        position: relative;
        padding: .2rem 0 .5rem;
        color: #333;
    }
    .page-c-recharge-item.red .page-c-recharge-box::before {
        background: url(//ywopen-1252317822.file.myqcloud.com/openwx/recommendimg/20190115/5c3d88ee63c6f.png) no-repeat bottom right;
        background-size: contain;
    }

    .page-c-recharge-box::before {
        position: absolute;
        content: '';
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
    }
    .page-c-recharge-item.red::after {
        content: '首充';
        background: url("data:image/svg+xml,%3Csvg width='38' height='18' viewBox='0 0 -38 -18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h30a8 8 0 0 1 8 8v10H7.209a4 4 0 0 1-3.905-3.132L0 0z' fill='%23FF7D7D' fill-rule='evenodd'/%3E%3C/svg%3E") center center no-repeat;
        background-size: cover
    }

    .page-c-recharge-title {
        position: relative;
        color: currentColor;
        font-size: 12px;
        text-align: center;
        line-height: 1;
    }

    .page-c-recharge-mtitle {
        margin: 2px 0 1px;
    }

    .page-c-recharge-mtitle {
        font-size: .75rem;
        color: currentColor;
        position: relative;
        text-align: center;
        margin-bottom: 0;
        margin-top: 2px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .first-recharge {
        width: 40px;
        //margin-top: 30px;
        display: inline-block;
        text-align: center;
    }


    .page-c-recharge-num {
        padding-top: 0.285rem;
        padding-bottom: 0;
    }
    .page-c-recharge-num {
        font-family: 'special';
        color: currentColor;
        font-size: 18px;
        display: block;
        position: relative;
        text-align: center;
        margin-right: .3125rem;
    }

    .menu-config-page{
        .menu-config-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .menu-config-body{
            .menu-config-box{
                width: 95%;
                margin: 10px 0 0 40px;
                font-weight:bold;
                /*margin: 0 auto;*/
                /*margin-top: 20px;*/
                .menu-config-item{
                    margin-bottom: 20px;
                    .head-img-url{
                        display: inline-block;
                        width: 100px;
                        height: 100px;
                        img{
                            width: 100%;
                            height: 100%;
                            vertical-align:middle;
                        }
                    }
                }
            }
            .use-btn{
                margin-left: 2.5%;
                width: 100px;
                margin-bottom: 40px;
            }
            .el-dialog__body{
                span{
                    display: block;
                    text-align: center;
                }
            }
        }
    }
    .menu-check {
        width: 70px;
        height: 50px;
        /*margin: 50% auto;*/
        top:250px;
        left:160px;
        font-size: 90px;
        color: #00AA00;
        text-align: center;
        display: none;
        z-index:1000;
        position:absolute;
    }
    .menu-pic {
        width: 350px;
        margin: 30px 1px 30px 160px;
        height: 660px;
        float: left;
        cursor: pointer;
        background-size: 100%;
        background-repeat: no-repeat;
        position: relative;
    }
    .fa {
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
</style>
