<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <div class="el-breadcrumb-margin">
                <v-breadcrumb></v-breadcrumb>
            </div>

            <transition name="move" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vBreadcrumb from './Breadcrumb.vue';
// import vPage from '@/views/pages/Page.vue';
export default {
    components: {
        vHead,
        vSidebar,
        vBreadcrumb
    }
}
</script>

<style scodpe>
.content {
    background: none repeat scroll 0 0 #fafafa;
    position: absolute;
    left: 250px;
    right: 0;
    top: 60px;
    bottom: 0;
    width: auto;
    padding: 10px 40px;
    box-sizing: border-box;
    overflow-y: scroll;
}

.el-breadcrumb-margin {
    margin: 20px 0;
}
</style>