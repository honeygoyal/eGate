var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
if(location.href.indexOf("panel") > -1 ){
   console.log("Disabling chat panel in exam panel");
}else{
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/5fae912a7279c47e5dcf981f/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
}    
})();