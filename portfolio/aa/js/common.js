//화면전환시 애니메이션을 위한 각 섹션별 hide클래스 제거
function remove_hide(i){
    $(".fullsection.full"+i).removeClass("hide");
}
var change_speed = 750;
var release_times, times;
// 사이드 퀵버튼 클릭 이동
function moving_sections(gnbindex,length){ //화면전환 중에 다른 화면 전환 불가
    $(".quick").animate({marginTop: $(".quick").height()/2 - ($(".quick li").outerHeight(true) * gnbindex)}, change_speed);
    $(".quick li").removeClass("on").eq(gnbindex).addClass("on");
    $("ul.nav li").removeClass("on").eq(gnbindex).addClass("on");

    $("#fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");
    $(".pagination b").text(gnbindex+1);
    remove_hide(gnbindex+1);
    if(gnbindex == 2 || gnbindex == 5){
        $("body").addClass("dark");
        $("#header").find(".logo_img").attr("src", 'img/logo/bi_logo_b.svg');
    }else{
        $("body").removeClass("dark");
        $("#header").find(".logo_img").attr("src", 'img/logo/bi_logo_w.svg');
    }

}
function quickClick(){
    $(".quick li, ul.nav li").click(function(){
         //quick li, ul.nav li 클릭되면
        var gnbindex = $(this).index();
        var length = 0;
        for(var i=1; i<(gnbindex+1); i++){
            length+=$(".full"+i).height();
        }
        //if($("body").find("#fullpage:animated").length >= 1) return false;
        moving_sections(gnbindex,length);
        $(".quick li").css({"visibility": 'visible'})
        return false;
    }).mousedown(function(){
		$(".quick_inner").css({ opacity: 0}); //quick_inner 안보임
	}).mouseup(function(){
		setTimeout(function(){
			$(".quick_inner").css({ opacity: 1}); //quick_inner 보임
		}, change_speed);
    });
}
function fullset(){
    var pageindex = $("#fullpage > .fullsection").length; //fullpage 안에 섹션이(.fullsection) 몇개인지 확인하기
    $(".pagination span").text(pageindex);
    for(var i=1;i<=pageindex;i++){
        $("#fullpage > .quick > ul").append("<li></li>"); //왼쪽 도트 생성
    }
    $(".fullsection").each(function(n){//좌우 수평 도트생성
        var subcon_index = $(this).find(".full_sub").length; //페이지 갯수 찾기
        for(var i=0; i<subcon_index; i++){
            $(".fullsection").eq(n).find(".quick_inner").find("ul").append("<li></li>");//페이지 .full_sub 갯수만큼 .fullsection 안에 .quick_inner에 li추가
        }
	});

    $(".quick").css({marginTop: $(".quick").height()/2});
    $("#fullpage .quick ul li:first-child, #header ul.nav li:first-child").addClass("on"); //일단 화면이 로드 되었을때 퀵버튼에 1번째, 네비에 1번째에 불이 들어오게
    
    function moving_page(){
        clearTimeout(times);
        times = setTimeout(function(){
            $("body").removeClass("locked");
            $(".quick_inner").css({ opacity: 1}); //quick_inner를 보이게 함
        }, change_speed);
        $(".quick li").css({"visibility": 'visible'});
		$(".quick_inner").css({ opacity: 0}); //quick_inner를 안보이게 함
        //event.preventDefault();
        if(!$("body").hasClass("locked")){
            $("body").addClass("locked");
            var page = $(".quick ul li.on");
            //console.log(page.index()+1);  // 현재 on 되어있는 페이지 번호
            if($("body").find("#fullpage:animated").length >= 1){
                return false;
            }
            
            if (event.wheelDelta > 0 || event.detail < 0) {//마우스 휠을 위로
                var before = page.index();
                var pagelength=0;
                for(var i=1; i<(before); i++){
                    pagelength += $(".full"+i).height();
                }
                if(page.index() > 0){ //첫번째 페이지가 아닐때 (index는 0부터 시작임)
                    page = page.index()-1;
                    moving_sections(page, pagelength);
                }else{
                    alert("첫번째 섹션 입니다.");
                }	
            }else{ // 마우스 휠을 아래로	
                var nextPage = parseInt(page.index()+1); //다음페이지번호
                var lastPageNum = parseInt($(".quick ul li").length); //마지막 페이지번호
                //현재페이지번호 <= (마지막 페이지 번호 - 1)
                if(nextPage < lastPageNum){ //마지막 페이지가 아닐때만 animate !
                    var pagelength=0;
                    for(var i = 1; i<(nextPage+1); i++){ 
                        //총 페이지 길이 구하기
                        //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
                        pagelength += $(".full"+i).height();
                    }
                    moving_sections(nextPage, pagelength);
                }else{ // 현재 마지막 페이지 일때는
                    alert("마지막 섹션 입니다!");
                }
            }
        }else{
            return false;
        }
        clearTimeout(release_times);
        release_times = setTimeout(function(){
            $("body").removeClass("locked");
        }, change_speed);
    }
    
    window.addEventListener("mousewheel", moving_page, {passive: false});
    window.addEventListener("DOMMouseScroll", moving_page, {passive: false});    
    
    $(window).resize(function(){ 
        //페이지가 100%이기때문에 브라우저가 resize 될때마다 스크롤 위치가 그대로 남아있는것을 방지하기 위해
        var resizeindex = $(".quick ul li.on").index()+1;
        var pagelength = 0;
        for(var i = 1; i<resizeindex; i++){ 
            //총 페이지 길이 구하기
            //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
            pagelength += $(".full"+i).height();
        }
        $("#fullpage").stop().animate({"top": -pagelength + "px"},0);
        full_sub_resize();
    });
}

function full_sub_inner(){
	$(".quick_inner").css({"margin-left": - $(".quick_inner li").outerWidth()});//.quick_inner 인 ul이 통으로 li의 너비만큼 이동.
	$("#fullpage .fullsection .quick_inner li:first-child").addClass("on");
	$(".quick_inner li").click(function(){ // 원 한개 클릭 되면
		var subindex = $(this).index() + 1; // subindex 변수에 현재 인덱스번호 + 1을 넣는다
		var length = 0; // 길이 함수 생성
		for(var i=1; i<subindex; i++){ // 현재 인덱스 번호 갯수 만큼 반복
			length += $(".fullsection").width(); // 전체 섹션의 가로길이
		}
		var quick_w = $(this).outerWidth(); // quick_w 함수에 원 하나의 width를 넣음
		for(var i=2; i<subindex+1; i++){ // 인덱스의 번호만큼 반복
			quick_w += $(this).outerWidth(true); // 아까 그 원하나 width 넣은거에다가 원 하나 추가될때마다 추가함
		}
		$(this).parents(".fullsection").find(".full_sub_con").stop().animate({"left": -length + "px"}, change_speed).attr("data-index", subindex); // 원 하나 기준으로 부모에서 .fullsection을 찾고 다시 자식에서 .full_sub_con을 또 찾고 그친구에게 전체 섹션의 가로 길이만큼 애니메이션을 추가.(750ms 동안) data-index의 속성값을 subindex의 값으로 교체
		$(this).parents(".quick_inner").stop().animate({"margin-left": -quick_w + "px"}, change_speed); // 원 이동후 멈추고 초기화
		$(this).parents("ul").find("li").removeClass("on").eq(subindex-1).addClass("on"); // on 클래스 넣었다 뺐다 해주는 거
		var quickindex = $(this).parents(".fullsection").index(); // 세로에서 몇번째인지 quickindex에 넣음
		$(".quick li").css({"visibility": 'visible'}).eq(quickindex).css({"visibility": 'hidden'}); // quick li를 보이게 만들고 두개 겹친거에서 하나 안 보이게 해줌
		$(this).parents(".fullsection").find(".full_sub").eq(subindex-1).removeClass("hide"); // 현재 보이는 섹션에 hide 클래스를 지워줌
        
        var $parents_full = $(this).parents(".fullsection"); //풀페이지에서
        if(subindex == 1){ //첫 페이지일 때
            $parents_full.find(".btn_left").addClass("disable"); //왼쪽 버튼 disable 추가
            $parents_full.find(".btn_right").removeClass("disable"); //오른쪽 버튼 disable 제거
        }else if(subindex == $(this).parent("ul").find("li").length){ //막 페이지일 때
            $parents_full.find(".btn_left").removeClass("disable"); //왼쪽 버튼 disable 제거
            $parents_full.find(".btn_right").addClass("disable"); //오른쪽 버튼 disable 추가
            
        }else{ //이도저도 아닐 때
            $parents_full.find(".btn_left").removeClass("disable"); //왼쪽 버튼 disable 추가
            $parents_full.find(".btn_right").removeClass("disable"); //오른쪽 버튼 disable 추가
        }
        
	});
}

var prnts_w, prnts_h;
function full_sub_resize(){
    $(".full_sub").each(function(){
        prnts_w = $(this).parents(".fullsection").width();
        prnts_h = $(this).parents(".fullsection").height();
        $(this).css({width: prnts_w, height:prnts_h});
    });
    $(".full_sub_con").each(function(){
        $(this).width(prnts_w * $(this).find(".full_sub").length);
    });
}
function full_sub_sizing(){
    full_sub_resize();
    full_sub_inner();
    $(".btn_left, .btn_right").each(function(){
        if($(this).hasClass("btn_left")){
        $(this).addClass("disable");
		}
        $(this).click(function(){
            var sub_counter = parseInt($(this).parents(".fullsection").find(".full_sub_con").attr("data-index"));
            var move_w = prnts_w;
            if($(this).hasClass("btn_left")){
                if(sub_counter > 1){
                    sub_counter -=1;
					if(sub_counter == 1){
						$(this).addClass("disable");
					}
				}
				$(this).parent().find(".btn_right").removeClass("disable");
			}else{
				$(this).parent().find(".btn_left").removeClass("disable");
				if(sub_counter < $(this).parents(".fullsection").find(".full_sub").length){
					sub_counter +=1;
					if(sub_counter == $(this).parents(".fullsection").find(".full_sub").length){
						$(this).addClass("disable");
					}
				}
			}
            move_w = move_w * (sub_counter-1) * -1;
            $(this).parent(".fullsection").find(".full_sub_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter).find(".full_sub").eq(sub_counter-1).removeClass("hide");
            var quick_w = $(this).parent(".fullsection").find(".quick_inner li").outerWidth();
			for(var i=2; i<sub_counter+1; i++){
				quick_w += $(this).parent(".fullsection").find(".quick_inner li").eq(sub_counter - 1).outerWidth(true);
			}
			$(this).parent(".fullsection").find(".quick_inner").stop().animate({"margin-left": -quick_w + "px"}, change_speed);
			
			var quickindex = $(this).parents(".fullsection").index();
			$(".quick li").css({"visibility": 'visible'}).eq(quickindex).css({"visibility": 'hidden'});
			$(this).parent(".fullsection").find(".quick_inner ul li").removeClass("on").eq(sub_counter-1).addClass("on");
        });
    });  
}
$(function(){
    fullset();
    quickClick();
    full_sub_sizing();
});
$(window).load(function(){
    $("body").removeClass("locked");
});


