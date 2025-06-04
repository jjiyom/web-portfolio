var portfolio_list = [
    ["인덱스(순서번호)","구분","제목","고객","완료시기","도구","범위","링크","이미지 갯수"],
    ["1","Web Design","Interpark Tour","-","2024","Adobe Photoshop","Web Design, Artwork","","1"],
    ["2","Web Design","LUSH","-","2024","Adobe Photoshop","Web Design","","3"],
    ["3","Web Design","L'OCCITANE","-","2024","Adobe Photoshop","Web Design","","1"],
    ["4","Web Design","Purren","-","2024","Adobe Photoshop","Web Design","","1"],
    ["5","Web Design","New Balance Kids","-","2024","Adobe Photoshop","Web Design","","1"],
    ["6","Artwork","MIU MIU","-","2024","Adobe Photoshop","Logo Design","","1"],
    ["7","Artwork","Top Gun: Maverick","-","2024","Adobe Photoshop","Poster Design","","2"],
    ["8","Artwork","Inside Out 2","-","2024","Adobe Photoshop","Poster Design","","1"],
    ["9","Artwork","Rock Festival","-","2024","Adobe Photoshop","Card News","","4"],
    ["10","Artwork","Sangkwae-hwan","-","2024","Adobe Photoshop","Banner Design","","3"],
    ["11","Artwork","Red Dead Redemption 2","-","2024","Adobe Photoshop","Banner Design","","1"],
    ["12","Artwork","Starbucks","-","2024","Adobe Photoshop","Banner Design","","2"]
];


$(function(){
    var gallery_list = "";
    for(i=1; i<portfolio_list.length; i++){
        gallery_name = portfolio_list[i][2];
        gallery_cactegory = portfolio_list[i][1];
        gallery_num = portfolio_list[i][0];
        gallery_list += '<li class="cells box open_popup" data-p-no="' + gallery_num + '"><a href="javascript:;"><img src="img/portfolio/img_' + gallery_num + '.jpg"><div class="text center"><h5>' + gallery_cactegory + '</h5><h4>' + gallery_name + '</h4></div><i class="fa-duotone fa-solid fa-spinner-third fa-spin"></i></a></li>';
    }
    $("#gallery_list").html(gallery_list);
    $(".open_popup").each(function(){
        $(this).click(function(){
            $(this).addClass("loading");
            var p_no = $(this).attr("data-p-no");
            var $p_con = $(".popup_con");
            $p_con.find(".category").html(portfolio_list[p_no][1]);
            $p_con.find(".title").html(portfolio_list[p_no][2]);
            $p_con.find(".client").html(portfolio_list[p_no][3]);
            $p_con.find(".completed").html(portfolio_list[p_no][4]);
            $p_con.find(".tools").html(portfolio_list[p_no][5]);
            $p_con.find(".scope").html(portfolio_list[p_no][6]);

            var p_image_list = "";
            for(i=1; i<=portfolio_list[p_no][8]; i++){
                p_image_list += '<img src="portfolio/gallery/'+p_no+'/'+i+'.jpg">';
            }
            $p_con.find(".image_con").html(p_image_list);
            setTimeout(function(){
                $("html").addClass("show_popup");
                $(".popup_con").scrollTop(0);
                $(".open_popup").removeClass("loading");
            }, 500);
        });
    });
    $(".popup_con, a.btn.btn_popup_close").click(function(e){
        if(!$(e.target).hasClass("cells") && $(e.target).parents(".cells").length < 1){
            /*
            !$(e.target).hasClass("cells")
            *e.target = 지금 누른 엘리먼트
            *지금 누른 엘리먼트의 클래스가 cells가 !아닐경우
            
            $(e.target).parents(".cells").length < 1
            *e.target = 지금 누른 엘리먼트
            *$(".a").text().length; < 글자 갯수 추출
            *$(".a").length; < 엘리먼트 갯수 추출
            *지금 누른 엘리먼트의 부모들 중 cells가 존재하지 않을 경우
            */
            $("html").removeClass("show_popup");
        }
    });
    $(document).keydown(function(e){
        if(e.keyCode == 27){//27 => ESC 키코드값
            $("html").removeClass("show_popup");
        }
    });
});