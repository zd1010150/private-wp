

$(document).ready(function () {
    var REGISTER_URL = "http://api.acytest.com/v1/education_travel",
        TEL_REG = /^\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/ig;
    var app = {

        init: function () {
            this.initVerticalCarousal();
            this.attachEvent();
            this.initWOW();
            this.formEvent();
            this.initPage();
        },
        initPage:function(){
          $("footer.cn-fixed-page-footer.page-footer").remove();
        },
        initVerticalCarousal:function(){
            var dpr = window.devicePixelRatio || 1;
            if(dpr == 1){
                $('<link rel="stylesheet" href="./dist/css/page.min.css">').appendTo($("head"));
                $('<script src="./dist/js/vertical_carousal.min.js"></script>').appendTo($("head"));
            }else{
                $(".vertical-carousel-indicators").remove();
            }


        },

        attachEvent: function () {
            var self = this;
            //关闭popup
            $(".popup").on("click", "button.close", function () {
                $(this).closest(".popup").fadeOut();
            }).on("click",".join-in-btn",function(){
                $(this).closest(".popup").fadeOut();
                $('html, body').animate({
                    scrollTop: $(".register-form").offset().top
                },1000);
            });
            $("body").on("click",".activey-detail",function(){
                $(".popup.term").fadeIn();
            });
        },

        formEvent:function(){
           var validateForm = function(){
                var $form = $(".register-form"),
                    $fields = $form.find("input"),
                    $phone = $fields.filter("[name=phone]"),
                    isValidate = true;
                $fields.each(function(index,item){
                    if($.trim($(item).val()).length < 1){
                        isValidate=false;
                        $(item).closest(".form-group").addClass("has-error");
                        return;
                    }else{
                        $(item).closest(".form-group").removeClass("has-error");
                    }
                });

                if(TEL_REG.test($phone.val())){
                    $phone.closest(".form-group").removeClass("has-error");
                }else{
                    $phone.closest(".form-group").addClass("has-error");
                    isValidate = false;
                }

                return isValidate;

            };
           var
               $registerForm = $(".register-form"),
               $registerResultDialog = $(".register-result"),
               $msg = $registerResultDialog.find(".register-result"),
               $confirmBtn = $registerResultDialog.find("button");
            $registerForm.on("submit",function(event){
              event.preventDefault();
              var formIsValidate = validateForm();
              if(formIsValidate){
                  $.ajax({
                      type:"post",
                      data:$(".register-form").serialize(),
                      url:REGISTER_URL,
                      dataType:"json"
                  }).done(function(data){
                        var msg,
                            SUCCESS_INFO = "您已注册成功。我们的客户经理会在1个工作日内与您联系，协助您参与活动。",
                            ERROR_INFO = "对不起，注册失败~，请重新尝试";
                        if(data.status_code && data.status_code !== 200){
                            msg = ERROR_INFO;
                            $confirmBtn.on("click",function(){
                                $registerResultDialog.fadeOut();
                                $('html, body').animate({
                                    scrollTop: $registerForm.offset().top
                                },1000);
                            });
                        }else{
                            msg = SUCCESS_INFO;
                            $confirmBtn.on("click",function(){
                                window.location.reload("true");
                            });
                        }
                      $msg.text(msg);
                      $registerResultDialog.fadeIn();
                  });
              }

          });
        },



        initWOW:function(){
            new WOW().init();
        }

    };
    app.init();
});



