setInterval(function(){ 
    var parser = new DOMParser();

    var powers = document.querySelectorAll('div.encounter-power');
    var weaponPower = document.querySelector("div.tooltip-inner") ? document.querySelector("div.tooltip-inner").innerText != "" ? document.querySelector("div.tooltip-inner").innerText.split("\n").slice(-1)[0].split(" ").slice(-1)[0] : null : null;

    if(powers.length != 4 || weaponPower == null)
        return;

    if(weaponPower.indexOf('%') > -1)
        weaponPower = 0;

    var baseElements = {
        "earth-icon": 0,
        "lightning-icon": 1,
        "water-icon": 2,
        "fire-icon": 3,
        "DEX": 0,
        "CHA": 1,
        "INT": 2,
        "STR": 3,
        "PWR": 4
    }
    var elementsName = ['PWR', 'DEX', 'STR', 'INT', 'CHA'];
    var elements = document.querySelectorAll('div.encounter-element > span');
    var weaponStats = Array.from(document.querySelectorAll('div.stats > div > span')).map(stat => stat.innerHTML).filter(Boolean).map(stat => stat.split(" ")).map(stat => stat.map(value => elementsName.indexOf(value) > -1 ? value : value.substring(1)));

    const char = {
        power: document.querySelectorAll('div.character-data-column > span.subtext > span')[1].innerHTML.replace('.', ""),
        trait: baseElements[document.querySelector('div.character-data-column > span.character-name > span').className.trim().split(" ")[0]],
        weaponTrait: baseElements[document.querySelector("div.glow-container > div.trait > span").className],
        weaponPower: weaponPower,
        weaponStats: weaponStats
    };

    var listCombatChars = [];
    for(var x = 0; x < 4; x++){
        listCombatChars.push({trait: baseElements[elements[x].className], power: powers[x].textContent.trim().slice(0, -6)})
    }

    let heroTrait = parseInt(char.trait),
        weaponTrait = parseInt(char.weaponTrait),
        stat1 = parseInt(char.weaponStats[0] ? baseElements[char.weaponStats[0][0]] : 0),
        stat2 = parseInt(char.weaponStats[1] ? baseElements[char.weaponStats[1][0]] : 0),
        stat3 = parseInt(char.weaponStats[2] ? baseElements[char.weaponStats[2][0]] : 0),
        enemy1 = parseInt(listCombatChars[0].trait),
        enemy2 = parseInt(listCombatChars[1].trait),
        enemy3 = parseInt(listCombatChars[2].trait),
        enemy4 = parseInt(listCombatChars[3].trait);

    !(function(e, i, r, n, o, s, p, c, d, l, h, T, w, u, g, f, v, k){
        const earthTrait = 0,
        ligthingTrait = 1,
        waterTrait = 2,
        fireTrait = 3,
        powerTrait = 4;

        function t(t, a, e) {
            let i = 1;
            var r, n;
            return (
                t == a && (i += 0.075),
                (n = e),
                (((r = t) == fireTrait && n == earthTrait) || (r == waterTrait && n == fireTrait) || (r == ligthingTrait && n == waterTrait) || (r == earthTrait && n == ligthingTrait)) && (i += 0.075),
                (function (t, a) {
                    return (t == fireTrait && a == waterTrait) || (t == waterTrait && a == ligthingTrait) || (t == ligthingTrait && a == earthTrait) || (t == earthTrait && a == fireTrait);
                })(t, e) && (i -= 0.075),
                i
            );
        }
        function a(t, a) {
            return (t = Math.ceil(t)), (a = Math.floor(a)), Math.floor(Math.random() * (a - t + 1)) + t;
        }

        let m,
            b,
            I = (function (t, a, e, i, r, n, o) {
                let s = 1;
                a > 0 && e >= 0 && (s += e == t ? 0.0026750000000000003 * a : e == powerTrait ? 0.002575 * a : 0.0025 * a);
                i > 0 && r >= 0 && (s += r == t ? 0.0026750000000000003 * i : r == powerTrait ? 0.002575 * i : 0.0025 * i);
                n > 0 && o >= 0 && (s += o == t ? 0.0026750000000000003 * n : o == powerTrait ? 0.002575 * n : 0.0025 * n);
                return s;
            })(n, o, s, p, c, d, l),
            y = e * I + r,
            x = Math.ceil(h - 0.1 * h),
            M = Math.floor(h + 0.1 * h),
            W = Math.ceil(y - 0.1 * y),
            P = Math.floor(y + 0.1 * y),
            F = Math.ceil(w - 0.1 * w),
            E = Math.floor(w + 0.1 * w),
            C = Math.ceil(y - 0.1 * y),
            L = Math.floor(y + 0.1 * y),
            R = Math.ceil(g - 0.1 * g),
            B = Math.floor(g + 0.1 * g),
            H = Math.ceil(y - 0.1 * y),
            N = Math.floor(y + 0.1 * y),
            D = Math.ceil(v - 0.1 * v),
            A = Math.floor(v + 0.1 * v),
            G = Math.ceil(y - 0.1 * y),
            J = Math.floor(y + 0.1 * y),
            O = t(i, n, T),
            S = t(i, n, u),
            U = t(i, n, f),
            _ = t(i, n, k),
            j = 0,
            q = 0,
            z = 0,
            K = 0;

            for (let t = 0; t < 500; t++)
                (m = a(W, P) * O), (b = a(x, M)), m >= b && j++, (m = a(C, L) * S), (b = a(F, E)), m >= b && q++, (m = a(H, N) * U), (b = a(R, B)), m >= b && z++, (m = a(G, J) * _), (b = a(D, A)), m >= b && K++;

            var victoryChances = document.querySelectorAll('div.victory-chance');
            victoryChances[0].innerText = (((j / 500) * 100).toFixed(2) + " %");
            victoryChances[1].innerText = (((q / 500) * 100).toFixed(2) + " %");
            victoryChances[2].innerText = (((z / 500) * 100).toFixed(2) + " %");
            victoryChances[3].innerText = (((K / 500) * 100).toFixed(2) + " %");
    })(
        parseFloat(char.power),
        heroTrait,
        parseFloat(char.weaponPower),
        weaponTrait,
        parseFloat(char.weaponStats[0] ? char.weaponStats[0][1] : 0),
        stat1,
        parseFloat(char.weaponStats[1] ? char.weaponStats[1][1] : 0),
        stat2,
        parseFloat(char.weaponStats[2] ? char.weaponStats[2][1] : 0),
        stat3,
        parseFloat(listCombatChars[0].power),
        enemy1,
        parseFloat(listCombatChars[1].power),
        enemy2,
        parseFloat(listCombatChars[2].power),
        enemy3,
        parseFloat(listCombatChars[3].power),
        enemy4
    );
}, 1000);
