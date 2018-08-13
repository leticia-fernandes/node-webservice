var fortuneCookies = [
    "Carpe Diem!",
    "Do not eat yellow snow.",
    "Enjoy your life.",
    "You may find happiness today",
];

exports.getFortune = function(){
    var idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
}