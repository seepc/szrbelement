<template>
	<div>
		<div class="header">
			<el-row>
                <el-col :span="14" class='home-title'>
                    <span class="picclogo"><img src="../../assets/picc.png"></span>
					<span class="system-Name">{{ sysName }}</span>
				</el-col>
				<el-col :span="6">
					<span>&nbsp</span>
				</el-col>
				<el-col :span="3" class="home-title">
          <el-dropdown>
          <span class="el-dropdown-link">
              <span class="userInfo">{{userCode}}-{{userName}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>密码修改</el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>

				</el-col>
				<el-col :span="1" class="home-title">
					<router-link to="/login">
                    <span class="userInfo"><i class="fa fa-sign-out"></i></span>
                    </router-link>
				</el-col>
			</el-row>
		</div>
	</div>

</template>

<script >
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      sysName: "人保财险后台基础框架模板"
    };
  },
  computed: {
    ...mapGetters(["userCode", "userName"])
  },
  methods: {}
};
</script>

<style scoped>
.header {
  height: 60px;
  /*background: #324057;*/ /*黑色主题头部*/
  background-color: rgb(81, 206, 206); /*浅绿色主题头部*/
  margin: auto;
}
.home-title {
  height: 60px;
  line-height: 60px;
}
.system-Name {
  margin-left: 10px;
  font-size: 18px;
  text-align: center;
  color: #fff;
}
.userInfo {
  font-size: 16px;
  color: #fff;
  margin: auto 5px;
}
.picclogo {
  /*display:inline-block;*/
  height: 60px;
  /*vertical-align:middle;*/
}
.picclogo img {
  margin-left: 9px;
  height: 20px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 16px;
}
</style>