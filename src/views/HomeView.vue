<template>
    <div class="home">
        <el-container style="height:100%;">
            <el-aside width="250px" style="background-color: rgb(238, 241, 246);">
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
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
                    <el-submenu index="2">
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
                    <el-submenu index="3">
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
                            <el-dropdown-item>
                                <router-link to="/login">
                                    登录
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link to="/signup">
                                    注册
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link to="/info">
                                    个人信息
                                </router-link>
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
        return {};
    },
    methods: {},
};
</script>
