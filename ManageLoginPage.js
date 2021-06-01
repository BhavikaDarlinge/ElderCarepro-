var ManageLogin = function () {
    var init = function () {
        BindEvent();
    };
    var BindEvent = function () {
        $('#btnCancel').click(function () {
            Clear();
        });
        $('#btnLogin').click(function () {

            var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
            if ($('#txtmobile').val() == "") {
                alert('Please Enter Mobile No.');
                $('#txtmobileno').focus();
                return false;
            }

            else if (!$('#txtmobile').val().match(phoneno)) {

                alert("Please Correct 10 digit mobile number");
                $('#txtMobileNo').focus();
                return false;
            }
          
            else if (($('#txtpass').val() == "")) {
                alert('Enter your Password.');
                $('#txtpass').focus();
                return false;
            }
            $("#btnLogin").text(" Processing...");
            $('#btnLogin').prop('disabled', 'disabled');

            var Formdata = {
                Mobile: $('#txtmobile').val(),
                Passwd: $('#txtpass').val(),
            };
            SaveData(Formdata);
        });
    }
    
    var SaveData = function (Formdata) {
        $.ajax({
            url: "/LoginForm/LoginUser",
            data: Formdata,
            type: "post",
            datatype: JSON,
            success: function (data) {
                if (data) {
                    alert("Login In successfully.");
                    Clear();
                    $('#btnLogin').text('Login');
                    $('#btnLogin').prop('disabled', false);
                    window.location.href = "/Vitals/ManageVitals";
                }
                else {
                    Clear();
                    alert("Invalid UserName and Password!!")
                    $('#btnLogin').text('Login');
                }
            },
            error: function (errResponse) {
                console.log(errResponse);
            }
        })
    };
    var Clear = function () {
        $('#txtmobile').val(''),
        $('#txtpass').val('')
    }
    

    return {
        Init: init
    }
}();