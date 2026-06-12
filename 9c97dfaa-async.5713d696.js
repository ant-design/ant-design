(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["9c97dfaa"],{"9c97dfaa":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"diagram",{enumerable:!0,get:function(){return C;}});var i=a("3ab11827"),l=a("bed241dc"),n=a("8fd384de"),r=a("18687645"),o=a("b04a8d7d"),s=a("2bc3de4e"),d=a("f604571d"),c=r.defaultConfig_default.pie,p={sections:new Map,showData:!1,config:c},g=p.sections,u=p.showData,f=structuredClone(c),m=(0,o.__name)(()=>structuredClone(f),"getConfig"),h=(0,o.__name)(()=>{g=new Map,u=p.showData,(0,r.clear)();},"clear"),x=(0,o.__name)(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);g.has(e)||(g.set(e,t),o.log.debug(`added new section: ${e}, with value: ${t}`));},"addSection"),_=(0,o.__name)(()=>g,"getSections"),S=(0,o.__name)(e=>{u=e;},"setShowData"),T=(0,o.__name)(()=>u,"getShowData"),w={getConfig:m,clear:h,setDiagramTitle:r.setDiagramTitle,getDiagramTitle:r.getDiagramTitle,setAccTitle:r.setAccTitle,getAccTitle:r.getAccTitle,setAccDescription:r.setAccDescription,getAccDescription:r.getAccDescription,addSection:x,getSections:_,setShowData:S,getShowData:T},v=(0,o.__name)((e,t)=>{(0,l.populateCommonDb)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection);},"populateDb"),y={parse:(0,o.__name)(async e=>{let t=await (0,s.parse)("pie",e);o.log.debug(t),v(t,w);},"parse")},$=(0,o.__name)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),b=(0,o.__name)(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),a=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return(0,d.pie)().value(e=>e.value).sort(null)(a);},"createPieArcs"),C={parser:y,db:w,renderer:{draw:(0,o.__name)((e,t,a,l)=>{var s;o.log.debug("rendering pie chart\n"+e);let c=l.db,p=(0,r.getConfig2)(),g=(0,n.cleanAndMerge)(c.getConfig(),p.pie),u=(0,i.selectSvgElement)(t),f=u.append("g");f.attr("transform","translate(225,225)");let{themeVariables:m}=p,[h]=(0,n.parseFontSize)(m.pieOuterStrokeWidth);h??(h=2);let x=g.textPosition,_=(0,d.arc)().innerRadius(0).outerRadius(185),S=(0,d.arc)().innerRadius(185*x).outerRadius(185*x);f.append("circle").attr("cx",0).attr("cy",0).attr("r",185+h/2).attr("class","pieOuterCircle");let T=c.getSections(),w=b(T),v=[m.pie1,m.pie2,m.pie3,m.pie4,m.pie5,m.pie6,m.pie7,m.pie8,m.pie9,m.pie10,m.pie11,m.pie12],y=0;T.forEach(e=>{y+=e;});let $=w.filter(e=>"0"!==(e.data.value/y*100).toFixed(0)),C=(0,d.scaleOrdinal)(v).domain([...T.keys()]);f.selectAll("mySlices").data($).enter().append("path").attr("d",_).attr("fill",e=>C(e.data.label)).attr("class","pieCircle"),f.selectAll("mySlices").data($).enter().append("text").text(e=>(e.data.value/y*100).toFixed(0)+"%").attr("transform",e=>"translate("+S.centroid(e)+")").style("text-anchor","middle").attr("class","slice");let D=f.append("text").text(c.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText"),k=[...T.entries()].map(([e,t])=>({label:e,value:t})),A=f.selectAll(".legend").data(k).enter().append("g").attr("class","legend").attr("transform",(e,t)=>"translate(216,"+(22*t-22*k.length/2)+")");A.append("rect").attr("width",18).attr("height",18).style("fill",e=>C(e.label)).style("stroke",e=>C(e.label)),A.append("text").attr("x",22).attr("y",14).text(e=>c.getShowData()?`${e.label} [${e.value}]`:e.label);let z=Math.max(...A.selectAll("text").nodes().map(e=>(null==e?void 0:e.getBoundingClientRect().width)??0)),M=(null===(s=D.node())||void 0===s?void 0:s.getBoundingClientRect().width)??0,O=Math.min(0,225-M/2),F=Math.max(512+z,225+M/2)-O;u.attr("viewBox",`${O} 0 ${F} 450`),(0,r.configureSvgSize)(u,450,F,g.useMaxWidth);},"draw")},styles:$};}}]);