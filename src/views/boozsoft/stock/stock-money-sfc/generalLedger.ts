import {defineStore} from 'pinia';
// @ts-ignore
import {store} from '/@/store';

export const kcXCLStore123 = defineStore({
  id: 'kcXCLStore123',
  state: (): any => ({
    J:[
      {
        title: '仓储位置',
        dataIndex: 'stockCangkuName',
        key: 'stockCangkuName',
        align: 'left',ellipsis: true,
        width: 100,
      },
      {
        title: '存货编码',
        dataIndex: 'stockNum',
        key: 'stockNum',
        align: 'left',ellipsis: true,
        width: 100,
      },
      {
        title: '存货名称',
        dataIndex: 'stockName',
        key: 'stockName',
        align: 'left',ellipsis: true,
        width: 100,
      },
      {
        title: '规格型号',
        dataIndex: 'stockGgxh',
        key: 'stockGgxh',
        align: 'left',ellipsis: true,
        width: 100,
      },
      {
        title: '主计量',
        dataIndex: 'unitName',
        key: 'unitName',
        align: 'left',ellipsis: true,
        width: 100,
      },
      {
        title: '计量1',
        dataIndex: 'unitName1',
        key: 'unitName1',
        align: 'left',ellipsis: true,
      },
      {
        title: '计量2',
        dataIndex: 'unitName2',
        key: 'unitName2',
        align: 'left',ellipsis: true,
      },
      {
        title: '期初结存',
        dataIndex: 'qichu',
        children: [
          {
            title: '主数量',
            dataIndex: 'qichu',
            key: '6-1',
            align: 'right',slots: { customRender: 'qichu' }
          },
          {
            title: '无税单价',
            dataIndex: 'qcprice',
            key: '6-2',
            align: 'right',slots: { customRender: 'qcprice' }
          },
          {
            title: '无税金额',
            dataIndex: 'qcicost',
            key: '6-3',
            align: 'right',slots: { customRender: 'qcicost' }
          }
        ],
      },
      {
        title: '本期入库',
        dataIndex: 'rk',
        children: [
          {
            title: '主数量',
            dataIndex: 'rk',
            key: '7-1',
            align: 'right',slots: { customRender: 'rk' }
          },
          {
            title: '无税单价',
            dataIndex: 'rkprice',
            key: '7-2',
            align: 'right',slots: { customRender: 'rkprice' }
          },
          {
            title: '无税金额',
            dataIndex: 'rkicost',
            key: '7-3',
            align: 'right',slots: { customRender: 'rkicost' }
          }
        ],
      },
      {
        title: '本期出库',
        dataIndex: 'ck',
        children: [
          {
            title: '主数量',
            dataIndex: 'ck',
            key: '8-1',
            align: 'right',slots: { customRender: 'ck' }
          },
          {
            title: '无税单价',
            dataIndex: 'ckprice',
            key: '8-2',
            align: 'right',slots: { customRender: 'ckprice' }
          },
          {
            title: '无税金额',
            dataIndex: 'ckicost',
            key: '8-3',
            align: 'right',slots: { customRender: 'ckicost' }
          }
        ],
      },
      {
        title: '期末结存',
        dataIndex: 'qimo',
        children: [
          {
            title: '主数量',
            dataIndex: 'qimo',
            key: '9-1',
            align: 'right',slots: { customRender: 'qimo' }
          },
          {
            title: '无税单价',
            dataIndex: 'qmprice',
            key: '9-2',
            align: 'right',slots: { customRender: 'qmprice' }
          },
          {
            title: '无税金额',
            dataIndex: 'qmicost',
            key: '9-3',
            align: 'right',slots: { customRender: 'qmicost' }
          }
        ],
      },
    ],
  }),
  getters: {
    getColumns: (state) => () => {
      return state.J
    },
  },
  actions: {

  }
});

// Need to be used outside the setup
export function useGlStoreWidthOut() {
  return kcXCLStore123(store);
}

