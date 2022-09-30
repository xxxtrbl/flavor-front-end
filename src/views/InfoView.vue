<template>
    <div>
        <ul>
            <li>用户名:{{curUser.nickName}}</li>
            <li>登录密码:{{curUser.password}}<el-button>修改密码</el-button>
            </li>
            <li>用户类型:{{curUser.userType==0?"用户":管理员}}</li>
            <li>用户姓名:{{curUser.realName}}</li>
            <li>证件类型:{{curUser.idType==0?"身份证件":"其他证件"}}</li>
            <li>证件号码:{{curUser.idNum}}</li>
            <li>手机号码:{{curUser.tele}} <el-button>修改号码</el-button>
            </li>
            <li>用户级别:{{curUser==0?"普通":"VIP"}}</li>
            <li>用户简介:{{curUser.intro}}<el-button>修改简介</el-button>
            </li>
            <li>注册城市:{{curUser.city}}</li>
            <li>注册时间:{{curUser.date}}</li>
            <li>修改时间:{{curUser.reviseTime}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "InfoView",
    data() {
        return {
            curUser: {
                id: 123456,
                nickName: "wxh",
                password: "3456789",
                userType: 0,
                realName: "王小虎",
                idType: 0,
                idNum: 87347362984792384,
                tele: 1637584732,
                class: 0,
                intro: "活泼开朗",
                city: "上海",
                date: "2020/9/10",
                reviseTime: "2021/8/5",
            },
        };
    },
};
</script>