<template>
    <div class="home">
        <el-container style="height:100%;">
            <el-aside width="250px" style="background-color: rgb(238, 241, 246);">
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1" v-if="!this.isAdmin">
                        <template slot="title"><i class="el-icon-message"></i>寻味道</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <router-link to="/publish">
                                    我要发布
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link to="/publishedList">
                                    我发布的
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="1-3">
                                <router-link to="/revise">
                                    我要修改/删除
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="1-4">
                                <router-link to="/responsed">
                                    响应我的
                                </router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2" v-if="!this.isAdmin">
                        <template slot="title"><i class="el-icon-message"></i>请品鉴</template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">
                                <router-link to="/localFlavor">
                                    本地味道
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <router-link to="/myComments">
                                    我的品鉴(接受/未接受响应)
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="2-3">
                                <router-link to="/tRevise">
                                    我要修改/删除
                                </router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3" v-if="this.isAdmin">
                        <template slot="title"><i class="el-icon-message"></i>我是管理员</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">
                                <router-link to="/statistic">
                                    用户统计
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="3-2">
                                <router-link to="/searchFlavor">
                                    寻味道
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="3-3">
                                <router-link to="/recievedMsg">
                                    接受的请求信息
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="3-4">
                                <router-link to="/feeStatistic">
                                    中介统计
                                </router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-if="!this.isLogged">
                                <router-link to="/login">
                                    登录
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item v-if="!this.isLogged">
                                <router-link to="/signup">
                                    注册
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item v-if="this.isLogged&&(!this.isAdmin)">
                                <router-link to="/info">
                                    个人信息
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item v-if="this.isLogged">
                                <a @click="signOut()">退出登录</a>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span></span>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isAdmin: false,
            isLogged: false,
        };
    },
    methods: {
        signOut: function () {
            this.$router.push("/");
            this.$router.go(0);
            sessionStorage.clear();
            this.isAdmin = false;
            this.isLogged = false;
        },
    },
    created: function () {
        if (sessionStorage.getItem("admin") != null) {
            this.isAdmin = true;
            this.isLogged = true;
        } else if (sessionStorage.getItem("id") != null) {
            this.isLogged = true;
        }
    },
};
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>