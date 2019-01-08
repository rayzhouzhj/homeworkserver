function loadQuestion(){
    $.ajax({
        type: "Get",
        dataType: 'json',
        url: "/getquestion",
        cache: "false",
        async: true,
        success: function (result) {
            var json = eval(result);
            console.log(json);
            $("table#question > tbody tr").remove();

            if(json.type == "sentence"){
                $("table#question > tbody").append("<tr></tr>");
                var tds = [];
                for (i = 0; i < json.data.length; i++) {
                    tds.splice(Math.floor(Math.random() * json.data.length), 0, "<td>" + json.data[i].content + "</td>");
                }

                tds.forEach(td => {
                    $("table#question > tbody > tr").append(td).hide().fadeIn();
                });

            } else {
                var trs = [];
                for (i = 0; i < json.data.length; i++) {
                    trs.splice(Math.floor(Math.random() * json.data.length), 0, "<tr><td>" + json.data[i].content + "</td></tr>");
                }

                trs.forEach(tr => {
                    $("table#question > tbody").append(tr).hide().fadeIn();
                });
            }
        },
        error: function (result) {
            alert(result);
        }
    });
}

var index = 0;
function addRow(){
    index++;
    $("table#question > tbody").append("<tr index='" + index + "'><td style='padding-right: 0px'>" + index + "</td><td><input index='" + index + "' style='width: 90%'/><button class='btn btn-link btn-xs' style='margin-left: 5px'><span class='glyphicon glyphicon-minus' onclick='removeRow(" + index + ")'></span></button></td></tr>").fadeIn();
}

function removeRow(curindex){
    $("tr[index='" + curindex + "']").slideUp().remove();
    index--;
}

function addQuestions(){
    var json = [];
    var rows = $("table#question > tbody tr input");
    // for(i = 0; )
    rows.forEach(row => {
        var ind = row.attr("index");
        var data = row.value;
        json.push({
            index: ind,
            content: data
        });
    });

    console.log(json);
}