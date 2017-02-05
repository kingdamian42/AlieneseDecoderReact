var Alienese = (function () {
    'use strict';

    var el = el || React.createElement;

    var ALPH = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var NUMS = Array.apply(null, Array(10)).map(function (_, i) { return i.toString(); });
    var SPEC = ['!', '-', '=', '.', ':', '\'', '"', '`'];

    var Decoder1 = React.createClass({
        displayName: 'Alienese Decoder AL1',
        getInitialState: function () {
            return {
                decoded: ''
            };
        },
        onDecodeBtnClick: function (chr) {
            return function (ctx) {
                ctx.setState({ decoded: ctx.state.decoded + chr });
            }
        },
        onClearBtnClick: function (ctx) {
            ctx.setState({ decoded: '' });
        },
        onDelBtnClick: function (ctx) {
            var decoded = ctx.state.decoded;
            var newText = '';
            if (ctx.state.decoded.length > 1) {
                newText = decoded.substring(0, decoded.length - 1);
            }
            ctx.setState({ decoded: newText });
        },
        onSpaceBtnClick: function (ctx) {
            ctx.setState({ decoded: ctx.state.decoded + ' ' });
        },
        render: function () {
            var ctx = this;

            var alphButtons = ALPH.map(function (letter) {
                return el('button', {
                    className: 'btn btn-default alBtn',
                    key: 'a1_' + letter,
                    onClick: ctx.onDecodeBtnClick(letter).bind(null, ctx)
                }, letter);
            });

            var numButtons = NUMS.map(function (num) {
                return el('button', {
                    className: 'btn btn-default alBtn',
                    key: 'a1_' + num,
                    onClick: ctx.onDecodeBtnClick(num).bind(null, ctx)
                }, num);
            });

            var specButtons = SPEC.map(function (spec) {
                return el('button', {
                    className: 'btn btn-default alBtn',
                    key: 'a1_' + spec,
                    onClick: ctx.onDecodeBtnClick(spec).bind(null, ctx)
                }, spec);
            });

            var clearBtn =
                el('button', {
                    className: 'btn btn-default',
                    onClick: ctx.onClearBtnClick.bind(null, ctx)
                }, '[CLEAR]');
            var delBtn =
                el('button', {
                    className: 'btn btn-default',
                    onClick: ctx.onDelBtnClick.bind(null, ctx)
                }, '[DEL]');
            var spaceBtn =
                el('button', {
                    className: 'btn btn-default',
                    onClick: ctx.onSpaceBtnClick.bind(null, ctx)
                }, '[SPACE]');

            var resultView = el('div', { className: 'col-md-8 col-md-offset-2 decodedView' }, ctx.state.decoded);

            var comp =
                el('div', { className: 'app row' },
                    el('div', { className: 'appHeader' }, 'Alien Language 1 Decoder'),
                    el('div', { className: 'appContent text-center col-md-8 col-md-offset-2' },
                        el('div', { className: 'alienese1' },
                            el('div', { className: 'al1Alph' }, alphButtons),
                            el('div', { className: 'al1Num' }, numButtons),
                            el('div', { className: 'al1Spec' }, specButtons)
                        ),
                        el('div', { className: 'al1Actions' }, clearBtn, delBtn, spaceBtn),
                        resultView
                    )
                );

            return comp;
        }
    });

    var Decoder2 = React.createClass({
        displayName: 'Alienese Decoder AL2',
        getInitialState: function () {
            return {
                input: '',
                decoded: ''
            };
        },
        onDecodeBtnClick: function (chr) {
            return function (ctx) {
                ctx.transformFromAl2.bind(null, ctx);
                var decoded = ctx.state.decoded;
                var newInput = ctx.state.input + chr;
                ctx.setState({
                    input: newInput,
                    decoded: ctx.transformFromAl2(newInput, newInput.length).toUpperCase()
                });
            }
        },
        onClearBtnClick: function (ctx) {
            ctx.setState({ input: '', decoded: '' });
        },
        onDelBtnClick: function (ctx) {
            var input = ctx.state.input;
            var newText = '';
            if (ctx.state.input.length > 1) {
                newText = input.substring(0, input.length - 1);
            }
            ctx.setState({ input: newText, decoded: ctx.transformFromAl2(newText, newText.length).toUpperCase() });
        },
        onSpaceBtnClick: function (ctx) {
            ctx.setState({ input: ctx.state.input + ' ' });
        },
        transformFromAl2: function (input, idx) {
            if (idx == 0) return '';
            if (idx == 1) return input.toLowerCase().charAt(0);
            var toDecode = input ? input.toLowerCase().substring(0, idx) : '';
            var lastIdx = toDecode.length - 1;
            var decodeChr = toDecode.charAt(lastIdx);
            var lastChr = ' ';
            for (var i = 2; i <= toDecode.length && lastChr == ' '; i++)
                lastChr = toDecode.charAt(toDecode.length - i);
            if (decodeChr == ' ') {
                var newChr = ' ';
            }
            var lastVal = this.charVal(lastChr);
            var thisVal = this.charVal(decodeChr);
            var diff = thisVal - lastVal;
            if (diff < 0) diff += 26;
            var newChr = newChr || String.fromCharCode(97 + diff);
            var ret = this.transformFromAl2(input, lastIdx) + newChr;
            return ret;
        },
        charVal: function (chr) {
            return chr.charCodeAt(0) - 97;
        },
        render: function () {
            var ctx = this;

            var alphButtons = ALPH.map(function (letter) {
                return el('button', {
                    className: 'btn btn-default alBtn',
                    key: 'a2_' + letter,
                    onClick: ctx.onDecodeBtnClick(letter).bind(null, ctx)
                }, letter);
            });

            var clearBtn =
                el('button', {
                    className: 'btn btn-default',
                    onClick: ctx.onClearBtnClick.bind(null, ctx)
                }, '[CLEAR]');
            var delBtn =
                el('button', {
                    className: 'btn btn-default',
                    onClick: ctx.onDelBtnClick.bind(null, ctx)
                }, '[DEL]');
            var spaceBtn =
                el('button', {
                    className: 'btn btn-default',
                    onClick: ctx.onSpaceBtnClick.bind(null, ctx)
                }, '[SPACE]');

            var inputView = el('div', { className: 'col-md-8 col-md-offset-2 encodedViewHistory alienese2' }, ctx.state.input);
            var resultView = el('div', { className: 'col-md-8 col-md-offset-2 decodedView' }, ctx.state.decoded);

            var comp =
                el('div', { className: 'app row' },
                    el('div', { className: 'appHeader' }, 'Alien Language 2 Decoder'),
                    el('div', { className: 'appContent text-center col-md-8 col-md-offset-2' },
                        el('div', { className: 'alienese2' },
                            el('div', { className: 'al2Alph' }, alphButtons)
                        ),
                        el('div', { className: 'al2Actions' }, clearBtn, delBtn, spaceBtn),
                        el('div', { className: 'row' },
                            inputView,
                            resultView
                        )
                    )
                );

            return comp;
        }
    });

    var Encoder1 = React.createClass({
        displayName: 'Alienese Encoder AL1',
        getInitialState: function () {
            return { encoded: '' }
        },
        onInputChange: function (ctx, event) {
            ctx.setState({ encoded: event.target.value });
        },
        render: function () {
            var ctx = this;

            var inputBox =
                el('input', {
                    type: 'text',
                    className: 'form-control text-center',
                    placeholder: 'Text to Encode',
                    onChange: ctx.onInputChange.bind(null, this)
                });
            var resultView =
                el('div', { className: 'row' },

                    el('div', {
                        className: 'col-md-8 col-md-offset-2 encodedView alienese1'
                    }, ctx.state.encoded)
                );

            var comp =
                el('div', { className: 'app row' },
                    el('div', { className: 'appHeader' }, 'Alien Language 1 Encoder'),
                    el('div', { className: 'appContent text-center col-md-8 col-md-offset-2' },
                        el('div', { className: 'row' },
                            el('div', { className: 'col-md-4 col-md-offset-4' },
                                inputBox
                            )
                        ),
                        resultView
                    )
                );

            return comp;
        }
    });

    var Encoder2 = React.createClass({
        displayName: 'Alienese Encoder AL2',
        getInitialState: function () {
            return { encoded: '' }
        },
        onInputChange: function (ctx, event) {
            var val = event.target.value;
            val = val.replace(/[^a-zA-Z ]/gi, '');
            ctx.setState({ encoded: val });
        },
        transformToAl2: function (toEncode) {
            toEncode = toEncode.toLowerCase();
            var lastIdx = toEncode.length - 1;
            if (lastIdx < 0) return '';
            if (lastIdx < 1) return toEncode.charAt(0);
            var lastChr = toEncode.charAt(lastIdx);
            var lastFunc = this.transformToAl2(toEncode.substring(0, lastIdx));
            var lastFuncChr = ' ';
            for (var i = 1; i <= lastFunc.length && lastFuncChr == ' '; i++)
                lastFuncChr = lastFunc.charAt(lastFunc.length - i);
            if (lastChr == ' ') {
                return lastFunc + ' ';
            }
            var newNum = this.charVal(lastFuncChr) + this.charVal(lastChr);
            if (newNum > 26) newNum %= 26;
            return lastFunc + String.fromCharCode(97 + newNum);
        },
        charVal: function (chr) {
            return chr.charCodeAt(0) - 97;
        },
        render: function () {
            var ctx = this;

            var inputBox =
                el('input', {
                    type: 'text',
                    className: 'form-control text-center',
                    placeholder: 'Text to Encode',
                    onChange: ctx.onInputChange.bind(null, this)
                });

            var resultView =
                el('div', {
                    className: 'col-md-8 col-md-offset-2 encodedView alienese2'
                }, ctx.transformToAl2(ctx.state.encoded));

            var comp =
                el('div', { className: 'app row' },
                    el('div', { className: 'appHeader' }, 'Alien Language 2 Encoder'),
                    el('div', { className: 'appContent text-center col-md-8 col-md-offset-2' },
                        el('div', { className: 'row' },
                            el('div', { className: 'col-md-4 col-md-offset-4' },
                                inputBox
                            )
                        ),
                        resultView
                    )
                );

            return comp;
        }
    });

    var alKey = React.createClass({
        displayName: 'Alienese_Key',
        render: function () {

            var chrs = [];
            ALPH.concat(NUMS).concat(SPEC).forEach(function (latinChr) {
                chrs.push(
                    el('tr', { className: 'alKeyRow', key: 'alKey_' + latinChr },
                        el('td', { className: 'alKeyCell' }, latinChr),
                        el('td', { className: 'alKeyCell alienese1' }, latinChr)
                    )
                );
            });

            return el('div', { className: 'alKey' },
                el('table', { className: 'table' },
                    el('tbody', {},
                        chrs
                    )
                )
            );
        }
    });

    var app =
        el('div', { className: 'row' },
            el('div', { className: 'col-md-1' },
                el(alKey, {}, null)
            ),
            el('div', { className: 'col-md-11' },
                el(Decoder1, {}, null),
                el(Encoder1, {}, null),
                el(Decoder2, {}, null),
                el(Encoder2, {}, null)
            )
        );

    var container = document.getElementById('reactEntry');
    ReactDOM.render(app, container);


}());