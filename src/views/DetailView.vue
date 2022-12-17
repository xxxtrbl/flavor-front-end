<template>
    <el-descriptions title="用户信息" direction="vertical" :column="4" border>
        <el-descriptions-item label="用户id">{{this.info.id}}</el-descriptions-item>
        <el-descriptions-item label="用户密码">{{this.info.password}}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{this.info.nickname}}</el-descriptions-item>
        <el-descriptions-item label="用户类型">
            <el-tag size="small" v-if="info.isAdmin">管理员</el-tag>
            <el-tag size="small" v-else>用户</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="身份类型">
            <el-tag size="small" v-if="info.isIdCard">身份证</el-tag>
            <el-tag size="small" v-else>其他</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="证件号码">{{this.info.idNum}}</el-descriptions-item>
        <el-descriptions-item label="电话号码">{{this.info.phone}}</el-descriptions-item>
        <el-descriptions-item label="简介">{{this.info.intro}}</el-descriptions-item>
        <el-descriptions-item label="城市">{{this.info.city}}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{this.info.createTime}}</el-descriptions-item>
        <el-descriptions-item label="修改时间">{{this.info.reviseTime}}</el-descriptions-item>
    </el-descriptions>
</template>
<script>
import axios from "axios";
export default {
    name: "CheckDetailView",
    data() {
        return {
            info: {},
        };
    },
    created: function () {
        axios
            .get("user/info", {
                params: {
                    id: sessionStorage.getItem("userId"),
                },
            })
            .then((out) => {
                if (out.status == 200) {
                    this.info = out.data;
                } else {
                    alert("请刷新重试");
                }
            })
            .catch((error) => {
                alert(error);
            });
    },
};
</script>
<style>
</style>