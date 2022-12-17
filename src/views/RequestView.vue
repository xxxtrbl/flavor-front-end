<template>
    <div>
        <el-input v-model="keyword" style="width:40%" placeholder="搜索关键词" />
        <el-button @click="fuzzySearch()">搜索(支持对内容、主题的模糊搜索)</el-button>
        <el-table :data="requestsInfo.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" :cell-class-name="cellClassName" @cell-click="checkDetail" :current-page.sync="currentPage">
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
                        绝一味菜
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="theme" label="主题" />
            <el-table-column prop="intro" label="内容" />
            <el-table-column prop="maxPrice" label="最大价钱" />
            <el-table-column prop="endDate" label="截至日期" />
            <el-table-column prop="createTime" label="创建日期" />
            <el-table-column prop="reviseTime" label="修改日期" />
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
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 4]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="requestsInfo.length">
        </el-pagination>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "RequestView",
    data() {
        return {
            requestsInfo: [],
            click_row: -1,
            pageSize: 4,
            currentPage: 1,
            keyword: "",
        };
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
        },
        // 当前页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        checkDetail: function (row) {
            this.click_row = row.index;
            this.curId = this.requestsInfo[row.index].requestId;
        },
        fuzzySearch: function () {
            axios
                .get("request/fuzzySearch", {
                    params: {
                        keyword: this.keyword,
                    },
                })
                .then((out) => {
                    if (out.status == 200) {
                        this.requestsInfo = out.data.requests;
                    } else {
                        alert("请刷新重试！");
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        },
    },
    created: function () {
        axios
            .get("/request/getAll")
            .then((out) => {
                if (out.status == 200) {
                    this.requestsInfo = out.data.requests;
                } else {
                    alert("请求错误,请刷新页面重试!");
                }
            })
            .catch((error) => {
                alert(error);
            });
    },
};
</script>