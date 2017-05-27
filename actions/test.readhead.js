/**@wiki

# title:
## showList : Array 要显示的字段 直接传入['key1','key2'] 或者 [{key: 'key1', name: '显示名1'}]
## attachName: string 附加信息的后缀， 默认为'-attach'
## isHideToolTip： bool 是否隐藏tooltip
## addition any 在最后附加显示的内容
## sort bool 是否按从大到小重新排序
## getCustomTitle fun 自定义副title
## getCustomBottom fun 自定义副title

@wiki**/

import React from 'react'
import './index.less'
import _ from 'lodash'

export default React.createClass({

    sortPayload(payload=[]){
      return payload.sort((a, b)=>{//按从大到小排列， 如果是无限大，放在最后
        let a1= a.payload[a.dataKey];
        let b1= b.payload[b.dataKey];
        if(!isFinite(a1)) {
          return 1;
        }else {
          return b1 - a1;
        }
      })
    },

    getCustomTitle(){
      const {getCustomTitle=()=>{}, active, payload=[], label} = this.props;
      return getCustomTitle(payload, label);
    },

    getCustomBottom(){
      const {getCustomBottom=()=>{}, active, payload=[], label} = this.props;
      return getCustomBottom(payload, label);
    },

  	render() {
	   	const { active, payload=[], label, isHideToolTip, showList=[],
	   			onMouseOver, attachName='-attach', addition, sort=true, unit=''} = this.props;
	   	//当鼠标悬浮在dot上的时候不显示
	   	if(window.isOnDot && onMouseOver) {
	   		return null;
	   	}

      let data = sort? this.sortPayload(payload):payload;

	    if (active && !isHideToolTip) {

	      return (
	      	<div className="custom-tooltip">
	      	{
	      		data.map((elem, index)=>{
	      			let payloadItem = elem.payload || {},
	      				color = elem.color,
	      				name = elem.name || elem.dataKey,
	      				dataKey = elem.dataKey;
	      			if(!isFinite(payloadItem[dataKey])) return null;

	      			return (
						<div className="custom-tooltip-item">
							{index === 0 ?
                <h3 style={{marginBottom:10, borderBottom: 'solid thin #ebebeb'}}>
                  <div>
                    {label}
                  </div>
                  <div style={{fontWeight: 'normal', fontSize: 12}}>
                    {
                      this.getCustomTitle()
                    }
                  </div>
                </h3>: ''}


							<h3 style={{color: color }} >{elem.name} : { isFinite(payloadItem[dataKey])? payloadItem[dataKey] + unit:'无数据' }</h3>
						 	{
						 		!showList.length ? _.map(payloadItem[dataKey + attachName], (item, name)=>{
						 			return <div style={{color:color}}>{name} : {item}</div>
						 		})
						 		:
						 		_.map(showList, (item)=>{
						 			let attach = payloadItem[dataKey + attachName] || {};
						 			//允许两种传参
						 			if(typeof item === 'object') {
						 				return attach[item.key] === undefined ? null : <div style={{color:color }}>{item.name} : {attach[item.key]}</div>
						 			}else {
						 				return attach[item]  === undefined? null : <div style={{color:color }}>{item} : {attach[item]}</div>
						 			}
						 		})
						 	}
						</div>
	      			)
	      		})
	      	}
  			{
            this.getCustomBottom()
        }
	        </div>
	      )
	    }
	    return null;
	  }
});



export class DotDetail extends React.Component {

	render(){
		const {visibility, left , top, text, color} = this.props;
		return (
			<div className="custom-dot-details"
				style={{
					display: visibility?'':'none',
					left:left,
					top: top,
					color: color
				}}>
				{text}
			</div>
		)
	}
}
