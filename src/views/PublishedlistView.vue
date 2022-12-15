<template>
    <div>
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
                    <span v-if="scope.row.status==0">
                        已完成
                    </span>
                    <span v-if="scope.row.status==1">
                        待响应
                    </span>
                    <span v-if="scope.row.status==2">
                        已取消
                    </span>
                    <span v-if="scope.row.status==3">
                        到期未达成
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="changeItem(scope.row)">
                        修改
                    </el-button>
                    <el-button size="small" @click="deleteItem(scope.row)">
                        删除
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
    name: "PublishedlistView",
    data() {
        return {
            requestsInfo: [],
            click_row: -1,
            pageSize: 1,
            currentPage: 1,
        };
    },
    methods: {
        changeItem: function (row) {
            if (row.status == 1) {
                sessionStorage.setItem("requestId", row.requestId);
                this.$router.push("/tRevise");
            } else {
                alert("只有未响应的请求才可以修改!");
            }
        },
        deleteItem: function (row) {
            if (row.status == 1) {
                var deleteId = row.requestId;
                axios
                    .get("request/delete", {
                        params: {
                            id: deleteId,
                        },
                    })
                    .then((out) => {
                        if (out.status == 200) {
                            this.getMyRequests();
                        } else {
                            alert("出现错误,请刷新!");
                        }
                    });
            } else {
                alert("该请求不是未响应请求, 无法删除!");
            }
        },
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
        getMyRequests: function () {
            axios
                .get("/request/getMyRequests", {
                    params: {
                        id: sessionStorage.getItem("id"),
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
    },
    created: function () {
        this.getMyRequests();
    },
};
</script>