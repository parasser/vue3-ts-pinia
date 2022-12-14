<template>
  <div>
    <div class="content">
      <div class="left" />
      <div class="right">
        <div class="left_box">
          <div class="box1">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="small" label-position="top">
              <h2 class="font-weight-bold mb-4">立即创建您的免费帐户</h2>
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="email" prop="email">
                <el-input v-model="form.email" type="email" placeholder="请输入email" />
              </el-form-item>
              <el-form-item label="输入验证码" prop="verificationCode">
                <el-input v-model="form.verificationCode" placeholder="请输入验证码" style="width: 75%" />
                <el-button icon="el-icon-postcard" style="width: 25%" type="primary" :disabled="disabled=!show" @click="send">
                  <span v-show="show">获取验证码</span>
                  <span v-show="!show" class="count">{{ count }} s</span>
                </el-button>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" show-password />
              </el-form-item>
              <el-form-item>
                <el-button style="width:100%;background: #f98e00;color: #333333;font-weight: bolder;" @click.native.prevent="submitForm">注册</el-button>
                <el-divider />
                <div>
                  <span style="font-size: 20px;">已经有一个帐户？</span>
                  <router-link :to="'/login'">
                    <span style="color:#f98e00;font-weight:bolder;font-size: 20px;">登录</span>
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
<script>
import { CheckUsername } from '@/api/user'
const TIME_COUNT = 60 // 更改倒计时时间
export default {
  data() {
    var validateUserNumber = (rule, value, callback) => {
      console.log(value === '')
      if (value === '') {
        return callback(new Error('用户名不能为空！'))
      } else {
        CheckUsername({ username: value }).then(res => {
          console.log(res)
          if (res.data.result !== 0) {
            var isUser = /^[\da-z][\da-z-_]{4,29}$/
            if (isUser.test(value)) {
              callback()
            } else {
              callback(new Error('长度5-30，由数字、小写字母、-、_组成'))
            }
          } else {
            callback(new Error('用户名已存在，请重新输入！'))
          }
        })
      }
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    var verificationCodeNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空！'))
      } else if (value.length !== 6) {
        return callback(new Error('验证码不正确，请重新输入！'))
      }
    }
    var passwordRules = (rule, value, callback) => {
      var ISPWD = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/
      if (!value) {
        return callback(new Error('密码不能为空！'))
      } else {
        if (ISPWD.test(value)) {
          callback()
        } else {
          callback(new Error('密码长度8-20，必须同时包含数字和字母'))
        }
      }
    }
    return {
      show: true, // 初始启用按钮
      count: '', // 初始化次数
      timer: null,
      loading: false,
      form: {
        username: '',
        password: '',
        email: '',
        verificationCode: ''
      },
      rules: {
        username: [{ validator: validateUserNumber, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        verificationCode: [{ validator: verificationCodeNumber, trigger: 'blur' }],
        password: [{ validator: passwordRules, trigger: 'blur' }]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    send() {
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.$store.dispatch('user/SendVerify', this.form)
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer) // 清除定时器
            this.timer = null
          }
        }, 1000)
      }
    },
    // 注册
    submitForm() {
      this.loading = true
      this.$store.dispatch('user/registered', this.form)
        .then((res) => {
          if (res.code === 200) {
            const h = this.$createElement
            this.$msgbox({
              title: '消息提示',
              message: h('p', null, [
                h('span', { style: 'color: #67c23a' }, '注册成功！'),
                h('i', null, '跳转到登陆页')
              ]),
              confirmButtonText: '确定'
            }).then(action => {
              this.$router.push('/login')
            })
            this.form.username = ''
            this.form.password = ''
            this.form.email = ''
            this.form.verificationCode = ''
          } else {
            this.$message.error(res.message)
          }
        })
    }
  }
}
</script>
<style scoped>
.content {
  width:100%;
  height:100%;
  display: flex;
}
.left {
  width:50%;
  background-image: url('https://portal.lumu.io/static/media/login-bg-dark.5bb8074a6d46f9d71258.png');
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
  height: calc(100vh - 80px);
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
}
h2 {
  font-family: Montserrat,Roboto,sans-serif;
  font-size: 32px;
  line-height: 38.4px;
}
.el-divider--horizontal {
  margin: 20px 0px 15px;
}
</style>
