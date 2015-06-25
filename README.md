# kclass
组件继承和事件机制


    (function() {
        var Person = Kclass.extend({
            init: function (options) {
                console.log('initPerson');
            },
            call: function () {
                console.log('call');
            }
        });
        var Son = Person.extend({
            init: function (options) {
                this.supr(options);
                console.log('initSon');
            }
        });
        var Daughter = Person.extend({
            init: function (options) {
                this.supr(options);
                console.log('initDaughter');
            }
        });
        var Tom = new Son();  // console.log initPerson initSon
        var Lili = new Daughter(); // console.log initPerson initDaughter
    
        Tom.on('init', function () {
            console.log('initTom');
        });
        Lili.once('init', function () {
            console.log('initLili');
        });
        Tom.emit('init'); // console.log initTom
        Lili.emit('init'); // console.log  initLili
        Lili.emit('init'); // console.log nothing
        Tom.off('init'); //
        Tom.emit('init'); // console.log nothing
        console.log(Lili instanceof Person);//true
        console.log(Lili instanceof Daughter);//true
        console.log(Tom instanceof Person);//true
        console.log(Tom instanceof Son);//true
    }());
