function addLoadEvent(func){
	var a=window.onload;
	if(typeof window.onload!="function"){
		window.onload=func;
		}else{
			window.onload=function(){
				a();
				func();
				}
			}
}
function insertAfter(newElement,old){
	var parent=old.parentNode;
	if(parent.lastChild==old){
		parent.appendChild(newElement);
		}else{
			parent.insertBefore(newElement,old.nextSibling);
			}
}
function addClass(element,newClass){
	if(!element.className){
		element.className=newClass;
		}else{
			var a=element.className;
			a+=" ";
			a+=newClass;
			element.className=a;
			}
}
function move(ID,x,y,time){
	var a=document.getElementById(ID);
	if(!a.style.top) a.style.top="0px";
	if(!a.style.left) a.style.left="0px";
	var ax=parseInt(a.style.left);
	var ay=parseInt(a.style.top);
	if(a.move) clearTimeout(a.move);
	if(ax<x) ax+=Math.ceil((x-ax)/10);
	if(ax>x) ax-=Math.ceil((ax-x)/10);
	if(ay<y) ay+=Math.ceil((y-ay)/10);
	if(ay>y) ay-=Math.ceil((ay-y)/10);
	a.style.left=ax+"px";
	a.style.top=ay+"px";
	a.move=setTimeout("move('"+ID+"',"+x+","+y+","+time+")",time);
	}
function a(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementsByTagName("nav")) return false;
	var nav=document.getElementsByTagName("nav")[0];
	var links=nav.getElementsByTagName("a");
	for(var i=0;i<links.length;i++)
		if(window.location.href.indexOf(links[i].getAttribute("href"))!="-1")
		addClass(links[i],"selected");
	}
function b(){
	if(!document.getElementById("index")) return false;
	var div=document.createElement("div");
	var img=document.createElement("img");
	var frame=document.createElement("img");
	div.setAttribute("id","container");
	img.setAttribute("src","images/ms.jpg");
	img.setAttribute("id","img_con");
	img.setAttribute("alt","");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("id","frame");
	frame.setAttribute("alt","");
	var index=document.getElementById("index");
	index.appendChild(div);
	div.appendChild(img);
	div.appendChild(frame);
	var links=document.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function(){
			if(this.getAttribute("href").indexOf("index.html")!=-1)
			move("img_con",0,0,5);
			if(this.getAttribute("href").indexOf("jiqiao.html")!=-1)
			move("img_con",-150,0,5);
			if(this.getAttribute("href").indexOf("jineng.html")!=-1)
			move("img_con",-300,0,5);
			if(this.getAttribute("href").indexOf("paihang.html")!=-1)
			move("img_con",-450,0,5);
			if(this.getAttribute("href").indexOf("lianxi.html")!=-1)
			move("img_con",-600,0,5);
		}
	}
}
function c(){ //还有一种解决方案
	if(!document.getElementById("jiqiao")) return false;
	var jq=document.getElementById("jiqiao");
	var links=jq.getElementsByTagName("a");
	var hide=document.getElementsByClassName("hide");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			var id=this.href.split("#")[1];
			for(var j=0;j<hide.length;j++)
			if(id==hide[j].getAttribute("id")){
				hide[j].style.display="block";
				}else{
					hide[j].style.display="none";
					}
		}
	}
}
function d(){
	if(!document.getElementById) return false;
	if(!document.getElementById("jineng")) return false;
	var p=document.createElement("p");
	var p_txt=document.createTextNode("选择技能小图片");
	var img=document.createElement("img");
	p.setAttribute("id","des");
	p.appendChild(p_txt);
	img.setAttribute("src","images/placeholder.gif");
	img.setAttribute("alt","");
	img.setAttribute("id","img_jn");
	var jn=document.getElementById("jineng");
	insertAfter(p,jn);
	insertAfter(img,p);
	var links=jn.getElementsByTagName("a");
	//var img_jn_small=links.getElementsByTagName("img");  //这句话是错的！
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			var title=this.title;
			var href=this.href;
			if(p.firstChild.nodeType=3)
			p.firstChild.nodeValue=title;
			img.setAttribute("src",href);
			return false;
		}
	}
}
function e(){
	if(!document.getElementsByTagName("tr")) return false;
	var tr=document.getElementsByTagName("tr");
	for(var i=1;i<tr.length;i++){
	if(i%2!=0) {addClass(tr[i],"even");}else{addClass(tr[i],"odd");}
	tr[i].oldClassName=tr[i].className;  //创建属性
	tr[i].onmouseover=function(){
		addClass(this,"hover");
		};
	tr[i].onmouseout=function(){
		this.className=this.oldClassName;
		}
	}
}
function f(){
	var h=document.createElement("h3");
	var h_txt=document.createTextNode("名词解释");
	h.appendChild(h_txt);
	var ph=document.getElementById("paihang");
	ph.appendChild(h);
	var span=ph.getElementsByTagName("span");
	var dl=document.createElement("dl");
	ph.appendChild(dl);
	for(var i=0;i<span.length;i++){
		var title=span[i].getAttribute("title");
		var text=span[i].lastChild.nodeValue;
		var dt=document.createElement("dt");
		var dd=document.createElement("dd");
		var dt_txt=document.createTextNode(text);
		var dd_txt=document.createTextNode(title);
		dt.appendChild(dt_txt);
		dd.appendChild(dd_txt);
		dl.appendChild(dt);
		dl.appendChild(dd);
	}
}
addLoadEvent(a);
addLoadEvent(b);
addLoadEvent(c);
addLoadEvent(d);
addLoadEvent(e);
addLoadEvent(f);