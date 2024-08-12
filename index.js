'use strict';
(function () {
    const magicStr = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF';
    let table = {};
    for (let i = 0; i < magicStr.length; i++) table[magicStr[i]] = BigInt(i);
    let s = [11, 10, 3, 8, 4, 6, 2, 9, 5, 7];
    const XOR = 177451812n, ADD = 100618342136696320n;

    function encode(src) {
        src = (src ^ XOR) + ADD;
        let r = Array.from('BV          ');
        for (let i = 0; i < 10; i++) {
            r[s[i]] = magicStr[Number(src / 58n ** BigInt(i) % 58n)]
        }
        return r.join('');
    }

    function decode(src) {
        let r = 0n;
        for (let i = 0; i < 10; i++) {
            r += table[src[s[i]]] * (58n ** BigInt(i));
        }
        return (r - ADD) ^ XOR;
    }

    window.bvUtil = {encode, decode};
})();

