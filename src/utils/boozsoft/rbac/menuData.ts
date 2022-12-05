const tokenDataJsonStr=window.localStorage.getItem('tokenData')
const tokenData=JSON.parse(tokenDataJsonStr)

export const modules = tokenData.menuModules


const menus = Object.values(modules).map(it => it.menus)


export const sysMenuQueryAll = () => JSON.parse(JSON.stringify({menus:menus.flatMap(it=>it), modules}));
