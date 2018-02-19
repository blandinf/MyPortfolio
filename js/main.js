$(document).ready(function(){
	
	var current = null;

	$('a').mouseenter(function(){
		current = $(this);
		// if(current && $(this).index() == current.index()){
		// 	return null;
		// }
		$(this).find('span.bg').hide().fadeTo(500,0.7);
	}).mouseleave(function(){
		$(this).find('span.bg').hide().fadeOut(1000);
	});

		// ------------------------------------------------------------------------------


	var displayMenu = function () {
		$(".sidebar").toggleClass("active");
		$(".sidebarButton").toggleClass("toggle");
		$("body").toggleClass("resize");
		$(".circle").toggle();
	}


	$(".sidebarButton").click(function(){
		displayMenu();
	});

	// ------------------------------------------------------------------------------

	$('#more-works').mouseenter(function(){
		$(this).css({"background-color":"#171717","color":"white","border":"2px solid #171717"});
	}).mouseleave(function(){
		$(this).css({"background-color":"transparent","color":"black","border":"2px solid"});
	});

	$('#more-works').click(function(){
		alert("Cette fonctionnalité n'est malheureusement pas encore disponible");
	});

	// ------------------------------------------------------------------------------


	$('input.round').wrap("<div class='round'></div>").each(function(){
		var input = $(this);
		var div = input.parent();
		var min = input.data('min'); //div
		var max = input.data('max');
		var ratio = (input.val() - min) / (max-min);
		console.log(ratio);

		var canvas = $('<canvas width="200px" height="200px"/>'); //zone de dessin de 200 par 200
		var color = $('<canvas width="200px" height="200px"/>'); //zone de dessin de 200 par 200
		div.append(canvas);
		div.append(color);

		var context = canvas[0].getContext('2d');

		context.beginPath(); //Créer le tracé
		context.arc(100,100,50,0,2*Math.PI); // dessine un arc de cercle au centre de notre carré donc 100 par 100, de rayon 100, point de départ 0, arrivée 2pi
		context.lineWidth = 8;
		context.strokeStyle = "white";
		context.shadowOffsetX = 2;
		context.shadowBlur = 5;
		context.shadowColor = "#000";

		context.stroke(); // dessine

		var context = color[0].getContext('2d');

		context.beginPath(); 
		context.arc(100,100,50,-1/2 *Math.PI,ratio * 2* Math.PI -1/2*Math.PI); 
		context.lineWidth = 8;
		context.strokeStyle = "chocolate";
		context.stroke();

	});

	// ------------------------------------------------------------------------------

	var renderProgress = function () {
		$('.progress_bar').width(Math.round($(document).scrollTop() / ($(document).height() - $(window).height() -100) * 100) + '%');
	}
	renderProgress();
	$(window).on('scroll', function () {
		renderProgress();
	});

	// ------------------------------------------------------------------------------
	
	$('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 500);
    }
    displayMenu();

	});

	//------------------------------------------------------------------------------

	$("#contact-button").click(function(){
		window.location.replace("mailto:florianblandin-iut@outlook.fr");
	});

	$("#download-button a").click(function(){
		e.preventDefault();
		window.location.href = "image/CV.jpg";
	});
	// ------------------------------------------------------------------------------

	var scrollApparition = function(){
			$(document).on('scroll',function(){
				console.log("doc : " + $(document).scrollTop());

				if($(document).scrollTop() <= 380){
					$("#works-section a").css("opacity",0);
				} else{
					$("#works-section a").css("opacity",1).css("transition","all 0.8s ease-in-out");
				}

				if($(document).scrollTop() <= 1750)
					$("#education-section nav").css("opacity",0);
				else
					$("#education-section nav").css("opacity",1).css("transition","all 0.8s ease-in-out");

				if($(document).scrollTop() <= 2550)
					$("div.round, div.round canvas, div.round input, #skills-section p").css("opacity",0);
				else
					$("div.round, div.round canvas, div.round input, #skills-section p").css("opacity",1).css("transition","all 0.8s ease-in-out");

				if($(document).scrollTop() <= 3300)
					$("#about-section img, #contact-button, #download-button").css("opacity",0);
				else
					$("#about-section img, #contact-button, #download-button").css("opacity",1).css("transition","all 0.8s linear");

				if($(document).scrollTop() <= 4170)
					$("#work-experiences-section nav").css("opacity",0);
				else
					$("#work-experiences-section nav").css("opacity",1).css("transition","all 0.8s ease-in");

				if($(document).scrollTop() <= 5000)
					$("#references-section img").css("opacity",0);
				else
					$("#references-section img").css("opacity",1).css("transition","all 1s ease-out");

		})
	}

	scrollApparition();

// ------------------------------------------------------------------------------

	$(".title").each(function(index){
		$(this).attr("id","title"+index);
	});

	$(".descr").each(function(index){
		$(this).attr("id","descr"+index);
	});

$.ajax({
	url: "json/portfolio.php",
	type: "get",
	dataType: "json",
	success : function(datas){

		for(var i=0;i<datas.length;i++){

			$("#title"+i).append(datas[i].title);
			if(i != 2)
				$("#descr"+i).prepend(datas[i].descr+"</br>We have used : </br>");
			else
				$("#descr"+i).prepend(datas[i].descr+"</br>I have used : </br>");
		}
	}
});

	$("#education-section .date").each(function(index){
		$(this).attr("id","date"+index);
	});

	$("#education-section .desc").each(function(index){
		$(this).attr("id","desc"+index);
	});

$.ajax({
	url: "json/education.php",
	type: "get",
	dataType: "json",
	success : function(datas){
		for(var i=0; i<datas.length;i++){
			console.log(datas[i].degree);
			$("#education-section #date"+i).append("<p>"+datas[i].date+"</p>");
			$("#education-section #desc"+i).append("<h2>"+datas[i].degree+"</h2>");
			$("#education-section #desc"+i).append("<h4>"+datas[i].institution+"</h4>");
			$("#education-section #desc"+i).append("<h5>"+datas[i].location+"</h5>");
			$("#education-section #desc"+i).append("<p>"+datas[i].descr+"</p>").css("margin-bottom","40px");
		}
	}
});

	$("#skills-section .div").each(function(index){
		$(this).attr("id","skill"+index);
	});

$.ajax({
	url: "json/skills.php",
	type: "get",
	dataType: "json",
	success : function(datas){
		for(var i=0; i<datas.length;i++){
			console.log(datas[i]);
			$("#skill"+i).append("<p>"+datas[i]+"</p>");
		}
	}
});


	$("#work-experiences-section .date").each(function(index){
		$(this).attr("id","date"+index);
	});

	$("#work-experiences-section .desc").each(function(index){
		$(this).attr("id","desc"+index);
	});

$.ajax({
	url: "json/work-experiences.php",
	type: "get",
	dataType: "json",
	success : function(datas){
		for(var i=0; i<datas.length;i++){
			console.log(datas[i].degree);
			$("#work-experiences-section #date"+i).append("<p>"+datas[i].date+"</p>");
			$("#work-experiences-section #desc"+i).append("<h2>"+datas[i].work+"</h2>");
			$("#work-experiences-section #desc"+i).append("<h4>"+datas[i].company+"</h4>");
			$("#work-experiences-section #desc"+i).append("<h5>"+datas[i].location+"</h5>");
			$("#work-experiences-section #desc"+i).append("<p>"+datas[i].descr+"</p>").css("margin-bottom","40px");
		}
	}
});

	$("#search").hide();
	$("#search-icon").hide();
	

	$("#search").fadeIn(800); $("#search-icon").fadeIn(800);

	var test = document.querySelector("#search");

	setTimeout(function(){ $("#search").val("F"); }, 2000);
	setTimeout(function(){ $("#search").val("FL"); }, 2200);
	setTimeout(function(){ $("#search").val("FLO"); }, 2400);
	setTimeout(function(){ $("#search").val("FLOR"); }, 2600);
	setTimeout(function(){ $("#search").val("FLORI"); }, 2800);
	setTimeout(function(){ $("#search").val("FLORIAN"); }, 3000);
	setTimeout(function(){ $("#search").val("FLORIAN B"); }, 3200);
	setTimeout(function(){ $("#search").val("FLORIAN BL"); }, 3400);
	setTimeout(function(){ $("#search").val("FLORIAN BLA"); }, 3600);
	setTimeout(function(){ $("#search").val("FLORIAN BLAN"); }, 3800);
	setTimeout(function(){ $("#search").val("FLORIAN BLAND"); }, 4000);
	setTimeout(function(){ $("#search").val("FLORIAN BLANDI"); }, 4200);
	setTimeout(function(){ $("#search").val("FLORIAN BLANDIN"); }, 4400);

	setTimeout(function(){ $("#search").val("W"); }, 5000);
	setTimeout(function(){ $("#search").val("WO"); }, 5200);
	setTimeout(function(){ $("#search").val("WOR"); }, 5400);
	setTimeout(function(){ $("#search").val("WORK"); }, 5600);
	setTimeout(function(){ $("#search").val("WORKS"); }, 5800);
	test.innerHTML += "WORKS";
	// setTimeout(function(){ $("#search").val(""); }, 6800);

	setTimeout(function(){ if($("#search").text() == "WORKS") 
									window.location.href = "#works-section"; }, 6500);

	function search(){
		if($("#search").val() == "works" || $("#search").val() == "portfolio")
			window.location.href = "#works-section";

		else if($("#search").val() == "education" || $("#search").val() == "formations")
			window.location.href = "#education-section";

		else if($("#search").val() == "skills" || $("#search").val() == "competences")
			window.location.href = "#skills-section";

		else if($("#search").val() == "about" || $("#search").val() == "profile" || $("#search").val() == "presentation")
			window.location.href = "#about-section";

		else if($("#search").val() == "work experiences" || $("#search").val() == "experiences")
			window.location.href = "#work-experiences-section";

		else if($("#search").val() == "references")
			window.location.href = "#references-section";

		else 
			alert($("#search").val() + " unknown, try in lowercase");
	}

	$("#search-icon").click(function(){
		search();
	});


	$(document).keypress(function(e) {

		if (e.which == 13){
			search();
		}
	});


	setTimeout(function(){ 	if($(document).scrollTop() <= 200)
		$("#search").val("You can search like that");
 }, 15000);


	$("#search-icon").mouseenter(function(){
		$(this).css("color","chocolate");
	}).mouseleave(function(){
		$(this).css("color","#353535");
	});
});