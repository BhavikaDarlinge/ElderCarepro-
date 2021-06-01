var ManageVitals = function () {
    var init = function () {
        BindEvent();
        Alldropdown();
        ShowAppointment();
    };

    var BindEvent = function () {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();
      
       
        $('#btnBp').click(function () {
            $('#divBp').toggle();

        });
        $('#btnPulse').click(function () {           
            $('#divPulse').toggle();            
        });
        $('#btnSugar').click(function () {      
            $('#divSugar').toggle();  
        });
        $('#btnTemp').click(function () {       
            $('#divTemp').toggle(); 
        });
        $('#btnCancel').click(function () {
            Clear();
        });
        $('#btnBpressure').click(function () {

            $("#btnBpressure").text(" Processing...");
            $('#btnBpressure').prop('disabled', 'disabled');

            var Formdata = {
                Systolic_Pressure: $('#txtsystolicpressure').val(),
                Diastolic_Pressure: $('#txtdiastolicpressure').val(),
                ChooseSideId: $('#ddlchooseside').val(),
                PositionId: $('#ddlposition').val(),                
                BpDate: $('#dateofBp').val(),
            };
            SaveBP(Formdata);
        });
        $('#btnpulserate').click(function () {

            $("#btnpulserate").text(" Processing...");
            $('#btnpulserate').prop('disabled', 'disabled');

            var Formdata = {
                PluseRateDate: $('#dateofpulse').val(),               
                PluseRateMeasure: $('#txtpulserate').val(),
               
            };
            SavePulse(Formdata);
        });
        $('#btnBsugar').click(function () {

            $("#btnBsugar").text(" Processing...");
            $('#btnBsugar').prop('disabled', 'disabled');

            var Formdata = {
                SugarDate: $('#dateofBsugar').val(),
                SugarConcen: $('#txtSugarConcen').val(),
                MeasuredId: $('#ddlsugarmeasured').val(),
            };
            SaveSugar(Formdata);
        });
        $('#btnBTemp').click(function () {

            $("#btnBTemp").text(" Processing...");
            $('#btnBTemp').prop('disabled', 'disabled');

            var Formdata = {
                TempDate: $('#dateofTemp').val(),
                TempMeasure: $('#txtMeaTemp').val(),
            };
            SaveTemp(Formdata);
        });

    }
    var SaveBP = function (Formdata) {
        $.ajax({
            url: "/Vitals/InsertBloodpressure",
            data: Formdata,
            type: "post",
            datatype: JSON,
            success: function (data) {
                if (data) {
                    alert("Blood Pressure added successfully.");
                    Clear();
                    $('#divBp').hide();
                    $('#btnBpressure').text('Submit');
                    $('#btnBpressure').prop('disabled', false);
                }
                else {
                    alert("Something went wrong, please try again later.");
                    $('#btnBpressure').text('Submit');
                    $('#btnSubmit').prop('disabled', false);
                }
            },
            error: function (errResponse) {
                console.log(errResponse);
            }
        })
    }
    var SavePulse = function (Formdata) {
        $.ajax({
            url: "/Vitals/InsertPulseRate",
            data: Formdata,
            type: "post",
            datatype: JSON,
            success: function (data) {
                if (data) {
                    alert("Pulse Rate added successfully.");
                    Clear();
                    $('#divPulse').hide();
                    $('#btnpulserate').text('Submit');
                    $('#btnpulserate').prop('disabled', false);
                }
                else {
                    alert("Something went wrong, please try again later.");
                    $('#btnpulserate').text('Submit');
                    $('#btnpulserate').prop('disabled', false);
                }
            },
            error: function (errResponse) {
                console.log(errResponse);
            }
        })
    }
    var SaveSugar = function (Formdata) {
        $.ajax({
            url: "/Vitals/InsertBloodSugar",
            data: Formdata,
            type: "post",
            datatype: JSON,
            success: function (data) {
                if (data) {
                    alert("Blood Sugar added successfully.");
                    Clear();
                    $('#divSugar').hide();
                    $('#btnBsugar').text('Submit');
                    $('#btnBsugar').prop('disabled', false);
                }
                else {
                    alert("Something went wrong, please try again later.");
                    $('#btnBsugar').text('Submit');
                    $('#btnBsugar').prop('disabled', false);
                }
            },
            error: function (errResponse) {
                console.log(errResponse);
            }
        })
    }
    var SaveTemp = function (Formdata) {
        $.ajax({
            url: "/Vitals/InsertBodyTemperture",
            data: Formdata,
            type: "post",
            datatype: JSON,
            success: function (data) {
                if (data) {
                    alert("Body Temperture added successfully.");
                    Clear();
                    $('#divTemp').hide();
                    $('#btnBTemp').text('Submit');
                    $('#btnBTemp').prop('disabled', false);
                }
                else {
                    alert("Something went wrong, please try again later.");
                    $('#btnBTemp').text('Submit');
                    $('#btnBTemp').prop('disabled', false);
                }
            },
            error: function (errResponse) {
                console.log(errResponse);
            }
        })
    }
    var Clear = function () {
       
        $('#txtsystolicpressure').val('');
        $('#txtdiastolicpressure').val('');
        $('#time').val('');
        $('#dateofBp').val('');

        $('#dateofpulse').val('');
        $('#time').val('');
        $('#txtMeasure').val('');

        $('#dateofTemp').val('');
        $('#time').val('');
        $('#txtMeaTemp').val('');

        $('#dateofBsugar').val('');
        $('#time').val('');
        $('#ddlsugarmeasured').val('');
        $('#ddlchooseside').val(0);
        $('#ddlposition').val(0);
        $('#ddlsugarmeasured').val(0);
    

        $('#btnSubmit').text('Submit');
        $('#btnSubmit').prop('disabled', false);
    }
    var Alldropdown = function () {
        $.ajax({
            url: "/Vitals/RendeAlldropdown",
            type: "POST",
            success: function (data) {
                RenderChoosesideForDropdown(data['vmchoseside']);
                RenderPositionForDropdown(data['vmpositon'])
                RenderSugareMeaDropdown(data['vmmeasured'])
            },
            error: function (errResponse) {
                console.log(errResponse);
            }
        })
    }

 

    var RenderChoosesideForDropdown = function (data) {
        var Control = $("#ddlchooseside");
        Control.empty();
        $.each(data, function (index, row) {
            Control.append($("<option/>").val(row.ChooseSideId).text(row.ChooseSideName));
        })
        Control.prepend($("<option selected='selected' />").val(0).text("--Please select State--"));
    }
    var RenderPositionForDropdown = function (data) {
        var Control = $("#ddlposition");
        Control.empty();
        $.each(data, function (index, row) {
            Control.append($("<option/>").val(row.PositionId).text(row.PositionName));
        })
        Control.prepend($("<option selected='selected' />").val(0).text("Please select City"));
    };
    var RenderSugareMeaDropdown = function (data) {
        var Control = $("#ddlsugarmeasured");
        Control.empty();
        $.each(data, function (index, row) {
            Control.append($("<option/>").val(row.MeasuredId).text(row.MeasuredName));
        })
        Control.prepend($("<option selected='selected' />").val(0).text("Please select Hospital"));
    };



    return {
        Init: init
    }
}();