<template>
  <div>
    <div class="content">
      <div class="left" />
      <div class="right">
        <div class="left_box">
          <div class="box1">
            <h2 class="font-weight-bold mb-4">立即创建您的免费帐户</h2>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm" label-position="top">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="email" prop="email">
                <el-input v-model="ruleForm.email" type="email" placeholder="请输入email" />
              </el-form-item>
              <el-form-item label="输入验证码" prop="verificationCode">
                <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码" style="width: 75%" />
                <el-button icon="el-icon-postcard" style="width: 25%;background:#545c64;" type="primary" :disabled="!show" @click="send">
                  <span v-show="show">获取验证码</span>
                  <span v-show="!show" class="count">{{ count }} s</span>
                </el-button>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password />
              </el-form-item>
              <el-form-item>
                <el-button style="width:100%;background: #545c64;color: #fff;font-weight: bolder;" @click.native.prevent="submitForm">注册</el-button>
                <el-divider />
                <div>
                  <span style="font-size: 20px;">已经有一个帐户？</span>
                  <router-link :to="'/login'">
                    <span style="color:#545c64;font-weight:bolder;font-size: 20px;">登录</span>
                  </router-link>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
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
const validateUserNumber = (rule: unknown, value: string | undefined, callback: (msg?:string) =>void) => {
  console.log(value === '')
  if (ruleForm.value.username === '') {
    return callback('用户名不能为空！')
  } else {
    CheckUsername({ username: ruleForm.value.username }).then(res => {
      console.log(res)
      if (res.data !== '') {
        var isUser = /^[\da-z][\da-z-_]{4,29}$/
        if (isUser.test(ruleForm.value.username)) {
          callback()
        } else {
          callback('长度5-30，由数字、小写字母、-、_组成')
        }
      } else {
        callback(res.message)
      }
    })
  }
}
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
  username: [{ validator: validateUserNumber, trigger: 'blur' }],
  email: [{ validator: checkEmail, trigger: 'blur' }],
  verificationCode: [{ validator: verificationCodeNumber, trigger: 'blur' }],
  password: [{ validator: passwordRules, trigger: 'blur' }]
})
// 注册事件
const submitForm = () => {
  ruleFormRef.value.validate().then(() => {
    console.log('校验成功');
    registerUser({
      username: ruleForm.value.username,
      email: ruleForm.value.email,
      verificationCode: ruleForm.value.verificationCode,
      password: ruleForm.value.password
    }).then(res => {
      if (res.code === 200) {
        ElMessageBox.confirm(
          '注册成功跳转到首页',
          '提示',
          {
            confirmButtonText: 'OK',
            type: 'warning',
          }
        )
        .then(() => {
          router.push('/login')
        })
      } else {
        ElMessage.error(res.message)
      }
    })
  }).catch(() => {
    console.log('校验失败');
  })
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
.content {
  width:100%;
  /* height:calc(100vh - 56px); */
  display: flex;
}
.left {
  width:50%;
  background-image: url('../../assets/img/login.5bb8074a6d46f9d71258.png');
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat
}
.right {
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: rgb(228, 228, 228);
}
.left_box {
  margin: 40px 40px;
  padding: 20px 0px 0px;
  width:calc(100% - 80px);
  height: calc(100vh - 103px);
  display: flex;
  justify-content: center;
  background: white;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 20px;
}
.box1{
  width:65%;
  height:343.49px;
}
.font-weight-bold {
  font-weight: 700!important;
  margin-bottom: 25px;
  margin-top: 30px;
}
h2 {
  font-family: Montserrat,Roboto,sans-serif;
  font-size: 32px;
  line-height: 38.4px;
}
:deep(.el-divider--horizontal) {
  margin: 20px 0px 15px;
}
:deep(.el-form--default.el-form--label-top .el-form-item .el-form-item__label) {
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
