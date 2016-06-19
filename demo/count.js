function countTimer(endTime) {
    //INIT
    function countDown() {
        sec = sec - 1;

        if (sec < 0) {
            sec = 59;
            min = min - 1;
            if (min < 0) {
                min = 59;
                hour = hour - 1;
                if (hour < 0) {
                    hour = 59;
                    day -= 1;
                    //IF END
                    if (day < 0) {
                        day = 0;
                        hour = 0;
                        min = 0;
                        sec = 0;
                        return;
                    }
                    $(".countdown .day").text(day);
                }
                $(".countdown .hour").text(hour);
            }
            $(".countdown .minute").text(min);
        }
        $(".countdown .second").text(sec);
        setTimeout(countDown, 1000);
    }
    //DOING
    setTimeout(countDown, 1000);
}

function CountTimer(obj){
    if(!obj.endTime || !obj.elem) return;
    var _this = this;
    this.$elem = $(obj.elem);
    this.endTime = new Date(obj.endTime).getTime();
    if(obj.TPL){
        this.TPL = obj.TPL;
    }
    var timer = this.getTime(this.endTime);
    this.render(timer);
    this.start();
}

CountTimer.prototype = {
    $elem:null,
    endTime:null,
    TPL:'dd:hh:mm:ss',
    render:function(timer){
        timer = timer || {};
        var html = this.TPL.replace('dd',timer.day||0)
            .replace('hh',timer.hour||0)
            .replace('mm',timer.min||0)
            .replace('ss',timer.sec||0);
        this.$elem.html(html);
    },
    getTime:function(endTime){
        var timer = {};
        var nowDate = +new Date();
        var subDate = endTime - nowDate;

        if(subDate <= 0){
            return false;
        }
        timer.day = Math.floor(subDate / (1000 * 60 * 60 * 24));
        var _hour = subDate % (1000 * 60 * 60 * 24);
        timer.hour = Math.floor(_hour / (1000 * 60 * 60));
        var _min = _hour % (1000 * 60 * 60);
        timer.min = Math.floor(_min / (1000 * 60));
        var _sec = _min % (1000 * 60);
        timer.sec = Math.floor(_sec / (1000));
        return timer;
    },
    disable:function(){
        setInterval(this.handler);
    },
    start:function(){
        var _this = this;
        this.handler = setInterval(function(){
            var timer = _this.getTime(_this.endTime);

            if(!timer){
                clearInterval(_this.handler);
                _this.handler = null;
                return;
            }
            _this.render(timer);
        }, 1000);
    },
    distroy:function(){
        this.disable();
        this.$elem.remove();
    }
}

new CountTimer({
    elem:'.countdown',
    endTime:'2016-8-1'
});
