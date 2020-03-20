function Covid() {
  
  var token = ""; // Token 
  
  var total =[];

  var fetchAPI = UrlFetchApp.fetch("https://covid19.mathdro.id/api");
  var json = JSON.parse(fetchAPI.getContentText());
  total[1] = json.confirmed.value;
  total[2] = json.recovered.value;
  total[3] = json.deaths.value;
  total[4] = json.lastUpdate;
  
  // Convert UTC to GMT
  var timeZone = "GMT+7"  
  var format = "dd-MM-YYYY hh:mm:ss"
  var moment = new Date(total[4]);
  var formattedDate = Utilities.formatDate(moment, timeZone, format)
 
  var formData =
       {
         'message' : "Last update @"
         + "\n" + "" + formattedDate + ""
         + "\n" + ""
         + "\n" + "confirmed / recovered / death(s) "
         + "\n" + ""
         + "\n" + "Total " + total[1] + " / " + total[2] + " / " + total[3] + " "
         + "\n" + ""
       }

  var options =
   {
     "method"  : "post",
     "payload" : formData,
     "headers" : {"Authorization" : "Bearer "+ token}

   };

//  Logger.log(formData);

 UrlFetchApp.fetch("https://notify-api.line.me/api/notify",options);

}
