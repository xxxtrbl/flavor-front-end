<template>
    <div>
        <el-table :data="responsesInfo.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" :cell-class-name="cellClassName" :current-page.sync="currentPage">
            <el-table-column prop="id" label="响应id" />
            <el-table-column prop="respondIntro" label="内容" />
            <el-table-column prop="respondUserId" label="响应用户id" />
            <el-table-column prop="createTime" label="创建日期" />
            <el-table-column prop="reviseTime" label="修改日期" />
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-tag type="warning" v-if="scope.row.status==0">
                        待接受
                    </el-tag>
                    <el-tag type="success" v-if="scope.row.status==1">
                        同意
                    </el-tag>
                    <el-tag type="danger" v-if="scope.row.status==2">
                        拒绝
                    </el-tag>
                    <el-tag type="info" v-if="scope.row.status==3">
                        取消
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="checkDetail(scope.row)">
                        查看用户
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 4]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="responsesInfo.length">
        </el-pagination>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "RecievedView",
    data() {
        return {
            responsesInfo: [],
            pageSize: 4,
            currentPage: 1,
        };
    },
    methods: {
        checkDetail: function (row) {
            sessionStorage.setItem("userId", row.respondUserId);
            this.$router.push("/checkDetail");
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
        axios.get("/response/getAll").then((out) => {
            if (out.status == 200) {
                this.responsesInfo = out.data;
            } else {
                alert("请求错误,请刷新页面重试!");
            }
        });
    },
};
</script>