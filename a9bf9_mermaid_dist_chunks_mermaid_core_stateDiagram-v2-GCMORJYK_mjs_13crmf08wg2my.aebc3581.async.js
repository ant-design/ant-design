(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,47067,t=>{"use strict";var e=t.i(250142),s=t.i(802034),i=t.i(499723);t.i(920195);var r=t.i(652833);t.i(172009),t.i(797698),t.i(417760),t.i(379864),t.i(750153),t.i(604055),t.i(955949);var n=t.i(113717),a=t.i(43843),o=t.i(419922),l=t.i(785788),c=t.i(331875),h=t.i(892376),d=t.i(425448),u=function(){var t=(0,c.p)(function(t,e,s,i){for(s=s||{},i=t.length;i--;s[t[i]]=e);return s},"o"),e=[1,2],s=[1,3],i=[1,4],r=[2,4],n=[1,9],a=[1,11],o=[1,16],l=[1,17],h=[1,18],d=[1,19],u=[1,33],p=[1,20],y=[1,21],g=[1,22],f=[1,23],m=[1,24],S=[1,26],k=[1,27],b=[1,28],T=[1,29],_=[1,30],E=[1,31],$=[1,32],x=[1,35],C=[1,36],D=[1,37],v=[1,38],w=[1,34],I=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],A=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],L=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],N={trace:(0,c.p)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:(0,c.p)(function(t,e,s,i,r,n,a){var o=n.length-1;switch(r){case 3:return i.setRootDoc(n[o]),n[o];case 4:this.$=[];break;case 5:"nl"!=n[o]&&(n[o-1].push(n[o]),this.$=n[o-1]);break;case 6:case 7:case 12:this.$=n[o];break;case 8:this.$="nl";break;case 13:let l=n[o-1];l.description=i.trimColon(n[o]),this.$=l;break;case 14:this.$={stmt:"relation",state1:n[o-2],state2:n[o]};break;case 15:let c=i.trimColon(n[o]);this.$={stmt:"relation",state1:n[o-3],state2:n[o-1],description:c};break;case 19:this.$={stmt:"state",id:n[o-3],type:"default",description:"",doc:n[o-1]};break;case 20:var h=n[o],d=n[o-2].trim();if(n[o].match(":")){var u=n[o].split(":");h=u[0],d=[d,u[1]]}this.$={stmt:"state",id:h,type:"default",description:d};break;case 21:this.$={stmt:"state",id:n[o-3],type:"default",description:n[o-5],doc:n[o-1]};break;case 22:this.$={stmt:"state",id:n[o],type:"fork"};break;case 23:this.$={stmt:"state",id:n[o],type:"join"};break;case 24:this.$={stmt:"state",id:n[o],type:"choice"};break;case 25:this.$={stmt:"state",id:i.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:n[o-1].trim(),note:{position:n[o-2].trim(),text:n[o].trim()}};break;case 29:this.$=n[o].trim(),i.setAccTitle(this.$);break;case 30:case 31:this.$=n[o].trim(),i.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:n[o-3],url:n[o-2],tooltip:n[o-1]};break;case 33:this.$={stmt:"click",id:n[o-3],url:n[o-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:n[o-1].trim(),classes:n[o].trim()};break;case 36:this.$={stmt:"style",id:n[o-1].trim(),styleClass:n[o].trim()};break;case 37:this.$={stmt:"applyClass",id:n[o-1].trim(),styleClass:n[o].trim()};break;case 38:i.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:i.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:i.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:i.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:n[o].trim(),type:"default",description:""};break;case 46:case 47:this.$={stmt:"state",id:n[o-2].trim(),classes:[n[o].trim()],type:"default",description:""}}},"anonymous"),table:[{3:1,4:e,5:s,6:i},{1:[3]},{3:5,4:e,5:s,6:i},{3:6,4:e,5:s,6:i},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],r,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:n,5:a,8:8,9:10,10:12,11:13,12:14,13:15,16:o,17:l,19:h,22:d,24:u,25:p,26:y,27:g,28:f,29:m,32:25,33:S,35:k,37:b,38:T,41:_,45:E,48:$,51:x,52:C,53:D,54:v,57:w},t(I,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:o,17:l,19:h,22:d,24:u,25:p,26:y,27:g,28:f,29:m,32:25,33:S,35:k,37:b,38:T,41:_,45:E,48:$,51:x,52:C,53:D,54:v,57:w},t(I,[2,7]),t(I,[2,8]),t(I,[2,9]),t(I,[2,10]),t(I,[2,11]),t(I,[2,12],{14:[1,40],15:[1,41]}),t(I,[2,16]),{18:[1,42]},t(I,[2,18],{20:[1,43]}),{23:[1,44]},t(I,[2,22]),t(I,[2,23]),t(I,[2,24]),t(I,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},t(I,[2,28]),{34:[1,49]},{36:[1,50]},t(I,[2,31]),{13:51,24:u,57:w},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},t(A,[2,44],{58:[1,56]}),t(A,[2,45],{58:[1,57]}),t(I,[2,38]),t(I,[2,39]),t(I,[2,40]),t(I,[2,41]),t(I,[2,6]),t(I,[2,13]),{13:58,24:u,57:w},t(I,[2,17]),t(L,r,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},t(I,[2,29]),t(I,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},t(I,[2,14],{14:[1,71]}),{4:n,5:a,8:8,9:10,10:12,11:13,12:14,13:15,16:o,17:l,19:h,21:[1,72],22:d,24:u,25:p,26:y,27:g,28:f,29:m,32:25,33:S,35:k,37:b,38:T,41:_,45:E,48:$,51:x,52:C,53:D,54:v,57:w},t(I,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},t(I,[2,34]),t(I,[2,35]),t(I,[2,36]),t(I,[2,37]),t(A,[2,46]),t(A,[2,47]),t(I,[2,15]),t(I,[2,19]),t(L,r,{7:78}),t(I,[2,26]),t(I,[2,27]),{5:[1,79]},{5:[1,80]},{4:n,5:a,8:8,9:10,10:12,11:13,12:14,13:15,16:o,17:l,19:h,21:[1,81],22:d,24:u,25:p,26:y,27:g,28:f,29:m,32:25,33:S,35:k,37:b,38:T,41:_,45:E,48:$,51:x,52:C,53:D,54:v,57:w},t(I,[2,32]),t(I,[2,33]),t(I,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:(0,c.p)(function(t,e){if(e.recoverable)this.trace(t);else{var s=Error(t);throw s.hash=e,s}},"parseError"),parse:(0,c.p)(function(t){var e=this,s=[0],i=[],r=[null],n=[],a=this.table,o="",l=0,h=0,d=0,u=n.slice.call(arguments,1),p=Object.create(this.lexer),y={};for(var g in this.yy)Object.prototype.hasOwnProperty.call(this.yy,g)&&(y[g]=this.yy[g]);p.setInput(t,y),y.lexer=p,y.parser=this,void 0===p.yylloc&&(p.yylloc={});var f=p.yylloc;n.push(f);var m=p.options&&p.options.ranges;function S(){var t;return"number"!=typeof(t=i.pop()||p.lex()||1)&&(t instanceof Array&&(t=(i=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof y.parseError?this.parseError=y.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,c.p)(function(t){s.length=s.length-2*t,r.length=r.length-t,n.length=n.length-t},"popStack"),(0,c.p)(S,"lex");for(var k,b,T,_,E,$,x,C,D,v={};;){if(T=s[s.length-1],this.defaultActions[T]?_=this.defaultActions[T]:(null==k&&(k=S()),_=a[T]&&a[T][k]),void 0===_||!_.length||!_[0]){var w="";for($ in D=[],a[T])this.terminals_[$]&&$>2&&D.push("'"+this.terminals_[$]+"'");w=p.showPosition?"Parse error on line "+(l+1)+":\n"+p.showPosition()+"\nExpecting "+D.join(", ")+", got '"+(this.terminals_[k]||k)+"'":"Parse error on line "+(l+1)+": Unexpected "+(1==k?"end of input":"'"+(this.terminals_[k]||k)+"'"),this.parseError(w,{text:p.match,token:this.terminals_[k]||k,line:p.yylineno,loc:f,expected:D})}if(_[0]instanceof Array&&_.length>1)throw Error("Parse Error: multiple actions possible at state: "+T+", token: "+k);switch(_[0]){case 1:s.push(k),r.push(p.yytext),n.push(p.yylloc),s.push(_[1]),k=null,b?(k=b,b=null):(h=p.yyleng,o=p.yytext,l=p.yylineno,f=p.yylloc,d>0&&d--);break;case 2:if(x=this.productions_[_[1]][1],v.$=r[r.length-x],v._$={first_line:n[n.length-(x||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-(x||1)].first_column,last_column:n[n.length-1].last_column},m&&(v._$.range=[n[n.length-(x||1)].range[0],n[n.length-1].range[1]]),void 0!==(E=this.performAction.apply(v,[o,h,l,y,_[1],r,n].concat(u))))return E;x&&(s=s.slice(0,-1*x*2),r=r.slice(0,-1*x),n=n.slice(0,-1*x)),s.push(this.productions_[_[1]][0]),r.push(v.$),n.push(v._$),C=a[s[s.length-2]][s[s.length-1]],s.push(C);break;case 3:return!0}}return!0},"parse")};function O(){this.yy={}}return N.lexer={EOF:1,parseError:(0,c.p)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},"parseError"),setInput:(0,c.p)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,c.p)(function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},"input"),unput:(0,c.p)(function(t){var e=t.length,s=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),s.length-1&&(this.yylineno-=s.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:s?(s.length===i.length?this.yylloc.first_column:0)+i[i.length-s.length].length-s[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},"unput"),more:(0,c.p)(function(){return this._more=!0,this},"more"),reject:(0,c.p)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:(0,c.p)(function(t){this.unput(this.match.slice(t))},"less"),pastInput:(0,c.p)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,c.p)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,c.p)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},"showPosition"),test_match:(0,c.p)(function(t,e){var s,i,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),(i=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],s=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),s)return s;if(this._backtrack)for(var n in r)this[n]=r[n];return!1},"test_match"),next:(0,c.p)(function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,s,i,r=this._currentRules(),n=0;n<r.length;n++)if((s=this._input.match(this.rules[r[n]]))&&(!e||s[0].length>e[0].length)){if(e=s,i=n,this.options.backtrack_lexer){if(!1!==(t=this.test_match(s,r[n])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,r[i]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,c.p)(function(){var t=this.next();return t||this.lex()},"lex"),begin:(0,c.p)(function(t){this.conditionStack.push(t)},"begin"),popState:(0,c.p)(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,c.p)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,c.p)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},"topState"),pushState:(0,c.p)(function(t){this.begin(t)},"pushState"),stateStackSize:(0,c.p)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,c.p)(function(t,e,s,i){function r(){let s=e.yytext.indexOf("%%");if(0===s)return!1;if(s>0){let i=e.yytext.slice(0,s),r=e.yytext.slice(s);r&&t.lexer.unput(r),e.yytext=i}return!0}switch((0,c.p)(r,"processId"),s){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:case 43:return 51;case 5:case 44:return 52;case 6:case 45:return 53;case 7:case 46:return 54;case 8:case 78:return 5;case 9:case 10:case 11:case 12:case 57:case 63:break;case 13:case 33:return this.pushState("SCALE"),17;case 14:case 34:return 18;case 15:case 21:case 35:case 50:case 54:this.popState();break;case 16:return this.begin("acc_title"),33;case 17:return this.popState(),"acc_title_value";case 18:return this.begin("acc_descr"),35;case 19:return this.popState(),"acc_descr_value";case 20:this.begin("acc_descr_multiline");break;case 22:return"acc_descr_multiline_value";case 23:return this.pushState("CLASSDEF"),41;case 24:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 25:return this.popState(),this.pushState("CLASSDEFID"),42;case 26:return this.popState(),43;case 27:return this.pushState("CLASS"),48;case 28:return this.popState(),this.pushState("CLASS_STYLE"),49;case 29:return this.popState(),50;case 30:return this.pushState("STYLE"),45;case 31:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;case 32:return this.popState(),47;case 36:this.pushState("STATE");break;case 37:case 40:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),25;case 38:case 41:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),26;case 39:case 42:return this.popState(),e.yytext=e.yytext.slice(0,-10).trim(),27;case 47:this.pushState("STATE_STRING");break;case 48:return this.pushState("STATE_ID"),"AS";case 49:case 65:if(!r())return;return this.popState(),"ID";case 51:return"STATE_DESCR";case 52:throw Error('Error: State name must be a single word. Found: "'+e.yytext.trim()+'"');case 53:return 19;case 55:return this.popState(),this.pushState("struct"),20;case 56:return this.popState(),21;case 58:return this.begin("NOTE"),29;case 59:return this.popState(),this.pushState("NOTE_ID"),59;case 60:return this.popState(),this.pushState("NOTE_ID"),60;case 61:this.popState(),this.pushState("FLOATING_NOTE");break;case 62:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 64:return"NOTE_TEXT";case 66:if(!r())return;return this.popState(),this.pushState("NOTE_TEXT"),24;case 67:return this.popState(),e.yytext=e.yytext.substr(2).trim(),31;case 68:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),31;case 69:case 70:return 6;case 71:return 16;case 72:return 57;case 73:if(!r())return;return 24;case 74:return e.yytext=e.yytext.trim(),14;case 75:return 15;case 76:return 28;case 77:return 58;case 79:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:\w+\s+\w+.*?\{)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?\n\s*end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:(?:[^:\n;]|:[^:\n;])+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[10,11,12],inclusive:!1},struct:{rules:[10,11,12,23,27,30,36,43,44,45,46,56,57,58,72,73,74,75,76,77],inclusive:!1},FLOATING_NOTE_ID:{rules:[65],inclusive:!1},FLOATING_NOTE:{rules:[62,63,64],inclusive:!1},NOTE_TEXT:{rules:[67,68],inclusive:!1},NOTE_ID:{rules:[66],inclusive:!1},NOTE:{rules:[59,60,61],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[32],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[31],inclusive:!1},CLASS_STYLE:{rules:[29],inclusive:!1},CLASS:{rules:[28],inclusive:!1},CLASSDEFID:{rules:[26],inclusive:!1},CLASSDEF:{rules:[24,25],inclusive:!1},acc_descr_multiline:{rules:[21,22],inclusive:!1},acc_descr:{rules:[19],inclusive:!1},acc_title:{rules:[17],inclusive:!1},SCALE:{rules:[14,15,34,35],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[49],inclusive:!1},STATE_STRING:{rules:[50,51],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[10,11,12,37,38,39,40,41,42,47,48,52,53,54,55],inclusive:!1},ID:{rules:[10,11,12],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,11,12,13,16,18,20,23,27,30,33,36,55,58,69,70,71,72,73,74,75,77,78,79],inclusive:!0}}},(0,c.p)(O,"Parser"),O.prototype=N,N.Parser=O,new O}();u.parser=u;var p="TB",y="state",g="root",f="relation",m="default",S="divider",k="fill:none",b="fill: #333",T="markdown",_="normal",E="rect",$="rectWithTitle",x="divider",C="roundedWithTitle",D="statediagram",v=`${D}-state`,w="transition",I=`${w} note-edge`,A=`${D}-note`,L=`${D}-cluster`,N=`${D}-cluster-alt`,O="parent",R="note",B="----",F=`${B}${R}`,P=`${B}${O}`,G=new Map,Y=0,z=0,j=new Map,W=(0,c.p)((t,e,s,i)=>{if(t===x&&s?.id!==void 0&&j.has(s.id)){let t=j.get(s.id);return j.set(e,t),t}let r=z++,n=i?void 0:r;return j.set(e,n),n},"colorSlotFor");function M(t="",e=0,s="",i=B){let r=null!==s&&s.length>0?`${i}${s}`:"";return`state-${t}${r}-${e}`}(0,c.p)(M,"stateDomId");var U=(0,c.p)((t,e,s,i,r,n,a,c)=>{l.d.trace("items",e),e.forEach(e=>{switch(e.stmt){case y:case m:K(t,e,s,i,r,n,a,c);break;case f:{K(t,e.state1,s,i,r,n,a,c),K(t,e.state2,s,i,r,n,a,c);let l="neo"===a,h={id:"edge"+Y,start:e.state1.id,end:e.state2.id,arrowhead:"normal",arrowTypeEnd:l?"arrow_barb_neo":"arrow_barb",style:k,labelStyle:"",label:o.E.sanitizeText(e.description??"",(0,o.z)()),arrowheadStyle:b,labelpos:"c",labelType:T,thickness:_,classes:w,look:a};r.push(h),Y++}}})},"setupDoc"),H=(0,c.p)((t,e=p)=>{let s=e;if(t.doc)for(let e of t.doc)"dir"===e.stmt&&(s=e.value);return s},"getDir");function X(t,e,s){if(!e.id||"</join></fork>"===e.id||"</choice>"===e.id)return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(t=>{let i=s.get(t);i&&(e.cssCompiledStyles=[...e.cssCompiledStyles??[],...i.styles])}));let i=t.find(t=>t.id===e.id);i?Object.assign(i,e):t.push(e)}function V(t){return t?.classes?.join(" ")??""}function J(t){return t?.styles??[]}(0,c.p)(X,"insertOrUpdateNode"),(0,c.p)(V,"getClassesFromDbInfo"),(0,c.p)(J,"getStylesFromDbInfo");var K=(0,c.p)((t,e,s,i,r,n,a,c)=>{let h=e.id,d=s.get(h),u=V(d),p=J(d),y=(0,o.z)(),g=""!==u.trim()||p.length>0;if(l.d.info("dataFetcher parsedItem",e,d,p),"root"!==h){let s=E;!0===e.start?s="stateStart":!1===e.start&&(s="stateEnd"),e.type!==m&&(s=e.type),G.get(h)||G.set(h,{id:h,shape:s,description:o.E.sanitizeText(h,y),cssClasses:`${u} ${v}`,cssStyles:p});let d=G.get(h);e.description&&(Array.isArray(d.description)?(d.shape=$,d.description.push(e.description)):d.description?.length&&d.description.length>0?(d.shape=$,d.description===h?d.description=[e.description]:d.description=[d.description,e.description]):(d.shape=E,d.description=e.description),d.description=o.E.sanitizeTextOrArray(d.description,y)),d.description?.length===1&&d.shape===$&&("group"===d.type?d.shape=C:d.shape=E),!d.type&&e.doc&&(l.d.info("Setting cluster for XCX",h,H(e)),d.type="group",d.isGroup=!0,d.dir=H(e),d.shape=e.type===S?x:C,d.colorIndex=W(d.shape,h,t,g),d.cssClasses=`${d.cssClasses} ${L} ${n?N:""}`);let f={labelStyle:"",shape:d.shape,label:d.description,cssClasses:d.cssClasses,cssCompiledStyles:[],cssStyles:d.cssStyles,id:h,dir:d.dir,domId:M(h,Y),type:d.type,isGroup:"group"===d.type,colorIndex:d.colorIndex,padding:8,rx:10,ry:10,look:a,labelType:"markdown"};if(f.shape===x&&(f.label=""),t&&"root"!==t.id&&(l.d.trace("Setting node ",h," to be child of its parent ",t.id),f.parentId=t.id),f.centerLabel=!0,e.note){let t={labelStyle:"",shape:"note",label:e.note.text,labelType:"markdown",cssClasses:A,cssStyles:[],cssCompiledStyles:[],id:h+F+"-"+Y,domId:M(h,Y,R),type:"node",isGroup:!1,padding:y.flowchart?.padding,look:a,position:e.note.position},s=h+P,n={labelStyle:"",shape:"noteGroup",label:e.note.text,cssClasses:d.cssClasses,cssStyles:[],id:h+P,domId:M(h,Y,O),type:"group",isGroup:!0,padding:16,look:a,position:e.note.position};Y++,n.id=s,t.parentId=s,X(i,n,c),X(i,t,c),X(i,f,c);let o=h,l=t.id;"left of"===e.note.position&&(o=t.id,l=h),r.push({id:o+"-"+l,start:o,end:l,arrowhead:"none",arrowTypeEnd:"",style:k,labelStyle:"",classes:I,pattern:"dashed",arrowheadStyle:b,labelpos:"c",labelType:T,thickness:_,look:a})}else X(i,f,c)}e.doc&&(l.d.trace("Adding nodes children "),U(e,e.doc,s,i,r,!n,a,c))},"dataFetcher"),q=(0,c.p)(()=>{G.clear(),Y=0,z=0,j.clear()},"reset"),Q=(0,c.p)((t,e=p)=>{if(!t.doc)return e;let s=e;for(let e of t.doc)"dir"===e.stmt&&(s=e.value);return s},"getDir"),Z=(0,c.p)(function(t,e){return e.db.getClasses()},"getClasses"),tt=(0,c.p)(async function(t,r,n,c){l.d.info("REF0:"),l.d.info("Drawing state diagram (v2)",r);let{securityLevel:h,state:d,layout:u}=(0,o.z)();c.db.extract(c.db.getRootDocV2());let p=c.db.getData(),y=(0,e.f)(r,h);p.type=c.type,p.layoutAlgorithm=(0,i.G)(u),p.nodeSpacing=d?.nodeSpacing||50,p.rankSpacing=d?.rankSpacing||50,"neo"===(0,o.z)().look?p.markers=["barbNeo"]:p.markers=["barb"],p.diagramId=r,await (0,i.a)(p,y);try{("function"==typeof c.db.getLinks?c.db.getLinks():new Map).forEach((t,e)=>{let s,i="string"==typeof e?e:"string"==typeof e?.id?e.id:"",r=p.nodes.find(t=>t.id===i);if(!i)return void l.d.warn("⚠️ Invalid or missing stateId from key:",JSON.stringify(e));let n=y.node()?.querySelectorAll("g.node, g.rough-node");if(n?.forEach(t=>{let e=t.textContent?.trim();(t.id===r?.domId||e===i)&&(s=t)}),!s)return void l.d.warn("⚠️ Could not find node matching text:",i);let a=s.parentNode;if(!a)return void l.d.warn("⚠️ Node has no parent, cannot wrap:",i);let o=document.createElementNS("http://www.w3.org/2000/svg","a"),c=t.url.replace(/^"+|"+$/g,"");if(o.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",c),o.setAttribute("target","_blank"),t.tooltip){let e=t.tooltip.replace(/^"+|"+$/g,"");o.setAttribute("title",e),s.setAttribute("title",e)}a.replaceChild(o,s),o.appendChild(s),l.d.info("🔗 Wrapped node in <a> tag for:",i,t.url)})}catch(t){l.d.error("❌ Error injecting clickable links:",t)}a.u.insertTitle(y,"statediagramTitleText",d?.titleTopMargin??25,c.db.getDiagramTitle()),(0,s.f)(y,8,D,d?.useMaxWidth??!0)},"draw"),te="start",ts="color",ti="fill",tr=(0,c.p)(()=>new Map,"newClassesList"),tn=(0,c.p)(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),ta=(0,c.p)(t=>JSON.parse(JSON.stringify(t)),"clone"),to=class{constructor(t){this.version=t,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=tr(),this.documents={root:tn()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.funs=[],this.getAccTitle=o.d,this.setAccTitle=o.b,this.getAccDescription=o.j,this.setAccDescription=o.C,this.setDiagramTitle=o.a,this.getDiagramTitle=o.F,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this),this.bindFunctions=this.bindFunctions.bind(this)}static{(0,c.p)(this,"StateDB")}static{this.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3}}extract(t){for(let e of(this.clear(!0),Array.isArray(t)?t:t.doc))switch(e.stmt){case y:this.addState(e.id.trim(),e.type,e.doc,e.description,e.note);break;case f:this.addRelation(e.state1,e.state2,e.description);break;case"classDef":this.addStyleClass(e.id.trim(),e.classes);break;case"style":this.handleStyleDef(e);break;case"applyClass":this.setCssClass(e.id.trim(),e.styleClass);break;case"click":this.addLink(e.id,e.url,e.tooltip)}let e=this.getStates(),s=(0,o.z)();for(let t of(q(),K(void 0,this.getRootDocV2(),e,this.nodes,this.edges,!0,s.look,this.classes),this.nodes))if(Array.isArray(t.label)){if(t.description=t.label.slice(1),t.isGroup&&t.description.length>0)throw Error(`Group nodes can only have label. Remove the additional description for node [${t.id}]`);t.label=t.label[0]}}handleStyleDef(t){let e=t.id.trim().split(","),s=t.styleClass.split(",");for(let t of e){let e=this.getState(t);if(!e){let s=t.trim();this.addState(s),e=this.getState(s)}e&&(e.styles=s.map(t=>t.replace(/;/g,"")?.trim()))}}setRootDoc(t){l.d.info("Setting root doc",t),this.rootDoc=t,1===this.version?this.extract(t):this.extract(this.getRootDocV2())}docTranslator(t,e,s){if(e.stmt===f){this.docTranslator(t,e.state1,!0),this.docTranslator(t,e.state2,!1);return}if(e.stmt===y&&("[*]"===e.id?(e.id=t.id+(s?"_start":"_end"),e.start=s):e.id=e.id.trim()),e.stmt!==g&&e.stmt!==y||!e.doc)return;let i=[],r=[];for(let t of e.doc)if(t.type===S){let e=ta(t);e.doc=ta(r),i.push(e),r=[]}else r.push(t);if(i.length>0&&r.length>0){let t={stmt:y,id:(0,a.$)(),type:"divider",doc:ta(r)};i.push(ta(t)),e.doc=i}e.doc.forEach(t=>this.docTranslator(e,t,!0))}getRootDocV2(){return this.docTranslator({id:g,stmt:g},{id:g,stmt:g,doc:this.rootDoc},!0),{id:g,doc:this.rootDoc}}addState(t,e=m,s,i,r,n,a,c){let h=t?.trim();if(this.currentDocument.states.has(h)){let t=this.currentDocument.states.get(h);if(!t)throw Error(`State not found: ${h}`);t.doc||(t.doc=s),t.type||(t.type=e)}else l.d.info("Adding state ",h,i),this.currentDocument.states.set(h,{stmt:y,id:h,descriptions:[],type:e,doc:s,note:r,classes:[],styles:[],textStyles:[]});if(i&&(l.d.info("Setting state description",h,i),(Array.isArray(i)?i:[i]).forEach(t=>this.addDescription(h,t.trim()))),r){let t=this.currentDocument.states.get(h);if(!t)throw Error(`State not found: ${h}`);t.note=r,t.note.text=o.E.sanitizeText(t.note.text,(0,o.z)())}n&&(l.d.info("Setting state classes",h,n),(Array.isArray(n)?n:[n]).forEach(t=>this.setCssClass(h,t.trim()))),a&&(l.d.info("Setting state styles",h,a),(Array.isArray(a)?a:[a]).forEach(t=>this.setStyle(h,t.trim()))),c&&(l.d.info("Setting state styles",h,a),(Array.isArray(c)?c:[c]).forEach(t=>this.setTextStyle(h,t.trim())))}clear(t){this.nodes=[],this.edges=[],this.funs=[this.setupToolTips.bind(this)],this.documents={root:tn()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=tr(),t||(this.links=new Map,(0,o.M)())}getState(t){return this.currentDocument.states.get(t)}getStates(){return this.currentDocument.states}logDocuments(){l.d.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(t,e,s){this.links.set(t,{url:e,tooltip:s}),l.d.warn("Adding link",t,e,s)}getLinks(){return this.links}startIdIfNeeded(t=""){return"[*]"===t?(this.startEndCount++,`${te}${this.startEndCount}`):t}startTypeIfNeeded(t="",e=m){return"[*]"===t?te:e}endIdIfNeeded(t=""){return"[*]"===t?(this.startEndCount++,`end${this.startEndCount}`):t}endTypeIfNeeded(t="",e=m){return"[*]"===t?"end":e}addRelationObjs(t,e,s=""){let i=this.startIdIfNeeded(t.id.trim()),r=this.startTypeIfNeeded(t.id.trim(),t.type),n=this.startIdIfNeeded(e.id.trim()),a=this.startTypeIfNeeded(e.id.trim(),e.type);this.addState(i,r,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),this.addState(n,a,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.currentDocument.relations.push({id1:i,id2:n,relationTitle:o.E.sanitizeText(s,(0,o.z)())})}addRelation(t,e,s){if("object"==typeof t&&"object"==typeof e)this.addRelationObjs(t,e,s);else if("string"==typeof t&&"string"==typeof e){let i=this.startIdIfNeeded(t.trim()),r=this.startTypeIfNeeded(t),n=this.endIdIfNeeded(e.trim()),a=this.endTypeIfNeeded(e);this.addState(i,r),this.addState(n,a),this.currentDocument.relations.push({id1:i,id2:n,relationTitle:s?o.E.sanitizeText(s,(0,o.z)()):void 0})}}addDescription(t,e){let s=this.currentDocument.states.get(t),i=e.startsWith(":")?e.replace(":","").trim():e;s?.descriptions?.push(o.E.sanitizeText(i,(0,o.z)()))}cleanupLabel(t){return t.startsWith(":")?t.slice(2).trim():t.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(t,e=""){this.classes.has(t)||this.classes.set(t,{id:t,styles:[],textStyles:[]});let s=this.classes.get(t);e&&s&&e.split(",").forEach(t=>{let e=t.replace(/([^;]*);/,"$1").trim();if(RegExp(ts).exec(t)){let t=e.replace(ti,"bgFill").replace(ts,ti);s.textStyles.push(t)}s.styles.push(e)})}getClasses(){return this.classes}setupToolTips(t){let e=(0,r.m)();(0,h.W)(t).select("svg").selectAll("g.node, g.rough-node").on("mouseover",t=>{let s=(0,h.W)(t.currentTarget),i=s.attr("title");if(null===i)return;let r=t.currentTarget?.getBoundingClientRect();e.transition().duration(200).style("opacity",".9"),e.style("left",window.scrollX+r.left+(r.right-r.left)/2+"px").style("top",window.scrollY+r.bottom+"px"),e.html(d.f.sanitize(i)),s.classed("hover",!0)}).on("mouseout",t=>{e.transition().duration(500).style("opacity",0),(0,h.W)(t.currentTarget).classed("hover",!1)})}setCssClass(t,e){t.split(",").forEach(t=>{let s=this.getState(t);if(!s){let e=t.trim();this.addState(e),s=this.getState(e)}s?.classes?.push(e)})}setStyle(t,e){this.getState(t)?.styles?.push(e)}setTextStyle(t,e){this.getState(t)?.textStyles?.push(e)}bindFunctions(t){this.funs.forEach(e=>{e(t)})}getDirectionStatement(){return this.rootDoc.find(t=>"dir"===t.stmt)}getDirection(){return this.getDirectionStatement()?.value??"TB"}setDirection(t){let e=this.getDirectionStatement();e?e.value=t:this.rootDoc.unshift({stmt:"dir",value:t})}trimColon(t){return t.startsWith(":")?t.slice(1).trim():t.trim()}getData(){let t=(0,o.z)();for(let e of this.nodes)e.wrappingWidth??=t.state?.wrappingWidth,e.isGroup||(e.minWidth??=t.state?.minNodeWidth);return{nodes:this.nodes,edges:this.edges,other:{},config:t,direction:Q(this.getRootDocV2())}}getConfig(){return(0,o.z)().state}},tl=(0,c.p)(t=>{let{theme:e,bkgColorArray:s,borderColorArray:i}=t;if(!(0,n.d)(e,i))return"";let r=(0,n.o)(t.look),a=(0,n.f)(s),o="";for(let t=0;t<(0,n.L)(i);t++){let e=i[t],n=a?`fill: ${s[t%s.length]};`:"",l=`[data-look="${r}"][data-color-id="color-${t}"]`;o+=`

    /* The title strip: \`rect.outer\` spans the whole composite and \`rect.inner\` covers
       the body, so what stays visible of \`outer\` is the band behind the label. */
    ${l}.statediagram-cluster rect.outer {
      stroke: ${e};
      ${n}
    }

    ${l}.statediagram-cluster rect.inner {
      stroke: ${e};
    }

    /* Concurrency regions. Siblings of one composite share a slot, so a divided composite
       reads as one thing split into parts rather than as several composites. */
    ${l}.statediagram-cluster rect.divider {
      stroke: ${e};
      ${n}
    }

    /* handDrawn draws the same container as roughjs shapes rather than plain rects, so it
       needs its own rules. \`roundedWithTitle\` and \`divider\` name those groups \`outer\`,
       \`inner\` and \`divider\` to match the classic branch, which is what lets these
       discriminate -- a bare \`.statediagram-cluster path\` rule reached the body as well and
       tinted the whole composite, losing \`compositeBackground\` and diverging from what
       classic and neo do.

       roughjs emits two paths per shape and marks them: the filled shape carries
       \`stroke="none"\` and the sketched outline carries \`fill="none"\`. Splitting on that is
       what keeps \`fill\` off the outline -- a rough outline is open squiggles, not a closed
       region, so filling it produces smears -- and keeps \`stroke\` off the fill shape, which
       would otherwise gain an edge it was drawn without. */
    ${l}.statediagram-cluster .outer path[stroke='none'] {
      ${n}
    }

    ${l}.statediagram-cluster .outer path[fill='none'] {
      stroke: ${e};
    }

    /* No \`.inner\` rule on purpose. The body shape is left entirely alone under handDrawn,
       where a rect's \`inner\` counterpart cannot be recoloured safely: roughjs draws a
       hachure fill as *stroked* lines, so its fill paths carry \`fill="none"\` exactly like
       the outline and no selector separates them. An \`.inner\` stroke rule therefore
       repainted the hatching of every alt composite in the palette colour instead of
       leaving it on \`altBackground\`. The container still reads as palette-coloured: the
       \`outer\` shape spans the whole composite, so its outline already frames the body. */

    /* Regions split the same way, which is why \`divider\` fills solid rather than taking
       roughjs's default hachure -- see the note on that call. Hatched, both of its paths
       carried \`fill="none"\` and these two rules degenerated: the tint matched nothing and
       the border rule repainted the hatching. */
    ${l}.statediagram-cluster .divider path[stroke='none'] {
      ${n}
    }

    ${l}.statediagram-cluster .divider path[fill='none'] {
      stroke: ${e};
    }
    `}return o},"genColor"),tc={parser:u,get db(){return new to(2)},renderer:{getClasses:Z,draw:tt,getDir:Q},styles:(0,c.p)(t=>`
${tl(t)}
defs [id$="-barbEnd"] {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: ${t.strokeWidth||1};
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: ${t.strokeWidth||1};
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${t.edgeLabelBackground};
  p {
    background-color: ${t.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${t.edgeLabelBackground};
    fill: ${t.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth||1}px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: ${t.strokeWidth||1}px;
}
[id$="-barbEnd"] {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth||1}px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

[id$="-dependencyStart"], [id$="-dependencyEnd"] {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: ${t.strokeWidth||1};
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}

[data-look="neo"].statediagram-cluster rect {
  fill: ${t.mainBkg};
  stroke: ${t.useGradient?"url("+t.svgId+"-gradient)":t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth??1};
}
[data-look="neo"].statediagram-cluster rect.outer {
  rx: ${t.radius}px;
  ry: ${t.radius}px;
  filter: ${t.dropShadow?t.dropShadow.replace("url(#drop-shadow)",`url(${t.svgId}-drop-shadow)`):"none"}
}
`,"getStyles"),init:(0,c.p)(t=>{t.state||(t.state={}),t.state.arrowMarkerAbsolute=t.arrowMarkerAbsolute},"init")};t.s(["diagram",0,tc])}]);