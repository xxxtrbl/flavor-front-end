<template>
    <el-table :data="this.userData" height="380" style="width: 100%" :cell-class-name="cellClassName" @cell-click="checkDetail">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="nickname" label="用户名" />
        <el-table-column prop="admin" label="管理员/用户">
            <template slot-scope="scope">{{ scope.row.admin === false ? '用户' : '管理员' }}</template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" />
        <el-table-column prop="idCard" label="身份证/其他">
            <template slot-scope="scope">{{ scope.row.idCard === false ? '其他' : '身份证' }}</template>
        </el-table-column>
        <el-table-column prop="idNum" label="证件号码" />
        <el-table-column prop="phone" label="电话号码" />
        <el-table-column prop="intro" label="简介" />
        <el-table-column prop="city" label="城市" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="createTime" label="修改时间" />
    </el-table>
</template>

<script>
import axios from "axios";
export default {
    name: "StatisticView",
    data() {
        return {
            userData: [],
        };
    },
    created: function () {
        axios.get("admin/users").then((out) => {
            if (out.status == 200) {
                this.userData = out.data.users;
                console.log(this.userData);
            } else {
                alert("获取用户信息失败, 请刷新重试");
            }
        });
    },
};
</script>