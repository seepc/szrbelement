<template>
  <div>
	<el-form ref="fm" :model="fm">
		员工代码: <el-input v-model="fm.usercode" placeholder="人员代码" style="width:20%"></el-input>
		&nbsp;&nbsp;
		员工姓名: <el-input v-model="fm.username" placeholder="人员姓名" style="width:20%"></el-input>
		<br><br>
		清单上载: 
		<el-upload ref="upload" 
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:file-list="fileList"
			:auto-upload="false"
			action="http://localhost:8080/static/">
		&nbsp;&nbsp;<el-button  slot="trigger"  type="primary" size="small">选择文件</el-button>
		&nbsp;&nbsp;<el-button  type="primary"  size="small" @click="uploadXLS">上载文件</el-button>
		&nbsp;&nbsp;<el-button  type="primary"  size="small" >模板下载</el-button>
		</el-upload>
		
		<br><br>
		<el-button  type="primary" size="small" @click="queryUmUser">查询</el-button>
		<el-button  type="primary" size="small" >下载</el-button>
	</el-form>
	<br>
	<el-table :data="userDG">
		<el-table-column prop="usercode"    label="人员代码"></el-table-column>
		<el-table-column prop="username"    label="人员姓名"></el-table-column>
		<el-table-column prop="mobileno"    label="手机号码"></el-table-column>
		<el-table-column prop="inserttime"  label="上传日期"></el-table-column>
	</el-table>
	<br>
	<el-pagination small layout="prev,pager,next" :total="50" @current-change="queryUmUser">
	</el-pagination>
		
  </div>
</template>
<script>
export default {
  created() {
  },
  data() {
    return {
		fileList : [],
		fm : {
			usercode : null,
			username : null,
			mobileno : null
		},
		userDG : [],
		
    }
  },
  methods: {
	handlePreview(file){
		console.log('file = ' + file);
	},
	handleRemove(file, fileList){
		console.log(file, fileList);
	},
	queryUmUser(pageIndex){
		var that = this;
		console.log('ctx = ' + that.ctx);
		if(pageIndex==null){pageIndex=1;}
		that.$axios({
			method: 'get',
			url: that.ctx + 'test.json?pageSize=50&pageIndex=' + pageIndex
        }).then((response) => {
			this.userDG = response.data;
        });
	},
	uploadXLS(){
		this.$refs.upload.submit();
	}
  }
}

</script>
<style scodpe>
</style>
