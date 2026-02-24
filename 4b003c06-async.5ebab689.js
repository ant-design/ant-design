(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["4b003c06"],{"4b003c06":function(t,e,i){"use strict";i.d(e,"__esModule",{value:!0}),i.d(e,"diagram",{enumerable:!0,get:function(){return tP;}});var n,a,s,r=i("777fffbe"),l=i("8d13cbfb"),o=i("4a9940fd"),c=i("b04a8d7d"),d=i("34cf898b"),u=r._(i("072ab8a9")),h=r._(i("b53b6022")),m=r._(i("738f1298")),f=r._(i("b84a8507")),y=r._(i("c4835967")),k=i("f604571d"),_=function(){var t=(0,c.__name)(function(t,e,i,n){for(i=i||{},n=t.length;n--;i[t[n]]=e);return i;},"o"),e=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],i=[1,26],n=[1,27],a=[1,28],s=[1,29],r=[1,30],l=[1,31],o=[1,32],d=[1,33],u=[1,34],h=[1,9],m=[1,10],f=[1,11],y=[1,12],k=[1,13],_=[1,14],g=[1,15],p=[1,16],b=[1,19],T=[1,20],x=[1,21],v=[1,22],w=[1,23],C=[1,25],$=[1,35],S={trace:(0,c.__name)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:(0,c.__name)(function(t,e,i,n,a,s,r){var l=s.length-1;switch(a){case 1:return s[l-1];case 2:case 6:case 7:this.$=[];break;case 3:s[l-1].push(s[l]),this.$=s[l-1];break;case 4:case 5:this.$=s[l];break;case 8:n.setWeekday("monday");break;case 9:n.setWeekday("tuesday");break;case 10:n.setWeekday("wednesday");break;case 11:n.setWeekday("thursday");break;case 12:n.setWeekday("friday");break;case 13:n.setWeekday("saturday");break;case 14:n.setWeekday("sunday");break;case 15:n.setWeekend("friday");break;case 16:n.setWeekend("saturday");break;case 17:n.setDateFormat(s[l].substr(11)),this.$=s[l].substr(11);break;case 18:n.enableInclusiveEndDates(),this.$=s[l].substr(18);break;case 19:n.TopAxis(),this.$=s[l].substr(8);break;case 20:n.setAxisFormat(s[l].substr(11)),this.$=s[l].substr(11);break;case 21:n.setTickInterval(s[l].substr(13)),this.$=s[l].substr(13);break;case 22:n.setExcludes(s[l].substr(9)),this.$=s[l].substr(9);break;case 23:n.setIncludes(s[l].substr(9)),this.$=s[l].substr(9);break;case 24:n.setTodayMarker(s[l].substr(12)),this.$=s[l].substr(12);break;case 27:n.setDiagramTitle(s[l].substr(6)),this.$=s[l].substr(6);break;case 28:this.$=s[l].trim(),n.setAccTitle(this.$);break;case 29:case 30:this.$=s[l].trim(),n.setAccDescription(this.$);break;case 31:n.addSection(s[l].substr(8)),this.$=s[l].substr(8);break;case 33:n.addTask(s[l-1],s[l]),this.$="task";break;case 34:this.$=s[l-1],n.setClickEvent(s[l-1],s[l],null);break;case 35:this.$=s[l-2],n.setClickEvent(s[l-2],s[l-1],s[l]);break;case 36:this.$=s[l-2],n.setClickEvent(s[l-2],s[l-1],null),n.setLink(s[l-2],s[l]);break;case 37:this.$=s[l-3],n.setClickEvent(s[l-3],s[l-2],s[l-1]),n.setLink(s[l-3],s[l]);break;case 38:this.$=s[l-2],n.setClickEvent(s[l-2],s[l],null),n.setLink(s[l-2],s[l-1]);break;case 39:this.$=s[l-3],n.setClickEvent(s[l-3],s[l-1],s[l]),n.setLink(s[l-3],s[l-2]);break;case 40:this.$=s[l-1],n.setLink(s[l-1],s[l]);break;case 41:case 47:this.$=s[l-1]+" "+s[l];break;case 42:case 43:case 45:this.$=s[l-2]+" "+s[l-1]+" "+s[l];break;case 44:case 46:this.$=s[l-3]+" "+s[l-2]+" "+s[l-1]+" "+s[l];}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:i,13:n,14:a,15:s,16:r,17:l,18:o,19:18,20:d,21:u,22:h,23:m,24:f,25:y,26:k,27:_,28:g,29:p,30:b,31:T,33:x,35:v,36:w,37:24,38:C,40:$},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:36,11:17,12:i,13:n,14:a,15:s,16:r,17:l,18:o,19:18,20:d,21:u,22:h,23:m,24:f,25:y,26:k,27:_,28:g,29:p,30:b,31:T,33:x,35:v,36:w,37:24,38:C,40:$},t(e,[2,5]),t(e,[2,6]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),t(e,[2,26]),t(e,[2,27]),{32:[1,37]},{34:[1,38]},t(e,[2,30]),t(e,[2,31]),t(e,[2,32]),{39:[1,39]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),{41:[1,40],43:[1,41]},t(e,[2,4]),t(e,[2,28]),t(e,[2,29]),t(e,[2,33]),t(e,[2,34],{42:[1,42],43:[1,43]}),t(e,[2,40],{41:[1,44]}),t(e,[2,35],{43:[1,45]}),t(e,[2,36]),t(e,[2,38],{42:[1,46]}),t(e,[2,37]),t(e,[2,39])],defaultActions:{},parseError:(0,c.__name)(function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i;}},"parseError"),parse:(0,c.__name)(function(t){var e=this,i=[0],n=[],a=[null],s=[],r=this.table,l="",o=0,d=0,u=0,h=s.slice.call(arguments,1),m=Object.create(this.lexer),f={yy:{}};for(var y in this.yy)Object.prototype.hasOwnProperty.call(this.yy,y)&&(f.yy[y]=this.yy[y]);m.setInput(t,f.yy),f.yy.lexer=m,f.yy.parser=this,void 0===m.yylloc&&(m.yylloc={});var k=m.yylloc;s.push(k);var _=m.options&&m.options.ranges;function g(){var t;return"number"!=typeof(t=n.pop()||m.lex()||1)&&(t instanceof Array&&(t=(n=t).pop()),t=e.symbols_[t]||t),t;}"function"==typeof f.yy.parseError?this.parseError=f.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,c.__name)(function(t){i.length=i.length-2*t,a.length=a.length-t,s.length=s.length-t;},"popStack"),(0,c.__name)(g,"lex");for(var p,b,T,x,v,w,C,$,S,D={};;){if(T=i[i.length-1],this.defaultActions[T]?x=this.defaultActions[T]:(null==p&&(p=g()),x=r[T]&&r[T][p]),void 0===x||!x.length||!x[0]){var E="";for(w in S=[],r[T])this.terminals_[w]&&w>2&&S.push("'"+this.terminals_[w]+"'");E=m.showPosition?"Parse error on line "+(o+1)+":\n"+m.showPosition()+"\nExpecting "+S.join(", ")+", got '"+(this.terminals_[p]||p)+"'":"Parse error on line "+(o+1)+": Unexpected "+(1==p?"end of input":"'"+(this.terminals_[p]||p)+"'"),this.parseError(E,{text:m.match,token:this.terminals_[p]||p,line:m.yylineno,loc:k,expected:S});}if(x[0]instanceof Array&&x.length>1)throw Error("Parse Error: multiple actions possible at state: "+T+", token: "+p);switch(x[0]){case 1:i.push(p),a.push(m.yytext),s.push(m.yylloc),i.push(x[1]),p=null,b?(p=b,b=null):(d=m.yyleng,l=m.yytext,o=m.yylineno,k=m.yylloc,u>0&&u--);break;case 2:if(C=this.productions_[x[1]][1],D.$=a[a.length-C],D._$={first_line:s[s.length-(C||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(C||1)].first_column,last_column:s[s.length-1].last_column},_&&(D._$.range=[s[s.length-(C||1)].range[0],s[s.length-1].range[1]]),void 0!==(v=this.performAction.apply(D,[l,d,o,f.yy,x[1],a,s].concat(h))))return v;C&&(i=i.slice(0,-1*C*2),a=a.slice(0,-1*C),s=s.slice(0,-1*C)),i.push(this.productions_[x[1]][0]),a.push(D.$),s.push(D._$),$=r[i[i.length-2]][i[i.length-1]],i.push($);break;case 3:return!0;}}return!0;},"parse")},D={EOF:1,parseError:(0,c.__name)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t);},"parseError"),setInput:(0,c.__name)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this;},"setInput"),input:(0,c.__name)(function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t;},"input"),unput:(0,c.__name)(function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var n=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var a=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===n.length?this.yylloc.first_column:0)+n[n.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[a[0],a[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this;},"unput"),more:(0,c.__name)(function(){return this._more=!0,this;},"more"),reject:(0,c.__name)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno});},"reject"),less:(0,c.__name)(function(t){this.unput(this.match.slice(t));},"less"),pastInput:(0,c.__name)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"");},"pastInput"),upcomingInput:(0,c.__name)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"");},"upcomingInput"),showPosition:(0,c.__name)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^";},"showPosition"),test_match:(0,c.__name)(function(t,e){var i,n,a;if(this.options.backtrack_lexer&&(a={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(a.yylloc.range=this.yylloc.range.slice(0))),(n=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var s in a)this[s]=a[s];return!1;},"test_match"),next:(0,c.__name)(function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,i,n,a=this._currentRules(),s=0;s<a.length;s++)if((i=this._input.match(this.rules[a[s]]))&&(!e||i[0].length>e[0].length)){if(e=i,n=s,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,a[s])))return t;if(!this._backtrack)return!1;e=!1;continue;}if(!this.options.flex)break;}return e?!1!==(t=this.test_match(e,a[n]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno});},"next"),lex:(0,c.__name)(function(){return this.next()||this.lex();},"lex"),begin:(0,c.__name)(function(t){this.conditionStack.push(t);},"begin"),popState:(0,c.__name)(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0];},"popState"),_currentRules:(0,c.__name)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules;},"_currentRules"),topState:(0,c.__name)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL";},"topState"),pushState:(0,c.__name)(function(t){this.begin(t);},"pushState"),stateStackSize:(0,c.__name)(function(){return this.conditionStack.length;},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,c.__name)(function(t,e,i,n){switch(i){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:case 15:case 18:case 21:case 24:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:case 9:case 10:case 12:case 13:break;case 11:return 10;case 14:this.begin("href");break;case 16:return 43;case 17:this.begin("callbackname");break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 22:return 42;case 23:this.begin("click");break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID";}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};function E(){this.yy={};}return S.lexer=D,(0,c.__name)(E,"Parser"),E.prototype=S,S.Parser=E,new E;}();_.parser=_,u.default.extend(h.default),u.default.extend(m.default),u.default.extend(f.default);var g={friday:5,saturday:6},p="",b="",T=void 0,x="",v=[],w=[],C=new Map,$=[],S=[],D="",E="",A=["active","done","crit","milestone","vert"],I=[],F=!1,L=!1,M="sunday",O="saturday",P=0,B=(0,c.__name)(function(){$=[],S=[],D="",I=[],ty=0,n=void 0,a=void 0,tp=[],p="",b="",E="",T=void 0,x="",v=[],w=[],F=!1,L=!1,P=0,C=new Map,(0,o.clear)(),M="sunday",O="saturday";},"clear"),W=(0,c.__name)(function(t){b=t;},"setAxisFormat"),N=(0,c.__name)(function(){return b;},"getAxisFormat"),Y=(0,c.__name)(function(t){T=t;},"setTickInterval"),z=(0,c.__name)(function(){return T;},"getTickInterval"),j=(0,c.__name)(function(t){x=t;},"setTodayMarker"),H=(0,c.__name)(function(){return x;},"getTodayMarker"),R=(0,c.__name)(function(t){p=t;},"setDateFormat"),G=(0,c.__name)(function(){F=!0;},"enableInclusiveEndDates"),V=(0,c.__name)(function(){return F;},"endDatesAreInclusive"),q=(0,c.__name)(function(){L=!0;},"enableTopAxis"),U=(0,c.__name)(function(){return L;},"topAxisEnabled"),X=(0,c.__name)(function(t){E=t;},"setDisplayMode"),J=(0,c.__name)(function(){return E;},"getDisplayMode"),K=(0,c.__name)(function(){return p;},"getDateFormat"),Q=(0,c.__name)(function(t){v=t.toLowerCase().split(/[\s,]+/);},"setIncludes"),Z=(0,c.__name)(function(){return v;},"getIncludes"),tt=(0,c.__name)(function(t){w=t.toLowerCase().split(/[\s,]+/);},"setExcludes"),te=(0,c.__name)(function(){return w;},"getExcludes"),ti=(0,c.__name)(function(){return C;},"getLinks"),tn=(0,c.__name)(function(t){D=t,$.push(t);},"addSection"),ta=(0,c.__name)(function(){return $;},"getSections"),ts=(0,c.__name)(function(){let t=tw(),e=0;for(;!t&&e<10;)t=tw(),e++;return S=tp;},"getTasks"),tr=(0,c.__name)(function(t,e,i,n){let a=t.format(e.trim()),s=t.format("YYYY-MM-DD");return!(n.includes(a)||n.includes(s))&&(!!(i.includes("weekends")&&(t.isoWeekday()===g[O]||t.isoWeekday()===g[O]+1)||i.includes(t.format("dddd").toLowerCase()))||i.includes(a)||i.includes(s));},"isInvalidDate"),tl=(0,c.__name)(function(t){M=t;},"setWeekday"),to=(0,c.__name)(function(){return M;},"getWeekday"),tc=(0,c.__name)(function(t){O=t;},"setWeekend"),td=(0,c.__name)(function(t,e,i,n){let a;if(!i.length||t.manualEndTime)return;let[s,r]=tu((t.startTime instanceof Date?(0,u.default)(t.startTime):(0,u.default)(t.startTime,e,!0)).add(1,"d"),t.endTime instanceof Date?(0,u.default)(t.endTime):(0,u.default)(t.endTime,e,!0),e,i,n);t.endTime=s.toDate(),t.renderEndTime=r;},"checkTaskDates"),tu=(0,c.__name)(function(t,e,i,n,a){let s=!1,r=null;for(;t<=e;)s||(r=e.toDate()),(s=tr(t,i,n,a))&&(e=e.add(1,"d")),t=t.add(1,"d");return[e,r];},"fixTaskDates"),th=(0,c.__name)(function(t,e,i){if(i=i.trim(),(0,c.__name)(t=>{let e=t.trim();return"x"===e||"X"===e;},"isTimestampFormat")(e)&&/^\d+$/.test(i))return new Date(Number(i));let n=/^after\s+(?<ids>[\d\w- ]+)/.exec(i);if(null!==n){let t=null;for(let e of n.groups.ids.split(" ")){let i=tx(e);void 0!==i&&(!t||i.endTime>t.endTime)&&(t=i);}if(t)return t.endTime;let e=new Date;return e.setHours(0,0,0,0),e;}let a=(0,u.default)(i,e.trim(),!0);if(a.isValid())return a.toDate();{c.log.debug("Invalid date:"+i),c.log.debug("With date format:"+e.trim());let t=new Date(i);if(void 0===t||isNaN(t.getTime())||-1e4>t.getFullYear()||t.getFullYear()>1e4)throw Error("Invalid date:"+i);return t;}},"getStartDate"),tm=(0,c.__name)(function(t){let e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return null!==e?[Number.parseFloat(e[1]),e[2]]:[NaN,"ms"];},"parseDuration"),tf=(0,c.__name)(function(t,e,i,n=!1){i=i.trim();let a=/^until\s+(?<ids>[\d\w- ]+)/.exec(i);if(null!==a){let t=null;for(let e of a.groups.ids.split(" ")){let i=tx(e);void 0!==i&&(!t||i.startTime<t.startTime)&&(t=i);}if(t)return t.startTime;let e=new Date;return e.setHours(0,0,0,0),e;}let s=(0,u.default)(i,e.trim(),!0);if(s.isValid())return n&&(s=s.add(1,"d")),s.toDate();let r=(0,u.default)(t),[l,o]=tm(i);if(!Number.isNaN(l)){let t=r.add(l,o);t.isValid()&&(r=t);}return r.toDate();},"getEndDate"),ty=0,tk=(0,c.__name)(function(t){return void 0===t?"task"+(ty+=1):t;},"parseId"),t_=(0,c.__name)(function(t,e){let i=(":"===e.substr(0,1)?e.substr(1,e.length):e).split(","),n={};tF(i,n,A);for(let t=0;t<i.length;t++)i[t]=i[t].trim();let a="";switch(i.length){case 1:n.id=tk(),n.startTime=t.endTime,a=i[0];break;case 2:n.id=tk(),n.startTime=th(void 0,p,i[0]),a=i[1];break;case 3:n.id=tk(i[0]),n.startTime=th(void 0,p,i[1]),a=i[2];}return a&&(n.endTime=tf(n.startTime,p,a,F),n.manualEndTime=(0,u.default)(a,"YYYY-MM-DD",!0).isValid(),td(n,p,w,v)),n;},"compileData"),tg=(0,c.__name)(function(t,e){let i=(":"===e.substr(0,1)?e.substr(1,e.length):e).split(","),n={};tF(i,n,A);for(let t=0;t<i.length;t++)i[t]=i[t].trim();switch(i.length){case 1:n.id=tk(),n.startTime={type:"prevTaskEnd",id:t},n.endTime={data:i[0]};break;case 2:n.id=tk(),n.startTime={type:"getStartDate",startData:i[0]},n.endTime={data:i[1]};break;case 3:n.id=tk(i[0]),n.startTime={type:"getStartDate",startData:i[1]},n.endTime={data:i[2]};}return n;},"parseData"),tp=[],tb={},tT=(0,c.__name)(function(t,e){let i={section:D,type:D,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},n=tg(a,e);i.raw.startTime=n.startTime,i.raw.endTime=n.endTime,i.id=n.id,i.prevTaskId=a,i.active=n.active,i.done=n.done,i.crit=n.crit,i.milestone=n.milestone,i.vert=n.vert,i.order=P,P++;let s=tp.push(i);a=i.id,tb[i.id]=s-1;},"addTask"),tx=(0,c.__name)(function(t){return tp[tb[t]];},"findTaskById"),tv=(0,c.__name)(function(t,e){let i={section:D,type:D,description:t,task:t,classes:[]},a=t_(n,e);i.startTime=a.startTime,i.endTime=a.endTime,i.id=a.id,i.active=a.active,i.done=a.done,i.crit=a.crit,i.milestone=a.milestone,i.vert=a.vert,n=i,S.push(i);},"addTaskOrg"),tw=(0,c.__name)(function(){let t=(0,c.__name)(function(t){let e=tp[t],i="";switch(tp[t].raw.startTime.type){case"prevTaskEnd":{let t=tx(e.prevTaskId);e.startTime=t.endTime;break;}case"getStartDate":(i=th(void 0,p,tp[t].raw.startTime.startData))&&(tp[t].startTime=i);}return tp[t].startTime&&(tp[t].endTime=tf(tp[t].startTime,p,tp[t].raw.endTime.data,F),tp[t].endTime&&(tp[t].processed=!0,tp[t].manualEndTime=(0,u.default)(tp[t].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),td(tp[t],p,w,v))),tp[t].processed;},"compileTask"),e=!0;for(let[i,n]of tp.entries())t(i),e=e&&n.processed;return e;},"compileTasks"),tC=(0,c.__name)(function(t,e){let i=e;"loose"!==(0,o.getConfig2)().securityLevel&&(i=(0,d.sanitizeUrl)(e)),t.split(",").forEach(function(t){void 0!==tx(t)&&(tD(t,()=>{window.open(i,"_self");}),C.set(t,i));}),t$(t,"clickable");},"setLink"),t$=(0,c.__name)(function(t,e){t.split(",").forEach(function(t){let i=tx(t);void 0!==i&&i.classes.push(e);});},"setClass"),tS=(0,c.__name)(function(t,e,i){if("loose"!==(0,o.getConfig2)().securityLevel||void 0===e)return;let n=[];if("string"==typeof i){n=i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let t=0;t<n.length;t++){let e=n[t].trim();e.startsWith('"')&&e.endsWith('"')&&(e=e.substr(1,e.length-2)),n[t]=e;}}0===n.length&&n.push(t),void 0!==tx(t)&&tD(t,()=>{l.utils_default.runFunc(e,...n);});},"setClickFun"),tD=(0,c.__name)(function(t,e){I.push(function(){let i=document.querySelector(`[id="${t}"]`);null!==i&&i.addEventListener("click",function(){e();});},function(){let i=document.querySelector(`[id="${t}-text"]`);null!==i&&i.addEventListener("click",function(){e();});});},"pushFun"),tE=(0,c.__name)(function(t,e,i){t.split(",").forEach(function(t){tS(t,e,i);}),t$(t,"clickable");},"setClickEvent"),tA=(0,c.__name)(function(t){I.forEach(function(e){e(t);});},"bindFunctions"),tI={getConfig:(0,c.__name)(()=>(0,o.getConfig2)().gantt,"getConfig"),clear:B,setDateFormat:R,getDateFormat:K,enableInclusiveEndDates:G,endDatesAreInclusive:V,enableTopAxis:q,topAxisEnabled:U,setAxisFormat:W,getAxisFormat:N,setTickInterval:Y,getTickInterval:z,setTodayMarker:j,getTodayMarker:H,setAccTitle:o.setAccTitle,getAccTitle:o.getAccTitle,setDiagramTitle:o.setDiagramTitle,getDiagramTitle:o.getDiagramTitle,setDisplayMode:X,getDisplayMode:J,setAccDescription:o.setAccDescription,getAccDescription:o.getAccDescription,addSection:tn,getSections:ta,getTasks:ts,addTask:tT,findTaskById:tx,addTaskOrg:tv,setIncludes:Q,getIncludes:Z,setExcludes:tt,getExcludes:te,setClickEvent:tE,setLink:tC,getLinks:ti,bindFunctions:tA,parseDuration:tm,isInvalidDate:tr,setWeekday:tl,getWeekday:to,setWeekend:tc};function tF(t,e,i){let n=!0;for(;n;)n=!1,i.forEach(function(i){let a=RegExp("^\\s*"+i+"\\s*$");t[0].match(a)&&(e[i]=!0,t.shift(1),n=!0);});}(0,c.__name)(tF,"getTaskTags"),u.default.extend(y.default);var tL=(0,c.__name)(function(){c.log.debug("Something is calling, setConf, remove the call");},"setConf"),tM={monday:k.timeMonday,tuesday:k.timeTuesday,wednesday:k.timeWednesday,thursday:k.timeThursday,friday:k.timeFriday,saturday:k.timeSaturday,sunday:k.timeSunday},tO=(0,c.__name)((t,e)=>{let i=[...t].map(()=>-1/0),n=[...t].sort((t,e)=>t.startTime-e.startTime||t.order-e.order),a=0;for(let t of n)for(let n=0;n<i.length;n++)if(t.startTime>=i[n]){i[n]=t.endTime,t.order=n+e,n>a&&(a=n);break;}return a;},"getMaxIntersections"),tP={parser:_,db:tI,renderer:{setConf:tL,draw:(0,c.__name)(function(t,e,i,n){let a;let r=(0,o.getConfig2)().gantt,l=(0,o.getConfig2)().securityLevel;"sandbox"===l&&(a=(0,k.select)("#i"+e));let d="sandbox"===l?(0,k.select)(a.nodes()[0].contentDocument.body):(0,k.select)("body"),h="sandbox"===l?a.nodes()[0].contentDocument:document,m=h.getElementById(e);void 0===(s=m.parentElement.offsetWidth)&&(s=1200),void 0!==r.useWidth&&(s=r.useWidth);let f=n.db.getTasks(),y=[];for(let t of f)y.push(t.type);y=E(y);let _={},g=2*r.topPadding;if("compact"===n.db.getDisplayMode()||"compact"===r.displayMode){let t={};for(let e of f)void 0===t[e.section]?t[e.section]=[e]:t[e.section].push(e);let e=0;for(let i of Object.keys(t)){let n=tO(t[i],e)+1;e+=n,g+=n*(r.barHeight+r.barGap),_[i]=n;}}else for(let t of(g+=f.length*(r.barHeight+r.barGap),y))_[t]=f.filter(e=>e.type===t).length;m.setAttribute("viewBox","0 0 "+s+" "+g);let p=d.select(`[id="${e}"]`),b=(0,k.scaleTime)().domain([(0,k.min)(f,function(t){return t.startTime;}),(0,k.max)(f,function(t){return t.endTime;})]).rangeRound([0,s-r.leftPadding-r.rightPadding]);function T(t,e){let i=t.startTime,n=e.startTime,a=0;return i>n?a=1:i<n&&(a=-1),a;}function x(t,e,i){let a=r.barHeight,s=a+r.barGap,l=r.topPadding,o=r.leftPadding,c=(0,k.scaleLinear)().domain([0,y.length]).range(["#00B9FA","#F95002"]).interpolate(k.interpolateHcl);w(s,l,o,e,i,t,n.db.getExcludes(),n.db.getIncludes()),$(o,l,e,i),v(t,s,l,o,a,c,e,i),S(s,l,o,a,c),D(o,l,e,i);}function v(t,i,a,s,l,c,d){t.sort((t,e)=>t.vert===e.vert?0:t.vert?1:-1);let u=[...new Set(t.map(t=>t.order))].map(e=>t.find(t=>t.order===e));p.append("g").selectAll("rect").data(u).enter().append("rect").attr("x",0).attr("y",function(t,e){return t.order*i+a-2;}).attr("width",function(){return d-r.rightPadding/2;}).attr("height",i).attr("class",function(t){for(let[e,i]of y.entries())if(t.type===i)return"section section"+e%r.numberSectionStyles;return"section section0";}).enter();let h=p.append("g").selectAll("rect").data(t).enter(),m=n.db.getLinks();if(h.append("rect").attr("id",function(t){return t.id;}).attr("rx",3).attr("ry",3).attr("x",function(t){return t.milestone?b(t.startTime)+s+.5*(b(t.endTime)-b(t.startTime))-.5*l:b(t.startTime)+s;}).attr("y",function(t,e){return(e=t.order,t.vert)?r.gridLineStartPadding:e*i+a;}).attr("width",function(t){return t.milestone?l:t.vert?.08*l:b(t.renderEndTime||t.endTime)-b(t.startTime);}).attr("height",function(t){return t.vert?f.length*(r.barHeight+r.barGap)+2*r.barHeight:l;}).attr("transform-origin",function(t,e){return e=t.order,(b(t.startTime)+s+.5*(b(t.endTime)-b(t.startTime))).toString()+"px "+(e*i+a+.5*l).toString()+"px";}).attr("class",function(t){let e="";t.classes.length>0&&(e=t.classes.join(" "));let i=0;for(let[e,n]of y.entries())t.type===n&&(i=e%r.numberSectionStyles);let n="";return t.active?t.crit?n+=" activeCrit":n=" active":t.done?n=t.crit?" doneCrit":" done":t.crit&&(n+=" crit"),0===n.length&&(n=" task"),t.milestone&&(n=" milestone "+n),t.vert&&(n=" vert "+n),"task"+(n+=i+" "+e);}),h.append("text").attr("id",function(t){return t.id+"-text";}).text(function(t){return t.task;}).attr("font-size",r.fontSize).attr("x",function(t){let e=b(t.startTime),i=b(t.renderEndTime||t.endTime);if(t.milestone&&(e+=.5*(b(t.endTime)-b(t.startTime))-.5*l,i=e+l),t.vert)return b(t.startTime)+s;let n=this.getBBox().width;return n>i-e?i+n+1.5*r.leftPadding>d?e+s-5:i+s+5:(i-e)/2+e+s;}).attr("y",function(t,e){return t.vert?r.gridLineStartPadding+f.length*(r.barHeight+r.barGap)+60:t.order*i+r.barHeight/2+(r.fontSize/2-2)+a;}).attr("text-height",l).attr("class",function(t){let e=b(t.startTime),i=b(t.endTime);t.milestone&&(i=e+l);let n=this.getBBox().width,a="";t.classes.length>0&&(a=t.classes.join(" "));let s=0;for(let[e,i]of y.entries())t.type===i&&(s=e%r.numberSectionStyles);let o="";return(t.active&&(o=t.crit?"activeCritText"+s:"activeText"+s),t.done?o=t.crit?o+" doneCritText"+s:o+" doneText"+s:t.crit&&(o=o+" critText"+s),t.milestone&&(o+=" milestoneText"),t.vert&&(o+=" vertText"),n>i-e)?i+n+1.5*r.leftPadding>d?a+" taskTextOutsideLeft taskTextOutside"+s+" "+o:a+" taskTextOutsideRight taskTextOutside"+s+" "+o+" width-"+n:a+" taskText taskText"+s+" "+o+" width-"+n;}),"sandbox"===(0,o.getConfig2)().securityLevel){let t=(0,k.select)("#i"+e).nodes()[0].contentDocument;h.filter(function(t){return m.has(t.id);}).each(function(e){var i=t.querySelector("#"+e.id),n=t.querySelector("#"+e.id+"-text");let a=i.parentNode;var s=t.createElement("a");s.setAttribute("xlink:href",m.get(e.id)),s.setAttribute("target","_top"),a.appendChild(s),s.appendChild(i),s.appendChild(n);});}}function w(t,e,i,a,s,l,o,d){let h,m;if(0===o.length&&0===d.length)return;for(let{startTime:t,endTime:e}of l)(void 0===h||t<h)&&(h=t),(void 0===m||e>m)&&(m=e);if(!h||!m)return;if((0,u.default)(m).diff((0,u.default)(h),"year")>5){c.log.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return;}let f=n.db.getDateFormat(),y=[],k=null,_=(0,u.default)(h);for(;_.valueOf()<=m;)n.db.isInvalidDate(_,f,o,d)?k?k.end=_:k={start:_,end:_}:k&&(y.push(k),k=null),_=_.add(1,"d");p.append("g").selectAll("rect").data(y).enter().append("rect").attr("id",t=>"exclude-"+t.start.format("YYYY-MM-DD")).attr("x",t=>b(t.start.startOf("day"))+i).attr("y",r.gridLineStartPadding).attr("width",t=>b(t.end.endOf("day"))-b(t.start.startOf("day"))).attr("height",s-e-r.gridLineStartPadding).attr("transform-origin",function(e,n){return(b(e.start)+i+.5*(b(e.end)-b(e.start))).toString()+"px "+(n*t+.5*s).toString()+"px";}).attr("class","exclude-range");}function C(t,e,i,n){if(i<=0||t>e)return 1/0;let a=u.default.duration({[n??"day"]:i}).asMilliseconds();return a<=0?1/0:Math.ceil((e-t)/a);}function $(t,e,i,a){let s;let l=n.db.getDateFormat();s=n.db.getAxisFormat()||("D"===l?"%d":r.axisFormat??"%Y-%m-%d");let o=(0,k.axisBottom)(b).tickSize(-a+e+r.gridLineStartPadding).tickFormat((0,k.timeFormat)(s)),d=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(n.db.getTickInterval()||r.tickInterval);if(null!==d){let t=parseInt(d[1],10);if(isNaN(t)||t<=0)c.log.warn(`Invalid tick interval value: "${d[1]}". Skipping custom tick interval.`);else{let e=d[2],i=n.db.getWeekday()||r.weekday,a=b.domain(),s=C(a[0],a[1],t,e);if(s>1e4)c.log.warn(`The tick interval "${t}${e}" would generate ${s} ticks, which exceeds the maximum allowed (10000). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(e){case"millisecond":o.ticks(k.timeMillisecond.every(t));break;case"second":o.ticks(k.timeSecond.every(t));break;case"minute":o.ticks(k.timeMinute.every(t));break;case"hour":o.ticks(k.timeHour.every(t));break;case"day":o.ticks(k.timeDay.every(t));break;case"week":o.ticks(tM[i].every(t));break;case"month":o.ticks(k.timeMonth.every(t));}}}if(p.append("g").attr("class","grid").attr("transform","translate("+t+", "+(a-50)+")").call(o).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),n.db.topAxisEnabled()||r.topAxis){let i=(0,k.axisTop)(b).tickSize(-a+e+r.gridLineStartPadding).tickFormat((0,k.timeFormat)(s));if(null!==d){let t=parseInt(d[1],10);if(isNaN(t)||t<=0)c.log.warn(`Invalid tick interval value: "${d[1]}". Skipping custom tick interval.`);else{let e=d[2],a=n.db.getWeekday()||r.weekday,s=b.domain();if(1e4>=C(s[0],s[1],t,e))switch(e){case"millisecond":i.ticks(k.timeMillisecond.every(t));break;case"second":i.ticks(k.timeSecond.every(t));break;case"minute":i.ticks(k.timeMinute.every(t));break;case"hour":i.ticks(k.timeHour.every(t));break;case"day":i.ticks(k.timeDay.every(t));break;case"week":i.ticks(tM[a].every(t));break;case"month":i.ticks(k.timeMonth.every(t));}}}p.append("g").attr("class","grid").attr("transform","translate("+t+", "+e+")").call(i).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10);}}function S(t,e){let i=0,n=Object.keys(_).map(t=>[t,_[t]]);p.append("g").selectAll("text").data(n).enter().append(function(t){let e=t[0].split(o.common_default.lineBreakRegex),i=-(e.length-1)/2,n=h.createElementNS("http://www.w3.org/2000/svg","text");for(let[t,a]of(n.setAttribute("dy",i+"em"),e.entries())){let e=h.createElementNS("http://www.w3.org/2000/svg","tspan");e.setAttribute("alignment-baseline","central"),e.setAttribute("x","10"),t>0&&e.setAttribute("dy","1em"),e.textContent=a,n.appendChild(e);}return n;}).attr("x",10).attr("y",function(a,s){if(!(s>0))return a[1]*t/2+e;for(let r=0;r<s;r++)return i+=n[s-1][1],a[1]*t/2+i*t+e;}).attr("font-size",r.sectionFontSize).attr("class",function(t){for(let[e,i]of y.entries())if(t[0]===i)return"sectionTitle sectionTitle"+e%r.numberSectionStyles;return"sectionTitle";});}function D(t,e,i,a){let s=n.db.getTodayMarker();if("off"===s)return;let l=p.append("g").attr("class","today"),o=new Date,c=l.append("line");c.attr("x1",b(o)+t).attr("x2",b(o)+t).attr("y1",r.titleTopMargin).attr("y2",a-r.titleTopMargin).attr("class","today"),""!==s&&c.attr("style",s.replace(/,/g,";"));}function E(t){let e={},i=[];for(let n=0,a=t.length;n<a;++n)Object.prototype.hasOwnProperty.call(e,t[n])||(e[t[n]]=!0,i.push(t[n]));return i;}(0,c.__name)(T,"taskCompare"),f.sort(T),x(f,s,g),(0,o.configureSvgSize)(p,g,s,r.useMaxWidth),p.append("text").text(n.db.getDiagramTitle()).attr("x",s/2).attr("y",r.titleTopMargin).attr("class","titleText"),(0,c.__name)(x,"makeGantt"),(0,c.__name)(v,"drawRects"),(0,c.__name)(w,"drawExcludeDays"),(0,c.__name)(C,"getEstimatedTickCount"),(0,c.__name)($,"makeGrid"),(0,c.__name)(S,"vertLabels"),(0,c.__name)(D,"drawToday"),(0,c.__name)(E,"checkUnique");},"draw")},styles:(0,c.__name)(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles")};}}]);