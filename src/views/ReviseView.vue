<template>
    <div>
        <el-descriptions title="请求信息">
            <el-descriptions-item label="用户名">{{this.info.userId}}</el-descriptions-item>
            <el-descriptions-item label="城市">{{this.info.city}}</el-descriptions-item>
            <el-descriptions-item label="口味">
                <el-tag size="small" v-if="this.info.flavorType==0">家乡小吃</el-tag>
                <el-tag size="small" v-if="this.info.flavorType==1">地方特色小馆</el-tag>
                <el-tag size="small" v-if="this.info.flavorType==2">香辣味</el-tag>
                <el-tag size="small" v-if="this.info.flavorType==3">甜酸味</el-tag>
                <el-tag size="small" v-if="this.info.flavorType==4">绝一味菜</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="主题">{{this.info.theme}}</el-descriptions-item>
            <el-descriptions-item label="简介">{{this.info.intro}}</el-descriptions-item>
            <el-descriptions-item label="最大价格">{{this.info.maxPrice}}元</el-descriptions-item>
            <el-descriptions-item label="截止日期">{{this.info.endDate}}</el-descriptions-item>
            <el-descriptions-item label="状态">
                <el-tag size="small" v-if="this.info.status==0">已完成</el-tag>
                <el-tag size="small" v-if="this.info.status==1">待响应</el-tag>
                <el-tag size="small" v-if="this.info.status==2">已取消</el-tag>
                <el-tag size="small" v-if="this.info.status==3">到期未达成</el-tag>
            </el-descriptions-item>
        </el-descriptions>
        <div>
            <h4>响应信息</h4>
            <el-input type="textarea" :disabled="this.info.status!=1" v-model="respondInfo.respondIntro" placeholder="请输入响应内容" maxlength="50" show-word-limit>
            </el-input>
            <el-button size="small" :disabled="this.info.status!=1" @click="submit()">修改响应</el-button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "ReviseView",
    data() {
        return {
            info: {},
            respondInfo: {
                id: sessionStorage.getItem("respondId"),
                requestId: sessionStorage.getItem("rrequestId"),
                respondUserId: sessionStorage.getItem("id"),
                respondIntro: sessionStorage.getItem("respondContent"),
                createTime: "",
                reviseTime: "",
                status: 0,
            },
        };
    },
    methods: {
        submit: function () {
            if (this.response == "") {
                alert("请输入响应内容!");
            } else {
                this.respondInfo.respondUserId = sessionStorage.getItem("id");
                axios
                    .post("response/revise", this.respondInfo)
                    .then((out) => {
                        if (out.status == 200) {
                            alert("响应已发送!");
                            this.$router.push("/myComments");
                        } else {
                            alert("请刷新重试!");
                        }
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
        },
    },
    created: function () {
        axios
            .get("request/searchByRequestId", {
                params: {
                    requestId: sessionStorage.getItem("rrequestId"),
                },
            })
            .then((out) => {
                if (out.status == 200) {
                    this.info = out.data;
                } else {
                    alert("请刷新重试");
                }
            });
    },
};
</script>