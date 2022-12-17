<template>
    <div>
        <el-header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <span>
            <el-tag type="info">您所在的地区是: {{this.city}}</el-tag>
        </span>
        <el-table :data="requestsInfo.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" :cell-class-name="cellClassName" :current-page.sync="currentPage">
            <el-table-column prop="flavorType" label="口味">
                <template slot-scope="scope">
                    <span v-if="scope.row.flavorType==0">
                        家乡小吃
                    </span>
                    <span v-if="scope.row.flavorType==1">
                        地方特色小馆
                    </span>
                    <span v-if="scope.row.flavorType==2">
                        香辣味
                    </span>
                    <span v-if="scope.row.flavorType==3">
                        甜酸味
                    </span>
                    <span v-if="scope.row.flavorType==4">
                        绝一位菜
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="theme" label="主题" />
            <el-table-column prop="intro" label="内容" />
            <el-table-column prop="maxPrice" label="最大价钱" />
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status==0">
                        已完成
                    </el-tag>
                    <el-tag type="warning" v-if="scope.row.status==1">
                        待响应
                    </el-tag>
                    <el-tag type="info" v-if="scope.row.status==2">
                        已取消
                    </el-tag>
                    <el-tag type="danger" v-if="scope.row.status==3">
                        到期未达成
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="answerRequest(scope.row)">
                        查看详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 4]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="requestsInfo.length">
        </el-pagination>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "LocalflavorView",
    data() {
        return {
            requestsInfo: [],
            pageSize: 4,
            currentPage: 1,
            city: "",
        };
    },
    methods: {
        answerRequest: function (row) {
            sessionStorage.setItem("requestId2", row.requestId);
            this.$router.push("/answer");
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        // 当前页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
    },
    created: function () {
        this.city = sessionStorage.getItem("city");
        axios
            .get("/request/filterByCity", {
                params: {
                    city: sessionStorage.getItem("city"),
                },
            })
            .then((out) => {
                if (out.status == 200) {
                    this.requestsInfo = out.data.requests;
                } else {
                    alert("请求错误,请刷新页面重试!");
                }
            });
    },
};
</script>
<style>
.el-header {
    padding: 0 0;
    box-sizing: border-box;
    flex-shrink: 0;
}
</style>