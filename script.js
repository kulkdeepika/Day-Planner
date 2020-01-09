

// var btn = document.getElementById("btn");

// var ref = btn.parentElement.parentElement.getAttribute("data-index")

// var x = "\"one\"";

// var ele = $('[data-index = ' + `${x}` + ']');

// console.log(ele[0].firstElementChild.innerHTML);
// console.log($("p")[0].innerHTML);
// console.log(btn.parentElement.parentElement.getAttribute("data-index"));

// var plan = "";

// var area = document.getElementById("textarea");

// area.addEventListener("input", () => {plan = area.value;});
// btn.addEventListener("click", () => {console.log(plan);});


// var area1 = document.getElementById("textarea1");

////////////////////////////////////////////////////////////////////////////////

// var planner = $('.saveBtn');
// var temp="";

// planner.addEventListener("click" , saveData);

$(document).ready(function () {

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
                                  /////////////////////////////////////////////////////////////////////////////////
                                  
                                    var currHour = parseInt(moment().format("H"));
                                    console.log("current Hour is " + currHour);
                                    console.log(typeof currHour);

                                    var dt = moment("9AM", ["hA"]).format("HH");

                                    console.log(dt);

                                    // console.log($(`[data-time="${currHour}"]`))//.attr("class", "future");

                                    // $(`[data-time="${currHour}"]`).each(function(){
                                    //     console.log("2times");
                                    //     if(typeof $(this).attr("class") == "undefined")
                                    //     {
                                    //         $(this).attr("class", "future");
                                    //     }


                                    // })


                                });

var plan;
var timeBlock;
$('.saveBtn').click(saveData);

initializeLocalStorage();

function initializeLocalStorage(){
    //localStorage.removeItem("dataKey");
    if(!("dataKey" in localStorage))
    { 
        var plannerData = [{time : "10AM", currentPlan: ""},{time : "11AM", currentPlan: ""}];
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

});


