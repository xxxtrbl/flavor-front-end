<template>
    <div>
        <el-table :data="responsesInfo.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" :cell-class-name="cellClassName" :current-page.sync="currentPage">
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
                    <el-button size="small" @click="admitItem(scope.row)">
                        同意
                    </el-button>
                    <el-button size="small" @click="rejectItem(scope.row)">
                        拒绝
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
    name: "ResponsedView",
    data() {
        return {
            responsesInfo: [],
            pageSize: 4,
            currentPage: 1,
            info: {
                respondId: "",
                requestUser: "",
                respondUser: "",
                city: "",
                successDate: "",
            },
        };
    },
    methods: {
        admitItem: function (row) {
            if (row.status == 0) {
                sessionStorage.setItem("requestId", row.requestId);
                //改变状态
                axios
                    .get("response/agree", {
                        params: {
                            responseId: row.id,
                        },
                    })
                    .then((out) => {
                        if (out.status == 200) {
                            row.status = 1;
                            this.$router.go(0);
                        } else {
                            alert("请重试！");
                        }
                    });
                //加入Bargain
                this.info.respondId = row.id;
                this.info.requestUser = sessionStorage.getItem("id");
                this.info.respondUser = row.respondUserId;
                this.info.city = sessionStorage.getItem("city");
                var Currentdate = this.GetFormattedDate(new Date());
                this.info.successDate = Currentdate;
                axios
                    .post("response/addBargain", this.info)
                    .then((out) => {
                        if (out.status == 200) {
                            axios
                                .post("admin/addBargainToReport", this.info)
                                .then((out) => {
                                    if (out.status == 200) alert("交易成功");
                                    this.$router.go(0);
                                })
                                .catch((error) => {
                                    alert(error);
                                });
                        }
                    })
                    .catch((error) => {
                        alert(error);
                    });
            } else {
                alert("只能同意未被接受的请求!");
            }
        },
        GetFormattedDate(date) {
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            var year = date.getFullYear();
            var hour = ("0" + date.getHours()).slice(-2);
            var min = ("0" + date.getMinutes()).slice(-2);
            var sec = ("0" + date.getSeconds()).slice(-2);
            return (
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hour +
                ":" +
                min +
                ":" +
                sec
            );
        },
        rejectItem: function (row) {
            if (row.status == 0) {
                var deleteId = row.id;
                axios
                    .get("response/reject", {
                        params: {
                            responseId: deleteId,
                        },
                    })
                    .then((out) => {
                        if (out.status == 200) {
                            this.$router.go(0);
                        } else {
                            alert("出现错误,请刷新!");
                        }
                    });
            } else {
                alert("该请求不是未响应请求, 无法拒绝!");
            }
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
        axios
            .get("/response/getReceivedByUserId", {
                params: {
                    userId: sessionStorage.getItem("id"),
                },
            })
            .then((out) => {
                if (out.status == 200) {
                    this.responsesInfo = out.data.responses;
                } else {
                    alert("请求错误,请刷新页面重试!");
                }
            });
    },
};
</script>