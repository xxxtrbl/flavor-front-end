<template>
    <div id="root">
        <span>用户登录</span>
        <input v-model="id" type="text" placeholder="账号">
        <input v-model="password" type="password" placeholder="密码">
        <router-link to="/signup" id="hint">还没有账号？点我注册</router-link>
        <span id="buttons">
            <button id="admin-btn" @click="adminLogin()">管理员登录</button>
            <button id="user-btn" @click="userLogin()">用户登录</button>
        </span>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "LoginView",
    data() {
        return {
            id: "",
            password: "",
        };
    },
    methods: {
        userLogin: function () {
            if (this.id != "" && this.password != "") {
                axios
                    .get("user/logIn", {
                        params: {
                            id: this.id,
                            password: this.password,
                        },
                    })
                    .then((out) => {
                        if (out.status == 200) {
                            // Successfully log in.
                            sessionStorage.setItem("id", this.id);
                            sessionStorage.setItem("password", this.password);
                            // Get info and save city in Session Storage
                            axios
                                .get("/user/info", {
                                    params: {
                                        id: this.id,
                                    },
                                })
                                .then((out) => {
                                    if (out.status == 200) {
                                        sessionStorage.setItem(
                                            "city",
                                            out.data.city
                                        );
                                    } else {
                                        alert("请求错误, 请重试!");
                                    }
                                });
                            alert("登陆成功, 即将自动跳转至首页");
                            this.$router.push("/");
                            this.$router.go(0);
                        } else {
                            // Log in failed.
                            alert("用户名或密码错误, 请重新输入");
                        }
                    });
            } else {
                alert("用户名或者密码不能为空!");
            }
        },
        adminLogin: function () {
            if (this.id == "admin" && this.password == "admin") {
                sessionStorage.setItem("admin", "admin");
                alert("管理员登录成功! 跳转回首页.......");
                this.$router.push("/");
                this.$router.go(0);
            } else if (this.id == "" || this.password == "") {
                alert("用户名或密码不得为空");
            } else {
                alert("管理员账号密码错误, 请重新输入");
            }
        },
    },
};
</script>

<style scoped>
#root {
    display: flex;
    flex-direction: column;
    height: 50%;
    justify-content: space-between;
    padding-left: 25%;
    padding-right: 25%;
    padding-top: 5%;
}

#buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
input {
    height: 15%;
}
button {
    color: white;
    background: #54aeea;
    border: 3px solid #ffffff;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    cursor: pointer;
}
a {
    text-decoration: none;
}
</style>