<template>
    <div class="breadcrumb">
        <div class="el-breadcrumb-margin" >


            <el-breadcrumb class="app-levelbar" separator="/">
                <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.name">
                    <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' :to="item.path" class="no-redirect">{{item.name}}</router-link>
                    <router-link v-else :to="item">{{item.name}}</router-link>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
    export default {
        created(){
            this.getBreadcrumb();
        },

        data() {
            return {
                levelList: null
            }
        },
        computed:{
            onRoutes(){
                let matched = this.$route.matched.filter(item => item.name);
                // console.log(matched);
                // console.$log(this.$route.path)
                return this.$route.path.replace('/','');
            }
        },
        methods:{
            getBreadcrumb(){
                let matched = this.$route.matched.filter(item => item.name);
                // console.log(matched);
                const first = matched[0];
                if (first && (first.name !== '首页' || first.path !== '')) {
                    matched = [{ name: '首页', path: '/' }].concat(matched)
                }else{
                    matched = null  //首页不显示面包屑
                }
                // console.log(matched);
                this.levelList = matched;
            }
        },
        watch: {
            $route() {
              this.getBreadcrumb();
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration:none; 
    }
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 60px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }

</style>