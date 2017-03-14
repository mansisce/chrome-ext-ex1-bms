// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var maps_key = "ABQIAAAATfHumDbW3OmRByfquHd3SRTRERdeAiwZ9EeJWta3L_JZVS0bOBRQeZgr4K0xyVKzUdnnuFl8X9PX0w";

function gclient_geocode(address) {
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            encodeURIComponent(address) + '&sensor=false';
  var request = new XMLHttpRequest();

  request.open('GET', url, true);
  request.onreadystatechange = function (e) {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var json = JSON.parse(request.responseText);
        var latlng = json.results[0].geometry.location;
        latlng = latlng.lat + ',' + latlng.lng;

        var src = "https://maps.google.com/staticmap?center=" + latlng +
                  "&markers=" + latlng + "&zoom=14" +
                  "&size=512x512&sensor=false&key=" + maps_key;
        var map = document.getElementById("map");

        map.src = src;
        map.addEventListener('click', function () {
          window.close();
        });
      } else {
        console.log('Unable to resolve address into lat/lng');
      }
    }
  };
  request.send(null);
}

//function print(a){
//  var print = document.getElementById("print");
//  //print.innerHtml(a)
//  //print.textContent = a.length;
//  for(var i=0,l=a.length; i<l; i++){
//      var node = document.createElement("div");
//        node.className += "listRow";
//          print.appendChild(node).textContent = a[i];
//  }
//}

function print(a){
	var print = document.getElementById("print");
	var tblObj = document.getElementById("mtable");
	var tbodyObj = document.querySelector("#mtable tbody");

	for(var i=0,l=a.length; i<l; i++){
		tbodyObj.appendChild(document.querySelector("#mtable tbody tr:last-child").cloneNode(true));
		document.querySelector("#mtable tbody tr:last-child td:first-child").innerText=a[i];
	}
	
	downloadAsXls(tblObj);
}

function downloadAsXls(tblObj)
{
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = tblObj; // id of table

    for(j = 0 ; j < tab.rows.length ; j++) 
    {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    }  
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent(tab_text));  

    return (sa);
}

function ZdownloadAsXls(theTable) {
	var x = theTable.rows
	
	alert(xls);
	
	
	var xls = new ActiveXObject("Excel.Application")

	xls.visible = true
	xls.Workbooks.Add
		alert("Hi there");
	for (i = 0; i < x.length; i++){
	  var y = x[i].cells
	for (j = 0; j < y.length; j++){
		 xls.Cells( i+1, j+1).Value = y[j].innerText
	   }
	  }
}

function map() {
  var address = chrome.extension.getBackgroundPage().selectedAddress;
  if (address)
    print(address);
}

window.onload = map;
