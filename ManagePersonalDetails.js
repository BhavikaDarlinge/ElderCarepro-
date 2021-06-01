var ManagePersonalDetails = function () {
    var init = function () {
        BindEvent();
        GetGenderDropdown();
        
    };
    var BindEvent = function () {
        $('#btnCancel').click(function () {
            Clear();
        });
        $('#btnSumbit').click(function () {
            var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
            if ($('#txtfirstname').val() == "") {
                alert('First Name is Required');
                $('#txtfirstname').focus();
                return false;
            }
            else if ($('#txtlastname').val() == "") {
                alert('Last Name is Required');
                $('#txtlastname').focus();
                return false;
            }
            else if (($('#txtpass').val() == "")) {
                alert('Enter your Password.');
                $('#txtpass').focus();
                return false;
            }
            else if (($('#txtpass').val() != $('#txtconfirmpass').val())) {
                alert('Password must be match.');
                $('#txtConfirmPass').focus();
                return false;
            }
            else if ($('#dateofbirth').val() == "") {
                alert('please Enter Date of Birth');
                $('#dateofbirth').focus();
                return false;
            }
            else if ($('#ddlgender').val() <= 0) {
                alert('Please Enter Gender');
                $('#ddlgender').focus();
                return false;
            }
            else if ($('#txtmobileno').val() == "") {
                alert('Please Enter Mobile No.');
                $('#txtmobileno').focus();
                return false;
            }

            else if (!$('#txtmobileno').val().match(phoneno)) {

                alert("Please Correct 10 digit mobile number");
                $('#txtMobileNo').focus();
                return false;
            }

            var email = document.getElementById("txtemail") //$('#txtEmail');

            if (email.value.trim() != "") {
                if (IsEmail(email.value) == false) {
                    alert("Please Enter Correct Email Id");
                    $('txtEmail').focus();
                    return false;
                }
            }
            //$('#txtemail').keyup(function () {
            //    $.ajax({
            //        url: "/PersonalDetails/ChechkEmailId",
            //        datatype: "Json",
            //        type: "Post",
            //        data: { Email: $('#txtemail').val() },
            //        success: function (data) {
            //            if (data == 0) {
            //                alert("This Email Id Available....");
            //            }
            //            else {
            //                alert("This Email Id Already Exists!!!");

            //                $('#txtemail').focus();
            //            }
            //        },
            //        error: function (error) {
            //            console.log(error);
            //        }
            //    })
            //})
            var email = $('#txtemail');
            function IsEmail(email) {
                var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!regex.test(email)) {
                    return false;
                } else {
                    return true;
                }
            }

            $("#btnsumbit").text(" Processing...");
            $('#btnsumbit').prop('disabled', 'disabled');

            var Formdata = {
                FirstName: $('#txtfirstname').val(),
                LastName: $('#txtlastname').val(),
                DateOfBirth: $('#dateofbirth').val(),
                GenderId: $('#ddlgender').val(),
                Mobile: $('#txtmobileno').val(),
                Email: $('#txtemail').val(),
                Passwd: $('#txtpass').val(),
            };
            SaveData(Formdata);
        });
    };
    var SaveData = function (Formdata) {
        $.ajax({
            url: "/PersonalDetails/InsertPersonalDetails",
            data: Formdata,
            type: "post",
            datatype: JSON,
            success: function (data) {
                if (data) {
                    alert("Personal Details added successfully.");
                    Clear();
                    window.location.href = "/LoginForm/ManageLogin";
                }
                else {
                    alert("Something went wrong, please try again later.");
                    $('#btnSumbit').text('Submit');
                    $('#btnSumbit').prop('disabled', false);
                }
            },
            error: function (errResponse) {
                console.log(errResponse);
            }
        })
    };
    //var CheckEmailId = function () {
    //    $('#txtemail').keyup(function () {
    //        $.ajax({
    //            url: "/PersonalDetails/ChechkEmailId",
    //            datatype: "Json",
    //            type: "Post",
    //            data: { Email: $('#txtemail').val() },
    //            success: function (data) {
    //                if (data == 0) {
    //                    alert("This Email Id Available....");
    //                }
    //                else {
    //                    alert("This Email Id Already Exists!!!");

    //                    $('#txtemail').focus();
    //                }
    //            },
    //            error: function (error) {
    //                console.log(error);
    //            }
    //        })
    //    })
    //}
    var GetGenderDropdown = function () {
        $.ajax({
            url: "/PersonalDetails/GetGender",
            type: "POST",
            success: function (data) {
                RenderGenderforDropdown(data);
            },
            error: function (errResponse) {
                console.log(errResponse);
            }``
        });
    };
   var RenderGenderforDropdown = function (data) {
       var Control = $("#ddlgender");
       Control.empty();
       $.each(data, function (index, row) {
           Control.append($("<option/>").val(row.GenderId).text(row.GenderName));
       })
       Control.prepend($("<option selected='selected' />").val(0).text("--Select Gender--"));
   };
   var Clear = function () {
       $('#txtfullname').val(''),
       $('#dateofbirth').val(''),
       $('#ddlgender').val(0),
       $('#txtmobileno').val(''),
       $('#txtemail').val(''),
       $('#txtpass').val(''),
       $('#txtconfirmpass').val(''),    
       $('#btnSubmit').text('Submit');
   };
   return {
       Init: init
   };
}();