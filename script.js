
$(document).ready(function () {

//global declarations
    var plan;
    var timeBlock;
    const times = ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"];

//function definitions

    $(window).on("load", function() {console.log("handler hit");
                                    var currentDayDisplay = $("#currentDay");

                                    currentDayDisplay.text(moment().format("dddd, MMMM Do YYYY"));
                                    plannerData = JSON.parse(localStorage.getItem("dataKey"));

                                    console.log(plannerData);
                                    console.log(plannerData[0].time);
                                    $(`[data-time="${plannerData[0].time}"]`).val(plannerData[0].currentPlan);
                                    console.log($(`[data-time="${plannerData[0].time}"]`).val());

                                    for(let i=0; i<plannerData.length; i++)
                                    {
                                        $(`[data-time="${plannerData[i].time}"]`).val(plannerData[i].currentPlan);
                                    }
                                  
                                    updateColors();         

                                });

    function updateColors(){
        // var times = ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"];
                                    
        //var currHour = parseInt(moment().format("H"));

        var currHour = (new Date).getHours();

        ////////////////////////////////////////////////////////////////
        console.log("current Hour is " + currHour);

        var minmo = moment().format("mm");

        console.log("Moment minute change " + minmo);
        var min = (new Date).getMinutes();
        console.log("type of the minute is  " , typeof min);
        console.log((new Date).getMinutes());
        console.log("type of currHour " + typeof currHour);
        //////////////////////////////////////////////////////////////

        for(let i=0;i<times.length;i++)
        {
            var dt = parseInt(moment(times[i], ["hA"]).format("HH"));
            console.log(dt);
            console.log("type of dt " + typeof dt);
            
        if(dt < currHour)
        {
                $(`[data-time="${times[i]}"]`).each(function(){
                    console.log("2times");
                    if(typeof $(this).attr("class") == "undefined")
                    {
                        $(this).attr("class", "past");
                    }

                })
        }
        else if(dt > currHour){
                $(`[data-time="${times[i]}"]`).each(function(){
                console.log("2times");
                if(typeof $(this).attr("class") == "undefined")
                {
                    $(this).attr("class", "future");
                }

                })
        }
        else{
                $(`[data-time="${times[i]}"]`).each(function(){
                console.log("2times");
                if(typeof $(this).attr("class") == "undefined")
                {
                    $(this).attr("class", "present");
                }

                })
        }

        }
}

    function initializeLocalStorage(){
        // localStorage.removeItem("dataKey");
        if(!("dataKey" in localStorage))
        { 
            var plannerData = [{time : "9AM", currentPlan: ""},{time : "10AM", currentPlan: ""},{time : "11AM", currentPlan: ""},{time : "12PM", currentPlan: ""},{time : "1PM", currentPlan: ""},{time : "2PM", currentPlan: ""},{time : "3PM", currentPlan: ""},{time : "4PM", currentPlan: ""},{time : "5PM", currentPlan: ""}];

            localStorage.setItem("dataKey", JSON.stringify(plannerData));
        }
}

function saveData(){
    
        plan = $(`[data-time="${event.target.dataset.time}"]`).val();

        timeBlock = $(this).attr("data-time");

        console.log(plan);
        console.log(timeBlock);

        console.log("hit");
        console.log(event.target.dataset.time);

        var plannerData = JSON.parse(localStorage.getItem("dataKey"));

        for(i=0;i<plannerData.length;i++)
        {
            if(plannerData[i].time == timeBlock)
            {
                plannerData[i].currentPlan = plan;
            }
            
        }

        // plannerData.push({time : timeBlock , currentPlan : plan});
        
        localStorage.setItem("dataKey", JSON.stringify(plannerData));

        console.log(JSON.parse(localStorage.getItem("dataKey")));
}

//function calls
var downLoadTimer = setInterval(updateColors , 15000);
initializeLocalStorage();
$('.saveBtn').click(saveData);

});


