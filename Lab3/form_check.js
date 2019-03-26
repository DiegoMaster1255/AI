var errorField = "";
function startTimer(fName) {
    errorField = fName;
    window.setTimeout("clearError(errorField)", 5000);
}
function clearError(objName) {
    document.getElementById(objName).innerHTML = "";
}

function isEmpty(text) {
    if (text.length == 0) {
        return true;
    }
    else {
        return false;
    }
}

function isWhiteSpace(str) {
    var ws = "\t\n\r ";
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (ws.indexOf(c) == -1) {
            return false;
        }
    }
    return true;
}

function checkStringAndFocus(obj, msg) {
    console.log(obj.value)
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    console.log(errorFieldName);
    if (isWhiteSpace(str) || isEmpty(str)) {
        document.getElementById(errorFieldName).innerHTML = msg;
        obj.focus();
        startTimer(errorFieldName);
        return false;
    }
    else {
        return true;
    }
}

function checkEmailRegEx(str) {
    var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
    if (email.test(str))
        return true;
    else {
        alert("Podaj właściwy e-mail");
        return false;
    }
}

function checkZIPCodeRegEx(str) {
    var zipCode = /[0-9]{2}-[0-9]{3}/
    if (zipCode.test(str)) {
        document.getElementById("kod").innerHTML = "OK";
        document.getElementById("kod").className = "green";
        return true;
    }
    else {
        document.getElementById("kod").innerHTML = "Źle";
        document.getElementById("kod").className = "red";
        return false;
    }
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}
function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}

function setWrong(form) {
    var i;
    for (i = 0; i < form.length; i++) {
        console.log(form.elements[i]);
        form.elements[i].className = "wrong";
    }
}
function alterRows(i, e) {
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}

function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}

function swapRows(b) {
    var tab = prevNode(b.previousSibling);
    var tBody = nextNode(tab.firstChild);
    var lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    var firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);

}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
        form.value = form.value.substring(0, maxSize);
    else
        msg.innerHTML = maxSize - form.value.length;
}


function validate(formularz) {
    alterRows(1, document.getElementsByTagName("tr")[0]);
    if (!checkStringAndFocus(formularz.elements["f_imie"], "Podaj imię")) {
        setWrong(formularz);
        return false;
    }
    if (!checkStringAndFocus(formularz.elements["f_nazwisko"], "Podaj nazwisko")) {
        setWrong(formularz);
        return false;
    }
    if (!checkZIPCodeRegEx(formularz.elements["f_kod"].value)) {
        setWrong(formularz);
        return false;
    }
    if (!checkStringAndFocus(formularz.elements["f_ulica"], "Podaj ulicę")) {
        setWrong(formularz);
        return false;
    }
    if (!checkStringAndFocus(formularz.elements["f_miasto"], "Podaj miasto")) {
        setWrong(formularz);
        return false;
    }
    if (!checkEmailRegEx(formularz.elements["f_email"].value)) {
        setWrong(formularz);
        return false;
    }
    return true;

}

