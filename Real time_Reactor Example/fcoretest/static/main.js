const red = 'rgb(255, 99, 132)'; // red
const blue = 'rgb(54, 162, 235)'; // blue
const chart1 = document.getElementById('box-2').getContext('2d');
const chart2 = document.getElementById('box-3').getContext('2d');

let slider_1 = document.getElementById('flow_inlet');
let slider_2 = document.getElementById('heat_inlet');
let slider_3 = document.getElementById('initial_level');
let text_1 = document.getElementById('text-1');
let text_2 = document.getElementById('text-2');
let text_3 = document.getElementById('text-3');



let min_time_slider = document.getElementById('time1');
let min_time_input = document.getElementById('min-time');

let max_time_slider = document.getElementById('time2');
let max_time_input = document.getElementById('max-time');

text_1.oninput = function(){
    slider_1.value = this.value*1000;
    // getArgs(text_1.value, text_2.value, text_3.value);
};

text_2.oninput = function(){
    slider_2.value = this.value;
    // getArgs(text_1.value, text_2.value, text_3.value );
};

text_3.oninput = function(){
    slider_3.value = this.value*20;
    // getArgs(text_1.value, text_2.value, text_3.value );
};

slider_1.oninput = function(){
    text_1.value = this.value/1000;
    // getArgs(text_1.value, text_2.value, text_3.value );
};
slider_2.oninput = function(){
    text_2.value = this.value;
    // getArgs(text_1.value, text_2.value, text_3.value);
};
slider_3.oninput = function(){
    text_3.value = this.value/20;
    // getArgs(text_1.value, text_2.value, text_3.value );
};

document.getElementById('start-time-btn').style.display = "none";
document.getElementById('stop-time-btn').style.display = "inline-block";
myTimer = setInterval(myClock, 1000);

var c = 1;
function myClock() {
    document.getElementById("start-time").value = c++;
}

function stopClock() {
    document.getElementById('start-time-btn').style.display = "inline-block";
    document.getElementById('stop-time-btn').style.display = "none";
    clearInterval(myTimer);
    clearInterval(clock);
    clearInterval(clock1);
}

var cnt = 0;
var cnt1 = 0;

// function makechart(flow_inlet, heat_inlet, initial_level) { 

    function getData() {
        let entry = {
            flow_inlet:document.getElementById('text-1').value,
            heat_inlet: document.getElementById('text-2').value,
            initial_level: document.getElementById('text-3').value
        }
        console.log(entry);
        fetch(`${window.origin}/process-entry`, {
            method: "POST",
            body: JSON.stringify(entry),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json",
            })
        })
        .then(function (res) {
            console.log(res);
            res.json().then(function (val) {
                // alert(val.temperature[49]);
                document.getElementById('effTime').value = val.liquid_level[49];
                document.getElementById('effTemp').value = val.temperature[49];
            });   
        });
        // alert(document.getElementById('effTime').value);
        return document.getElementById('effTemp').value;
    }

    Plotly.plot('chart',[{
        y:[getData()],
        type:'line'
    }]);

    var clock = setInterval(function(){
        Plotly.extendTraces('chart',{ y:[[getData()]]}, [0]);
        cnt++;
        if(cnt > 9) {
            Plotly.relayout('chart',{
                xaxis: {
                    range: [cnt-9,cnt]
                }
            });
        }
    },1000);

    
    Plotly.plot('chart-temp',[{
        y:[document.getElementById('effTime').value],
        type:'line'
    }]);

    var clock1 = setInterval(function(){
        Plotly.extendTraces('chart-temp',{ y:[[document.getElementById('effTime').value]]}, [0]);
        cnt1++;
        if(cnt1 > 9) {
            Plotly.relayout('chart-temp',{
                xaxis: {
                    range: [cnt1-9,cnt1]
                }
            });
        }
    },1000);
// }   

