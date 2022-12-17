<template>
    <div id="root">
        <el-input v-model="info.theme" placeholder="请输入主题"></el-input>
        <el-select v-model="info.flavorType" placeholder="选择味道类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <el-input type="textarea" placeholder="请输入内容" v-model="info.intro" maxlength="30" show-word-limit>
        </el-input>
        <div>
            最大价格：
            <el-input-number v-model="info.maxPrice" :min="1" :max="2000"></el-input-number>
        </div>
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="info.endDate" type="date" placeholder="选择请求结束日期" :picker-options="pickerOptions">
        </el-date-picker>
        <el-upload class="upload-demo" action="http://localhost:9090/request/uploadPics" :on-change="handleChange" :limit="1" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button @click="submit">提交</el-button>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "PublishView",
    data() {
        return {
            info: {
                userId: sessionStorage.getItem("id"),
                flavorType: "",
                city: sessionStorage.getItem("city"),
                theme: "",
                intro: "",
                maxPrice: "",
                endDate: "",
                photo: "",
                status: 1,
                createTime: "",
                reviseTime: "",
            },
            fileList: [],
            options: [
                {
                    value: "0",
                    label: "家乡小吃",
                },
                {
                    value: "1",
                    label: "地方特色小馆",
                },
                {
                    value: "2",
                    label: "香辣味",
                },
                {
                    value: "3",
                    label: "甜酸味",
                },
                {
                    value: "4",
                    label: "绝一位菜",
                },
            ],
            value: "",
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
            },
        };
    },
    methods: {
        submit: function () {
            console.log("length*******" + this.fileList.length);
            if (
                this.info.flavorType == "" ||
                this.info.theme == "" ||
                this.info.intro == "" ||
                this.info.endDate == ""
            ) {
                alert("信息不完整, 请检查表单!");
            } else {
                if (this.fileList.length != 0) {
                    this.info.photo = this.fileList[0].name;
                }
                axios.post("/request/addRequest", this.info).then((out) => {
                    if (out.status == 200) {
                        alert("已提交!");
                        this.$router.push("/publishedList");
                    } else {
                        alert("出现错误, 请重试!");
                    }
                });
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.info.photo = "";
        },
        handleChange(file) {
            console.log(this.fileList);
            this.info.photo = file.name;
        },
    },
};
</script>
<style>
#root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 25%;
    padding-right: 25%;
    height: 100%;
}
</style>