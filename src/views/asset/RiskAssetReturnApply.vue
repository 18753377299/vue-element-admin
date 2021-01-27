<template>
  <div class="app-container">
    <!--资产归还申请-->
    <div style="padding: 10px;">
      <el-card>
        <div style="padding: 15px; text-align:center">
          <el-form
            ref="riskFactoryCheckApplyVo"
            class="form1"
            :model="riskFactoryCheckApplyVo"
            :rules="ruleValidate"
            label-width="160px"
            style="text-align: center">
            <el-row>
              <!--<el-col :span="8">
                <el-form-item label="归属部门" prop="companyAddress">
                  <el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属团队" prop="companyAddress">
                  <el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属项目" prop="companyAddress">
                  <el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工工号" prop="companyAddress">
                  <el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>
                </el-form-item>
              </el-col>-->
              <el-col :span="8">
                <el-form-item label="归属部门" prop="companyAddress">
                  <!--<el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>-->
                  <el-select v-model="riskFactoryCheckApplyVo.companyAddress" type="text">
                    <el-option value="A" label="金融信息科技一部"></el-option>
                    <!--<el-option value="B" label="金融信息科技二部"></el-option>-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属团队" prop="companyAddress">
                  <!--<el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>-->
                  <el-select v-model="riskFactoryCheckApplyVo.companyAddress" type="text">
                    <el-option value="A" label="归属团队1"></el-option>
                    <el-option value="B" label="归属团队2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属项目" prop="companyAddress">
                  <!--<el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>-->
                  <el-select v-model="riskFactoryCheckApplyVo.companyAddress" type="text">
                    <el-option value="A" label="归属项目1"></el-option>
                    <el-option value="B" label="归属项目2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工工号" prop="companyAddress">
                  <!--<el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>-->
                  <el-input v-model="riskFactoryCheckApplyVo.companyAddress" placeholder="请输入..." class="picc-icon-btn-input">
                    <i slot="suffix" class="el-input__icon el-icon-search"  @click="queryYGGH" ></i>
                  </el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="员工姓名" prop="companyAddress">
                  <el-input v-model="riskFactoryCheckApplyVo.companyAddress" type="text"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归还类型" prop="companyAddress">
                  <el-select v-model="riskFactoryCheckApplyVo.companyAddress" type="text">
                    <el-option value="A" label="回收"></el-option>
                    <el-option value="B" label="报修"></el-option>
                    <el-option value="C" label="完全报废"></el-option>
                    <el-option value="D" label="部分报废"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归还原因" prop="companyAddress">
                  <el-select v-model="riskFactoryCheckApplyVo.companyAddress" type="text">
                    <el-option value="A" label="离职"></el-option>
                    <el-option value="B" label="公转公"></el-option>
                    <el-option value="C" label="公转私"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--<el-col :span="8">
                <el-form-item label="资产总金额" prop="linkName">
                  <el-input v-model="riskFactoryCheckApplyVo.linkName" type="text" />
                </el-form-item>
              </el-col>-->
            </el-row>

            <div style="padding: 15px; text-align:right">
              <!--<el-button style="text-align: right" type="primary" @click="handleBuyAddRole" round>增加归还信息</el-button>-->

              <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border stripe
                        :row-class-name="tableRowClassName">
                <el-table-column type="selection" width="56" fixed></el-table-column>
                <el-table-column align="center" label="资产编号" width="110">
                  <template slot-scope="scope">
                    {{ scope.row.key }}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="资产使用人员" width="110">
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
                <!--<el-table-column align="header-center" label="资产数量">-->
                  <!--<template slot-scope="scope">-->
                    <!--{{ scope.row.description_b }}-->
                  <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column align="header-center" label="资产备注">
                  <template slot-scope="scope">
                    {{ scope.row.description_c }}
                  </template>
                </el-table-column>
                <!--<el-table-column align="header-center" label="价格参考">-->
                  <!--<template slot-scope="scope">-->
                    <!--{{ scope.row.description_d }}-->
                  <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column align="header-center" label="资产数量">
                  <template slot-scope="scope">
                    {{ scope.row.description_e }}
                  </template>
                </el-table-column>
                <!--<el-table-column align="header-center" label="资产金额">
                  <template slot-scope="scope">
                    100
                  </template>
                </el-table-column>-->
                <<!--el-table-column align="center" label="操作"  width="160">
                  <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleBuyEdit(scope)" round>修改</el-button>
                    <el-button type="danger" size="small" @click="handleBuyDelete(scope)" round>排除</el-button>
                  </template>
                </el-table-column>-->
              </el-table>
            </div>
          </el-form>
          <br/><br/><br/>
          <el-button type="primary"  round>保存</el-button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary"  round>提交</el-button>
        </div>


      </el-card>
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogAssetBuy"  :title="dialogType==='edit'?'资产归还':'资产归还'">
      <el-form :model="assetBuy" :rules="ruleValidateAssetBuy" label-width="120px" label-position="left">
        <el-form-item label="资产使用人员" prop="name">
          <el-input v-model="assetBuy.name" placeholder="请输入..." class="picc-icon-btn-input">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="资产性质" prop="name">
          <el-select v-model="assetBuy.name" type="text" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in industryInfoList" :key="index" :value="item.key"
                       :label="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产种类" prop="name">
          <el-select v-model="assetBuy.name" type="text" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in assetSortList" :key="index" :value="item.key"
                       :label="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产数量" prop="name">
          <el-input v-model="assetBuy.name" placeholder="请输入内容..." />
        </el-form-item>
        <!--<el-form-item label="资产配置" prop="name">
          <el-input
            v-model="assetBuy.name"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入内容..."
          />
        </el-form-item>
        <el-form-item label="采买途径" prop="name">
          <el-input v-model="assetBuy.name" placeholder="请输入内容..." />
        </el-form-item>
        <el-form-item label="价格参考" prop="name">
          <el-input v-model="assetBuy.name" placeholder="请输入内容..." />
        </el-form-item>-->
        <el-form-item label="资产备注" prop="name">
          <el-input
            v-model="assetBuy.name"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入内容..."
          />
        </el-form-item>
        <!--<el-form-item label="订单信息" prop="name">
          <el-input v-model="assetBuy.name" placeholder="请输入内容..." />
        </el-form-item>
        <el-form-item label="订单截图" prop="name">
          <el-input v-model="assetBuy.name" placeholder="请输入内容..." />
        </el-form-item>
        <el-form-item label="资产编号" prop="name">
          <el-input v-model="assetBuy.name" placeholder="请输入内容..." />
        </el-form-item>-->

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogAssetBuy=false">取消</el-button>
        <el-button type="primary" @click="confirmBuyRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import ElCard from "../../../node_modules/element-ui/packages/card/src/main.vue";

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  components: {ElCard},
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogAssetBuy: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },

      industryInfoList:[
        {
          "value": '消耗品',
          "key": "A"
        },
        {
          "value": '非消耗品定向',
          "key": "B"
        },
        {
          "value": '非消耗品非定向',
          "key": "C"
        }
      ],
      assetSortList:[
        {
          "value": '电脑',
          "key": "A"
        },
        {
          "value": '笔记本',
          "key": "B"
        },
        {
          "value": '卫生纸',
          "key": "C"
        },
        {
          "value": '桌子',
          "key": "D"
        },
        {
          "value": '椅子',
          "key": "E"
        },
        {
          "value": '夹子',
          "key": "F"
        }
      ],


      riskFactoryCheckApplyVo: {
        companyName: '',
        registrationNumber:'',
        companyAddress: '',
        industryInfo:'',
        expectedServiceDate: '',
        linkName:'',
        linkNumber: '',
        withSpecialRequire: '',
        pointx2000: '',
        pointy2000: '',
        addressDetail: '',
        addressProvince: '',
        addressCity: '',
        addressCounty: '',
        addressProvinceCode: '',
        addressCityCode: '',
        addressCountyCode: '',
        addressCode: '',
      },
      assetBuy: {
        name: ''
      },
      ruleValidate: {
        companyAddress: [
           {required: true,message: "不能为空"}
        ],
        linkName: [
          {required: true,message: "不能为空"}
        ]
      },
      ruleValidateAssetBuy: {
        name: [
          {required: true,message: "不能为空"}
        ],
      },
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    queryYGGH(){

    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleBuyAddRole() {
      this.dialogType = 'new'
      this.dialogAssetBuy = true
    },
    handleBuyEdit(scope) {
      this.dialogType = 'edit'
      this.dialogAssetBuy = true
//      this.checkStrictly = true
//      this.role = deepClone(scope.row)
//      this.$nextTick(() => {
//        const routes = this.generateRoutes(this.role.routes)
//        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
//        // set checked state of a node not affects its father and child nodes
//        this.checkStrictly = false
//      })
    },
    handleBuyDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },

    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        await updateRole(this.role.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.key = data.key
        this.rolesList.push(this.role)
      }

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
    },
    async confirmBuyRole() {
//      const isEdit = this.dialogType === 'edit'
      this.dialogAssetBuy = false
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-select{
    width: 100%
  }
  .form1 {
    margin-bottom: 32px;
  }
  .app-container {
    .roles-table {
      margin-top: 30px;
    }
    .permission-tree {
      margin-bottom: 30px;
    }
  }

  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
  }

</style>
