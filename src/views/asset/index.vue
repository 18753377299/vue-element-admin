<template>
  <div style="height:100%">
    <div class="home_box">
      <div class="home_box_content">
        <el-row>
          <!--     欢迎语     -->
          <el-col :span="24">
            <el-card style="min-height: 166px; border: none; margin: 16px;" class="welcome">
              <el-row :gutter="24">
                <el-col :span="12" class="riskMenu">
                  <div class="welcome-wrapper"  @click="selectRiskFactory" :class="isRiskFactoryFlag ? 'is-click':'no-click'" >
                    <h2 style="margin-bottom: 20px;font-size: 20px;">资产管理</h2>
                    <p class="sys-server">{{currentSystem}}</p>
                  </div>
                  <div class="welcome-wrapper" v-if="riskFactoryShow && riskWisdomShow">
                    <span class="midText"></span>
                  </div>
                <!--  <div class="welcome-wrapper" @click="selectRiskWisdom" :class="isRiskWisdomFlag ? 'is-click':'no-click'">
                    <h2 style="margin-bottom: 20px; font-size: 20px;">智慧工地</h2>
                    <p>{{currentWisdomSystem}}</p>
                  </div>-->
                </el-col>
                <!--<el-col :span="12" >
                  <div style="display:flex;padding-top: 35px">
                    <div class="boxMsg" >
                      <div class="redMsg">99</div>
                      <div class="svg-container">
                        <svg-icon icon-class="daiban4" width="60px"></svg-icon>
                      </div>
                      <div>报告待审核</div>
                    </div>
                  </div>
                </el-col>-->

                <el-col :span="12">
                  <div style="display:flex;padding-top: 35px; margin-left: 100px">
                    <div class="boxMsg" v-if="isA">
                      <div class="redMsg">26</div>
                      <div class="svg-container" @click="queryTask(2)">
                        <svg-icon icon-class="daiban1" width="80px"></svg-icon>
                      </div>
                      <div>采购待审核</div>
                    </div>
                    <div class="boxMsg"  v-if="isB">
                      <div class="redMsg">24</div>
                      <div class="svg-container" @click="queryTask(1)">
                        <svg-icon icon-class="daiban2" width="60px"></svg-icon>
                      </div>
                      <div>报修待审核</div>
                    </div>

                    <div class="boxMsg" v-if="isC">
                      <div class="redMsg">23</div>
                      <div class="svg-container" @click="queryReport(3)">
                        <svg-icon icon-class="daiban4" width="60px"></svg-icon>
                      </div>
                      <div>报废待审核</div>
                    </div>

                    <div class="boxMsg" v-if="isD">
                      <div class="redMsg">22</div>
                      <div class="svg-container" @click="queryReport(4)">
                        <svg-icon icon-class="daiban5" width="60px"></svg-icon>
                      </div>
                      <div>采购待受理</div>
                    </div>
                    <div class="boxMsg" v-if="isE">
                      <div class="redMsg">24</div>
                      <div class="svg-container" @click="queryReport(2)">
                        <svg-icon icon-class="daiban3" width="60px"></svg-icon>
                      </div>
                      <div>采购待登记</div>
                    </div>
                    <template v-html="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"></template>

                    <div class="boxMsg" v-if="isF">
                      <div class="redMsg">11</div>
                      <div class="svg-container" @click="queryTask(3)">
                        <svg-icon icon-class="daiban6" width="60px"></svg-icon>
                      </div>
                      <div>采购待关联</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
  import settings from '@/settings'
//  import {queryRiskCheckTask, queryRiskFactoryMain} from '@/api/risksafefactory'
//  import {
//    saveRiskReportByTask,
//    customerInfoQuery,
//    riskReportTaskDelete,
//    getConidByUserCode
//  } from '@/api/risksafefactory'
//  import {queryRiskWisdomPage} from '@/api/smartsite'
//  import {riskWisdomUnderwriteVo} from "@/views/smartSite/report/smartsitedata"
//  import {riskFactoryQueryVo} from "@/views/riskfactory/dangerRectification/riskReportSafeFactoryData"

  export default {
    name: "RiskFactoryIndex",
    components: {},
    props: {
      riskFactoryShow: {
        type: Boolean,
        default: () => false
      },
      riskWisdomShow: {
        type: Boolean,
        default: () => false
      },
    },
    data() {
      return {
        isBMZL: false,
        isTDFE: false,
        isBMZG: false,

        isA: false,
        isB: false,
        isC: false,
        isD: false,
        isE: false,
        isF: false,

        isRiskFactoryFlag: false,
        isRiskWisdomFlag: false,
        currentSystem: '',
        currentWisdomSystem: '',
        projectName: '',
        postListStr: '',
        postCodeList: '',
        isRiskFactoryApply: false,
        isRiskFactoryAssort: false,
        isRiskFactoryReport: false,
        isReportUnderwrite: false,
        isRecifyUnderwrite: false,
        isReportAppraise: false,
        isShowSearchButton: false,
        riskWisdomQueryMainVo: riskWisdomUnderwriteVo(),
        riskWisdomChecktotalCount: 0,
        applyCount: '',
        assortCount: '',
        appraiseCount: '',
        dangerCount: '',
        reportCount: '',
        recifyUnderwriteCount: '',
        reportUnderwriteCount: '',
        userInfo: {},
        riskFactoryQueryMainVo: riskFactoryQueryVo(),
        riskFactoryCheckRequestVo: {
          riskFactoryCheckPageVo: {
            // /	/** 对应字段：companyname,备注：企业名称 */
            companyName: '',
            /** 对应字段：registrationNumber,备注：企业注册号 */
            registrationNumber: '',
            registrationComCode: '',
            /** 对应字段：comCode,备注：归属机构 */
            comCode: '',
            comCodeCName: '',
            /** 对应字段：riskModel,备注：报告模板类型 */
            riskModel: '',
            /** 对应字段：expectedservicedate,备注：期望服务起期 */
            serviceDateBegin: '',
            /** 对应字段：expectedservicedate,备注：期望服务止期 */
            serviceDateEnd: '',
            /** 对应字段：taskFlag,备注：任务状态 ,未分配:9、已分配,未生成报告:0、超时未分配:2、超时已分配: 4、已处理-已经生成报告: 1*/
            taskFlag: [],
            /** 对应字段：taskPrincipal,备注：任务负责人 */
            taskPrincipal: '',
            taskPrincipalName: '',
            orderColumn: 'serialNo',
          },
          pageNo: 1,
          pageSize: 1,
          totalCount: 0,
        },
      }
    },
    created() {
      this.isBMZG = true
      this.isBMZL = true
      this.isTDFE = true

//      this.isA= true
//      this.isB= true
//      this.isC= true
      this.isD= true
      this.isE= true
      this.isF= true


      this.projectName = settings.title
      let userInfo = this.$store.getters.userInfo
      this.userInfo = userInfo
      this.postListStr = userInfo.postList
      this.postCodeList = userInfo.postCodeList
      if (this.riskFactoryShow && this.riskWisdomShow) {
        this.isRiskFactoryFlag = true
        this.isShowSearchButton = true
        this.currentWisdomSystem = '服务机构端'
        this.queryRiskWisdomCount()
      } else if (this.riskFactoryShow && this.riskWisdomShow === false){
        this.isRiskFactoryFlag = true
      } else if (this.riskFactoryShow === false && this.riskWisdomShow) {
        this.isRiskWisdomFlag = true
        this.isShowSearchButton = true
        this.currentWisdomSystem = '服务机构端'
        this.queryRiskWisdomCount()
      }
      //投保企业
      if (this.postCodeList.indexOf('grade_safe_insured_user') > -1) {
        this.isRiskFactoryReport = true
        this.isReportAppraise = true
        this.queryRiskCheckPage('appraise')
        this.queryRiskFactory('report')
        this.currentSystem = '企业用户端'
      }
      //三方机构
      if (this.postCodeList.indexOf('grade_safe_riskcom_user') > -1) {
        this.isRiskFactoryApply = true
        this.isRiskFactoryAssort = true
        this.isReportUnderwrite = true
        this.isRecifyUnderwrite = true
        this.queryRiskCheckPage('apply')
        this.queryRiskCheckPage('assort')

        this.queryRiskFactory('reportUnderwrite')
        this.queryRiskFactory('recifyUnderwrite')
        this.currentSystem = '风险机构端'

      }
      //三方专家
      if (this.postCodeList.indexOf('grade_safe_riskexpert_user') > -1) {
        this.isRiskFactoryAssort = true
        this.queryRiskCheckPage('assortUser')
        this.currentSystem = '专家服务端'
      }
      //县支
      if (this.postCodeList.indexOf('grade_safe_county_user') > -1) {
        this.isRiskFactoryAssort = true
        this.queryRiskCheckPage('assort')
        this.currentSystem = '保险机构端'

      }
      //地市
      if (this.postCodeList.indexOf('grade_safe_city_user') > -1) {
        this.isRiskFactoryApply = true
        this.isRiskFactoryAssort = true
        this.isReportUnderwrite = true
        this.isRecifyUnderwrite = true
        this.queryRiskCheckPage('apply')
        this.queryRiskCheckPage('assort')
        this.isReportAppraise = true
        this.queryRiskCheckPage('appraisen')
        this.queryRiskFactory('reportUnderwrite')
        this.queryRiskFactory('recifyUnderwrite')
        this.currentSystem = '保险机构端'
      }
      //省级或总公司
      if (this.postCodeList.indexOf('grade_safe_province_user') > -1) {
        this.isReportAppraise = true
        this.queryRiskCheckPage('appraisen')
        this.isReportUnderwrite = true
        this.isRecifyUnderwrite = true
        this.queryRiskFactory('reportUnderwrite')
        this.queryRiskFactory('recifyUnderwrite')
        this.currentSystem = '保险机构端'

      }
      if (this.postCodeList.indexOf('grade_safe_head_user') > -1) {
        this.isReportAppraise = true
        this.queryRiskCheckPage('appraisen')
        this.currentSystem = '保险机构端'
      }
      // 安全工厂风险内部专家岗
      if (this.postCodeList.indexOf('grade_safe_riskexpert_in_user') > -1) {
        this.isReportAppraise = true
        this.queryRiskCheckPage('appraiser')

        this.isRiskFactoryAssort = true
        this.queryRiskCheckPage('assortUser')
        this.currentSystem = '保险机构端'
      }
    },
    watch: {
      isRiskFactoryFlag: {
        handler(newValue, oldValue) {
          this.$emit('showTitle', this.isRiskFactoryFlag)
        }
      }
    },
    methods: {
      selectRiskFactory() {
        this.isRiskFactoryFlag = true
        this.isRiskWisdomFlag = false
      },
      selectRiskWisdom() {
        this.isRiskFactoryFlag = false
        this.isRiskWisdomFlag = true
      },
      queryRiskWisdomCount(val) {
        this.riskWisdomQueryMainVo.underwriteFlag=['4','9']
        let data = {
          pageNo: 1,
          pageSize: 1,
          riskWisdomQueryMainVo: this.riskWisdomQueryMainVo,
        }
        queryRiskWisdomPage(data).then((res) => {
          this.riskWisdomChecktotalCount = res.totalCount
        })
      },
      //跳转智慧工地页面
      queryWisdomReport(val) {
        if (val === 1) {
          let params = {
            task: '1'
          }
          this.$router.push({path: '/smartSite/smartSiteUnderwrite',query: params})
        }
      },
      //获取任务数
      queryRiskCheckPage(val) {
        this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskFlag = []
        if (val === 'appraise') {
          this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskFlag.push('2')
          getConidByUserCode().then(res => {
            let contIdTem = res.contid
            customerInfoQuery({
              pageNo: 1,
              pageSize: 5,
              contId: contIdTem
            }).then((res) => {
              if (res && res.customerVoList != null && res.customerVoList.length > 0) {
                this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.companyName = res.customerVoList[0].name
                this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.registrationNumber = res.customerVoList[0].contId
                queryRiskCheckTask(this.riskFactoryCheckRequestVo).then((res) => {
                  this.appraiseCount = res.totalCount
                })
              }
            })
          })
        }
        //内部
        if (val === 'appraisen') {
          this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskFlag.push('2')
          queryRiskCheckTask(this.riskFactoryCheckRequestVo).then((res) => {
            this.appraiseCount = res.totalCount
          })
        }
        //内部专家
        if (val === 'appraiser') {
          this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskFlag.push('2')
          this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskPrincipal = this.userInfo.userCode
          this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskPrincipalName = this.userInfo.userName
          queryRiskCheckTask(this.riskFactoryCheckRequestVo).then((res) => {
            this.appraiseCount = res.totalCount
          })
        }
        if (val === 'apply') {
          this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskFlag.push('9')
          queryRiskCheckTask(this.riskFactoryCheckRequestVo).then((res) => {
            this.applyCount = res.totalCount
          })
        }
        if (val === 'assort') {
          this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskFlag.push('0')
          queryRiskCheckTask(this.riskFactoryCheckRequestVo).then((res) => {
            this.assortCount = res.totalCount
          })
        }
        if (val === 'assortUser') {
          this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskFlag.push('0')
          this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskPrincipal = this.userInfo.userCode
          this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskPrincipalName = this.userInfo.userName
          queryRiskCheckTask(this.riskFactoryCheckRequestVo).then((res) => {
            this.assortCount = res.totalCount
          })
        }
        this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskPrincipal = ''
        this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.taskPrincipalName = ''

        this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.companyName = ''
        this.riskFactoryCheckRequestVo.riskFactoryCheckPageVo.registrationNumber = ''

      },
      queryTask(val) {
        let param = {
          task: ''
        }
        if (val === 1) {
          param.task = 'apply'
        } else if (val === 2) {
          param.task = 'assort'
        } else {
          param.task = 'appraise'
        }
        this.$router.push({path: '/riskfactory/riskTroubleshootingOnSite', query: param})
      },

      queryReport(val) {
        let param = {
          factory: ''
        }
        if (val === 1) {
          param.factory = 'danger'
        } else if (val === 2) {
          param.factory = 'report'
        } else if (val === 3) {
          param.factory = 'reportUnderwrite'
          this.$router.push({path: 'riskfactory/riskFactoryUnderwrite', query: param})
          return
        } else {
          param.factory = 'recifyUnderwrite'
        }
        this.$router.push({path: '/riskfactory/dangerRectifyQuery', query: param})
      },
      queryRiskFactory(val) {
        this.riskFactoryQueryMainVo.rectifyFlag = []
        this.riskFactoryQueryMainVo.underwriteFlag = []

        if (val === 'report') {
          this.riskFactoryQueryMainVo.underwriteFlag = ['1']
          this.riskFactoryQueryMainVo.rectifyFlag = ['T', '0', '2', '6']
          let data = {
            pageNo: 1,
            pageSize: 1,
            riskFactoryQueryMainVo: this.riskFactoryQueryMainVo,
          }
          queryRiskFactoryMain(data).then((res) => {
            this.dangerCount = res.totalCount
          })
        }
        if (val === 'reportUnderwrite') {
          this.riskFactoryQueryMainVo.underwriteFlag = ['4', '9']
          // this.riskFactoryQueryMainVo.rectifyFlag = ['T', '0', '2', '6']
          let data = {
            pageNo: 1,
            pageSize: 1,
            riskFactoryQueryMainVo: this.riskFactoryQueryMainVo,
          }
          queryRiskFactoryMain(data).then((res) => {
            this.reportUnderwriteCount = res.totalCount
          })
        }
        if (val === 'recifyUnderwrite') {
          // this.riskFactoryQueryMainVo.underwriteFlag = ['1']
          this.riskFactoryQueryMainVo.rectifyFlag = ['4', '9']
          let data = {
            pageNo: 1,
            pageSize: 1,
            riskFactoryQueryMainVo: this.riskFactoryQueryMainVo,
          }
          queryRiskFactoryMain(data).then((res) => {
            this.recifyUnderwriteCount = res.totalCount
          })
        }
        this.riskFactoryQueryMainVo.underwriteFlag = []
        this.riskFactoryQueryMainVo.rectifyFlag = []
        // let data = {
        //   pageNo: 1,
        //   pageSize: 1,
        //   riskFactoryQueryMainVo: this.riskFactoryQueryMainVo,
        // }
        // queryRiskFactoryMain(data).then((res) => {
        //   switch (val) {
        //     case '0':
        //       this.riskFactoryQueryMainVo.explorer = ''
        //       this.riskFactoryQueryMainVo.explorerCName = ''
        //       this.dangerCount = res.totalCount
        //       break
        //     case '1':
        //       this.riskFactoryQueryMainVo.explorer = ''
        //       this.riskFactoryQueryMainVo.explorerCName = ''
        //       this.reportCount = res.totalCount
        //       break
        //
        //     case '2':
        //       this.dangerCount = res.totalCount
        //       break
        //
        //     case '3':
        //       this.reportCount = res.totalCount
        //       break
        //   }
        //   this.riskFactoryQueryMainVo.rectifyFlag = []
        // })
      },

    }
  }
</script>

<style lang="scss" scoped>
  .app_style .fond_style {
    color: #F05B50;
    font-size: 30px;
  }

  .app_style2 .fond_style {
    color: #4152e0;
    font-size: 30px;
  }

  .chuli {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 32px;
    line-height: 8px;
  }

  .renwuWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;

    .renwuInfo {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dashed #8C8C8C;
      border-radius: 4px;
      height: 162px;
      width: 420px;
    }
  }

  .renwu-SH {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 40%;
    border-right: 1px solid #8C8C8C;
  }

  .renwu-BM {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  .is-click {
    color: #292B34;
  }
  .no-click {
    color: #909399;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 220px;
  }

  .appwrap {
    display: flex;
    justify-content: center;
  }

  .app {
    height: 90px;
    width: 90px;
    border: 1px dashed #8C8C8C;
    border-radius: 4px;
    margin: 0px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .title {
    font-size: 16px;
    height: 32px;
    line-height: 20px;
    text-align: left;
    /* border-bottom: 1px solid #e5e5e5; */
    margin-bottom: 37px;
    padding-left: 4px;
    position: relative;
  }

  .more {
    position: absolute;
    right: 0;
    cursor: pointer;
  }

  .home_box_content .ivu-card {
    border-radius: 2px;
    margin: 5px;
  }

  .welcome {
    display: flex;
    align-items: center;
    height: 210.4px;
    /*background-image: url("../../assets/images/xxbg.png");*/
    background-position: right 124px;
    background-repeat: no-repeat;
    /*background-position: bottom right;*/
    .riskMenu {
      display: flex;
      flex-direction: row;
      .welcome-wrapper {
        margin-left: 10%;
        display: flex;
        flex-direction: column;
        .midText {
          width: 2px;
          height: 120px;
          background: red;
          vertical-align: middle;
        }
      }
    }
  }

  .pending {
    margin-bottom: 5px;
    color: #6A6B74;
    font-size: 14px;
  }

  .svg-container {
    padding: 0px 0px 15px 15px;
    /*color: $dark_gray;*/
    /*color: #515a6e;*/
    vertical-align: middle;
    width: 60px;
    display: inline-block;
  }

  .svg-icon {
    text-align: center;
    height: 40px;
    width: 40px;
  }

  .boxMsg {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    position: relative;
    /*margin-left: 20px;*/
    padding-left: 40px;
  }

  .redMsg {
    /*width: 20px;*/
    /*height: 20px;*/
    min-height: 20px;
    min-width: 20px;
    line-height: 20px;
    border-radius: 50%;
    background: red;
    color: #fff;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 80px;
    top: -10px
  }

 /* /deep/ .el-card__body {
    width: 100%
  }*/
  .el-card__body {
    width: 100%
  }
  .el-card {
    height: 100%
  }
</style>
