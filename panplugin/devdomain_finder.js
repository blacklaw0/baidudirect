var domain_dev = {
     
    toDev:function(url, domain) {
        //www.taobao.com -> www.daily.taobao.net
        var domain_url = domain.replace("taobao.com", "daily.taobao.net");
        return "http://"+ domain_url + url.slice(url.indexOf("taobao.com")+"taobao.com".length);
    },
     
    isTaobaoDev:function(domain){
        if(domain == ""){
            return false;
        }
        if(domain.indexOf("taobao.com") != -1) {
            return true;
        }
        return false;
    }
};
 
if(domain_dev.isTaobaoDev(document.domain)){
    chrome.extension.sendRequest({href: domain_dev.toDev(location.href, document.domain)});
}

console.log("dev background running!");