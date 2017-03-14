// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The background page is asking us to find an address on the page.


/*
	Restrictions : When will this plugin will stop working :
	
	1: <aside>
	2. var child = node[i].querySelector(".__name>a");
*/

if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
      sendResponse(findPlaces());    
        //findPlaces
        //changeFilterView();
  });

}

// Search the text nodes for a US-style mailing address.
// Return null if none is found.
var findAddress = function() {
  var found;
  var re = /(\d+\s+[':.,\s\w]*,\s*[A-Za-z]+\s*\d{5}(-\d{4})?)/m;
  var node = document.body;
  var done = false;
  while (!done) {
    done = true;
    for (var i = 0; i < node.childNodes.length; ++i) {
      var child = node.childNodes[i];
      if (child.textContent.match(re)) {
        node = child;
        found = node;
        done = false;
        break;
      }
    }
  }
  if (found) {
    var text = "";
    if (found.childNodes.length) {
      for (var i = 0; i < found.childNodes.length; ++i) {
        text += found.childNodes[i].textContent + " ";
      }
    } else {
      text = found.textContent;
    }
    var match = re.exec(text);
    if (match && match.length) {
      console.log("found: " + match[0]);
      var trim = /\s{2,}/g;
      return match[0].replace(trim, " ");
    } else {
      console.log("bad initial match: " + found.textContent);
      console.log("no match in: " + text);
    }
  }
  return null;
}

var findPlaces = function(){
  var found;
  var node = document.getElementsByTagName("aside");
  var done = false;
  var r = [];
  while (!done) {
    done = true;
    if(!node){
        return false;
    }
    for (var i = 0; i < node.length; ++i) {
      var child = node[i].querySelector(".__name>a");
        if(child)
          r.push(child.textContent);
      // if (child.classList.contains("__name")) {
      //   return child.textContent;
      }
  }

  // if (found) {
  //   var text = "";
  //   if (found.childNodes.length) {
  //     for (var i = 0; i < found.childNodes.length; ++i) {
  //       text += found.childNodes[i].textContent + " ";
  //     }
  //   } else {
  //     text = found.textContent;
  //   }
  //   var match = re.exec(text);
  //   if (match && match.length) {
  //     console.log("found: " + match[0]);
  //     var trim = /\s{2,}/g;
  //     return match[0].replace(trim, " ");
  //   } else {
  //     console.log("bad initial match: " + found.textContent);
  //     console.log("no match in: " + text);
  //   }
  // }
  return r;
}

var categoryFilterNew= function(v) {
          $("#dvenueDetails aside,#seeVenueMore").hide();
          var category = v;
          if (category == '') {
            venues.showVenue();
            return;
          }
          $('#ajax-typeahead').typeahead('val', '');
          $("#dvenueDetails aside").each(function(){
            var categoryFilterAttr = $(this).attr('data-category-filter');
            if (categoryFilterAttr.indexOf(category) !== -1) {
              $(this).show();
            } else {
              $(this).hide();
            }
          });
          if ($("#dvenueDetails aside:visible").length == 0) {
            $('#noVenues').show();
          } else {
            $('#noVenues').hide();
          }
          wow.scroll = true;
          wow.scrollHandler();
        }
  


var changeFilterView = function(){
    //get all the filters of the page. 
    // add the class. Update the class.
    //on click call the function which is selected.

    var x = document.getElementsByClassName("SelectBox");
    var childOption = x[0].childNodes;
    var priceFilter = document.getElementById("PriceFilter");
    var p = document.getElementById("event-list-filters");
    var newN = document.createElement("div");
    childOption.forEach(function(a){
      console.log(a.innerText)
          p.appendChild(newN);
          newN.innerText = a.innerText;

    });


    //for 
    return true;

}
