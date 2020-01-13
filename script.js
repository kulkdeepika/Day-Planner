
$(document).ready(function () {

//global declarations
    var plan;
    var timeBlock;
    const times = ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"];
    
//function definitions

//this function dynamically generates all the rows and columns
function generateHtml(){

    for(let i=0; i<times.length; i++)
    {
        let oneRow = $("<div>");
        oneRow.addClass("row");
    
        let firstCol = $("<div>");
        firstCol.addClass("col-1");
        firstCol.addClass("hour");

        let timeHolder = $("<p>");
        timeHolder.text(times[i]);
        timeHolder.css("margin-top", "40%")
       
        firstCol.append(timeHolder);

        let secCol = $("<div>");
        secCol.addClass("col-10");

        let planText = $("<textarea>");
        planText.attr("data-time" , times[i]);
        planText.css("height", "80%")

        secCol.append(planText);

        let thirdCol = $("<div>");
        thirdCol.addClass("col-1");

        let svBtn = $("<button>");
        svBtn.addClass("saveBtn");
        svBtn.attr("data-time", times[i]);
        svBtn.text("SAVE");

        thirdCol.append(svBtn);

        oneRow.append(firstCol);
        oneRow.append(secCol);
        oneRow.append(thirdCol);

        $(".container").append(oneRow);

    }
}

//this function checks if the localstorage key exists; if not, it initializes the local storage appropriately.
//it is called after the html is generated.

function initializeLocalStorage(){
    // localStorage.removeItem("dataKey");
    if(!("dataKey" in localStorage))
    { 
        var plannerData = [{time : "9AM", currentPlan: ""},{time : "10AM", currentPlan: ""},{time : "11AM", currentPlan: ""},{time : "12PM", currentPlan: ""},{time : "1PM", currentPlan: ""},{time : "2PM", currentPlan: ""},{time : "3PM", currentPlan: ""},{time : "4PM", currentPlan: ""},{time : "5PM", currentPlan: ""}];

        localStorage.setItem("dataKey", JSON.stringify(plannerData));
    }
}

//this function loads the current day and retrives the data from the local storage
function onLoad(){
    var currentDayDisplay = $("#currentDay");
    currentDayDisplay.text(moment().format("dddd, MMMM Do YYYY"));
    
    plannerData = JSON.parse(localStorage.getItem("dataKey"));
                   
    $(`[data-time="${plannerData[0].time}"]`).val(plannerData[0].currentPlan);

    for(let i=0; i<plannerData.length; i++)
    {
        $(`[data-time="${plannerData[i].time}"]`).val(plannerData[i].currentPlan);
    }
                                  
    updateColors(); 
}

//this function is called at load and every 15 secs to see if the hour and changed and change the colors accordingly.                                
function updateColors(){
                                    
    var currHour = (new Date).getHours();
        
    for(let i=0;i<times.length;i++)
    {
        var dt = parseInt(moment(times[i], ["hA"]).format("HH"));
            
        if(dt < currHour)
        {
            $(`[data-time="${times[i]}"]`).each(function(){
                                 
                if(!($(this).is("button")))
                {
                    $(this).attr("class", "past");
                        
                }

            })
        }
        else if(dt > currHour)
        {
            $(`[data-time="${times[i]}"]`).each(function(){
                
                if(!($(this).is("button")))
                {
                        $(this).attr("class", "future");
                }

            })
        }
        else
        {
            $(`[data-time="${times[i]}"]`).each(function(){
                
                if(!($(this).is("button")))
                {
                    $(this).attr("class", "present");
                }

            })
        }

    }
}

    
//this function is called on a click event on the save button. stores the text in the local storage
function saveData(){
    
        plan = $(`[data-time="${event.target.dataset.time}"]`).val();

        timeBlock = $(this).attr("data-time");

        var plannerData = JSON.parse(localStorage.getItem("dataKey"));

        for(i=0;i<plannerData.length;i++)
        {
            if(plannerData[i].time == timeBlock)
            {
                plannerData[i].currentPlan = plan;
            }
            
        }
        
        localStorage.setItem("dataKey", JSON.stringify(plannerData));
}

//function calls
generateHtml();
initializeLocalStorage();
onLoad();
var downLoadTimer = setInterval(updateColors , 15000);
$('.saveBtn').click(saveData);

});//end of document.ready


