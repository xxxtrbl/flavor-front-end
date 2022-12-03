<template>
    <div id="root">
        <span>用户名:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{curUser.nickname}}</span>
        <span>密码:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{curUser.password}}
            <input type="password" name="newpassword" placeholder="请输入新密码" v-model="newPwd">
            <button @click="revisePwd()">修改密码</button></span>
        <span>用户类型:&nbsp&nbsp&nbsp&nbsp{{curUser.admin == 0? "用户" : "管理员"}}</span>
        <span>用户姓名:&nbsp&nbsp&nbsp&nbsp{{curUser.userName}}</span>
        <span>证件类型:&nbsp&nbsp&nbsp&nbsp{{curUser.isId==1?"身份证件":"其他证件"}}</span>
        <span>证件号码:&nbsp&nbsp&nbsp&nbsp{{curUser.idNum}}</span>
        <span>手机号码:&nbsp&nbsp&nbsp&nbsp{{curUser.phone}}
            <input type="password" name="newphone" placeholder="请输入新手机号" v-model="newPhone">
            <button @click="revisePhone()">修改号码</button></span>
        <span>用户级别:&nbsp&nbsp&nbsp&nbsp{{curUser==0?"普通":"VIP"}}</span>
        <span>用户简介:&nbsp&nbsp&nbsp&nbsp{{curUser.intro}}
            <input type="text" name="newintro" placeholder="请输入新简介" v-model="newIntro">
            <button @click="reviseIntro()">修改简介</button></span>
        <span>注册城市:&nbsp&nbsp&nbsp&nbsp{{curUser.city}}</span>
        <span>注册时间:&nbsp&nbsp&nbsp&nbsp{{curUser.createTime}}</span>
        <span>修改时间:&nbsp&nbsp&nbsp&nbsp{{curUser.reviseTime}}</span>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "InfoView",
    data() {
        return {
            curUser: {
                id: 123456,
                nickname: "wxh",
                password: "3456789",
                isAdmin: 0,
                userName: "王小虎",
                isId: 0,
                idNum: 87347362984792384,
                phone: 1637584732,
                city: "上海",
                intro: "活泼开朗",
                createTime: "2020/9/10",
                reviseTime: "2021/8/5",
            },
            newPwd: "",
            newPhone: "",
            newIntro: "",
        };
    },
    methods: {
        getInfo: function () {
            curUser.id = sessionStorage.getItem("id");
            axios
                .get("/user/info", {
                    params: {
                        id: curUser.id,
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
                            id: this.curUser.id,
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
                axios
                    .get("/user/revisePwd", {
                        params: {
                            id: this.curUser.id,
                            newPwd: this.newPwd,
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
        reviseIntro: function () {
            if (this.newIntro == "") {
                alert("请输入新简介!");
            } else {
                axios
                    .get("/user/reviseIntro", {
                        params: {
                            id: this.curUser.id,
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
    created: function () {
        this.curUser.id = sessionStorage.getItem("id");
        axios
            .get("/user/info", {
                params: {
                    id: this.curUser.id,
                },
            })
            .then((out) => {
                if (out.status == 200) {
                    this.curUser = out.data;
                } else {
                    alert("请求错误, 请重试!");
                }
            });
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