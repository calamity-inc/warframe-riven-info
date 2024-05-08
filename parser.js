const riven_tags = require("./riven_tags.json");

function rivenIntToFloat(i) {
    const f = i / 0x3FFFFFFF; // 1073741823
    if (f >= 0.0 && f <= 1.0) {
        return f;
    }
    return 0.0;
}

function lerp(a, b, t) {
    return (a + (b - a) * t);
}

const numBuffsAtten = [0, 1, .66000003, .5, .40000001, .34999999];
const numBuffsCurseAtten = [0, 1, .33000001, .5, 1.25, 1.5];

function addStat(stats, tag, value) {
    let displayValue;
    if (tag == "WeaponMeleeComboInitialBonusMod") {
        displayValue = Math.round(value * 10) / 10;
    }
    else {
        displayValue = Math.round(value * 1000) / 10;
    }
    stats.push({ tag, value, displayValue });
}

function parseRiven(
    rivenType, // the part after /Lotus/Upgrades/Mods/Randomized/
    fingerprint,
    omegaAttenuation // the weapon's riven disposition
) {
    const curseAtten = Math.pow(1.25, fingerprint.curses.length);

    let stats = [];

    let attenuation = 1;
    attenuation *= 1.5; // SPECIFIC_FIT_ATTENUATION
    attenuation *= omegaAttenuation;
    attenuation *= 10; // getBaseDrain(RIVEN_BASE_DRAIN)

    for (const buff of fingerprint.buffs) {
        let upgradeValue = riven_tags[rivenType].find(x => x.tag == buff.Tag).value;
        upgradeValue *= attenuation;
        upgradeValue *= curseAtten;
        upgradeValue *= lerp(0.9, 1.1, rivenIntToFloat(buff.Value));
        upgradeValue *= numBuffsAtten[Math.min(fingerprint.buffs.length, numBuffsAtten.length - 1)];
        upgradeValue *= fingerprint.lvl + 1;
        addStat(stats, buff.Tag, upgradeValue);
    }

    for (const curse of fingerprint.curses) {
        let upgradeValue = riven_tags[rivenType].find(x => x.tag == curse.Tag).value * -1.0;
        upgradeValue *= attenuation;
        upgradeValue *= lerp(0.9, 1.1, rivenIntToFloat(curse.Value));
        upgradeValue *= numBuffsCurseAtten[Math.min(fingerprint.buffs.length, numBuffsCurseAtten.length - 1)];
        upgradeValue *= numBuffsAtten[Math.min(fingerprint.curses.length, numBuffsAtten.length - 1)];
        upgradeValue *= fingerprint.lvl + 1;
        addStat(stats, curse.Tag, upgradeValue);
    }

    return stats;
}

module.exports = { parseRiven };
