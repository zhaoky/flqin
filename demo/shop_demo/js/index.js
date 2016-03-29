$(function(){
	//搜索框
	$("#search").keyup(function(e){
		if(e.which==13)
		{
			alert("根本什么都没有你还搜搜搜。。。");
		}
		})
	//换肤	
	$("#color li").click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		$("#cssfile").attr("href","css/skin_css/"+this.id+".css");
		})
	//导航栏
	$("#nav li").mouseover(function(){
		$(this).find("div").show();
		}).mouseout(function(){
			$(this).find("div").hide();
			})
	//热门
	$(".hot").append("<img src='images/hot.gif' id='imghot'/>");
	//大屏广告
	var index=0;
	var length=$("#title a").length;
    var newhref = $("#ad a").eq(index).attr("href");
	function a(x){
		$("#ad a").attr("href",newhref).
            find("img").eq(x).stop(true,true).fadeIn().siblings().fadeOut();
		$("#title a").eq(x).addClass("selected").siblings().removeClass("selected");
	}
	$("#title a").mouseover(function(){
		index=$(this).index();
		a(index);
		}).eq(0).mouseover();
	$("#ad").mouseover(function(){
		clearInterval(show);
		}).mouseout(function(){
			show=setInterval(function(){
				a(index);
				index++
				if(index==length)index=0;
				},3000)
			}).mouseout();
	//公告栏
	var x=10;
	var y=20;
	$("#section_3 ul li a").mouseover(function(e){
		var a="<div class='post'>"+$(this).text()+"</div>";
		$(a).appendTo("body");
		$(".post").css({
			"left":(e.pageX+x)+"px",
			"top":(e.pageY+y)+"px"
			}).show("fast");
		}).mouseout(function(){
			$(".post").remove();
			}).mousemove(function(e){
				$(".post").css({
				"left":(e.pageX+x)+"px",
				"top":(e.pageY+y)+"px"
			})
	})
	//图片滚动
	$("#hd ul li").click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		$("#list ul").stop(true,false).animate({left:-$("#list").width()*$(this).index()},"slow");
		return false;
		})
	//放大镜效果
	$("#list img").mouseover(function(){
		$(this).closest("li").append("<div class='zoom'></div>");	
		});
		$(document).on("mouseout",".zoom",function(){
			$(this).remove();
			})
	//小图切换大图
	$("#menu img").click(function(){
		$(this).addClass("selected").parent().siblings().find("img").removeClass("selected");
		var n=$(this).attr("src").indexOf(".jpg");
		$("#img_small").attr("src",$(this).attr("src").substring(0,n)+"_small.jpg");
		})
	//颜色切换
	$("#detail_color img").click(function(){
		$(this).addClass("selected").parent().siblings().find("img").removeClass("selected");
		$("#col").text($(this).attr("alt"));
		var n=$(this).attr("src").lastIndexOf(".");
		var m=$(this).attr("src").lastIndexOf("/");
		var str=$(this).attr("src").substring(m+1,n);
		$("#menu li img").hide();
		$("#menu").find("."+str).show();
		$("#menu").find("."+str).eq(0).click();
		}).eq(0).click();
	//内容切换
	$("#content li").click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		$(".content_bd").eq($(this).index()).show().siblings(".content_bd").hide();
		}).eq(0).click();
	//尺寸选择
	$("#cicun li").click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		$("#ci").text($(this).text());
		})
	//总价计算
	var price=$("#ji").text();
	$("select").change(function(){
		$("#ji").text($(this).val()*price);
		})
	//星级评分
	$("#detail_pinfeng li").click(function(){
		alert("您给此商品打的是："+$(this).attr("title"));
		$("#detail_pinfeng").removeClass().addClass(this.id);
		})
	//点击查看大图
	$("#look").click(function(){
		var url=$("#menu li").find(".selected").attr("src").substring(0,$("#menu li").find(".selected").attr("src").lastIndexOf("."))+"_big.jpg";
		var a="<div id='ooo_o'></div><div id='ooo'><div id='ooo_1'><img id='ooo_img' src='"+url+"' alt='' /><div id='ooo_text'></div></div></div>";
		$("body").append(a);
		var width=$("body").width();
		var height=$("body").height();
		$("#ooo").css({
			"width":width,
			"height":height
			}).fadeIn();
		$("#ooo_o").css({
			"width":width,
			"height":height
			}).animate({opacity:"0.4"},400);
			
		})
	$(document).on("click","#ooo",function(){
		$(this).animate({opacity:"0"},1000,function(){
			$(this).remove();
			})
		$("#ooo_o").animate({opacity:"0"},1000,function(){
			$(this).remove();
			})
		})
	//购物车合计
	$("#shopping img").click(function(){
		var a="谢谢惠顾！\n您选择的颜色是："+$("#col").text()+"; \n您选择的尺寸是："+$("#ci").text()+"码; \n您选择的数量是："+$("select").val()+"个; \n总价是："+$("#ji").text()+"元。";
		if($("#ci").text()=="未选择"){alert("您的尺寸，哦不。。是您衣服的尺寸还没选择。。")}
			else if(typeof($("#detail_pinfeng").attr("class"))=="undefined"){alert("您还没有给我们评分呢。。")}
			else{alert(a)}
		})
})