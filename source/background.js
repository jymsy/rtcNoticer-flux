// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

var url = 'https://swgjazz.ibm.com:8017/jazz/service/com.ibm.team.workitem.common.internal.rest.IQueryRestService/getResultSet';
var post_field = 'startIndex=0&maxResults=10&filterAttribute=&filterValue=&itemId=';
var refer = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation';
var isActivated = false;
var isInitialized=false;
var item_url = 'https://swgjazz.ibm.com:8017/jazz/web/projects/Social%20CRM%20-%20Sales%20Force%20Automation#action=com.ibm.team.workitem.viewWorkItem&id=';

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        if (details.type === 'xmlhttprequest') {
          details.requestHeaders.push({ name: 'Referer', value: refer});
          return { requestHeaders: details.requestHeaders };
        }
    },
    {urls: ['https://swgjazz.ibm.com:8017/*']},
    ["blocking", "requestHeaders"]
);

//right button click
chrome.contextMenus.create({
    title: "Add to Focusing On",
    documentUrlPatterns: ["https://swgjazz.ibm.com:8017/*"],
    onclick: function (info, tab){
      var id = info.pageUrl.match(/.*id=(\d+$)/)[1];
      if (id) {
        var item = {id:id, summary:tab.title};
        localStorageArrayAppend('focusingOn', item);
        chrome.runtime.sendMessage({
          type: "addFocusingOn",
          value: item
        });
        //53
      }

    }
});

function localStorageArrayAppend(key, item) {
  if (item) {
    var current = JSON.parse(localStorage.getItem(key));
    if (current) {
      current.push(item);
      localStorage.setItem(key, JSON.stringify(current));
    }
  };
}

/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/
function show(body,id) {

  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.

  var opt = {
    type: "list",
    title: hour + time[2] + ' ' + period,
    message: "Primary message to display",
    iconUrl: "48.png",
    items: body,
    buttons: [{title:'去看看'}]
  };
  chrome.notifications.create((new Date()).valueOf()+':'+id, opt, function(notificationId){
    console.log('show notification');
  });
}

function showNotice(value, date){
  var body = [];
        body.push({title:"ID", message:value['labels'][1]});
        body.push({title:"Summary", message:value['labels'][2]});
        body.push({title:"Priority & Severity", message:value['labels'][5] + ' | '+value['labels'][6]});

        date = new Date(date).toLocaleString();
        body.push({title:"Modified Date", message:date});
        show(body, value['labels'][1]);
}

function updateLastModifyDate(id, newDate) {
    var currentFilter = JSON.parse(localStorage.filter);
    currentFilter.forEach(function(filter) {
        if (filter.id == id) {
            filter.lastModifyDate = newDate;
        }
    });
    localStorage.filter=JSON.stringify(currentFilter);
}

function parseResultList(result, filter) {
    var items = result['soapenv:Body']['response']['returnValue']['value']['rows'];
    console.log(items);
    var lastDate=0;
    items.forEach(function(value, index) {
      var date = parseInt(value['labels'][7]);
      if (filter.lastModifyDate == 1 || date > filter.lastModifyDate) {
        if (date > lastDate) {
            lastDate = date;
        }

        var todayItems = JSON.parse(sessionStorage.todayItems);
        var newItem = {
          id: value['labels'][1],
          summary:value['labels'][2],
          severity: value['labels'][6]
        };

        var message = {
          type: 'addNewItem',
          value: newItem
        };

        todayItems.push(newItem);
        sessionStorage.todayItems = JSON.stringify(todayItems);

        chrome.runtime.sendMessage(message);

        showNotice(value, date);
      }
    });
    if (lastDate != 0) {
      localStorage.lastItemDate = lastDate;
      updateLastModifyDate(filter.id, lastDate);
    }
}

function getRTCList(cookies) {
  if (!localStorage.lastItemDate) {
    localStorage.lastItemDate = 1;
  }
  var currentFilter = JSON.parse(localStorage.filter);

  currentFilter.forEach(function(filter) {
    var xmlhttp = new XMLHttpRequest();
    var result;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        parseResultList(JSON.parse(xmlhttp.responseText), filter);
      }
    }
    xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    xmlhttp.setRequestHeader("accept","text/json");
    xmlhttp.send(post_field+filter.id);
  });

}

function onload() {
  chrome.cookies.getAll({domain:'swgjazz.ibm.com'}, function(cookies) {
    // startListening();
    console.log(cookies);
    // Test for notification support.
    if (window.Notification) {
      // While activated, show notifications at the display frequency.
      if (isActivated) { getRTCList(cookies); }

      var interval = 0; // The display interval, in seconds.

      setInterval(function() {
        interval++;
        // console.log(interval);
        if (isActivated && localStorage.frequency <= interval) {
            interval = 0;
            getRTCList(cookies);
        }
      }, 1000);
    }    
  });
  // show('error!login rtc error! please login rtc again');
}

chrome.notifications.onClicked.addListener(function(notificationId){
  chrome.notifications.clear(notificationId);
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.type === "initItems") {
        sendResponse(JSON.parse(sessionStorage.todayItems));
    }
});

chrome.notifications.onButtonClicked.addListener(function(notificationId,buttonIndex){
  chrome.notifications.clear(notificationId);
  var id = /.*:(.*)/.exec(notificationId)[1];
  chrome.tabs.create({url:item_url+id});
});

if (!localStorage.frequency) {
  localStorage.frequency = 60;
}

if (!localStorage.filter) {
  var defaultFilter = [
    {name:"Copy of 2.2 Unresolved Defects - Found in R3.1",id:"_Rxcb4I8rEeSN-dPMeJF_tQ", lastModifyDate:1}
  ];
  localStorage.filter=JSON.stringify(defaultFilter);
}

if(!sessionStorage.todayItems) {
  sessionStorage.todayItems = JSON.stringify([]);
}

if(!localStorage.focusingOn) {
  localStorage.focusingOn = JSON.stringify([]);
}

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse({}); // snub them.
    if (request.cmd == 'start' && !isActivated) {
      isActivated = true;
      if (!isInitialized) {
        isInitialized = true;
        onload();
      }
    } else if (request.cmd == 'stop'){
      isActivated = false;
    }
    console.log('get request:'+request.cmd);
    
    
  }
);


