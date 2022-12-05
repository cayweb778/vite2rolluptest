<template>
  <BasicModal
    width="500px"
    v-bind="$attrs"
    :closable="false"
    @register="register"
    @ok="handleOk()"
    @cancel="handleClose()"
  >
    <template #title>
      <div style="height: 30px;width: 100%;background-color: #5f375c;color: white;line-height: 30px;text-align: left;">
        <AppstoreOutlined  style="margin: 0 2px;font-size: 14px;"/>
        <span style="font-size: 14px"> 条码录入框</span>
      </div>
    </template>
    <div style="width: 100%;padding: 5%;">
    <div  style="margin-top: 5%;"><span style="font-weight: bold;color: #666666;">条码方案：</span>
      <Select v-model:value="barCodeType" style="width: 354px;">
        <SelectOption value="1">存货条形码</SelectOption>
        <SelectOption value="2">存货编码</SelectOption>
      </Select>
    </div>
      <div style="margin-top: 5%;">
        <Input v-model:value.trim="barCodeVal" class="barCodeVal" placeholder="条形码扫描录入框" @pressEnter="enterCheck"/>
      </div>
    </div>
    <template #footer>
      <div style="height: 35px">
        <div style="float: right">
          <Button @click="handleClose()" type="primary" shape="round" style="width: 80px">关闭</Button>
        </div>
      </div>
    </template>
  </BasicModal>
</template>
<script setup="props, { content }" lang="ts">
import {AppstoreOutlined} from '@ant-design/icons-vue'
import {ref,nextTick} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {
  Button,
  Input ,
  Select,
   message
} from 'ant-design-vue';
import {useMessage} from "/@/hooks/web/useMessage";
import {hasBlank} from "/@/api/task-api/tast-bus-api";
import {useRouteApi} from "/@/utils/boozsoft/datasource/datasourceUtil";
import {findCunHuoAllList} from "/@/api/record/stock/stock-caigou";
import {useCompanyOperateStoreWidthOut} from "/@/store/modules/operate-company";
const { createConfirm } = useMessage()
const SelectOption = Select.Option;
const TextArea = Input.TextArea;
const emit=defineEmits(['register','modify']);
const barCodeType:any = ref('1')
const barCodeVal:any = ref('')
const stockList:any = ref([])
const stockData:any = ref('')
const stockUnitId:any = ref('')
const [register, { closeModal,setModalProps }] = useModalInner( async (data) => {
  barCodeVal.value=''
  findAllStock(data.dynamicTenantId)
  setModalProps({minHeight: 100});
  nextTick(() => {
    let doms:any = document.getElementsByClassName('barCodeVal')[0]
    if (null != doms) doms.focus()
  })
});
function handleClose() {
  closeModal()
  return true;
}
async function handleOk() {
  if(hasBlank(stockData.value)){return message.error('没有对应的存货档案!') }
  emit('throwData', {data:stockData.value,barCodeType:barCodeType.value})
  closeModal()
  return true;
}
const findAllStock = async (dynamicTenantId) => {
  stockList.value = (await useRouteApi(findCunHuoAllList, {schemaName: dynamicTenantId})({date: ''}))
}
const enterCheck = async () => {
  // 条形码
  if(barCodeType.value=='1'){
    stockData.value=stockList.value.filter(t=>t.stockBarcode==barCodeVal.value)[0] || ''
    if(hasBlank(stockData.value)){
      stockData.value=stockList.value.filter(t=>t.stockUnitBarcode1==barCodeVal.value)[0] || ''
      if(hasBlank(stockData.value)){
        stockData.value=stockList.value.filter(t=>t.stockUnitBarcode2==barCodeVal.value)[0] || ''
        stockUnitId.value=stockData.value.stockUnitId2
      }else{
        stockUnitId.value=stockData.value.stockUnitId1
      }
    }
    else{
      stockUnitId.value=stockData.value.stockUnitId
    }
  }
  else if(barCodeType.value=='2'){  // 存货编码
    stockData.value=stockList.value.filter(a=>a.stockNum==barCodeVal.value)[0] || ''
    if(!hasBlank(stockData.value)){
      stockUnitId.value=stockData.value.stockPurchaseUnit
    }
  }

  if(hasBlank(stockData.value)){
    barCodeVal.value=''
    return message.error('没有对应的存货档案!')
  }

  let map={stockData:stockData.value,barCodeVal:barCodeVal.value,barCodeType:barCodeType.value,stockUnitId:stockUnitId.value}
  console.log(map)
  emit('throwData', map)
  barCodeVal.value=''
  // closeModal()
}
</script>
<style lang="less" scoped>
:deep(.ant-checkbox){
  margin-top: -8px;
}

:deep(.ant-select-selector) {
  border: none !important;
  border-bottom: 1px solid #bdb9b9 !important;
  background: none;
  width: 80%;
  text-align-last: center;
  .ant-select-selection-item{
    font-weight: bold;color: black;
  }
}

:deep(.ant-input){
  border: 1px solid;
}

:deep(.ant-input)::placeholder{
  font-weight: bold;
  font-size: 20px;
}

.nc-open-content {
  background-image: url(/@/assets/images/homes/bg-pattern.png);
  background-repeat: no-repeat;
  background-position: 66% 8%;
  background-size: contain;
  position: relative;
}

:global(.ant-modal-header) {
  padding: 10px 0 !important;
}

:global(.ant-modal-close-x){
  height: 30px !important;
  color: white;
}

.a-table-font-size-12 :deep(td),
.a-table-font-size-12 :deep(th) {
  font-size: 13px !important;
  padding: 2px 8px !important;
  border-color: #aaaaaa !important;
  font-weight: 600;
}
</style>
