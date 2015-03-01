
function loadpath(){
	return decodeURI(window.location.hash).replace(/%2F/g, "/").replace("#path=", "")
}


function construct_url(uk, base, fname) {
	// return "http://54.65.209.115:8008/r/" + uk + "/" + fname;
	return "http://54.65.209.115:8008/r/" + uk + base.replace("/apps/MIDIDB", "") + "/" + fname;
}


function init_clip_go() {
	var i0 = $($("li[node-type=list-item]")[0]);
	var i1 = i0.clone().removeClass("active");
	i1.html(i0.html().replace("全部文件", "直链盘"));
	i1.find("a").attr("href", "/disk/home#path=/apps/MIDIDB")
	i0.after(i1);


}
function init_clip_btn() {
	// init_clip_go();
	if (loadpath().indexOf("/apps/MIDIDB") == -1) {
		return;
	}
	console.log("pan helper demoning...");
	var items = $("div[node-type=item][data-extname!=yingyong_child]");
	
	items.each(function(i) {
		var fname = $(this).find(".name").attr("title");
		var id = "clip" + i;
		var btn = $('<a node-type="btn-item" id="' + id + '" title="' + fname + '" class="btn clipboard" style="background-position: -160px -106px"href="javascript:void(0);"></a>');
		$(this).find(".btns").append(btn);
		
		btn.hover(function(){
			btn.css("background-position", "-183px -106px");
		}, function() {
			btn.css("background-position", "-160px -106px");
		});
		// var clip = new ZeroClipboard( document.getElementById(id));
		btn.after($("<input type='text' class='cliptext' style='display:none'/>"));
		btn.click(function(){
			var url = construct_url(yunData.MYUK, loadpath(), btn.attr("title"));
			bb = btn;
			var ipt = $(btn.parent().find("input")[0]);
			ipt.val(url);
			$(".cliptext").hide();
			ipt.show();
			ipt.focus().select();
			// alert(loadpath() + "/" + btn.attr("title"));
		});
	});


};


function alalysis_uid() {
	var res = $("body").html();
	var s0 = res.indexOf("yunData.MYUK");
	var s1 = res.indexOf("\"", s0 + 1);
	var s2 = res.indexOf("\"", s1 + 1);
	return res.substring(s1+1, s2);
}
window.onhashchange=function(){

	setTimeout(init_clip_btn, 500);
	
}

function load_clipboard() {
	ZeroClipboard.config( { forceHandCursor: true ,swfPath: 'http://cdn.bootcss.com/zeroclipboard/2.1.6/ZeroClipboard.swf' } );
	ZeroClipboard.on("aftercopy", function(e) {
		//var obj = $(e.target);
		console.log("AAA");
		 alert('复制成功!');
	});
	var clip = new ZeroClipboard(document.getElementsByClassName("icon-btn-download")[0]);
	//var clip = new ZeroClipboard( document.getElementById("copy") );
//	$("head").prev($('<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.min.js" ></script>'));
}

window.onload = function() {
	yunData = {
		MYUK: alalysis_uid()
	};
	//load_clipboard();
	init_clip_go();
	init_clip_btn();
	
}
