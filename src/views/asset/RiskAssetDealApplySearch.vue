<template>
  <div>
    <box-head title="资产申请查询"></box-head>
    <div>
      <el-card>
        <div>
          <el-form ref="taskQueryVo" :model="taskQueryVo" label-width="220px" class="form1">
            <el-row>
              <el-col :span="8">
                <el-form-item label="开始时间" prop="exploreDateBegin">
                  <el-date-picker v-model="taskQueryVo.exploreDateBegin" type="date" :clearable="false"
                                  format="yyyy/MM/dd" placeholder="请选择"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="截止时间" prop="exploreDateEnd">
                  <el-date-picker v-model="taskQueryVo.exploreDateEnd" type="date" :clearable="false"
                                  format="yyyy/MM/dd" placeholder="请选择"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请类型" prop="companyAddress">
                  <el-select v-model="taskQueryVo.manageType" type="text">
                    <el-option value="A" label="变卖"></el-option>
                    <el-option value="B" label="续费"></el-option>
                    <el-option value="C" label="弃置"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="申请状态" prop="taskFlag">
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                    >
            <!--@sort-change="changeOrderType" @row-dblclick="rowBrowse"-->

            <!--<el-table-column prop="serialNo" label="序号"></el-table-column>-->
            <el-table-column prop="a" label="资产申请单号"></el-table-column>
            <el-table-column prop="b" label="资产申请人员"></el-table-column>
            <el-table-column prop="c" label="所属部门"></el-table-column>
            <el-table-column prop="d" label="所属团队"></el-table-column>
            <el-table-column prop="e" label="申请类型"></el-table-column>
            <!--<el-table-column prop="f" label="申请原因"></el-table-column>-->
            <el-table-column prop="g" label="审核状态"></el-table-column>
            <!--<el-table-column prop="expectedServiceDate" label="资产数量" :formatter="sendtimeformatter"-->
                             <!--sortable="true"></el-table-column>-->
            <!--<el-table-column prop="taskFlag" label="分配信息"></el-table-column>-->
            <el-table-column prop="option" label="操作">
              <template slot-scope="scope">
                <span v-if="scope.row.g ==='保存'">
                  <el-popconfirm title="您确认修改这项资产吗？" confirm-button-text="确认" cancel-button-text="取消"
                                 @onConfirm="updateAsset(scope)">
                    <el-button type="text" size="small" slot="reference">修改</el-button>
                  </el-popconfirm>
                </span>
                <span v-if="scope.row.g ==='待审核'">
                   <!--<el-button type="text" size="small">查看</el-button>-->
                   <el-popconfirm title="您确认查看资产清单吗？" confirm-button-text="确认" cancel-button-text="取消"
                                  @onConfirm="seeAssetList(scope)">
                    <el-button type="text" size="small" slot="reference">查看清单</el-button>
                  </el-popconfirm>
                </span>
                <span v-if="scope.row.g ==='通过'">
                  <el-popconfirm title="您确认查看资产清单吗？" confirm-button-text="确认" cancel-button-text="取消"
                                 @onConfirm="seeAssetList(scope)">
                    <el-button type="text" size="small" slot="reference">查看清单</el-button>
                  </el-popconfirm>

                   <el-popconfirm title="您确认查看流程吗？" confirm-button-text="确认" cancel-button-text="取消"
                                  @onConfirm="seeLct(scope)">
                    <el-button type="text" size="small" slot="reference">流程</el-button>
                  </el-popconfirm>
                </span>
                <span v-if="scope.row.g ==='不通过'">
                  <el-popconfirm title="您确认查看资产清单吗？" confirm-button-text="确认" cancel-button-text="取消"
                                  @onConfirm="seeAssetList(scope)">
                    <el-button type="text" size="small" slot="reference">查看清单</el-button>
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
              :page-sizes="[5,10,15]"
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
          <p>审核步骤：{{item.a}}</p>
          <p><br/></p>
          <p v-if="item.a !='自动审核通过'"> 审核人名称：{{item.b}}</p>
          <p v-if="item.a !='自动审核通过'"><br/></p>
          <p>审核时间：{{item.c}}</p>
          <p><br/></p>
          <p v-if="item.a ==='一级审核打回'">打回原因：{{item.d}}</p>
          <p v-if="item.a ==='一级审核打回'"><br/></p>
          <p v-if="item.a ==='二级审核打回'">打回原因：{{item.d}}</p>
          <p v-if="item.a ==='二级审核打回'"><br/></p>
          <p v-if="item.a ==='一级审核通过'">审核意见：{{item.d}}</p>
          <p v-if="item.a ==='一级审核通过'"><br/></p>
          <p v-if="item.a ==='二级审核通过'">审核意见：{{item.d}}</p>
          <p v-if="item.a ==='二级审核通过'"><br/></p>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>

    <el-dialog :visible.sync="dialogAssetList"  :title="dialogType==='edit'?'资产处理清单':'资产处理清单'">
      <div style="padding: 15px; text-align:right">
        <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
          <el-table-column align="center" label="资产编号" width="120">
            <template slot-scope="scope">
              {{ scope.row.key }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="资产使用人员" width="120">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="资产性质">
            <template slot-scope="scope">
              {{ scope.row.description }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="资产种类">
            <template slot-scope="scope">
              {{ scope.row.description_a }}
            </template>
          </el-table-column>
         <el-table-column align="header-center" label="资产备注">
           <template slot-scope="scope">
             {{ scope.row.description_b }}
           </template>
         </el-table-column>
         <!--<el-table-column align="header-center" label="资产配置">
           <template slot-scope="scope">
             {{ scope.row.description_b }}
           </template>
         </el-table-column>
         <el-table-column align="header-center" label="资产采买路径">
           <template slot-scope="scope">
             {{ scope.row.description_c }}
           </template>
         </el-table-column>
         <el-table-column align="header-center" label="价格参考">
           <template slot-scope="scope">
             {{ scope.row.description_d }}
           </template>
         </el-table-column>-->
          <el-table-column align="header-center" label="价格参考">
            <template slot-scope="scope">
              {{ scope.row.description_d }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
//  import {queryRiskTaskAssort} from '@/api/risksafefactory'
  import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
  export default {
    name: "RiskTroubleshootingAssortQuery",
    data() {
      return {
        selectShowFlag: true,
        taskQueryVo: {
          taskFlag: [],
          pageNo:1,
          pageSize:5,
          totalCount:0,
          exploreDateBegin:'',
          exploreDateEnd: '',
          manageType: ''
        },
        rolesList: [],
        dialogAssetLct: false,
        dialogAssetList: false,
        dialogType: 'new',
        assetBuy: {
          name: ''
        },
        lctList: [
          {
            a:'提交审核',
            b:'张三',
            c:'2020-01-01',
            d:'',
            e:'',
            f:'',
            g:'',
            h:'',
          },
          {
            a:'一级审核通过',
            b:'李四',
            c:'2020-02-01',
            d:'一级通过了',
            e:'',
            f:'',
            g:'',
            h:'',
          },
          {
            a:'二级审核通过',
            b:'赵六',
            c:'2020-03-01',
            d:'二级又通过了',
            e:'',
            f:'',
            g:'',
            h:'',
          }
        ],
        resultData:[
          {
            a:'RX001',
            b:'张三',
            c:'金融信息科技一部',
            d:'团队1',
            e:'回收',
            f: '',
            g: '保存'
          },
          {
            a:'RX002',
            b:'李四',
            c:'金融信息科技一部',
            d:'团队1',
            e:'变卖',
            f: '8GB运行内存,512GB物理内存',
            g: '待审核'
          },
          {
            a:'RX003',
            b:'李四',
            c:'金融信息科技一部',
            d:'团队1',
            e:'回收',
            f: '16GB运行内存,512GB物理内存',
            g: '通过'
          },
          {
            a:'RX004',
            b:'李四',
            c:'金融信息科技一部',
            d:'团队1',
            e:'1',
            f: '16GB运行内存,512GB物理内存',
            g: '不通过'
          },
        ],
        showFlag:false,
      }
    },
    created() {
      // Mock: get all routes and roles list from server
      this.getRoles()
      this.search()
    },
    methods: {
      async getRoles() {
        const res = await getRoles()
        this.rolesList = res.data
        console.log(this.rolesList)
      },
      // 查看资产清单
      seeAssetList(scope){
        this.dialogAssetList = true
      },
      updateAsset(scope){
         // 跳转到采购申请页面进行修改
//        this.$router.push()
        this.$router.push({path: '/assetmanage/stockdeal', query: {}})
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
      seeLct(scope){
        this.dialogAssetLct = true;
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
