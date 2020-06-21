/* Social media share buttons */
//Must run only on article.html
if (window.location.href.indexOf ('article.html') != -1) {
	//Create a new div after the article
	let share_div = document.createElement ('div');
	share_div.style.fontSize = '17px';
	share_div.style.marginTop = '50px';
	share_div.classList.add ('xlarge-12');
	share_div.classList.add ('align-center');
	//Add to page
	document.getElementById ('article').appendChild (share_div);
	//Create buttons
	let thisURL = window.location.href;
	let shareLabel = "<p style='margin-bottom: 15px; font-size: 14px;'>Share on social media:</p>";
	let facebookButton = "<a style='display: inline-block; font-family: Helvetica, arial; color: #fff; font-size: 14px; border-radius: 4px; padding: 2px 6px 2px 6px; margin: 2px; background-color: #4267b2;' href=https://www.facebook.com/sharer/sharer.php?u=" + thisURL + " target=_blank>Facebook</a>";
	let twitterButton = "<a style='display: inline-block; font-family: Helvetica, arial; color: #fff; font-size: 14px; border-radius: 4px; padding: 2px 6px 2px 6px; margin: 2px; background-color: #38A1F3;' href=https://twitter.com/home?status=" + thisURL + " target=_blank><span class=icon icon-twitter></span>Twitter</a>";
	let linkedinButton = "<a style='display: inline-block; font-family: Helvetica, arial; color: #fff; font-size: 14px; border-radius: 4px; padding: 2px 6px 2px 6px; margin: 2px; background-color: #0077B5;' href=https://www.linkedin.com/shareArticle?mini=true&amp;url=" + thisURL + " target=_blank>LinkedIn</a>";
	let copyButton = "<a id='copy-share-link' style='display: inline-block; font-family: Helvetica, arial; color: #fff; font-size: 14px; border-radius: 4px; padding: 2px 6px 2px 6px; margin: 2px; background-color: #993232;'>Copy URL</a>";
	let whatsappButton = "<a style='display: inline-block; font-family: Helvetica, arial; color: #fff; font-size: 14px; border-radius: 4px; padding: 2px 6px 2px 6px; margin: 2px; background-color: #25d366;' href='whatsapp://send?text=" + thisURL + "'>WhatsApp</a>";
	//Add buttons to div
	share_div.innerHTML = shareLabel + facebookButton + whatsappButton + linkedinButton + twitterButton + copyButton;
	//Related to copyButton button
	document.getElementById ("copy-share-link").addEventListener ("mouseover", () => { document.body.style.cursor = "pointer"});
	document.getElementById ("copy-share-link").addEventListener ("mouseout", () => { document.body.style.cursor = "default"});
	document.getElementById ("copy-share-link").addEventListener ("click", () => {
	    var tmpInput = document.createElement ("input");
	    let urlText = window.location.href;
	    document.body.appendChild (tmpInput);
	    tmpInput.value = urlText;
	    tmpInput.select ();
	    document.execCommand ("copy");
	    document.body.removeChild (tmpInput);
	    alert ("The link for this article has been copied to your clipboard!");
	});
}