<template>
  <div v-show="current!=-1"     style="position:fixed;width:600px;padding:10px;height:400px;background:#5eead4;border:solid 1px black;border-radius:30px;left:calc((100% - 600px) / 2);top:calc((100% - 400px) / 2)">
  <Steps :current="current">
    <Step v-for="item in steps" @click="current=item.key" :key="item.key" :title="item.title"/>
  </Steps>
  <div ref="firstPage" v-if="current==0">
    <div

  >

      <Layout style="background:red;">
        <Header style="background:gray">
          <Divider>请输入令牌</Divider>
        </Header>
        <Layout>
          <!--        <Sider style="background:gray">Sider</Sider>-->
          <Content>


            <Row>
              <TextArea style="height:200px" v-model:value="hello"></TextArea>
            </Row>

          </Content>
        </Layout>
        <Footer>
          <Row justify="center" style="height:calc(100% - 100px);width:100%">
            <Button @click="saveToken">下一步</Button>
          </Row>
        </Footer>
      </Layout>


    </div>
  </div>
  <div  v-if="current==1">
    这里是选择模块页面
    <Row>
      必须选择一个模块:
      <RadioGroup @change="openhello" v-model:value="radioClick">
       <Radio value="1099">存货</Radio>
       <Radio value="1007">应收</Radio>
       <Radio value="20017">应付</Radio>
      </RadioGroup>
    </Row>

    <Button @click="goAppFn">进入模块</Button>
  </div>
</div>



</template>
<script setup lang="ts">
import {Layout, Row, Input, Button, Divider, Steps, Step,Radio} from 'ant-design-vue'

const RadioGroup=Radio.Group
const RadioButton=Radio.Button
const Header = Layout.Header
const Footer = Layout.Footer
const Sider = Layout.Sider
const Content = Layout.Content
import {onMounted, ref} from 'vue'
import 'ant-design-vue/dist/antd.less';
import {goApp} from "/@/utils/preHandle";

const hello = ref(window.localStorage.getItem('tokenData'))
const TextArea = Input.TextArea
const showThis = ref(false)
const radioClick=ref('')
const current = ref(0);
const steps = [
    {
      key:0,
      title: '获取令牌',
      content: 'First-content',
    },
    {
      key:1,
      title: '选择模块',
      content: 'Second-content',
    },

  ]


async function saveToken() {
  if (window.localStorage.getItem('tokenData') == null) {
    let aaa = hello.value

    const ccc = decodeURI(window.atob(aaa))
    window.localStorage.setItem('tokenData', ccc)
  }
  current.value=1


}
async function goAppFn(){
  await goApp()
}

onMounted(()=>{
  if (window.localStorage.getItem('tokenData') != null) {
    // if (window.localStorage.getItem('tokenData') == null) {
    // }
    // goApp()
    current.value=-1
    if(window.localStorage.getItem('newPlatformId')==null){
      current.value=1
    }else{
      goApp()
    }
  } else {
    showThis.value = true
  }

})

function openhello(){
  window.localStorage.setItem('newPlatformId', radioClick.value)
}
</script>
