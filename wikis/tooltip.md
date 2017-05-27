

# title: Tooltip 用于自定义rechart中的tooltip的content

## 导出
* 默认导出： CustomTooltip
* DotDetail

## 用法
```
import CustomTooltip from 'components/tooltip'


<Tooltip content={<CustomTooltip showList={[]} attachName='-attach'/>}>
```

## 参数：
* showList : Array 要显示的字段 直接传入['key1','key2'] 或者 [{key: 'key1', name: '显示名1'}]
* attachName: string 附加信息的后缀， 默认为'-attach'
* isHideToolTip： bool 是否隐藏tooltip
* addition any 在最后附加显示的内容
* sort bool 是否按从大到小重新排序
* getCustomTitle fun 自定义副title
* getCustomBottom fun 自定义副title

