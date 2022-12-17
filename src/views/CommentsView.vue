<template>
    <div>
        <el-table :data="responsesInfo.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" :current-page.sync="currentPage">
            <el-table-column prop="respondIntro" label="响应内容" />
            <el-table-column prop="createTime" label="响应日期" />
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
                    <el-button size="small" @click="changeItem(scope.row)">
                        修改
                    </el-button>
                    <el-button size="small" @click="deleteItem(scope.row)">
                        删除
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
    name: "CommentsView",
    data() {
        return {
            responsesInfo: [],
            currentPage: 1,
            pageSize: 4,
        };
    },
    methods: {
        changeItem: function (row) {
            if (row.status == 0) {
                sessionStorage.setItem("rrequestId", row.requestId);
                sessionStorage.setItem("respondId", row.id);
                sessionStorage.setItem("respondContent", row.respondIntro);
                this.$router.push("/reviseAnswer");
            } else {
                alert("只有未被接受的请求才可以修改!");
            }
        },
        deleteItem: function (row) {
            if (row.status == 0) {
                var deleteId = row.id;
                axios
                    .get("response/delete", {
                        params: {
                            id: deleteId,
                        },
                    })
                    .then((out) => {
                        if (out.status == 200) {
                            this.getMyResponses();
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
        getMyResponses() {
            axios
                .get("response/getResponsesByUserId", {
                    params: {
                        id: sessionStorage.getItem("id"),
                    },
                })
                .then((out) => {
                    if (out.status == 200) {
                        this.responsesInfo = out.data.responses;
                    } else {
                        alert("出现错误，请刷新重试");
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        },
    },
    created: function () {
        this.getMyResponses();
    },
};
</script>