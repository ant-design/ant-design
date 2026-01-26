(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["400eaf13"],{"400eaf13":function(t,e,i){"use strict";i.d(e,"__esModule",{value:!0}),i.d(e,"diagram",{enumerable:!0,get:function(){return q;}});var n=i("09188bfe"),a=i("81473b45"),s=i("4a9940fd"),r=i("b04a8d7d"),l=i("f604571d"),o=function(){var t=(0,r.__name)(function(t,e,i,n){for(i=i||{},n=t.length;n--;i[t[n]]=e);return i;},"o"),e=[6,8,10,11,12,14,16,17,18],i=[1,9],n=[1,10],a=[1,11],s=[1,12],l=[1,13],o=[1,14],c={trace:(0,r.__name)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:(0,r.__name)(function(t,e,i,n,a,s,r){var l=s.length-1;switch(a){case 1:return s[l-1];case 2:case 6:case 7:this.$=[];break;case 3:s[l-1].push(s[l]),this.$=s[l-1];break;case 4:case 5:this.$=s[l];break;case 8:n.setDiagramTitle(s[l].substr(6)),this.$=s[l].substr(6);break;case 9:this.$=s[l].trim(),n.setAccTitle(this.$);break;case 10:case 11:this.$=s[l].trim(),n.setAccDescription(this.$);break;case 12:n.addSection(s[l].substr(8)),this.$=s[l].substr(8);break;case 13:n.addTask(s[l-1],s[l]),this.$="task";}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:i,12:n,14:a,16:s,17:l,18:o},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:i,12:n,14:a,16:s,17:l,18:o},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:(0,r.__name)(function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i;}},"parseError"),parse:(0,r.__name)(function(t){var e=this,i=[0],n=[],a=[null],s=[],l=this.table,o="",c=0,h=0,u=0,y=s.slice.call(arguments,1),p=Object.create(this.lexer),d={yy:{}};for(var f in this.yy)Object.prototype.hasOwnProperty.call(this.yy,f)&&(d.yy[f]=this.yy[f]);p.setInput(t,d.yy),d.yy.lexer=p,d.yy.parser=this,void 0===p.yylloc&&(p.yylloc={});var _=p.yylloc;s.push(_);var m=p.options&&p.options.ranges;function g(){var t;return"number"!=typeof(t=n.pop()||p.lex()||1)&&(t instanceof Array&&(t=(n=t).pop()),t=e.symbols_[t]||t),t;}"function"==typeof d.yy.parseError?this.parseError=d.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,r.__name)(function(t){i.length=i.length-2*t,a.length=a.length-t,s.length=s.length-t;},"popStack"),(0,r.__name)(g,"lex");for(var x,k,b,v,$,w,T,M,S,C={};;){if(b=i[i.length-1],this.defaultActions[b]?v=this.defaultActions[b]:(null==x&&(x=g()),v=l[b]&&l[b][x]),void 0===v||!v.length||!v[0]){var A="";for(w in S=[],l[b])this.terminals_[w]&&w>2&&S.push("'"+this.terminals_[w]+"'");A=p.showPosition?"Parse error on line "+(c+1)+":\n"+p.showPosition()+"\nExpecting "+S.join(", ")+", got '"+(this.terminals_[x]||x)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==x?"end of input":"'"+(this.terminals_[x]||x)+"'"),this.parseError(A,{text:p.match,token:this.terminals_[x]||x,line:p.yylineno,loc:_,expected:S});}if(v[0]instanceof Array&&v.length>1)throw Error("Parse Error: multiple actions possible at state: "+b+", token: "+x);switch(v[0]){case 1:i.push(x),a.push(p.yytext),s.push(p.yylloc),i.push(v[1]),x=null,k?(x=k,k=null):(h=p.yyleng,o=p.yytext,c=p.yylineno,_=p.yylloc,u>0&&u--);break;case 2:if(T=this.productions_[v[1]][1],C.$=a[a.length-T],C._$={first_line:s[s.length-(T||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(T||1)].first_column,last_column:s[s.length-1].last_column},m&&(C._$.range=[s[s.length-(T||1)].range[0],s[s.length-1].range[1]]),void 0!==($=this.performAction.apply(C,[o,h,c,d.yy,v[1],a,s].concat(y))))return $;T&&(i=i.slice(0,-1*T*2),a=a.slice(0,-1*T),s=s.slice(0,-1*T)),i.push(this.productions_[v[1]][0]),a.push(C.$),s.push(C._$),M=l[i[i.length-2]][i[i.length-1]],i.push(M);break;case 3:return!0;}}return!0;},"parse")},h={EOF:1,parseError:(0,r.__name)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t);},"parseError"),setInput:(0,r.__name)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this;},"setInput"),input:(0,r.__name)(function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t;},"input"),unput:(0,r.__name)(function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var n=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var a=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===n.length?this.yylloc.first_column:0)+n[n.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[a[0],a[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this;},"unput"),more:(0,r.__name)(function(){return this._more=!0,this;},"more"),reject:(0,r.__name)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno});},"reject"),less:(0,r.__name)(function(t){this.unput(this.match.slice(t));},"less"),pastInput:(0,r.__name)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"");},"pastInput"),upcomingInput:(0,r.__name)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"");},"upcomingInput"),showPosition:(0,r.__name)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^";},"showPosition"),test_match:(0,r.__name)(function(t,e){var i,n,a;if(this.options.backtrack_lexer&&(a={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(a.yylloc.range=this.yylloc.range.slice(0))),(n=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var s in a)this[s]=a[s];return!1;},"test_match"),next:(0,r.__name)(function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,i,n,a=this._currentRules(),s=0;s<a.length;s++)if((i=this._input.match(this.rules[a[s]]))&&(!e||i[0].length>e[0].length)){if(e=i,n=s,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,a[s])))return t;if(!this._backtrack)return!1;e=!1;continue;}if(!this.options.flex)break;}return e?!1!==(t=this.test_match(e,a[n]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno});},"next"),lex:(0,r.__name)(function(){return this.next()||this.lex();},"lex"),begin:(0,r.__name)(function(t){this.conditionStack.push(t);},"begin"),popState:(0,r.__name)(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0];},"popState"),_currentRules:(0,r.__name)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules;},"_currentRules"),topState:(0,r.__name)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL";},"topState"),pushState:(0,r.__name)(function(t){this.begin(t);},"pushState"),stateStackSize:(0,r.__name)(function(){return this.conditionStack.length;},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,r.__name)(function(t,e,i,n){switch(i){case 0:case 1:case 3:case 4:break;case 2:return 10;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID";}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};function u(){this.yy={};}return c.lexer=h,(0,r.__name)(u,"Parser"),u.prototype=c,c.Parser=u,new u;}();o.parser=o;var c="",h=[],u=[],y=[],p=(0,r.__name)(function(){h.length=0,u.length=0,c="",y.length=0,(0,s.clear)();},"clear"),d=(0,r.__name)(function(t){c=t,h.push(t);},"addSection"),f=(0,r.__name)(function(){return h;},"getSections"),_=(0,r.__name)(function(){let t=k(),e=0;for(;!t&&e<100;)t=k(),e++;return u.push(...y),u;},"getTasks"),m=(0,r.__name)(function(){let t=[];return u.forEach(e=>{e.people&&t.push(...e.people);}),[...new Set(t)].sort();},"updateActors"),g=(0,r.__name)(function(t,e){let i=e.substr(1).split(":"),n=0,a=[];1===i.length?(n=Number(i[0]),a=[]):(n=Number(i[0]),a=i[1].split(","));let s=a.map(t=>t.trim()),r={section:c,type:c,people:s,task:t,score:n};y.push(r);},"addTask"),x=(0,r.__name)(function(t){let e={section:c,type:c,description:t,task:t,classes:[]};u.push(e);},"addTaskOrg"),k=(0,r.__name)(function(){let t=(0,r.__name)(function(t){return y[t].processed;},"compileTask"),e=!0;for(let[i,n]of y.entries())t(i),e=e&&n.processed;return e;},"compileTasks"),b=(0,r.__name)(function(){return m();},"getActors"),v={getConfig:(0,r.__name)(()=>(0,s.getConfig2)().journey,"getConfig"),clear:p,setDiagramTitle:s.setDiagramTitle,getDiagramTitle:s.getDiagramTitle,setAccTitle:s.setAccTitle,getAccTitle:s.getAccTitle,setAccDescription:s.setAccDescription,getAccDescription:s.getAccDescription,addSection:d,getSections:f,getTasks:_,addTask:g,addTaskOrg:x,getActors:b},$=(0,r.__name)(t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
  ${(0,a.getIconStyles)()}
`,"getStyles"),w=(0,r.__name)(function(t,e){return(0,n.drawRect)(t,e);},"drawRect"),T=(0,r.__name)(function(t,e){let i=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),n=t.append("g");function a(t){let i=(0,l.arc)().startAngle(Math.PI/2).endAngle(Math.PI/2*3).innerRadius(7.5).outerRadius(15/2.2);t.append("path").attr("class","mouth").attr("d",i).attr("transform","translate("+e.cx+","+(e.cy+2)+")");}function s(t){let i=(0,l.arc)().startAngle(3*Math.PI/2).endAngle(Math.PI/2*5).innerRadius(7.5).outerRadius(15/2.2);t.append("path").attr("class","mouth").attr("d",i).attr("transform","translate("+e.cx+","+(e.cy+7)+")");}function o(t){t.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666");}return n.append("circle").attr("cx",e.cx-5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),n.append("circle").attr("cx",e.cx+5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),(0,r.__name)(a,"smile"),(0,r.__name)(s,"sad"),(0,r.__name)(o,"ambivalent"),e.score>3?a(n):e.score<3?s(n):o(n),i;},"drawFace"),M=(0,r.__name)(function(t,e){let i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),void 0!==i.class&&i.attr("class",i.class),void 0!==e.title&&i.append("title").text(e.title),i;},"drawCircle"),S=(0,r.__name)(function(t,e){return(0,n.drawText)(t,e);},"drawText"),C=(0,r.__name)(function(t,e,i){let a=t.append("g"),s=(0,n.getNoteRect)();s.x=e.x,s.y=e.y,s.fill=e.fill,s.width=i.width*e.taskCount+i.diagramMarginX*(e.taskCount-1),s.height=i.height,s.class="journey-section section-type-"+e.num,s.rx=3,s.ry=3,w(a,s),I(i)(e.text,a,s.x,s.y,s.width,s.height,{class:"journey-section section-type-"+e.num},i,e.colour);},"drawSection"),A=-1,E=(0,r.__name)(function(t,e,i){let a=e.x+i.width/2,s=t.append("g");A++,s.append("line").attr("id","task"+A).attr("x1",a).attr("y1",e.y).attr("x2",a).attr("y2",450).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),T(s,{cx:a,cy:300+(5-e.score)*30,score:e.score});let r=(0,n.getNoteRect)();r.x=e.x,r.y=e.y,r.fill=e.fill,r.width=i.width,r.height=i.height,r.class="task task-type-"+e.num,r.rx=3,r.ry=3,w(s,r);let l=e.x+14;e.people.forEach(t=>{let i=e.actors[t].color;M(s,{cx:l,cy:e.y,r:7,fill:i,stroke:"#000",title:t,pos:e.actors[t].position}),l+=10;}),I(i)(e.task,s,r.x,r.y,r.width,r.height,{class:"task"},i,e.colour);},"drawTask"),I=function(){function t(t,e,i,a,s,r,l,o){n(e.append("text").attr("x",i+s/2).attr("y",a+r/2+5).style("font-color",o).style("text-anchor","middle").text(t),l);}function e(t,e,i,a,s,r,l,o,c){let{taskFontSize:h,taskFontFamily:u}=o,y=t.split(/<br\s*\/?>/gi);for(let t=0;t<y.length;t++){let o=t*h-h*(y.length-1)/2,p=e.append("text").attr("x",i+s/2).attr("y",a).attr("fill",c).style("text-anchor","middle").style("font-size",h).style("font-family",u);p.append("tspan").attr("x",i+s/2).attr("dy",o).text(y[t]),p.attr("y",a+r/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),n(p,l);}}function i(t,i,a,s,r,l,o,c){let h=i.append("switch"),u=h.append("foreignObject").attr("x",a).attr("y",s).attr("width",r).attr("height",l).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");u.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(t),e(t,h,a,s,r,l,o,c),n(u,o);}function n(t,e){for(let i in e)i in e&&t.attr(i,e[i]);}return(0,r.__name)(t,"byText"),(0,r.__name)(e,"byTspan"),(0,r.__name)(i,"byFo"),(0,r.__name)(n,"_setTextAttrs"),function(n){return"fo"===n.textPlacement?i:"old"===n.textPlacement?t:e;};}(),P={drawCircle:M,drawSection:C,drawText:S,drawTask:E,initGraphics:(0,r.__name)(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z");},"initGraphics")},j=(0,r.__name)(function(t){Object.keys(t).forEach(function(e){R[e]=t[e];});},"setConf"),V={},D=0;function F(t){let e=(0,s.getConfig2)().journey,i=e.maxLabelWidth;D=0;let n=60;Object.keys(V).forEach(a=>{let s=V[a].color,r={cx:20,cy:n,r:7,fill:s,stroke:"#000",pos:V[a].position};P.drawCircle(t,r);let l=t.append("text").attr("visibility","hidden").text(a),o=l.node().getBoundingClientRect().width;l.remove();let c=[];if(o<=i)c=[a];else{let e=a.split(" "),n="";l=t.append("text").attr("visibility","hidden"),e.forEach(t=>{let e=n?`${n} ${t}`:t;if(l.text(e),l.node().getBoundingClientRect().width>i){if(n&&c.push(n),n=t,l.text(t),l.node().getBoundingClientRect().width>i){let e="";for(let n of t)e+=n,l.text(e+"-"),l.node().getBoundingClientRect().width>i&&(c.push(e.slice(0,-1)+"-"),e=n);n=e;}}else n=e;}),n&&c.push(n),l.remove();}c.forEach((i,a)=>{let s={x:40,y:n+7+20*a,fill:"#666",text:i,textMargin:e.boxTextMargin??5},r=P.drawText(t,s).node().getBoundingClientRect().width;r>D&&r>e.leftMargin-r&&(D=r);}),n+=Math.max(20,20*c.length);});}(0,r.__name)(F,"drawActorLegend");var R=(0,s.getConfig2)().journey,B=0,L=(0,r.__name)(function(t,e,i,n){let a;let r=(0,s.getConfig2)(),o=r.journey.titleColor,c=r.journey.titleFontSize,h=r.journey.titleFontFamily,u=r.securityLevel;"sandbox"===u&&(a=(0,l.select)("#i"+e));let y="sandbox"===u?(0,l.select)(a.nodes()[0].contentDocument.body):(0,l.select)("body");N.init();let p=y.select("#"+e);P.initGraphics(p);let d=n.db.getTasks(),f=n.db.getDiagramTitle(),_=n.db.getActors();for(let t in V)delete V[t];let m=0;_.forEach(t=>{V[t]={color:R.actorColours[m%R.actorColours.length],position:m},m++;}),F(p),B=R.leftMargin+D,N.insert(0,0,B,50*Object.keys(V).length),Y(p,d,0);let g=N.getBounds();f&&p.append("text").text(f).attr("x",B).attr("font-size",c).attr("font-weight","bold").attr("y",25).attr("fill",o).attr("font-family",h);let x=g.stopy-g.starty+2*R.diagramMarginY,k=B+g.stopx+2*R.diagramMarginX;(0,s.configureSvgSize)(p,x,k,R.useMaxWidth),p.append("line").attr("x1",B).attr("y1",4*R.height).attr("x2",k-B-4).attr("y2",4*R.height).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");let b=f?70:0;p.attr("viewBox",`${g.startx} -25 ${k} ${x+b}`),p.attr("preserveAspectRatio","xMinYMin meet"),p.attr("height",x+b+25);},"draw"),N={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:(0,r.__name)(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0;},"init"),updateVal:(0,r.__name)(function(t,e,i,n){void 0===t[e]?t[e]=i:t[e]=n(i,t[e]);},"updateVal"),updateBounds:(0,r.__name)(function(t,e,i,n){let a=(0,s.getConfig2)().journey,l=this,o=0;function c(s){return(0,r.__name)(function(r){o++;let c=l.sequenceItems.length-o+1;l.updateVal(r,"starty",e-c*a.boxMargin,Math.min),l.updateVal(r,"stopy",n+c*a.boxMargin,Math.max),l.updateVal(N.data,"startx",t-c*a.boxMargin,Math.min),l.updateVal(N.data,"stopx",i+c*a.boxMargin,Math.max),"activation"!==s&&(l.updateVal(r,"startx",t-c*a.boxMargin,Math.min),l.updateVal(r,"stopx",i+c*a.boxMargin,Math.max),l.updateVal(N.data,"starty",e-c*a.boxMargin,Math.min),l.updateVal(N.data,"stopy",n+c*a.boxMargin,Math.max));},"updateItemBounds");}(0,r.__name)(c,"updateFn"),this.sequenceItems.forEach(c());},"updateBounds"),insert:(0,r.__name)(function(t,e,i,n){let a=Math.min(t,i),s=Math.max(t,i),r=Math.min(e,n),l=Math.max(e,n);this.updateVal(N.data,"startx",a,Math.min),this.updateVal(N.data,"starty",r,Math.min),this.updateVal(N.data,"stopx",s,Math.max),this.updateVal(N.data,"stopy",l,Math.max),this.updateBounds(a,r,s,l);},"insert"),bumpVerticalPos:(0,r.__name)(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos;},"bumpVerticalPos"),getVerticalPos:(0,r.__name)(function(){return this.verticalPos;},"getVerticalPos"),getBounds:(0,r.__name)(function(){return this.data;},"getBounds")},O=R.sectionFills,z=R.sectionColours,Y=(0,r.__name)(function(t,e,i){let n=(0,s.getConfig2)().journey,a="",r=i+(2*n.height+n.diagramMarginY),l=0,o="#CCC",c="black",h=0;for(let[i,s]of e.entries()){if(a!==s.section){o=O[l%O.length],h=l%O.length,c=z[l%z.length];let r=0,u=s.section;for(let t=i;t<e.length&&e[t].section==u;t++)r+=1;let y={x:i*n.taskMargin+i*n.width+B,y:50,text:s.section,fill:o,num:h,colour:c,taskCount:r};P.drawSection(t,y,n),a=s.section,l++;}let u=s.people.reduce((t,e)=>(V[e]&&(t[e]=V[e]),t),{});s.x=i*n.taskMargin+i*n.width+B,s.y=r,s.width=n.diagramMarginX,s.height=n.diagramMarginY,s.colour=c,s.fill=o,s.num=h,s.actors=u,P.drawTask(t,s,n),N.insert(s.x,s.y,s.x+s.width+n.taskMargin,450);}},"drawTasks"),W={setConf:j,draw:L},q={parser:o,db:v,renderer:W,styles:$,init:(0,r.__name)(t=>{W.setConf(t.journey),v.clear();},"init")};}}]);