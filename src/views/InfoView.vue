<template>
    <el-descriptions title="用户信息" direction="vertical" :column="4" border>
        <el-descriptions-item label="用户id">{{this.info.id}}</el-descriptions-item>
        <el-descriptions-item label="用户密码">
            {{this.info.password}}
            <el-input size="small" style="width:150px" type="password" show-password v-model="newPwd" />
            <el-button size="small" @click="revisePwd()">修改</el-button>
        </el-descriptions-item>
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
        <el-descriptions-item label="电话号码">{{this.info.phone}}
            <el-input size="small" style="width:150px" v-model="newPhone" />
            <el-button size="small" @click="revisePhone()">修改</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="城市">{{this.info.city}}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{this.info.createTime}}</el-descriptions-item>
        <el-descriptions-item label="修改时间">{{this.info.reviseTime}}</el-descriptions-item>
        <el-descriptions-item label="简介">{{this.info.intro}}
            <el-input size="small" style="width:150px" v-model="newIntro" />
            <el-button size="small" @click="reviseIntro()">修改</el-button>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script>
import axios from "axios";
export default {
    name: "InfoView",
    data() {
        return {
            info: {},
            newPwd: "",
            newPhone: "",
            newIntro: "",
        };
    },
    created: function () {
        axios
            .get("user/info", {
                params: {
                    id: sessionStorage.getItem("id"),
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
    methods: {
        getInfo: function () {
            info.id = sessionStorage.getItem("id");
            axios
                .get("/user/info", {
                    params: {
                        id: info.id,
                    },
                })
                .then((out) => {
                    if (out.status == 200) {
                        this.$router.go(0);
                    } else {
                        alert("请求错误, 请重试!");
                    }
                });
        },
        revisePhone: function () {
            if (this.newPhone == "") {
                alert("请输入新电话号码!");
            } else {
                axios
                    .get("/user/revisePhone", {
                        params: {
                            id: this.info.id,
                            newPhone: this.newPhone,
                        },
                    })
                    .then((out) => {
                        if (out.status == 200) {
                            alert("修改成功!");
                            this.$router.go(0);
                        } else {
                            alert("服务器错误, 请重试!");
                        }
                    });
            }
        },
        revisePwd: function () {
            if (this.newPwd == "") {
                alert("请输入新密码!");
            } else {
                this.info.pwd = this.newPwd;
                axios.post("/user/reviseInfo", this.info).then((out) => {
                    if (out.status == 200) {
                        alert("修改成功!");
                        this.$router.go(0);
                    } else {
                        alert("服务器错误, 请重试!");
                    }
                });
            }
        },
        reviseIntro: function () {
            if (this.newIntro == "") {
                alert("请输入新简介!");
            } else {
                axios
                    .get("/user/reviseIntro", {
                        params: {
                            id: this.info.id,
                            newIntro: this.newIntro,
                        },
                    })
                    .then((out) => {
                        if (out.status == 200) {
                            alert("修改成功!");
                            this.$router.go(0);
                        } else {
                            alert("服务器错误, 请重试!");
                        }
                    });
            }
        },
    },
};
</script>
<style scoped>
ul {
    list-style: none;
}

#root {
    display: flex;
    flex-direction: column;
    height: 80%;
    justify-content: space-between;
    padding-left: 25%;
    padding-right: 25%;
    padding-top: 5%;
}
</style>