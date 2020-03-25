'use strict';
(function () {
    let txtIn = document.getElementById('txt_in');
    let aOut = document.getElementById('a_out');
    let cbType = document.getElementById('cb_type');
    let alertSuccess = document.getElementById('alert_success');
    let alertWrong = document.getElementById('alert_wrong');

    const magicStr = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF';
    let table = {};
    for (let i = 0; i < magicStr.length; i++) table[magicStr[i]] = BigInt(i);
    let s = [11, 10, 3, 8, 4, 6, 2, 9, 5, 7];
    const XOR = 177451812n, ADD = 100618342136696320n;

    document.getElementById('btn_process').addEventListener('click', _ => {
        try {
            if (cbType.checked) {
                let av = txtIn.value || '';
                let bv = encode(BigInt(av.replace('av', '')));
                aOut.innerText = bv;
                aOut.href = "https://www.bilibili.com/" + bv;
            } else {
                let bv = txtIn.value || '';
                if (!bv.toLowerCase().startsWith('bv')) {
                    alertSuccess.style.display = 'none';
                    alertWrong.style.display = 'block';
                    return;
                }
                let av = decode(bv);
                aOut.innerText = av;
                aOut.href = "https://www.bilibili.com/av" + av;
            }
            alertSuccess.style.display = 'block';
            alertWrong.style.display = 'none';
        } catch (e) {
            alertSuccess.style.display = 'none';
            alertWrong.style.display = 'block';
        }
    });

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
})();

