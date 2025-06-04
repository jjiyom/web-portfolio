history.scrollRestoration = "manual";
$(function(){
    var color_list = [
        ["008", "Dior 8", "2", "62", "42"],
        ["329", "tie &amp; door", "1", "44", "60"],
        ["100", "nude look", "3", "39", "56"],
        ["535", "cherie", "-1", "42", "50"],
        ["418", "beige oblique", "3", "37", "54"],
        ["526", "mallow rose", "-6", "50", "47"],
        ["636", "ultra dior	", "6", "70", "57"],
        ["536", "lucky", "-5", "79", "51"],
        ["576", "rose bagatelle", "-3", "58", "55"],
        ["661", "dioriviera", "-3", "80", "60"],
        ["718", "dior cannage", "2", "33", "46"],
        ["727", "dior tulle", "1", "39", "45"], 
        ["720", "icone", "1", "47", "37"],
        ["841", "caro", "0", "62", "42"],
        ["976", "be dior", "-6", "71", "45"],
        ["922", "wildior", "0", "43", "32"],
        ["558", "bois de rose", "-1", "39", "52"],
        ["667", "diormania", "-6", "48", "48"],
        ["740", "saddle", "5", "60", "42"],
        ["628", "pink bow", "-5", "30", "50"],
        ["524", "diorette", "8", "51", "51"],
        ["744", "diorama", "7", "76", "55"],
        ["652", "rose dior", "4", "51", "58"],
        ["730", "star", "11", "55", "46"],
        ["744", "diorama", "7", "76", "55"],
        ["412", "dior vibe", "10", "43", "58"],
        ["463", "dior ribbon", "-1", "51", "58"],
        ["822", "scarlet silk", "7", "65", "47"],
        ["566", "peony pink", "-6", "44", "57"],
        ["845", "vinyl red", "13", "64", "46"],
        ["758", "lady red", "9", "75", "45"],
        ["812", "tartan", "17", "56", "46"],
        ["481", "desir", "-12", "42", "45"],
        ["362", " rose bonheur", "-3", "52", "64"],
        ["546", "dolce vita", "-1", "57", "55"],
        ["616", "nude mitzah", "8", "32", "45"]
    ];
    var color_list_html = "";
    for(i=0; i < color_list.length; i++){
        color_list_html +='<li class="cells box ratio_1x1" data-no="'+color_list[i][0]+'" data-name="'+color_list[i][1]+'" data-color="hsl('+color_list[i][2]+','+color_list[i][3]+'%,'+color_list[i][4]+'%)" style="background:hsl('+color_list[i][2]+','+color_list[i][3]+'%,'+color_list[i][4]+'%)"><a href="javascript:;"></a></li>';
    }
    $(".change_color").html(color_list_html);
    
    $(".change_case > li.cells").each(function(){
        $(this).click(function(){
            $(".preview > .case").attr("style","background: url(img/img_case_0"+($(this).index()+1)+".webp) no-repeat 50% 50% / contain;")
        });
    });
    $(".change_color > li.cells").each(function(){
        var $this = $(this);
        $this.css({background: $this.attr("data-color")}).click(function(){
            $(".preview > div.color_cover").css({filter:"hue-rotate("+(color_list[$this.index()][2])+"deg) saturate("+(Number(color_list[$this.index()][3]) + 0)+"%) brightness("+(Number(color_list[$this.index()][4]) + 75)+"%)"});
            $(".preview > .title_con h5").html(color_list[$this.index()][1]);
            $(".preview > .title_con h6").html(color_list[$this.index()][0]);
        });
    });
});



$(function(){
    $(".viewer").each(function(){
        $(this).find(".img_list").each(function(){
            $(this).click(function(){
                var $this = $(this);
                var img_src = $this.find("img").attr("src");
                    img_src = img_src.replace(/s_/g,"l_");
                var country = $this.find("h5").html();
                var address = $this.find("h5").text();
                var fade_time = 350;
                $this.parents(".viewer").find(".large_viewer").stop().fadeOut(fade_time, function(){
                    $this.parents(".viewer").find(".large_viewer").attr("src",img_src).stop().fadeIn(fade_time);
                    $(".text_country").text(country);
                    $(".text_address").text(address);
                });
                $this.parents(".viewer").find(".img_list").removeClass("selected");
                $this.addClass("selected");
            });
        });
    });
});
/*
    $(document).ready(function() {
        // 향수 이미지 클릭 시
        $(".perfume").click(() {
            var newSrc = $(th("src");
            $(".perfume").attrnewSrc);  /이미지 변경
        });
        // 리본 이미지 클릭 시
        $(".bow").click(function() {
            var newSrc = $(th("src");
            $(".bow").attrnewSrc);  /이미지 변경
        });
        // 라벨 이미지 클릭 시
        $(".label").click(function() {
            var newSrc = $(th("src");
            $(".label").attrnewSrc);  /이미지 변경
        });
    });
*/