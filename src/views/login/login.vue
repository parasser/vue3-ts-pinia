<template>
  <div>
    <div style="width:100%;height:55px;border-bottom: 1px solid #c8ced3;">
      <div class="box">
        <span class="tit">HuntingBox</span>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="left_box">
          <div class="box1">
            <div v-if="resetPasswordDisabled">
              <el-form label-position="top" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
                <h2 class="font-weight-bold mb-4">使用您的账户信息登录</h2>
                <el-form-item prop="username" label="用户名">
                  <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                  <el-input v-model.number="ruleForm.password" type="password" @keyup.enter.native="loginClick"/>
                </el-form-item>
                <el-form-item>
                  <div style="display:flex;justify-content: space-between;">
                    <span class="hovers" style="" @click="resetPasswordDisabled = false">忘记密码？</span>
                    <!-- <router-link :to="'/ResetPassword'">
                      <span style="color:#545c64;font-weight:bolder;font-size: 16px;">忘记密码？</span>
                    </router-link> -->
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width:100%;background: #545c64;color: #fff;font-weight: bolder;border:1px solid #545c64" @click.native.prevent="loginClick">登录</el-button>
                  <el-divider />
                </el-form-item>
                <el-form-item>
                  <div>
                    <span style="font-size: 20px;">还没有账户？</span>
                    <router-link :to="'/register'">
                      <span class="hovers" style="font-size: 20px;">注册账户</span>
                    </router-link>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <ResetPassword v-else v-model:resetPasswordDisabled="resetPasswordDisabled"/>
          </div>
        </div>
      </div>
      <div class="right" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { encode } from "js-base64";
import {ref, reactive, toRefs } from 'vue'
import { adminLoginApi, getInfo } from './../../api/user'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { decodeParam } from "../../utils/encrypt";
import cookie from 'js-cookie'
import appStore from "../../store";
import ResetPassword from './ResetPassword.vue'
const route = useRoute();
let { ruleForm,resetPasswordDisabled } = toRefs(reactive({
  resetPasswordDisabled: true,
  ruleForm: {
    username: 'devtest',
    password: 'diting@12345'
  }
}))
// 声明store
const store = appStore.userStore;
// 登录校验
const valUsername = (rule: unknown, value: string | undefined, callback: (msg?:string) =>void) => {
  if (!value) {
    callback('请输入用户名')
  } else {
    callback()
  }
}
const valPwd = (rule: unknown, value: string | undefined, callback: (msg?:string) =>void) => {
  if (!value) {
    callback('请输入密码')
  } else {
    callback()
  }
}
let rules = reactive({
  username: [{ validator: valUsername, trigger: 'blur' }],
  password: [{ validator: valPwd, trigger: 'blur' }]
})
// 获取el-form的组件对象
let ruleFormRef = ref()
// 声明router对象
let router = useRouter()
// 点击登录事件
const loginClick = () => {
  ruleFormRef.value.validate().then(() => {
    console.log('校验成功');
    adminLoginApi({
      username: ruleForm.value.username,
      password: ruleForm.value.password
    }).then(res => {
      if (res.code === 200) {
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        getUserInfo()
        cookie.set('jwt', encode(JSON.stringify(res.data.token)), { expires: 7 })
        if (route.query?.redirect) {
          router.replace(`${decodeParam(route.query.redirect as string)}`);
        } else {
          router.push("/");
        }
      } else {
        ElMessage({
          message: res.message,
          type: 'error',
        })
      }
    })
  }).catch(() => {
    console.log('校验失败');
  })
}
// 获取用户信息
const getUserInfo = () => {
  getInfo().then(res => {
    store.setUser(res.data);
  })
}
</script>
<style scoped>
:deep(.el-form--label-top .el-form-item__label) {
  padding: 0px 0px 5px 0px;
}
:deep(.el-form-item--small .el-form-item__label) {
  line-height: 25px;
}
:deep(.el-form-item--small.el-form-item) {
  margin-bottom: 10px
}
.content{
  width:100%;
  height:calc(100vh - 56px);
  display: flex;
  flex-direction: row;
  flex-grow: 1
}
.right {
  width:50%;
  background-image: url('../../assets/img/login.5bb8074a6d46f9d71258.png');
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat
}
.left {
  width:50%;
  /* background:blue; */
  display:flex;
  align-items: center;
  justify-content: center;
}
.left_box {
  width:100%;
  height:343.49px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box1{
  width:65%;
  height: auto;
}
.font-weight-bold {
  font-weight: 700!important;
  margin-bottom: 15px;
}
h2 {
  font-family: Montserrat,Roboto,sans-serif;
  font-size: 32px;
  line-height: 38.4px;
}
.box {
  width:100px;
  height:55px;
  line-height: 55px;
  margin-left: 60px;
}
.tit {
  font-size: 30px;
  font-weight: bold;
  color: #4a4b4c;
}
:deep(.el-divider) {
  margin-bottom: 10px;
}
:deep(.el-form--default.el-form--label-top .el-form-item .el-form-item__label) {
  font-weight: 600;
  margin-bottom: 10px;
}
.hovers {
  color:#545c64;
  font-weight:bolder;
  font-size: 16px;
  cursor: pointer;
}
.hovers:hover {
  color: #409eff;
}
</style>
