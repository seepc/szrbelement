<template>
  <div>
    <el-form ref="fm" :model="fm">
      人员代码:
      <el-input v-model="fm.usercode" placeholder="人员代码" style="width:20%"></el-input>
      &nbsp;&nbsp; 人员姓名:
      <el-input v-model="fm.username" placeholder="人员姓名" style="width:20%"></el-input><br/><br/>
      手机号码:
      <el-input v-model="fm.mobileno" placeholder="手机号码" style="width:20%"></el-input>
      &nbsp;&nbsp; 机构代码:
      <el-input v-model="fm.comcode" placeholder="机构代码" style="width:20%"></el-input>
      <br>
      <br>
      <p class="tips">提示:机构代码支持模糊查询,可填写前4位或前6为进行模糊查询</p>
      <el-button type="primary" size="small" icon="search" @click="queryUmUser">查询</el-button>
      <el-button type="primary" size="small" icon="plus" @click="showMoreDIV">新增</el-button>
    </el-form>
    <br>
    <el-table :data="userDG">
      <el-table-column prop="usercode" label="人员代码"></el-table-column>
      <el-table-column prop="username" label="人员姓名"></el-table-column>
      <el-table-column prop="comcode" label="机构代码"></el-table-column>
      <el-table-column prop="mobileno" label="手机号码"></el-table-column>
      <el-table-column prop="validstatus" label="有效标志" :formatter="fmValids"></el-table-column>
      <el-table-column label="详细信息">
        <template slot-scope="scope">
          <el-button @click="showMoreDIV(scope.$index,scope.row)" type="text" size="small">详细信息</el-button>
        </template>
      </el-table-column>
      <el-table-column label="角色配置">
        <template slot-scope="scope">
          <el-button @click="showRoleDIV(scope.$index,scope.row)" type="text" size="small">角色配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination small layout="prev,pager,next" :total="50" @current-change="queryUmUser">
    </el-pagination>
    <!-- ********************************************************************************* -->
    <!-- ********************************************************************************* -->
    <el-dialog title="详细信息" :visible.sync="moreDIV">
      <el-form :model="moreFm" label-width="80px">
        <div class="divbox">
          <div>
            <el-form-item label="人员代码">
              <el-input v-model="moreFm.usercode" v-bind:disabled="disabled">
              </el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="moreFm.mobileno"></el-input>
            </el-form-item>
            <el-form-item label="用户密码">
              <el-input type="password" v-model="moreFm.passwd"></el-input>
            </el-form-item>
            <el-form-item label="权限等级">
              <el-select v-model="moreFm.datalevel">
                <el-option v-for="item in datalevelOp" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="人员姓名">
              <el-input v-model="moreFm.username"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="moreFm.email"></el-input>
            </el-form-item>
            <el-form-item label="机构代码">
              <el-select v-model="moreFm.comcode" filterable allow-create>
                <el-option v-for="item in comcodes" :key="item.comcode" :label="item.comcname" :value="item.comcode">
                  <span style="float: left">{{ item.comcname }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.comcode }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有效标记">
              <el-select v-model="moreFm.validstatus">
                <el-option v-for="item in validstatusOp" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="block">
          <el-button class="moreDivBtn" @click="moreDIV=false" size="small">取消</el-button>
          <el-button class="moreDivBtn" type="primary" @click="saveUmUser" size="small">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- ********************************************************************************* -->
    <!-- ********************************************************************************* -->
    <el-dialog title="角色配置" :visible.sync="roleDIV">
      <el-form :model="roleFm">
        人员代码 :
        <el-input v-model="roleFm.usercode" :disabled="true" style="width:20%"></el-input>
        &nbsp;&nbsp; 人员名称:
        <el-input v-model="roleFm.username" :disabled="true" style="width:20%"></el-input>
        &nbsp;&nbsp;
        <el-button @click="saveRole()" type="primary" size="small">保存</el-button>
        <p></p>
        <el-select v-model="userRole" style="width:90%" multiple placeholder="请选择">
          <el-option v-for="item in roleies" :key="item.roleid" :label="item.rolename" :value="item.roleid">
          </el-option>
        </el-select>
      </el-form>
    </el-dialog>
    <!-- ********************************************************************************* -->
  </div>
</template>
<script>
//引入用户api
import * as api from '@/api/permission/user.js'
export default {
  created() { },
  data() {
    return {
      fm: {
        usercode: '',
        username: '',
        mobileno: '',
        comcode:''
      },
      userDG: [],
      /***确定用户代码是否可编辑,若更新则不可编辑,新增则可编辑****/
      disabled: false,

      /*****moreFm用于保存用户的信息详情,comcodes用于保存用户权限范围内可选的机构*******/
      moreFm: {
        usercode: '',
        username: '',
        mobileno: '',
        comcode: '',
        email: '',
        passwd: '',
        datalevel: 0,
        validstatus:''
      },
      comcodes: [{ "comcode": "44030300", "comcname": "华强支公司" }, { "comcode": "44030800", "comcname": "福田支公司" }],
      moreDIV: false,

      /*********userRole用于保存该用户相关联的角色数组,roleies用于保存用户数据权限内可选择的角色清单******/
      roleFm: {
        usercode: '',
        username: ''
      },
      userRole: [],
      roleies: [],
      roleDIV: false,
      datalevelOp:[{
          value: '0',
          label: '分公司'
        }, {
          value: '1',
          label: '支公司'
        }, {
          value: '2',
          label: '团队'
        }, {
          value: '3',
          label: '个人'
        }],
      validstatusOp:[{
          value: '0',
          label: '无效'
        }, {
          value: '1',
          label: '有效'
        }],
    }
  },
  methods: {
    fmValids(row, column){
      if(row.validstatus ==="1"){
        return "有效";
      }else{
        return "无效";
      }
    },
    /*****分页查询人员清单*****/
    queryUmUser(pageIndex) {
      api.getUmUserPage(pageIndex, this.fm).then((response) => {
        this.userDG = response.data.entities;
      });
    },
    /************用户信息保存....*************/
    saveUmUser() {
      api.saveUmUser(this.moreFm).then((response) => {
        console.log(response);
        if (response.code === 200) {
          this.$message({ message: response.message, showClose: true });
          this.moreDIV = false;
        }
      });
    },

    /*****显示用户的详细编辑页面....******/
    showMoreDIV(index, row) {
      /****第一步:获取详细的机构代码数据*********/
      api.getUmComPage().then((response) => {
        console.log(response.data);
        this.comcodes = response.data;
      });

      if (index == null || row == null) {
        this.moreDIV = true;
        this.disabled = false;
        this.moreFm = { usercode: '', username: '', mobileno: '', comcode: '', email: '', passwd: '',datalevel:'3',validstatus:'1' };
        return;
      } else { this.disabled = true; }

      /****第二步:根据传递的usercode,获取完整的账户数据,含手机号码,机构代码等...*****/
      api.getUmUser(row['usercode']).then((response) => {
        console.log(response.data);
        this.moreFm = response.data;
      });


      /****第三步:显示帐户详情的模态窗口,******/
      this.moreDIV = true;
    },

    /****显示用户角色配置详情的模态窗口********/
    showRoleDIV(index, row) {
      if (index == null || row == null) { return; }

      /****第一步:将用户名和用户名称赋值给roleFm表单相应的变量,使弹出框能显示用户信息********/
      this.roleFm.usercode = row['usercode'];
      this.roleFm.username = row['username'];
      this.userRole = [];
      /****第二步:获取该用户已配置的角色数组*********/
      api.getUmUserrole(row['usercode']).then((response) => {
        response.data.entities.filter(item => {
          this.userRole.push(item.roleid);
        });
        console.log(this.userRole);
      });

      /****第三步:获取系统中所有的角色清单数组*********/
      var that = this;
      api.getUmRolePage().then((response) => {
        this.roleies = response.data.entities;
      });

      this.roleDIV = true;
    },
    /*****保存用户的角色信息******/
    saveRole() {

      let usercode = this.roleFm.usercode;
      let userRole = this.userRole;

      // console.log('uri = ' + uri);
      api.refreshUmUserRole({ usercode, userRole }).then((response) => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '角色配置成功'
          });
          this.roleDIV = false;
        }
      });
    }
  }
}

</script>
<style scodpe>
.divbox {
  display: -webkit-box;
  display: box;
  width: 50%
}

.block {
  display: block;
  width: 100%;
  margin: 0px auto;
  text-align: center;
  /*width: 20%;*/
  /*width: 100%;*/
}
.tips{
  color: #888888;
}
</style>
