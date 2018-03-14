<template>
  <div>
    <el-form ref="fm" :model="fm">
      角色代码:
      <el-input v-model="fm.roleid" placeholder="角色代码" style="width:20%"></el-input>
      &nbsp;&nbsp; 角色名称:
      <el-input v-model="fm.rolename" placeholder="角色名称" style="width:20%"></el-input>
      &nbsp;&nbsp;
      <br>
      <br>
      <el-button type="primary" size="small" icon="search" @click="queryUmRole">查询</el-button>
      <el-button type="primary" size="small" icon="plus" @click="showModuleDIV">新增</el-button>
    </el-form>
    <br>
    <el-table :data="roleDG">
      <el-table-column prop="roleid" label="角色代码"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="remark" label="概要介绍"></el-table-column>
      <el-table-column prop="validstatus" label="有效标志" :formatter="fmValids"></el-table-column>
      <el-table-column label="人员配置">
        <template slot-scope="scope">
          <el-button @click="showUserRole(scope.$index,scope.row)" type="text" size="small">人员配置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="菜单配置">
        <template slot-scope="scope">
          <el-button @click="showModuleDIV(scope.$index,scope.row)" type="text" size="small">
            菜单配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination small layout="prev, pager, next" :total="50" @current-change="queryUmRole"></el-pagination>
    <!-- ********************************************************************************* -->
    <el-dialog title="菜单配置" :visible.sync="moduleDIV" style="width:110%">
      <el-form :model="moduleFm">
        角色代码:
        <el-input v-model="moduleFm.roleid" :disabled="true" auto-complete="off" style="width:30%"></el-input>
        &nbsp;&nbsp;角色名称:
        <el-input v-model="moduleFm.rolename" auto-complete="off" style="width:30%"></el-input>
        <el-button type="primary" size="small" @click="updateRoleModule">保存</el-button>
        <br>
        <br> 概要介绍:
        <el-input v-model="moduleFm.remark" auto-complete="off" style="width:80%"></el-input>
        <p></p>
        <!-- <el-tree ref="tree" :data="moduleTree"  default-expand-all="true" show-checkbox node-key="mdid"  :check-strictly="true" :default-checked-keys="roleModule" :prop="defaultProps">
          </el-tree> -->

        <div class="tree-block">
          <el-tree ref="tree" :data="moduleTree" show-checkbox :default-expand-all="true" :expand-on-click-node="true" :check-strictly="checkNature"  node-key="mdid" :default-checked-keys="roleModule" :prop="defaultProps">
          </el-tree>
        </div>
      </el-form>
      <!-- <el-input v-model="moduleFm.roleid" disabled="false" placeholder="请输入内容" style="width:30%" ></el-input> -->
    </el-dialog>

    <!-- ********************************************************************************* -->
    <!-- ********************************************************************************* -->
    <!-- ********************************************************************************* -->
    <!-- ********************************************************************************* -->
    <!-- ********************************************************************************* -->
    <el-dialog title="人员配置" :visible.sync="userRoleDIV" style="width:110%">
      <el-form :model="userRoleFm">
        角色代码:
        <el-input v-model="userRoleFm.roleid" :disabled="true" style="width:30%"></el-input>
        &nbsp;&nbsp;角色名称:
        <el-input v-model="userRoleFm.rolename" :disabled="true" style="width:30%"></el-input>
        <!-- <el-button type="primary" size="small" @click="updateUserRole">保存</el-button> -->
        <br/>
        <br/> 概要介绍:
        <el-input v-model="userRoleFm.remark" :disabled="true" style="width:80%"></el-input>
        <br/>
        <br/>
        <el-button @click="insertUserRow()" type="success" size="small">新增人员</el-button>
        <p></p>
        &nbsp;&nbsp;
        <p></p>
        <el-table :data="userDG">
          <el-table-column prop="usercode" label="人员代码">
          </el-table-column>
          <el-table-column prop="username" label="人员名称">
          </el-table-column>
          <el-table-column prop="comname" label="部门">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="removeUserRow(scope.$index,scope.row)" type="danger" size="small">
                删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-dialog>
    <!-- ********************************************************************************* -->
    <!-- ********************************************************************************* -->
    <!-- ********************************************************************************* -->
    <!-- ********************************************************************************* -->
    <el-dialog title="人员清单" :visible.sync="usersDIV" style="width:110%">
      <el-table :data="usersDG">
        <el-table-column prop="usercode" label="人员代码"></el-table-column>
        <el-table-column prop="username" label="人员名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="setUserRow(scope.$index,scope.row)" type="success" size="small">
              选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small layout="prev, pager, next" :total="5" @current-change="queryUmUser"></el-pagination>
    </el-dialog>
    <!-- ********************************************************************************* -->
  </div>
</template>
<script>
import * as api from '@/api/permission/role.js';
export default {
  created() { },
  data() {
    return {
      fm: {
        roleid: '',
        rolename: ''
      },
      /***确定角色代码是否可编辑,若更新则不可编辑,新增则可编辑****/
      // roleidShow: false,
      /****角色清单数据******/
      roleDG: [],
      moduleDIV: false,
      moduleFm: {
        roleid: '',
        rolename: '',
        remark: ''
      },
      moduleTree: [],   //模块树初始值为空,异步获取
      /****roleModule用于保存该角色下配置的功能菜单列表****/
      roleModule: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      /*****userDG用于保存该角色下关联的人员清单,usersDG用于分页保存数据权限下可查询的人员清单******/
      userRoleDIV: false,
      userRoleFm: {
        roleid: '',
        rolename: '',
        remark: ''
      },
      userDG: [],
      usersDIV: false,
      addUserRoleId: '',
      userRow: 1,
      usersDG: [{
        "usercode": "10061657",
        "username": "陈晋"
      }, {
        "usercode": "10061658",
        "username": "陈鹏程"
      }],
      checkNature:true,
    }
  },
  computed: {
    //角色菜单选中数据
    // moduleFmData(){
    //   let data = this.moduleFm;
    //   data.treeNode=this.$refs.tree.getCheckedKeys();
    //   return data;
    // },
  },
  methods: {
    fmValids(row, column){
      // console.log(row.validstatus)
      if(row.validstatus ==="1"){
        return "有效";
      }else{
        return "无效";
      }
    },
    /*****查询系统的角色清单*****/
    queryUmRole(pageIndex) {
      api.getUmRolePage(pageIndex, this.fm).then((response) => {
        this.roleDG = response.data.entities;
      });
    },
    /*****配置角色详情,如角色名称,简介,关联的功能菜单等...*******/
    showModuleDIV(index, row) {
      
      if (row != null) {
        this.moduleFm.roleid = row['roleid'];
        this.moduleFm.rolename = row['rolename'];
        this.moduleFm.remark = row['remark'];
        // this.roleidShow = true;
      } else {
        // alert("123");
        // this.roleidShow = false;
        this.moduleFm = {
          roleid: '',
          rolename: '',
          remark: ''
        };
      }
      /****第1步:获取功能模块菜单树******/
      api.getAllModuleTree().then((response) => {

        this.moduleTree = response.data;
        // console.log(this.moduleTree);
      });

      this.moduleDIV = true;
      // var that = this;
      /****第2步:获取该角色已配置的模块菜单*******/
      console.log('roleid = ' + this.moduleFm.roleid);
      if (row != null) {
        api.getRoleModule(this.moduleFm.roleid).then((response) => {
          
          this.roleModule = response.data;
          // console.log(this.roleModule);
        });
      } else {
        this.roleModule = [];
      }


    },
    /****更新或者新增与角色相关联的功能菜单...*********/
    updateRoleModule() {
      this.moduleFm.treeNode = this.$refs.tree.getCheckedKeys();
      api.saveRoleAndModule(this.moduleFm).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            showClose: true
          });
          //保存成功,隐藏窗口
          this.queryUmRole();
          this.moduleDIV = false;
        } else {
          this.$message({
            message: res.message,
            showClose: true
          });
        }
      });
    },
    /****显示该角色下的所有人员清单******/
    showUserRole(index, row) {

      api.getUmRoleUserPage(row['roleid']).then((response) => {
        this.userDG = response.data.entities;
        console.log(this.userDG);
      });

      this.userRoleFm.roleid = row['roleid'];
      this.userRoleFm.rolename = row['rolename'];
      this.userRoleFm.remark = row['remark'];
      this.userRoleDIV = true;
    },
    /****新增该角色下的人员*******/
    insertUserRow() {
      this.$prompt('请输人员代码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '人员代码不正确'
      }).then(({ value }) => {
        api.addUmRoleUser(value, this.userRoleFm.roleid).then((response) => {
          if (response.code === 200) {
            api.getUmRoleUserPage(this.userRoleFm.roleid).then((response) => {
              this.userDG = response.data.entities;
              console.log(this.userDG);
            });
            this.$message({
              type: 'success',
              message: '添加成功'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消添加操作'
        });
      });
    },
    /****删除该角色下的人员*******/
    removeUserRow(index, row) {
      api.delUmRoleUser(row['urid']).then((response) => {
        if (response.code === 200) {
          this.userDG.splice(index, 1);
        }
      });
    },
    /****更新该角色下的人员清单*****/
    updateUserRole() {
      var that = this;
      /*****将数组roleid转为服务可接收的数据进行传递*****/
      var uri = that.ctx + 'message.json?roleid=' + this.userRoleFm.roleid;
      for (var i = 0, length = that.userDG.length; i < length; i++) {
        uri = uri + '&usercode=' + that.userDG[i].usercode;
      }
      console.log('uri = ' + uri);
      that.$axios({
        method: 'get',
        url: uri
      }).then((response) => {
        var res = response.data;
        if (res != null) {
          this.$message({
            message: res.hint,
            showClose: true
          });
        } else {
          this.$message({
            message: '系统异常!!',
            showClose: true
          });
        }
      });
    },
    /*****显示可选择的用户清单********/
    showUsersDIV(index, row) {
      this.userRow = index;
      this.queryUmUser();
      this.usersDIV = true;
    },
    /*****将选择的用户带回角色人员配置面板*********/
    setUserRow(index, row) {
      this.userDG[this.userRow].usercode = row.usercode;
      this.userDG[this.userRow].username = row.username;
      this.usersDIV = false;
    },
    /*****分页查询可选择的用户清单********/
    queryUmUser(pageIndex) {
      var that = this;
      console.log('page index = ' + pageIndex);
      if (pageIndex == null) {
        pageIndex = 1;
      }
      that.$axios({
        method: 'get',
        url: that.ctx + 'users.json?pageSize=5&pageIndex=' + pageIndex
      }).then((response) => {
        that.usersDG = response.data;
      });
    }
  }
}
</script>
<style scodpe>
.tree-block{
  border: 1px solid #DCDFE6;

}
</style>
