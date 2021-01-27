<template>
  <div>
    <box-head title="库存查询"></box-head>
    <div>
      <el-card>
        <div>
          <el-form ref="taskQueryVo" :model="taskQueryVo" label-width="220px" class="form1">
            <el-row>
              <!--<el-col :span="8">
                <el-form-item label="归属部门" prop="assetStaffCode">
                  <el-input v-model="taskQueryVo.assetStaffCode" type="text"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属团队" prop="assetStaffCode">
                  <el-input v-model="taskQueryVo.assetStaffCode" type="text"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属项目" prop="assetStaffCode">
                  <el-input v-model="taskQueryVo.assetStaffCode" type="text"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="员工工号" prop="assetStaffCode">
                  <el-input v-model="taskQueryVo.assetStaffCode" class="el-input-style"
                            placeholder="请输入..."></el-input>
                </el-form-item>
              </el-col>-->
              <el-col :span="8">
                <el-form-item label="归属部门" prop="companyAddress">
                  <!--<el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>-->
                  <el-select v-model="taskQueryVo.assetStaffCode" type="text">
                    <el-option value="A" label="金融信息科技一部"></el-option>
                    <!--<el-option value="B" label="金融信息科技二部"></el-option>-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属团队" prop="companyAddress">
                  <!--<el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>-->
                  <el-select v-model="taskQueryVo.assetStaffCode" type="text">
                    <el-option value="A" label="归属团队1"></el-option>
                    <el-option value="B" label="归属团队2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属项目" prop="companyAddress">
                  <!--<el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>-->
                  <el-select v-model="taskQueryVo.assetStaffCode" type="text">
                    <el-option value="A" label="归属项目1"></el-option>
                    <el-option value="B" label="归属项目2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工工号" prop="companyAddress">
                  <!--<el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>-->
                  <el-input v-model="taskQueryVo.assetStaffCode" placeholder="请输入..." class="picc-icon-btn-input">
                    <i slot="suffix" class="el-input__icon el-icon-search"  @click="queryYGGH" ></i>
                  </el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="物品性质" prop="assetStaffCode">
                  <el-input v-model="taskQueryVo.assetStaffCode" class="el-input-style"
                            placeholder="请输入..."></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物品种类" prop="assetStaffCode">
                  <el-input v-model="taskQueryVo.assetStaffCode" class="el-input-style"
                            placeholder="请输入..."></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="最小金额" prop="assetStaffCode">
                  <el-input v-model="taskQueryVo.assetStaffCode" class="el-input-style"
                            placeholder="请输入..."></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最大金额" prop="assetStaffCode">
                  <el-input v-model="taskQueryVo.assetStaffCode" class="el-input-style"
                            placeholder="请输入..."></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="物品状态" prop="taskFlag">
                  <el-checkbox-group v-model="taskQueryVo.taskFlag">
                    <el-checkbox label="0"><span>保存</span></el-checkbox>
                    <el-checkbox label="4"><span>待审核</span></el-checkbox>
                    <el-checkbox label="1"><span>通过</span></el-checkbox>
                    <el-checkbox label="2"><span>不通过</span></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="text-align: center">
              <br>
              <el-button round plain type="primary" icon="el-icon-refresh-right" @click="reset('taskQueryVo')">重置</el-button>
              <el-button round type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
    <div>
      <el-card v-show="showFlag">
        <div class="result-wrapper">
          <el-table ref="selection" :data="resultData"
                    class="picc-table picc-table-normal picc-table-1st-col-icon" style="width: 100%"
                    @sort-change="changeOrderType" @row-dblclick="rowBrowse">
            <!--<el-table-column prop="serialNo" label="序号"></el-table-column>-->
            <el-table-column prop="a" label="资产性质"></el-table-column>
            <el-table-column prop="b" label="资产种类"></el-table-column>
            <el-table-column prop="c" label="资产编号"></el-table-column>
            <el-table-column prop="d" label="资产使用人员"></el-table-column>
            <el-table-column prop="e" label="资产数量"></el-table-column>
            <el-table-column prop="f" label="资产配置"></el-table-column>
            <el-table-column prop="g" label="资产状态"></el-table-column>
            <!--<el-table-column prop="expectedServiceDate" label="资产数量" :formatter="sendtimeformatter"-->
            <!--sortable="true"></el-table-column>-->
            <!--<el-table-column prop="taskFlag" label="分配信息"></el-table-column>-->
            <el-table-column prop="option" label="操作">
              <template slot-scope="scope">
                <span  v-if="scope.row.g ==='使用中'">
                  <el-popconfirm title="您确认分配这项任务吗？" confirm-button-text="确认" cancel-button-text="取消"
                                 @onConfirm="assort(scope)">
                    <el-button type="text" size="small" slot="reference">查看</el-button>
                  </el-popconfirm>
                </span>
                <span v-if="scope.row.g ==='占用'">
                   <!--<el-button type="text" size="small">查看</el-button>-->
                  <el-popconfirm title="您确认查看流程吗？" confirm-button-text="确认" cancel-button-text="取消"
                                   @onConfirm="seeLct(scope)">
                    <el-button type="text" size="small" slot="reference">流程</el-button>
                  </el-popconfirm>
                </span>
                <span v-if="scope.row.g ==='闲置'">
                  <el-popconfirm title="您确认申请吗？" confirm-button-text="确认" cancel-button-text="取消"
                      @onConfirm="确定">
                    <el-button type="text" size="small" slot="reference">申请</el-button>
                  </el-popconfirm>

                   <el-popconfirm title="您确认查看流程吗？" confirm-button-text="确认" cancel-button-text="取消"
                                  @onConfirm="seeLct(scope)">
                    <el-button type="text" size="small" slot="reference">流程</el-button>
                  </el-popconfirm>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: center" class="btnbox">
            <el-pagination
              background
              :current-page="pageNo"
              :page-sizes="[5,15,50]"
              :page-size="pageSize"
              :total="totalCount"
              layout="total,prev, pager, next, jumper,sizes"
              @size-change="changepagesize"
              @current-change="changepage"/>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogAssetLct"  :title="dialogType==='edit'?'资产流转流程':'资产流转流程'">
      <el-timeline :reverse="false" class="picc-steps-vertical">
        <el-timeline-item v-for="(item, index) in lctList" :key="index" icon="picc-icon picc-icon-success-mini">
          <p>资产名称：{{item.a}}</p>
          <br/>
          <p > 资产使用人员：{{item.b}}</p>
          <p ><br/></p>
          <p>使用开始时间：{{item.c}}</p>
          <br/>
          <p >使用结束时间：{{item.d}}</p>
          <!--<p v-if="item.nodeName ==='报告打回'"><br/></p>-->
          <!--          <p v-if="item.nodeName.endsWith('打回')">打回原因：{{item.repulsesugggest}}</p>-->
          <!--          <p v-if="item.nodeName.endsWith('通过')">审核意见：{{item.repulsesugggest}}</p>-->
          <p>状态：{{item.e}}</p>
          <p v-if="item.nodeName ==='一级审核通过'"><br/></p>
          <p v-if="item.nodeName ==='二级审核通过'">审核意见：{{item.f}}</p>
          <p v-if="item.nodeName ==='二级审核通过'"><br/></p>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  //  import {queryRiskTaskAssort} from '@/api/risksafefactory'
  export default {
    name: "RiskTroubleshootingAssortQuery",
    data() {
      return {
        selectShowFlag: true,
        taskQueryVo: {
          taskFlag:'',
          pageNo:1,
          pageSize:5,
          totalCount:0,
          exploreDateBegin:'',
          exploreDateEnd: '',
          assetStaffCode: ''
        },
        dialogAssetLct: false,
        dialogType: 'new',
        assetBuy: {
          name: ''
        },
        lctList: [
          {
            a:'电脑',
            b:'张三',
            c:'2020-01-01',
            d:'2020-01-30',
            e:'申请',
            f:'',
            g:'',
            h:'',
          },
          {
            a:'电脑',
            b:'李四',
            c:'2020-02-01',
            d:'2020-02-30',
            e:'占用',
            f:'',
            g:'',
            h:'',
          },
          {
            a:'电脑',
            b:'赵六',
            c:'2020-03-01',
            d:'2020-03-30',
            e:'归还',
            f:'',
            g:'',
            h:'',
          }
        ],
        resultData:[
          {
            a:'消耗品',
            b:'卫生纸',
            c:'RX001',
            d:'张三',
            e:'1',
            f: '',
            g: '使用中'
          },
          {
            a:'非消耗品定向',
            b:'电脑',
            c:'RX002',
            d:'李四',
            e:'1',
            f: '8GB运行内存,512GB物理内存',
            g: '占用'
          },
          {
            a:'非消耗品定向',
            b:'电脑',
            c:'RX003',
            d:'李四',
            e:'1',
            f: '16GB运行内存,512GB物理内存',
            g: '闲置'
          },
        ],
        showFlag:false,
      }
    },
    created(){
      this.search()
    },
    methods: {
      seeLct(scope){
        this.dialogAssetLct = true;
      },
      search() {
        this.showFlag = true
        this.pageNo = 1
        this.pageSize = 5
        this.totalCount = 20

        this.$refs['taskQueryVo'].validate((valid) => {
          if (valid) {
            this.pageNo = 1
            this.showFlag = true
            let pageSize = Cookies.get('pageSize')
            if (pageSize !== undefined && pageSize !== '') {
              this.pageSize = parseInt(pageSize)
            }
            this.queryRiskTask()
          } else {
            this.$message({
              message: '查询条件错误!!!请修改',
              type: 'error'
            })
          }
        })
      },
      queryRiskTask(){
//        queryRiskTaskAssort(this.taskQueryVo).then((response) => {
//          this.resultData = response.dataList
//          this.totalCount = response.totalCount
//          this.pageCount = response.totalPage
//          this.showFlag = true
//
//        }, (response) => {
//          // error callback
//        })
      },
      assort(scope) {
        this.$router.push({
          path: '/riskTroubleshooting_Assort',
          query: {
            companyName: scope.row.companyName,
          }
        })
      },
      reset(name) {
        this.taskQueryVo.pageNo = 1
        this.taskQueryVo.totalCount = 0
        this.showFlag = false
        this.taskQueryVo.taskFlag = ''
      },
      changepage(index) {
        this.taskQueryVo.pageNo = index
        this.queryRiskTask()
      },
      changepagesize(value) {
        this.taskQueryVo.pageNo = 1
        this.taskQueryVo.pageSize = value
        Cookies.set('pageSize', value)
        this.queryRiskTask()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .el-select{
    width: 100%
  }
  .el-date-editor{
    width: 100%
  }
  .result-wrapper {
    .btnbox {
      margin: 16px 0;
    }

    th .ivu-table-cell {
      display: block;
    }
  }
</style>
