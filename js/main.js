function transliterate(word) {
    var A = {};
    var result = '';
    A["Ё"] = "YO";
    A["Й"] = "Y";
    A["Ц"] = "TS";
    A["У"] = "U";
    A["К"] = "K";
    A["Е"] = "E";
    A["Н"] = "N";
    A["Г"] = "G";
    A["Ш"] = "SH";
    A["Щ"] = "SCH";
    A["З"] = "Z";
    A["Х"] = "KH";
    A["Ъ"] = "'";
    A["ё"] = "yo";
    A["й"] = "y";
    A["ц"] = "ts";
    A["у"] = "u";
    A["к"] = "k";
    A["е"] = "e";
    A["н"] = "n";
    A["г"] = "g";
    A["ш"] = "sh";
    A["щ"] = "sch";
    A["з"] = "z";
    A["х"] = "kh";
    A["ъ"] = "'";
    A["Ф"] = "F";
    A["Ы"] = "I";
    A["В"] = "V";
    A["А"] = "A";
    A["П"] = "P";
    A["Р"] = "R";
    A["О"] = "O";
    A["Л"] = "L";
    A["Д"] = "D";
    A["Ж"] = "ZH";
    A["Э"] = "E";
    A["ф"] = "f";
    A["ы"] = "i";
    A["в"] = "v";
    A["а"] = "a";
    A["п"] = "p";
    A["р"] = "r";
    A["о"] = "o";
    A["л"] = "l";
    A["д"] = "d";
    A["ж"] = "zh";
    A["э"] = "e";
    A["Я"] = "YA";
    A["Ч"] = "CH";
    A["С"] = "S";
    A["М"] = "M";
    A["И"] = "I";
    A["Т"] = "T";
    A["Б"] = "B";
    A["Ю"] = "YU";
    A["я"] = "ya";
    A["ч"] = "ch";
    A["с"] = "s";
    A["м"] = "m";
    A["и"] = "i";
    A["т"] = "t";
    A["б"] = "b";
    A["ю"] = "yu";
    for (var i = 0; i < word.length; i++) {
        var c = word.charAt(i);
        result += A[c] || c; }
    return result;
}

function changeNameToUpper(s) {
    return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase(); }

function reverseInitialsAndName(s) {
    return s.substr(s.indexOf('.') - 2) + " " + s.substr(0, s.indexOf('.') - 2) }

function getPages() {
    var pages = /[С|ы][\.|:]\s([0-9-]+)/;
    var vol = /[Т|м][\.|:]\s([0-9]+)/;
    var number = /[№|р][:]?\s([0-9]+)/;
    var year = /\s(\d{4})[\s|\.]/;
    var title = /^(.*)$/m;
    var authors = /(?:[A-Za-z]+\s([A-Z]\.){1,2})+/g;
    var rusauthors = /(?:[А-ЯЁа-яё]+\s([А-ЯЁё]\.){1,2})+/g;
    var journal = /([\w ]+\.)\s\d/;
    var str = $('#textToParse').val().trim();
    var p = str.match(pages)[1];
    var y = str.match(year)[1];
    if (str.match(vol) != null) var v = (str.match(vol)[1] == undefined) ? "" : str.match(vol)[1];
    if (str.match(number) != null) var n = str.match(number)[1];
    if (n == undefined) n = "";
    var t = str.match(title)[0];
    if (str.match(journal) != null)
        var j = str.match(journal)[1];
    else
        var j = str.match(/.*$/g);
    var a = str.match(authors);
    if (a == null)
        var a = str.match(rusauthors);

    a1 = changeNameToUpper(a[0].split(' ')[0]) + ", " + a[0].split(' ')[1];
    var ar = [];
    for (var i = a.length - 1; i >= 0; i--) {
        ar[i] = changeNameToUpper(a[i].split(' ')[0]) + " " + a[i].split(' ')[1]
        ar[i] = reverseInitialsAndName(a[i]);
    }
    console.log(a1 + " " + t + " [Текст] / " + ar.join(', ') + " // " + j + " – " + y + " – № " + v + ". – С. " + p);
    $('#parseResultGOST').text(a1 + " " + t + " [Текст] / " + a.join(', ') + " // " + j + " – " + y + " – № " + n + ". – С. " + p);

    $('#parseResultSRS').text(ar.join(', ') + " (" + y + "). " + t + ". " + j + ", " + v + "(" + n + "), " + p);


    /*
         var req = new XMLHttpRequest();
         req.setRequestHeader('Accept', 'application/json');
         req.setRequestHeader('X-ELS-APIKey', '097a12eed9841d91078c99410b85f52a');

         req.open('GET', 'https://api.elsevier.com/content/serial/title?issn=0309-0566&field=SJR,SNIP&view=STANDARD', false);
         req.send(null);
         httpRequest.onreadystatechange = function () { console.log(req.responseText);}
        */
}