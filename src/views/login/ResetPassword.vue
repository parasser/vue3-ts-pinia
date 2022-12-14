<template>
  <div>
    <el-form  label-position="top" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px">
      <h2 class="font-weight-bold mb-4">重置密码</h2>
      <el-form-item label="email邮箱" prop="email">
        <el-input ref="username" v-model="ruleForm.email" type="email" placeholder="请输入email" />
      </el-form-item>
      <el-form-item label="输入验证码" prop="verificationCode">
        <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码" style="width: 75%;" />
        <el-button icon="el-icon-postcard" style="width: 25%;background:#545c64;border:1px solid #545c64" type="primary" :disabled="!show" @click="send">
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{ count }} s</span>
        </el-button>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item>
        <div style="width:100%;display:flex;justify-content: space-between;margin-top: 5px;">
          <el-button style="min-width:240px;background: #545c64;color: #fff;font-weight: bolder;" @click.native.prevent="onSubmit">重置密码</el-button>
          <el-button style="min-width:240px;" @click="cancelClick">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import {reactive,toRefs, ref} from 'vue'
import {registerUser,CheckUsername} from './../../api/user'
import { ElMessage, ElMessageBox  } from 'element-plus'
import {useRouter} from 'vue-router'
import appStore from "../../store";
// 声明router
let router = useRouter()
// 声明store
const store = appStore.userStore
// 获取el-form的组件对象
let ruleFormRef = ref()
let state = reactive<{
  timer: number;
  count: number;
  show: boolean;
  ruleForm: {
    username: string;
    email: string;
    verificationCode: string;
    password: string;
  }
}>({
  timer: 0,
  count: 0,
  show: true,
  ruleForm: {
    username: '',
    email: '',
    verificationCode: '',
    password: '',
  }
})
const {ruleForm,count, show} = toRefs(state)
// 输入校验
const checkEmail = (rule: unknown, value: string | undefined, callback: (msg?:string) =>void) => {
  const mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (!value) {
    return callback('邮箱不能为空')
  }
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback()
    } else {
      callback('请输入正确的邮箱格式')
    }
  }, 100)
}
const verificationCodeNumber = (rule: unknown, value: string | undefined, callback: (msg?:string) =>void) => {
  if (!value) {
    return callback('验证码不能为空！')
  } else if (value.length !== 6) {
    return callback('验证码不正确，请重新输入！')
  }
}
const passwordRules = (rule: unknown, value: string | undefined, callback: (msg?:string) =>void) => {
  var ISPWD = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/
  if (!value) {
    return callback('密码不能为空！')
  } else {
    if (ISPWD.test(value)) {
      callback()
    } else {
      callback('密码长度8-20，必须同时包含数字和字母')
    }
  }
}
let rules = reactive({
  email: [{ validator: checkEmail, trigger: 'blur' }],
  verificationCode: [{ validator: verificationCodeNumber, trigger: 'blur' }],
  password: [{ validator: passwordRules, trigger: 'blur' }]
})
// 重置密码事件
const onSubmit = () => {
  ruleFormRef.value.validate().then(() => {
    console.log('校验成功');
  }).catch(() => {
    console.log('校验失败');
  })
}
const emit = defineEmits(['update:resetPasswordDisabled'])
const cancelClick = () => {
  emit('update:resetPasswordDisabled', true)
}
// 发送验证码事件
const TIME_COUNT = 60 // 更改倒计时时间
const send = () => {
  if (!state.timer) {
    state.count = TIME_COUNT
    state.show = false
    console.log(ruleForm.value.email);
    store.SendVerify(ruleForm.value.email)
    state.timer = window.setInterval(() => {
      if (state.count > 0 && state.count <= TIME_COUNT) {
        state.count--
      } else {
        state.show = true
        clearInterval(state.timer) // 清除定时器
        state.timer = 0
      }
    }, 1000)
  }
}
</script>
<style scoped>
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
  margin-bottom:15px;
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
</style>
