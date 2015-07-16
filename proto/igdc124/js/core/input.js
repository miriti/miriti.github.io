define(function () {
    var Input = function () {
        this.pressedKeys = new Array(256);
        this._listener = null;

        window.onkeydown = this.keydown.bind(this);
        window.onkeyup = this.keyup.bind(this);
        window.onmousemove = this.mousemove.bind(this);
    };

    Input.BACKSPACE = 8;
    Input.TAB = 9;
    Input.ENTER = 13;
    Input.SHIFT = 16;
    Input.CTRL = 17;
    Input.ALT = 18;
    Input.PAUSE_BREAK = 19;
    Input.CAPS_LOCK = 20;
    Input.ESCAPE = 27;
    Input.PAGE_UP = 33;
    Input.SPACE = 32;
    Input.PAGE_DOWN = 34;
    Input.END = 35;
    Input.HOME = 36;
    Input.LEFT_ARROW = 37;
    Input.UP_ARROW = 38;
    Input.RIGHT_ARROW = 39;
    Input.DOWN_ARROW = 40;
    Input.INSERT = 45;
    Input.DELETE = 46;
    Input.N_0 = 48;
    Input.N_1 = 49;
    Input.N_2 = 50;
    Input.N_3 = 51;
    Input.N_4 = 52;
    Input.N_5 = 53;
    Input.N_6 = 54;
    Input.N_7 = 55;
    Input.N_8 = 56;
    Input.N_9 = 57;
    Input.A = 65;
    Input.B = 66;
    Input.C = 67;
    Input.D = 68;
    Input.E = 69;
    Input.F = 70;
    Input.G = 71;
    Input.H = 72;
    Input.I = 73;
    Input.J = 74;
    Input.K = 75;
    Input.L = 76;
    Input.M = 77;
    Input.N = 78;
    Input.O = 79;
    Input.P = 80;
    Input.Q = 81;
    Input.R = 82;
    Input.S = 83;
    Input.T = 84;
    Input.U = 85;
    Input.V = 86;
    Input.W = 87;
    Input.X = 88;
    Input.Y = 89;
    Input.Z = 90;
    Input.LEFT_WINDOW_KEY = 91;
    Input.RIGHT_WINDOW_KEY = 92;
    Input.SELECT_KEY = 93;
    Input.NUMPAD_0 = 96;
    Input.NUMPAD_1 = 97;
    Input.NUMPAD_2 = 98;
    Input.NUMPAD_3 = 99;
    Input.NUMPAD_4 = 100;
    Input.NUMPAD_5 = 101;
    Input.NUMPAD_6 = 102;
    Input.NUMPAD_7 = 103;
    Input.NUMPAD_8 = 104;
    Input.NUMPAD_9 = 105;
    Input.MULTIPLY = 106;
    Input.ADD = 107;
    Input.SUBTRACT = 109;
    Input.DECIMAL_POINT = 110;
    Input.DIVIDE = 111;
    Input.F1 = 112;
    Input.F2 = 113;
    Input.F3 = 114;
    Input.F4 = 115;
    Input.F5 = 116;
    Input.F6 = 117;
    Input.F7 = 118;
    Input.F8 = 119;
    Input.F9 = 120;
    Input.F10 = 121;
    Input.F11 = 122;
    Input.F12 = 123;
    Input.NUM_LOCK = 144;
    Input.SCROLL_LOCK = 145;
    Input.SEMICOLON = 186;
    Input.EQUAL_SIGN = 187;
    Input.COMMA = 188;
    Input.DASH = 189;
    Input.PERIOD = 190;
    Input.FORWARD_SLASH = 191;
    Input.GRAVE_ACCENT = 192;
    Input.OPEN_BRACKET = 219;
    Input.BACK_SLASH = 220;
    Input.CLOSE_BRAKET = 221;
    Input.SINGLE_QUOTE = 222;

    Input._instance = null;

    Object.defineProperties(Input, {
        instance: {
            get: function () {
                if (Input._instance == null) {
                    Input._instance = new Input();
                }

                return Input._instance;
            }
        }
    });

    Input.prototype = {
        Mouse: {
            x: null,
            y: null,
            dx: 0,
            dy: 0
        },
        setKeyListener: function (listener) {
            this._listener = listener;
        },
        keydown: function (e) {
            if ((!this.pressedKeys[e.keyCode]) && (this._listener !== null)) {
                this._listener.call(this, e.keyCode)
            }
            this.pressedKeys[e.keyCode] = this.pressedKeys[e.keyCode] || new Date().getTime();
        },
        keyup: function (e) {
            this.pressedKeys[e.keyCode] = false;
        },
        mousemove: function (e) {
            this.Mouse.dx = this.Mouse.x === null ? 0 : e.screenX - this.Mouse.x;
            this.Mouse.dy = this.Mouse.y === null ? 0 : e.screenY - this.Mouse.y;

            this.Mouse.x = e.screenX;
            this.Mouse.y = e.screenY;
        }
    };

    return Input;
});
