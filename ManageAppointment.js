var ManageAppointment = function () {
    var init = function () {
        BindEvent();
        GetStateDropdown();
        GetCityDropdown();
        GetHospitalDropdown();
        GetDoctorDropdown();
        ShowAppointment();
    };

    var BindEvent = function () {
       
        $('#btnCancel').click(function () {
            Clear();
        });
        $('#btnSubmit').click(function () {
           
          if ($('#ddlState').val() <= 0) {
                alert('Select State');
                $('#ddlState').focus();
                return false;
            }
          else if ($('#ddlCity').val() <= 0) {
              alert('select City..');
              $('#ddlCity').focus();
              return false;
          }
          else if ($('#ddlHosp').val() <= 0)
          {
                alert('select Hopsital..');
                $('#ddlHosp').focus();
                return false;
            }
            else if ($('#ddldoc').val() <= 0) {
                alert('select Doctor');
                $('#ddldo').focus();
                return false;
            }
            else if ($('#dateofapp').val() == "") {
                alert('Enter Appointment Date');
                $('#dateofapp').focus();
                return false;
            }
            $("#btnSubmit").text(" Processing...");
            $('#btnSubmit').prop('disabled', 'disabled');

            var Formdata = {
                StateId: $('#ddlState').val(),
                CityId: $('#ddlCity').val(),
                HosId: $('#ddlHosp').val(),                     
                DoctorId: $('#ddldoc').val(),
                AppDate: $('#dateofapp').val(),
              
            };
            SaveData(Formdata);
        });

    };
    var SaveData = function (Formdata) {
        $.ajax({
            url: "/Appointment/InsertAppointment",
            data: Formdata,
            type: "post",
            datatype: JSON,
            success: function (data) {
                if (data) {
                    alert("Appointment added successfully.");
                    Clear();
                    ShowAppointment();
                    $('#btnSubmit').text('Submit');

                }
                else {
                    alert("Something went wrong, please try again later.");
                    $('#btnSubmit').text('Submit');
                    $('#btnSubmit').prop('disabled', false);
                }
            },
            error: function (errResponse) {
                console.log(errResponse);
            }
        })
    }
    var Clear = function () {
        $('#ddlState').val(0);
        $('#ddlCity').val(0);
        $('#ddlHosp').val(0);
        $('#ddldoc').val(0);
        $('#dateofapp').val('');
        
        $('#btnSubmit').text('Submit');
        $('#btnSubmit').prop('disabled', false);
    }
    var GetStateDropdown = function () {
        $.ajax({
            url: "/Appointment/GetState",
            type: "POST",
            success: function (data) {
                RenderStatesForDropdown(data);
            },
            error: function (errResponse) {
                console.log(errResponse);
            }
        })
    }
    var GetCityDropdown = function () {
        $('#ddlState').change(function () {
            $.ajax({
                url: "/Appointment/GetCity",
                type: "POST",
                data: { StateId: $('#ddlState').val() },
                success: function (data) {
                    RenderCityForDropdown(data);
                },
                error: function (errResponse) {
                    console.log(errResponse);
                }
            });
        })
    }
    var GetHospitalDropdown = function () {
        $('#ddlCity').change(function () {
            $.ajax({
                url: "/Appointment/GetHospital",
                type: "POST",
                data: { CityId: $('#ddlCity').val(), StateId: $('#ddlState').val() },
                success: function (data) {
                    RenderHospitalForDropdown(data);
                },
                error: function (errResponse) {
                    console.log(errResponse);
                }
            });
        })
    }
    var GetDoctorDropdown = function () {
        $('#ddlHosp').change(function () {
            $.ajax({
                url: "/Appointment/GetDoctor",
                type: "POST",
                data: { HospId: $('#ddlHosp').val(), CityId: $('#ddlCity').val() },
                success: function (data) {
                    RenderDoctorForDropdown(data);
                },
                error: function (errResponse) {
                    console.log(errResponse);
                }
            });
        })
    }

    var ShowAppointment = function () {   
        $.ajax({
            url: '/Appointment/ShowAppointment',
            type: 'post',
            success: function (Response) {
                var strhtml = '';
                $.each(Response, function (key, value) {          
                    strhtml += '<tr>';
                    strhtml += '<td >' + value.StateName + '</td>';
                    strhtml += '<td>' + value.CityName + '</td>';
                    strhtml += '<td >' + value.HospitalName + '</td>';
                    strhtml += '<td >' + value.DocName + '</td>';
                    strhtml += '<td >' + value.AppDateString + '</td>';
                       })                   
                    strhtml += '</tr>';
                    $('.GetAppointment').html(strhtml);
                       },
              error: function () {
                        alert('there is a problem to display details');
                    }

                });
                };

    var RenderStatesForDropdown = function (data) {
        var Control = $("#ddlState");
        Control.empty();
        $.each(data, function (index, row) {
            Control.append($("<option/>").val(row.StateId).text(row.StateName));
        })
        Control.prepend($("<option selected='selected' />").val(0).text("--Please select State--"));
    }
    var RenderCityForDropdown = function (data) {
        var Control = $("#ddlCity");
        Control.empty();
        $.each(data, function (index, row) {
            Control.append($("<option/>").val(row.CityId).text(row.CityName));
        })
        Control.prepend($("<option selected='selected' />").val(0).text("Please select City"));
    };
    var RenderHospitalForDropdown = function (data) {
        var Control = $("#ddlHosp");
        Control.empty();
        $.each(data, function (index, row) {
            Control.append($("<option/>").val(row.HosId).text(row.HospName));
        })
        Control.prepend($("<option selected='selected' />").val(0).text("Please select Hospital"));
    };
    
    var RenderDoctorForDropdown = function (data) {
        var Control = $("#ddldoc");
        Control.empty();
        $.each(data, function (index, row) {
            Control.append($("<option/>").val(row.DoctorId).text(row.DoctorName + "-" + row.DoctorTime));
        })
        Control.prepend($("<option selected='selected' />").val(0).text("Please select Doctor"));
    };

    return {
        Init: init
    }
}();