// ZIM js Interactive Media modules http://zimjs.com by Dan Zen http://danzen.com (c) 2016
// Also see http://zimjs.com/code/distill to minify only the functions in your app
// free to use - donations welcome of course! http://zimjs.com/donate


////////////////  ZIM WRAP  //////////////

// zimwrap.js creates global wrapper functions for less typing

// set var zon=true before calling zim scripts to show script comments
if (typeof zon === "undefined") zon = false; // comments from zim scripts

/*--
zog(item1, item2, etc.)         ~ log

zog
global function

DESCRIPTION
Short version of console.log()
to log the item(s) to the console.
Use F12 to open your Browser console.

EXAMPLE
zog("hello", circle.x); // logs these values to the console
END EXAMPLE

PARAMETERS
item1, item2 (optional), etc. - items (expressions) to log to the console

RETURNS items it is logging separated by a space if more than one
--*///+0
// reported a bug in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1280818
// that after FF 46 binding the console did not show file and line number
// this is fixed in FF 50
var zog = console.log.bind(console);
//-0

/*--
zid(string)                     ~ id

zid
global function

DESCRIPTION
Short version of document.getElementById(string)
to access an HTML tag by its id.

EXAMPLE
zid("logo").addEventListener("click", function(){});
END EXAMPLE

PARAMETERS
string - the id of the tag you are wanting to access

RETURNS HTML tag with id of string or null if not found
--*///+1
function zid(s) {
	z_d("1");
	return document.getElementById(s);
} //-1

/*--
zss(string)                     ~ css

zss
global function

DESCRIPTION
Short version of document.getElementById(string).style
to access the style property of an HTML tag by the tag id.

EXAMPLE
zss("logo").margin = "10px";
END EXAMPLE

PARAMETERS
string - the id of the tag whose style you are wanting to access

RETURNS style property of HTML tag with id of string or undefined if not found
--*///+2
function zss(s) {
	z_d("2");
	if (document.getElementById(s)) {return document.getElementById(s).style;}
	else if (zon) zog("zim wrap - zss(): id not found");
} //-2

/*--
zgo(url, target, modal)         ~ go

zgo
global function

DESCRIPTION
Short version of either window.location.href or window.open
to open a link in the same window or a specified window.

EXAMPLE
zid("logo").addEventListener("click", function(){zgo("http://zimjs.com");})
END EXAMPLE

PARAMETERS
url - the link to use (Absolute, Relative or Virtual)
target - (default null) the string name of a window (tab) _blank for new window each time
modal - (default false) set to true to force user to close window

RETURNS null if opening in same window or reference to the window otherwise
--*///+3
function zgo(u,t,m) {
	z_d("3");
	if ((zot(t) && t != "") || t == "_self") {
		window.location.href = u;
	} else {
		if (zot(m)) { // not modal
			return window.open(u,t);
		} else {
			return window.open(u,t,"modal=yes,alwaysRaised=yes");
		}
	}
} //-3

/*--
zum(string)                     ~ num

zum
global function

DESCRIPTION
Takes the units off a string number.
Converts "10px" string from styles to number 10, for instance.
If there is no value then this will return 0.

EXAMPLE
// in HTML
<div id="logo" style="position:relative; left:10px">LOGO</div>

// in JavaScript
var left = zum(zss("logo").left); // converts 10px to the Number 10
left += 20; // adds 20 to 10
zss("logo").left = left + "px"; // assigns 30px to left style
END EXAMPLE

PARAMETERS
string - the string representation of a number eg. "10px"

RETURNS a Number
--*///+4
function zum(s) {
	z_d("4");
	if (zot(s)) return;
	return Number(String(s).replace(/[^\d\.\-]/g, ''));
} //-4

/*--
zot(value)                      ~ not

zot
global function

DESCRIPTION
Test to see if value has no value (value must exist as var or parameter)
or if value has been set to null.
Good for setting function defaults.
Really just asking if the value == null.
Often we forget exactly how to do this - it is tricky:
value === null, value == undefined, value == 0, !value DO NOT WORK.

EXAMPLE
if (zot(width)) width = 100;
// equivalent to
if (width == null) width = 100;
END EXAMPLE

PARAMETERS
value - a variable or parameter you want to see if there is no value assigned

RETURNS Boolean true if value does not exist
--*///+4.5
function zot(v) {
	return v==null; // both null and undefined match but not false or 0
}//-4.5

/*--
zop(e)                          ~ stop

zop
global function

DESCRIPTION
Stop event propagation to subsequently added existing listeners.
Must pass it e || window.event from your event function.
NOTE: this is not canceling the default action -
to cancel default action use e.preventDefault();

EXAMPLE
zid("button").addEventListener("click", function(e) {
	// do something
	zop(e||window.event);
});
END EXAMPLE

PARAMETERS
e - the event object from your event function
 	collect the event object as e and then pass in e || window.event

RETURNS null
--*///+5
function zop(e) {
	z_d("5");
	if (zot(e)) return;
	if (e.stopImmediatePropagation) e.stopImmediatePropagation();
	if (window.event) window.event.cancelBubble=true;
} //-5

/*--
zil()                           ~ still

zil
global function

DESCRIPTION
Stop keys from moving content - arrows, spacebar, pgup, pgdown, home, end.
Stop scroll wheel from moving content - scrolling the canvas for instance.
ZIM Frame does this in the full, fit and outside scale modes.
If not using Frame, then you can do this once at the start of your code.
Returns an array of references to three listeners: [keydown, mousewheel and DOMMouseScroll].
Use these to removeEventListeners.
The arrows, etc, still work but just not their default window behaviour.

EXAMPLE
// at the top of your code
var listenersArray = zill();
// key and mousewheel arrows, spacebar, etc.
// will have their default actions stopped until you remove the listeners:
// window.removeEventListener("keydown", listenersArray[0]); // etc.
END EXAMPLE

RETURNS an Array
--*///+6
function zil() {
	z_d("6");
	var a = function(e) {if (!e) e = event; if (e.keyCode && (e.keyCode >= 32 && e.keyCode <= 40)) e.preventDefault();}
	var b = function(e) {if (!e) e = event; e.preventDefault();}
	var c = b;
	window.addEventListener("keydown", a);
	window.addEventListener("mousewheel", b);
	window.addEventListener("DOMMouseScroll", c);
	return [a, b, c];
} //-6

/*--
zet(selector)                   ~ set

zet
global function

DESCRIPTION
Uses document.querySelectorAll() to get a list of tags.
Returns a ZIM Zet object which can be used to add events or styles to the set.

EXAMPLE
zet(".class").on("click", function(){}); // would add function event to all tags with the class
zet("p").css("color", "goldenrod"); // would make the text of all paragraphs goldenrod
zet("#test").css({color:"red", "backgound-color":"blue", paddingLeft:"20px"})
END EXAMPLE

PARAMETERS
selector -  a CSS query selector such as a class, id, tag, or multiple selectors separated by commands
	can also be complex selectors suchs as ".class img"

METHODS (on the returned Zet object)
zet(selector).on(type, function) - a shortcut for addEventListener() and will be added to all tags matching the selector
zet(selector).off(type, function) - a shortcut for removeEventListener() and will be remove from all tags matching the selector
zet(selector).css(property, value) - gets and sets styles
	- gets the first programmatic property if a single string property is passed
	- sets the property to the value on each of the Zet's tags from the selector passed to zet()
	- if an object of properties and values is passed as the single parameter then sets all these properties
	- NOTE: style names do not need quotes unless the dash is used - so camelCase does not require quotes
	- NOTE: remember that commas are used for objects - not the semi-colon as in CSS

PROPERTIES  (on the returned Zet object)
tags - an HTML tag list

RETURNS Zet object with on(), off(), css() methods and tags property (HTML tag list)
--*///+6.1
function zet(selector) {
	z_d("6.1");
	function Zet() {
		var that = this;
		this.on = function(type, call) {
			if (zot(selector) || zot(type) || zot(call)) return;
			var tags = that.tags;
			for (var i=0; i<tags.length; i++) {
				tags[i].addEventListener(type, call);
			}
		}
		this.off = function(type, call) {
			if (zot(selector) || zot(type) || zot(call)) return;
			var tags = that.tags;
			for (var i=0; i<tags.length; i++) {
				tags[i].removeEventListener(type, call);
			}
		}
		Object.defineProperty(that, 'tags', {
			get: function() {
				if (zot(selector)) return [];
				if (typeof selector == 'string' || selector instanceof String) {
					return document.querySelectorAll(selector);
				} else { // selector is already an object - assume a tag
					if (typeof (selector).innerHTML == "string") return [selector];
					return [];
				}
			},
			set: function(t) {
			}
		});
		this.css = function(property, value) {
			// if property is object then assign all props in object
			var tags = that.tags;
			for (var i=0; i<tags.length; i++) {
				if (arguments.length == 1 && arguments[0].constructor === {}.constructor) {
					for (var p in property) {
						tags[i].style[p] = property[p];
					}
				} else if (arguments.length == 1) {
					return that.tags[0].style[property];
				} else {
			    	tags[i].style[property] = value;
				}
			}
		}
	}
	return new Zet();
} //-6.1

/*--
zob(func, args, sig, scope)     ~ object

zob
global function

DESCRIPTION
A system to build functions or classes that allow traditional parameters
or a configuration object passed in as a single parameter.
The configuration object has property names that match the function arguments.

To use zob on your own functions, pass in a function and the function's arguments
and insert zob into first line of your function as shown below.
Replace yourFunction with a reference to your function but keep arguments as is.

EXAMPLE
function test(a,b,c){
	var duo; if (duo = zob(yourFunction, arguments)) return duo;
};
test(1,null,3); // traditional parameters in order
test({a:1,c:3}); // configuration object with zob
END EXAMPLE

NOTE: if you are minifying the file then you need to do an extra step
add a string version of the signature of your function above the duo call
then pass the signature in as a parameter to zob()

EXAMPLE
var sig = "a,b,c";
var duo; if (duo = zob(yourFunction, arguments, sig)) return duo;
END EXAMPLE

NOTE: if you are running the function as a constructor with the new keyword
then you need to pass in this (keyword) as the last parameter (sig can be null)
this allows zob() to test to see if we need to rerun the function as a constructor

EXAMPLE
var duo; if (duo = zob(yourFunction, arguments, sig, this)) return duo;
END EXAMPLE

many of the ZIM functions and classes use this "DUO" technique
the documentation for parameters will tell you if they support DUO
works also with JS6 default parameter values

PARAMETERS
func - reference to the function you want to use params or a config object with
args - reference to the arguments property of the function (literally, use "arguments" with no quotes)
sig - (default null) a string listing of the parameters just how they are in the () not including the ()
	required if you are minifying the file as minifying changes the signature
scope - (default null) reference to this (litterally, use "this" without the quotes)
	required if the function is being run with the new keyword

RETURNS um... a Boolean
--*///+7
function isDUO(a) {return a.length == 1 && a[0].constructor === {}.constructor;}
function zob(func, args, sig, scope) {
	if (isDUO(args)) {
		z_d("7");
		var zp = args[0];
		var za = (zot(sig))?func.toString().split(/\n/,1)[0].match(/\((.*)\)/)[1].replace(/\s+/g,"").split(","):sig.replace(/\s+/g,"").split(",");
		var zv = []; var zi; var zt;
		for (zi=0; zi<za.length; zi++) {zt=za[zi].split("=")[0]; za[zi]=zt; zv.push(zp[zt]);}
		for (zi in zp) {if (za.indexOf(zi)<0) {if (zon) zog(func,"bad argument "+zi);}};
		var zr; if (zr=(func.prototype.isPrototypeOf(scope))?new (func.bind.apply(func,[null].concat(zv)))():func.apply(null,zv)) {return zr;} else {return true;}
	}
}//-7

// the above functions are global for quick usage
// start the zim module pattern - from here on, everything is stored on the zim namespace

var zim = function(zim) {


////////////////  ZIM CODE  //////////////

// zimcode.js adds some general code functionality along with Browser and DOM code
// some of these are common Web solutions over the years (sorry for lack of credit)

/*--
zim.shuffle = function(array)

shuffle
zim function

DESCRIPTION
Randomly shuffles elements of an array.
Actually changes the original array (and also returns it).

EXAMPLE
var array = ["happy", "sad", "spooked"];
var randomFromArray = zim.shuffle(array)[0];
// this will be randomized each time it is run
END EXAMPLE

EXAMPLE
var array = zim.shuffle(["happy", "sad", "spooked"]);
for (var i=0; i<array.length) zog(array[i]);
// this will get random and unique elements of the array
END EXAMPLE

PARAMETERS
array - the Array to shuffle

RETURNS the modified Array
--*///+8
	zim.shuffle = function(array) {
		z_d("8");
		if (zot(array)) return;
		var i = array.length, j, temp;
		if (i == 0) return array;
		while(--i) {
			j = Math.floor(Math.random()*(i+1));
			temp=array[i];
			array[i]=array[j];
			array[j]=temp;
		}
		return array;
	}//-8

/*--
zim.rand = function(a, b, integer)

rand
zim function

DESCRIPTION
Returns a random integer between and including a and b if integer is true.
Returns a random number (with decimals) including a and up to b but not b if integer is false.
b is optional and if left out will default to 0 (includes 0).
integer is a boolean and defaults to true.
If a and b are 0 then just returns Math.random().

EXAMPLE
var speed = zim.rand(10,20); // 10, 11, 12... 18, 19 or 20

var colors = ["blue", "yellow", "green"];
var color = colors[zim.rand(colors.length-1)]; // note the length-1

// the equivalent of:
var color = colors[Math.floor(Math.random()*colors.length)];

// OR a technique I often use without using zim.rand():
// but zim.rand() is probably better
var color = zim.shuffle(colors)[0];
END EXAMPLE

PARAMETERS
a - the first Number for the range
	if a and b are not provided, zim.rand() acts like Math.random()
	if parameter b is not provided, rand will use range 0 to and including a
b - (default 0) second Number for the range
	it does not matter if a>b or a<b
integer - (default true) set to false to include decimals in results
	if false, range will include decimals up to but not including the highest number

RETURNS a Number
--*///+9
	zim.rand = function(a, b, integer) {
		z_d("9");
		if (zot(integer)) integer = true;
		if (zot(b)) b = 0;
		if (zot(a)) a = 0;
		if (integer) if (a>b) {a++;} else if (b>a) {b++;}
		var r;
		if (a == 0 && b == 0) {
			return Math.random();
		} else if (b == 0) {
			r = Math.random()*a;
		} else {
			r = Math.min(a,b) + Math.random()*(Math.max(a,b)-Math.min(a,b));
		}
		if (integer) {
			return Math.floor(r);
		} else {
			return r;
		}
	}//-9

/*--
zim.copy = function(obj)

copy
zim function

DESCRIPTION
Copies arrays and basic objects:
http://stackoverflow.com/users/35881/a-levy
If you have var obj = {prop:"val"};
and then try and copy obj to obj2 like so: obj2 = obj;
then obj2 and obj refer to the same object.
This means that after obj.prop = "new"; both obj.prop and obj2.prop would be "new".
zim.copy(obj) returns a new object so both will work independently
and after obj.prop = "new"; obj2.prop would still be "val".

EXAMPLE
var obj = {hair:blue, cars:["audi", "honda"]};
var cop = zim.copy(obj);
cop.hair = "green";
zog(obj.hair, obj.cop); // blue, green
obj.cars.push("vw");
zog(obj.cars.length, cop.cars.length); // 3, 2
END EXAMPLE

PARAMETERS
obj - the object to copy

RETURNS a new Object
--*///+10
	zim.copy = function(obj) {
		z_d("10");
		if (obj==null || typeof obj != 'object') return obj;
		if (obj instanceof Array) {
			return obj.slice(0);
		}
		if (obj instanceof Object) {
			copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = zim.copy(obj[attr]);
			}
			return copy;
		}
	}//-10

/*--
zim.arraysEqual = function(a, b, strict)

arraysEqual
zim function

DESCRIPTION
Finds out if arrays are same (including nested arrays).
Works for arrays with strings and numbers (not necessarily other objects).
(Slightly modified Evan Steinkerchnerv & Tomas Zato)

EXAMPLE
var one = [1,2,"wow",[3,4]];
var two = [1,2,"wow",[3,4]];
zog(zim.arraysEqual(one, two)); // true
one[3][1] = 5;
zog(zim.arraysEqual(one, two)); // false
END EXAMPLE

PARAMETERS
a, b - the arrays to check to see if they are equal
strict - (default true) set to false so order in arrays does not matter

RETURNS a Boolean
--*///+11
	zim.arraysEqual = function(a, b, strict) {
		z_d("11");
		if (zot(a) || zot(b)) return false;
		if (zot(strict)) strict = true; // must be the same order
		if (a.length != b.length) return false;

		for (var i = 0; i < a.length; i++) {
			if (a[i] instanceof Array && b[i] instanceof Array) {
				if (!zim.arraysEqual(a[i], b[i], strict))	return false;
			}
			else if (strict && a[i] != b[i]) {
				return false;
			}
			else if (!strict) {
				return zim.arraysEqual(a.sort(), b.sort(), true);
			}
		}
		return true;
	}//-11

/*--
zim.merge = function(objects)

merge
zim function

DESCRIPTION
Merges any number of objects {} you pass in as parameters.
Overwrites properties if they have the same name.
Returns a merged object with original objects kept intact.

EXAMPLE
var one = {food:"chocolate"};
var two = {drink:"milk"};
var tri = zim.merge(one, two);
zog(tri.food, tri.drink); // chocolate, milk
END EXAMPLE

PARAMETERS
objects - a list of objects (any number) to merge together

RETURNS a new Object
--*///+12
	zim.merge = function() {
		z_d("12");
		var obj = {}; var i; var j;
		for (i=0; i<arguments.length; i++) {
			for (j in arguments[i]) {
				if (arguments[i].hasOwnProperty(j)) {
					obj[j] = arguments[i][j];
				}
			}
		}
		return obj;
	}//-12

/*--
zim.decimals = function(num, places)

decimals
zim function

DESCRIPTION
Rounds number to the number of decimal places specified by places.
Negative number places round to tens, hundreds, etc.

EXAMPLE
var score = 1.234;
score = zim.decimals(score);
zog(score); // 1.2
zog(zim.decimals(1.8345, 2)); // 1.83
zog(zim.decimals(123,-1)); // 120
END EXAMPLE

PARAMETERS
num - the Number to operate on
places - (default 1) how many decimals to include (negative for left of decimal place)

RETURNS a rounded Number
--*///+13
	zim.decimals = function(num, places) {
		z_d("13");
		if (zot(num) || num==0) return 0;
		if (zot(places)) places = 1;
		return Math.round(num*Math.pow(10, places))/Math.pow(10, places);
	}//-13

/*--
zim.Damp = function(startValue, damp)

Damp
zim class

DESCRIPTION
Damping emulates things slowing down due to friction.
The movement heads towards the right value and looks organic.
This is similar if not the same as easing out when tweening.
Create your Damp object outside an interval or Ticker
then inside an interval or ticker call the convert method.

EXAMPLE
var d = new zim.Damp(parameters);
setInterval(function() {
	dampedValue = d.convert(desiredValue);
}, 100);
END EXAMPLE

you would then apply that desired value to a property such as x or y or scale
if you want to do both x and y then you need two Damp objects
and two convert calls (you can do both in one interval or ticker)

EXAMPLE
var circle = new zim.Circle();
circle.center(stage);
var dampX = new zim.Damp(circle.x);
var dampY = new zim.Damp(circle.y);
// start moving once mouse enters stage
// this event will only run once (the last parameter is true)
stage.on("stagemousemove", start, null, true);
function start() {
	zim.Ticker.add(function() {
		circle.x = dampX.convert(stage.mouseX);
		circle.y = dampY.convert(stage.mouseY);
	}, stage);
}
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
startValue - (default 0) start object at this value and then start damping
damp - (default .1) the damp value with 1 being no damping and 0 being no movement

METHODS
convert() - converts a value into a damped value
immediate() - immediately goes to value

PROPERTIES
damp - can dynamically change the damping (usually just pass it in as a parameter to start)
lastValue - setting this would go immediately to this value (would not normally use)
--*///+14
	zim.Damp = function(startValue, damp) {
		z_d("14");
		var sig = "startValue, damp";
		var duo; if (duo = zob(zim.Damp, arguments, sig, this)) return duo;
		this.lastValue = (zot(startValue)) ? 0 : startValue;
		this.damp = (zot(damp)) ? .1 : damp;
	}
	zim.Damp.prototype.convert = function(desiredValue) {
		return this.lastValue = this.lastValue + (desiredValue - this.lastValue) * this.damp;
	}
	zim.Damp.prototype.immediate = function(desiredValue) {
		this.lastValue = desiredValue;
	}//-14

/*--
zim.Proportion = function(baseMin, baseMax, targetMin, targetMax, factor, targetRound)

Proportion
zim class

DESCRIPTION
Proportion converts an input value to an output value on a different scale.
(sometimes called a map() function)
For instance, like a slider controlling the scale of an object or sound volume.
Make a Proportion object and then in an interval, ticker or event,
convert the base value to the target value using the convert method.

EXAMPLE
frame.loadAssets("mySound.mp3");
frame.on("complete", function() {
	var sound = frame.asset("mySound.mp3").play();
	var p = new zim.Proportion(0, 10, 0, 1);
	var dial = new zim.Dial(); // default range of 0 to 10
	dial.currentValue = 10;
	dial.on("change", function(){
		sound.volume = p.convert(dial.currentValue);
	}); // end of dial change
}); // end sound loaded
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
baseMin - min for the input scale (say x value)
baseMax - max for the input scale (say x value)
targetMin - (default 0) min for the output scale (say volume)
targetMax - (default 1) max for the output scale (say volume)
factor (default 1) is going the same direction and -1 is going in opposite direction
targetRound (default false) set to true to round the converted number

METHODS
convert(input) - will return the output property (for instance, a volume)

NOTE: the object always starts by assuming baseMin as baseValue
just call the convert method right away if you want it to start at a different baseValue
for instance, if your slider went from 100 to 500 and you want to start at half way
make the object and call p.convert(300); on the next line
--*///+15
	zim.Proportion = function(baseMin, baseMax, targetMin, targetMax, factor, targetRound) {

		var sig = "baseMin, baseMax, targetMin, targetMax, factor, targetRound";
		var duo; if (duo = zob(zim.Proportion, arguments, sig, this)) return duo;
		z_d("15");
		// factor - set to 1 for increasing and -1 for decreasing
		// round - true to round results to whole number
		if (zot(targetMin)) targetMin = 0;
		if (zot(targetMax)) targetMax = 1;
		if (zot(factor)) factor = 1;
		if (zot(targetRound)) targetRound = false;

		// proportion
		var baseAmount;
		var proportion;
		var targetAmount;

		baseAmount = baseMin; // just start at the min otherwise call immediate(baseValue);

		this.convert = function(baseAmount) {
			if (isNaN(baseAmount)) {return;}
			baseAmount = Math.max(baseAmount, baseMin);
			baseAmount = Math.min(baseAmount, baseMax);
			proportion = (baseAmount - baseMin) / (baseMax - baseMin);
			if (factor > 0) {
				targetAmount = targetMin + (targetMax-targetMin) * proportion;
			} else {
				targetAmount = targetMax - (targetMax-targetMin) * proportion;
			}
			if (targetRound) {targetAmount = Math.round(targetAmount);}
			return targetAmount;
		}
	}//-15

/*--
zim.ProportionDamp = function(baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound)

ProportionDamp
zim class

DESCRIPTION
ProportionDamp converts an input value to an output value on a different scale with damping.
Works like Proportion Class but with a damping parameter.
Damping needs constant calculating so do not put in mousemove event.
The below example scales the circle based on the mouse height.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage); // center method added in ZIM 4TH
var pd = new zim.ProportionDamp(0, stageH, 0, 5, .2);
zim.Ticker.add(function() {
	circle.scale(pd.convert(stage.mouseH)); // scale method added in ZIM 4TH
}, stage);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
baseMin - min for the input scale (say x value)
baseMax - max for the input scale (say x value)
targetMin - (default 0) min for the output scale (say volume)
targetMax - (default 1) max for the output scale (say volume)
damp - (default .1) the damp value with 1 being no damping and 0 being no movement
factor (default 1) is going the same direction and -1 is going in opposite direction
targetRound (default false) set to true to round the converted number

METHODS
convert(input) - converts a base value to a target value
immediate(input) - immediately sets the target value (no damping)
dispose() - clears interval

PROPERTIES
damp - can adjust this dynamically (usually just pass it in as a parameter to start)

NOTE: the object always starts by assuming baseMin as baseValue
if you want to start or go to an immediate value without easing then
call the pd.immediate(baseValue) method with your desired baseValue (not targetValue)
--*///+16
	zim.ProportionDamp = function(baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound) {

		var sig = "baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound";
		var duo; if (duo = zob(zim.ProportionDamp, arguments, sig, this)) return duo;
		z_d("16");
		// damp - can be changed via damp get/set method property
		// factor - set to 1 for increasing and -1 for decreasing
		// round - true to round results to whole number
		// zot() is found in danzen.js (the z version of not)
		if (zot(targetMin)) targetMin = 0;
		if (zot(targetMax)) targetMax = 1;
		if (zot(damp)) damp = .1;
		if (zot(factor)) factor = 1;
		if (zot(targetRound)) targetRound = false;

		this.damp = damp; // want to expose as a property we can change
		var that = this;

		// proportion
		var baseAmount;
		var proportion;
		var targetDifference;
		var targetAmount;

		// damping
		var differenceAmount;
		var desiredAmount=0;
		var lastAmount = 0;

		baseAmount = baseMin; // just start at the min otherwise call immediate(baseValue);
		lastAmount = targetMin;

		var interval = setInterval(calculate, 20);

		function calculate() {
			if (isNaN(baseAmount)) {return;}

			baseAmount = Math.max(baseAmount, baseMin);
			baseAmount = Math.min(baseAmount, baseMax);

			proportion = (baseAmount - baseMin) / (baseMax - baseMin);
			targetDifference = targetMax - targetMin;

			if (factor > 0) {
				targetAmount = targetMin + targetDifference * proportion;
			} else {
				targetAmount = targetMax - targetDifference * proportion;
			}

			desiredAmount = targetAmount;
			differenceAmount = desiredAmount - lastAmount;
			lastAmount += differenceAmount*that.damp;
		}

		this.immediate = function(n) {
			that.convert(n);
			calculate();
			lastAmount = targetAmount;
			if (targetRound) {lastAmount = Math.round(lastAmount);}
		}

		this.convert = function(n) {
			baseAmount = n;
			if (targetRound) {
				return Math.round(lastAmount);
			} else {
				return lastAmount;
			}
		}

		this.dispose = function() {
			clearInterval(interval);
			return true;
		}
	}//-16


/*--
zim.Dictionary = function()

Dictionary
zim class

DESCRIPTION
An object that uses objects as keys to give values.
Similar to an object literal with properties except the property names are objects instead of strings.
JavaScript currently does not have a dictionary, but other languages do.

EXAMPLE
var o = {test:"test"};
var f = function(w) {zog(w)};
var c = new zim.Circle();
var d = new zim.Dictionary();
d.add(o, 1); d.add(f, 2); d.add(c, f);
zog(d.at(o)); // 1
zog(d.at(f)); // 2
d.at(c)("hello"); // hello
d.remove(o); // to clear o
zog(d.length); // 2
END EXAMPLE

METHODS
add(object, value) - adds a value that can be retrieved by an object reference
at(object) - retrieves the value stored at the object (or returns null if not there)
remove(object) - removes the object and its value from the Dictionary
dispose() - deletes object

PROPERTIES
length - the number of items in the Dictionary
objects - array of keys
values - array of values synched to keys
--*///+17
	zim.Dictionary = function() {
		z_d("17");
		this.length = 0;
		var objects = this.objects = []; // store objects and values in synched arrays
		var values = this.values = [];

		this.add = function(o,v) {
			if (zot(o)) return;
			objects.push(o);
			values.push(v);
			this.length++;
		}

		this.at = function(o) {
			if (zot(o)) return;
			var i = objects.indexOf(o);
			if (i > -1) return values[i];
			return null;
		}

		this.remove = function(o) {
			if (zot(o)) return;
			var i = objects.indexOf(o);
			if (i > -1) {
				objects.splice(i,1);
				values.splice(i,1);
				this.length--
			}
		}

		this.dispose = function() {
			objects = null;
			values = null;
			this.length = null;
			return true;
		}
	}//-17

/*--
zim.swapProperties = function(property, objA, objB)

swapProperties
zim function

DESCRIPTION
Pass in a property as a string and two object references
and this function will swap the property values.

EXAMPLE
// exchanges the x position of two ZIM circles
zim.swapProperties("x", circle1, circle2); stage.update();
END EXAMPLE

PARAMETERS
property - a String of the property to swap values eg. "alpha"
objA, objB - the objects on which to swap properties

RETURNS Boolean indicating success
--*///+17.1
	zim.swapProperties = function(property, objA, objB) {
		z_d("17.1");
		if (zot(objA) || zot(objB) || zot(objA[property]) || zot(objB[property])) return false;
		var temp = objB[property];
		objB[property] = objA[property];
		objA[property] = temp;
		return true;
	}//-17.1

	// DOM CODE

/*--
zim.swapHTML = function(idA, idB)

swapHTML
zim function

DESCRIPTION
Pass in two tag ids as strings and this function will swap their innerHTML content.
The content (including nested tags) will be swapped.

EXAMPLE
// exchanges the content of two divs called question and answer
zim.swapHTML("question","answer");
END EXAMPLE

PARAMETERS
idA, idB - String names of the tag id with which to swap innerHTML values

RETURNS Boolean indicating success
--*///+17.2
	zim.swapHTML = function(idA, idB) {
		z_d("17.2");
		return zim.swapProperties("innerHTML", zid(idA), zid(idB));
	}//-17.2

/*--
zim.scrollX = function(num, time)

scrollX
zim function

DESCRIPTION
This function gets or sets how many pixels from the left the browser window has been scrolled.
If num is provided then the function scrolls the window to this x position.
If num and time are provided it animates the window to the x position in time milliseconds.

EXAMPLE
// hide the logo if the page is scrolled left more than 200 pixels
if (zim.scrollX < -200) zss("logo").display = "none";
END EXAMPLE

PARAMETERS
num - (default null) optional scroll position to go to (probably negative)
time - (default 0) time in milliseconds to take to go to the num position

RETURNS a Number
--*///+18
	zim.scrollX = function(num, time) {
		z_d("18");
		return zim.abstractScroll("X", "Left", num, time);
	}//-18


/*--
zim.scrollY = function(num, time)

scrollY
zim function

DESCRIPTION
This function gets or sets how many pixels from the top the browser window has been scrolled.
If num is provided then the function scrolls the window to this y position.
If num and time are provided it animates the window to the y position in time milliseconds.

EXAMPLE
// animate the scroll position down 100 pixels in half a second
zim.scrollY(zim.scrollY()-100, 500);
END EXAMPLE

PARAMETERS
num - (default null) optional scroll position to go to (probably negative)
time - (default 0) time in milliseconds to take to go to the num position

RETURNS a Number
--*///+19
	zim.scrollY = function(num, time) {
		z_d("19");
		return zim.abstractScroll("Y", "Top", num, time);
	}//-19

	//+20
	zim.abstractScroll = function(dir, side, num, time) {
		z_d("20");
		var perpend = (dir == "X") ? "Y" : "X"; // perpendicular direction
		if (zot(num)) {
			var safari = 0;
			var browser=navigator.appName;
			var navindex=navigator.userAgent.indexOf('Safari');
			if (navindex != -1 || browser=='Safari') {
				var safari = 1;
			}
			if (!safari && document.compatMode == 'CSS1Compat') {
				return document.documentElement["scroll"+side];
			} else {
				return document.body["scroll"+side];
			}
		} else if (zot(time)) {
			window.scrollTo(zim["scroll"+perpend](), num);
		} else {
			var interval = 50;
			if (time < interval) time = interval;
			var steps = time/interval;
			var current = zim["scroll"+dir]();
			var amount = num - current;
			var diff = amount/steps;
			var count = 0;
			var scrollInterval = setInterval(function() {
				count++;
				current+=diff;
				window.scrollTo(zim["scroll"+perpend](), current);
				if (count >= steps) {
					window.scrollTo(zim["scroll"+perpend](), num);
					clearInterval(scrollInterval);
				}
			}, interval);
		}
		return num;
	}//-20

/*--
zim.windowWidth = function()

windowWidth
zim function

DESCRIPTION
Returns the width of a window.
(window.clientWidth or window.innerWidth)

EXAMPLE
if (zim.windowWidth() < 500) zss("related").display = "none";
END EXAMPLE

RETURNS a Number
--*///+21
	zim.windowWidth = function() {
		z_d("21");
		return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
	}//-21

/*--
zim.windowHeight = function()

windowHeight
zim function

DESCRIPTION
Returns the height of a window.
(window.clientHeight or window.innerHeight)

EXAMPLE
if (zim.windowHeight() > 1000) zgo("big.html");
END EXAMPLE

RETURNS a Number
--*///+22
	zim.windowHeight = function() {
		z_d("22");
		return isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
	}//-22

/*--
zim.urlEncode = function(string)

urlEncode
zim function

DESCRIPTION
Matches PHP urlencode and urldecode functions
for passing data on end of URL.
NOTE: only encode values of key=value pairs (not keys and not both keys and values)
NOTE: JSON automatically encodes and decodes

EXAMPLE
var motto = "good = life & life = now";
zgo("submit.php?motto="+zim.urlEncode(motto));
END EXAMPLE

PARAMETERS
string - a value to URL encode (space to plus, etc.)

RETURNS a String
--*///+23
	zim.urlEncode = function(s) {
		z_d("23");
		var s = (s + '').toString();
		return encodeURIComponent(s).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	}//-23

/*--
zim.urlDecode = function(string)

urlDecode
zim function

DESCRIPTION
Matches PHP urlencode and urldecode functions
for receiving raw data from a source that URLencodes.
NOTE: JSON automatically encodes and decodes

EXAMPLE
var pairs = command.split("&");
var motto = zim.urlDecode(pairs[0].split("=")[1]);
END EXAMPLE

PARAMETERS
string - a URLencoded String to decode

RETURNS a String
--*///+24
	zim.urlDecode = function(s) {
		z_d("24");
		 return decodeURIComponent((s + '').replace(/\+/g, '%20'));
	}//-24

/*--
zim.setCookie = function(name, value, days)

setCookie
zim function

DESCRIPTION
Sets an HTML cookie to remember some user data your site has set over time.
If no days, it will be a session cookie (while browser is open).

EXAMPLE
var visits = zim.getCookie("visits");
if (zot(visits)) visits = 0;
zim.setCookie("visits", ++visits);
END EXAMPLE

PARAMETERS
name - a String name for your cookie
value - a String value that you want to store
days - (default 0) for how many days do you want to store the cookie

ALSO: see zim.getCookie and zim.deleteCookie

RETURNS a Boolean indicating success
--*///+25
	zim.setCookie = function(name, value, days) {
		z_d("25");
		if (zot(name) || zot(value)) return;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name+"="+escape(value)+expires+"; path=/";
		return true;
	}//-25

/*--
zim.getCookie = function(name)

getCookie
zim function

DESCRIPTION
Gets an HTML cookie that you have previously set.

EXAMPLE
var visits = zim.getCookie("visits");
if (zot(visits)) visits = 0;
zim.setCookie("visits", ++visits);
END EXAMPLE

PARAMETERS
name - the String name of your stored cookie

ALSO: see zim.setCookie and zim.deleteCookie

RETURNS a String or undefined if not found
--*///+26
	zim.getCookie = function(name) {
		z_d("26");
		var outer = document.cookie.split(/;\s*/);
		var cookies = new Array();
		var inner;
		for (i=0; i<outer.length; i++) {
			inner = outer[i].split("=");
			cookies[inner[0]] = inner[1];
		}
		if (typeof cookies[name] == 'undefined') return undefined;
		return unescape(cookies[name]);
	}//-26

/*--
zim.deleteCookie = function(name)

deleteCookie
zim function

DESCRIPTION
Deletes an HTML cookie.

EXAMPLE
zim.deleteCookie("visits"); // clears the cookie
END EXAMPLE

PARAMETERS
name - the String name of your stored cookie to delete

ALSO: see zim.setCookie and zim.getCookie

RETURNS a Boolean indicating success
--*///+27
	zim.deleteCookie = function(name) {
		z_d("27");
		if (zot(zim.getCookie(name))) return false;
		zim.setCookie(name,"",-1);
		return true;
	}//-27

/*--
zim.mobile = function(orientation)

mobile
zim function

DESCRIPTION
Detects if app is on a mobile device - if so, returns the mobile device type:
android, ios, blackberry, windows, other (all which evaluate to true) else returns false.
orientation defaults to true and if there is window.orientation then it assumes mobile
BUT this may return true for some desktop and laptop touch screens
so you can turn the orientation check off by setting orientation to false.
If orientation is set to false the check may miss non-mainstream devices
The check looks at the navigator.userAgent for the following regular expression:
/ip(hone|od|ad)|android|blackberry|nokia|opera mini|mobile|phone|nexus|webos/i
Microsoft mobile gets detected by nokia, mobile or phone.

EXAMPLE
if (zim.mobile()) {
	var pane = new zim.Pane(stage, 300, 200, "Desktop Only");
	pane.show();
}
END EXAMPLE

PARAMETERS
orientation - (default true) uses window.orientation property to determine mobile
	this may call certain touch screens mobile
	but setting to false uses a test on mobile names which could be incomplete

RETURNS a String or false
--*///+28
	zim.mobile = function(orientation) {
		z_d("28");
		if (zot(orientation)) orientation = true;
		if (/ip(hone|od|ad)/i.test(navigator.userAgent)) return "ios";
		if (/android|nexus/i.test(navigator.userAgent)) return "android";
		if (/blackberry/i.test(navigator.userAgent)) return "blackberry";
		if (/nokia|phone|mobile/i.test(navigator.userAgent)) return "windows";
		if (/opera mini|webos/i.test(navigator.userAgent)) return "other";
		if (orientation && window.orientation !== undefined) return true;
		return false;
	}//-28

/*--
zim.async = function(url, callback)

async
zim function

DESCRIPTION
A way to send data back and forth to a server script without reloading the HTML page.
(like AJAX but without the bother)
Uses a dynamic script call with an optional callback (cross domain calls are okay)
also known as JSON-P pattern but JSON is unnecessary - note, no JSON in the examples below.
Pass a url to the server script (ie. php or node page)
and an optional callback function that you define in your code (cannot be an anonymous function).
zim.async will automatically add a random number to the end of your script call to defeat cache.

EXAMPLE
// existing service:
// assuming that we have a callback function called test as shown below
zim.async("http://ip-api.com/json?callback=zim.async.test",test);
function test(data) {zog(data.country);}
// note that the callback we pass the service is zim.async.test not just test
// this allows zim to handle scope issues and garbage collect the dynamic script when done
// if the service passes JSON you may need to JSON.decode() the data being returned
// this service passes an object literal not JSON despite its file name
END EXAMPLE

EXAMPLE
// CLIENT - your own server script:
// assuming we have a callback function called myFunction as shown below
zim.async("http://yourserver.com/script.php?id=72&name=dan", myFunction);
function myFunction(data){zog(data);}

// SERVER - your script must output the following format as a string:
// "zim.async.myFunction(somedata)"
// in the php file we would use:
echo "zim.async.myFunction('success')";
// to return an object literal with nodejs express for example, you would use:
res.send('zim.async.myFunction({list:[1,2,3], name:"whatever"})');
// the data parameter in the myFunction function defined earlier would be an object literal
// we could then do zog(data.list[0]) to log the value 1, etc.
END EXAMPLE

PARAMETERS
url - url to the server script (ie. php or node page)
callback - (default null) callback function that you define in your code (cannot be an anonymous function)

calling the return function on zim.async does two things:
1. it handles scope issues so we can find your callback function
2. it handles garbage collection to remove the dynamic script tag that was used
if you do not specify a callback function then just send "" back from your server script
NOTE: we have experienced duplicate script calls if nothing is sent back

RETURNS undefined
--*///+29
	zim.async = function (url, callback) {
		z_d("29");
		if (zot(url)) return;
		var tag = document.createElement("script");
		if (callback) {
			var n = callback.toString().split(/\n/,1)[0].match(/^function\s?([^\s(]*)/)[1];
			// create callback bridge on async function object
			zim.async[n] = function() { // closure to access tag on callback bridge
				var t = tag;
				return function(d){
					// remove the script tag and do the callback
					if (t) t.parentNode.removeChild(t); t = null;
					callback(d);
				}
			}();
		} else {
			if (zim.async.z_s && zim.async.z_s.parentNode) zim.async.z_s.parentNode.removeChild(zim.async.z_s); // keep overwriting same script tag if no callback
			zim.async.z_s = tag;
		}
		if (!url.match(/\?/)) url += "?";
		tag.setAttribute("src", url + "&r="+Math.random());
		document.getElementsByTagName("head")[0].appendChild(tag);
	}//-29


////////////////  ZIM CREATE  //////////////

// zimcreate.js adds functionality to CreateJS for digidos (Interactive Features)
// functions in this module require createjs namespace to exist and in particular easel.js and tween.js
// available at http://createjs.com

/*--
zim.Ticker = {}

Ticker
zim static class

DESCRIPTION
A static class to let ZIM use one createjs Ticker.
If a function has been added to the Ticker queue then it will run in the order added
along with a single stage update after all functions in queue have run.
There are settings that can adjust when the Ticker updates so see Usage notes below.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);
zim.Ticker.add(function(){
	circle.x++;
}, stage);

// to be able to remove the function:
zim.Ticker.add(tryMe, stage);
function tryMe() {circle.x++;}
zim.Ticker.remove(tryMe);

// OR with function literal, use the return value
var tickerFunction = zim.Ticker.add(function(){circle.x++;}, stage);
zim.Ticker.remove(tickerFunction);
END EXAMPLE

USAGE
if zim.OPTIMIZE is true then the Ticker will not update the stage (it will still run functions)
however, OPTIMIZE can be overridden as follows (or with the always() method):

PROPERTIES (static)
zim.Ticker.update = true - overrides zim.OPTIMIZE and forces an update if a function is in the queue
zim.Ticker.update = false - forces no update regardless of zim.OPTIMIZE
zim.Ticker.update = null (default) - only updates if there is a function in queue and zim.OPTIMIZE is false
zim.Ticker.list - a ZIM Dictionary holding arrays with the functions in the Ticker queue for each stage
zim.Ticker.list.objects - the array of stages in the Ticker
zim.Ticker.list.values - the array holding an array of functions for each stage in the Ticker

METHODS (static)
zim.Ticker.always(stage) - overrides zim.OPTIMIZE and always runs an update for the stage even with no function in queue
zim.Ticker.alwaysOff(stage) - stops an always Ticker for a stage
zim.Ticker.add(function, stage) - adds the function to the Ticker queue for a given stage and returns the function that was added
zim.Ticker.remove(function) - removes the function from the Ticker queue
zim.Ticker.removeAll([stage]) - removes all functions from the Ticker queue (optionally per stage)
zim.Ticker.setFPS(30, 60) - (mobile, pc) default 30 frames per second mobile, 60 frames per second non mobile
zim.Ticker.dispose([stage]) - removes all functions from the queue removes and removes the list (optionally per stage)

the Ticker is used internally by zim functions like move(), animate(), drag(), Scroller(), Parallax()
you are welcome to add functions - make sure to pass the stage in as a second parameter to the add() method

USAGE
1. if you have your own ticker going, just set zim.OPTIMIZE = true and don't worry about a thing
2. if you do not have your own ticker going but still want OPTIMIZE true to avoid components updating automatically,
then set zim.OPTIMIZE = true and set zim.Ticker.update = true
this will run a single update only when needed in zim Ticker for any zim functions
3. if you want a ticker with a single update going all the time (with OPTIMIZE true or false) then
run zim.Ticker.always(stage);
4. if for some reason (can't think of any) you want no ticker updates for zim but want component updates
then set zim.OPTIMIZE = false and then set zim.Ticker.update = false
--*///+30
	zim.Ticker = {
		stages:null,
		myUpdate: null,
		alwaysList:new zim.Dictionary(),
		list:new zim.Dictionary(),
		setFPS: function(m, d) {
			if (zot(m) && zot(d)) {
				m = 30; d = 60;
			} else if (zot(m)) {
				m = 30;
			} else if (zot(d)) {
				d = m;
			}
			zim.Ticker.framerate = createjs.Ticker.framerate = (zim.mobile()) ? m : d;
		},
		add: function(f, s) {
			z_d("30");
			var t = zim.Ticker;
			if (!t.framerate) t.setFPS();
			if (zot(s) || !s.update) {zog("zim.Ticker.add() - needs stage parameter"); return;}
			if (zot(f) || typeof f !== 'function') {zog("zim.Ticker.add() - only add functions"); return;}
			if (!t.ticker) t.ticker = createjs.Ticker.on("tick", t.call);
			if (t.list.at(s)) {t.list.at(s).push(f);} else {t.list.add(s, [f]);}
			return f;
		},
		call: function() {
			var t = zim.Ticker;
			var s, functions;
			for (var i=0; i<t.list.length; i++) {
				s = t.list.objects[i]; // stage
				functions = t.list.values[i]; // list of functions for the stage
				for (var j=0; j<functions.length; j++) {
					functions[j]();
				}
				if (t.alwaysList.at(s)) {
					s.update();
				} else if (functions.length > 0) {
					if (zot(t.update) && !zim.OPTIMIZE) {
						s.update();
					} else if (t.update) {
						s.update();
					}
				}
			}
			// may have no functions to run but always is turned on
			for (i=0; i<t.alwaysList.length; i++) {
				s = t.alwaysList.objects[i]; // stage
				if (t.list[s] == null) 	s.update(); // if functions then update is already handled
			}
		},
		always: function(s) {
			z_d("30");
			var t = zim.Ticker;
			if (!t.framerate) t.setFPS();
			if (zot(s) || !s.update) {zog("zim.Ticker.always(stage) - needs stage parameter"); return;}
			t.alwaysList.add(s, true);
			if (!t.ticker) t.ticker = createjs.Ticker.on("tick", t.call);
		},
		alwaysOff: function(s) {
			var t = zim.Ticker;
			if (zot(s) || !s.update) {zog("zim.Ticker.alwaysOff(stage) - needs stage parameter"); return;}
			t.alwaysList.remove(s);
		},
		remove: function(f) {
			var t = zim.Ticker;
			if (zot(f) || typeof f !== 'function') {zog("zim.Ticker - only remove functions"); return;}
			var count = 0;
			var s;
			for (var i=0; i<t.list.length; i++) {
				s = t.list.objects[i]; // stage
				var index = t.list.values[i].indexOf(f);
				if (index > -1) {
					t.list.values[i].splice(index,1);
				}
				count+=t.list.values[i].length;
			}
			if (t.alwaysList.length > 0) return;
			if (count == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
		},
		removeAll: function(s) {
			var t = zim.Ticker;
			var count = 0;
			var st;
			for (var i=0; i<t.list.length; i++) {
				st = t.list.objects[i]; // stage
				if (zot(s) || s === st) {
					t.list.values[i] = [];
				}
				count+=t.list.values[i].length;
			}
			if (t.alwaysList.length > 0) return;
			if (count == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
		},
		dispose: function(s) {
			var t = zim.Ticker;
			var count = 0;
			var st;
			for (var i=t.list.length-1; i>=0; i--) { // countdown when removing
				st = t.list.objects[i]; // stage
				if (zot(s) || s === st) {
					t.list.remove(s);
					t.alwaysList.remove(s);
				} else {
					count+=t.list.values[i].length;
				}
			}
			if (t.alwaysList.length > 0) return;
			if (count == 0) {createjs.Ticker.off("tick", t.ticker); t.ticker = null;}
			return true;
		}
	}

	Object.defineProperty(zim.Ticker, 'update', {
		get: function() {
			return zim.Ticker.myUpdate;
		},
		set: function(value) {
			var t =  zim.Ticker;
			if (typeof value != "boolean") value = null;
			t.myUpdate = value;
			if (t.myUpdate === false) {
				 createjs.Ticker.off("tick", t.ticker);
				 // note, this overrides always()
				 // but running always() will override update = false
				 t.alwaysList = new zim.Dictionary();
			}
		}
	});//-30


/*--
zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens, startBounds)

drag
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Adds drag and drop to an object with a variety of options.
Handles scaled, rotated nested objects.

EXAMPLE
var radius = 50;
var circle = new zim.Circle(radius, "red");
zim.center(circle, stage);
zim.drag(circle);

// OR with ZIM DUO
zim.drag({obj:circle, slide:true});

// OR with ZIM 4TH methods
circle.center(stage);
circle.drag();

// OR with ZIM 4TH and ZIM DUO
circle.drag({slide:true});

// BOUNDS
// circle has its registration point in the middle
// keep registration point within rectangle starting at x=100, y=100
// and drag within a width of 500 and height of 400
// var dragBounds = new createjs.Rectangle(100,100,500,400);
// or keep circle on the stage with the following
var dragBounds = new createjs.Rectangle(radius,radius,stageW-radius,stageH-radius);
circle.drag(dragBounds); // drag within stage
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to drag
rect - (default null) a createjs.Rectangle object for the bounds of dragging
	if surround is true then it will make sure the obj surrounds the rect rather than stays within it
	this rectangle is relative to the stage (global)
	if a rectangle relative to the object's parent is desired then set the localBounds parameter to true
overCursor, dragCursor - (default "pointer") the CSS cursor properties as strings
currentTarget - (default false) allowing you to drag things within a container
	eg. drag(container); will drag any object within a container
	setting currentTarget to true will then drag the whole container
swipe - (default false) which prevents a swipe from triggering when dragging
localBounds - (default false) which means the rect is global - set to true for a rect in the object parent frame
onTop - (default true) brings the dragged object to the top of the container
surround - (default false) is for dragging a big object that always surrounds the rect
slide - (default false) will let you throw the object and dispatch a slidestop event when done
slideDamp - (default .3) is the damping setting for the slide (1 is no damping and .1 will slide more, etc.)
slideSnap - (default true) lets the object go outside and snap back to bounds - also "vertical", "horizontal", and false
reg - (default false) when set to true will snap the registration of the object to the mouse position
removeTweens - (default true) will automatically remove tweens from dragged object unless set to false
startBounds - (default true) set to false to ignore bound rect before dragging (sometimes handy when putting drag on container)

note: will not update stage if zim.OPTIMIZE is set to true
unless zim.Ticker.update is set to true or you run zim.Ticker.always(stage) see zim.Ticker

RETURNS obj for chaining
--*///+31
	zim.drag = function(obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens, startBounds) {

		var sig = "obj, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens, startBounds";
		var duo; if (duo = zob(zim.drag, arguments, sig)) return duo;
		z_d("31");
		if (zot(obj) || !obj.on) return;
		obj.cursor = (zot(overCursor)) ? "pointer" : overCursor;
		if (zot(currentTarget)) currentTarget = false;
		if (zot(swipe)) swipe = false;
		if (zot(localBounds)) localBounds = false;
		if (zot(onTop)) onTop = true;
		if (zot(surround)) surround = false;
		if (zot(slide)) slide = false;
		if (zot(slideDamp)) slideDamp = .3;
		if (zot(slideSnap)) slideSnap = true;
		var snapOptions = ["horizontal", "vertical", "auto"];
		if (slideSnap !== true && snapOptions.indexOf(slideSnap) < 0) slideSnap = false;
		if (zot(reg)) reg = false;
		if (zot(removeTweens)) removeTweens = true;
		if (zot(startBounds)) startBounds = true;

		zim.setSwipe(obj, swipe);
		obj.zimDragRect = rect;
		obj.zimLocalBounds = localBounds;
		var downCheck = false;

		var diffX; var diffY; var point; var r;	var rLocal;
		obj.zimAdded = obj.on("added", initializeObject, null, true); // if not added to display list
		obj.zimRemoved = obj.on("removed", unInitializeObject, null, true);
		if (obj.parent) initializeObject();

		function initializeObject() {
			// check position right away if there is a bounding box
			// there is no mousedown so set the diffX and diffY to 0
			diffX = 0; diffY = 0;
			// positionObject() is used as well in the dragmove function
			// where it expects a global x and y
			// so convert obj.x and obj.y positions inside its parent to global:
			if (obj.zimDragRect) {
				if (localBounds) {
					r = zim.boundsToGlobal(obj.parent, obj.zimDragRect);
					if (surround) rLocal = obj.zimDragRect;
				} else {
					r = obj.zimDragRect;
					if (surround) rLocal = zim.boundsToGlobal(obj.parent, obj.zimDragRect, true); // flips to global to local
				}
			}

			if (r && startBounds) {
				point = obj.parent.localToGlobal(obj.x, obj.y);
				positionObject(obj, point.x, point.y);
			}
			if (slide) {
				obj.zimDragMoving = true;
				setUpSlide();
			}
		}

		function unInitializeObject() {
			if (obj.zimDragTicker) zim.Ticker.remove(obj.zimDragTicker);
		}

		// set up damping for slide and variables used to predict future locations
		if (slide) {
			var dampX = new zim.Damp(obj.x, slideDamp);
			var dampY = new zim.Damp(obj.y, slideDamp);
			var back = 3; // how many ticks ago to estimate trajectory
			var lastCount = 0;
			var backX = [];
			var backY = [];
			var upX = obj.x; // mouse up translated to local
			var upY = obj.y;
			var objUpX = obj.x; // drag object x when mouse up
			var objUpY = obj.y;
			var lastBackX = obj.x; // used to calculate trajectory
			var lastBackY = obj.y;
			var lastX = -10000; // used to see if sliding object is still moving
			var lastY = -10000;
		}

		var dragObject;

		obj.zimDown = obj.on("mousedown", function(e) {
			// e.stageX and e.stageY are global
			// e.target.x and e.target.y are relative to e.target's parent
			// bring stageX and stageY into the parent's frame of reference
			// could use e.localX and e.localY but might be dragging container or contents
			dragObject = (currentTarget)?e.currentTarget:e.target;
			if (obj.zimDragRect && !dragObject.getBounds()) {zog("zim.drag() - drag object needs bounds set"); return;}
			downCheck = true;

			// add a function to the Ticker queue (remove it if there first)
			if (!slide) { // slide has a persistent Ticker function
				if (obj.zimDragTicker) zim.Ticker.remove(obj.zimDragTicker);
				obj.zimDragTicker = zim.Ticker.add(function(){}, obj.getStage());
			}

			if (removeTweens) createjs.Tween.removeTweens(dragObject);
			if (onTop) dragObject.parent.setChildIndex(dragObject,dragObject.parent.numChildren-1);
			var point = dragObject.parent.globalToLocal(e.stageX, e.stageY);
			if (reg) {
				dragObject.x = point.x;
				dragObject.y = point.y;
			}
			diffX = point.x - dragObject.x;
			diffY = point.y - dragObject.y;

			if (obj.zimDragRect) {
				if (localBounds) {
					r = zim.boundsToGlobal(dragObject.parent, obj.zimDragRect);
					if (surround) rLocal = obj.zimDragRect;
				} else {
					r = obj.zimDragRect;
					if (surround) rLocal = zim.boundsToGlobal(dragObject.parent, obj.zimDragRect, true); // true flips to global to local
				}
			}
			// just a quick way to set a default cursor or use the cursor sent in
			obj.cursor = (zot(dragCursor))?"pointer":dragCursor;

			// extra slide settings to project where the object will slide to
			if (slide) {
				lastCount = 0;
				backX = [point.x];
				backY = [point.y];
				lastX = -10000; // reset
				lastY = -10000;
				obj.zimDragMoving = true;
			}

		}, true);

		obj.zimMove = obj.on("pressmove", function(e) {
			if (!downCheck) return;
			positionObject(dragObject, e.stageX, e.stageY);
		}, true);

		function positionObject(o, x, y) {

			if (zot(o)) o = (dragObject) ? dragObject : obj; // so zim.dragRect can use this

			// x and y are the desired global positions for the object o
			// checkBounds returns the same values if there are no bounds
			// and returns values inside the bounds if there are bounds set
			// or returns a position so that object o surrounds the bounds if surround is true
			// firstly, convert the global x and y to a point relative to the object's parent
			if (!o.parent) return;
			if (!o.getStage()) return;

			if (zot(x) || zot(y)) {
				// so zim.dragRect can use this to position on rect change
				// it may be we are resizing before we even drag at all
				// so we need to establish variables that would have been made on drag events
				var p = o.parent.localToGlobal(o.x, o.y);
				diffX = diffY = 0;
				if (obj.zimDragRect) {
					if (localBounds) {
						r = zim.boundsToGlobal(o.parent, obj.zimDragRect);
						if (surround) rLocal = o.zimDragRect;
					} else {
						r = obj.zimDragRect;
						if (surround) rLocal = zim.boundsToGlobal(o.parent, obj.zimDragRect, true); // flips to global to local
					}
				}
				x = p.x;
				y = p.y;
				if (slide) {
					objUpX = o.x;
					objUpY = o.y;
					dragObject = o;
					dampX.immediate(objUpX);
					dampY.immediate(objUpY);
				}
			}

			var point = o.parent.globalToLocal(x, y);
			var checkedPoint;
			if (slide && slideSnap) {
				if (slideSnap == "vertical") {
					checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);
					o.x = checkedPoint.x;
					o.y = point.y-diffY;
				} else if (slideSnap == "horizontal") {
					checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);
					o.x = point.x-diffX;
					o.y = checkedPoint.y;
				} else {
					o.x = point.x-diffX;
					o.y = point.y-diffY;
				}
			} else {
				checkedPoint = checkBounds(o,point.x-diffX, point.y-diffY);
				// now set the object's x and y to the resulting checked local point
				o.x = checkedPoint.x;
				o.y = checkedPoint.y;
			}

			// mask graphics needs to have same position as object
			// yet the mask is inside the object (but alpha = 0)
			if (o.zimMask) {
				m = o.zimMask;
				m.x = o.x;
				m.y = o.y;
			}
		}
		obj.zimPosition = positionObject;

		obj.zimUp = obj.on("pressup", function(e) {
			if (!downCheck) return;
			obj.cursor = (zot(overCursor))?"pointer":overCursor;
			if (slide) {
				var point = dragObject.parent.globalToLocal(e.stageX, e.stageY);
				downCheck = false;
				upX = point.x;
				upY = point.y;
				objUpX = dragObject.x;
				objUpY = dragObject.y;
				dampX.immediate(dragObject.x);
				dampY.immediate(dragObject.y);
			} else {
				if (obj.zimDragTicker) zim.Ticker.remove(obj.zimDragTicker);
			}
		}, true);

		// the bounds check for registration inside the bounds
		// or if surround is set for the whole object staying outside the bounds
		function checkBounds(o, x, y) {
			if (r) {
				if (surround) {
					var w = o.getBounds().width;
					var h = o.getBounds().height;
					if (w < rLocal.width) {
						// put half way between
						x = rLocal.x + (rLocal.width - w) / 2 + o.regX;
					} else {
						if (x - o.regX > rLocal.x) {
							x = rLocal.x + o.regX;
						}
						if (x - o.regX + w < rLocal.x + rLocal.width) {
							x = rLocal.x + rLocal.width + o.regX - w;
						}
					}
					if (o.height < rLocal.height) {
						// put half way between
						y = rLocal.y + (rLocal.height - h) / 2 + o.regY;
					} else {
						if (y - o.regY > rLocal.y) {
							y = rLocal.y + o.regY;
						}
						if (y - o.regY + h < rLocal.y + rLocal.height) {
							y = rLocal.y + rLocal.height + o.regY - h;
						}
					}
				} else {
					// convert the desired drag position to a global point
					// note that we want the position of the object in its parent
					// so we use the parent as the local frame
					var point = o.parent.localToGlobal(x,y);
					// r is the bounds rectangle on the global stage
					// r is set during mousedown to allow for global scaling when in localBounds mode
					// if you scale in localBounds==false mode, you will need to reset bounds with dragRect()
					x = Math.max(r.x, Math.min(r.x+r.width, point.x));
					y = Math.max(r.y, Math.min(r.y+r.height, point.y));
					// now that the point has been checked on the global scale
					// convert the point back to the obj parent frame of reference
					point = o.parent.globalToLocal(x, y);
					x = point.x;
					y = point.y;
				}
			}
			return {x:x,y:y}
		}

		// we store where the object was a few ticks ago and project it forward
		// then damp until it stops - although the ticker keeps running and updating
		// if it snaps then the object is allowed to go past the bounds and damp back
		// if it is not snapping then the object stops at the bounds when it is slid
		function setUpSlide() {
			var stage = obj.getStage();
			obj.zimDragTicker = function() {
				if (!dragObject) dragObject = obj; // could be risky if intending to drag children
				if (downCheck) {
					var point = dragObject.parent.globalToLocal(stage.mouseX, stage.mouseY);
					lastCount++;
					backX.push(point.x);
					backY.push(point.y);
					if (lastCount >= back) {
						lastBackX = backX.shift();
						lastBackY = backY.shift();
					} else {
						lastBackX = backX[0];
						lastBackY = backY[0];
					}
				} else {
					if (!obj.zimDragMoving) return;
					var desiredX = objUpX + upX-lastBackX;
					var desiredY = objUpY + upY-lastBackY;
					if (r) {
						var checkedPoint = checkBounds(dragObject, desiredX, desiredY);
						desiredX = checkedPoint.x;
						desiredY = checkedPoint.y;
					}
					if (!slideSnap) {
						var checkedPoint = checkBounds(dragObject, dampX.convert(desiredX), dampY.convert(desiredY));
						dragObject.x = checkedPoint.x;
						dragObject.y = checkedPoint.y;
						testMove(dragObject,dragObject.x,dragObject.y,dragObject.x,dragObject.y);
					} else {
						dragObject.x = dampX.convert(desiredX);
						dragObject.y = dampY.convert(desiredY);
						testMove(dragObject,dragObject.x,dragObject.y,desiredX,desiredY);
					}
				}
			}
			function testMove(o,x,y,desiredX,desiredY) {
				if (Math.abs(o.x-lastX) < .1 && Math.abs(o.y-lastY) < .1) {
					obj.zimDragMoving = false;
					o.x = desiredX; // snap to final resting place
					o.y = desiredY;
					o.dispatchEvent("slidestop");
				} else {
					lastX = x;
					lastY = y;
				}
			}
			zim.Ticker.add(obj.zimDragTicker, stage);
		}
		return obj;
	}//-31

/*--
zim.noDrag = function(obj)

noDrag
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Removes drag function from an object.
This is not a stopDrag function (as in the drop of a drag and drop).
Dropping happens automatically with the drag() function.
The noDrag function turns off the drag function so it is no longer draggable.

EXAMPLE
zim.noDrag(circle);

// OR ZIM 4TH method
circle.noDrag();
END EXAMPLE

PARAMETERS
obj - the object to make not draggable

RETURNS obj for chaining
--*///+32
	zim.noDrag = function(obj) {
		z_d("32");
		if (zot(obj) || !obj.on) return;
		obj.cursor = "default";
		zim.setSwipe(obj, true);
		obj.off("added", obj.zimAdded);
		obj.off("removed", obj.zimRemoved);
		obj.off("mousedown", obj.zimDown);
		obj.off("pressmove", obj.zimMove);
		obj.off("pressup", obj.zimUp);
		if (zim.Ticker && obj.zimDragSlide) zim.Ticker.remove(obj.zimDragSlide);
		obj.zimDragMoving=obj.zimAdded=obj.zimRemoved=obj.zimDown=obj.zimMove=obj.zimUp=obj.zimDragRect=obj.zimDragSlide=null;
		return obj;
	}//-32

/*--
zim.dragRect = function(obj, rect)

dragRect
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Dynamically changes or adds a bounds rectangle to the object being dragged with zim.drag().

EXAMPLE
var dragBounds = new createjs.Rectangle(100,100,500,400);
zim.dragRect(circle, dragBounds);

OR with ZIM 4TH
circle.dragRect(dragBounds);
END EXAMPLE

PARAMETERS
obj - an object that currently has its zim.drag() set
rect - is a createjs.Rectangle for the bounds - the local / global does not change from the original drag

RETURNS obj for chaining
--*///+33
	zim.dragRect = function(obj, rect) {
		z_d("33");
		if (zot(obj) || !obj.on) return;
		if (zot(rect)) return;
		obj.zimDragRect = rect;
		obj.zimDragMoving = true;
		if (obj.zimPosition) obj.zimPosition();
		return obj;
	}//-33

/*--
zim.setSwipe = function(obj, swipe)

setSwipe
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Sets whether we want to swipe an object or not using ZIM Swipe.
Recursively sets children to same setting.

EXAMPLE
zim.swipe(circle, false);

OR with ZIM 4TH method
circle.swipe(false);
END EXAMPLE

PARAMETERS
obj - a display object
swipe - (default true) set to false to not swipe object

RETURNS obj for chaining
--*///+34
	zim.setSwipe = function(obj, swipe) {
		z_d("34");
		if (zot(obj) || !obj.on) return;
		obj.zimNoSwipe = (swipe) ? null : true;
		if (obj instanceof createjs.Container) dig(obj);
		function dig(container) {
			var num = container.getNumChildren();
			var temp;
			for (var i=0; i<num; i++) {
				temp = container.getChildAt(i);
				temp.zimNoSwipe = obj.zimNoSwipe;
				if (temp instanceof createjs.Container) {
					dig(temp);
				}
			}
		}
		return obj;
	}//-34

/*--
zim.hitTestPoint = function(obj, x, y)

hitTestPoint
zim function - and Display object method under ZIM 4TH

DESCRIPTION
See if shape of obj is hitting the global point x and y on the stage.

EXAMPLE
var circle = new zim.Circle();
stage.addChild(circle);
zim.drag(circle);
circle.on("pressmove", function() {
	if (zim.hitTestPoint(circle, stageW/2, stageH/2)) {
		if (circle.alpha == 1) {
			circle.alpha = .5;
			stage.update();
		}
	} else {
		if (circle.alpha == .5) {
			circle.alpha = 1;
			stage.update();
		}
	}
});

OR with ZIM 4TH methods
circle.drag(); // etc.
if (circle.hitTestPoint(stageW/2, stageH/2)) {} // etc.
END EXAMPLE

PARAMETERS
obj - the obj whose shape we are testing
x and y - the point we are testing to see if it hits the shape

RETURNS a Boolean true if hitting, false if not
--*///+35
	zim.hitTestPoint = function(obj, x, y) {
		z_d("35");
		if (!obj.stage) return false;
		if (zot(obj) || !obj.globalToLocal) return;
		var point = obj.globalToLocal(x,y);
		return obj.hitTest(point.x, point.y);
	}//-35

/*--
zim.hitTestReg = function(a, b)

hitTestReg
zim function - and Display object method under ZIM 4TH

DESCRIPTION
See if shape (a) is hitting the registration point of object (b).

EXAMPLE
var circle = new zim.Circle(50, "red");
zim.center(circle, stage);
var rect = new zim.Rectangle(100, 100, "blue");
stage.addChild(rect);
zim.drag(circle);
circle.on("pressmove", function() {
	if (zim.hitTestReg(circle, rect)) {
		stage.removeChild(rect);
		stage.update();
	}
})

OR with ZIM 4TH method
circle.center(stage); etc.
circle.drag(); etc.
if (circle.hitTestReg(rect)) {} // etc.
END EXAMPLE

PARAMETERS
a - the object whose shape we are testing
b - the object whose registration point we are checking against

RETURNS a Boolean true if hitting, false if not
--*///+36
	zim.hitTestReg = function(a, b) {
		z_d("36");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.localToLocal || !b.localToLocal) return;
		var point = b.localToLocal(b.regX,b.regY,a);
		return a.hitTest(point.x, point.y);
	}//-36

/*--
zim.hitTestRect = function(a, b, num)

hitTestRect
zim function - and Display object method under ZIM 4TH

DESCRIPTION
See if a shape (a) is hitting points on a rectangle.
The rectangle is based on the position, registration and bounds of object (b).
num is how many points on the edge of the rectangle we test - default is 0.
The four corners are always tested as well as the very middle of the rectangle.

EXAMPLE
var circle = new zim.Circle(50, "red");
zim.center(circle, stage);
var rect = new zim.Rectangle(100, 100, "blue");
stage.addChild(rect);
zim.drag(circle);
circle.on("pressmove", function() {
	if (zim.hitTestRect(circle, rect)) {
		stage.removeChild(rect);
		stage.update();
	}
});

OR with ZIM 4TH method
circle.center(stage); etc.
circle.drag(); etc.
if (circle.hitTestRect(rect)) {} // etc.
END EXAMPLE

PARAMETERS
a - the object whose shape we are testing
b - the object whose bounding rectangle we are checking against
num - (default 0) the number of points along each edge to checking
	1 would put a point at the middle of each edge
	2 would put two points at 1/3 and 2/3 along the edge, etc.
	there are always points at the corners
	and one point in the middle of the rectangle

RETURNS a Boolean true if hitting, false if not
--*///+37
	zim.hitTestRect = function(a, b, num) {
		z_d("37");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.hitTest || !b.getBounds) return;
		if (zot(num)) num = 0;
		var bounds = b.getBounds();
		if (!bounds) {
			zog("zim create - hitTestRect():\n please setBounds() on param b object");
			return;
		}

		var centerX = bounds.x+bounds.width/2;
		var centerY = bounds.y+bounds.height/2;
		var point = b.localToLocal(centerX, centerY, a);
		if (a.hitTest(point.x, point.y)) return true; // check hit on center of Rectangle

		var shiftX, shiftY, point;

		//num = 0;  1/1
		//num = 1;  1/2  2/2
		//num = 2;  1/3  2/3  3/3
		//num = 3;  1/4  2/4  3/4  4/4

		for (var i=0; i<=num; i++) {
			shiftX = bounds.width  * (i+1)/(num+1);
			shiftY = bounds.height * (i+1)/(num+1);
			point = b.localToLocal(bounds.x+shiftX, bounds.y, a);
			if (a.hitTest(point.x, point.y)) return true;
			point = b.localToLocal(bounds.x+bounds.width, bounds.y+shiftY, a);
			if (a.hitTest(point.x, point.y)) return true;
			point = b.localToLocal(bounds.x+bounds.width-shiftX, bounds.y+bounds.height, a);
			if (a.hitTest(point.x, point.y)) return true;
			point = b.localToLocal(bounds.x, bounds.y+bounds.height-shiftY, a);
			if (a.hitTest(point.x, point.y)) return true;
		}
	}//-37

/*--
zim.hitTestCircle = function(a, b, num)

hitTestCircle
zim function - and Display object method under ZIM 4TH

DESCRIPTION
See if a shape (a) is hitting points on a circle.
The circle is based on the position, registration and bounds of object (b).
num is how many points around the circle we test - default is 8
Also checks center of circle hitting.

EXAMPLE
var circle = new zim.Circle(50, "red");
zim.center(circle, stage);
var triangle = new zim.Triangle(100, 100, 100, "blue");
stage.addChild(triangle);
zim.drag(circle);
circle.on("pressmove", function() {
	if (zim.hitTestCircle(triangle, circle)) {
		stage.removeChild(triangle);
		stage.update();
	}
});

OR with ZIM 4TH method
circle.center(stage); etc.
circle.drag(); etc.
if (triangle.hitTestCircle(circle)) {} // etc.
END EXAMPLE

PARAMETERS
a - the object whose shape we are testing
b - the object whose circle based on the bounding rect we are using
num - (default 8) the number of points evenly distributed around the circle
	and one point in the middle of the circle

RETURNS a Boolean true if hitting, false if not
--*///+38
	zim.hitTestCircle = function(a, b, num) {
		z_d("38");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.hitTest || !b.getBounds) return;
		if (zot(num)) num = 8;
		var bounds = b.getBounds();
		if (!bounds) {
			zog("zim create - hitTestCircle():\n please setBounds() on param b object");
			return;
		}

		var centerX = bounds.x+bounds.width/2;
		var centerY = bounds.y+bounds.height/2;
		var point = b.localToLocal(centerX, centerY, a);
		if (a.hitTest(point.x, point.y)) return true; // check hit on center of circle
		var radius = (bounds.width+bounds.height)/2/2; // average diameter / 2
		var angle, pointX, pointY;
		for (var i=0; i<num; i++) {
			angle = i/num * 2*Math.PI; // radians
			pointX = centerX + (radius * Math.cos(angle));
			pointY = centerY + (radius * Math.sin(angle));
			point = b.localToLocal(pointX, pointY, a);
			if (a.hitTest(point.x, point.y)) return true;
		}

	}//-38

/*--
zim.hitTestBounds = function(a, b, boundsShape)

hitTestBounds
zim function - and Display object method under ZIM 4TH

DESCRIPTION
See if a.getBounds() is hitting b.getBounds().
Pass in a boundsShape shape if you want a demonstration of where the bounds are.
This is the second fastest of the hitTests as it is code based not shape based.
The first fastest is hitTestGrid.

EXAMPLE
var circle = new zim.Circle(50, "red");
zim.center(circle, stage);
var rect = new zim.Rectangle(100, 100, "blue");
stage.addChild(rect);
zim.drag(circle);
circle.on("pressmove", function() {
	if (zim.hitTestBounds(circle, rect)) {
		stage.removeChild(rect);
		stage.update();
	}
});

OR with ZIM 4TH method
circle.center(stage); etc.
circle.drag(); etc.
if (circle.hitTestBounds(rect)) {} // etc.
END EXAMPLE

PARAMETERS
a - an object whose rectanglular bounds we are testing
b - another object whose rectanglular bounds we are testing
boundsShape - (default null) an empty zim.Shape or createjs.Shape
	you would need to add the boundsShape to the stage

RETURNS a Boolean true if hitting, false if not
--*///+39
	zim.hitTestBounds = function(a, b, boundsShape) {
		z_d("39");
		if (!a.stage || !b.stage) return false;
		if (zot(a) || zot(b) || !a.getBounds || !b.getBounds) return;
		var boundsCheck = false;
		if (boundsShape && boundsShape.graphics) boundsCheck=true;

		var aB = a.getBounds();
		var bB = b.getBounds();
		if (!aB || !bB) {
			zog("zim create - hitTestBounds():\n please setBounds() on both objects");
			return;
		}

		var adjustedA = zim.boundsToGlobal(a);
		var adjustedB = zim.boundsToGlobal(b);

		if (boundsCheck) {
			var g = boundsShape.graphics;
			g.clear();
			g.setStrokeStyle(1).beginStroke("blue");
			g.drawRect(adjustedA.x, adjustedA.y, adjustedA.width, adjustedA.height);
			g.beginStroke("green");
			g.drawRect(adjustedB.x, adjustedB.y, adjustedB.width, adjustedB.height);
			boundsShape.getStage().update();
		}

		return rectIntersect(adjustedA, adjustedB);

		function rectIntersect(a, b) { // test two rectangles hitting
			if (a.x >= b.x + b.width || a.x + a.width <= b.x ||
				a.y >= b.y + b.height || a.y + a.height <= b.y ) {
				return false;
			} else {
				return true;
			}
		}
	}//-39

/*--
zim.boundsToGlobal = function(obj, rect, flip)

boundsToGlobal
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Returns a createjs Rectangle of the bounds of object projected onto the stage.
Handles scaling and rotation.
If a createjs rectangle is passed in then it converts this rectangle
from within the frame of the obj to a global rectangle.
If flip (default false) is set to true it goes from global to local rect.
Used by drag() and hitTestBounds() above - probably you will not use this directly.

EXAMPLE
zog(zim.boundsToGlobal(circle).x); // global x of circle

OR with ZIM 4TH method
zog(circle.boundsToGlobal().width); // global width of circle)
END EXAMPLE

PARAMETERS
obj - an object for which you would like global bounds projected
rect - a rect inside an object which you would like mapped to global
flip - (default false) make a global rect ported to local values

RETURNS a Boolean true if hitting, false if not
--*///+40
	zim.boundsToGlobal = function(obj, rect, flip) {
		z_d("40");
		if (zot(obj) || !obj.getBounds) return;
		if (zot(flip)) flip = false;
		var oB = obj.getBounds();
		if (!oB && zot(rect)) {
			zog("zim create - boundsToGlobal():\n please setBounds() on object (or a rectangle)");
			return;
		}
		if (rect) oB = rect;

		if (flip) {
			var pTL = obj.globalToLocal(oB.x, oB.y);
			var pTR = obj.globalToLocal(oB.x+oB.width, oB.y);
			var pBR = obj.globalToLocal(oB.x+oB.width, oB.y+oB.height);
			var pBL = obj.globalToLocal(oB.x, oB.y+oB.height);
		} else {
			var pTL = obj.localToGlobal(oB.x, oB.y);
			var pTR = obj.localToGlobal(oB.x+oB.width, oB.y);
			var pBR = obj.localToGlobal(oB.x+oB.width, oB.y+oB.height);
			var pBL = obj.localToGlobal(oB.x, oB.y+oB.height);
		}

		// handle rotation
		var newTLX = Math.min(pTL.x,pTR.x,pBR.x,pBL.x);
		var newTLY = Math.min(pTL.y,pTR.y,pBR.y,pBL.y);
		var newBRX = Math.max(pTL.x,pTR.x,pBR.x,pBL.x);
		var newBRY = Math.max(pTL.y,pTR.y,pBR.y,pBL.y);

		return new createjs.Rectangle(
			newTLX,
			newTLY,
			newBRX-newTLX,
			newBRY-newTLY
		);
	}//-40

/*--
zim.hitTestGrid = function(obj, width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type)

hitTestGrid
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Converts an x and y point to an index in a grid.
If you have a grid of rectangles, for instance, use this to find out which rectangle is beneath the cursor.
This technique will work faster than any of the other hit tests.

EXAMPLE
zim.Ticker.add(function() {
	var index = zim.hitTestGrid(stage, 200, 200, 10, 10, stage.mouseX, stage.mouseY);
	if (index) zog(index);
});
OR with ZIM 4TH method
var index = stage.hitTestGrid(200, 200, 10, 10, stage.mouseX, stage.mouseY);
END EXAMPLE
offsetX, offsetY, spacingX, spacingY, local, type

PARAMETERS
obj - the object that contains the grid
width and height - the overall dimensions
cols and rows - how many of each (note it is cols and then rows)
x and y - where you are in the grid (eg. stage.mouseX and stage.mouseY)
offsetX and offsetY - (default 0) the distances the grid starts from the origin of the obj
spacingX and spacingY - (default 0) spacing between grid cells (null will be returned if x and y within spacing)
	spacing is only between the cells and is to be included in the width and height (but not outside the grid)
local - (default false) set to true to convert x and y to local values
type - (default index) which means the hitTestGrid returns the index of the cell beneath the x and y point
	starting with 0 at top left corner and counting columns along the row and then to the next row, etc.
	set type to "col" to return the column and "row" to return the row
	set to "array" to return all three in an Array [index, col, row]

RETURNS an index Number (or undefined) | col | row | an Array of [index, col, row]
--*///+41
	zim.hitTestGrid = function(obj, width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type) {
		z_d("41");
		if (!obj.stage) return false;
		if (!zot(obj) && !local) {
			var point = obj.globalToLocal(x,y);
			x=point.x; y=point.y;
		}
		if (zot(offsetX)) offsetX = 0;
		if (zot(offsetY)) offsetY = 0;
		if (zot(spacingX)) spacingX = 0;
		if (zot(spacingY)) spacingY = 0;

		// assume spacing is to the right and bottom of a cell
		// turning this into an object would avoid the size calculations
		// but hopefully it will not be noticed - and then hitTests are all functions
		var sizeX = width / cols;
		var sizeY = height / rows;

		// calculate col and row
		var col = Math.min(cols-1,Math.max(0,Math.floor((x-offsetX)/sizeX)));
		var row = Math.min(rows-1,Math.max(0,Math.floor((y-offsetY)/sizeY)));

		// check if within cell
		if ((x-offsetX)>sizeX*(col+1)-spacingX || (x-offsetX)<sizeX*(col)) return;
		if ((y-offsetY)>sizeY*(row+1)-spacingY || (y-offsetY)<sizeY*(row)) return;

		var index = row*cols + col;
		if (zot(type) || type=="index") return index
		if (type == "col") return col;
		if (type == "row") return row;
		if (type == "array") return [index, col, row];
	}//-41

/*--
zim.move = function(target, x, y, time, ease, call, params, wait, loop, loopCount, loopWait, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props)

move
zim function - and Display object method under ZIM 4TH
wraps createjs.Tween

DESCRIPTION
Moves a target object to position x, y in time milliseconds.
You can set various types of easing like bounce, elastic, back, linear, sine, etc.
Handles callbacks, delays, loops, rewinds, sequences of move animations.
Also see the more general zim.animate()
(which this function calls after consolidating x an y into an object).

EXAMPLE
var circle = new zim.Circle(50, "red");
zim.center(circle, stage);
zim.move(circle, 100, 100, 700, "backOut");

OR with ZIM 4TH method
circle.center(stage);
circle.move(100, 100, 700, "backOut");
// see ZIM Bits for more move examples
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
target - the target object to tween
x and y - the absolute positions to tween to
time - the time for the tween in milliseconds 1000 ms = 1 second
ease - (default "quadInOut") see CreateJS easing ("bounceOut", "elasticIn", "backInOut", "linearInOut", etc)
call - (default null) the function to call when the animation is done
params - (default target) a single parameter for the call function (eg. use object literal or array)
wait - (default 0) milliseconds to wait before doing animation
loop - (default false) set to true to loop animation
loopCount - (default 0) if loop is true how many times it will loop (0 is forever)
loopWait - (default 0) milliseconds to wait before looping (post animation wait)
rewind - (default false) set to true to rewind (reverse) animation (doubles animation time)
rewindWait (default 0) milliseconds to wait in the middle of the rewind
rewindCall (default null) calls function at middle of rewind animation
rewindParams - (default target) parameters to send rewind function
sequence - (default 0) the delay time in milliseconds to run an array of target animations
	for example, target = [a,b,c] and sequence = 1000
	would run the animation on a and then 1 second later, run the animation on b, etc.
	if the loop prop is true then sequenceCall below would activate for each loop
sequenceCall - (default null) the function that will be called when the sequence ends
sequenceParams - (default null) a parameter sent to the sequenceCall function
sequenceCall - (default null) the function that will be called when the sequence ends
props - (default {override: true}) legacy - allows you to pass in TweenJS props

NOTE: earlier versions of ZIM used props for loop and rewind - now these are direct parameters
NOTE: the ticker and fps parameters have been removed - see zim.Ticker

to pause the move call pauseZimMove(true) on the target (or false to unpause) (not available for CSS)
to stop the move call stopZimMove() on the target
to access the CreateJS Tween object use target.zimTween
to access the zim.Ticker function use target.zimTicker

RETURNS the target for chaining
--*///+44
	zim.move = function(target, x, y, time, ease, call, params, wait, loop, loopCount, loopWait, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props) {
		var sig = "target, x, y, time, ease, call, params, wait, loop, loopCount, loopWait, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props";
		var duo; if (duo = zob(zim.move, arguments, sig)) return duo;
		z_d("44");
		return zim.animate(target, {x:x, y:y}, time, ease, call, params, wait, loop, loopCount, loopWait, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props);
	}//-44

/*--
zim.animate = function(target, obj, time, ease, call, params, wait, loop, loopCount, loopWait, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props, css)

animate
zim function - and Display object method under ZIM 4TH
wraps createjs.Tween

DESCRIPTION
Animate object obj properties in time milliseconds.
You can set various types of easing like bounce, elastic, back, linear, sine, etc.
Handles callbacks, delays, loops, rewinds, sequences of move animations.
Also see the more specific zim.move() to animate position x, y
although you can animate x an y just fine with zim.animate.

EXAMPLE
var circle = new zim.Circle(50, "red");
zim.center(circle, stage);
circle.alpha = 0;
zim.scale(circle, 0);
zim.animate(circle, {alpha:1, scale:1}, 700, null, done);
function done(target) {
	// target is circle if params is not set
	zim.drag(target);
}

OR with ZIM 4TH method
circle.alpha = 1;
circle.scale(0);
// pulse circle from scale 0 - 1 every second (use ZIM DUO)
circle.animate({obj:{scale:1}, time:500, props:{loop:true, rewind:true}});
// see ZIM Bits for more move examples
END EXAMPLE

EXAMPLE
// sequence example to pulse two circles
var circle1 = new zim.Circle(50, "red");
var circle2 = new zim.Circle(50, "blue");
zim.center(circle1, stage);
zim.center(circle2, stage);
circle2.x += 70;
circle1.scale(.1);
circle2.scale(.1);
zim.animate({
	target:[circle1, circle2],
	obj:{scale:1},
	time:500,
	loop:true,
	rewind:true,
	sequence:500
});
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
target - the target object to tween
obj - the object literal holding properties and values to animate
time - the time for the tween in milliseconds 1000 ms = 1 second
ease - (default "quadInOut") see CreateJS easing ("bounceOut", "elasticIn", "backInOut", "linearInOut", etc)
call - (default null) the function to call when the animation is done
params - (default target) a single parameter for the call function (eg. use object literal or array)
wait - (default 0) milliseconds to wait before doing animation
loop - (default false) set to true to loop animation
loopCount - (default 0) if loop is true how many times it will loop (0 is forever)
loopWait - (default 0) milliseconds to wait before looping (post animation wait)
rewind - (default false) set to true to rewind (reverse) animation (doubles animation time)
rewindWait (default 0) milliseconds to wait in the middle of the rewind
rewindCall (default null) calls function at middle of rewind animation
rewindParams - (default target) parameters to send rewind function
sequence - (default 0) the delay time in milliseconds to run an array of target animations
	for example, target = [a,b,c] and sequence = 1000
	would run the animation on a and then 1 second later, run the animation on b, etc.
	if the loop prop is true then sequenceCall below would activate for each loop
sequenceCall - (default null) the function that will be called when the sequence ends
sequenceParams - (default null) a parameter sent to the sequenceCall function
sequenceCall - (default null) the function that will be called when the sequence ends
ticker - (default true) set to false to not use an automatic zim.Ticker function
props - (default {override: true}) legacy - allows you to pass in TweenJS props
css - (default false) set to true to animate CSS properties in HTML
 	requires CreateJS CSSPlugin - ZIM has a copy here:
	<script src="https://d309knd7es5f10.cloudfront.net/CSSPlugin.js"></script>
	<script>
		// in your code at top after loading createjs
		createjs.CSSPlugin.install(createjs.Tween);
		// the property must be set before you can animate
		zss("tagID").opacity = 1; // set this even if it is default
		zim.animate(zid("tagID"), {opacity:0}, 2000); // etc.
	</script>

NOTE: earlier versions of ZIM used props for loop and rewind - now these are direct parameters
NOTE: the ticker and fps parameters have been removed - see zim.Ticker

to pause the animate call pauseZimAnimate(true) on the target (or false to unpause) (not available for CSS)
to stop the animate call stopZimAnimate() on the target
to access the CreateJS Tween object use target.zimTween
to access the zim.Ticker function use target.zimTicker

RETURNS the target for chaining
--*///+45
	zim.animate = function(target, obj, time, ease, call, params, wait, loop, loopCount, loopWait, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props, css) {
		var sig = "target, obj, time, ease, call, params, wait, loop, loopCount, loopWait, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, ticker, props, css";
		var duo; if (duo = zob(zim.animate, arguments, sig)) return duo;
		z_d("45");

		// convert loop and rewind properties into the legacy props object
		var newProps = {override: true};
		if (!zot(loop)) newProps.loop = loop;
		if (!zot(loopCount)) newProps.count = loopCount; // note prop is count
		if (!zot(loopWait)) newProps.loopWait = loopWait;
		if (!zot(rewind)) newProps.rewind = rewind;
		if (!zot(rewindWait)) newProps.rewindWait = rewindWait;
		if (!zot(rewindCall)) newProps.rewindCall = rewindCall;
		if (!zot(rewindParams)) newProps.rewindParams = rewindParams;
		if (!zot(props)) newProps = zim.merge(newProps, props); // props to overwrite
		props = newProps;

		// handle multiple targets first if there is an array
		// this just recalls the animate function for each element delayed by the sequence parameter
		if (zot(sequence)) sequence = 0;
		if (target instanceof Array) {
			var currentTarget = 0;
			for (var i=0; i<target.length; i++) {
				-function () { // closure to store num (i) for timeout
					var num = i;
					setTimeout(function() {
						var t =	target[currentTarget];
						currentTarget++;
						zim.animate(t, obj, time, ease, call, params, wait, null, null, null, null, null, null, null, null, null, null, ticker, zim.copy(props), css);
						if (num == target.length-1 && sequenceCall) {
							// calculate tween time
							var duration = ((time)?time:1000) + ((wait)?wait:0);
							if (props && props.rewind) {
								duration += ((time)?time:1000) + ((props.rewindWait)?props.rewindWait:0);
							}
							setTimeout(function(){
								sequenceCall(sequenceParams);
							}, duration);
						}
					}, sequence*i);
				}();
			}
			return;
		}

		// original animate functionality

		// if (zot(target) || !target.on || zot(obj) || !target.getStage()) return;

		var t = time;
		if (zot(t)) t = 1000;
		if (zot(ease)) ease = "quadInOut";
		if (zot(wait)) wait = 0;
		if (zot(props)) props = {override: true};
		if (zot(params)) params = target;
		if (zot(ticker)) ticker = true;
		if (zot(css)) css = false;
		if (!zot(obj.scale)) {
			obj.scaleX = obj.scaleY = obj.scale;
			delete obj.scale;
		}
		var tween;
		if (props.loop) {
			if (!zot(props.count)) {
				var count = props.count;
				delete props.count;
				var currentCount = 1;
			}
		}
		var wait3 = 0;
		if (props.loopWait) {
			wait3 = props.loopWait;
			delete props.loopWait;
		}
		if (props.rewind) {
			// flip second ease
			if (ease) {
				// backIn backOut backInOut
				var ease2 = ease;
				if (ease2.indexOf("InOut") == -1) {
					if (ease2.indexOf("Out") != -1) {
						ease2 = ease2.replace("Out", "In");
					} else if (ease2.indexOf("In") != -1) {
						ease2 = ease2.replace("In", "Out");
					}
				}
			}
			var obj2 = {}; var wait2 = 0;
			for (var i in obj) {
				if (css) {
					obj2[i] = target.style[i];
				} else {
					obj2[i] = target[i];
				}
			}
			delete props.rewind;
			if (props.rewindWait) {
				wait2 = props.rewindWait;
				delete props.rewindWait; // not a createjs prop so delete
			}
			if (props.rewindCall) {
				var call2 = props.rewindCall;
				var params2 = props.rewindParams;
				if (zot(params2)) params2 = target;
				delete props.rewindCall;
				delete props.rewindParams;
				tween = target.zimTween = createjs.Tween.get(target, props)
					.wait(wait)
					.to(obj, t, createjs.Ease[ease])
					.call(doRewindCall)
					.wait(wait2)
					.to(obj2, t, createjs.Ease[ease2])
					.call(doneAnimating)
					.wait(wait3);
			} else {
				tween = target.zimTween = createjs.Tween.get(target, props)
					.wait(wait)
					.to(obj, t, createjs.Ease[ease])
					.wait(wait2)
					.to(obj2, t, createjs.Ease[ease2])
					.call(doneAnimating)
					.wait(wait3);
			}
		} else {
			tween = target.zimTween = createjs.Tween.get(target, props)
				.wait(wait)
				.to(obj, t, createjs.Ease[ease])
				.call(doneAnimating)
				.wait(wait3);
		}

		if (!css && ticker) var zimTicker = target.zimTicker = zim.Ticker.add(function(){}, target.getStage());

		function doneAnimating() {
			if (call && typeof call == 'function') {(call)(params);}
			if (props.loop) {
				if (count > 0) {
					if (currentCount < count) {
						currentCount++;
						return;
					}
				} else {
					return;
				}
			}
			tween.setPaused(true);
			if (!css && ticker) setTimeout(function(){zim.Ticker.remove(zimTicker);},200);
		}
		function doRewindCall() {
			if (call2 && typeof call2 == 'function') {(call2)(params2);}
		}
        target.stopZimAnimate = target.stopZimMove = function() {
            createjs.Tween.removeTweens(target);
            if (!css && ticker) setTimeout(function(){zim.Ticker.remove(target.zimTicker);},200);
        }
        target.pauseZimAnimate = target.pauseZimMove = function(v) {
            if (zot(v)) v = true;
            if (v) {
                target.zimTween.setPaused(true);
     			if (!css && ticker) setTimeout(function(){zim.Ticker.remove(zimTicker);},200);
            } else {
                target.zimTween.setPaused(false);
     			if (!css && ticker) zim.Ticker.add(zimTicker, target.getStage());
            }
        }
		return target;
	}//-45

/*--
zim.scale = function(obj, scale)

scale
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Convenience function to do scaleX and scaleY in one call.
Also see zim.scaleTo(), zim.fit() and zim.Layout().

EXAMPLE
zim.scale(circle, .5);

OR with ZIM 4TH method
circle.scale(.5);
END EXAMPLE

PARAMETERS
obj - object to scale
scale - the scale (1 being full scale, 2 being twice as big, etc.)

RETURNS obj for chaining
--*///+42
	zim.scale = function(obj, scale) {
		z_d("42");
		if (zot(obj) || zot(obj.scaleX)) return;
		if (zot(scale)) scale=1;
		obj.scaleX = obj.scaleY = scale;
		return obj;
	}//-42

/*--
zim.scaleTo = function(obj, boundObj, percentX, percentY, type)

scaleTo
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Scales object to a percentage of another object's bounds.
Percentage is from 0 - 100 (not 0-1).
Also see zim.scale(), zim.fit() and zim.Layout().

EXAMPLE
zim.scaleTo(circle, stage, 50); // scale to half the stageW
zim.scaleTo(circle, stage, 10, 20); // fit within these scalings of the stage

OR with ZIM 4TH method
circle.scaleTo(stage, 100, 100, "both"); // make an oval touch all stage edges
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
obj - object to scale
boundObj - the object that we are scaling to with percents below
percentX - (default no scaling) the scale in the x
percentY - (default no scaling) the scale in the y
type - (default "smallest") to fit inside or outside or stretch to bounds
	smallest: uses the smallest scaling keeping proportion (fit)
	biggest: uses the largest scaling keeping proportion (outside)
	both: keeps both x and y scales - may stretch object (stretch)

RETURNS obj for chaining
--*///+43
	zim.scaleTo = function(obj, boundObj, percentX, percentY, type) {

		var sig = "obj, boundObj, percentX, percentY, type";
		var duo; if (duo = zob(zim.scaleTo, arguments, sig)) return duo;
		z_d("43");
		if (zot(obj) || !obj.getBounds || !obj.getBounds()) {zog ("zim create - scaleTo(): please provide an object (with setBounds) to scale"); return;}
		if (zot(boundObj) || !boundObj.getBounds || !boundObj.getBounds()) {zog ("zim create - scaleTo(): please provide a boundObject (with setBounds) to scale to"); return;}
		if (zot(percentX)) percentX = -1;
		if (zot(percentY)) percentY = -1;
		if (percentX == -1 && percentY == -1) return obj;
		if (zot(type)) type = "smallest";
		var w = boundObj.getBounds().width * percentX / 100;
		var h = boundObj.getBounds().height * percentY / 100;
		if ((percentX == -1 || percentY == -1) && type != "both" && type != "stretch") {
			if (percentX == -1) {
				zim.scale(obj, h/obj.getBounds().height);
			} else {
				zim.scale(obj, w/obj.getBounds().width);
			}
			return obj;
		}
		if (type == "both" || type == "stretch") {
			obj.scaleX = (percentX != -1) ? w/obj.getBounds().width : obj.scaleX;
			obj.scaleY = (percentY != -1) ? h/obj.getBounds().height : obj.scaleY;
			return obj;
		} else if (type == "biggest" || type == "largest" || type == "outside") {
			var scale = Math.max(w/obj.getBounds().width, h/obj.getBounds().height);
		} else { // smallest or fit
			var scale = Math.min(w/obj.getBounds().width, h/obj.getBounds().height);
		}
		zim.scale(obj, scale);
		return obj;
	}//-43

/*--
zim.fit = function(obj, left, top, width, height, inside)

fit
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Scale an object to fit inside (or outside) a rectangle and center it.
Actually scales and positions the object.
Object must have bounds set (setBounds()).

EXAMPLE
zim.fit(circle, 100, 100, 200, 300); // fits and centers

OR with ZIM 4TH method
circle.fit(); // fits circle and centers on stage
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to fit to the rectangle
left, top, width, height - (default stage dimensions) the rectangle to fit
inside - (default true) fits the object inside the rectangle
	if inside is false then it fits the object around the bounds
	in both cases the object is centered

RETURNS an Object literal with the new and old details (bX is rectangle x, etc.):
{x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height}
--*///+46
	zim.fit = function(obj, left, top, width, height, inside) {

		var sig = "obj, left, top, width, height, inside";
		var duo; if (duo = zob(zim.fit, arguments, sig)) return duo;
		z_d("46");
		if (zot(obj) || !obj.getBounds) return;
		if (!obj.getBounds()) {
			zog("zim create - fit(): please setBounds() on object");
			return;
		}
		if (zot(left)) {
			if (!obj.getStage()) {
				zog("zim create - fit(): please add boundary dimensions or add obj to stage first");
				return;
			}
			if (!obj.getStage().getBounds()) {
				zog("zim create - fit(): please add boundary dimensions or add obj with bounds to stage first");
				return;
			}
			var stageW = obj.getStage().getBounds().width;
			var stageH = obj.getStage().getBounds().height;
			left = 0; top = 0;
			width = stageW; height = stageH;
		}
		if (zot(inside)) inside = true;

		obj.scaleX = obj.scaleY = 1;

		var w = width;
		var h = height;
		var objW = obj.getBounds().width;
		var objH = obj.getBounds().height;
		var scale;

		if (inside) { // fits dimensions inside screen
			if (w/h >= objW/objH) {
				scale = h / objH;
			} else {
				scale = w / objW;
			}
		} else { // fits dimensions outside screen
			if (w/h >= objW/objH) {
				scale = w / objW;
			} else {
				scale = h / objH;
			}
		}

		obj.scaleX = obj.scaleY = scale;

		var newW = objW * scale;
		var newH = objH * scale;

		// horizontal center
		obj.x = obj.regX*scale + left + (w-newW)/2;

		// vertical center
		obj.y = obj.regY*scale + top + (h-newH)/2;

		return {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height};

	}//-46

/*--
zim.outline = function(obj, color, size)

outline
zim function - and Display object method under ZIM 4TH

DESCRIPTION
For testing purposes.
Draws a rectangle around the bounds of obj (adds rectangle to the objects parent).
Draws a cross at the origin of the object (0,0) where content will be placed.
Draws a circle at the registration point of the object (where it will be placed in its container).
These three things could be in completely different places ;-)

NOTE: will not subsequently be resized - really just to use while building and then comment it out or delete it

EXAMPLE
var circle = new zim.Circle(50, "red");
zim.center(circle, stage);
// show registration and origin at center and bounding box around outside
zim.outline(circle);

OR with ZIM 4TH method
circle.outline();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to outline (can be transformed - scaled or rotated)
color - (default brown) the color of the outline
size - (default 2) the stroke size of the outline
RETURNS the shape if you want to remove it: obj.parent.removeChild(returnedShape);
--*///+47
	zim.outline = function(obj, color, size) {

		var sig = "obj, color, size";
		var duo; if (duo = zob(zim.outline, arguments, sig)) return duo;
		z_d("47");
		if (zot(obj) || !obj.getBounds) {zog("zim create - outline(): please provide object with bounds set"); return;}
		if (!obj.getBounds()) {zog("zim create - outline(): please setBounds() on object");	return;}
		if (!obj.parent) {zog("zim create - outline(): object should be on stage first"); return;}
		if (zot(color)) color = "brown";
		if (zot(size)) size = 2;
		var oB = obj.getBounds();
		var shape = new createjs.Shape();
		var shapeC = new createjs.Shape();
		var p = obj.parent;

		var pTL = obj.localToLocal(oB.x, oB.y, p);
		var pTR = obj.localToLocal(oB.x+oB.width, oB.y, p);
		var pBR = obj.localToLocal(oB.x+oB.width, oB.y+oB.height, p);
		var pBL = obj.localToLocal(oB.x, oB.y+oB.height, p);

		var g = shape.graphics;
		var gC = shapeC.graphics;
		g.s(color).ss(size)
			.mt(pTL.x, pTL.y)
			.lt(pTR.x, pTR.y)
			.lt(pBR.x, pBR.y)
			.lt(pBL.x, pBL.y)
			.lt(pTL.x, pTL.y);

		// subtract a scaled top left bounds from the top left point
		zero = {x:pTL.x-oB.x*obj.scaleX, y:pTL.y-oB.y*obj.scaleY};

		// cross at 0 0
		var s = 10;
		var ss = s+1;
		gC.s("white").ss(size+2);
		gC.mt(-ss, 0).lt(ss, 0);
		gC.mt(0, -ss).lt(0, ss);
		gC.s(color).ss(size);
		gC.mt(-s, 0).lt(s, 0);
		gC.mt(0, -s).lt(0, s);
		shapeC.x = zero.x;
		shapeC.y = zero.y;
		shapeC.rotation = obj.rotation;

		// circle at registration point
		g.s("white").ss(size+2).dc(obj.x,obj.y,s+6);
		g.s(color).ss(size).dc(obj.x,obj.y,s+6);

		obj.parent.addChild(shape);
		obj.parent.addChild(shapeC);
		if (obj.getStage()) obj.getStage().update();
		return obj;
	}//-47

/*--
zim.centerReg = function(obj, container, add, index)

centerReg
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Centers the registration point on the bounds - obj must have bounds set.
If a container is provided it adds the object to the container.
A convenience function for setting both registration points at once.
Also see zim.center() for centering without changing the registration point.

EXAMPLE
var rect = new zim.Rectangle(100, 100, "blue");
zim.centerReg(rect, stage); // centers registration, centers and adds to stage
zim.animate({target:rect, obj:{rotation:360}, time:1000, ease:"linear", loop:true});

OR with ZIM 4TH method
rect.centerReg(stage);
rect.animate({obj:{rotation:360}, time:1000, ease:"linear", loop:true});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to set the regX and regY to the center
container - (default null) centers the object on and adds to the container
add - (default true) set to false to only center the object on the container
index - (default null) if provided will addChildAt the object at the index (0 being bottom)

RETURNS obj for chaining
--*///+48
	zim.centerReg = function(obj, container, add, index) {

		var sig = "obj, container, add, index";
		var duo; if (duo = zob(zim.centerReg, arguments, sig)) return duo;
		z_d("48");
		if (zot(obj) || !obj.getBounds || !obj.getBounds()) {zog("zim create - centerReg(): please provide object with bounds set"); return;}
		if (!zot(container) && (!container.getBounds || !container.getBounds())) {zog("zim create - centerReg(): please provide container with bounds set"); return;}
		var oB = obj.getBounds();
		obj.regX = oB.x + oB.width/2;
		obj.regY = oB.y + oB.height/2;
		return (container) ? zim.center(obj, container, add, index) : obj;
	}//-48

/*--
zim.center = function(obj, container, add, index)

center
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Centers the object on the container - obj and container must have bounds set.
Will default to adding the object to the container.
Also see zim.centerReg() for centering registration point at same time.

EXAMPLE
var rect = new zim.Rectangle(100, 100, "blue");
zim.center(rect, stage); // centers and adds to stage
// the below animation will be around the registration point at the corners
// this is usually not desired - see zim.centerReg() when rotating and scaling
zim.animate({target:rect, obj:{rotation:360}, time:1000, ease:"linear", loop:true});

OR with ZIM 4TH method
rect.center(stage);
rect.animate({obj:{rotation:360}, time:1000, ease:"linear", loop:true});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to center
container - centers the object on and adds to the container
add - (default true) set to false to only center and not add the object to the container
index - (default null) if provided will addChildAt the object at the index (0 being bottom)

RETURNS obj for chaining
--*///+48.1
	zim.center = function(obj, container, add, index) {

		var sig = "obj, container, add, index";
		var duo; if (duo = zob(zim.center, arguments, sig)) return duo;
		z_d("48.1");
		if (zot(obj) || !obj.getBounds || !obj.getBounds()) {zog("zim.center(): please provide object with bounds set"); return;}
		if (zot(container) || !container.getBounds || !container.getBounds()) {zog("zim.center(): please provide container with bounds set"); return;}

		// get the container bounds before adding the object
		var cB = container.getBounds();

		if (zot(add)) add = true;
		if (add && container.addChild) {
            if (zot(index) || Number.isNaN(index)) {
                container.addChild(obj);
            } else {
                container.addChildAt(obj, index);
            }
        }

		// get registration point of object in coordinates of the container
		var reg = obj.localToLocal(obj.regX, obj.regY, container);

		// get bounds of the object in global space even if object is rotated and scaled
		// this makes a rectangle surrounding a rotated object - so bigger but parallel edges to the x and y
		var glob = zim.boundsToGlobal(obj);

		// now project this rectangle into the container coordinates
		// passing in a rectangle (glob) will make this act on the rectangle rather than the bounds
		// flip (true) means we go from global to local in the container
		var loc = zim.boundsToGlobal(container, glob, true);

		// the positions are all in the container coordinate so do the calculation
		obj.x = cB.x + cB.width/2 - loc.width/2  + (reg.x-loc.x);
		obj.y = cB.y + cB.height/2 - loc.height/2  + (reg.y-loc.y);

		if (!add && container.getStage && container.getStage() && obj.parent) {
			var p = container.localToLocal(obj.x, obj.y, obj.parent);
			obj.x = p.x;
			obj.y = p.y;
		}
		return obj;
	}//-48.1

/*--
zim.place = function(obj, id)

place
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Sets the object to drag and logs to the console the x and y.
This is for when building you can move an object around to position it
then when positioned, look at the console for the positioning code.
In your code, set the reported x and y and delete the place call.

EXAMPLE
zim.place(circle, "circle"); // lets you drag circle around - then see console

OR with ZIM 4TH method
circle.place("circle");
END EXAMPLE

PARAMETERS
obj - object to place
id - (default null) the name of the object so that the log gives you complete code

RETURNS undefined
--*///+49
	zim.place = function(obj, id) {
		z_d("49");
		if (zot(obj)) return;
		if (zot(id)) id = "obj";
		function report() {zog(id+".x = " + Math.round(obj.x) +  "; "+id+".y = " + Math.round(obj.y) + ";");}
		zim.drag({obj:obj, currentTarget:true, dragCursor:"crosshair"});
		zog("place "+id+" - to get new position");
		obj.on("click", report);
	}//-49

/*--
zim.expand = function(obj, padding, paddingVertical)

expand
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Adds a createjs hitArea to an object with an extra padding of padding.
Good for making mobile interaction better on labels, buttons, etc.

EXAMPLE
var circle = new zim.Circle(10, "red");
zim.center(circle, stage);
zim.expand(circle); // makes hit area bigger
circle.on("click", function(){zog("yes");});

OR with ZIM 4TH method
circle.center(stage);
circle.expand();
END EXAMPLE

PARAMETERS
obj - object on which you wish to expand the hit area
padding - (default 20) how many pixels to expand bounds
paddingVertical - (default null) the vertical padding (making padding for horizontal)

RETURNS obj for chaining
--*///+50
	zim.expand = function(obj, padding, paddingVertical) {
		z_d("50");
		if (zot(obj) || !obj.getBounds) {zog("zim create - expand(): please provide object with bounds set"); return;}
		if (zot(padding)) padding = 20;
		if (zot(paddingVertical)) paddingVertical = padding;
		var oB = obj.getBounds();
		var rect = new createjs.Shape();
		rect.graphics.f("0").r(oB.x-padding,oB.y-paddingVertical,oB.width+2*padding,oB.height+2*paddingVertical);
		obj.hitArea = rect;
		return obj;
	}//-50

/*--
zim.mask = function(obj, mask)

mask
zim function - and Display object method under ZIM 4TH

DESCRIPTION
Specifies a mask for an object - the object can be any display object.
The mask can be a ZIM (or CreateJS) Shape or a ZIM Rectangle, Circle or Triangle.
Returns the mask which can then be animated using ZIM move() or animate().
This was added because it is nice to use positioned ZIM shapes (which are containers) as masks
and yet, ony Shape objects can be used as masks
and you often have to transform them properly which can be confusing.

NOTE: the mask you pass in can still be seen but you can set its alpha to 0
just watch, if you want to interact with the mask it cannot have 0 alpha
unless you provide a hit area with zim.expand() for instance (use 0 for padding)

EXAMPLE
var label = new zim.Label("BIG", 200, null, "white");
zim.center(label, stage);
var rect = new zim.Rectangle(200,100,"black");
zim.center(rect, stage).alpha = 0;
zim.mask(label, rect);
zim.drag(label);

OR with ZIM 4TH method
var rect = new zim.Rectangle(200,100,"black");
rect.center(stage).alpha = 0;
var label = new zim.Label("BIG", 200, null, "white");
label.center(stage).drag().mask(rect);
// not sure we really recommend such dramatic chaining...
END EXAMPLE

NOTE: to drag something, the alpha cannot be 0
so we can use zim.expand(rect, 0) to assign a hit area
then we can drag even if the alpha is 0 (or set the alpha to .01)

EXAMPLE
var label = new zim.Label("BIG", 200, null, "white");
zim.center(label, stage);
var rect = new zim.Rectangle(200,100,"black");
zim.expand(rect, 0); // adds a hit area to rect so we can drag alpha 0
zim.center(rect, stage).alpha = 0;
zim.mask(label, rect);
zim.drag(rect);

OR with ZIM 4TH method
rect.expand(0);
rect.center(stage).alpha = 0;
label.mask(rect);
rect.drag();
END EXAMPLE

NOTE: drag works specially with zim shapes to make this work
otherwise, if you want to reposition your mask
then save the return value of the mask call in a variable
and move the mask object using that variable
or use a zim.Shape or createjs.Shape directly to avoid this issue

EXAMPLE
var mask = zim.mask(label, rect);
mask.x += 100;
// note: rect.x += 100 will not work
// because the mask is inside the rect and does not change its x
// so you would animate this mask too rather than the rect:
zim.animate(mask, {scale:.5}, 500);
END EXAMPLE

PARAMETERS
obj - the object to mask
mask - the object that have its shape be the mask

RETURNS the mask shape (different than the mask if using ZIM shapes)
--*///+50.1
	zim.mask = function(obj, mask) {
		z_d("50.1");
		if (zot(obj) || zot(mask)) {zog("zim create - mask(): please provide obj and mask"); return;}
		var m;
		if (mask.shape) { // zim.Rectangle, Circle or Triangle
			mask.zimMask = m = mask.shape.clone();
			m.x = mask.x;
			m.y = mask.y;
			m.rotation = mask.rotation;
			m.scaleX = mask.scaleX;
			m.scaleY = mask.scaleY;
			m.skewX = mask.skewX;
			m.skewY = mask.skewY;
			mask.addChildAt(m,0);
			m.alpha = 0;
		} else {
			m = mask;
		}
		obj.mask = m;
		return m;
	}//-50.1


////////////////  ZIM BUILD  //////////////

// zimbuild.js adds common building classes for digidos (interactive media)
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com


/*--
zim.OPTIMIZE

OPTIMIZE
zim constant

DESCRIPTION
A setting that relates to how stage.update() is used by the components.
Default is false which means some components will update the stage automatically:
	the Slider will update the stage so that you can see the knob slide;
	the CheckBox and RadioButtons when checked will update the stage;
	the Tabs change button colors and then update the stage;
	closing of a Pane will update the stage
	the Stepper also updates as does changing color of a button, label, etc.
However, concurrent stage.update() calls can slow down mobile performance.
So if you are making content for mobile you should set zim.OPTIMIZE = true;
Then you will have to stage.update() in the change event handlers
but you were probably doing things in these events and updating anyway!
Just be careful - you might be testing a checkbox and it won't check...
So it takes some getting used to running in optimized mode.

EXAMPLE
// add this to the top of your script
zim.OPTIMIZE = true;
var slider = new zim.Slider();
slider.center(stage);
// will not see the slider operate (aside from rolling over button)
// unless you call stage.update() in the change event
slider.on("change", function() {
	// do your code
	stage.update(); // now will see the slider operate
});
END EXAMPLE

components affected by OPTIMIZE:
Label, Button, Checkbox, RadioButton, Pane, Stepper, Slider, Tabs

OPTIMIZE set to true also affects the ZIM Ticker
for functions like move, animate, drag, Scroller, Parallax
See zim.Ticker as you may have to set zim.Ticker.update = true;
--*///+50.2
zim.OPTIMIZE = false;
//-50.2

/*--
zim.ACTIONEVENT

ACTIONEVENT
zim constant

DESCRIPTION
a setting that specifies the event type to trigger many of the components
default is "mousedown" which is more responsive on mobile
setting the constant to anything else, will cause the components to use "click"

for instance, with the default settings, the following components will act on mousedown
CheckBox, RadioButtons, Pane, Stepper and Tabs

EXAMPLE
// put this at the top of your code
zim.ACTIONEVENT = "click";
var checkBox = new zim.CheckBox();
checkBox.center(stage);
// note it now operates on mouseup (click)
// the default ACTIONEVENT is mousedown
END EXAMPLE
--*///+50.3
zim.ACTIONEVENT = "mousedown";
//-50.3

/*--
zim.addDisplayMembers = function(obj)

addDisplayMembers
zim function

DESCRIPTION
Function to add display methods like drag, hitTests, move, animate, center, etc. to an object.
Also adds read only width and height properties that call getBounds().
The term "members" is used because we are adding both methods and properties.
All the ZIM 4TH display objects come with these members
BUT... the native CreateJS display objects do not.
When we import assets from Adobe Animate, these are native CreateJS objects.
So we can use addDisplayMembers to add these members to a CreateJS Shape, Container, etc.

ZIM uses addDisplayMembers internally to add the members
to the ZIM shapes and components (Rectangle, Circle, Triangle, Label, Button, etc.)
as applied through the ZIM Container inheritance
as well as to the ZIM wrappers for CreateJS Container, Shape, Sprite, MovieClip objects.
The display methods call the original ZIM functions
passing the extra object parameter as the first parameter
or if DUO is being used then adds the object to the configuration object.

EXAMPLE
var shape = new createjs.Shape();
shape.graphics.beginFill("red").drawRect(0,0,200,200);
shape.setBounds(0,0,200,200); // need to set bounds to center
zim.addDisplayMembers(shape); // add methods like center, drag, etc.
shape.center(stage); // ZIM 4TH method format
stage.update();

// note: even without using zim.addDisplayMembers()
// we can use the traditional zim.center() function
var shape = new createjs.Shape();
shape.graphics.beginFill("red").drawRect(0,0,200,200);
shape.setBounds(0,0,200,200); // need to set bounds to center
zim.center(shape, stage); // use the zim function rather than the method
stage.update();

// of course we can just use a zim.Shape
// then the methods like center, drag, etc. are already added
var shape = new zim.Shape(200, 200); // passing params sets bounds
shape.graphics.beginFill("red").drawRect(0,0,200,200);
shape.center(stage);
stage.update();

// in this case, we may have well used a zim.Rectangle ;-)
var shape = new zim.Rectangle(200, 200, "red");
shape.center(stage);
stage.update();
END EXAMPLE

PARAMETERS
obj - the object to add the methods and properties to (probably a CreateJS display object)

RETURNS the object for chaining
--*///+50.4
	zim.displayMethods = {
		drag:function(rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.drag(arguments[0]);}
			else {return zim.drag(this, rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens);}
		},
		noDrag:function() {
			return zim.noDrag(this);
		},
		dragRect:function(rect) {
			return zim.dragRect(this, rect);
		},
		setSwipe:function(swipe) {
			return zim.setSwipe(this, swipe);
		},
		hitTestPoint:function(x, y) {
			return zim.hitTestPoint(this, x, y);
		},
		hitTestReg:function(b) {
			return zim.hitTestReg(this, b);
		},
		hitTestRect:function(b, num) {
			return zim.hitTestRect(this, b, num);
		},
		hitTestCircle:function(b, num) {
			return zim.hitTestCircle(this, b, num);
		},
		hitTestBounds:function(b, boundsShape) {
			return zim.hitTestBounds(this, b, boundsShape);
		},
		boundsToGlobal:function(rect, flip) {
			return zim.boundsToGlobal(this, rect, flip);
		},
		hitTestGrid:function(width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type) {
			return zim.hitTestGrid(this, width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type);
		},
		scale:function(scale) {
			return zim.scale(this, scale);
		},
		scaleTo:function(boundObj, percentX, percentY, type) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.scaleTo(arguments[0]);}
			else {return zim.scaleTo(this, boundObj, percentX, percentY, type);}
		},
		move:function(x, y, time, ease, call, params, wait, props, fps, sequence) {
			if (isDUO(arguments)) {arguments[0].target = this; return zim.move(arguments[0]);}
			else {return zim.move(this, x, y, time, ease, call, params, wait, props, fps, sequence);}
		},
		animate:function(obj, time, ease, call, params, wait, props, fps, sequence) {
			if (isDUO(arguments)) {arguments[0].target = this; return zim.animate(arguments[0]);}
			else {return zim.animate(this, obj, time, ease, call, params, wait, props, fps, sequence);}
		},
		fit:function(left, top, width, height, inside) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.fit(arguments[0]);}
			else {return zim.fit(this, left, top, width, height, inside);}
		},
		outline:function(color, size) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.outline(arguments[0]);}
			else {return zim.outline(this, color, size);}
		},
		centerReg:function(container, add, index) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.centerReg(arguments[0]);}
			else {return zim.centerReg(this, container, add, index);}
		},
		center:function(container, add, index) {
			if (isDUO(arguments)) {arguments[0].obj = this; return zim.center(arguments[0]);}
			else {return zim.center(this, container, add, index);}
		},
		place:function() {
			return zim.place(this);
		},
		expand:function(padding, paddingVertical) {
			return zim.expand(this, padding, paddingVertical);
		},
		mask:function(mask) {
			return zim.mask(this, mask);
		},
		cloneProps:function(clone) { // from CreateJS DisplayObject
			clone.alpha = this.alpha;
			clone.mouseEnabled = this.mouseEnabled;
			clone.tickEnabled = this.tickEnabled;
			clone.name = this.name;
			clone.regX = this.regX;
			clone.regY = this.regY;
			clone.rotation = this.rotation;
			clone.scaleX = this.scaleX;
			clone.scaleY = this.scaleY;
			clone.shadow = this.shadow;
			clone.skewX = this.skewX;
			clone.skewY = this.skewY;
			clone.visible = this.visible;
			clone.x  = this.x;
			clone.y = this.y;
			clone.compositeOperation = this.compositeOperation;
			clone.snapToPixel = this.snapToPixel;
			clone.filters = this.filters==null?null:this.filters.slice(0);
			clone.mask = this.mask;
			clone.hitArea = this.hitArea;
			clone.cursor = this.cursor;
			clone._bounds = this._bounds;
			return clone;
		},
		cloneChildren:function(clone) {
			if (clone.children.length) clone.removeAllChildren();
			var arr = clone.children;
			for (var i=0, l=this.children.length; i<l; i++) {
				var childClone = this.children[i].clone();
				childClone.parent = clone;
				arr.push(childClone);
			}
			return clone;
		}
	}

	zim.addDisplayMembers = function(obj) {
		z_d("50.4");
		for (var i in zim.displayMethods) {
			if (zim.displayMethods.hasOwnProperty(i)) {
				obj[i] = zim.displayMethods[i];
			}
		}
		Object.defineProperty(obj, 'width', {
			get: function() {
				// that.setBounds(null);
				var b = this.getBounds();
				return (zot(b))?null:b.width;
			},
			set: function(value) {
				zog("width is read only - use setBounds() to set");
			}
		});
		Object.defineProperty(obj, 'height', {
			get: function() {
				// that.setBounds(null);
				var b = this.getBounds();
				return (zot(b))?null:b.height;
			},
			set: function(value) {
				zog("height is read only - use setBounds() to set");
			}
		});
		return obj;
	}//-50.4

/*--
zim.Container = function(width, height)

Container
zim class - extends a createjs.Container

DESCRIPTION
A Container object is used to hold other display objects or other containers.
You can then move or scale the container and all objects inside will move or scale.
You can apply an event on a container and use the target property of the event object
to access the object in the container that caused the event
or use the currentTarget property of the event object to access the container itself.
Containers do not have bounds unless some items in the container have bounds -
at which point the bounds are the combination of the bounds of the objects with bounds.
You can manually set the bounds with setBounds(x,y,w,h) - read the CreateJS docs.
Manually set bounds will not update automatically unless you setBounds(null).

NOTE: all the ZIM shapes and components extend the zim.Container.
This means all shapes and components inherit the methods and properties below
and indeed, the zim.Container inherits all the createjs.Container methods and properties.
See the CreateJS documentation for x, y, alpha, rotation, on(), addChild(), etc.

EXAMPLE
var container = new zim.Container();
stage.addChild(container);
container.x = 100; container.y = 100;

var rect = new zim.Rectangle(100, 100, "blue");
container.addChild(rect); // add rectangle to container
var circle = new zim.Circle(40, "red");
circle.center(container) // add the circle to the container and center

container.drag(); // will drag either the rectangle or the circle
container.drag({currentTarget:true}); // will drag both the rectangle and the circle

// below will reduce the alpha of the object in the container that was clicked (target)
container.on("click" function(e) {e.target.alpha = .5; stage.update();})
// below will reduce the alpha of all the objects in the container (currentTarget)
container.on("click" function(e) {e.currentTarget.alpha = .5; stage.update();})
END EXAMPLE

PARAMETERS
width - (default null) the width of the container
height - (default width) the height of the container
	if there is a width supplied but no height then the height is set to the width
	setting these run container.setBounds(0,0,width,height);
	you should be able to container.setBounds(null) to go back to auto calculation
	but there is currently a bug in CreateJS - it will be fixed
	so for now, if you ever want to auto calculate, do not set width and height

**** this class has all the DISPLAY METHODS introduced in ZIM 4TH
**** the methods below are available in ZIM Rectangle, Circle, Triangle
**** as well as all components like: Label, Button, Slider, Dial, Tab, Pane, etc.
**** as well as the ZIM display wrappers: Container, Shape, Sprite, MovieClip and Bitmap
**** the addition of methods and display wrappers added 3.4K to the file size

METHODS
* see the ZIM Create Module functions for full documentation
* see the USAGE section that follows this list of methods
* most methods accept ZIM DUO (except for 0 or 1 parameter functions like the hitTests)

drag(rect, overCursor, dragCursor, currentTarget, swipe, localBounds, onTop, surround, slide, slideDamp, slideSnap, reg, removeTweens)
noDrag()
dragRect(rect)
setSwipe(swipe)
hitTestPoint(x, y)
hitTestReg(b)
hitTestRect(b, num)
hitTestCircle(b, num)
hitTestBounds(b, boundsShape)
boundsToGlobal(rect, flip)
hitTestGrid(width, height, cols, rows, x, y, offsetX, offsetY, spacingX, spacingY, local, type)
move(target, x, y, time, ease, call, params, wait, loop, loopCount, loopWait, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, props)
animate(target, obj, time, ease, call, params, wait, loop, loopCount, loopWait, rewind, rewindWait, rewindCall, rewindParams, sequence, sequenceCall, sequenceParams, props)
scale(scale)
scaleTo(boundObj, percentX, percentY, type)
fit(left, top, width, height, inside)
outline(color, size)
centerReg(container, add, index)
center(container, add, index)
place(id)
expand(padding, paddingVertical)
mask(mask)

USAGE
the above list of methods work on all objects that extend zim.Container
such as ZIM shapes and components (Label, Button, Slider, Dial, etc.)
also other ZIM display objects can use these methods (Shape, Bitmap, MovieClip, Sprite)

EXAMPLE
var circle = new zim.Circle();
circle.center(stage); // add circle to stage and center
circle.drag();

// alternatively, we can still use the traditional ZIM functions:
zim.center(circle, stage);
zim.drag(circle);

// ZIM DUO works the same way as before - eg.
circle.drag({slide:true});
END EXAMPLE

**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

SPECIFIC METHODS
clone() - clones all the container, its properties and all its children

PROPERTIES
width, height - read only - calculated from getBounds()
--*///+50.5
	zim.Container = function(width, height) {
		z_d("50.5");
		function makeContainer() {
			zim.addDisplayMembers(this);
			if (!zot(width)) {
				if (zot(height)) height = width;
				this.setBounds(0,0,width,height);
			}
			this.clone = function() {
				return this.cloneChildren(this.cloneProps(new zim.Container()));
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeContainer.prototype = new createjs.Container();
		makeContainer.prototype.constructor = zim.Container;
		return new makeContainer();

	}//-50.5

/*--
zim.Shape = function(width, height)

Shape
zim class - extends a createjs.Shape

DESCRIPTION
ZIM Shape lets you draw dynamic shapes beyond the ZIM provided shapes.
You make a new shape object and then draw in its graphics property
using similar commands to the HTML Canvas commands (and Flash Bitmap drawing).
See the CreateJS Easel Shapes and Graphics docs:
http://www.createjs.com/docs/easeljs/classes/Graphics.html

EXAMPLE
var shape = new zim.Shape();
shape.graphics.fill("red").drawRect(0,0,200,100);
// similar to zim.Rectangle(200, 100, "Red");

// we can draw lines, etc.
var g = shape.graphics; // shorter reference to graphics object
g.stroke("blue").moveTo(200,200).lineTo(300,300);

// we can continue to draw as much as we want in the same shape
// there is also a tiny API with shortcuts: stroke, fill, etc.
g.s("green").f("red").mt(500,500).qt(550,500,600,500);
END EXAMPLE

PARAMETERS
width - (default null) the width of the container
height - (default width) the height of the container
	if there is a width supplied but no height then the height is set to the width
	setting these run container.setBounds(0,0,width,height);
	you should be able to container.setBounds(null) to go back to auto calculation
	but there is currently a bug in CreateJS - it will be fixed
	so for now, if you ever want to auto calculate, do not set width and height
graphics - (default null) a CreateJS Graphics instance (see CreateJS docs)
	or just use the graphics property of the shape object (like usual)

METHODS
clone(recursive) - makes a copy of the shape
	recursive defaults to true so copy will have own copy of graphics
	set recursive to false to have clone share graphic property

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Shape properties, methods and events
**** for example: on(), setBounds(), cache(), x, y, alpha, rotation

PROPERTIES
width, height - read only - calculated from getBounds()
--*///+50.6
	zim.Shape = function(width, height, graphics) {
		z_d("50.6");
		function makeShape() {
			var that = this;
			zim.addDisplayMembers(this);
			if (!zot(width)) {
				if (zot(height)) height = width;
				this.setBounds(0,0,width,height);
			}
			this.clone = function(recursive) {
				if (zot(recursive)) recursive = true;
				var c = that.cloneProps(new zim.Shape(graphics));
				if (recursive) c.graphics = that.graphics.clone();
				else c.graphics = that.graphics;
				return c;
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeShape.prototype = new createjs.Shape(graphics);
		makeShape.prototype.constructor = zim.Shape;
		return new makeShape();

	}//-50.6

/*--
zim.Bitmap = function(image, id)

Bitmap
zim class - extends a createjs.Bitmap

DESCRIPTION
Makes a Bitmap object from an image.
It is best to use the loadAssets() method of ZIM Frame
to preload the image and then use the asset() method to access the Bitmap.
See the ZIM Frame class and asset example on the ZIM Frame page of templates.

EXAMPLE
var frame = new zim.Frame();
frame.on("ready", function() {
	var stage = frame.stage;
	frame.loadAssets("logo.jpg");
	frame.on("complete", function() {
		var logo = frame.asset("logo.jpg"); // logo is a zim.Bitmap
		logo.center(stage);
		stage.update();
	});
});
END EXAMPLE

PARAMETERS
image - an HTML image URL (may not load right away - see zim.Frame loadAssets)
id - an optional id

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
width, height - read only - calculated from getBounds()
id - the filename used in the frame.loadAssets()
	if you add the path the file name then it will be included with the id
	if you add the path with the path parameter, it will not be included with the id
--*///+50.7
	zim.Bitmap = function(image, id) {
		z_d("50.7");
		function makeBitmap() {
			this.id = id;
			zim.addDisplayMembers(this);
			this.clone = function() {
				return this.cloneProps(new zim.Bitmap(image, id));
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeBitmap.prototype = new createjs.Bitmap(image);
		makeBitmap.prototype.constructor = zim.Bitmap;
		return new makeBitmap();

	}//-50.7

/*--
zim.Sprite = function(spritesheet)

Sprite
zim class - extends a createjs.Sprite

DESCRIPTION
A Sprite plays an animation of a CreateJS SpriteSheet object
which is a set of images layed out in one file.
See the CreateJS Easel Sprite and SpriteSheet docs:
http://www.createjs.com/docs/easeljs/classes/Sprite.html
http://www.createjs.com/docs/easeljs/classes/SpriteSheet.html

EXAMPLE
// inside zim.Frame template
// robot.png is a sprite sheet made by ZOE based on a Flash swf
// you can also make your own with Photoshop or Texture Packer

frame.loadAssets("robot.png");
frame.on("complete", function() {

	// using ZOE to export swf animation to spritesheet data
	// spritesheet data uses the image name, not the Bitmap itself
	var image = frame.asset("robot.png").image;
	var spriteData = {
		"framerate":24,
		"images":[image],
		"frames":[[0, 0, 256, 256, 0, -54, -10], many more - etc.],
		"animations":{}
	};

	// create a createjs.SpriteSheet and then a zim.Sprite
	var spriteSheet = new createjs.SpriteSheet(spriteData);
	var animation = new zim.Sprite(spriteSheet);
	animation.center(stage); // now can use ZIM 4TH on Sprite
	animation.play();
	zim.Ticker.always(stage);
	zim.Ticker.setFPS(24);

	// animation.stop();
	// animation.gotoAndStop(5); // etc.
});
END EXAMPLE

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Sprite properties, methods and events
**** for example: on(), setBounds(), addChild(), clone(), cache(), x, y, alpha, rotation

PROPERTIES
width, height - read only - calculated from getBounds()
--*///+50.8
	zim.Sprite = function(spriteSheet) {
		z_d("50.8");
		function makeSprite() {
			zim.addDisplayMembers(this);
			this.clone = function() {
				return this.cloneProps(new zim.Sprite(spriteSheet));
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeSprite.prototype = new createjs.Sprite(spriteSheet);
		makeSprite.prototype.constructor = zim.Sprite;
		return new makeSprite();

	}//-50.8

/*--
zim.MovieClip = function()

MovieClip
zim class - extends a createjs.MovieClip

DESCRIPTION
A MovieClip adds timelines to a Container.
The timelines are zim.move() or zim.animate() zimTween properties.
The zimTween property returns a CreateJS Tween object.
Primarily made to support Adobe Animate MovieClip export.
*Consider this experimental for the moment...

EXAMPLE
var movieClip = new zim.MovieClip();
var circle = new zim.Circle(20, frame.blue);
// circle needs to be on stage for zim.animate()
// movieClip will add it to itself anyway
stage.addChild(circle);

// *not sure why time is messed up
movieClip.timeline.addTween(circle.animate({obj:{scale:3}, time:100, rewind:true}).zimTween);
movieClip.play();
movieClip.center(stage);
stage.on("stagemousedown", function() {
	movieClip.paused = !movieClip.paused;
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
// from the CreateJS MovieClip docs: http://www.createjs.com/docs/easeljs/classes/MovieClip.html
mode - (default "independent") or single_frame (based on startPosition) or synched (syncs to parent)
startPosition - (default 0) the start position of the MovieClip (*could not get to work)
loop - (default true) set to false not to loop
labels - (default null) declare label property with position value
	eg. {explode:20} to use with gotoAndPlay("explode") rather than gotoAndPlay(20)
	*could not get labels to work either

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for MovieClip properties, methods and events
**** for example: on(), setBounds(), addChild(), clone(), cache(), x, y, alpha, rotation

PROPERTIES
width, height - read only - calculated from getBounds()
--*///+50.9
	zim.MovieClip = function(mode, startPosition, loop, labels) {
		var sig = "mode, startPosition, loop, labels";
		var duo; if (duo = zob(zim.MovieClip, arguments, sig)) return duo;
		z_d("50.9");
		function makeMovieClip() {
			zim.addDisplayMembers(this);
			this.clone = function() {
				return this.cloneProps(new zim.MovieClip(mode, startPosition, loop, labels));
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeMovieClip.prototype = new createjs.MovieClip();
		makeMovieClip.prototype.constructor = zim.MovieClip;
		return new makeMovieClip(mode, startPosition, loop, labels);

	}//-50.9

/*--
zim.Circle = function(radius, fill, stroke, strokeSize)

Circle
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a circle shape inside a container.
The registration and origin will be the center.
NOTE: mouseChildren is turned to false for all zim Shape containers.

EXAMPLE
var circle = new zim.Circle(50, "red");
circle.center(stage);

// or with 10 pixel grey stroke
var circle = new zim.Circle(50, "red", "#666", 10);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
radius - (default 50) the radius ;-)
fill - (default black) the fill color as any CSS color
stroke - (default null) the stroke color
strokeSize - (default 1 if stroke is set) the size of the stroke

METHODS
setFill(color) - changes the color of the fill (or see color property)
setStroke(color) - changes the color of the stroke
setStrokeSize(size) - the size of the stroke as a number

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), clone(), cache(), x, y, alpha, rotation

PROPERTIES
shape - gives access to the circle shape
color - get and set the fill color
width, height - read only - calculated from getBounds()
mouseChildren - set to false so you do not drag the shape inside the circle
if you nest things inside and want to drag them, will want to set to true
--*///+51
	zim.Circle = function(radius, fill, stroke, strokeSize) {

		var sig = "radius, fill, stroke, strokeSize";
		var duo; if (duo = zob(zim.Circle, arguments, sig)) return duo;
		z_d("51");
		function makeCircle() {

			if (zot(radius)) radius = 50;
			if (zot(fill)) fill = "black";

			var that = this;
			this.mouseChildren = false;

			var circle = this.shape = new createjs.Shape();
			this.addChild(circle);

			var g = circle.graphics;
			var fillObj =g.beginFill(fill).command;
			if (!zot(stroke)) {
				var strokeObj = g.beginStroke(stroke).command;
				if (zot(strokeSize)) strokeSize=1;
				var strokeSizeObj = g.setStrokeStyle(strokeSize).command;
			}
			g.dc(0,0,radius);
			this.setBounds(-radius,-radius,radius*2,radius*2);

			this.setFill = function(c) {
				if (zot(c)) return;
				fill = c;
				fillObj.style = fill;
			}
			Object.defineProperty(that, 'color', {
				get: function() {
					return fill;
				},
				set: function(value) {
					that.setFill(value);
				}
			});
			this.setStroke = function(c) {
				if (!strokeObj || zot(c)) return;
				stroke = c;
				strokeObj.style = stroke;
			}
			this.setStrokeSize = function(size) {
				if (!strokeSizeObj || zot(size)) return;
				strokeSize = size;
				strokeSizeObj.width = strokeSize;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeCircle.prototype = new zim.Container();
		makeCircle.prototype.constructor = zim.Circle;
		return new makeCircle();

	}//-51

/*--
zim.Rectangle = function(width, height, fill, stroke, strokeSize, corner, flatBottom)

Rectangle
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a rectangle shape inside a container.
The registration and origin will be top left corner.
NOTE: mouseChildren is turned to false for all zim Shape containers.

EXAMPLE
var rect = new zim.Rectangle(200, 100, "blue");
rect.center(stage);

// or with rounded corners:
var rect = new zim.Rectangle({width:200, height:100, fill:"blue", corner:20});

// or with 2 pixel white stroke
var rect = new zim.Rectangle(200, 100, "blue", "white", 2);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width, height - (default 100) the width and height ;-)
fill - (default black) the fill color as any CSS color
stroke - (default null) the stroke color
strokeSize - (default 1 if stroke is set) the size of the stroke
corner - (default 0) the round of corner
flatBottom - (default false) top corners can round and bottom stays flat (used for ZIM Tabs)

METHODS
setFill(color) - changes the color of the fill (or see color property)
setStroke(color) - changes the color of the stroke
setStrokeSize(size) - the size of the stroke as a number

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), clone(), cache(), x, y, alpha, rotation

PROPERTIES
shape - gives access to the circle shape
color - get and set the fill color
width, height - read only - calculated from getBounds()
mouseChildren - set to false so  you do not drag the shape inside the rectangle
if you nest things inside and want to drag them, will want to set to true
--*///+52
	zim.Rectangle = function(width, height, fill, stroke, strokeSize, corner, flatBottom) {

		var sig = "width, height, fill, stroke, strokeSize, corner, flatBottom";
		var duo; if (duo = zob(zim.Rectangle, arguments, sig)) return duo;
		z_d("52");
		function makeRectangle() {

			if (zot(width)) width = 100;
			if (zot(height)) height = 100;
			if (zot(fill)) fill = "black";
			if (zot(corner)) corner = 0;
			if (zot(flatBottom)) flatBottom = false;

			var that = this;
			this.mouseChildren = false;

			var rectangle = this.shape = new createjs.Shape();
			this.addChild(rectangle);

			var g = rectangle.graphics;
			var fillObj =g.beginFill(fill).command;
			if (!zot(stroke)) {
				var strokeObj = g.beginStroke(stroke).command;
				if (zot(strokeSize)) strokeSize=1;
				var strokeSizeObj = g.setStrokeStyle(strokeSize).command;
			}

			if (corner > 0) {
				if (flatBottom) {
					g.rc(0,0,width,height,corner,corner,0,0);
				} else {
					g.rr(0,0,width,height,corner);
				}
			} else {
				g.r(0,0,width,height);
			}

			this.setBounds(0,0,width,height);

			this.setFill = function(c) {
				if (zot(c)) return;
				fill = c;
				fillObj.style = fill;
			}
			Object.defineProperty(that, 'color', {
				get: function() {
					return fill;
				},
				set: function(value) {
					that.setFill(value);
				}
			});
			this.setStroke = function(c) {
				if (!strokeObj || zot(c)) return;
				stroke = c;
				strokeObj.style = stroke;
			}
			this.setStrokeSize = function(size) {
				if (!strokeSizeObj || zot(size)) return;
				strokeSize = size;
				strokeSizeObj.width = strokeSize;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeRectangle.prototype = new zim.Container();
		makeRectangle.prototype.constructor = zim.Rectangle;
		return new makeRectangle();

	}//-52

/*--
zim.Triangle = function(a, b, c, fill, stroke, strokeSize, center, adjust)

Triangle
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a triangle shape inside a container using three line lengths.
Passing one length parameter makes an equilateral triangle.
Passing two length parameters makes an isosceles triangle.
Passing -1 as the last length parameter makes a 90 degree triangle.
NOTE: mouseChildren is turned to false for all zim Shape containers.

EXAMPLE
var tri = new zim.Triangle(200, null, null, "green");
tri.center(stage);

// all three sides specified - tall pointy triangle with yellow stroke of 10 pixels
var tri = new zim.Triangle(100, 200, 200, "green", "yellow", 10);

// here we adjust so rotation looks better
var tri = new zim.Triangle({a:200, fill:"green", adjust:30});
tri.center(stage);
tri.animate({obj:{rotation:360}, time:3000, ease:"linear", loop:true});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
a, b and c - (default 100) the lengths of the sides
	a will run horizontally along the bottom
	b is upwards and c is back to the origin
	if c is set to -1 will assume a 90 angle
fill - (default black) the fill color as any CSS color
stroke - (default null) the stroke color
strokeSize - (default 1 if stroke is set) the size of the stroke
center - (default true) puts the registration point to the center
adjust - (default 0) pixels to bring center towards vertical base
	the actual center is not really the weighted center

METHODS
setFill(color) - changes the color of the fill (or see color property)
setStroke(color) - changes the color of the stroke
setStrokeSize(size) - the size of the stroke as a number

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), clone(), cache(), x, y, alpha, rotation

PROPERTIES
shape - gives access to the triangle shape
color - get and set the fill color
width, height - read only - calculated from getBounds()
mouseChildren - set to false so  you do not drag the shape inside the triangle
if you nest things inside and want to drag them, will want to set to true
--*///+53
	zim.Triangle = function(a, b, c, fill, stroke, strokeSize, center, adjust) {

		var sig = "a, b, c, fill, stroke, strokeSize, center, adjust";
		var duo; if (duo = zob(zim.Triangle, arguments, sig)) return duo;
		z_d("53");
		function makeTriangle() {

			if (zot(a)) a = 100;
			if (zot(b)) b = a;
			if (zot(c)) c = b;
			if (c==-1) c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
			if (zot(fill)) fill = "black";
			if (zot(center)) center = true;
			if (zot(adjust)) adjust = 0;

			this.mouseChildren = false;
			var that = this;

			var lines = [a,b,c];
			lines.sort(function(a, b){return b-a});
			aa = lines[0];
			bb = lines[1];
			cc = lines[2];

			if (aa > bb+cc) {
				zog("zim build - Triangle(): invalid triangle lengths");
				return;
			}

			var tri = this.shape = new createjs.Shape();
			this.addChild(tri);

			var g = tri.graphics;
			var fillObj =g.beginFill(fill).command;
			if (!zot(stroke)) {
				var strokeObj = g.beginStroke(stroke).command;
				if (zot(strokeSize)) strokeSize=1;
				var strokeSizeObj = g.setStrokeStyle(strokeSize).command;
			}

			g.mt(0,0);
			this.one={x:0,y:0};
			g.lt(a,0);
			this.two={x:a,y:0};

			// find biggest angle with cosine rule
			var angle1 = Math.acos( (Math.pow(bb,2) + Math.pow(cc,2) - Math.pow(aa,2)) / (2 * bb * cc) ) * 180 / Math.PI;

			// use the sine rule for next biggest angle
			var angle2 = Math.asin( bb * Math.sin(angle1 * Math.PI / 180) / aa ) * 180 / Math.PI;

			// find last angle
			var angle3 = 180 - angle1 - angle2;

			// the next line is b the angle will be relative to the length of c
			// if c is the longest, then the angle is angle1
			// if c is the second longest, then the angle is angle2, etc.

			var nextAngle;
			if (c == aa) {nextAngle = angle1}
			else if (c == bb) {nextAngle = angle2}
			else {nextAngle = angle3}

			var backX = Math.cos(nextAngle * Math.PI / 180) * b;
			var upY = Math.sin(nextAngle * Math.PI / 180) * b;

			var width = Math.max(a, a-backX);
			var height = upY
			this.setBounds(0,0,width,height);
			tri.y = height;

			g.lt(a-backX,0-upY);
			this.three={x:a-backX,y:0-upY};
			g.cp();

			if (center) {
				this.regX = width/2;
				this.regY = height/2+adjust;
			}
			this.setFill = function(c) {
				if (zot(c)) return;
				fill = c;
				fillObj.style = fill;
			}
			Object.defineProperty(that, 'color', {
				get: function() {
					return fill;
				},
				set: function(value) {
					that.setFill(value);
				}
			});
			this.setStroke = function(c) {
				if (!strokeObj || zot(c)) return;
				stroke = c;
				strokeObj.style = stroke;
			}
			this.setStrokeSize = function(size) {
				if (!strokeSizeObj || zot(size)) return;
				strokeSize = size;
				strokeSizeObj.width = strokeSize;
			}

		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeTriangle.prototype = new zim.Container();
		makeTriangle.prototype.constructor = zim.Triangle;
		return new makeTriangle();

	}//-53

/*--
zim.Label = function(text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions)

Label
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a label - wraps the createjs Text object.
Can use with Button, CheckBox, RadioButtons and Pane.
Text seems to come in different sizes so we do our best.
Have tended to find that left and alphabetic are most consistent across browsers.
Custom fonts loaded through css can be used as well.
NOTE: can wrap text at given width using lineWidth parameter.

EXAMPLE
var label = new zim.Label("Hello");
label.center(stage); // adds label to and centers on the stage

var label = new zim.Label({
	text:"CLICK",
	size:100,
	font:"courier",
	color:"white",
	rollColor:"red",
	fontOptions:"italic bold"
});
stage.addChild(label);
label.x = label.y = 100;
label.on("click", function(){zog("clicking");});
END EXAMPLE

PARAMETERS - supports DUO - parameters or single object with properties below
text - String for the the text of the label
size - (default 36) the size of the font in pixels
font - (default arial) the font or list of fonts for the text
color - (default "black") color of font (any CSS color)
rollColor - (default color) the rollover color of the font
shadowColor - (default -1) for no shadow - set to any css color to see
shadowBlur - (default 14) if shadow is present
align - ((default "left") text registration point alignment also "center" and "right"
valign - (default "top") vertical registration point alignment alse "middle / center", "bottom"
lineWidth - (default false) for no wrapping (use \n) Can set to number for wrap
lineHeight - (default getMeasuredLineHeight) set to number to adjust line height
fontOptions - (default null) css values in order for font-style font-variant font-weight

METHODS
showRollColor(boolean) - true to show roll color (used internally)
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - to get rid of the button and listeners

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
label - references the text object of the label
color - gets or sets the label text color
rollColor - gets or sets the label rollover color
text - references the text property of the text object
width, height - read only - calculated from getBounds()
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties

EVENTS
dispatches no events
--*///+54
	zim.Label = function(text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions) {

		var sig = "text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight, fontOptions";
		var duo; if (duo = zob(zim.Label, arguments, sig)) return duo;
		z_d("54");
		function makeLabel() {

			if (zot(text)) text="LABEL";
			if (text === "") text = " ";
			if (zot(size)) size=36;
			if (zot(font)) font="arial";
			if (zot(color)) color="black";
			if (zot(rollColor)) rollColor=color;
			if (zot(shadowColor)) shadowColor=-1;
			if (zot(shadowBlur)) shadowBlur=14;
			if (zot(align)) align="left";
			if (zot(valign)) valign="top";
			if (zot(fontOptions)) fontOptions="";

			var that = this;
			this.mouseChildren = false;

			var obj = this.label = new createjs.Text(String(text), fontOptions + " " + size + "px " + font, color);
			obj.textAlign = align;
			obj.lineWidth = lineWidth;
			obj.lineHeight = lineHeight;
			obj.textBaseline = "alphabetic";
			if (shadowColor != -1 && shadowBlur > 0) obj.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			this.addChild(obj);

			var backing = new createjs.Shape();
			backing.graphics.f("black").r(0,0,this.getBounds().width,this.getBounds().height);
			this.hitArea = backing;

			function setSize() {
				var width = that.getBounds().width;
				var height = that.getBounds().height;
				var x,y;
				if (align == "center") {
					x = -width/2;
				} else if (align == "right") {
					x = -width;
				} else {
					x = 0;
				}
				if (valign == "top") {
					obj.y = size-size/6;
				} else if (valign == "bottom") {
					y = -(size-size/6);
				} else {
					y = -size*.5;
					obj.y = size*.3;
				}
			}
			setSize();

			Object.defineProperty(that, 'text', {
				get: function() {
					var t = (obj.text == " ") ? "" : obj.text;
					return t;
				},
				set: function(value) {
					if (zot(value)) {value = " ";}
					obj.text = String(value);
					setSize();
				}
			});

			Object.defineProperty(that, 'color', {
				get: function() {
					return color;
				},
				set: function(value) {
					color = value;
					obj.color = color;
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(that, 'rollColor', {
				get: function() {
					return rollColor;
				},
				set: function(value) {
					rollColor = value;
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
					obj.color = color;
					that.mouseChildren = false;
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			this.showRollColor = function(yes) {
				if (zot(yes)) yes = true;
				if (yes) {
					obj.color = rollColor;
				} else {
					obj.color = color;
				}
				if (that.getStage()) that.getStage().update();
			}

			this.on("mouseover", function(e) {that.showRollColor();});
			this.on("mouseout", function(e) {that.showRollColor(false);});

			this.clone = function() {
				return that.cloneProps(new zim.Label(that.text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth, lineHeight));
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeLabel.prototype = new zim.Container();
		makeLabel.prototype.constructor = zim.Label;
		return new makeLabel();

	}//-54

/*--
zim.Button = function(width, height, label, color, rollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom)

Button
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Makes a rectangular button with rollover and more features.
You will need to pass in a zim.Label.To change the font properties of the button from the default.
You will then need to add the button to the stage and add a mousedown or click event.
Button rollover is done automatically.

EXAMPLE
var button = new zim.Button("CLICK");
button.center(stage);
button.on("click", function(){zog("clicking");});

// OR add custom label (needed to change label color for instance)
var label = new zim.Label({
	text:"POWER OPTION",
	size:40,
	color:"violet",
	fontOptions:"bold"
});
var button = new zim.Button({
	label:label,
	width:390,
	height:110,
	color:"purple",
	rollColor:"MediumOrchid",
	borderThickness:8,
	borderColor:"violet",
	gradient:.3,
	corner:0
});
button.center(stage);
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 200) the width of the button
height - (default 60) the height of the button
label - (default "CLICK") ZIM Label or plain text with default settings (white)
color - (default "orange") backing color of button (any CSS color)
rollColor - (default "lightorange") rollover color of button
borderColor - (default null) for no border - set border color to see
borderThickness - (default 1) thickness of border (needs borderColor set)
corner - (default 20) the round of the corner (set to 0 for no corner)
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no shadow
shadow blur - (default 14) how blurred the shadow is if the shadow is set
hitPadding - (default 0) adds extra hit area to the button (good for mobile)
gradient - (default 0) 0 to 1 (try .3) adds a gradient to the button
gloss - (default 0) 0 to 1 (try .1) adds a gloss to the button
flatBottom - (default false) top corners can round and bottom stays flat (used for ZIM Tabs)

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - to get rid of the button and listeners

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
width, height - read only - calculated from getBounds()
text - references the text property of the Label object of the button
label - gives access to the label
backing - references the backing (zim.Rectangle) of the button
enabled - default is true - set to false to disable
color - get or set non-rolled on backing color
rollColor - get or set rolled on backing color

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties

EVENTS
dispatches no events - you make your own click event (or mousedown for mobile)
--*///+55
	zim.Button = function(width, height, label, color, rollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom) {

		var sig = "width, height, label, color, rollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom";
		var duo; if (duo = zob(zim.Button, arguments, sig)) return duo;
		z_d("55");
		function makeButton() {

			if (zot(width)) width=200;
			if (zot(height)) height=60;
			if (zot(color)) color="#C60";
			if (zot(rollColor)) rollColor="#F93";
			if (zot(borderColor)) borderColor=null;
			if (zot(borderThickness)) borderThickness=1;
			if (zot(corner)) corner=20;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=14;
			if (zot(hitPadding)) hitPadding=0;
			if (zot(gradient)) gradient = 0;
			if (zot(gloss)) gloss = 0;
			if (zot(flatBottom)) flatBottom = false;
			if (zot(label)) label = "PRESS";
			// text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 36, "arial", "white", null, null, null, "center", "middle");

			var that = this;
			this.mouseChildren = false;
			this.cursor = "pointer";

			var buttonBacking = new zim.Rectangle(width,height,color,borderColor,borderThickness,corner,flatBottom);
			this.addChild(buttonBacking);
			this.backing = buttonBacking;
			var corner2 = (flatBottom) ? 0 : corner;

			if (gradient > 0) { // add an overlay
				var gr = new createjs.Shape();
				gr.graphics.lf(["rgba(255,255,255,"+gradient+")","rgba(0,0,0,"+gradient+")"], [0, 1], 0, 0, 0, height-borderThickness);
				gr.graphics.rc(borderThickness/2, borderThickness/2, width-borderThickness, height-borderThickness, corner, corner, corner2, corner2);
			}
			buttonBacking.addChild(gr);

			if (gloss > 0) { // add an overlay
				var gl = new createjs.Shape();
				gl.graphics.f("rgba(255,255,255,"+gloss+")");
				gl.graphics.rc(borderThickness/2, borderThickness/2, width-borderThickness, (height-borderThickness)/2, corner, corner, 0, 0);
				gl.graphics.f("rgba(0,0,0,"+gloss+")");
				gl.graphics.rc(borderThickness/2, height/2, width-borderThickness, (height-borderThickness)/2, 0, 0, corner2, corner2);
			}
			buttonBacking.addChild(gl);

			if (hitPadding > 0) {
				var rect = new createjs.Shape();
				rect.graphics.f("#000").r(-hitPadding,-hitPadding,width+hitPadding*2,height+hitPadding*2);
				this.hitArea = rect;
			}

			if (shadowColor != -1 && shadowBlur > 0) buttonBacking.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			this.setBounds(0,0,width,height);

			label.x = (width - label.width)/2 - label.getBounds().x;
			label.y = (height - label.height)/2 + 2 - label.getBounds().y;
			this.addChild(label);

			this.label = label;

			Object.defineProperty(that, 'text', {
				get: function() {
					var t = (label.text == " ") ? "" : label.text;
					return t;
				},
				set: function(value) {
					label.text = value;
					label.x = (width - label.width)/2 - label.getBounds().x;
					label.y = (height - label.height)/2 + 2 - label.getBounds().y;
				}
			});

			Object.defineProperty(that, 'color', {
				get: function() {
					return color;
				},
				set: function(value) {
					color = value;
					buttonBacking.color = color;
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(that, 'rollColor', {
				get: function() {
					return rollColor;
				},
				set: function(value) {
					rollColor = value;
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
					that.mouseChildren = false;
					label.color = label.color;
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			this.on("mouseover", buttonOn);
			function buttonOn(e) {
				that.on("mouseout", buttonOff);
				buttonBacking.color = rollColor;
				that.label.showRollColor();
				if (that.getStage()) that.getStage().update();
			}

			function buttonOff(e) {
				that.off("mouseout", buttonOff);
				buttonBacking.color = color;
				that.label.showRollColor(false);
				if (that.getStage()) that.getStage().update();
			}

			this.clone = function() {
				return that.cloneProps(new zim.Button(width, height, label.clone(), color, rollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding, gradient, gloss, flatBottom));
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				that.removeChild(buttonBacking);
				that.removeChild(that.label);
				that.label.dispose();
				buttonBacking = null;
				that.label = null;
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeButton.prototype = new zim.Container();
		makeButton.prototype.constructor = zim.Button;
		return new makeButton();

	}//-55

/*--
zim.CheckBox = function(size, label, startChecked, color, margin, type)

CheckBox
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A checkbox that when pressed toggles the check and a checked property.

EXAMPLE
var checkBox = new zim.CheckBox(50, "TEST");
checkBox.center(stage);
checkBox.on("change", function() {
	zog(checkBox.checked); // will be true then false, etc.
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
size - (default 60) size in pixels (always square)
label - (default null) ZIM Label object - or String to make a default label (black)
startChecked - (default false) an initial parameter to set checked if true
color - (default "#111") the stroke and text color - background is set to a .5 alpha white
margin - (default 10) is on outside of box so clicking or pressing is easier
type - (default check) could be square (box) or x

METHODS
setChecked(Boolean) - defaults to true to set button checked (or use checked property)
clone() - makes a copy with properties such as x, y, etc. also copied

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
checked - gets or sets the check of the box
width, height - read only - calculated from getBounds()
label - gives access to the label
text - the text of the label
check - gives access to the check mark ie. check.color = "blue";
color - gets or sets the color of the check
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when pressed on but not when the checked property is set
--*///+56
	zim.CheckBox = function(size, label, startChecked, color, margin, type) {

		var sig = "size, label, startChecked, color, margin, type";
		var duo; if (duo = zob(zim.CheckBox, arguments, sig)) return duo;
		z_d("56");
		function makeCheckBox() {

			if (zot(size)) size = 60;
			if (zot(label)) label = null;
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, size*5/6, "arial", color);
			var myChecked = (zot(startChecked)) ? false : startChecked;
			if (zot(color)) color = "#111";
			if (zot(margin)) margin = 10; //20;
			if (type != "box" && type != "square" && type != "x") type = "check";

			this.setBounds(-margin, -margin, size+margin*2, size+margin*2);

			var that = this;
			this.cursor = "pointer";

			var box = new createjs.Shape();
			var g = box.graphics;
			g.f("rgba(255,255,255,.5)").r(0,0,size,size);
			g.s(color).ss(size/10).r(size/7, size/7, size-size/7*2, size-size/7*2);
			this.addChild(box);

			var fullWidth = size;

			if (label) {
				this.addChild(label);
				label.x = size*1.3 + margin; //this.getBounds().width;
				label.y = size/8;
				this.label = label;
				this.setBounds(-margin, -margin, size+margin*3+label.getBounds().width, Math.max(size+margin*2, label.getBounds().height));
				fullWidth = label.x + label.width;
			}

			var backing = new createjs.Shape();
			g = backing.graphics;
			g.f("rgba(0,0,0,.01)").r(
				this.getBounds().x,
				this.getBounds().y,
				fullWidth+(margin*2),
				this.getBounds().height
			);
			this.hitArea = backing;
			// hitArea will stop rollovers on labels but oh well

			var check = new createjs.Shape();
			var g2 = check.graphics;
			var checkColor = "#000";
			if (type == "check") {
				g2.f(checkColor).p("AnQAdICBiaIEEDZIF8nfICfB4In/KPg"); // width about 90 reg in middle
			} else if (type == "box" || type == "square") {
				g2.f(checkColor).dr(-35,-35,70,70);
			} else { // x
				g2.f(checkColor).p("AmJEVIEUkTIkXkWIB4h5IEWEYIETkTIB4B3IkTESIEQERIh4B4IkRkRIkSEVg"); // width about 90 reg in middle
			}

			var cW = 95
			check.setBounds(-cW/2, -cW/2, cW, cW);
			var scale = size/(cW+66);

			check.scaleX = check.scaleY = scale;
			check.alpha = .9;
			check.x = size/2;
			check.y = size/2;

			if (myChecked) this.addChild(check);
			this.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", toggleCheck);

			Object.defineProperty(that, 'checked', {
				get: function() {
					return myChecked;
				},
				set: function(value) {
					that.setChecked(value);
				}
			});

			Object.defineProperty(that, 'text', {
				get: function() {
					if (label) return label.text;
				},
				set: function(value) {
					if (label) {
						label.text = value;
						if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
					};
				}
			});

			Object.defineProperty(check, 'color', {
				get: function() {
					return checkColor;
				},
				set: function(value) {
					if (myChecked) {that.removeChild(check);}
					check = new createjs.Shape();
					g2 = check.graphics;
					checkColor = value;
					g2.f(checkColor).p("AnQAdICBiaIEEDZIF8nfICfB4In/KPg");
					check.scaleX = check.scaleY = scale;
					check.alpha = .9;
					check.x = size/2;
					check.y = size/2;
					if (myChecked) that.addChild(check);
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(that, 'check', {
				get: function() {
					return check;
				},
				set: function(value) {
					zog("ZIM CheckBox - check is read only");
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			function toggleCheck(e) {
				myChecked = !myChecked;
				that.setChecked(myChecked);
				that.dispatchEvent("change");
			}

			this.setChecked = function(value) {
				if (zot(value)) value = true;
				myChecked = value;
				if (myChecked) {
					that.addChild(check);
				} else {
					that.removeChild(check);
				}
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			}

			this.clone = function() {
				return that.cloneProps(new zim.CheckBox(size, label.clone(), startChecked, color, margin, type));
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeCheckBox.prototype = new zim.Container();
		makeCheckBox.prototype.constructor = zim.CheckBox;
		return new makeCheckBox();

	}//-56

/*--
zim.RadioButtons = function(size, buttons, vertical, color, spacing, margin, always)

RadioButtons
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A radio button set that lets you pick from choices.
Radio buttons can display radio buttons vertically (default) or horizontally.

EXAMPLE
var radioButtons = new zim.RadioButtons(50, ["ONE", "TWO", "THREE"]);
radioButtons.center(stage);
radioButtons.on("change", function() {
	zog(radioButtons.text); // will be ONE, TWO or THREE
	zog(radioButtons.selectedIndex); // will be 0, 1, or 2
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
size - (default 60) in pixels
buttons - an array of button data objects as follows:
	[{label:ZIM Label or text, id:optional id, selected:optional Boolean}, {etc...}]
	or just a list of labels for default labels ["hi", "bye", "what!"]
vertical - (default true) displays radio buttons vertically - set to false to display horizontally
color - (default "#111") the stroke and font color - background is set to a .5 alpha white
spacing - (size*.2 for vertical and size for horizontal) the space between radio button objects
margin - (size/5) the space around the radio button itself
always - (default false) if set true, cannot click on selection to unselect it

METHODS
setSelected(num) - sets the selected index (or use selectedIndex) -1 is default (none)
clone() - makes a copy with properties such as x, y, etc. also copied

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
selected - gets the selected object - selected.label, selected.id, etc.
selectedIndex - gets or sets the selected index of the buttons
width, height - read only - calculated from getBounds()
label - current selected label object
text - current selected label text
id - current selected id
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
dots - an array of the zim Shape dot objects. dots[0].color = "yellow";
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when pressed but not when selectedIndex is set
then ask for the properties above for info
--*///+57
	zim.RadioButtons = function(size, buttons, vertical, color, spacing, margin, always) {

		var sig = "size, buttons, vertical, color, spacing, margin, always";
		var duo; if (duo = zob(zim.RadioButtons, arguments, sig)) return duo;
		z_d("57");
		function makeRadioButtons() {

			if (zot(size)) size = 60;
			size = Math.max(5, size);
			if (zot(buttons)) return;
			if (zot(vertical)) vertical = true;
			if (zot(color)) color = "#111";
			if (zot(spacing)) spacing = (vertical) ? size*.2 : size;
			if (zot(margin)) margin =  size/5;

			var that = this;
			this.cursor = "pointer";
			this.labels = [];
			this.dots = [];
			var currentObject; // reference to the current data object
			if (typeof buttons == "string") {
				// convert to buttons object literal (for cloning)
				var bString = buttons;
				buttons = [];
				for (var i=0; i<bString.length; i++) {
					buttons.push({label:bString[i]});
				}
			}

			var buttonContainer = new zim.Container();
			this.addChild(buttonContainer);
			buttonContainer.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", pressBut);
			function pressBut(e) {
				var index = buttonContainer.getChildIndex(e.target);
				if (always) {if (that.selectedIndex == index) return;}
				that.setSelected(index);
				that.dispatchEvent("change");
			}

			// loop through data and call makeButton() each time
			makeButtons();
			var lastBut;
			function makeButtons() {
				// test for duplicate selected true properties (leave last selected)
				var data; var selectedCheck = false;
				for (var i=buttons.length-1; i>=0; i--) {
					data = buttons[i];
					if (data.selected && data.selected === true) {
						if (!selectedCheck) {
							selectedCheck = true; // first item marked selected
							that.id = data.id;
						} else {
							data.selected = "false"; // turn off selected
						}
					}
				}
				buttonContainer.removeAllChildren();
				var but; var currentLocation = 0;
				for (var i=0; i<buttons.length; i++) {
					data = buttons[i];

					if (typeof data === "string" || typeof data === "number") {
						var d = {selected:false, label:new zim.Label(data, size*5/6, "arial", color)};
						data = d;
					}
					if (data.label && typeof data.label === "string" || typeof data.label === "number") {
						data.label = new zim.Label(data.label, size*5/6, "arial", color);
					}
					that.labels.push(data.label);
					data.index = i;
					buttons[i] = data; // for cloning
					but = makeButton(data.selected, data.label);
					but.obj = data;
					if (data.selected) currentObject = but.obj;

					buttonContainer.addChild(but);

					if (vertical) {
						but.y = currentLocation;
						currentLocation += but.getBounds().height + spacing;
					} else {
						but.x = currentLocation;
						currentLocation += but.getBounds().width + spacing;
					}
				}
			}

			// making a single button - similar to CheckBox class
			function makeButton(mySelected, label) {
				var but = new zim.Container();
				but.mouseChildren = false;
				but.setBounds(-margin, -margin, size+margin*2, size+margin*2);

				var box = new createjs.Shape();
				var g = box.graphics;
				g.f("rgba(255,255,255,.5)").dc(size/2,size/2,size/1.85);
				g.s(color).ss(size/9).dc(size/2, size/2, size/2-size/2/5);
				but.addChild(box);

				var check = but.check = new zim.Circle(size/5.2);
				that.dots.push(check);
				check.mouseEnabled = false;
				check.alpha = .95;
				check.regX = check.regY = -size/2;

				var fullWidth = size;

				if (label) {
					but.addChild(label);
					label.x = but.getBounds().width;
					label.y = size/8;
					but.setBounds(-margin, -margin, size+margin*2+label.getBounds().width, Math.max(size+margin*2, label.getBounds().height));
					fullWidth = label.x + label.width;
				}
				if (mySelected) {
					but.addChild(check);
					that.label = label;
					if (that.label) that.text = label.text;
				}

				var backing = new createjs.Shape();
				g = backing.graphics;
				g.f("rgba(0,0,0,.01)").r(
					but.getBounds().x,
					but.getBounds().y,
					fullWidth+(margin*2),
					but.getBounds().height
				);
				but.hitArea = backing;
				// hitArea will stop rollovers on labels but oh well

				return(but);
			}
			if (!this.getBounds()) this.setBounds(0,0,size,size);
			this.setBounds(-margin,-margin,this.getBounds().width+margin,this.getBounds().height+margin);

			// the main function that sets a button selected (after the initial makeButton)
			// this gets called by the setter methods below and the click event up top
			this.setSelected = function(value) {
				if (zot(value)) value = -1;
				if (value != -1 && !buttonContainer.getChildAt(value)) return;
				var but;
				for (var i=0; i<buttonContainer.getNumChildren(); i++) {
					but = buttonContainer.getChildAt(i);
					but.removeChild(but.check);
				}
				if (value >= 0) {
					but = buttonContainer.getChildAt(value);
					var lastIndex = -2;
					if (currentObject) lastIndex = currentObject.index;
					currentObject = but.obj;
				}
				if (value == -1 || lastIndex == currentObject.index) {
					currentObject = null;
					that.id = null;
					that.label = null;
					that.text = "";
				} else {
					but.addChild(but.check);
					that.id = currentObject.id;
					that.label = currentObject.label;
					if (that.label) that.text = that.label.text;
				}
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			}

			// getter setter methods

			Object.defineProperty(that, 'selected', {
				get: function() {
					return currentObject;
				},
				set: function(value) {
					zog("ZIM RadioButton - selected is read only");
				}
			});

			Object.defineProperty(that, 'selectedIndex', {
				get: function() {
					return (currentObject) ? currentObject.index : -1;
				},
				set: function(value) {
					var index = value;
					if (always) {if (that.selectedIndex == index) return;}
					that.setSelected(index);
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			this.clone = function() {
				var buttonsCopy = zim.copy(buttons);
				for (var i=0; i<buttonsCopy.length; i++) {
					buttonsCopy[i].label = buttonsCopy[i].label.clone();
				}
				return that.cloneProps(new zim.RadioButtons(size, buttonsCopy, vertical, color, spacing, margin, always));
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeRadioButtons.prototype = new zim.Container();
		makeRadioButtons.prototype.constructor = zim.RadioButtons;
		return new makeRadioButtons();

	}//-57

/*--
zim.Pane = function(container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose)

Pane
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Adds a window for alerts, etc.
You need to call the pane.show() to show the pane and pane.hide() to hide it.
You do not need to add it to the stage - it adds itself centered.
You can change the x and y (the origin and registration point are in the middle).

EXAMPLE
var pane = new zim.Pane(stage, 300, 200, "Watch out!", "#CCC");
pane.show(); // pressing anywhere will close pane (see parameters for options)
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
container - container for the pane (usually the stage)
width - (default 200) width of pane
height - (default 200) height of pane
label - (default null) an optional ZIM Label (or text for default label properties)
drag - (default false) pass in true to drag the pane
resets - (default true) resets position to start on re-open - set to false to keep last position
modal - (default true) pane will close when user clicks off the pane - set to false to keep pane open
corner - (default 20) is the corner radius - set to 0 for no corner
backingAlpha - (default .14) the darkness of the background that fills the stage
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no shadow
shadow blur - (default 20) how blurred the shadow is if shadow is set
center - (default true) centers the pane and the label on the pane
	if center is false you will have to set x and y for the pane and the label
	the origin inside the pane is in the center
displayClose - (default true) closes the Pane if display backing is pressed
	if drag is set to true, displayClose will automatically be set to false

METHODS
show() - shows the pane
hide() - hides the pane
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes all events

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
width, height - read only - calculated from getBounds()
display - reference to the pane box
text - gives access to the label text
label - gives access to the label
backing - reference to the backing that covers the stage
resetX - if reset is true you can dynamically adjust the position if needed
resetY

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "close" event when closed by clicking on backing
--*///+58
	zim.Pane = function(container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose) {

		var sig = "container, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose";
		var duo; if (duo = zob(zim.Pane, arguments, sig)) return duo;
		z_d("58");
		function makePane() {

			if (zot(container) || !container.getBounds) {zog("zim build - Pane(): Please pass in a reference to a container with bounds set as first parameter");	return;}
			if (!container.getBounds()) {zog("zim build - Pane(): Please give the container bounds using setBounds()"); return;}
			if (zot(container.getStage)) {zog("zim build - Pane(): Please give the container that has a stage property"); return;}

			if (zot(width)) width=200;
			if (zot(height)) height=200;
			if (zot(label)) label = null;
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 40, "arial", "black");
			if (zot(color)) color="white";
			if (zot(drag)) drag=false;
			if (zot(resets)) resets=true;
			if (zot(modal)) modal=true;
			if (zot(corner)) corner=20;
			if (zot(backingAlpha)) backingAlpha=.14;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=20;
			if (zot(center)) center=true;
			if (zot(displayClose)) displayClose=true;
			if (drag) displayClose = false;

			var backing = this.backing = new createjs.Shape();
			// make a big backing that closes the pane when clicked
			// could also provide a close button
			var g = backing.graphics;
			g.beginFill("black");
			g.drawRect(-5000,-5000,10000,10000);
			// makes it seem like the pane has the dimensions of the display
			this.setBounds(-width/2,-height/2, width, height);

			backing.alpha = backingAlpha;
			var that = this;
			backing.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", closePane);
			function closePane(e) {
				removePane();
				container.getStage().update();
				that.dispatchEvent("close");
				e.stopImmediatePropagation();
			};
			backing.on("mousedown", function(e) {
				e.stopImmediatePropagation();
			});
			if (modal) this.addChild(backing);

			var display = this.display = new createjs.Shape();
			if (displayClose) display.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", closePane);
			display.setBounds(0, 0, width, height);
			display.regX = width/2;
			display.regY = height/2;
			g = display.graphics;
			g.beginFill(color);
			g.drawRoundRect(0, 0, width, height, corner);
			if (shadowColor != -1 && shadowBlur > 0) display.shadow = new createjs.Shadow(shadowColor, 8, 8, shadowBlur);
			display.on("click", function(e) {
				// stops the click from going through the display to the background
				e.stopImmediatePropagation();
			});

			this.resetX; this.resetY;
			if (drag) {
				display.cursor = "pointer";
				var diffX, diffY;
				display.on("mousedown", function(e) {
					if (isNaN(that.resetX)) that.resetX = that.x;
					if (isNaN(that.resetY)) that.resetY = that.y;
					diffX = e.stageX - that.x;
					diffY = e.stageY - that.y;
					display.cursor = "move";
				});

				display.on("pressmove", function(e) {
					var p = checkBounds(e.stageX-diffX, e.stageY-diffY);
					that.x = p.x;
					that.y = p.y;
					container.getStage().update();
				});

				this.on("pressup", function(e) {
					display.cursor = "pointer";
					container.getStage().update();
				});
			}

			this.addChild(display);

			if (label) {
				if (center) {
					label.x =  -label.getBounds().width/2 - label.getBounds().x;
					label.y =  -label.getBounds().height/2 - label.getBounds().y;
				}
				this.addChild(label);
				this.label = label;
				this.text = label.text;
				label.mouseEnabled = false;
			}

			Object.defineProperty(that, 'text', {
				get: function() {
					var t = (label.text == " ") ? "" : label.text;
					return t;
				},
				set: function(value) {
					label.text = value;
					if (center) {
						label.x = -label.getBounds().width/2;
						label.y = -label.getBounds().height/2;
					}
				}
			});

			this.hide = function() {
				removePane();
				if (!zim.OPTIMIZE) container.getStage().update();
			}

			function removePane() {
				container.removeChild(that);
				if (resets) {
					if (!isNaN(that.resetX)) that.x = that.resetX;
					if (!isNaN(that.resetY)) that.y = that.resetY;
				}
			}

			this.show = function() {
				if (center) {
					if (isNaN(that.resetX)) {
						that.x = (container.getBounds().width) /2;
						that.y = (container.getBounds().height) /2;
					}
				}
				container.addChild(that);
				if (container.getStage()) container.getStage().update();
			}
			function checkBounds(x,y) {
				x = Math.max(width/2, Math.min(container.getBounds().width-width/2, x));
				y = Math.max(height/2, Math.min(container.getBounds().height-height/2, y));
				return {x:x,y:y}
			}

			this.clone = function() {
				var lX = label.x; // new Panes automatically center the label
				var lY = label.y;
				var p2 = that.cloneProps(new zim.Pane(container, width, height, label.clone(), color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur, center, displayClose));
				p2.label.x = lX;
				p2.label.y = lY;
				return p2;
			}

			this.dispose = function() {
				display.removeAllEventListeners();
				that.removeChild(display);
				display = null;
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makePane.prototype = new zim.Container();
		makePane.prototype.constructor = zim.Pane;
		return new makePane();

	}//-58

/*--
zim.Window = function(width, height, color, borderColor, borderThickness, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical)

Window
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Adds a window for content that can be swiped and scrolled.

EXAMPLE
var win = new zim.Window({
	height:300,
	interactive:false,
	padding:0,
	slideDamp:.2
});
var container = new zim.Container(); // make some content
var c; spacing = 10;
for (var i=0; i<4; i++) {
	c = frame.makeCircles();
	c.x = win.width/2;
	c.y = c.width/2 + (c.width+spacing)*i;
	container.addChild(c);
}
win.add(container); // add the content to the window
win.center(stage);
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 300) the width of the window
height - (default 200) the heigth of window
color - (default #333) background color (use "rbga(0,0,0,0)" for no background)
borderColor - (default #999) border color
borderThickness - (default 1) set to 0 for no border
padding - (default 10) places the content in from edges of border (see paddingHorizontal and paddingVertical)
corner - (default 0) is the rounded corner of the window
indicatorActive - (default true) shows indicator (set to false to not)
indicatorDrag - (default false) set to true to be able to drag the indicator
indicatorColor - (default borderColor) the color of the indicator
indicatorAlpha - (default .3) the transparency of the indicator
indicatorFade - (default true) fades indicator unless being used
slide - (default true) Boolean to throw the content when drag/swipe released
slideDamp - (default .6) amount the slide damps when let go 1 for instant, .01 for long slide, etc.
slideSnap - (default "vertical") "auto" / true, "none" / false, "horizontal"
	slides past bounds and then snaps back to bounds when released
	vertical snaps when dragging up and down but not if dragging horizontal
interactive - (default true) allows interaction with content in window
	set to false and whole window will be swipeable but not interactive inside
shadowColor - (default rgba(0,0,0,.3)) the color of the shadow
shadowBlur - (default 20) set shadowBlur to -1 for no drop shadow
paddingHorizontal - (default padding) places content in from top bottom
paddingVertical - (default padding) places content in from left and right

METHODS
add(obj) - adds obj to content container of window (at padding) must have bounds set
	it is best to position and size obj first before adding
	otherwise if adjusting to outside current content size then call update()
update() - resets window scrolling if perhaps the content gets bigger or smaller
clone(recursive) - makes a copy with properties such as x, y, etc. also copied
	recursive (default true) clones the window content as well (set to false to not clone content)
dispose() - removes event listeners from Window and content and removes any Ticker functions

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
width, height - read only - calculated from getBounds()
backing - CreateJS Shape used for backing of Window
content - ZIM Container used to hold added content
indicator - data object that holds the following properties (with defaults):
	you can set after object is made...
	indicator.size = 6;
	indicator.spacing = 3 + size + borderThickness / 2;
	indicator.margin = 0; // adds extra space only at end by scrollbars
	indicator.corner = indicator.size / 2;
	indicator.showTime = 500; // ms to fade in
	indicator.fadeTime = 3000; // ms to fade out
scrollX - gets and sets the content x position in the window (this will be negative)
scrollY - gets and sets the content y position in the window (this will be negative)
scrollXMax - gets the max we can scroll in x based on content width - window width (plus padding and margin)
scrollYMax - gets the max we can scroll in y based on content height - window height (plus padding and margin)

EVENTS
dispatches a "select" event when clicked on in a traditional manner (fast click with little movement)
dispatches a "hoverover" event when rolled on without moving for 300 ms
dispatches a "hoverout" event when not hovering due to movement or mouseout on the window
--*///+58.1
	zim.Window = function(width, height, color, borderColor, borderThickness, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical) {

		var sig = "width, height, color, borderColor, borderThickness, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical";
		var duo; if (duo = zob(zim.Window, arguments, sig)) return duo;
		z_d("58.1");
		function makeWindow() {

			if (zot(width)) width=300;
			if (zot(height)) height=200;
			if (zot(color)) color="#333"; // none
			if (zot(borderColor)) borderColor="#999";
			if (zot(borderThickness)) borderThickness=1; // 0
			if (zot(padding)) padding=10;
			if (zot(corner)) corner=0;
			if (zot(swipe)) swipe=true; // true / auto, vertical, horizontal, false / none
			if (zot(indicatorActive)) indicatorActive=true;
			if (zot(indicatorDrag)) indicatorDrag=false;
			if (zot(indicatorColor)) indicatorColor=borderColor;
			if (zot(indicatorAlpha)) indicatorAlpha=.3;
			if (zot(indicatorFade)) indicatorFade=true;
			if (indicatorDrag) indicatorFade = false;
			if (zot(slide)) slide=true;
			if (zot(slideDamp)) slideDamp=.6;
			if (zot(slideSnap)) slideSnap="vertical"; // true / auto, vertical, horizontal, false / none
			if (zot(interactive)) interactive=true;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=20;
			if (zot(paddingVertical)) paddingVertical=padding;
			if (zot(paddingHorizontal)) paddingHorizontal=padding;


			var that = this;
			this.scrollX = this.scrollY = this.scrollXMax = this.scrollYMax = 0;
			this.setBounds(0,0,width,height);
			this.setBounds(0,0,width,height);

			var backing = this.backing = new createjs.Shape();
			var g = backing.graphics;
			g.f(color).rr(0,0,width,height,corner);
			this.addChild(backing);
			if (shadowColor != -1 && shadowBlur > 0) backing.shadow = new createjs.Shadow(shadowColor, 8, 8, shadowBlur);

			var mask = new createjs.Shape();
			var mg = mask.graphics;
			// make the mask in the update function
			// when we know if there are vertical and horizontal indicators
			this.addChild(mask);

			var content = this.content = new zim.Container();
			this.addChild(content);
			content.mask = mask;

			if (!interactive) {
				// hitArea makes the whole window draggable
				// but then you can't interact with the content inside the window
				var hitArea = new createjs.Shape();
				hitArea.graphics.f("red").dr(0,0,width,height);
				content.hitArea = hitArea;
			}

			if (borderThickness > 0) {
				var border = new createjs.Shape();
				g = border.graphics;
				g.s(borderColor).ss(borderThickness).rr(0,0,width,height,corner);
				this.addChild(border);
			}

			// indicators are the little scroll bars
			// this exposes an indicator data object so creators can adjust indicator properties
			// note that these properties are set dynamically in the update function
			var indicator = this.indicator = {}; // data object to expose indicator properties
			indicator.size = 6;
			indicator.spacing = 3.5 + borderThickness / 2;
			indicator.margin = 0;
			indicator.corner = indicator.size / 2;
			indicator.showTime = 500;
			indicator.fadeTime = 3000;

			if (indicatorActive) {
				var hIndicator = this.hIndicator = new zim.Shape();
				var hg = hIndicator.graphics;
				hIndicator.alpha = indicatorAlpha;
				this.addChild(hIndicator);
				if (indicatorDrag) hIndicator.drag({localBounds: true});

				var vIndicator = this.vIndicator = new zim.Shape();
				var vg = vIndicator.graphics;
				vIndicator.alpha = indicatorAlpha;
				this.addChild(vIndicator);
				if (indicatorDrag) vIndicator.drag({localBounds: true});
			}

			var hProportion;
			var vProportion;
			var hCheck;
			var vCheck;
			var gap;
			var contentWidth;
			var contentHeight;

			this.update = function() {
				if (indicatorActive) {
					// clear the indicators and remake anytime this function is called
					// as these may change as people add and remove content to the Window
					hg.clear(); // horizontal indicator
					vg.clear(); // vertical indicator
				}

				// assume no gap at left and top
				// gap is applied in x if there is a scroll in y
				// gap is applied in y if there is a scroll in x
				gap = (indicatorActive) ? indicator.size+indicator.spacing*2 : 0;
				contentWidth = content.getBounds().width;
				contentHeight = content.getBounds().height;

				// note, the contentWidth and contentHeight include ONE padding
				hCheck = (contentWidth > width-paddingHorizontal && (swipe === true || swipe == "auto" || swipe == "horizontal"));
				vCheck = (contentHeight > height-paddingVertical && (swipe === true || swipe == "auto" || swipe == "vertical"));

				that.scrollXMax = contentWidth+paddingHorizontal*2-width+(vCheck?gap+indicator.margin:0);
                that.scrollYMax = contentHeight+paddingVertical*2-height+(hCheck?gap+indicator.margin:0);

				// set mask dynamically as indicators may come and go affecting the mask size slightly
				mg.clear();
				mg.f("rgba(0,0,0,.01)").rr(borderThickness/2,borderThickness/2,width-((vCheck && indicatorActive)?indicator.size+indicator.spacing*2:0)-(vCheck?0:borderThickness),height-((hCheck && indicatorActive)?indicator.size+indicator.spacing*2:0)-(hCheck?0:borderThickness),corner);

				var edgeAdjust = Math.max(corner, Math.min(indicator.corner, indicator.spacing));
				var edgeLeft = edgeAdjust + borderThickness/2;
				var edgeRight = edgeAdjust + (vCheck?gap:0) + borderThickness/2;
				var edgeTop = edgeAdjust + borderThickness/2;
				var edgeBottom = edgeAdjust + (hCheck?gap:0) + borderThickness/2;

				if (hCheck && indicatorActive) {
					indicatorLength = Math.max(20, (width-edgeLeft-edgeRight) * (width-edgeLeft-edgeRight) / (contentWidth + paddingHorizontal + indicator.margin));
					hg.f(indicatorColor).rr(0,0,indicatorLength,indicator.size,indicator.corner);
					hIndicator.x = edgeLeft;
					hIndicator.y = height-indicator.size-indicator.spacing;
					// for swiping window:
					hProportion = new zim.Proportion(-that.scrollXMax, 0, edgeLeft, width-indicatorLength-edgeRight, -1);
					if (indicatorDrag) {
						hIndicator.setBounds(0,0,indicatorLength,indicator.size);
						// drag rect for indicator
						var rect = new createjs.Rectangle(
							edgeLeft, hIndicator.y, width-indicatorLength-edgeLeft-edgeRight, 0
						);
						hIndicator.dragRect(rect);
						hIndicator.proportion = new zim.Proportion(
							rect.x, rect.x+rect.width, 0, -that.scrollXMax
						);
						hIndicator.on("pressmove", function() {
							content.x = hIndicator.proportion.convert(hIndicator.x);
						});
					}
				}

				if (vCheck && indicatorActive) {
					indicatorLength = Math.max(20, (height-edgeTop-edgeBottom) * (height-edgeTop-edgeBottom) / (contentHeight + paddingVertical + indicator.margin));
					vg.f(indicatorColor).rr(0,0,indicator.size,indicatorLength,indicator.corner);
					vIndicator.x = width-indicator.size-indicator.spacing;
					vIndicator.y = edgeTop;
					// for swiping window:
					vProportion = new zim.Proportion(-that.scrollYMax, 0, edgeTop, height-indicatorLength-edgeBottom, -1);
					if (indicatorDrag) {
						vIndicator.setBounds(0,0,indicator.size,indicatorLength);
						// drag rect for indicator
						var rect = new createjs.Rectangle(
							vIndicator.x, edgeTop, 0, height-indicatorLength-edgeTop-edgeBottom
						);
						vIndicator.dragRect(rect);
						vIndicator.proportion = new zim.Proportion(
							rect.y, rect.y+rect.height, 0, -that.scrollYMax
						);
						vIndicator.on("pressmove", function() {
							content.y = vIndicator.proportion.convert(vIndicator.y);
						});
					}
				}

				setTimeout(function(){setDragRect();}, 300);
			}

			// METHODS to add and remove content from Window
			this.add = function(c) {
				if (!c.getBounds()) {zog("SwipeBox.add() - please add content with bounds set"); return;}
				content.addChild(c);
				if (c.x == 0) c.x = paddingHorizontal;
				if (c.y == 0) c.y = paddingVertical;
				that.update();
			}

			this.remove = function(c) {
				content.removeChild(c);
				that.update();
			}

			function setDragRect() {
				zim.dragRect(content, new createjs.Rectangle(0, 0, hCheck?-that.scrollXMax:0, vCheck?-that.scrollYMax:0));
			}

			if (swipe) {
				content.on("mousedown", function() {
					if (indicatorActive) zim.Ticker.add(moveIndicators, content.stage);
					if (hCheck && indicatorActive) if (indicatorFade) zim.animate(hIndicator, {alpha:indicatorAlpha}, indicator.showTime);
					if (vCheck && indicatorActive) if (indicatorFade) zim.animate(vIndicator, {alpha:indicatorAlpha}, indicator.showTime);
				});
			}

			function moveIndicators() {
				if (hCheck && indicatorActive) hIndicator.x = hProportion.convert(content.x);
				if (vCheck && indicatorActive) vIndicator.y = vProportion.convert(content.y);
			}

			// may add content before adding Window to stage...
			this.on("added", setDrag, null, true);
			function setDrag() {
				if (!swipe) return;
				zim.drag({
					obj:content,
					currentTarget:true,
					localBounds:true,
					slide:slide, slideDamp:slideDamp,
					slideSnap:(swipe===true||swipe=="auto"||swipe=="vertical")?slideSnap:false
				});
				if (content.getBounds() && content.getBounds().width > 0) {
					setTimeout(function(){setDragRect();}, 300);
				}
			}

			if (slide) {
				content.on("slidestop", stageUp);
			} else {
				content.on("mousedown", function() {
					content.stage.on("stagemouseup", stageUp, null, true);
				});
			}

			function stageUp(e) {
				if (hitArea) {
					// move hitarea to display box
					hitArea.x = -content.x;
					hitArea.y = -content.y;
				}
				zim.Ticker.remove(moveIndicators);
				if (hCheck) if (indicatorFade) zim.animate(hIndicator, {alpha:0}, indicator.fadeTime);
				if (vCheck) if (indicatorFade) zim.animate(vIndicator, {alpha:0}, indicator.fadeTime);
			}

			if (interactive) {
				// dispatches SELECT (click) and HOVEROVER (500 ms) and gives mouseX and mouseY on content
				// CLICKS (in the traditional sense rather than a mouseup replacement)
				var downLoc;
				var downTime;
				content.on("mousedown", function(){downLoc=content.stage.mouseX; downTime=Date.now();});
				content.on("click", function(){
					if (Date.now()-downTime<600 && Math.abs(content.stage.mouseX-downLoc)<5) {
						that.contentMouse = content.globalToLocal(content.stage.mouseX, content.stage.mouseY);
						that.dispatchEvent("select");
					}
				});
				// HOVER (must stay within thresh pixels for pauseTime ms)
				content.on("mouseover", moveOn);
				content.on("mouseout", moveOff);
				var startTime;
				function moveOn() {
					startTime=Date.now();
					zim.Ticker.add(timeMouse, content.stage);
				}
				function moveOff() {
					if (!hoverOutCalled) {
						that.dispatchEvent("hoverout");
						hoverOutCalled = true;
					}
					zim.Ticker.remove(timeMouse);
				}
				var lastMouseX = 0;
				var lastMouseY = 0;
				var lastReportX = 0;
				var lastReportY = 0;
				var pauseTime = 300;
				var thresh = 2;
				var hoverOutCalled = false;
				function timeMouse() {
					if (Math.abs(lastMouseX-content.stage.mouseX) > thresh || Math.abs(lastMouseY-content.stage.mouseY) > thresh) {
						if (!hoverOutCalled) {
							that.dispatchEvent("hoverout");
							hoverOutCalled = true;
						}
						startTime=Date.now();
						lastMouseX=content.stage.mouseX;
						lastMouseY=content.stage.mouseY;
					} else {
						if (Date.now()-startTime > pauseTime) {
							if (Math.abs(lastReportX-content.stage.mouseX) > thresh || Math.abs(lastReportY-content.stage.mouseY) > thresh) {
								that.contentMouse = content.globalToLocal(content.stage.mouseX, content.stage.mouseY);
								that.dispatchEvent("hoverover");
								lastReportX=content.stage.mouseX;
								lastReportY=content.stage.mouseY;
								hoverOutCalled = false;
							}
							startTime=Date.now();
						}
					}
				}
			}

			Object.defineProperty(that, 'scrollX', {
				get: function() {
					return content.x;
				},
				set: function(value) {
					content.x = value;
					moveIndicators();
				}
			});

			Object.defineProperty(that, 'scrollY', {
				get: function() {
					return content.y;
				},
				set: function(value) {
					content.y = value;
					moveIndicators();
				}
			});

			this.clone = function(recursive) {
				if (zot(recursive)) recursive = true;
				var w = that.cloneProps(new zim.Window(width, height, color, borderColor, borderThickness, padding, corner, swipe, indicatorActive, indicatorDrag, indicatorColor, indicatorAlpha, indicatorFade, slide, slideDamp, slideSnap, interactive, shadowColor, shadowBlur, paddingHorizontal, paddingVertical));
				if (recursive) {
					that.content.cloneChildren(w.content);
					w.update();
				}
				return w;
			}

			this.dispose = function() {
				this.removeAllEventListeners();
				content.removeAllEventListeners();
				zim.Ticker.remove(timeMouse);
				zim.Ticker.remove(moveIndicators);
				zim.noDrag(content);
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeWindow.prototype = new zim.Container();
		makeWindow.prototype.constructor = zim.Window;
		return new makeWindow();

	}//-58.1

/*--
zim.Waiter = function(container, speed, color, circleColor, corner, shadowColor, shadowBlur)

Waiter
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Adds a little animated three dot wait widget.
You need to call waiter.show() to show the waiter and waiter.hide() to hide it.
You do not need to add it to the stage - it adds itself centered.
You can change the x and y (with origin and registration point in middle).

EXAMPLE
var waiter = new zim.Waiter();
waiter.show(); // show the waiter until assets load
frame.loadAssets("greeting.mp3");
frame.on("complete", function() {
	waiter.hide();
	frame.asset("greeting.mp3").play();
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
container - the container that holds the waiter (usually the stage)
speed - (default 600) cycle time in milliseconds
color - (default "orange") the backing color
circleColor - (default "white") the dot color
corner - (default 14) the corner radius of the waiter box
shadowColor - (defaults rgba(0,0,0,.3)) set to -1 for no shadow
shadow blur - (default 14) the blur of the shadow if shadow is set

METHODS
show() - shows the waiter
hide() - hides the waiter
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
width, height - read only - calculated from getBounds()
display - reference to the waiter backing graphic
--*///+59
	zim.Waiter = function(container, speed, color, circleColor, corner, shadowColor, shadowBlur) {

		var sig = "container, speed, color, circleColor, corner, shadowColor, shadowBlur";
		var duo; if (duo = zob(zim.Waiter, arguments, sig)) return duo;
		z_d("59");
		function makeWaiter() {

			if (zot(container) || !container.getBounds) {zog("zim build - Waiter(): Please pass in a reference to a container with bounds set as first parameter");	return;}
			if (!container.getBounds()) {zog("zim build - Waiter(): Please give the container bounds using setBounds()"); return;}
			if (zot(container.getStage)) {zog("zim build - Waiter(): Please give the container that has a stage property"); return;}

			if (zot(speed)) speed=600; // ms cycle time
			if (zot(color)) color="orange";
			if (zot(circleColor)) circleColor="white";
			if (zot(corner)) corner=16;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=14;

			var height = 40;
			var numDots = 3;
			var r = height*.6/2;
			var s = (height-r*2)/2;
			var width = numDots*(r*2+s)+s;

			this.setBounds(-width/2,-height/2, width, height);

			var that = this;

			var display = this.display = new createjs.Shape();
			this.addChild(display);
			display.setBounds(0, 0, width, height);
			display.regX = width/2;
			display.regY = height/2;
			var g = display.graphics;
			g.f(color);
			g.rr(0, 0, width, height, corner);
			if (shadowColor != -1 && shadowBlur > 0) display.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			display.on("click", function(e) {
				// stops the click from going through the display to the background
				e.stopImmediatePropagation();
			});

			var circles = new zim.Container();
			this.addChild(circles);

			var dot;
			for (var i=0; i<numDots; i++) {
				dot = new createjs.Shape();
				dot.graphics.f(circleColor).dc(0,0,r);
				dot.x = (i-(numDots-1)/2) * (r*2+s);
				circles.addChild(dot);
				dot.cache(-r,-r,r*2,r*2);
				dot.alpha = 0;
			}

			this.hide = function() {
				createjs.Tween.get(that,{override:true})
							.to({alpha:0}, 300).call(function() {
								createjs.Ticker.off("tick", that.ticker);
								container.removeChild(that);
								container.getStage().update();
							});
			}
			this.show = function() {
				var dot; var counter=0;
				for (var i=0; i<circles.getNumChildren(); i++) {
					that.alpha = 0;
					createjs.Tween.get(that,{override:true})
							.to({alpha:1}, 300);
					setTimeout(function() {
						dot = circles.getChildAt(counter);
						createjs.Tween.get(dot,{loop:true})
							.to({alpha:1}, speed/numDots/2)
							.wait(speed/numDots)
							.to({alpha:0}, speed/numDots)
							.wait(speed-speed/numDots-speed/numDots/2);
						counter++;
					}, i*speed/numDots);

				}
				that.ticker = createjs.Ticker.on("tick", function() {container.getStage().update();});

				that.x = (container.getBounds().width) /2;
				that.y = (container.getBounds().height) /2;
				container.addChild(that);
				container.getStage().update();
			}

			this.clone = function() {
				return that.cloneProps(new zim.Waiter(container, speed, color, circleColor, corner, shadowColor, shadowBlur));
			}

			this.dispose = function() {
				if (that.ticker) createjs.Ticker.off("tick", that.ticker);
				display.removeAllEventListeners();
				that.removeChild(display);
				that.removeChild(circles);
				display = null;
				circles = null;
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeWaiter.prototype = new zim.Container();
		makeWaiter.prototype.constructor = zim.Waiter;
		return new makeWaiter();

	}//-59

/*--
zim.Indicator = function(width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur)

Indicator
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A row of dots or squares that can be used to indicate a step, page, level, score, etc.
The indicator can be used as an input as well but often these are small so may not be best to rely on.

EXAMPLE
var lights = new zim.Indicator({fill:true});
lights.selectedIndex = 0; // set the first light on
lights.center(stage);
stage.on("stagemousedown", function() {
	// increase the indicator lights each click (then start over)
	lights.selectedIndex = (lights.selectedIndex+1) % lights.num;
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 100) width of indicator
height - (default 50) height of indicator
num - (default 6) the number of lights
color - (default "orange") color of the light(s) turned on
offColor - (default "grey") color of the light(s) turned off
borderColor - (default -1 for no border) border color of lights
backingColor - (default -1 for no backing) backing rectangle around lights
type - (default "dot" or "circle") can also be "box" or "square"
fill - (default false) set to true to fill in lights to the left of the selectedIndex
scale - (default 1) for all the lights including spacing
lightScale - (default 1) scale for each light - keeping the spacing unchanged
press - (default false) set to true to make lights clickable
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no shadow
shadowBlur - (default 5) the shadow blur if shadow is set

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes any listeners

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
selectedIndex - gets or sets the current index of the indicator
width, height - read only - calculated from getBounds()
num - the assigned num value (how many light objects) (read only)
backing - gives access to the backing if there is one zim.Rectangle
lights - an array of the light objects (zim Circle or Rectangle objects)
lightsContainer - gives access to the lights createjs.Container with its zim.Circle or zim.Rectangle children

EVENTS
dispatches a change event if press is true and indicator is pressed on and lights change
--*///+60
	zim.Indicator = function(width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur) {

		var sig = "width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur";
		var duo; if (duo = zob(zim.Indicator, arguments, sig)) return duo;
		z_d("60");
		function makeIndicator() {

			if (zot(width)) width = 300;
			if (zot(height)) height = 50;
			if (zot(num)) num = 6;
			if (zot(color)) color = "#f58e25";
			if (zot(offColor)) offColor = "#666";
			if (offColor < 0) offColor = "rgba(0,0,0,.01)";
			if (borderColor < 0) borderColor = null;
			if (zot(backingColor)) backingColor = -1;
			if (zot(type)) type = "dot";
			if (zot(fill)) fill = false;
			if (zot(scale)) scale = 1;
			if (zot(lightScale)) lightScale = 1;
			if (zot(press)) press = false;
			if (zot(shadowColor)) shadowColor = "rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur = 5;

			var eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

			var that = this;
			this.lights = [];

			var myValue;
			var indicator = new zim.Container();
			if (backingColor != -1) {
				var backing = new zim.Rectangle(width, height, backingColor);
				this.addChild(backing);
				this.backing = backing;
			}
			var lights = this.lightsContainer = new zim.Container();
			this.addChild(lights);
			var hitArea = new createjs.Shape();
			hitArea.graphics.f("black").dr(-height/2,-height/2,height,height);
			var light;
			var size;
			var space = width / (num+1);
			for (var i=0; i<num; i++) {
				if (type == "square" || type == "box") {
					var size = height * .5;
					light = new zim.Rectangle(size, size, offColor, borderColor);
					light.regX = light.width/2;
					light.regY = light.height/2;
				} else {
					var size = height * .5;
					light = new zim.Circle(size/2, offColor, borderColor);
				}
				this.lights.push(light);
				light.znum = i;
				light.hitArea = hitArea;
				light.scaleX = light.scaleY = lightScale;
				light.x = space + space * i;
				light.y = height / 2;
				lights.addChild(light);
			}
			lights.setBounds(0,0,width,height);
			lights.regX = lights.x = width / 2;
			lights.regY = lights.y = height / 2;
			this.addChild(lights);
			if (shadowColor != -1 && shadowBlur > 0) lights.shadow = new createjs.Shadow(shadowColor, 2, 2, shadowBlur);

			if (press) {
				lights.cursor = "pointer";
				var lightsEvent = lights.on(eventType, function(e) {
					if (myValue != e.target.znum) that.dispatchEvent("change");
					myValue = e.target.znum;
					setLights(myValue);
				});
			}
			lights.scaleX = lights.scaleY = scale;

			function setLights(v) {
				if (v >= num) v = -1; // out of range - don't let it fill up
				var c;
				for (var i=0; i<num; i++) {
					if (fill) {
						if (i < v) c = color;
						else c = offColor;
					} else {
						c = offColor;
					}
					if (i == v) c = color;
					lights.getChildAt(i).color = c;
				}
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			}

			Object.defineProperty(this, 'selectedIndex', {
				get: function() {
					return myValue;
				},
				set: function(value) {
					myValue = Math.floor(value);
					setLights(myValue);
				}
			});

			Object.defineProperty(this, 'num', {
				get: function() {
					return num;
				},
				set: function(value) {
					if (zon) zog("num is read only");
				}
			});

			this.clone = function() {
				return that.cloneProps(new zim.Indicator(width, height, num, color, offColor, borderColor, backingColor, type, fill, scale, lightScale, press, shadowColor, shadowBlur));
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeIndicator.prototype = new zim.Container();
		makeIndicator.prototype.constructor = zim.Indicator;
		return new makeIndicator();

	}//-60

/*--
zim.Stepper = function(list, width, color, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display)

Stepper
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Lets you step through a list of numbers or strings with arrows and keyboard arrows.

EXAMPLE
var stepper = new zim.Stepper();
stepper.on("change", function() {
	zog(stepper.currentIndex);
	zog(stepper.currentValue);
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
list - (default 1-10) pass in an array of strings or numbers to display one at a time
width - (default 100) is the width of the text box (you can scale the whole stepper if needed)
color - (default "white") for the arrows and the text box
strokeColor - (default null) stroke color for the box
label - (default null) which can be used to define custom text properties
vertical - (default false) set to true if you want the numbers above and below the text
arrows - (default true) - use keyboard arrows (will always show graphical arrows)
corner - (default 10) is the radius of the text box corners - set to 0 for square corners
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no drop shadow
shadowBlur - (default 14) value for shadow blur if shadow is set
loop - (default false) set to true to loop around or go back past 0 index
display - (default true) set to false just to just show the arrows and not the value

METHODS
next() - goes to next
prev() - goes to previous
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
currentIndex - gets or sets the current index of the array and display
currentValue - gets or sets the current value of the array and display
width, height - read only - calculated from getBounds()
stepperArray - gets or sets the list - you should manually set the desired currentIndex if you change this
prev, next - access to the arrow containers (use to position)
arrowPrev, arrowNext - access to the graphical zim Triangle objects (createjs.Containers)
label - access to the zim.Label
textBox - access to the text box backing shape
loop - does the stepper loop
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when changed by pressing an arrow or a keyboard arrow
(but not when setting currentIndex or currentValue properties)
--*///+61
	zim.Stepper = function(list, width, color, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display) {

		var sig = "list, width, color, strokeColor, label, vertical, arrows, corner, shadowColor, shadowBlur, loop, display";
		var duo; if (duo = zob(zim.Stepper, arguments, sig)) return duo;
		z_d("61");
		function makeStepper() {

			if (zot(list)) list = [0,1,2,3,4,5,6,7,8,9];
			if (zot(width)) width=200;
			if (zot(color)) color="white";
			if (zot(strokeColor)) strokeColor=null;
			if (zot(label)) label = "";
			if (typeof label === "string" || typeof label === "number") label = new zim.Label(label, 64, "arial", "#555", null, null, null, "center");
			if (zot(vertical)) vertical=false;
			if (zot(arrows)) arrows=true;
			if (zot(corner)) corner=16;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=14;
			if (zot(loop)) loop=false;
			if (zot(display)) display=true;
			var eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

			var that = this;
			var index;
			var height = 100;
			var boxSpacing = height/4;

			this.label = label;
			label.mouseChildren = false;
			label.mouseEnabled = false;

			var prev = this.prev = new zim.Container();
			this.addChild(prev);
			var prevBacking = new createjs.Shape();
			prevBacking.graphics.f("rgba(255,255,255,.11)").r(0,0,height*1.5,height*1.5);
			prevBacking.regX = height*1.5 / 2;
			prevBacking.regY = height*1.5 / 2 + boxSpacing/2;
			prev.hitArea = prevBacking;

			var arrowPrev = this.arrowPrev = new zim.Triangle(height, height*.8, height*.8, color);
			if (shadowColor != -1 && shadowBlur > 0) prev.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			prev.addChild(arrowPrev);
			prev.cursor = "pointer";
			prev.on(eventType, function(e) {step(-1);});

			if (vertical) {
				prev.rotation = 180;
				prev.x = width/2;
				if (display) {
					prev.y = prev.getBounds().height + boxSpacing + height + prev.getBounds().height/2 + boxSpacing;
				} else {
					prev.y = prev.getBounds().height * 2;
				}

			} else {
				prev.rotation = -90;
				prev.x = prev.getBounds().height/2;
				prev.y = prev.getBounds().width/2;
			}

			if (display) {
				var box = this.textBox = new createjs.Shape();
				box.cursor = "pointer";
				this.addChild(box);
				box.setBounds(0, 0, width, height);
				if (strokeColor != null) box.graphics.s(strokeColor).ss(1.5);
				box.graphics.f(color).rr(0, 0, width, height, corner);
				if (shadowColor != -1 && shadowBlur > 0) box.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);

				if (vertical) {
					box.y = arrowPrev.height + boxSpacing;
				} else {
					box.x = arrowPrev.height + boxSpacing;
				}
				// label

				this.addChild(label);
				if (list.length > 0) {
					// index = Math.floor(list.length/2)
					index = 0;
					label.text = list[index];
				}
				label.x = 50+box.x+box.getBounds().width/2;
				label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;
			} else {
				if (list.length > 0) {
					index = 0;
				}
			}

			var next = this.next = new zim.Container();
			this.addChild(next);
			var nextBacking = new createjs.Shape();
			nextBacking.graphics.f("rgba(255,255,255,.01)").r(0,0,height*1.5,height*1.5);
			nextBacking.regX = height*1.5 / 2;
			nextBacking.regY = height*1.5 / 2 + boxSpacing/2;
			next.hitArea = nextBacking;

			var arrowNext = this.arrowNext = new zim.Triangle(height, height*.8, height*.8, color);
			if (shadowColor != -1 && shadowBlur > 0) next.shadow = new createjs.Shadow(shadowColor, 3, 3, shadowBlur);
			next.addChild(arrowNext);

			next.cursor = "pointer";
			next.on(eventType, function(e) {step(1);});
			if (display) box.on(eventType, function(e) {step(1);});

			if (vertical) {
				next.rotation = 0;
				next.x = width/2;
				next.y = next.getBounds().height/2;
			} else {
				next.rotation = 90;
				if (display) {
					next.x = box.x + box.getBounds().width + next.getBounds().height/2 + boxSpacing;
				} else {
					next.x = prev.x + prev.getBounds().width;
				}
				next.y = next.getBounds().width/2;
			}

			setLabel(index);

			function step(n) {
				var nextIndex = index + n;
				if (!loop) {
					if (nextIndex > list.length-1) {
						if (display) box.cursor = "default";
						return;
					} else {
						if (display) box.cursor = "pointer";
					}
					if (nextIndex < 0) return;
				} else {
					if (nextIndex > list.length-1) nextIndex = 0;
					if (nextIndex < 0) nextIndex = list.length-1;
				}
				setLabel(nextIndex);
				that.dispatchEvent("change");
			}

			Object.defineProperty(this, 'currentIndex', {
				get: function() {
					return index;
				},
				set: function(value) {
					value = Math.min(list.length-1, Math.max(0, value));
					if (value == that.currentIndex) return;
					setLabel(index=value);
				}
			});

			Object.defineProperty(this, 'currentValue', {
				get: function() {
					return list[index];
				},
				set: function(value) {
					if (list.indexOf(value) > -1) {
						value = list.indexOf(value);
					}
					if (value == that.currentIndex) return;
					setLabel(index=value);
				}
			});

			Object.defineProperty(this, 'loop', {
				get: function() {
					return loop;
				},
				set: function(value) {
					loop = value;
					setLabel(index);
				}
			});

			Object.defineProperty(this, 'stepperArray', {
				get: function() {
					return list;
				},
				set: function(value) {
					list = value;
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
					if (value) {
						setLabel(that.currentIndex);
					} else {
						prev.alpha = .8;
						arrowPrev.setFill("#aaa");
						prev.cursor = "default";
						next.alpha = .8;
						arrowNext.setFill("#aaa");
						next.cursor = "default";
						if (display) label.mouseChildren = false;
						if (display) label.mouseEnabled = false;
					}
					if (!zim.OPTIMIZE && next.getStage()) next.getStage().update();
				}
			});

			function setLabel(n) {
				index = n;
				if (display) {
					label.text = list[index];
					label.x = box.x+box.getBounds().width/2;
					label.y = box.y+(box.getBounds().height-label.getBounds().height)/2;
				}
				prev.alpha = 1;
				arrowPrev.setFill(color);
				prev.cursor = "pointer";
				next.alpha = 1;
				arrowNext.setFill(color);
				next.cursor = "pointer";
				if (!loop) {
					if (index == 0) {
						prev.alpha = .8;
						arrowPrev.setFill("#aaa");
						prev.cursor = "default";
					}
					if (index == list.length-1) {
						next.alpha = .8;
						arrowNext.setFill("#aaa");
						next.cursor = "default";
					}
				}
				if (!zim.OPTIMIZE && next.getStage()) next.getStage().update();
			}

			if (arrows) {
				this.keyDownEvent = function(e) {
					if (!e) e = event;
					if (e.keyCode >= 37 && e.keyCode <= 40) {
						var nextIndex;
						if (e.keyCode == 38 || e.keyCode == 39) {
							step(1);
						} else if (e.keyCode == 37 || e.keyCode == 40) {
							step(-1);
						}
					}
				}
				window.addEventListener("keydown", this.keyDownEvent);
			}

			this.next = function() {
				step(1);
			}

			this.prev = function() {
				step(-1);
			}

			this.clone = function() {
				return that.cloneProps(new zim.Stepper(list, width, color, strokeColor, label.clone(), vertical, arrows, corner, shadowColor, shadowBlur, loop, display));
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeStepper.prototype = new zim.Container();
		makeStepper.prototype.constructor = zim.Stepper;
		return new makeStepper();

	}//-61

/*--
zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside)

Slider
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional slider - will give values back based on min and max and position of button (knob).

EXAMPLE
var slider = new zim.Slider({step:1});
slider.center(stage);
slider.on("change", function() {
	zog(slider.currentValue); // 1-10 in steps of 1
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
min - (default 0) the minimum value for the slider
max - (default 10) the maximum value for the slider
step - (default 0) 0 is continuous decimal - 1 would provide steps of 1, 2 would provide steps of 2, etc.
button - (default small button with no label) - a zim.Button
barLength - (default 300) the length of the bar (the slider slides along its length)
barWidth - (default 3) the width of the bar (how fat the bar is)
color - (default "#666") the color of the bar (any CSS color)
vertical - (default false) set to true to make slider vertical
useTicks - (default false) set to true to show small ticks for each step (step > 0)
inside - (default false) set to true to fit button inside bar (need to manually adjust widths)

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
currentValue - gets or sets the current value of the slider
width, height - read only - calculated from getBounds()
min, max, step - the assigned values (read only)
bar - gives access to the bar zim.Rectangle
button - gives access to the zim.Button
ticks - gives access to the ticks (to position these for example)
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

EVENTS
dispatches a "change" event when button is slid on slider (but not when setting currentValue property)
--*///+62
	zim.Slider = function(min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside) {

		var sig = "min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside";
		var duo; if (duo = zob(zim.Slider, arguments, sig)) return duo;
		z_d("62");
		function makeSlider() {

			if (zot(min)) min = 0;
			if (zot(max)) max = 10;
			if (max-min == 0) {zog("ZIM Slider range must not be 0"); return;}
			if (zot(step)) step = 0;
			if (zot(barLength)) barLength = 300;
			if (zot(barWidth)) barWidth = 3;
			if (zot(barColor)) barColor = "#666";
			if (zot(vertical)) vertical = false;
			if (zot(useTicks)) useTicks = false;
			if (zot(inside)) inside = false;

			if (zot(button)) {
				var w = 30; var h = 40;
				if (vertical) {w = 50; h = 40;}
				button = new zim.Button(w,h,"","#fff","#ddd","#666",1,0,null,null,30);
			}

			var width; var height;
			if (vertical) {
				width = button.width;
				if (inside) {
					height = barLength;
					this.setBounds(0, 0, width, height);
				} else {
					height = barLength + button.height;
					this.setBounds(-button.width/2, -button.height/2, width, height);
				}
			} else {
				height = button.height;
				if (inside) {
					width = barLength;
					this.setBounds(0, 0, width, height);
				} else {
					width = barLength+button.width;
					this.setBounds(-button.width/2, -button.height/2, width, height);
				}
			}

			var that = this;
			var myValue = min;
			var lastValue = 0; // does not include min so always starts at 0
			this.button = button;
			this.cursor = "pointer";

			var bar, rect, bounds, ticks, g;

			if (useTicks && step != 0) {
				ticks = this.ticks = new createjs.Shape();
				this.addChild(ticks);
				g = ticks.graphics;
				g.ss(1).s(barColor);
				var stepsTotal = Math.round((max - min) / step);
				var newStep = (max - min) / stepsTotal;
				if (newStep != step) {if (zon) zog("zim.Slider() : non-divisible step ("+step+") adjusted");}
				step = newStep;
				if (inside) {
					var spacing = (barLength - ((vertical) ? button.height : button.width)) / stepsTotal;
				} else {
					var spacing = barLength / stepsTotal;
				}
			}

			if (vertical) {
				var start = (inside) ? button.height / 2 : 0;
				if (useTicks && step != 0) {
					for (var i=0; i<=stepsTotal; i++) {
						g.mt(0, start+spacing*i).lt(20, start+spacing*i);
					}
					ticks.x = 10;
				}
				bar = this.bar = new zim.Rectangle(barWidth, barLength, barColor);
				this.addChild(bar);
				zim.centerReg(button);
				this.addChild(button);
				bounds = bar.getBounds();
				rect = new createjs.Rectangle(bounds.width/2, bounds.y+start, 0, bounds.height-start*2);
			} else {
				var start = (inside) ? button.width / 2 : 0;
				if (useTicks && step != 0) {
					for (var i=0; i<=stepsTotal; i++) {
						g.mt(start+spacing*i,0).lt(start+spacing*i,-20);
					}
					ticks.y = -10;
				}
				bar = this.bar = new zim.Rectangle(barLength, barWidth, barColor);
				this.addChild(bar);
				zim.centerReg(button);
				this.addChild(button);
				bounds = bar.getBounds();
				rect = new createjs.Rectangle(bounds.x+start, bounds.height/2, bounds.width-start*2, 0);
			}
			button.x = rect.x;
			button.y = rect.y;

			function snap(v) {
				if (step == 0) return v;
				return Math.round(v/step)*step;
			}

			var diffX, diffY;
			button.on("mousedown", function(e) {
				var point = that.globalToLocal(e.stageX, e.stageY);
				diffX = point.x - button.x;
				diffY = point.y - button.y;
				if (that.getStage()) that.getStage().mouseMoveOutside = true;
			});

			button.on("pressmove", function(e) {
				setValue(e);
			});
			function setValue(e) {
				var point = that.globalToLocal(e.stageX, e.stageY);
				var p = checkBounds(point.x-diffX, point.y-diffY, rect);
				if (vertical) {
					button.x = p.x;
					myValue = snap((p.y-rect.y) / rect.height * (max - min));
					button.y = rect.y + myValue * rect.height / (max - min);
					myValue += min;
					if (button.y != lastValue) {
						that.dispatchEvent("change");
					}
					lastValue = button.y;
				} else {
					myValue = snap((p.x-rect.x) / rect.width * (max - min));
					button.x = rect.x + myValue * rect.width / (max - min);
					myValue += min;
					button.y = p.y;
					if (button.x != lastValue) {
						that.dispatchEvent("change");
					}
					lastValue = button.x;
				}
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			};

			function checkBounds(x,y,rect) {
				x = Math.max(rect.x, Math.min(rect.x+rect.width, x));
				y = Math.max(rect.y, Math.min(rect.y+rect.height, y));
				return {x:x,y:y}
			}

			bar.on("mousedown", function(e) {
				diffX = button.width/2;
				diffY = button.height/2;
				setValue(e);
			});

			Object.defineProperty(this, 'currentValue', {
				get: function() {
					return myValue;
				},
				set: function(value) {
					if (min < max) {
						if (value < min) value = min;
						if (value > max) value = max;
					} else {
						if (value > min) value = min;
						if (value < max) value = max;
					}
					myValue = value = snap(value);
					if (vertical) {
						button.y = (value - min) / (max - min) * rect.height + start;
						lastValue = button.y;
					} else {
						button.x = (value - min) / (max - min) * rect.width + start;
						lastValue = button.x;
					}
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'min', {
				get: function() {
					return min;
				},
				set: function(value) {
					if (zon) zog("min is read only");
				}
			});

			Object.defineProperty(this, 'max', {
				get: function() {
					return max;
				},
				set: function(value) {
					if (zon) zog("max is read only");
				}
			});

			Object.defineProperty(this, 'step', {
				get: function() {
					return step;
				},
				set: function(value) {
					if (zon) zog("step is read only");
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			this.clone = function() {
				return that.cloneProps(new zim.Slider(min, max, step, button.clone(), barLength, barWidth, barColor, vertical, useTicks, inside));
			}

			this.dispose = function() {
				button.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeSlider.prototype = new zim.Container();
		makeSlider.prototype.constructor = zim.Slider;
		return new makeSlider();

	}//-62

/*--
zim.Dial = function(min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit)

Dial
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional dial - will give values back based on min and max and position of dial.

EXAMPLE
var dial = new zim.Dial({step:1, color:"violet"});
dial.center(stage);
dial.on("change", function() {
	zog(dial.currentValue); // 1-10 in steps of 1
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
min - (default 0) the minimum value for the dial
max - (default 10) the maximum value for the dial
step - (default 0) 0 is continuous decimal - 1 would provide steps of 1, 2 would provide steps of 2, etc.
width - (default 100) the width of the dial (diameter)
color - (default "#666") the backing color of the dial
indicatorColor - (default "#222") the color of the indicator
indicatorScale - (default 1) the scale of the indicator
type - (default "arrow" or "triangle") can also be "dot" or "circle", and "line" or "rectangle"
innerCircle - (default true) gives an inner knob look - set to false for flat
innerScale - (default 1) can be adjusted along with indicatorScale to get a variety of looks
useTicks - (default true) will show lines for ticks if step is set
innerTicks (default false) set to true to put the ticks inside if step is set
tickColor - (default indicatorColor) set the tick color if ticks are set
limit - (default true) stops dial from spinning right around - set to false to not limit dial

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
currentValue - gets or sets the current value of the dial
width, height - read only - calculated from getBounds()
min, max, step - the assigned values (read only)
backing - gives access to the dial backing zim.Circle
inner and inner2 give access to any inner circles
ticks - gives access to the ticks (to scale these for example)
indicator - gives access to the indicator container with registration point at the dial center
indicatorShape - gives access to the shape on the end of the indicator (zim Triangle, Circle, Rectangle)
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

EVENTS
dispatches a "change" event when dial changes value (but not when setting currentValue property)
--*///+63
	zim.Dial = function(min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit) {

		var sig = "min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit";
		var duo; if (duo = zob(zim.Dial, arguments, sig)) return duo;
		z_d("63");
		function makeDial() {

			if (zot(min)) min = 0;
			if (zot(max)) max = 10;
			if (max-min == 0) {zog("ZIM Dial range must not be 0"); return;}
			if (zot(step)) step = 1;
			if (zot(width)) width = 100;
			if (zot(color)) color = "#666";
			if (zot(indicatorColor)) indicatorColor = "#222";
			if (zot(indicatorScale)) indicatorScale = 1;
			if (zot(type)) type = "arrow";
			if (zot(innerCircle)) innerCircle = true;
			if (zot(innerScale)) innerScale = .5;
			if (zot(useTicks)) useTicks = true;
			if (zot(innerTicks)) innerTicks = false;
			if (zot(tickColor)) tickColor = indicatorColor;
			if (zot(limit)) limit = true;

			var that = this;
			this.cursor = "pointer";

			var r = width / 2;
			var myValue = min; // includes the min
			var lastValue = 0; // does not include min (so always starts at 0)

			var backing = this.backing = new zim.Circle(r, color);
			this.addChild(backing);

			if (innerCircle) {
				var ic = (innerTicks) ? "rgba(0,0,0,.2)" : "rgba(0,0,0,.1)";
				if (color=="black"||color=="#000"||color=="#000000"||color=="#111"||color=="#111111") ic = "#222";
				var inner = this.inner = new zim.Circle(r*innerScale, ic);
				this.addChild(inner);

				if (!innerTicks) {
					var ic2 = "rgba(0,0,0,.1)";
					var inner2 = this.inner2 = new zim.Circle(r*(innerScale-.1), ic2);
					this.addChild(inner2);
				}

			}

			var stepsTotal = (max - min) / step;
			if (useTicks && step != 0) {
				ticks = this.ticks = new zim.Container();
				this.addChild(ticks);
				var tick;
				for (var i=0; i<stepsTotal+1; i++) {
					var tick = new zim.Rectangle(1, r*.2, tickColor);
					tick.regY = r * ((innerTicks) ? (innerScale-.05) : 1.28);
					tick.regX = .5;
					tick.rotation = (360 / (stepsTotal+1)) * i;
					ticks.addChild(tick);
				}
			}

			this.setBounds(-r,-r,width,width);
			if (type == "dot" || type == "circle") {
				var indicator = this.indicator = new zim.Container();
				var indicatorShape = this.indicatorShape = new zim.Circle(r*.19, indicatorColor);
				indicator.addChild(indicatorShape);
				zim.scale(indicator, indicatorScale);
				indicator.regY = r - indicator.getBounds().width*indicatorScale/2 - r*.07;
			} else if (type == "line" || type == "rectangle") {
				var indicator = this.indicator = new zim.Container();
				var indicatorShape = this.indicatorShape = new zim.Rectangle(r * .1, r*.3, indicatorColor);
				indicator.addChild(indicatorShape);
				zim.scale(indicator, indicatorScale);
				indicator.regY = r - indicator.getBounds().width*indicatorScale/2 - r*.07;
				indicator.regX = r * .05;
			} else { // arrow
				var indicator = this.indicator = new zim.Container();
				var indicatorShape = this.indicatorShape = new zim.Triangle(r*.4, r*.4, r*.4, indicatorColor);
				indicator.addChild(indicatorShape);
				zim.scale(indicator, indicatorScale);
				indicator.regY = r - indicator.getBounds().height*indicatorScale*((innerTicks)?.85:.75);
				if (innerTicks) {
					indicatorShape.rotation = 180;
				}
			}
			indicator.regY /= indicatorScale;
			this.addChild(indicator);

			function snap(v) {
				if (step == 0) return v;
				return Math.round(v/step)*step;
			}

			var lastAngle;
			var startAngle;
			var moveEvent;
			var upEvent;
			var lastA = 0;
			this.on("mousedown", function() {
				lastAngle = indicator.rotation;
				var p = that.parent.globalToLocal(that.getStage().mouseX, that.getStage().mouseY);
				var dX = p.x-that.x;
				var dY = that.y-p.y;
				startAngle = Math.atan2(dX,dY)*180/Math.PI;
				var pressTime = new Date().getTime();
				moveEvent = that.on("pressmove", function() {
					p = that.parent.globalToLocal(that.getStage().mouseX, that.getStage().mouseY);
					dX = p.x-that.x;
					dY = that.y-p.y;
					var angle = lastAngle + Math.atan2(dX,dY)*180/Math.PI - startAngle;
					if (limit) {
						if (angle < 0) angle += 360;
						angle = angle % 360;
						if (Math.abs(angle-lastA) > 180) return;
					}
					lastA = angle;

					setValue(angle);
				});
				upEvent = this.on("pressup", function() {
					var deltaTime = new Date().getTime()-pressTime;
					if (deltaTime < 200) {
						p = that.parent.globalToLocal(that.getStage().mouseX, that.getStage().mouseY);
						dX = p.x-that.x;
						dY = that.y-p.y;
						var angle = Math.atan2(dX,dY)*180/Math.PI;
						setValue(angle);
					}
					lastAngle = indicator.rotation;
					that.off("pressmove", moveEvent);
					that.off("pressup", upEvent);
				});
			});

			function sign(n) {return n > 0 ? 1 : -1;}

			function setValue(angle) {
				var v; // value (not including min)
				if (angle < 0) angle += 360;
				angle = angle % 360;
				if (step != 0) {
					angle = Math.min(angle,  360 - 360 / (stepsTotal+1));
					v = snap(angle / (360 - 360 / (stepsTotal+1)) * (max - min));
					indicator.rotation = v * (360 - 360 / (stepsTotal+1)) / (max - min);
				} else {
					indicator.rotation = angle;
					v = (angle / 360) * (max - min);
				}
				if (v != lastValue) {
					lastValue = v;
					myValue = v + min;
					that.dispatchEvent("change");
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			}

			Object.defineProperty(this, 'currentValue', {
				get: function() {
					return myValue;
				},
				set: function(value) {
					if (value < min) value = min;
					if (value > max) value = max;
					myValue = value;
					value = snap(value);
					if (step != 0) {
						indicator.rotation = (value - min) * (360 - 360 / (stepsTotal+1)) / (max - min);
					} else {
						indicator.rotation = (value - min) * 360 / (max - min);
					}
					lastValue = value - min;
					lastA = indicator.rotation;
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'min', {
				get: function() {
					return min;
				},
				set: function(value) {
					if (zon) zog("min is read only");
				}
			});

			Object.defineProperty(this, 'max', {
				get: function() {
					return max;
				},
				set: function(value) {
					if (zon) zog("max is read only");
				}
			});

			Object.defineProperty(this, 'step', {
				get: function() {
					return step;
				},
				set: function(value) {
					if (zon) zog("step is read only");
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			this.clone = function() {
				return that.cloneProps(new zim.Dial(min, max, step, width, color, indicatorColor, indicatorScale, type, innerCircle, innerScale, useTicks, innerTicks, tickColor, limit));
			}

			this.dispose = function() {
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeDial.prototype = new zim.Container();
		makeDial.prototype.constructor = zim.Dial;
		return new makeDial();

	}//-63

//***************** RADIAL  64

/*--
zim.Tabs = function(width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss)

Tabs
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional tab layout for along the edge of content.
Can also act as an independent button row or column.

EXAMPLE
var tabs = new zim.Tabs({tabs:["A", "B", "C", "D"], spacing:5, corner:14});
tabs.center(stage);
tabs.on("change", function() {
	zog(tabs.selectedIndex);
	zog(tabs.text);
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 240) overall width of tab set (ZIM divides the width across tabs and spacing)
height - (default 60) height of tabs
tabs - (default ["1","2","3","4"]) an array of tab objects with the following properties available:
	any tab specific properties will override the default values from other parameters
	[{label:"String", width:200, color:"Red", rollColor:"pink", offColor:"grey"}, {etc.}]
	label can be a String or a zim.Label object - default text color is white
color - (default "#333") the color of the selected tab (any CSS color)
rollColor - (default "#555") the rollover color (selected tabs do not roll over)
offColor - (default "#777") the color of a deselected tab when not rolled over
spacing - (default 1) is the pixels between tab buttons
currentEnabled - (default false) set to true to be able to press the selected tab button
corner - (default 0) the corner radius of the tabs (at the top when flatBottom is true)
labelColor - (default "white") the color of the label
flatBottom - (default true) flat bottom for tab shape set to false for button sets
keyEnabled - (default true) so tab key cycles through tabs, shift tab backwards
gradient - (default null) 0 to 1 (try .3) adds a gradient to the tabs
gloss - (default null) 0 to 1 (try .1) adds a gloss to the tabs

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
selectedIndex - gets or sets the selected index of the tabs
selected - gets the selected button - selected.enabled = true, etc.
width, height - read only - calculated from getBounds()
tabs - gets or sets tabs object (will have to manually change buttons as well as adjust props)
color - gets or sets default selected tab color
rollColor - gets or sets default rolled over color
offColor - gets or sets default unselected tab color
text - gets current selected label text
label - gets current selected label object
buttons - an array of the ZIM Button objects. buttons[0].enabled = false;
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
keyEnabled - gets or sets whether the tab key and shift tab key cycles through tabs
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when a tab changes (but not when setting selectedIndex property)
--*///+65
	zim.Tabs = function(width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss) {

		var sig = "width, height, tabs, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss";
		var duo; if (duo = zob(zim.Tabs, arguments, sig)) return duo;
		z_d("65");
		function makeTabs() {

			if (zot(width)) width = 240;
			if (zot(height)) height = 60;
			if (zot(tabs) || tabs.length<=0) tabs = [{label:1},{label:2},{label:3},{label:4}];
			if (zot(color)) color = "#333";
			if (zot(rollColor)) rollColor = "#555";
			if (zot(offColor)) offColor = "#777";
			if (zot(currentEnabled)) currentEnabled = false;
			if (zot(spacing)) spacing = 1;
			if (zot(corner)) corner = 0;
			if (zot(labelColor)) labelColor = "white";
			if (zot(flatBottom)) flatBottom = true;
			if (zot(keyEnabled)) keyEnabled = true;

			var that = this;
			this.keyEnabled = keyEnabled;

			var myIndex = 0; // local value for this.currentIndex
			var labels = []
			var buttons = [];
			var button; var t;
			var num = tabs.length;
			var tabW = (width - spacing*(num-1))/num;

			if (typeof tabs[0] == "number" || typeof tabs[0] == "string") { // change to objects with labels
				for (var i=0; i<tabs.length; i++) {
					tabs[i] = {label:String((tabs[i]!=null))?tabs[i]:"1"};
				}
			}
			// calculate widths
			var total = 0; var t;
			var newTabW; var nonSpecifiedCount = 0;
			for (var i=0; i<tabs.length; i++) {
				t = tabs[i];
				if (zot(t.width)) nonSpecifiedCount++;
				total += (zot(t.width))?tabW:t.width;
			}

			if (total > width - spacing*(num-1)) {
				// go back and assign proportional widths
				for (i=0; i<tabs.length; i++) {
					t = tabs[i];
					t.width = (width - spacing*(num-1)) / total * ((zot(t.width))?tabW:t.width);
				}
			} else if (Math.round(total) < Math.round(width - spacing*(num-1))) {
				// go back and readjust the average of non specified widths
				if (nonSpecifiedCount > 0) {
					newTabW = (total-nonSpecifiedCount*tabW)/nonSpecifiedCount;
					for (i=0; i<tabs.length; i++) {
						t = tabs[i];
						t.width = ((zot(t.width))?newTabW:t.width);
					}
				} else {
					if (zon) zog("ZIM Tabs - total less than width");
					this.width = total + spacing*(num-1);
				}
			}

			var lastX = 0; var tColor;
			for (i=0; i<tabs.length; i++) {
				t = tabs[i];
				if (zot(t.label)) t.label = " ";
				tColor = (i==0)?((zot(t.color))?color:t.color):((zot(t.offColor))?offColor:t.offColor);
				if (typeof t.label === "string" || typeof t.label === "number") {
					t.label = new zim.Label(t.label, height/2, "arial", labelColor);
				}
				button = new zim.Button(
					(zot(t.width))?tabW:t.width,
					height, t.label, tColor,
					(zot(t.rollColor))?rollColor:t.rollColor,
					null, null, corner, -1, null, null, gradient, gloss, flatBottom
				)
				button.znum = i;
				t.label.znum = i;
				labels.push(t.label);
				buttons.push(button);
				this.addChild(button);
				button.x = lastX;
				lastX = button.x + button.width + spacing;
				if (i==0 && !currentEnabled) button.enabled = false;
			};

			this.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function(e) {
				change(e.target.znum);
				that.dispatchEvent("change");
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			});

			function change(num) {
				var t = tabs[myIndex];
				if (t) {
					buttons[myIndex].color = (zot(t.offColor))?offColor:t.offColor;
					if (!currentEnabled) buttons[myIndex].enabled = true;
				}
				myIndex = num;
				t = tabs[myIndex];
				if (t) {
					buttons[myIndex].color = (zot(t.color))?color:t.color;
					if (!currentEnabled) buttons[myIndex].enabled = false;
				}
			}

			window.addEventListener("keydown", function(e) {
				if (!that.keyEnabled) return;
				if (e.keyCode == 9) {
					var next = myIndex; // note that change updates the index
					if (e.shiftKey) {
						change((--next<0)?tabs.length-1:next);
					} else {
						change((++next>tabs.length-1)?0:next);
					}
					that.dispatchEvent("change");
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
					e.preventDefault();
				}
			});

			Object.defineProperty(this, 'selected', {
				get: function() {
					return buttons[myIndex];
				},
				set: function(value) {
					if (zon) zog("selected is read only - try selectedIndex");
				}
			});

			Object.defineProperty(this, 'selectedIndex', {
				get: function() {
					return myIndex;
				},
				set: function(value) {
					// change(Math.min(Math.max(value, 0), tabs.length-1));
					change(value);
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'tabs', {
				get: function() {
					return myIndex;
				},
				set: function(value) {
					change(Math.min(Math.max(value, 0), tabs.length-1));
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'color', {
				get: function() {
					return color;
				},
				set: function(value) {
					color = value;
					if (zot(tabs[myIndex].color)) {
						buttons[myIndex].color = color;
						if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
					}
				}
			});

			Object.defineProperty(this, 'rollColor', {
				get: function() {
					return rollColor;
				},
				set: function(value) {
					rollColor = value;
					for (var i=0; i<tabs.length; i++) {
						if (zot(tabs[myIndex].rollColor)) {
							buttons[i].rollColor = rollColor;
						}
					}
				}
			});

			Object.defineProperty(this, 'offColor', {
				get: function() {
					return offColor;
				},
				set: function(value) {
					offColor = value;
					for (var i=0; i<tabs.length; i++) {
						if (zot(tabs[myIndex].offColor)) {
							buttons[i].color = offColor;
						}
					}
					if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'label', {
				get: function() {
					return labels[myIndex];
				},
				set: function(value) {
					if (zon) zog("selected is read only - try selectedIndex");
				}
			});

			Object.defineProperty(this, 'text', {
				get: function() {
					return (labels[myIndex]!=null) ? labels[myIndex].text : undefined;
				},
				set: function(value) {
					if (zon) zog("selected is read only - try selectedIndex");
				}
			});

			Object.defineProperty(this, 'buttons', {
				get: function() {
					return buttons;
				},
				set: function(value) {
					if (zon) zog("buttons is read only");
				}
			});

			Object.defineProperty(this, 'labels', {
				get: function() {
					return labels;
				},
				set: function(value) {
					if (zon) zog("labels is read only");
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			this.clone = function() {
				var tabsCopy = zim.copy(tabs);
				for (var i=0; i<tabsCopy.length; i++) {
					tabsCopy[i].label = tabsCopy[i].label.clone();
				}
				return that.cloneProps(new zim.Tabs(width, height, tabsCopy, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, flatBottom, keyEnabled, gradient, gloss));
			}

			this.dispose = function() {
				for (var i=0; i<that.buttons.length; i++) {
					that.buttons[i].dispose();
					that.labels[i].dispose();
				}
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeTabs.prototype = new zim.Container();
		makeTabs.prototype.constructor = zim.Tabs;
		return new makeTabs();

	}//-65

/*--
zim.Pad = function(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor)

Pad
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A pad that has rows and cols made of square keys.
When the keys are pressed the pad will dispatch a change event - get the selectedIndex or text property.

EXAMPLE
var pad = new zim.Pad();
pad.center(stage);
pad.on("change", function() {
	zog(pad.selectedIndex); // 0-8
	zog(pad.text); // 1-9
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 150) overall width of pad (ZIM divides the width across cols and spacing)
cols - (default 3) the columns in the pad
rows - (default cols) the rows in the pad
keys - (default [1,2,3,4,5,6,7,8,9]) an array of key objects with the following properties available:
	any key specific properties will override the default values from other parameters
	[{label:"String", width:200, color:"Red", rollColor:"pink", offColor:"grey"}, {etc.}]
	the label can be a String or a zim.Label object - default text color is white
color - (default "#333") the color of the selected tab (any CSS color)
rollColor - (default "#555") the rollover color (selected keys do not roll over)
offColor - (default "#777") the color of a deselected key when not rolled over
spacing - (default 1) is the pixels between key buttons
currentEnabled - (default true) set to false to make selected key not pressable
corner - (default 0) the corner radius of the keys
labelColor - (default "white") the color of the label

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
selectedIndex - gets or sets the selected index of the pad
selected - gets the selected button - selected.enabled = true, etc.
width, height - read only - calculated from getBounds()
text - gets current selected label text
label - gets current selected label object
color - gets or sets default selected tab color
rollColor - gets or sets default rolled over color
offColor - gets or sets default unselected tab color
buttons - an array of the ZIM Button objects. buttons[0].enabled = false;
labels - an array of the ZIM Label objects. labels[0].text = "YUM"; labels[2].y -= 10;
tabs - an array of the zim Tab objects (one object per row)
enabled - default is true - set to false to disable

OPTIMIZED
This component is affected by the general zim.OPTIMIZE setting (default is false)
if set to true, you will have to stage.update() after setting certain properties
and stage.update() in change event to see component change its graphics

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when a pad changes (but not when setting selectedIndex property)
--*///+66
	zim.Pad = function(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor) {

		var sig = "width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor";
		var duo; if (duo = zob(zim.Pad, arguments, sig)) return duo;
		z_d("66");
		function makePad() {

			// the other parameters will be handled by the Tabs object for each row
			if (zot(width)) width = 150;
			if (zot(cols)) cols = 3;
			if (zot(rows)) rows = cols;
			if (zot(keys)) keys = [1,2,3,4,5,6,7,8,9];
			if (zot(currentEnabled)) currentEnabled = true;
			if (zot(spacing)) spacing = 1;

			var that = this;
			var myIndex;

			this.cols = cols; // read only
			this.rows = rows;

			var height = width / cols - spacing;
			var rowTabs = [];
			var count = 0;
			var r;
			this.labels = [];
			this.buttons = [];
			for (var i=0; i<rows; i++) {
				var rowKeys = [];
				for (var j=0; j<cols; j++) {
					rowKeys.push((keys[count]!=null) ? keys[count] : "");
					count++;
				}
				r = rowTabs[i] = new zim.Tabs(width, height, rowKeys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor, false, false);
				this.labels = this.labels.concat(r.labels);
				this.buttons = this.buttons.concat(r.buttons);
				this.addChild(r);
				r.selectedIndex = -1;
				r.y = (height+spacing)*i;
				r.znum = i;
				r.on("change", pressKey);
			}
			this.tabs = rowTabs;
			function pressKey(e) {
				var r = e.target;
				that.selected = r.selected;
				that.text = r.text;
				that.label = r.label;
				var s = r.selectedIndex; // store selected then clear all in pad
				for (var i=0; i<rowTabs.length; i++) {
					rowTabs[i].selectedIndex = -1;
				}
				r.selectedIndex = s; // restore selected
				myIndex = r.znum * cols + s; // calculate pad selected
				that.dispatchEvent("change");
				if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
			}

			Object.defineProperty(this, 'selectedIndex', {
				get: function() {
					return myIndex;
				},
				set: function(value) {
					myIndex = value;
					for (var i=0; i<rowTabs.length; i++) {
						rowTabs[i].selectedIndex = -1;
					}
					var tabNum = Math.floor(myIndex / cols);
					if (tabNum >= 0 && tabNum < that.tabs.length) {
						that.tabs[tabNum].selectedIndex = myIndex % cols;
					}
				}
			});

			this._enabled = true;
			Object.defineProperty(that, 'enabled', {
				get: function() {
					return that._enabled;
				},
				set: function(value) {
					zenable(that, value);
				}
			});

			this.clone = function() {
				return that.cloneProps(new zim.Pad(width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelColor));
			}

			this.dispose = function() {
				for (var i=0; i<that.tabs.length; i++) {
					that.tabs[i].dispose();
				}
				that.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makePad.prototype = new zim.Container();
		makePad.prototype.constructor = zim.Pad;
		return new makePad();

	}//-66

/*--
zim.ColorPicker = function(width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur)

ColorPicker
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A traditional color picker which shows 256 Web colors by default or custom colors.
Can additionally show 16 greys and / or an alpha slider.
Picking on a color sets the swatch color and the selectedColor property.
OK dispatches a change event if the color changed or a close event if not.
The X dispatches a close event.

EXAMPLE
var cp = new zim.ColorPicker();
cp.center(stage);
cp.on("change", function() {
	zog(cp.selectedColor); // #ffcc99, etc. after pressing OK
	zog(cp.selectedAlpha); // 0-1
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
width - (default 500) the width of the color picker
colors - (default 256 Web colors) an optional list of colors ["red", "#CCC", etc.]
cols - (default 10) how many columns to use if you pass in custom colors
spacing - (default 2) is the space between the color squares
greyPicker - (default true) shows an extra 16 greys (set to false to hide these)
	for the default colors it also includes 2 starting colors that record last picked colors
alphaPicker - (default true) shows an alpha slider (set to false to hide this)
	the swatch has a black, grey and white backing underneath to show multiple alpha effects
startColor - (default the last color in color array) the starting color
drag - (default true) whether you can drag the component - set to false to not drag
	a small grip under the color text shows if draggable
shadowColor - (default rgba(0,0,0,.3)) set to -1 for no drop shadow
shadow blur - (default 14) the blur of the shadow if shadow is set

METHODS
clone() - makes a copy with properties such as x, y, etc. also copied
dispose() - removes listeners and deletes object

**** ZIM 4TH adds all the methods listed under Container above
**** for example: drag(), hitTestRect(), animate(), scale(), center(), etc.
**** also see the CreateJS Easel Docs for Container properties, methods and events
**** for example: on(), setBounds(), addChild(), cache(), x, y, alpha, rotation

PROPERTIES
selectedColor - gets or sets the selected color swatch
selectedAlpha - gets or sets the selected alpha (set does not work if alphaPicker is false)
width, height - read only - calculated from getBounds()

swatch - gets the zim.Rectangle that is the color swatch
swatchBacking - gets the createjs.Shape that is under the swatch (seen if alpha set low)
swatchText - gets the zim.Label that shows the color text
grip - gets the createjs.Shape for the grip if the panel is dragable
backing - gets the zim.Rectangle that is the backing (cp.backing.color = "white")
okBut - references the OK zim.Button
closeBut - references the X zim.Button

if alphaPicker is true:
alpaBacking - gets reference to the zim.Rectangle that makes the backing for the alpha slider
alphaBut - the zim.Button on the alpha slider
alphaSlider - the zim.Slider for the alpha
alphaText - the zim.Label for the alpha

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

EVENTS
dispatches a "change" event when the OK button is activated and the color is different than before
dispatches a "close" event if the OK button is activated and the color has not changed or the X button is pressed
--*///+67
	zim.ColorPicker = function(width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur) {

		var sig = "width, colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur";
		var duo; if (duo = zob(zim.ColorPicker, arguments, sig)) return duo;
		z_d("67");
		function makeColorPicker() {

			if (zot(width)) width = 500;
			if (zot(colors)) standard = true;
			if (zot(cols)) cols = 10;
			if (zot(spacing)) spacing = 2;
			if (zot(alphaPicker)) alphaPicker = true;
			if (zot(greyPicker)) greyPicker = true;
			if (zot(drag)) drag = true;
			if (zot(shadowColor)) shadowColor="rgba(0,0,0,.3)";
			if (zot(shadowBlur)) shadowBlur=14;

			var that = this;

			var secondLastColor = "#e472c4"; // only used on standard colors
			var thirdLastColor = "#50c4b7";
			var lastAlpha = 1;
			var myAlpha = 1;

			var box = new createjs.Shape(); // shape that holds all colors and greys
			this.addChild(box);
			box.x += spacing;
			box.y += spacing;

			var standard = false;
			var colorsTemp; var w;
			var greys = [];
			if (zot(colors)) {
				standard = true;
				var num = 6; // six sets 0,3,6,9,C,F - for Web colors
				var tot = num*num*num;
				num = Math.ceil(Math.pow(tot,1/2));
				w = (width - spacing)/18-spacing;
				var f = Math.floor(Math.pow(num*num, 1/3));
				colorsTemp = [];
				for (var i=0; i<6; i++) {
					for (var j=0; j<6; j++) {
						for (var k=0; k<6; k++) {
							colorsTemp.push("#" + con(i*3) + con(j*3) + con(k*3));
						}
					}
				}
				colors = []; // flip every six by six sideways and put on two lines
				var c, r, nC, nR;
				for (i=0; i<colorsTemp.length; i++) {
					c = Math.floor(i/6);
					r = i%6;
					if (c >= 6*3) {f = 1;} else {f = 0;}
					nC = c-f*6*3;
					nR = r+f*6;
					colors[nR*18+nC] = colorsTemp[i];
				}
				cols = 18;
				greys = [thirdLastColor, secondLastColor];
			} else {
				w = (width - spacing) / cols - spacing;
			}
			var rows = Math.ceil(colors.length/cols);

			var myColor = String(colors[colors.length-1]);
			if (!zot(startColor)) myColor = String(startColor);
			var lastColor = thirdLastColor;

			function con(n) {
				n = Math.floor(n).toString(16);
				return n + "" + n;
			}

			var g = box.graphics; var f=0; var color, r, c, rX , rY;
			for (i=0; i<colors.length; i++) {
				c = i%cols;
				r = Math.floor(i/cols);
				rX = c*(w+spacing);
				rY = r*(w+spacing);
				g.f(colors[i]).r(rX,rY,w,w);
			}

			var lastHeight = rY + w + spacing;

			var greyHeight = lastHeight;
			if (greyPicker) {
				for (i=0; i<16; i++) {
					greys.push("#"+con(i)+con(i)+con(i));
				}
				for (i=0; i<greys.length; i++) {
					c = Math.floor(i/cols);
					r = i%cols;
					rX = r*(w+spacing);
					rY = c*(w+spacing)+lastHeight;
					g.f(greys[i]).r(rX,rY,w,w);
				}
				lastHeight = rY + w + spacing;
				var greyCols = cols;
				var greyRows = Math.ceil(greys.length/cols);
			}

			var margin = 10;

			if (alphaPicker) {
				var alpha = new zim.Container();
				alpha.setBounds(0,0,600,70);
				this.addChild(alpha);
				alpha.x = 0;
				alpha.y = lastHeight;

				var alphaBacking = this.alphaBacking = new zim.Rectangle(600-margin*2, 50, "#222", null, null, 0);
				alpha.addChild(alphaBacking);
				zim.centerReg(alphaBacking, alpha);

				var sliderBut = this.alphaBut = new zim.Button({width:20,height:30,label:"",corner:0,hitPadding:20});
				var slider = this.alphaSlider = new zim.Slider(0,1,.05,sliderBut,600*.55);
				slider.currentValue = 1;
				alpha.addChild(slider);
				slider.x = 40;
				slider.y = alpha.height/2;

				var alphaText = this.alphaText = new zim.Label("Alpha: 1", 30, null, "orange");
				alpha.addChild(alphaText);
				alphaText.x = slider.x + slider.bar.width + 40;
				alphaText.y = alpha.height/2 - alphaText.height/2;

				alpha.scaleX = alpha.scaleY = width / 600;

				slider.on("change", function() {
					alphaText.text = "Alpha: " + decimals(slider.currentValue);
					swatch.alpha = myAlpha = slider.currentValue;
					if (that.getStage()) that.getStage().update();
				});

				lastHeight += (alpha.height-margin)*alpha.scaleX;
			}

			var nav = new zim.Container();
			nav.setBounds(0,0,600,100);
			this.addChild(nav);
			nav.x = 0;
			nav.y = lastHeight+margin;

			var swatchText = this.swatchText = new zim.Label(myColor.toUpperCase().substr(0,7), 30, null, "orange");
			nav.addChild(swatchText);
			zim.centerReg(swatchText);
			swatchText.x = 200/2-10;
			swatchText.y = 50-2;

			if (drag) {
				var grip = this.grip = new createjs.Shape();
				nav.addChild(grip);
				grip.graphics.f("rgba(256,256,256,.25)").r(0,0,5,20).r(10,0,5,20).r(20,0,5,20).r(30,0,5,20);
				grip.x = 70; grip.y = 65;
				swatchText.y = 50-10;
			}

			var closeBut = this.closeBut = new zim.Button(90, 90, "X", "#222", "#444", null,null,0);
			nav.addChild(closeBut);
			closeBut.x = 600 - closeBut.width - margin;
			closeBut.y = 0;
			closeBut.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function(){that.dispatchEvent("close");});

			var button = this.okBut = new zim.Button(150, 90, "OK", "#222", "#444", null,null,0);
			nav.addChild(button);
			button.x = closeBut.x - button.width - margin;
			button.y = 0;
			button.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", doChange);

			var swatchBacking = this.swatchBacking = new createjs.Shape();
			nav.addChild(swatchBacking);
			var g = swatchBacking.graphics;
			g.f("black").r(0.5,0.5,50,89).f("#666").r(50,0.5,50,89).f("white").r(100,0.5,49.5,89);
			swatchBacking.x = button.x - 150 - margin;
			swatchBacking.y = 0;

			var swatch = this.swatch = new zim.Rectangle(150, 90, myColor);
			nav.addChild(swatch);
			swatch.x = swatchBacking.x;
			swatch.y = 0;
			swatch.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", doChange);
			swatch.cursor = "pointer";

			nav.scaleX = nav.scaleY = width / 600;
			lastHeight += nav.height * nav.scaleX;

			var height = lastHeight + margin;
			this.setBounds(0,0,width,height);

			var backing = this.backing = new zim.Rectangle(width,height,"black");
			this.addChildAt(backing,0);
			if (shadowColor != -1 && shadowBlur > 0) backing.shadow = new createjs.Shadow(shadowColor, 8, 8, shadowBlur);

			function doChange(){
				if (myColor != lastColor || myAlpha != lastAlpha) {
					if (standard && greyPicker) {
						thirdLastColor = secondLastColor;
						secondLastColor = lastColor;
						var lastColors = [thirdLastColor, secondLastColor]
						for (i=0; i<2; i++) {
							var g = box.graphics;
							c = Math.floor(i/cols);
							r = i%cols;
							rX = r*(w+spacing);
							rY = c*(w+spacing)+greyHeight;
							greys[i] = lastColors[i];
							g.f(backing.color).r(rX-1,rY-1,w+2,w+2).f(lastColors[i]).r(rX,rY,w,w);
						}
						if (!zim.OPTIMIZE && that.getStage()) that.getStage().update();
					}
					lastColor = myColor;
					lastAlpha = myAlpha
					that.dispatchEvent("change");
				} else {
					that.dispatchEvent("close");
				}
			}

			if (drag) {
				var diffX, diffY;
				backing.on("mousedown", function(e) {
					diffX = e.stageX - that.x;
					diffY = e.stageY - that.y;
					backing.cursor = "move";
				});
				backing.on("pressmove", function(e) {
					that.x = e.stageX-diffX;
					that.y = e.stageY-diffY;
					if (that.getStage()) that.getStage().update();
				});
				backing.on("pressup", function(e) {
					backing.cursor = "default";
					if (that.getStage()) that.getStage().update();
				});
			}

			var gridW = cols*(w+spacing);
			var gridH = rows*(w+spacing);
			if (greyPicker) {
				var greyW = greyCols*(w+spacing);
				var greyH = greyRows*(w+spacing);
			}
			box.on((zim.ACTIONEVENT=="mousedown")?"mousedown":"click", function() {
				var index = zim.hitTestGrid(box, gridW, gridH, cols, rows, that.getStage().mouseX, that.getStage().mouseY, 0, 0, spacing, spacing);
				if (!zot(index)) {
					swatch.color = myColor = colors[index];
					swatchText.text = String(colors[index]).toUpperCase().substr(0,7);
					zim.centerReg(swatchText);
					if (that.getStage()) that.getStage().update();
				}
				if (greyPicker) {
					// note greyW not gridW
					index = null;
					index = zim.hitTestGrid(box, greyW, greyH, greyCols, greyRows, that.getStage().mouseX, that.getStage().mouseY, 0, gridH, spacing, spacing);

					if (!zot(index)) {
						swatch.color = myColor = greys[index];
						swatchText.text = greys[index].toUpperCase();
						zim.centerReg(swatchText);
						if (that.getStage()) that.getStage().update();
					}
				}
			});

			Object.defineProperty(this, 'selectedColor', {
				get: function() {
					return myColor;
				},
				set: function(value) {
					swatch.color = myColor = value;
					swatchText.text = colors[index];
					zim.centerReg(swatchText);
					if (that.getStage()) that.getStage().update();
				}
			});

			Object.defineProperty(this, 'selectedAlpha', {
				get: function() {
					if (alphaPicker) {
						return decimals(slider.currentValue);
					} else {
						return 1;
					}
				},
				set: function(value) {
					if (alphaPicker) {
						swatch.alpha = slider.currentValue = value;
						alphaText.text = "Alpha: " + decimals(slider.currentValue);
						if (that.getStage()) that.getStage().update();
					}
				}
			});

			function decimals(n) {
				return Math.round(n*Math.pow(10, 2))/Math.pow(10, 2);
			}

			this.clone = function() {
				return that.cloneProps(new zim.ColorPicker(width, standard?null:colors, cols, spacing, greyPicker, alphaPicker, startColor, drag, shadowColor, shadowBlur));
			}

			this.dispose = function() {
				slider.dispose();
				box.removeAllEventListeners();
				backing.removeAllEventListeners();
				closeBut.removeAllEventListeners();
				swatch.removeAllEventListeners();
				button.removeAllEventListeners();
				return true;
			}
		}

		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeColorPicker.prototype = new zim.Container();
		makeColorPicker.prototype.constructor = zim.ColorPicker;
		return new makeColorPicker();
	}//-67

	// function to set enabled of components
	function zenable(t,v) {
		if (v) {
			t.mouseChildren = true;
			t.mouseEnabled = true;
			t._enabled = true;
		} else {
			t.mouseChildren = false;
			t.mouseEnabled = false;
			t._enabled = false;
		}
	}


////////////////  ZIM PAGES  //////////////

// zimpages.js helps you layout and control flexive pages, click and swipe between pages and more
// classes in this module require createjs namespace to exist and in particular easel.js
// available at http://createjs.com


/*--
zim.Swipe = function(obj, distance, duration)

Swipe
zim class - extends a createjs.EventDispatcher

DESCRIPTION
Sets up capturing swipes on objects.
Dispatches a "swipe" event on swipe left, right, up, down.

EXAMPLE
var rect = new zim.Rectangle(200, 200, "blue");
rect.center(stage);
var swipe = zim.Swipe(rect);
var distance = 100;
swipe.on("swipe", function(e) {
	zog(e.swipeX); // -1, 0, 1  (for left, none and right)
	zog(e.swipeY); // -1, 0, 1  (for up, none and down)

	// move directly:
	// rect.x += distance * e.swipeX;
	// rect.y += distance * e.swipeY;
	// stage.update();

	// or animate
	zim.move({
		target:rect,
		x:rect.x+distance*e.swipeX,
		y:rect.y+distance*e.swipeY,
		time:400,
		ease:"quadOut"
	});
});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object you want to swipe on
distance - (default 30) the distance in pixels to activate swipe
	might want to pass in a pixel distance based on percentage of stage
time - (default 80) time in milliseconds to travel that distance
	try http://zimjs.com/code/swipe.html for testing distance and time (speed)

PROPERTIES
distance - the distance needed for swipe to activate
duration - the time from mousedown a swipe is measured for distance
direction - the direction of the last swipe (left, right, up, down or none)
obj - the object that was last swiped
active - Boolean true for dispatching swipes and false for not

METHODS
enable() - set swipe to active (by default it is)
disable() - set swipe to inactive (sets active to false and does not dispatch)

EVENTS
dispatches a "swipe" event on every pressup (even if swipe failed and direction is none)
when a swipe event triggers
the Swipe event object has a swipeX and swipeY property that is -1,0, or 1
for left, none, or right OR up, none, down
the event object has an obj property as well for what object was swiped
also dispatches a "swipedown" event for convenience on a mousedown

LEGACY
the Swipe object provides a direction property of "left", "right", "up", or "down"
the Swipe object provides an obj property of what object was swiped on
for instance if e is the event object
then e.target is the Swipe object so use e.target.direction
did not dispatch a custom event due to lack of support in early IE
Swipe also dispatches a direction of "none" if the mouse movement is not a swipe
this can be used to snap back to an original location
--*///+70
	zim.Swipe = function(obj, distance, duration) {

		var sig = "obj, distance, duration";
		var duo; if (duo = zob(zim.Swipe, arguments, sig)) return duo;
		z_d("70");
		function makeSwipe() {
			if (zot(obj) || !obj.on) {zog("zim pages - Swipe():\nPlease pass in object"); return;}
			if (zot(distance)) distance = 30; // pixels for swipe to count
			if (zot(duration)) duration = 80; // ms to test pixels

			this.distance = distance;
			this.duration = duration;
			this.active = true;

			var startX;
			var startY;
			var mouseX;
			var mouseY;
			var downCheck;
			var timer;
			var that = this;

			obj.on("mousedown", function(e) {

				if (!that.active || e.target.zimNoSwipe) return;
				that.obj = e.target;
				mouseX = startX = e.stageX;
				mouseY = startY = e.stageY;
				downCheck = true;
				that.dispatchEvent("swipedown");
				clearTimeout(timer);
				timer = setTimeout(function() {
					if (downCheck) {
						checkSwipe();
						downCheck = false;
					}
				}, that.duration);
				obj.on("pressmove", function(e) {
					mouseX = e.stageX;
					mouseY = e.stageY;
				});
				obj.on("pressup", function(e) {
					if (downCheck) {
						checkSwipe();
						downCheck = false;
						clearTimeout(timer);
					}
				});

				function checkSwipe() {
					var swipeCheck = false;
					var e = new createjs.Event("swipe");
					e.obj = that.obj;
					e.swipeX = e.swipeY = 0;
					that.direction = "none";
					// may as well use 45 degrees rather than figure for aspect ratio
					if (Math.abs(mouseX - startX) > Math.abs(mouseY - startY)) {
						if (mouseX - startX > that.distance) {e.swipeX = 1;  that.direction="right";}
						if (startX - mouseX > that.distance) {e.swipeX = -1; that.direction="left";}
					} else {
						if (mouseY - startY > that.distance) {e.swipeY = 1;  that.direction="down";}
						if (startY - mouseY > that.distance) {e.swipeY = -1; that.direction="up";}
					}
					that.dispatchEvent(e);
				}
			});

			this.disable = function() {
				that.active = false;
			}

			this.enable = function() {
				that.active = true;
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeSwipe.prototype = new createjs.EventDispatcher();
		makeSwipe.prototype.constructor = zim.Swipe;
		return new makeSwipe();
	}//-70

/*--
zim.Pages = function(holder, pages, transition, speed, transitionTable)

Pages
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
Pages handle going between pages.
Make a Pages object and add it to the stage.
All your pages from then on are added to and manipulated inside the Pages object.
Pages allows you to set the destination pages for swipe events.
Other events like buttons can call the go(page, direction) method.
Consider using zim.HotSpots() to efficiently handle multiple buttons.

EXAMPLE
// make pages (these would be containers with content)
var home = new zim.Rectangle(stageW, stageH, "blue");
var hide = new zim.Rectangle(stageW, stageH, "green");
var find = new zim.Rectangle(stageW, stageH, "yellow");

var pages = new zim.Pages({
	holder:stage,
	pages:[
		// swipe:["right", "left", "down", "up"]
		{page:home, swipe:[null,"info",hide,find]},
		{page:hide, swipe:[null,null,null,home]},
		{page:find, swipe:[null,null,home,null]}
	],
	transition:"slide",
	speed:1000 // slower than usual for demonstration
});
stage.addChild(pages);

// handle any events inserted into the swipe arrays
pages.on("info", function(){zog("info requested")});

// handle any custom requirements when arriving at a page
// the event gives you the page object
// so add a name properties just make it easier to manage
home.name = "home";
hide.name = "hide";
find.name = "find";
pages.on("page", function() {
	zog(pages.page.name); // now we know which page we are on
})

// you can manually go to pages as well
// we will make a little triangle to click:
var back = new zim.Triangle({fill:"red"});
back.center(find); // add triangle to find page
// not really supposed to add things to zim shapes
// they default to mouseChildren false
// we want to click on the back button
// so we have to set the mouseChildren of find to true
find.mouseChildren = true;
back.cursor = "pointer";
back.on("click", function() {pages.go(home, "up")});
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
holder - where are we putting the pages (eg. stage) (used for setting transition properties)
pages - (default null) an array of page objects - for example:
	[{page:home, swipe:[null,"info",hide,find]},{page:hide, swipe:[null,null,null,home]}]
	the pages should be containers - it helps to give them each a name property
	the optional swipe array holds mappings to swipe events ["right", "left", "down", "up"]
	in other words, these could be pages to the left, right, top and bottom of the current page
	or they can call commands as strings
transition - (default "none") the type of transition "none", "reveal", "slide", "fade", "black", "white"
speed - (default 200) speed in milliseconds of the transition if set
transitionTable - (default none) an array to override general transitions with following format:
	[[fromPage, toPage, "transition", ms(optional)], etc.]

METHODS
addPage() - lets you alternatively add pages after you create the object
removePage() - lets you remove a page (if on this page, call a go() first and remove on the page event)
setSwipe() - lets you set the swipe array for a page
go(newPage, direction, trans, ms) - lets you go to a page for events other than swipe events
	direction is which way the pages is relative to the current page
	trans and ms are optional and will override any previously set transitions (speed in ms)
resize() - call to resize transitions - not the pages themselves (use layouts)
pause() - pauses a transition before it starts (call from swipe event)
unpause() - unpauses a paused transition (unless another go() command is called)
puff(time) - adds all the pages behind the currentPage (adding time (ms) will auto calls settle)
settle() - removes all pages except the currentPage
disable() - stops swipe from activating and sets active = false
enable() - enables swipe action and sets active = true
dispose() - clears your listeners and pages

PROPERTIES
speed - of transitions in ms
transitionTable - [[fromPage, toPage, "transition", ms(optional)], etc.] overrides default transition
page - the current page object (read)
lastPage - the last page before transition (read)
direction - direction of transition (read)
active - default true, boolean to have swipes active (good for layered Pages objects)
swipe - the ZIM Swipe object used for pages (can tweak distance to percentage if rescaling)

EVENTS
Pages dispatches a "page" event when the page changes (to a page in the swipe array)
myPages.on("page",function(e){...})
with myPages.page being set to the new page (e.target.page)
and myPages.lastPage being set to the old page (e.target.lastPage)
myPages.direction gets the direction of the transition (e.target.direction)

if there is a string in the swipe array like "info"
then the zim.Pages() object dispatches an event equivalent to the string
for the data example above, myPages.on("info",function(e){...});
would trigger when the home page is swiped to the left

Pages dispatches a "swipe" event before changing pages if swiped
you can then get pages.page, pages.nextPage and pages.direction
you can pause() if needed the transition to handle data, etc. and then unpause()
you do not need to handle going to another page when swiping - that is handled automatically
so you probably will not use the swipe event unless handling data between pages

Pages also dispatches a "pageTransitioned" event when a transition is complete
you will have the same properties available as with the page event

USAGE
the first page object is the start page
for the data above, swiping the home page down automatically goes to the hide page
if the home page is swiped up it automatically goes to the find page
you can add pages with the addPage() method
it will not show until you swipe or go to it - unless it was the first page added
1. if the holder is the stage then add the pages object to the stage
2. if the holder is another container then add pages object to the holder
and add the holder to the stage (read this twice to make sure you got it!)
in the second case, you will have to mask the holder so you do not see transitions
DO NOT add the pages to the stage or holder - let Pages do it for you
sometimes you need a page to be on the stage to operate on it
if this is the case, call puff() and make adjustments
call settle() when done - or pass in a time in ms to puff to auto settle after that time
you can define multiple pages objects add and remove pages objects as needed
--*///+71
	zim.Pages = function(holder, pages, transition, speed, transitionTable) {

		var sig = "holder, pages, transition, speed, transitionTable";
		var duo; if (duo = zob(zim.Pages, arguments, sig)) return duo;
		z_d("71");
		function makePages() {

			if (zot(holder) || !holder.getBounds || !holder.getBounds()) {zog("zim pages - Pages():\nobject must have bounds set"); return;}
			if (zot(pages)) pages = []; // can add pages with addPages
			if (zot(transition)) transition = "none";
			if (zot(speed)) speed = 200;
			if (zot(transitionTable)) transitionTable = [];
			this.transitionTable = transitionTable;

			this.speed = speed;
			this.active = true;
			var that = this;

			var hW = holder.getBounds().width;
			var hH = holder.getBounds().height;

			var currentPage = this.page = pages[0] ? pages[0].page : null;

			var black; var white;
			if (transition!="none" || transitionTable!=[]) makeTransitionAssets();

			function makeTransitionAssets() {
				black = new createjs.Shape();
				black.graphics.f("black").r(0,0,hW,hH+1);
				white = new createjs.Shape();
				white.graphics.f("white").r(0,0,hW,hH+1);
			}

			var directions = ["left","right","up","down"];

			var data; // holds the page data object
			var page; // holds a page

			for (var i=0; i<pages.length; i++) {
				data = pages[i];
				data.page.zimSwipeArray = (data.swipe) ? data.swipe : [];
			}
			this.addChild(currentPage);

			this.swipe = new zim.Swipe(holder);

			// handle giving swipe event time to trigger event and provide code intervention
			var pauseInfo;
			var paused = false;

			var swipeEvent = this.swipe.on("swipe", function(e) {
				if (!that.active) return;
				var direction = e.currentTarget.direction
				if (direction == "none") return;
				// swap direction (swipe up means move down)
				var newDirection = "";
				if (direction=="left") newDirection="right";
				else if (direction=="right") newDirection="left";
				else if (direction=="up") newDirection="down";
				else if (direction=="down") newDirection="up";
				direction = newDirection;
				var dirIndex = directions.indexOf(direction);
				page = currentPage.zimSwipeArray[dirIndex];

				pauseInfo = [page, direction, null, null, true];
				that.page = currentPage;
				that.nextPage = page;
				that.direction = direction;
				that.dispatchEvent("swipe");

				setTimeout(function() {
					if (!paused) {
						that.go(page, direction, null, null, true); // true is from swipe
					}
				}, 50);
			});

			this.addPage = function(page, swipeArray) {
				if (zot(swipeArray)) swipeArray = [];
				var data = {page:page, swipe:swipeArray};
				data.page.zimSwipeArray = (data.swipe) ? data.swipe : [];
				if (!currentPage) {
					currentPage = that.page = data.page;
					that.addChild(currentPage);
				}
			}

			this.removePage = function(page) {
				if (that.currentPage == page) {
					that.removeChild(page);
					if (holder.getStage()) holder.getStage().update(); // works even if holder is stage
				}
				page.zimSwipeArray = null;
			}

			this.setSwipe = function(page, swipeArray) {
				if (zot(swipeArray)) swipeArray = [];
				var data = {page:page, swipe:swipeArray};
				data.page.zimSwipeArray = (data.swipe) ? data.swipe : [];
			}

			this.pause = function() {
				paused = true;
			}
			this.unpause = function() {
				if (paused) that.go(pauseInfo[0], pauseInfo[1], pauseInfo[2], pauseInfo[3], pauseInfo[4]);
			}

			this.go = function(newPage, direction, trans, ms, fromSwipe) {
				// newPage holds a page or a string command
				setTimeout(function() {paused = false;},200);
				var slides = [{x:hW},{x:-hW},{y:hH},{y:-hH}];
				var slides2 = [{x:0},{x:0},{y:0},{y:0}];
				var reveals = [{x:hW/2,alpha:0},{x:-hW/2,alpha:0},{y:hH/2,alpha:0},{y:-hH/2,alpha:0}];

				// check for default transition override in transitionTable
				var tempTransition = transition; // default transition
				var tempMs = speed; // default transition speed
				for (var i=0; i<that.transitionTable.length; i++) {
					if (that.transitionTable[i][0]==currentPage && that.transitionTable[i][1]==newPage) {
						tempTransition = that.transitionTable[i][2];
						tempMs = that.transitionTable[i][3];
						break;
					}
				}
				// transition passed into go overrides all transitions
				// so if there is not a transition parameter set trans tempTransition
				// which is either the transition table transition or the default
				if (zot(trans)) trans = tempTransition; // use default
				if (zot(ms)) ms = tempMs; // use default
				that.speed = ms;

				that.direction = direction;
				if (newPage=="" || newPage==null) {
					that.page = currentPage;
					that.dispatchEvent("nothing");
				} else if (typeof newPage === 'string') {
					that.page = currentPage;
					that.dispatchEvent(newPage);
				} else {
					if (newPage == currentPage) return; // same page ;-)
					if (zot(direction)) direction="right";
					var dirIndex = directions.indexOf(direction);

					function transEnd(pages) {
						pages[0].uncache();
						pages[1].uncache();
						that.dispatchEvent("pageTransitioned");
						that.removeChild(that.lastPage);
						that.removeChild(black);
						that.removeChild(white);
					}

					function transEndHalf(pages) {
						that.removeChild(that.lastPage);
						zim.animate(pages.shift(), {alpha:0}, that.speed/2, null, transEnd, pages);
					}

					newPage.x = 0;
					newPage.y = 0;
					newPage.alpha = 1;

					if (trans == "slide") {
						newPage.x = -(slides[dirIndex].x | 0);
						newPage.y = -(slides[dirIndex].y | 0);
						newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
						currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
						that.addChild(newPage);
						that.addChild(currentPage);
						zim.animate(currentPage, slides[dirIndex], that.speed, null, transEnd, [currentPage, newPage]);
						zim.animate(newPage, slides2[dirIndex], that.speed);
					} else if (trans == "reveal") {
						newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
						currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
						that.addChild(newPage); // put destination under current page
						that.addChild(currentPage);
						zim.animate(currentPage, reveals[dirIndex], that.speed, null, transEnd, [currentPage, newPage]);
					} else if (trans == "fade") {
						newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
						currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
						newPage.alpha = 1;
						that.addChild(newPage);
						that.addChild(currentPage);
						zim.animate(currentPage, {alpha:0}, that.speed, null, transEnd, [currentPage, newPage]);
					} else if (trans == "black") {
						newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
						currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
						newPage.alpha = 1;
						that.addChild(newPage);
						that.addChild(currentPage);
						black.alpha = 0;
						that.addChild(black);
						zim.animate(black, {alpha:1}, that.speed/2, null, transEndHalf, [black, currentPage, newPage]);
					} else if (trans == "white") {
						newPage.cache(0,0,(hW+1)/newPage.scaleX,(hH+1)/newPage.scaleY);
						currentPage.cache(0,0,(hW+1)/currentPage.scaleX,(hH+1)/currentPage.scaleY);
						newPage.alpha = 1;
						that.addChild(newPage);
						that.addChild(currentPage);
						white.alpha = 0;
						that.addChild(white);
						zim.animate(white, {alpha:1}, that.speed/2, null, transEndHalf, [white, currentPage, newPage]);
					} else {
						that.addChild(newPage);
						that.removeChild(currentPage);
						// that.dispatchEvent("pageTransitioned"); // hmmm... no
					}

					that.lastPage = currentPage;
					that.page = newPage;
					if (zot(fromSwipe)) fromSwipe = false;
					that.fromSwipe = fromSwipe;
					that.dispatchEvent("page");
					currentPage = newPage;
					if (holder.getStage()) holder.getStage().update();
				}
			}

			this.resize = function() {
				hW = holder.getBounds().width;
				hH = holder.getBounds().height;
				if (transition!="none" || transitionTable!=[]) makeTransitionAssets();
			}

			this.puff = function(milliseconds) {
				// add all pages to the holder behind current page
				// if milliseconds then this is the time to settle automatically
				for (var i=0; i<pages.length; i++) {
					that.addChild(pages[i].page);
				}
				that.addChild(currentPage);
				if (milliseconds > 0) {
					setTimeout(function() {
						that.settle();
					}, milliseconds);
				}
			}

			this.settle = function() {
				that.removeAllChildren();
				that.addChild(currentPage);
				that.dispatchEvent("puffed");
			}

			this.disable = function() {
				that.active = false;
			}

			this.enable = function() {
				that.active = true;
			}

			this.dispose = function() {
				that.swipe.off("swipe", swipeEvent);
				that.removeAllChildren();
				pages = null;
				return true;
			}

		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makePages.prototype = new zim.Container();
		makePages.prototype.constructor = zim.Pages;
		return new makePages();
	}//-71


/*--
zim.HotSpots = function(spots, local, mouseDowns)

HotSpots
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
HotSpots allow you to create multiple zim.hotSpot objects on multiple pages.
A zim.hotSpot is an invisible click area (like an image map in HTML).
You can alternatively specify an object and it will turn that into a hotSpot.
zim.HotSpots lets you control many or all of your interactions in one place.

EXAMPLE
// our first hotSpot will be a 50 pixel square at 100, 100
// then we will add hotSpots to these items as well
var circle = new zim.Circle(60, "red");
circle.center(stage);

var button = new zim.Button();
stage.addChild(button);
button.x = stageW - button.width - 100;
button.y = stageH - button.height - 100;

// make the hotSpots object
// these are all on the same page
// gets really handy when you have multiple pages with zim.Pages
var hs = new zim.HotSpots([
	{page:stage, rect:[100,100,50,50], call:function(){zog("hot!");}},
	{page:stage, rect:circle, call:function(){zog("circle!");}},
	{page:stage, rect:button, call:function(){zog("button!");}},
]);
// hs.show(); // uncomment this to see rectangle hotSpots
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
spots - an array of hotspot data objects with the following format:
	[{page:home, rect:[190,50,260,260], call:someFunction},
	 {page:home, rect:[70,405,500,150], call:someOtherFunction}]
	the page should be a createjs Container
	the rect is the [left, right, width, height] of a rectangle relative to the stage
	call is the callback function to call when a hotSpot is clicked
	instead of a rect array you can pass an object that must have setBounds() set
	[{page:home, rect:submitButton, call:function(){//code}}]
	the hotSpot will then use the button position and bounds as the rectangle
	note - in this case, HotSpots will actually add a mousedown or click event to the button
local (default true) hotSpot rect is based on local coordinates of the container
	use when the element scale independently from the stage
	if set to false then you pass in global coordinates and hotSpot will convert them
mouseDowns (default false) stops mousedown events on a button that is used as a hotSpot
	prevents users from activating a swipe on a button (when using ZIM Swipe)

METHODS
show() - shows the hotspots for testing during authoring time
hide() - hides the hotspots
addHotSpot(page,rect,call) - can dynamically add hotSpots
removeHotSpots(page,id) - id is optional - so can remove all spots on a page
dispose() - removes listeners

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)

NOTE: the class does actually add rectangle shapes to your page
the spot is a pixel rect with an alpha of .01 and then uses a hitArea of a backing shape
this could have been done with "math" alone but rollover cursor would be a pain
the class creates zim.HotSpot objects - see the class underneath this one
--*///+72
	if (zot(zim.ACTIONEVENT)) zim.ACTIONEVENT = "mousedown";

	zim.HotSpots = function(spots, local, mouseDowns) {

		var sig = "spots, local, mouseDowns";
		var duo; if (duo = zob(zim.HotSpots, arguments, sig)) return duo;
		z_d("72");
		function makeHotSpots() {
			if (zot(spots) || !Array.isArray(spots)) {zog("zim pages - HotSpots():\nplease provide an array of HotSpot data"); return;}
			if (zot(local)) local = true;
			if (zot(mouseDowns)) mouseDowns = false;
			var eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

			var that = this;

			var data; // spot data object
			var hs; // hotSpot object
			var hotSpots = []; // array of hotSpot objects

			// loop through data and add hotSpot objects
			for (var i=0; i<spots.length; i++) {
				addSpot(spots[i]);
			}

			function addSpot(data) {
				var button = null;
				if (!Array.isArray(data.rect)) {
					button = data.rect; // data includes a button rather than rect
					if (!button) {
						zog("zim pages - HotSpots(): HotSpot "+ data.page + " " + data.rect +" button does not exist");
						return;
					}
					data.rect = [button.x, button.y, 1, 1];	// bounds are not used for button
				}

				hs = new zim.HotSpot(data.page,data.rect[0],data.rect[1],data.rect[2],data.rect[3],data.call,local);
				hs.zimHSpage = data.page;
				hs.button = button;
				hotSpots.push(hs);
				hs.on(eventType, hsEvent);
				if (button) {
					// stop hotSpot from taking away rollovers on button
					hs.spot.mouseEnabled = false;
					hs.spot.mouseChildren = false;
					// but now need to add click to button as hotSpot will not work
					button.zimHScall = data.call;
					button.zimHSEvent = button.on(eventType, hsEvent, true);
					if (!mouseDowns) {
						button.zimHSMDEvent = button.on("mousedown",function(e) {
							e.stopImmediatePropagation();
						});
					}
					button.cursor = "pointer";
				}
			}

			function hsEvent(e) {
				if (e.stopImmediatePropagation) e.stopImmediatePropagation();
				if (window.event) window.event.cancelBubble=true;
				if (typeof(e.currentTarget.zimHScall) == "function") {
					e.currentTarget.zimHScall(e);
				}
			}

			this.addHotSpot = function(page,rect,call) {
				data = {page:page, rect:rect, call:call};
				spots.push(data);
				addSpot(data);
			}

			this.show = function() {
				for (var i=0; i<hotSpots.length; i++) {
					hs = hotSpots[i];
					if (!hs.button) hs.show();
				}
			}
			this.hide = function() {
				for (var i=0; i<hotSpots.length; i++) {
					hs = hotSpots[i];
					hs.hide();
				}
			}

			this.removeHotSpots = function(page, rect) {
				for (var i=spots.length-1; i>=0; i--) {
					data = spots[i];
					hs = hotSpots[i];
					if (rect && !Array.isArray(rect)) { // button
						rect = [rect.x, rect.y, rect.getBounds().width, rect.getBounds().height];
					}
					if (
						(zot(page) && zot(rect)) ||
						(zot(rect) && page==data.page) ||
						(zot(page) && zim.arraysEqual(rect,data.rect)) ||
						(page==data.page && zim.arraysEqual(rect,data.rect))
					) {
						// remove hotSpot from data and hotSpots list
						spots.splice(i,1);
						if (hs.button) {
							hs.button.off(eventType, hs.button.zimHSEvent);
							hs.button.zimHSEvent = null;
							if (!mouseDowns) {
								hs.button.off("mousedown", hs.button.zimHSMDEvent);
								hs.button.zimHSMDEvent = null;
							}
						}
						hs.off(eventType, hsEvent);
						hs.dispose();
						hotSpots.splice(i,1);
					}
				}
			}

			this.dispose = function() {
				for (var i=0; i<hotSpots.length; i++) {
					hs = hotSpots[i];
					if (hs.button) {
						hs.button.off(eventType, hs.button.zimHSEvent);
						hs.button.zimHSCall = null;
						hs.button.zimHSEvent = null;
						if (!mouseDowns) {
							hs.button.off("mousedown", hs.button.zimHSMDEvent);
							hs.button.zimHSMDEvent = null;
						}
					}
					hs.off(eventType, hsEvent);
					hs.dispose();
				}
				return true;
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeHotSpots.prototype = new zim.Container();
		makeHotSpots.prototype.constructor = zim.HotSpots;
		return new makeHotSpots();
	}//-72


/*--
zim.HotSpot = function(obj, x, y, width, height, call, local)

HotSpot
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
HotSpot adds an invisible button to a container object (often think of this as the page).
If you want multiple spots it is more efficient to use the HotSpots class above
which manages multiple HotSpot objects (otherwise you end up with multiple event functions).
The spot is a pixel rect with an alpha of .01 and then uses a hitArea of a backing shape.
The spot will get a cursor of "pointer".

EXAMPLE
var hs = new zim.HotSpot(stage, 100, 100, 50, 50, myFunction);
function myFunction() {
	zog("activation!");
}
// hs.show(); // uncomment this to see rectangle hotSpot
stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
holder - container object in which to place the hotspot (stage for instance)
x, y, width and height - of the rectangle for the hotspot
call - the function to call when the spot is pressed
local (default true) hotSpot rect is based on local coordinates of the container
	use when the element scale independently from the stage
	if set to false then you pass in global coordinates and hotSpot will convert them

METHODS
show() - helps when creating the spot to see where it is
hide() - hides the hotspot
dispose() - removes the listener and the spot

PROPERTIES
spot - the actual hotSpot object that gets added to the container can be accessed with the spot property
eg. hs.spot

ACTIONEVENT
This component is affected by the general zim.ACTIONEVENT setting
The default is "mousedown" - if set to something else the component will act on click (press)
--*///+73
	zim.HotSpot = function(obj, x, y, width, height, call, local) {

		var sig = "obj, x, y, width, height, call, local";
		var duo; if (duo = zob(zim.HotSpot, arguments, sig)) return duo;
		z_d("73");
		function makeHotSpot() {
			if (zot(obj) || !obj.addChild) {zog("zim pages - HotSpot():\nPlease pass in container object for obj"); return;}
			if (obj instanceof createjs.Container == false) {zog("zim pages - HotSpot():\nObjects passed in should be Containers"); return;}
			if (zot(x) || zot(y) || zot(width) || zot(height)) {zog("zim pages - HotSpot():\nPlease pass in x, y, width, height"); return;}
			if (zot(local)) local = true;
			eventType = (zim.ACTIONEVENT=="mousedown")?"mousedown":"click";

			var w = width; var h = height;
			var that = this;

			var backing = new createjs.Shape();
			var but = new createjs.Shape();

			if (!local) {
				var point = obj.globalToLocal(x,y);
				var point2 = obj.globalToLocal(x+w,y+h);
				var newW = point2.x-point.x;
				var newH = point2.y-point.y;
				backing.graphics.f("#999999").dr(point.x,point.y,newW,newH);
				but.graphics.f("#999999").dr(point.x,point.y,1,1);	 // small point
			} else {
				backing.graphics.f("#999999").dr(x,y,w,h);
				but.graphics.f("#999999").dr(x,y,1,1);
			}

			backing.alpha = .4;
			backing.mouseEnabled = false;
			but.alpha = .01;
			but.cursor = "pointer";
			this.spot = but;

			var butEvent = but.on(eventType,function(e) {
				if (typeof(call) == "function") {
					call();
				}
			});
			obj.addChild(but);
			but.hitArea = backing;
			this.show = function() {
				obj.addChild(backing);
			}
			this.hide = function() {
				obj.removeChild(backing);
			}
			this.dispose = function() {
				but.off(eventType, butEvent);
				obj.removeChild(but);
				delete but;
				return true;
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeHotSpot.prototype = new zim.Container();
		makeHotSpot.prototype.constructor = zim.HotSpot;
		return new makeHotSpot();
	}//-73

/*--
zim.dashedLinesOn = function()

dashedLinesOn
zim function

DESCRIPTION
CreateJS now supports dashed lines in its graphics but keep here for legacy
adds dashedLineTo(x1, y1, x2, y2, dashLen)
and drawDashedRect(x, y, w, h, dashLen) methods to createjs Graphics
https://gist.github.com/diverted247/9216242 - Ted Patrick
--*///+74
	zim.dashedLinesOn = function() {
		z_d("74");
		if (zim.dashed) return; // only need to define once
		zim.dashed = true;
		createjs.Graphics.prototype.dashedLineTo = function(x1, y1, x2, y2, dashLen){
			this.moveTo(x1, y1);

			var dX = x2 - x1;
			var dY = y2 - y1;
			var dashes = Math.floor(Math.sqrt(dX*dX+dY*dY) / dashLen);
			var dashX = dX / dashes;
			var dashY = dY / dashes;

			var q = 0;
			while(q++ < dashes){
				x1 += dashX;
				y1 += dashY;
				this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
			}
			this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
			return this;
		}
		createjs.Graphics.prototype.drawDashedRect = function(x1, y1, w, h, dashLen){
			this.moveTo(x1, y1);
			var x2 = x1 + w;
			var y2 = y1 + h;
			this.dashedLineTo(x1, y1, x2, y1, dashLen);
			this.dashedLineTo(x2, y1, x2, y2, dashLen);
			this.dashedLineTo(x2, y2, x1, y2, dashLen);
			this.dashedLineTo(x1, y2, x1, y1, dashLen);
			return this;
		}
	}//-74


/*--
zim.Manager = function()

Manager
zim class

DESCRIPTION
used internally to make GridManager and GuideManager
and in future perhaps OutlineManager
--*///+75
	zim.Manager = function(type) {
		z_d("75");
		var that = this;
		this.items = [];
		this.add = function(a) {
			that.items.push(a);
		}
		this.resize = function() {
			if (!that) return;
			for (var i=0; i<that.items.length; i++) {
				if (!that.items[i].resize()) that.items.splice(i); // was disposed
			}
		}
		this.dispose = function() {
			zog(that.items.length);
			for (var i=that.items.length-1; i>=0; i--) {
				that.items[i].dispose();
			}
			that.items = [];
			that = null;
			return true;
		}
	}//-75


/*--
zim.Guide = function(obj, vertical, percent, hideKey, pixelKey)

Guide Class
extends a zim.Container which extends a createjs.Container

DESCRIPTION
Guide shows a guideline to help layout assets with code.
Cursor x and y in percentage or pixels are shown along edges
as a distance from the guide.
You only need one guide per axis because you measure from the guide to your cursor.
Use the G key to toggle guide visibility.
Use the P key to toggle percent and pixels.
Make sure you remove the guide for your final version (dispose).

EXAMPLE
// simple form for a vertical guide
// use the distance from the guide to your cursor to measure
// so you only need one vertical guide for horizontal measurement
var guide = new zim.Guide(stage);

// better to add guides to a GuideManager
var manager = new zim.GuideManager();
manager.add(new zim.Guide(stage));
manager.add(new zim.Guide(stage, false));

// or with pixels
// manager.add(new zim.Guide(stage, true, false));
// manager.add(new zim.Guide(stage, false, false));

// then you can remove all guides with
// manager.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all guides:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - object to add guide to for example the stage
vertical - (default true) set to false for horizontal guide
percent - (default true) set to false to show pixels
hideKey - (default G) key to press to hide guide
pixelKey - (default P) key to press to swap percent and pixels

METHODS
resize() - resizes the guide if the container size changes (put in frame resize event)
dispose() - removes keyboard event listeners and guide

PROPERTIES
pixels - boolean - set to true to change to pixels, false to go to percent
--*///+76
	zim.Guide = function(obj, vertical, percent, hideKey, pixelKey) {

		var sig = "obj, vertical, percent, hideKey, pixelKey";
		var duo; if (duo = zob(zim.Guide, arguments, sig)) return duo;
		z_d("76");
		function makeGuide() {

			if (zot(obj)) obj = "stage";
			if (zot(vertical)) vertical = true;
			if (obj != "stage" && (!obj.getBounds || !obj.getBounds())) {zog ("zim pages - Guide(): Please provide bounds for the obj (setBounds())"); return;}
			if (zot(percent)) percent = true;
			if (zot(hideKey)) hideKey = "G";
			if (zot(pixelKey)) pixelKey = "P";

			var that = this;
			var stage;
			var stageEvent;
			zim.dashedLinesOn();

			// make text boxes that show x and y
			var boxW = 80;
			var boxH = 26;
			var minX = boxW/6+boxW/2;
			var minY = boxH*2
			var maxX; // set max values once we get a stage
			var maxY;

			var box;
			if (vertical) {
				box = makeBox("#00c5af", "white", "white");
				box.shape.regX = boxW+boxW/6; box.shape.regY = boxH/2;
				box.label.x = -boxW/2-boxW/6;
			} else {
				box = makeBox("#d61fa0", "white", "white");
				box.shape.regX = boxW/2; box.shape.regY = boxH + boxH/4;
				box.label.y = -boxH*3/4;
			}

			function makeBox(fill, stroke, textColor) {
				var box = new zim.Container();
				box.shape = new createjs.Shape();
				box.shape.graphics.s(stroke).ss(1).f(fill).r(0,0,boxW,boxH);
				box.shape.alpha = .9;
				box.addChild(box.shape);
				box.label = new createjs.Text("10", "16px verdana", textColor);
				box.label.textAlign = "center";
				box.label.textBaseline = "middle";
				box.addChild(box.label);
				box.mouseChildren = false;
				box.mouseEnabled = false;
				return box;
			}

			// get stage and apply stagemousemove to move text boxes
			// the added event was added in the 2014 createjs
			// found the added did not reliably get a stage property
			// still had to wait a few microseconds
			// so resorting to interval
			// this.on("added", added);
			var addedInterval = setInterval(function() {
				if (obj == "stage") {
					if (that && that.getStage()) {
						added();
					}
				} else {
					if (obj && obj.getStage()) {
						added();
					}
				}
			},100);

			var guideCheck = false;
			var objW;
			var objH;
			var line;
			var dragBounds;
			function added() {
				clearInterval(addedInterval);
				if (obj == "stage") {
					stage =	that.getStage();
					obj = stage;
				} else {
					stage =	obj.getStage();
				}
				objW = obj.getBounds().width;
				objH = obj.getBounds().height;
				if (vertical) {
					box.y = objH/2;
					box.label.text = "y:" + ((that.pixels) ? Math.round(objW*70/100) : "70%");
				} else {
					box.x = objW/2;
					box.label.text = "x:" + ((that.pixels) ? Math.round(objH*70/100) : "70%");
				}
				line = new createjs.Shape();
				that.addChild(line);
				(vertical) ? line.x = objW*.7 : line.y = objH*.7;

				if (!guideCheck) {
					obj.addChild(that);
					drawGuide();
				}
				stage.off("stagemousemove", stageEvent);
				stageEvent = stage.on("stagemousemove", where);
				stage.update();
			};

			var lastPoint = {x:0,y:0};
			function where(e) {
				// convert mouse location to local point
				var point; var diff;
				if (e) {
					point = obj.globalToLocal(e.rawX, e.rawY);
					lastPoint = point;
				} else {
					point = {x:lastPoint.x, y:lastPoint.y}
				}
				if (!percent) {	// pixels
					if (vertical) {
						diff = Math.round(Math.abs(point.x-line.x));
						box.label.text = "x:" + Math.max(0, Math.min(diff, Math.round(objW)));
						box.y = Math.max(minY, Math.min(point.y, maxY));
					} else {
						diff = Math.round(Math.abs(point.y-line.y));
						box.label.text = "y:" + Math.max(0, Math.min(diff, Math.round(objH)));
						box.x = Math.max(minX, Math.min(point.x, maxX));
					}
				} else {
					if (vertical) {
						diff = Math.round(Math.abs(point.x-line.x)/objW*100);
						box.label.text = "x:" + Math.max(0, Math.min(diff, 100)) + "%";
						box.y = Math.max(minY, Math.min(point.y, maxY));
					} else {
						diff = Math.round(Math.abs(point.y-line.y)/objH*100);
						box.label.text = "y:" + Math.max(0, Math.min(diff, 100)) + "%";
						box.x = Math.max(minX, Math.min(point.x, maxX));
					}
				}
				if (stage) stage.update();
			}

			// make the guide once we have the stage
			// and any time resize is called
			function drawGuide() {
				guideCheck = true;
				objW = obj.getBounds().width;
				objH = obj.getBounds().height;
				var pointer;
				if (vertical) {
					pointer = "ew-resize";
					dragBounds = new createjs.Rectangle(0,0,objW,0);
				} else {
					pointer = "ns-resize";
					dragBounds = new createjs.Rectangle(0,0,0,objH);
				}
				zim.noDrag(line);
				setTimeout(function() {
					// give time for content to settle
					zim.drag(line, dragBounds, pointer, pointer, null, null, true);
				}, 500);
				stage.mouseMoveOutside = true;
				stage.enableMouseOver(10);

				maxX = objW-boxW*2/3;
				maxY = objH-boxH - boxH;
				line.uncache();
				var g = line.graphics;
				if (vertical) {
					g.c().s("rgba(0,255,255,.1)").ss(20).mt(0,0).lt(0,objH);
					g.f().s("white").ss(2).mt(0,0).lt(0,objH);
					g.s("#00c5af").ss(2).dashedLineTo(0,0,0,objH,20);
					line.cache(-10,0,20,objH);
				} else {
					g.c().s("rgba(255,0,255,.1)").ss(20).mt(0,0).lt(objW,0);
					g.f().s("white").ss(2).mt(0,0).lt(objW, 0);
					g.s("#d61fa0").ss(2).dashedLineTo(0,0,objW,0,20);


					line.cache(0,-10,objW,20);
				}

				(vertical) ?  box.x = objW : box.y = objH;
				that.addChild(box);

			}

			Object.defineProperty(this, 'pixels', {
				get: function() {
					return !percent;
				},
				set: function(value) {
					percent = !value;
					that.resize();
				}
			});

			// add key listener to hide and show the guide
			window.addEventListener("keydown", keyEvent);

			function keyEvent(e) {
				if (!e) e=event;
				if (!stage) return;
				if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // G
					that.visible = !that.visible;
					stage.off("stagemousemove", stageEvent);
					if (that.visible) {
						stageEvent = stage.on("stagemousemove", where, that);
					}
					stage.update();
				}
				if (String.fromCharCode(e.keyCode) == pixelKey.toUpperCase()) { // P
					that.pixels = !that.pixels;
				}
			}

			this.resize = function() {
				if (!that) return false;
				if (stage) {
					drawGuide();
					where();
				}
				return true;
			}

			this.dispose = function() {
				if (!that) return false;
				zim.noDrag(line);
				clearInterval(addedInterval);
				that.removeAllChildren();
				window.removeEventListener("keydown", keyEvent);
				if (that.parent) that.parent.removeChild(that);
				that = null;
				return true;
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeGuide.prototype = new zim.Container();
		makeGuide.prototype.constructor = zim.Guide;
		return new makeGuide();
	}//-76


/*--
zim.GuideManager = function()

GuideManager
zim class - extends the ZIM Manager abstract class

DESCRIPTION
Add Zim Guide objects to a GuideManager object and update or remove all guides at once.
Guides are handy to use but perhaps annoying to update and remove if you have many.
GuideManager keeps track of the guides and lets you update or dispose of them on command.

EXAMPLE
var manager = new zim.GuideManager();
manager.add(new zim.Guide(stage));
manager.add(new zim.Guide(stage, false));

// or with pixels
// manager.add(new zim.Guide(stage, true, false));
// manager.add(new zim.Guide(stage, false, false));

// then you can remove all guides with
// manager.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all guides:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

PROPERTIES
items - an array of all Guide objects added with add()

METHODS
add(guide) - registers a guide with the GuideManager
resize() - resizes all the guides in the GuideManager (ie. if stage changes)
dispose() - disposes all guides and the GuideManager

NOTE: to just hide guides, you use the G key
and to toggle percent and pixels use the P key
you can dispose guides individually or use this class to dispose all
disposing will remove the G, P key listener and the guide
--*///+77
	zim.GuideManager = function() {
		z_d("77");
		zim.Manager.call(this, "GuideManager");
	}
	zim.GuideManager.prototype = new zim.Manager();
	zim.GuideManager.prototype.constructor = zim.GuideManager;
	//-77

/*--
zim.Grid = function(obj, color, percent, hideKey, pixelKey)

Grid
zim class - extends a zim.Container which extends a createjs.Container

DESCRIPTION
A Grid shows gridlines to help layout assets with code (percent is default).
Cursor x and y percentage or pixels are shown along edges.
Use the G key to toggle grid visibility.
Use the P key to toggle percent and pixels.
Make sure you remove the grid for your final version (dispose).

EXAMPLE
var grid = new zim.Grid(stage);

// better to add grids to a GridManager
var manager = new zim.GridManager();
manager.add(new zim.Grid(stage));

// or with pixels
// manager.add(new zim.Grid(stage, null, false));

// then you can remove all grids with
// grid.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all grids:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
obj - the object to add grid to (for example the stage)
color - (default black) the color of the grid
percent - (default true) set to false to show pixels
hideKey - (default G) key to press to hide grid
pixelKey - (default P) key to press to swap percent and pixels

METHODS
resize() - resize the grid if the container changes size (eg. put in frame resize event)
dispose() - clears keyboard events and grid

PROPERTIES
pixels - boolean - set to true to change to pixels, false to go to percent
--*///+78
	zim.Grid = function(obj, color, percent, hideKey, pixelKey) {

		var sig = "obj, color, percent, hideKey, pixelKey";
		var duo; if (duo = zob(zim.Grid, arguments, sig)) return duo;
		z_d("78");
		function makeGrid() {

			if (zot(obj)) obj = "stage";
			if (zot(color)) color = "black";
			if (obj != "stage" && (!obj.getBounds || !obj.getBounds())) {zog ("zim pages - Grid(): Please provide bounds for the obj (setBounds())"); return;}
			if (zot(percent)) percent = true;
			if (zot(hideKey)) hideKey = "G";
			if (zot(pixelKey)) pixelKey = "P";

			var that = this;
			var stage;
			var pixels = 10; // for grid
			var stageEvent;


			this.mouseChildren = false;
			this.mouseEnabled = false;

			// make text boxes that show x and y
			var boxW = 80;
			var boxH = 26;

			var top = makeBox("#dddddd", color, "#333333");
			top.shape.regX = boxW/2; top.shape.regY = -boxH/4;
			top.label.y = boxH*3/4;

			var left = makeBox("#dddddd", color, "#333333");
			left.shape.regX = -boxW/6; left.shape.regY = boxH/2;
			left.label.x = boxW/2 + boxW/6;

			function makeBox(fill, stroke, textColor) {
				var box = new zim.Container();
				box.shape = new createjs.Shape();
				box.shape.graphics.s(stroke).ss(1).f(fill).r(0,0,boxW,boxH);
				box.shape.alpha = .9;
				box.addChild(box.shape);
				box.label = new createjs.Text("10", "16px verdana", textColor);
				box.label.textAlign = "center";
				box.label.textBaseline = "middle";
				box.addChild(box.label);
				box.mouseChildren = false;
				box.mouseEnabled = false;
				return box;
			}

			var minX = boxW/6+boxW/2;
			var minY = boxH*2
			var maxX; // set max values once we get a stage
			var maxY;

			top.x = minX;
			left.y = minY;
			top.label.text = "x:0";
			left.label.text = "y:0";


			// get stage and apply stagemousemove to move text boxes
			// the added event was added in the 2014 createjs
			// found the added did not reliably get a stage property
			// still had to wait a few microseconds
			// so resorting to interval
			// this.on("added", added);
			var addedInterval = setInterval(function() {
				if (obj == "stage") {
					if (that && that.getStage()) {
						added();
					}
				} else {
					if (obj && obj.getStage()) {
						added();
					}

				}
			},100);

			var gridCheck = false;
			function added() {
				clearInterval(addedInterval);
				if (obj == "stage") {
					stage =	that.getStage();
					obj = stage;
				} else {
					stage =	obj.getStage();
				}
				if (!gridCheck) {
					drawGrid();
					obj.addChild(that);
				}
				stage.off("stagemousemove", stageEvent);
				stageEvent = stage.on("stagemousemove", where);
				stage.update();
			};

			var lastPoint = {x:0,y:0};
			function where(e) {
				// convert mouse location to local point
				var point;
				if (e) {
					point = obj.globalToLocal(e.rawX, e.rawY);
					lastPoint = point;
				} else {
					point = {x:lastPoint.x, y:lastPoint.y}
				}
				if (!percent) {	// pixels
					top.label.text = "x:" + Math.max(0, Math.min(Math.round(point.x), Math.round(objW)));
					top.x = Math.max(minX, Math.min(point.x, maxX));
					left.label.text = "y:" + Math.max(0, Math.min(Math.round(point.y), Math.round(objH)));
					left.y = Math.max(minY, Math.min(point.y, maxY));
				} else {
					top.label.text = "x:" + Math.max(0, Math.min(Math.round(point.x/objW*100), 100)) + "%";
					top.x = Math.max(minX, Math.min(point.x, maxX));
					left.label.text = "y:" + Math.max(0, Math.min(Math.round(point.y/objH*100), 100)) + "%";
					left.y = Math.max(minY, Math.min(point.y, maxY));
				}
				if (stage) stage.update();
			}

			// make the grid once we have the stage
			var objW;
			var objH;
			var cached;
			function drawGrid() {
				gridCheck = true;

				objW = obj.getBounds().width;
				objH = obj.getBounds().height;
				stage.mouseMoveOutside = true;
				stage.enableMouseOver(10);

				maxX = objW-boxW*2/3;
				maxY = objH-boxH - boxH;

				cached = new zim.Container();
				that.addChild(cached);
				var grid = new createjs.Shape();
				cached.addChild(grid);
				var g = grid.graphics;
				g.s(color).ss(1);

				var grid2 = new createjs.Shape();
				cached.addChild(grid2);


				if (!percent) { // pixels

					for (var i=0; i<objW/pixels; i++) {
						g.mt(i*pixels, 0).lt(i*pixels, objH);
					}
					for (var i=0; i<objH/pixels; i++) {
						g.mt(0, i*pixels).lt(objW, i*pixels);
					}
					grid.alpha = .3;

					g = grid2.graphics;
					g.s(color).ss(1);

					for (var i=0; i<objW/(pixels*10); i++) {
						g.mt(i*(pixels*10), 0).lt(i*(pixels*10), objH);
					}
					for (var i=0; i<objH/(pixels*10); i++) {
						g.mt(0, i*(pixels*10)).lt(objW, i*(pixels*10));
					}

				} else { // percent - every 5 percent

					for (var i=1; i<20+2; i++) {
						g.mt(i*objW/20, 0).lt(i*objW/20, objH);
					}
					for (var i=1; i<20; i++) {
						g.mt(0, i*objH/20).lt(objW, i*objH/20);
					}
					grid.alpha = .3;

					g = grid2.graphics;
					g.s(color).ss(1);

					for (var i=1; i<10; i++) {
						g.mt(i*objW/10, 0).lt(i*objW/10, objH);
					}
					for (var i=1; i<10; i++) {
						g.mt(0, i*objH/10).lt(objW, i*objH/10);
					}
				}

				var crossSize = 80;
				g.s("#FFFFFF").ss(8);
				g.mt(objW/2, objH/2-crossSize/2).lt(objW/2, objH/2+crossSize/2);
				g.mt(objW/2-crossSize/2, objH/2).lt(objW/2+crossSize/2, objH/2);

				g.s("#000000").ss(4);
				g.mt(objW/2, objH/2-crossSize/2).lt(objW/2, objH/2+crossSize/2);
				g.mt(objW/2-crossSize/2, objH/2).lt(objW/2+crossSize/2, objH/2);

				// draw a border
				g.s(color).ss(3);
				g.dr(0,0,objW,objH);

				grid2.alpha = .5;
				cached.cache(0,0,objW,objH);

				that.addChild(top);
				that.addChild(left);

				stage.update();
			}

			Object.defineProperty(this, 'pixels', {
				get: function() {
					return !percent;
				},
				set: function(value) {
					percent = !value;
					that.resize();
				}
			});

			// add key listener to hide and show the grid
			window.addEventListener("keydown", keyEvent);

			function keyEvent(e) {
				if (!e) e=event;
				if (!stage) return;
				if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // G
					that.visible = !that.visible;
					stage.off("stagemousemove", stageEvent);
					if (that.visible) {
						stageEvent = stage.on("stagemousemove", where, that);
					}
					stage.update();
				}
				if (String.fromCharCode(e.keyCode) == pixelKey.toUpperCase()) { // P
					that.removeChild(cached);
					cached = null;
					that.pixels = !that.pixels;
				}
			}

			this.resize = function() {
				if (!that) return false;
				that.removeChild(cached);
				cached = null;
				if (stage) {
					drawGrid();
					where();
					setTimeout(function(){ // solve ipod bug
						that.removeChild(cached);
						cached = null;
						drawGrid();
					},200);
				}
				return true;
			}

			this.dispose = function() {
				clearInterval(addedInterval);
				that.removeAllChildren();
				window.removeEventListener("keydown", keyEvent);
				if (that.parent) that.parent.removeChild(that);
				that = null;
				return true;
			}

		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeGrid.prototype = new zim.Container();
		makeGrid.prototype.constructor = zim.Grid;
		return new makeGrid();
	}//-78


/*--
zim.GridManager = function()

GridManager
zim class - extends a zim.Manager

DESCRIPTION
Add Zim Grid objects to a GridManager object and update or remove all grids at once.
Grids are handy to use but perhaps annoying to update and remove if you have many.
GridManager keeps track of the grids and lets you update or dispose of them on command.

EXAMPLE
var manager = new zim.GridManager();
manager.add(new zim.Grid(stage));

// or with pixels
// manager.add(new zim.Grid(stage, null, false));

// then you can remove all grids with
// grid.dispose();
// handy with guides on multiple zim.Pages

// and in frame resize event we can resize all grids:
frame.on("resize", function() {manager.resize();})
END EXAMPLE

METHODS
add(grid) - registers a grid with the GridManager
resize() - resizes all the grids in the GridManager (ie. if stage changes)
dispose() - disposes all grids and the GridManager

NOTE: to just hide grids, you use the G key
and to toggle percent and pixels use the P key
you can dispose grids individually or use this class to dispose all
disposing will remove the G key listener and the grid

PROPERTIES
items - an array of all Grid objects added with add()
--*///+79
	zim.GridManager = function() {
		z_d("79");
		zim.Manager.call(this, "GridManager");
	}
	zim.GridManager.prototype = new zim.Manager();
	zim.GridManager.prototype.constructor = zim.GridManager;
	//-79

/*--
zim.Layout = function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)

Layout
zim class - extends a createjs.EventDispatcher

DESCRIPTION
Layout arranges objects on the page by fitting them in regions.
Make a layout object for each page if desired
and even nest layout objects inside regions.
Fixed aspect ratio content is fit into regions.
Layout is good for flexive design where you anchor titles and navigation.
Layout handles any number of regions vertically or horizontally.
It is useful for full scale mode for different devices or browser window scale.
You need to run the resize() method to update the layout.
Put the all your layouts in zim.LayoutManager to scale all at once.

EXAMPLE
// these would be containers with your content
// make sure that bounds are set on containers
// you may want to hard code bounds for clarity
var header = new zim.Rectangle(500, 200, "blue");
var content = new zim.Rectangle(600, 500, "green");
var footer = new zim.Rectangle(500, 200, "blue");
stage.addChild(header, content, footer);

// make the Layout - more useful for FULL scale mode
var layout = new zim.Layout({
	holder:stage,
	regions:[
		{object:header, marginTop:10, maxWidth:80, minHeight:10, valign:"top"},
		{object:content, marginTop:5, maxWidth:90}, // note, middle gets no minHeight
		{object:footer, marginTop:5, maxWidth:80, height:10}
	],
	lastMargin:5
});

// add to LayoutManager to resize or dispose all layouts together
// disposing only removes keyboard events to show boundaries
var manager = new zim.LayoutManager();
manager.add(layout);

frame.on("resize", function() {
	manager.resize();
	stage.update();
});

stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
holder - object to hold layout (stage, container, etc) that must have bounds set
regions - an array of region objects with specific properties for each
	Example VERTICAL region objects - all dimensions are percents
		[{object:title, marginTop:10, maxWidth:80, minHeight:20, align:"left", valign:"top"},
		{object:content, marginTop:5, maxWidth:90}, // note, middle gets no minHeight
		{object:nav, marginTop:5, maxWidth:80, height:20, backgroundColor:"red"}]
	note: no minHeight for middle regions - but heights on any region
	align defaults to middle for the regions
	valign defaults to top and bottom for the top and bottom region and middle for the others
	backgroundColor applies a backing color to the region
	Example HORIZONTAL region objects
		[{object:col1, marginLeft:10, maxHeight:80, width:20, valign:"bottom"},
		{object:col2, marginLeft:5, maxHeight:90, align:"middle"}, // note, middle gets no minWidth
		{object:col3, marginLeft:5, maxHeight:80, minWidth:20, align:"left", valign:"top"}]
	align defaults to left and right for the outer regions and middle for the inside regions
	valign defaults to top for all the regions
lastMargin - (default 0) the margin at the bottom (vertical) or at the right (horizontal)
backgroundColor - (default null) background color for the whole holder
vertical - (default true) set to false for horizontal layout
regionShape - (default null) a zim or createjs Shape object to show bounds (gets added to holder)
	can toggle on and off with B key - but must pass in the Shape to use the B key
scalingTarget - (default holder) an object used as the bounds of the region scaling
	setting a scalingTarget will also set the bounds of the holder to the scalingTarget bounds
	it does not scale the holder - only scales the region objects inside
hideKey - (default B) is the hot key for hiding and showing the bounds

METHODS
resize() - resize based on new bounds of the holder (or scalingObject)
dispose() - removes the B key listener (otherwise, nothing to dispose)
addShape(shape) - adds a bounding shape dynamically
removeShape() - permanently removes the bounding shape
disable() - disables all the layout (shape and sizing)
enable() - enables all the layout (shape and sizing)
if you want to get rid of the objects then you need to do so in your app

PROPERTIES
regions - the regions object - if changed will have to call resize() manually

DESCRIPTION OF FLEXIVE DESIGN
here described with vertical layout - horizontal is similar but rotated 90
the content in the middle will try and expand against the top and bottom
until it forces the top and bottom to their minimum percents
if the content hits its maximum width percent first then the top and bottom
will fill up the rest of the height until they reach their maximum widths
--*///+80
	zim.Layout = function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey) {

		var sig = "holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey";
		var duo; if (duo = zob(zim.Layout, arguments, sig)) return duo;
		z_d("80");
		function makeLayout() {
			if (zot(holder) || !holder.getBounds) {zog ("zim pages - Layout(): please provide an object with bounds set that holds the objects being laid out"); return;}
			scalingObject = (zot(scalingObject)) ? holder : scalingObject;
			if (!scalingObject.getBounds || !scalingObject.getBounds()) {zog ("zim pages - Layout(): holder must have bounds set or provide a scalingObject with bounds"); return;}
			var bounds = scalingObject.getBounds();
			holder.setBounds(0,0,bounds.width,bounds.height);
			// note, Layout sets bounds of holder but does not scale the holder - only the objects in regions
			// it may be that the holder is scaled by some external process
			// but probably not if a scalingObject is used

			if (zot(lastMargin)) lastMargin = 0;
			if (zot(vertical)) vertical = true;
			if (zot(backgroundColor)) backgroundColor = "";
			if (zot(hideKey)) hideKey = "B";
			zim.dashedLinesOn(); // turns on dashed lines for bounds
			var backing = new createjs.Shape(); // holds any backing colors
			var that = this;
			this.active = true;

			// loop through region objects and assign defaults
			// also check that regions can fit with values given
			// we basically do the same thing with horizontal and vertical layouts
			// but obviously one uses widths and the other heights, etc.
			// so adapted generic phrases of PRIMARY and SECONDARY
			// primary for vertical is in the Y direction and uses height and top
			// primary for horizontal is in the X direction and uses width and left
			// secondary for vertical is X and for horizontal is Y
			// min, absolute and margin values are only available in the primary
			// max values are only available in the secondary
			// align, valign and backgroundcolor is available for primary and secondary
			// absolute values (height, width) are to be used if given
			// if not given we try to maximize size and to adhere to min values
			// as calculations progress we calculate given, maxGiven and marginGiven values
			// these are temporary depending on the resizing and are always in the primary direction
			// secondary direction is quite simple
			// primary direction is quite complex involving a number of steps and even some recursion

			this.regions = regions; // expose the regions object for dynamic adjustments then manual resize

			var r; // used to hold a region in a loop
			var totalAbsolute = 0;
			var minPrimary = "minWidth";
			var primary = "width";
			var secondary = "height";
			var marginPrimary = "marginLeft";
			var maxSecondary = "maxHeight";
			var axisPrimary = "x";
			var axisSecondary = "y";
			if (vertical) {
				minPrimary = "minHeight";
				primary = "height";
				secondary = "width";
				marginPrimary = "marginTop";
				maxSecondary = "maxWidth";
				axisPrimary = "y";
				axisSecondary = "x";
			}
			for (var i=0; i<regions.length; i++) {
				r = regions[i];
				if (!r.object || !r.object.getBounds()) {zog("zim pages - Layout(): each region object must have an object with setBounds() set"); return;}
				if (!r[minPrimary]) r[minPrimary] = 0;
				if (!r[primary]) r[primary] = 0;
				if (!r.backgroundColor) r.backgroundColor = "";
				r.given = 0;
				r.maxGiven = 0;
				if (!r[marginPrimary]) r[marginPrimary] = 0;
				if (!r[maxSecondary]) r[maxSecondary] = 100;
				if (vertical) {
					// default alignment differs for orientation
					if (!r.align) r.align = "middle";
					if (!r.valign) {
						if (i==0) {r.valign = "top";}
						else if (i==regions.length-1) {r.valign = "bottom";}
						else {r.valign = "middle";}
						if (regions.length == 1) {r.valign = "middle"}
					}
				} else {
					if (!r.valign) r.valign = "top";
					if (!r.align) {
						if (i==0) {r.align = "left";}
						else if (i==regions.length-1) {r.align = "right";}
						else {r.align = "middle";}
						if (regions.length == 1) {r.align = "middle"}
					}
				}
				if (r[primary]) r[minPrimary] = 0; // primary overrides minPrimary
				totalAbsolute += r[primary] + r[marginPrimary];
			}

			// primaries (not minPrimaries) are absolute percentage and are kept no matter what
			// margins are absolute percentage and are kept no matter what
			// check if primaries and margins are more than 100%
			totalAbsolute += lastMargin;
			if (totalAbsolute > 100) {zog("zim pages - Layout(): cannot fit regions into 100% bounds"); return;}
			var leftOverPrimary = 100-totalAbsolute;

			distribute(); // also called from within resize function
			function distribute() {
				// distribute leftOverPrimary to any regions without a primary or a given (primary)
				// proportion based on primary dimension of objects in regions
				// apply this primary to given (primary)
				var totalPrimaries = 0;
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					r.given = 0;
					if (r[primary] == 0) totalPrimaries += r.object.getBounds()[primary];
				}
				// now we know total raw heights of objects needing height applied
				// loop back through and give these objects their proportion of what is left
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					if (r[primary] == 0) r.given = r.object.getBounds()[primary] / totalPrimaries * leftOverPrimary;
				}
			}

			this.resize = function() {
				if (!that.active) return;
				bounds = scalingObject.getBounds();
				holder.setBounds(0,0,bounds.width,bounds.height);
				backing.graphics.clear();
				if (backgroundColor!="") backing.graphics.f(backgroundColor).r(0,0,bounds.width,bounds.height);

				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					r.maxGiven = 0;
					r.marginGiven = 0;
				}
				// all the primaries are applied
				// but some objects might not need the primary because they have maxed out on maxSecondary
				// we need to give this extra primary back to the pool
				// and keep doing it until there are no more maxed objects

				var keepGoing = true; var allCheck; var giveBack;
				var p; var s; var boundsP; var boundsS; var maxGiven;
				var leftOverPrimary2 = leftOverPrimary;
				while (keepGoing) {
					// check for objects maxed in width
					giveBack = 0;
					keepGoing = false; allCheck = true;
					// we want to keep going unless all objects are maxed
					// or none of the objects are maxed
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						if (r.given > 0 && r.maxGiven == 0) {
							p = r.object.getBounds()[primary];
							s = r.object.getBounds()[secondary];
							boundsP =  r.given * bounds[primary]/100;
							boundsS =  r[maxSecondary] * bounds[secondary]/100; // convert to pixels
							maxGiven = s/p*boundsP;
							if (maxGiven > boundsS) {
								// maxed out so give back height
								keepGoing=true;
								// store this as maxGiven property
								// might have to take it away if later minHeights are not met
								r.maxGiven = p/s*boundsS * 100/bounds[primary]; // convert back to percentage
								giveBack += r.given - r.maxGiven;
								leftOverPrimary2 -= r.maxGiven;
							} else {
								allCheck = false;
							}
						}
					}

					if (!keepGoing) break;
					if (allCheck) break;

					// redistribute the extra stuff too all that are not maxed out and not with primary values
					// proportion based on primary dimension of objects in regions
					// apply this primary to given (primary)
					totalPrimaries = 0;
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						if (r[primary] == 0 && r.maxGiven == 0) totalPrimaries += r.object.getBounds()[primary];
					}
					// now we know total raw heights of objects needing height applied
					// loop back through and give these objects their proportion of what is left
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						if (r[primary] == 0 && r.maxGiven == 0) r.given = r.object.getBounds()[primary] / totalPrimaries * leftOverPrimary2;
					}
				}

				// if end regions have not met their minPrimaries
				// set those minPrimaries to primaries and resize again
				// divide leftover primary to regions with no set primary
				// maximize middle regions as this is usually content
				// if the edge regions have minPrimaries set them to minPrimary
				// if they do not have minPrimaries then proportion them equally with the rest

				var scaleCheck = true;
				r = regions[0];
				if (r.maxGiven > 0) {
					 if (r.maxGiven < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				} else if (r.given > 0) {
					 if (r.given < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				}
				r = regions[regions.length-1];
				if (r.maxGiven > 0) {
					 if (r.maxGiven < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				} else if (r.given > 0) {
					 if (r.given < r[minPrimary]) {r[primary] = r[minPrimary]; scaleCheck = false;}
				}
				if (!scaleCheck) {
					// recalculate leftOverPrimary
					totalAbsolute = 0;
					for (var i=0; i<regions.length; i++) {
						r = regions[i];
						totalAbsolute += r[primary] + r[marginPrimary];
					}
					totalAbsolute += lastMargin;
					if (totalAbsolute > 100) {zog("zim build - Layout(): cannot fit regions into 100% bounds"); return;}

					leftOverPrimary = 100-totalAbsolute;
					distribute();
					that.resize();
					return;
				}

				// if specified all primaries or all maxed in secondary
				// then distribute based on inner margins
				// watch out - may need to revert to original margins if page is resized
				// so introduce a new marginGiven property

				var allHeights = true; var marginTotal = 0; var primaryTotal = 0;
				for (var i=0; i<regions.length; i++) {
					r = regions[i];
					marginTotal += r[marginPrimary];
					if (r[primary] > 0) primaryTotal += r[primary];
					else if (r.maxGiven > 0) primaryTotal += r.maxGiven;
					else if (r.given > 0) primaryTotal += r.given;
					if (r[primary] == 0) {
						allHeights = false;
					}
				}
				if (allHeights || allCheck) {
					marginTotal += lastMargin;
					var extra = 100-primaryTotal-marginTotal;
					// remove two outer margins
					marginTotal -= (lastMargin + regions[0][marginPrimary]);
					if (extra != 0 && marginTotal != 0) { // divide up extra margin space
						for (var i=0; i<regions.length; i++) {
							if (i==0) continue;
							r = regions[i];
							r.marginGiven = r[marginPrimary]/marginTotal*(marginTotal+extra);
						}
					}
				}

				// ready to fit objects into regions, align and draw any bounds and background colors
				var pPos=0; // primary position (x for horizontal, y for vertical)
				var sPos=0; // secondary position
				var p;  	// primary dimension (width for horizontal, height for vertical)
				var s;		// secondary dimension
				var f; 		// fit variable will receive a handy object with new data and original region bounds data
							// {x:obj.x, y:obj.y, width:newW, height:newH, scale:scale, bX:left, bY:top, bWidth:width, bHeight:height}

				var addedW; var addedH;	// just a little offscreen coloring to help page transitions
				if (regionShape && regionShape.graphics) {
					var g = regionShape.graphics;
					g.c();
				}
				for (var i=0; i<regions.length; i++) {
					r = regions[i];

					// calculate primary data
					if (r.marginGiven > 0) pPos += r.marginGiven * bounds[primary]/100; // convert to pixels
					else pPos += r[marginPrimary] * bounds[primary]/100;
					if (r[primary] > 0) {p = r[primary];}
					else if (r.maxGiven > 0) {p = r.maxGiven;}
					else if (r.given > 0) {p = r.given;}
					else {p = 0;}
					p = p * bounds[primary]/100;

					// calculate secondary data
					s = r[maxSecondary] * bounds[secondary]/100;
					sPos = (bounds[secondary]-s)/2;

					// fit the objects into the region, align and draw any regionShape
					// this is slightly different for different orientations
					if (vertical) f = zim.fit(r.object,sPos,pPos,s,p);
					else f = zim.fit(r.object,pPos,sPos,p,s);

					// handle alignment
					if (r.valign == "top") r.object.y = f.bY;
					else if (r.valign == "bottom") r.object.y = f.bY+f.bHeight-f.height;
					if (r.align == "left") r.object.x = f.bX;
					else if (r.align == "right") r.object.x = f.bX+f.bWidth-f.width;
					if (regionShape && regionShape.graphics) {
						g.s("white").ss(2).r(f.bX,f.bY,f.bWidth,f.bHeight);
						g.s("#ff8203").ss(2).drawDashedRect(f.bX,f.bY,f.bWidth,f.bHeight,20);
					}

					// draw any backing colors for region
					// transitions in ZIM Pages need a little extra overlap on page edges
					addedH = addedW = 0;
					if (pPos == 0 || (pPos+p) == bounds[primary]) if (vertical) {addedH=1} else {addedW=1};
					if (s == bounds[secondary]) if (vertical) {addedW=1} else {addedH=1};
					if (r.backgroundColor != "") backing.graphics.f(r.backgroundColor).r(f.bX, f.bY, f.bWidth+addedW, f.bHeight+addedH);

					// increase our primary position
					pPos += p;
				}
			}

			this.resize();

			// add regionShape if there is one and backing shape
			if (regionShape) holder.addChild(regionShape);
			holder.addChildAt(backing,0);

			// key listener and other methods:

			// add key listener to hide and show the bounds
			window.addEventListener("keydown", keyEvent);
			function keyEvent(e) {
				if (!e) e=event;

				if (regionShape) {
					if (String.fromCharCode(e.keyCode) == hideKey.toUpperCase()) { // B
						regionShape.visible = !regionShape.visible;
						if (regionShape.getStage()) regionShape.getStage().update();
					}
				}
			}

			this.disable = function() {
				that.active = false;
				window.removeEventListener("keydown", keyEvent);
				if (regionShape) regionShape.alpha = 0;
			}

			this.enable = function() {
				that.active = true;
				window.addEventListener("keydown", keyEvent);
				that.resize();
				if (regionShape) regionShape.alpha = 1;
			}

			this.removeShape = function() { // use for final app
				if (regionShape) {
					regionShape.graphics.clear();
					holder.removeChild(regionShape);
					regionShape = null;
					regionShape = false;
				}
				window.removeEventListener("keydown", keyEvent);
			}

			this.addShape = function(shape, target) {
				that.removeShape();
				regionShape = shape;
				window.addEventListener("keydown", keyEvent);
				holder.addChild(regionShape);
				that.resize();
			}

			this.dispose = function() {
				// does not really dispose in case a resize is needed
				// it has no events aside from the keydown
				// which gets removed when we removeShape below
				that.removeShape();
				return true;
			}
		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeLayout.prototype = new createjs.EventDispatcher();
		makeLayout.prototype.constructor = zim.Layout;
		return new makeLayout();
	}//-80

/*--
zim.LayoutManager = function()

LayoutManager
zim class

DESCRIPTION
Add Zim Layout objects to a LayoutManager object and update them all at once.
You can remove all layout region bound shapes at once
as well as remove the B key to show the region bound shapes.
For a final project, call the dispose().
This will remove all shapes and key events.
The layouts will remain in place to handle multiple screen sizes.

EXAMPLE
// these would be containers with your content
// make sure that bounds are set on containers
// you may want to hard code bounds for clarity
var header = new zim.Rectangle(500, 200, "blue");
var content = new zim.Rectangle(600, 500, "green");
var footer = new zim.Rectangle(500, 200, "blue");
stage.addChild(header, content, footer);

// make the Layout - more useful for FULL scale mode
var layout = new zim.Layout({
	holder:stage,
	regions:[
		{object:header, marginTop:10, maxWidth:80, minHeight:10, valign:"top"},
		{object:content, marginTop:5, maxWidth:90}, // note, middle gets no minHeight
		{object:footer, marginTop:5, maxWidth:80, height:10}
	],
	lastMargin:5
});

// add to LayoutManager to resize or dispose all layouts together
// disposing only removes keyboard events to show boundaries
var manager = new zim.LayoutManager();
manager.add(layout);

frame.on("resize", function() {
	manager.resize();
	stage.update();
});

stage.update();
END EXAMPLE

METHODS
add(layout) - registers a layout with the LayoutManager
resize() - resizes all the layouts in the LayoutManager
disable() - disables all the layouts in the LayoutManager (shapes and sizing)
enable() - enables all the layouts in the LayoutManager (shapes and sizing)
dispose() - only removes bounds shapes and keyboard events (does not really dispose)

NOTE: to just hide bounds, you use the B key

PROPERTIES
items - an array of all Layout objects added with add()
--*///+81
	zim.LayoutManager = function() {
		z_d("81");
		var that = this;
		this.items = [];
		this.add = function(layout) {
			that.items.push(layout);
		}
		this.resize = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].resize();
			}
		}
		this.disable = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].disable();
			}
		}
		this.enable = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].enable();
			}
		}

		this.dispose = function() {
			for (var i=0; i<that.items.length; i++) {
				that.items[i].removeShape(); // also removes key events
			}
			return true;
		}
	}//-81

/*--
zim.Parallax = function(stage, damp, layers, auto)

Parallax
zim class

DESCRIPTION
Takes objects as layers and sets properties based on an input,
for instance, each layer could move a different x based on position of mouseX
or each layer could scale a different amount based on scroll of y.
The types of input are mouseX, mouseY, scrollX, scrollY or custom.
The types of properties to change could be x, y, scaleX, scaleY, rotation, alpha, frameNumber, etc.
Parallax allows scale to be a property which scales scaleX and scaleY together.
Parallax allows frame to be a property and calls gotoAndStop() on a Sprite frame.
Parallax really just manages multiple ProportionDamp objects.
For proper parallax, the objects closer move more than the objects farther back.

EXAMPLE
// make assets to move around
// these could be pictures, shapes, containers, etc.
var backing = new zim.Rectangle(800, 200, "yellow");
backing.center(stage);
var mid = new zim.Rectangle(400, 200, "green");
mid.center(stage).y += 20;
var front = new zim.Circle(60, "red");
front.center(stage).y += 80;

// make Parallax object - here we move with stage mouseX and mouseY
var parallax = new zim.Parallax(stage, .1, [
	{obj:backing, prop:"x", propChange:50}, {obj:backing, prop:"y", propChange:40, input:"mouseY"},
	{obj:mid, prop:"x", propChange:100}, {obj:mid, prop:"y", propChange:80, input:"mouseY"},
	{obj:front, prop:"x", propChange:150}, {obj:front, prop:"y", propChange:100, input:"mouseY"}
]);

stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
stage - the stage
damp - (default .1) the damp value with 1 being no damping and 0 being no movement
layers - (default null) an array of layer objects, the format as below
	Example: to move an obj 200 px in the x as the window scrolls from 100 to 300 px in the y
		[{obj:obj, prop:"x", propChange:200, input:"scrolly", inMin:100, inMax:300, factor:1, integer:false}, etc.]
	obj - the object whose property is being changed
	prop - the property that is being changed
	propChange - how much you want the property to change
	input - (default mouseX) but can also be mouseY, scrollX, scrollY
	inMin - (default 0) minimum input range
	inMax - (default stageW (for x prop) stageH (for y prop)) maximum input range
	factor - (default 1) set factor to -1 to change in the opposite direction
	integer - (default false) set to true to round the value to an integer
	Example 2: a traditional mouse move parallax for one object
		[{obj:obj, prop:"x", propChange:100}, {obj:obj, prop:"y", propChange:50, input:"mouseY"}, etc.]
	you would probably have more objects to follow
	or you can add these one at a time with the p.addLayer({layer object properties});
auto - (default true) uses the specified input
	if auto is set to false, you must make your own Ticker and use the step(input) method
NOTE: ticker and fps parameters have been removed - see zim.Ticker to set

METHODS
addLayer({layer object properties}) - adds a layer
removeLayer(index) - removes a layer based on order added
step(input) - used when auto is false to send in custom input data
immediate([]) - immediately sets the target value for each layer object (no damping)
dispose() - removes listeners

PROPERTIES
damp - allows you to dynamically change the damping
--*///+68
	zim.Parallax = function(stage, damp, layers, auto) {

		var sig = "stage, damp, layers, auto";
		var duo; if (duo = zob(zim.Parallax, arguments, sig, this)) return duo;
		z_d("68");
		if (zot(stage) || !stage.getBounds) {zog("zim build - Parallax(): please pass in the stage with bounds as first parameter"); return;}
		if (!stage.getBounds()) {zog("zim build - Parallax(): Please give the stage bounds using setBounds()");	return;}
		if (zot(auto)) auto = true;

		var stageW = stage.getBounds().width;
		var stageH = stage.getBounds().height;

		var that = this;

		// public properties
		this.damp = (zot(damp)) ? .1 : damp;

		// public methods (do not get hoisted so define early)
		// addLayer works as a public method
		// and also is called from the object in case we add layers via the Parallax object parameters
		// the function prepares ProportionDamp objects for two values
		// and stores them on the layer object
		// and also stores the desired amounts on the layer objects themselves
		// finally, the layer object is added to the myLayers private property
		// the timer then loops through these layers and handles things from there
		// obj, distanceX, distanceY, minX, minY, maxX, maxY, factor, targetRound
		this.addLayer = function(layer) {
			//{obj, prop, propChange, input, inMin, inMax, factor, integer}
			if (zot(layer.obj) || zot(layer.prop) || zot(layer.propChange)) return;
			var obj = {obj:layer.obj, prop:layer.prop};
			obj[obj.prop] = layer.propChange;
			if (zot(layer.input)) layer.input = "mouseX";
			obj.input = layer.input;

			var inMin = (zot(layer.inMin)) ? 0 : layer.inMin;
			var inMax = (zot(layer.inMax)) ? stageW : layer.inMax;
			var factor = (zot(layer.factor)) ? 1 : layer.factor;
			var integer = (zot(layer.integer)) ? false : layer.integer;

			// baseMin, baseMax, targetMin, targetMax, damp, factor, targetRound
			obj["p_"+obj.prop] = new zim.ProportionDamp(inMin, inMax, 0, obj[obj.prop], that.damp, factor, integer);
			if (obj.prop == "scale") {
				obj["s_"+obj.prop] = obj.obj.scaleX; // helper to allow scale to be property
			} else if (obj.prop == "frame") {
				obj["s_"+obj.prop] = obj.obj.currentFrame;
			} else {
				obj["s_"+obj.prop] = obj.obj[obj.prop]; // obj.s_x = obj.obj.x for example
			}
			myLayers.push(obj);
			return myLayers.length-1;
		}

		this.removeLayer = function(index) {
			if (zot(index)) return;
			var layer = myLayers[index];
			layer["p_"+layer.prop].dispose();
			myLayers.splice(index,1);
		}

		this.immediate = function(array) {
			var o;
			for (var i=0; i<myLayers.length; i++) {
				o = myLayers[i];
				o["p_"+o.prop].immediate(array[i]);
			}
		}

		this.dispose = function() {
			myLayers = null;
			if (auto) zim.Ticker.remove(zimTicker);
			return true;
		}

		// private properties
		// here are any layers that come in from Parallax object parameters
		layers = (zot(layers)) ? [] : layers;

		// we now are going to process these layers with the public addLayer method
		// this will add the processed layers to the private property, myLayers
		var myLayers = [];
		for (var i=0; i<layers.length; i++) {
			this.addLayer(layers[i]);
		}

		if (auto) {
			var zimTicker = zim.Ticker.add(animate, stage);
		}

		// loop though our layers and apply the converted proportion damping
		function animate(e) {
			that.step();
		}

		this.step = function(custom) {
			var o; var input;
			for (var i=0; i<myLayers.length; i++) {
				o = myLayers[i];
				if (zot(custom)) {
					if (o.input == "mouseX") input = stage.mouseX;
					else if (o.input == "mouseY") input = stage.mouseY;
					else if (o.input == "scrollX") input = zim.scrollX();
					else if (o.input == "scrollY") input = zim.scrollY();
				} else {
					input = custom;
				}
				// damp object at property to start value + converted goal based on input
				if (o.prop == "scale") {
					o.obj.scaleX = o.obj.scaleY = o["s_"+o.prop] + o["p_"+o.prop].convert(input);
				} else if (o.prop == "frame") {
					o.obj.gotoAndStop(o["s_"+o.prop] + o["p_"+o.prop].convert(input));
				} else {
					o.obj[o.prop] = o["s_"+o.prop] + o["p_"+o.prop].convert(input);
					// for x on mouseX we split the destination range in two for a centered parallax
					if (o.input == "mouseX" && auto) o.obj[o.prop] -= o[o.prop] / 2;
				}
			}
		}
	}//-68


/*--
zim.Scroller = function(backing, speed, direction, horizontal)

Scroller
zim class

DESCRIPTION
Scroller animates a backing either horizontally or vertically (not both).
The Scroller object will create a clone of the backing
and animate and swap the backgrounds when needed.

EXAMPLE
var one = new zim.Rectangle(1200, 400, "red");
frame.makeCircles().center(one);
stage.addChild(one);

var scroller = new zim.Scroller(one);

stage.update();
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
background - an object to animate (make start and end edges match to be seemless)
speed - (default 1) how fast in pixels per second the animation is going
direction - (default 1) set to -1 for left or down
horizontal - (default true) set to false to animate vertically
	you can adjust the speed and direction properties dynamically
	you cannot adjust the backings and horizontal dynamically
	to change your animation, dispose() of the Scroller object and make a new one
	disposing just removes the ticker - you have to remove the backings
	NOTE: the gapFix and ticker parameters have been removed - see zim.Ticker

METHODS
dispose() - get rid of the event listeners - you need to remove the backings (see backing properties)

PROPERTIES
backing1 - the original backing passed in
backing2 - the cloned backing made from the original backing
speed - how fast the animation is going in pixels per frame
direction - either left or right if horizontal or up or down if not horizontal
--*///+69
	zim.Scroller = function(backing, speed, direction, horizontal) {
		var sig = "backing, speed, direction, horizontal";
		var duo; if (duo = zob(zim.Scroller, arguments, sig, this)) return duo;
		z_d("69");
		var b1 = this.backing1 = backing;
		if (zot(b1) || !b1.getBounds) return;
		var b2 = this.backing2 = backing.clone();
		b1.parent.addChild(b2);
		if (zot(horizontal)) horizontal = true;
		var that = this; // we keep animate protected but want to access public properties

		// here are the public properties that can be changed
		this.speed = (zot(speed)) ? 1 : speed;
		this.direction = (zot(direction)) ? 1 : direction;

		if (!b1.getBounds()) {
			zog("zim build - Scroller(): please setBounds() on backing objects");
			return;
		}
		if (!b1.getStage()) {
			zog("zim build - Scroller(): please add backing objects to stage to start");
			return;
		}

		var w = b1.getBounds().width;
		var h = b1.getBounds().height;

		var stageW;
		var stageH;

		if (horizontal) {
			b2.x = w;
		} else {
			b2.y = h;
		}

		var zimTicker = zim.Ticker.add(animate, b1.getStage());

		function animate(e) {
			if (!b1.getStage()) return;
			if (!b1.getStage().getBounds()) {zog("zim build - Scroller(): please setBounds() on stage"); return;}
			if (!stageW) {
				stageW = b1.getStage().getBounds().width;
				stageH = b1.getStage().getBounds().height;
			}
			// pausing the ticker does not really pause the ticker (weird)
			if (that.speed == 0 || that.direction == 0) {return;}

			if (horizontal) {
				b1.x -= that.speed*that.direction;
				if (b1.x < b2.x) {
					b2.x = b1.x + w;
				} else {
					b2.x = b1.x - w;
				}
				if (that.direction * that.speed > 0) {
					if (b2.x < 0 && b1.x < b2.x) {
						b1.x = w;
					} else if (b1.x < 0 && b2.x < b1.x) {
						b2.x = w;
					}
				} else {
					if (b2.x > stageW && b2.x > b1.x) {
						b2.x = b1.x - w;
					} else if (b1.x > stageW && b1.x > b2.x) {
						b1.x = b2.x - w;
					}
				}
			} else {
				b1.y -= that.speed*that.direction;
				if (b1.y < b2.y) {
					b2.y = b1.y + h;
				} else {
					b2.y = b1.y - h;
				}
				if (that.direction * that.speed > 0) {
					if (b2.y < 0 && b1.y < b2.y) {
						b1.y = h;
					} else if (b1.y < 0 && b2.y < b1.y) {
						b2.y = h;
					}
				} else {
					if (b2.y > stageH && b2.y > b1.y) {
						b2.y = b1.y - h;
					} else if (b1.y > stageH && b1.y > b2.y) {
						b1.y = b2.y - h;
					}
				}
			}
		}

		this.dispose = function() {
			if (zon) zog("bye from Scroller");
			zim.Ticker.remove(zimTicker);
			return true;
		}

	}//-69


////////////////  ZIM FRAME  //////////////

// zimframe.js provides code to help you set up your coding environment

	if (zon) zog("ZIM FRAME");

/*--
zim.Frame = function(scaling, width, height, color, rollover, touch, scrollTop, align, valign, canvasID)

Frame
zim class - extends a createjs EventDispatcher

DESCRIPTION
Frame creates a canvas and stage.
Frame lets you decide how you want your stage to scale.
It also provides events for ready, resizing and orientation change
as well as a way to remake the canvas if necessary.
Frame handles loading Bitmap and Sound assets by wrapping PreloadJS
see http://zimjs.com/code/frame.html for sample templates using Frame.

EXAMPLE
// HTML: style the canvas (see parameters for more info)
<style>
	#myCanvas {background-color:#CCC;}
</style>

// SCRIPT: create a zim.Frame
var frame = new zim.Frame("fit", 1024, 768);
frame.on("ready", function() {
	var stage = frame.stage;
	var stageW = frame.width;
	var stageH = frame.height;

	// code here - or optionally load assets

	frame.loadAssets("image.png");
	frame.on("complete", function() {

		// code here if waiting for assets
		var image = frame.asset("image.png");
		image.center(stage);
		stage.update();

	}); // end asset complete
}); // end of ready
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
scaling - (default "full") can have values as follows
	"fit"      sets canvas and stage to dimensions and scales to fit inside window size
	"outside"  sets canvas and stage to dimensions and scales to fit outside window size
	"full"     sets stage to window size with no scaling
	"tagID"    add canvas to HTML tag of ID - set to dimensions if provided - no scaling

FIT and OUTSIDE: width and height will set the stage width and height and the canvas is then scaled
this is handy because all your dimensions are set to start
FULL: width and height are ignored when scaling as these are set to the window width and height
TAG: if width and height are provided then the canvas and stage will be these dimensions
if width and height are not provided in tag mode, the canvas and stage will take the dimensions of the tag
this means, the tag must have some sort of width and height dimensions set or it will be really big!
NOTE: in tag mode, the tag must exist before running Frame - so use a window DOMContentLoaded event

color - (default null) the background color of the frame (any CSS value) - or just set in styles
rollover - (default true) activates rollovers
touch - (default true) activates touch on mobile
scrollTop - (default true) activates scrolling on older apple devices to hide the url bar
align - (default "center") for fit and outside, the horizontal alignment "left", "center/middle", "right"
valign - (default "center") for fit and outside, the vertical alignment "top", "center/middle", "bottom"
canvasID - (default "myCanvas") will be set to tagIDCanvas if a tagID is provided - eg. scaling=test, canvasID=testCanvas

PROPERTIES
stage - read only reference to the createjs stage - to change run remakeCanvas()
canvas - a reference to the frame's canvas tag
tag - the containing tag if scaling is set to an HTML tag id (else null)
width - read only reference to the stage width - to change run remakeCanvas()
height - read only reference to the stage height - to change run remakeCanvas()
scale - read only returns the scale of the canvas - will return 1 for full and tag scale modes
orientation - "vertical" or "horizontal" (updated live with orientation change)
zil - reference to zil events that stop canvas from shifting
colors: orange, green, pink, blue, brown, yellow, silver, tin, grey, lighter, light, dark, darker, purple

METHODS
loadAssets([file, file], path, xhr) - pass in an array of images or sounds, optional path to directory and XHR (default false)
asset(file) - access a loaded asset based on file string (not including path)
	if the asset is a sound then use asset(file).play();
	or can pass in a configuration object in play
	with the following properties (see CreateJS SoundJS docs)
	delay, offset, loop, volume, pan, startTime, interrupt and duration
	asset(file).play({volume:.5, pan:-1, loop:2});
	this returns createjs sound instance which can also be manipulated
	to stop the sound or set its volume dynamically, etc.
makeCircles(radius) - returns a createjs.Shape with the ZIM Circles (centered reg)
remakeCanvas(width, height) - removes old canvas and makes a new one and a new stage
	will have to set your local stage, stageW and stageH variables again
dispose() - removes canvas, resize listener and stage

EVENTS
"ready" - fired when the stage is made
"progress" - fires constantly as assets are loaded with loadAssets() to represent overall load progress
"assetload" - fired when an asset loaded with loadAssets() has loaded (use asset property of event object - with type and id properties)
"complete" - fired when all assets loaded with loadAssets() are loaded (then use frame.asset())
"error" - fired when there is a problem loading an asset with loadAssets()
"resize" - fired on resize of screen
"orientation" - fired on orientation change
--*///+83
	zim.Frame = function(scaling, width, height, color, rollover, touch, scrollTop, align, valign, canvasID) {

		var sig = "scaling, width, height, color, rollover, touch, scrollTop, align, valign, canvasID";
		var duo; if (duo = zob(zim.Frame, arguments, sig)) return duo;
		z_d("83");
		function makeFrame() {

			var mobile = zim.mobile();
			if (zot(scaling)) scaling = "full";
			if (zot(rollover)) rollover = !mobile;
			if (zot(touch)) touch = true;
			if (zot(scrollTop)) scrollTop = true;
			if (zot(align)) align = "center";
			if (zot(valign)) valign = "center";
			if (zot(canvasID)) canvasID = "myCanvas";

			// setting a scaling of something other than this list will set the scaling to tag mode
			// where the scaling parameter value is assumed to be the ID of an HTML tag to contain the Frame
			var types = ["fit","outside","full"];

			this.scale = 1;
			this.x = 0;
			this.y = 0;

			var that = this;
			var stage;
			var stageW = width;
			var stageH = height;
			var largest; // automatically set
			var appOrientation; // watch out - orientation keyword is used by apple - sigh
			var lastOrientation; // used to detect orientation change
			var appReady = false; // check variable (watch - "ready" is reserved)
			var tagID;
			var tag;

			var initCheck = false;
			if (document.readyState === 'interactive' || document.readyState === 'complete' ) { // DOM has loaded
				setTimeout(function() {init();}, 200); // can't dispatch directly from a constructor
			} else {
				document.addEventListener('DOMContentLoaded', function() {
					if (mobile) {
						setTimeout(function() {init();}, 1500); // to catch delayed screen sizes
					} else {
						init();
					}
				});
			}

			window.addEventListener('resize', function() {
				sizeCanvas();
				dispatchResize();
				if (mobile) setTimeout(function() {sizeCanvas();}, 250);
				if (mobile) setTimeout(function() {sizeCanvas(); dispatchResize();}, 500); // to catch delayed screen sizes
			});

			function init() {
				if (initCheck) return;
				initCheck = true;
				if (types.indexOf(scaling) == -1) {
					tagID = scaling;
					if (zot(zid(tagID))) {zog("zim.Frame - scaling: HTML tag with id="+scaling+" must exist"); return;};
					tag = this.tag = zid(tagID);
					scaling = (zot(width) || zot(height)) ? "tag" : "inline"; // tag with no dimensions or dimensions
					if (canvasID == "myCanvas") canvasID = tagID + "Canvas";
				}

				// now assign default width and height (ignored by full and tag)
				if (zot(width)) width = 500;
				if (zot(height)) height = 500;

				makeCanvas();
				makeStage();

				// for older mobile - pan hides the location bar
				if (mobile && scrollTop) {setTimeout(function() {window.scrollTo(0, 0);}, 100);}

				that.dispatchEvent("ready");
				appReady = true;
				dispatchResize();
				if (mobile) setTimeout(function() {sizeCanvas();}, 250);
				if (mobile) setTimeout(function() {sizeCanvas(); dispatchResize();}, 500); // to catch delayed screen sizes
			}

			function makeCanvas() {
				// note the width and height of a canvas
				// are separate from from the width and height styles
				// so beware of unintentionally stretching the canvas with styles

				var canvas = that.canvas = document.createElement("canvas");
				canvas.setAttribute("id", canvasID);
				largest = Math.max(window.innerWidth, screen.width, window.innerHeight, screen.height);
				// does not work on iOS6 in full screen if loading from icon unless keep canvas at device size
				// thank you apple for this and many other days of hell

				if (mobile != "ios") largest *= 3;
				if (scaling == "full" || scaling == "tag") {
					canvas.setAttribute("width", largest);
					canvas.setAttribute("height", largest);
				} else {
					canvas.setAttribute("width", stageW);
					canvas.setAttribute("height", stageH);
				}
				if (scaling == "tag" || scaling  == "inline") {
					tag.appendChild(canvas);
				} else {
					document.body.appendChild(canvas);
				}
				if (!zot(color)) canvas.style.backgroundColor = color;
			}

			function makeStage() {
				sizeCanvas();
				if (types.indexOf(scaling) != -1) {that.zil = zil();} // keep canvas still (from arrows, scrollwheel, etc.)
				stage = new createjs.Stage(canvasID);
				stage.setBounds(0, 0, stageW, stageH);
				if (rollover) stage.enableMouseOver(10); // if you need mouse rollover
				if (touch) createjs.Touch.enable(stage,true); // added for mobile
			}

			function sizeCanvas() {
				var can = zid(canvasID);
				var w = zim.windowWidth();
				var h = zim.windowHeight();
				var newW; var newH;
				appOrientation = that.orientation = (w > h) ? "horizontal" : "vertical";
				if (appOrientation != lastOrientation) { // new orientation
					lastOrientation = appOrientation;
					that.dispatchEvent("orientation");
				}
				if (!can) return;

				if (scaling == "fit") {
					// scales canvas to fit dimensions inside screen
					that.scale = (w/h >= stageW/stageH) ? h/stageH : w/stageW;
					newH = stageH * that.scale;
					newW = stageW * that.scale;
				} else if (scaling == "outside") {
					// scales canvas so screen inside dimensions
					document.body.style.overflow = "hidden";
					that.scale = (w/h >= stageW/stageH) ? w/stageW : h/stageH;
					newH = stageH * that.scale;
					newW = stageW * that.scale;
				} else if (scaling == "full") {
					// does not scale canvas but sets width and height to screen
					document.body.style.overflow = "hidden";
					can.style.left = can.style.top = "0px";
					stageW = w;
					stageH = h;
					if (stage) stage.setBounds(0,0,stageW,stageH); // need this
					return;
				} else if (scaling == "tag") {
					// does not scale canvas but sets width and height to tag
					stageW = tag.offsetWidth;
					stageH = tag.offsetHeight;
					if (stage) stage.setBounds(0,0,stageW,stageH); // need this
					tag.style.overflow = "hidden";
					can.style.left = can.style.top = "0px";
					return;
				} else if (scaling == "inline") {
					// does not scale canvas but sets width and height
					if (stage) stage.setBounds(0,0,stageW,stageH); // need this
					can.style.left = can.style.top = "0px";
					return;
				}

				// scaling and positioning for fit and full
				can.style.width = newW + "px";
				can.style.height = newH + "px";
				if (align=="left") frame.x = 0;
				else if (align=="right") frame.x = (w-newW);
				else frame.x = ((w-newW)/2);
				if (valign=="top") frame.y = 0;
				else if (valign=="bottom") frame.y = (h-newH);
				else frame.y = ((h-newH)/2);
				can.style.left = frame.x + "px";
				can.style.top = frame.y + "px";
			}

			function dispatchResize() {
				if (!appReady) return;
				that.dispatchEvent("resize");
			}

			// ASSETS

			this.assets = {}; // store asset Bitmap or play function for sound
			this.loadAssets = function(arr, path, xhr) {
				if (zot(arr)) return;
				if (zot(xhr)) xhr = false;
				if (!Array.isArray(arr)) arr = [arr];
				var soundCheck = false;
				var manifest = [];
				var a; var ext; var i; var j;
				var re = /\.([^.]+)$/i; // get extension
				for (i=0; i<arr.length; i++) {
					a = arr[i];
					ext = a.match(re);
					if (createjs.Sound.SUPPORTED_EXTENSIONS.indexOf(ext[1]) >= 0) soundCheck = true;
					manifest.push({src:a});
				}
				that.preload = new createjs.LoadQueue(xhr, path);
				if (soundCheck) that.preload.installPlugin(createjs.Sound);
				that.preload.on("progress", function(e) {that.dispatchEvent(e);});
				that.preload.on("error", function(e) {that.dispatchEvent(e);});
				that.preload.on("fileload", function(e) {
					var item = e.item;
					var ext = item.id.match(re);
					var asset;
					if (createjs.Sound.SUPPORTED_EXTENSIONS.indexOf(ext[1]) >= 0) {
						asset = that.assets[item.id] = {
                            type:"sound",
                            id:item.id,
                            play:function(added){
                                var instance = createjs.Sound.play(item.id, added);
                                instance.getStage = function(){return stage;}
                                return instance;
                            }
                        };
					} else {
						asset = that.assets[item.id] = new zim.Bitmap(e.result, item.id);
					}
					var ev = new createjs.Event("assetload");
					ev.item = item; // createjs preload item
					ev.asset = asset;
					that.dispatchEvent(ev);
				});
				that.preloadEvent = that.preload.on("complete", function(e) {that.dispatchEvent(e);});
				that.preload.loadManifest(manifest);
			}

			this.asset = function(n) {
				if (zot(n)) return;
				return that.assets[n] || {play:function(){if (zon) {zog("zim.Frame - asset(sound) not found"); return {};}}};
			}

			Object.defineProperty(that, 'stage', {
				get: function() {
					return stage;
				},
				set: function(s) {
					zog("zim.Frame(): stage is read only - see remakeCanvas(), perhaps");
				}
			});

			Object.defineProperty(that, 'stageW', { // depreciated (use width)
				get: function() {
					return stageW;
				},
				set: function(w) {
					zog("zim.Frame(): stageW is read only - see remakeCanvas(), perhaps");
				}
			});

			Object.defineProperty(that, 'stageH', { // depreciated (use height)
				get: function() {
					return stageH;
				},
				set: function(h) {
					zog("zim.Frame(): stageH is read only - see remakeCanvas(), perhaps");
				}
			});
			Object.defineProperty(that, 'width', {
				get: function() {
					return stageW;
				},
				set: function(w) {
					zog("zim.Frame(): width is read only - see remakeCanvas(), perhaps");
				}
			});

			Object.defineProperty(that, 'height', {
				get: function() {
					return stageH;
				},
				set: function(h) {
					zog("zim.Frame(): height is read only - see remakeCanvas(), perhaps");
				}
			});

			this.remakeCanvas = function(width, height) {
				if (scaling == "full") return;
				if (zot(width)) width = stageW;
				if (zot(height)) height = stageH;
				if (zid(canvasID)) zid(canvasID).parentNode.removeChild(zid(canvasID));
				stageW = width;
				stageH = height;
				makeCanvas();
				makeStage();
			}

			this.dispose = function() {
				window.removeEventListener('resize', sizeCanvas);
				stage.removeAllChildren();
				stage.removeAllEventListeners();
				if (zid(canvasID)) zid(canvasID).parentNode.removeChild(zid(canvasID));
				stage = null;
				that = null;
				return true;
			}

			// zim colors
			this.orange		= this.wrap 	= "#f58e25";
			this.green  	= this.code 	= "#acd241";
			this.pink  		= this.create 	= "#e472c4";
			this.blue   	= this.build 	= "#50c4b7";
			this.brown  	= this.pages 	= "#d1a170";
			this.yellow  	= this.distill 	= "#ebcb35";
			this.silver		= this.frame 	= "#999999";
			this.tin		= this.examples	= "#777777";
			this.grey   	= this.cdn  	= "#555555";
			this.lighter 	= this.template = "#eeeeee";
			this.light 		= this.docs 	= "#cccccc";
			this.dark 		= this.bits 	= "#333333";
			this.darker 	= this.zim 		= "#111111";
			this.purple		= this.github 	= "#993399";

			this.makeCircles = function(radius) {
				if (zot(radius)) radius = 100;
				var colors = [that.wrap, that.code, that.create, that.build, that.pages, that.bits];
				var c = new zim.Shape();
				var g = c.graphics;
				c.radius = radius;
				for (var i=0; i<colors.length; i++) {
					g.f(colors[i]).dc(0,0,(c.radius/colors.length)*(colors.length-i));
				}
				c.setBounds(-c.radius,-c.radius,c.radius*2,c.radius*2);
				c.width = c.height = radius*2;
				return c;
			}

		}
		// note the actual class is wrapped in a function
		// because createjs might not have existed at load time
		makeFrame.prototype = new createjs.EventDispatcher();
		makeFrame.prototype.constructor = zim.Frame;
		return new makeFrame();
	}//-83


////////////////  ZIM META  //////////////

// the Meta section is for overall classes that operate on ZIM
// for instance zim.Distill and zim.Wonder

/*--
zim.DISTILL

distill
zim constant

DESCRIPTION
Distill allows you to track which functions you are using in your app
and create a custom minified js file with just those functions.
Set zim.DISTILL to true to record which functions your are using in your app -
default is false.  While running your app, call the zim.distill() function
take the results to http://zimjs.com/code/distill to create a minified distilled file.

EXAMPLE
// at the start of your code
zim.DISTILL = true;

// at the end of your code (once everything has run)
// this means we may have to wait for events to happen, etc.
zim.distill();

// this will log to the console a series of numbers
// separated by spaces representing the functions used

1 6 81 81 79 75 77 75 55 54 52 53 55 54 52 53 55 54 52
53 42 80 74 46 46 46 80 74 46 46 46 55 54 52 53 55 54
52 53 55 54 52 53 42 80 74

// copy these into the zim DISTILL form field
// to get the minified JavaScript for these functions
// NOTE: Distill will not duplicate the functions
// data duplication is left in for statistical purposes
END EXAMPLE
--*///+83.1
	zim.DISTILL = false;
	zim.distillery = [];
//-83.1

/*--
zim.distill = function()

distill
zim function

DESCRIPTION
Call the distill function to display which zim functions you are using in your app.
You must set zim.DISTILL constant to true before using (set at the start of your app).
After running through your app, call zim.distill() and see the console (F12).
Take the results to http://zimjs.com/code/distill to create a minified distilled js file.
You would then host this js file yourself or include it in your mobile files, etc.
NOTE: zim.distill() only records functions that have been used
so you may have functions still to be used in your app.
You will want to make sure you call distill() after you have used all your functions,
for instance, on a restart event, etc.
NOTE: zim.distill() will not be available from your distilled file.

EXAMPLE
// at the start of your code
zim.DISTILL = true;

// at the end of your code (once everything has run)
// this means we may have to wait for events to happen, etc.
zim.distill();

// this will log to the console a series of numbers
// separated by spaces representing the functions used

1 6 81 81 79 75 77 75 55 54 52 53 55 54 52 53 55 54 52
53 42 80 74 46 46 46 80 74 46 46 46 55 54 52 53 55 54
52 53 55 54 52 53 42 80 74

// copy these into the zim DISTILL form field
// to get the minified JavaScript for these functions
// NOTE: Distill will not duplicate the functions
// data duplication is left in for statistical purposes
END EXAMPLE
--*///+83.2
	zim.distill = function() {
		zog("zim.distill() - go to http://zimjs.com/code/distill and enter the following:");
		zog((zim.distillery.length>0)?zim.distillery.join(" "):"must set zim.DISTILL = true;");
	}//-83.2

	return zim;
} (zim || {});

// internal global function for the distill process
function z_d(n) {if (zim && zim.DISTILL) zim.distillery.push(n);}

// back into zim
var zim = function(zim) {

/*--
zim.Wonder = function(wid, client, app, notes, server)

Wonder
zim class

DESCRIPTION
Wonder sends counts, times, and orders to a server for user testing or statistical purposes.
Go to http://zimjs.com/code/wonder/ to get a Wonder ID (wid) and set up Wonder stats with ZIM
or make up your own wid and use your own server script to collect data.
See the zim Wonder site for a sample script to collect data.
NOTE: all records at ZIM are archived NEW YEARS DAY and kept for a year after that.
Service is provided as is and ZIM and Dan Zen are not responsible for lost data.

USAGE
count will count things like app loads, button clicks within an app, how many monsters they killed
time will tell you the time the user took to do something - like solve a puzzle, or locate the witch
order will record the order items were done - which section did they go to first, second, third, etc.

EXAMPLE
// make a Wonder object
// wonderID is e-mailed to you when you sign up
// client is your client's name that you provide
// app is the app for which you are recording data
// you can also pass an optional note
var wonder = new zim.Wonder("wonderID", "client", "app");

// COUNT EXAMPLE
// for this example we count times a button is pressed
var button = new zim.Button("CLICK");
button.center(stage);
button.on("click", function(){
	// records an entry for this keyword in your stats
	// along with date, time, session, etc.
	wonder.count("wow");
});

// TIME EXAMPLE
// assuming we have our Wonder object from above
// (you only need one Wonder object)
// start the timer counting for a keyword called "test"
// this will record nothing until you timeEnd()
// or you timeStart() again
// you can also timePause() and timeUnpause()
// see DOCS for more functionality and information
wonder.timeStart("test");

// add the circle
var circle = new zim.Circle(100, "red");
circle.center(stage);
circle.drag();
circle.on("pressup", function(){
	if (circle.hitTestRect(square)) {
		// if the shapes are hitting then end the timer
		// this will send data to your Wonder report
		wonder.timeEnd("test");
	}
});

// add the square to a random location on stage
var square = new zim.Rectangle(100, "yellow");
stage.addChild(square);
square.x = zim.rand(stageW-square.width);
square.y = zim.rand(stageH-square.height);

// ORDER EXAMPLE
// assuming we have our Wonder object from above
// (you only need one Wonder object)

// make tabs
var tabs = new zim.Tabs(400, 40, ["MOUSE", "CAT", "MONKEY"]);
tabs.selectedIndex = -1; // start with no selection
tabs.center(stage);
var count = 0; // perhaps get the first four presses
tabs.on("change", function(){
	// record which tab was pressed
	// this gets stored under keyword animal
	wonder.order("animal", tabs.text);
	count++;
	// turn the order recording off for "animal"
	if (count == 4) wonder.orderOff("animal");
});
END EXAMPLE

PARAMETERS supports DUO - parameters or single object with properties below
wid - string with your company wonder ID for example z14i46m3z29
	  this is the ID you are e-mailed when you sign up or sign in with your company name
	  this is NOT your company name that you log into Wonder with
	  NOTE: recording to a non-registered wid on the ZIM server will not work and there is no error message
client - the client the app is for - if it is for your company, just put your company
app - the app or site the Wonder stats are for
notes - (default null) any extra notes like any user data (limit 256 characters as it is stored each record)
server - (default the ZIM Wonder server - where you signed up - if you signed up) a server with zim Wonder running

METHODS
count(keyword) - sends a line to the server script with the given keyword as well as date and time
timeStart(keyword) - starts timing for the specified keyword (nothing sent to server yet)
timePause(keyword) - pauses the timing for this keyword
timeUnpause(keyword) - unpauses the timing for this keyword
timeEnd(keyword) - ends timing for the specific keyword and sends the time to the server
	NOTE: if the user exits the app (or leaves page) nothing gets sent to the server
		  due to unreliable beforeUnload events in the HTML world (otherwise all this would be batched)
order(keyword, item) - sends a line to the server for this item along with a unique order id for the keyword for the user

countOff(keyword) - prevents counts from being sent for this keyword
countOn(keyword) - allows counts from being sent for this keyword (default)
timeOff(keyword) - prevents sending time to the server for this keyword
timeOn(keyword) - allows sending time to the server for this keyword (default)
orderOff(keyword) - prevents sending orders to the server for this keyword
orderOn(keyword) - allows sending orders for this keyword (default)

dispose() - clear any event listeners, etc.
--*///+82
	zim.Wonder = function(wid, client, app, notes, server) {

		var sig = "wid, client, app, notes, server";
		var duo; if (duo = zob(zim.Wonder, arguments, sig)) return duo;
		z_d("82");
		if (zot(wid)) {zog("zim.Wonder() - please provide Wonder ID (see http://zimjs.com/code/wonder/)"); return;}
		if (zot(server)) server = "http://54.165.135.152:3001/wonder"; // adjust to amazon server
		var that = this;
		if (zot(zim.wonderSession)) zim.wonderSession = "W"+zim.rand(100000,999999); // session id
		var data = [];
		// buffer to send at most every second
		var wonderInterval = setInterval(sendData,1000);
		var sendCount = 0;
		function sendData() {
			if (data.length > 0) {
				zim.async(server + "?wonder=" + JSON.stringify(data));
				data = [];
				sendCount++;
			}
		}
		var lastKeyword;
		var wonderCheck = setInterval(function(){
			if (sendCount > 28) {
				data.push({id:wid, c:client, a:app, n:notes, k:lastKeyword, t:"e", v:"frequency max - terminated", s:zim.wonderSession});
				zog("zim.Wonder() - frequency max - terminated");
				that.dispose();
			}
			sendCount=0;
		}, 30*1000); // 30 seconds
		this.countsOff = {};
		this.timesOff = {};
		this.ordersOff = {};
		function kw(k,t){
			if (zot(k)) {
				zog("zim.Wonder "+t+" - please provide a keyword"); return false;
			} else { // check if in off lists
				if (that[t+"sOff"][k]) return false;
				return true;
			}
		}
		this.count = function(keyword) {
			if (!kw(keyword, "count")) return;
			lastKeyword = keyword;
			data.push({id:wid, c:client, a:app, n:notes, k:keyword, t:"c", v:1, s:zim.wonderSession});
		}
		var times = {};
		this.timeStart = function(keyword) {
			if (!kw(keyword, "time")) return;
			that.timeEnd(keyword);
			lastKeyword = keyword;
			times[keyword] = new Date().getTime();
		}
		var pauseTimes = {};
		this.timePause = function(keyword) {
			if (!kw(keyword, "time")) return;
			if (pauseTimes[keyword]) return; // already pausing
			pauseTimes[keyword] = new Date().getTime();
		}
		this.timeUnpause = function(keyword) {
			if (!kw(keyword, "time")) return;
			if (!pauseTimes[keyword]) return; // no pauses
			var pausedTime = new Date().getTime() - pauseTimes[keyword];
			if (times[keyword]) times[keyword] += pausedTime;
			delete pauseTimes[keyword];
		}
		this.timeEnd = function(keyword) {
			if (!kw(keyword, "time")) return;
			if (!times[keyword]) return;
			var t1 = (pauseTimes[keyword]) ? pauseTimes[keyword] : new Date().getTime();
			var time = Math.round((t1 - times[keyword])/1000);
			delete pauseTimes[keyword];
			delete times[keyword];
			data.push({id:wid, c:client, a:app, n:notes, k:keyword, t:"t", v:time, s:zim.wonderSession});
		}
		this.order = function(keyword, item) {
			if (!kw(keyword, "order")) return;
			lastKeyword = keyword;
			if (zot(item)) {zog("zim.Wonder order() - please provide an item"); return;}
			data.push({id:wid, c:client, a:app, n:notes, k:keyword, t:"o", v:item, s:zim.wonderSession});
		}
		this.countOff = function(keyword) {that.countsOff[keyword] = 1;}
		this.countOn = function(keyword) {delete that.countOff[keyword];}
		this.timeOff = function(keyword) {that.timesOff[keyword] = 1;}
		this.timeOn = function(keyword) {delete that.timesOff[keyword];}
		this.orderOff = function(keyword) {that.ordersOff[keyword] = 1;}
		this.orderOn = function(keyword) {delete that.ordersOff[keyword];}

		this.dispose = function() {
			sendData();
			clearInterval(wonderInterval);
			clearInterval(wonderCheck);
		}
	}//-82

	return zim;
} (zim || {});
