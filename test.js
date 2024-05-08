const { parseRiven } = require("./parser.js");

function assert(bool) {
    if (!bool) {
        throw new Error("Assertion failed");
    }
}

// Assert parsed stats match in-game values - Real Rivens

{
    const stats = parseRiven(
        "PlayerMeleeWeaponRandomModRare",
        JSON.parse("{\"lvl\":8,\"buffs\":[{\"Tag\":\"WeaponMeleeDamageMod\",\"Value\":40881867},{\"Tag\":\"WeaponElectricityDamageMod\",\"Value\":176959},{\"Tag\":\"WeaponFireRateMod\",\"Value\":257573658}],\"curses\":[{\"Tag\":\"WeaponArmorPiercingDamageMod\",\"Value\":400514956}]}"),
        1.10
    );
    assert(stats[0].tag == "WeaponMeleeDamageMod");
    assert(stats[0].displayValue == 154.2);
    assert(stats[1].tag == "WeaponElectricityDamageMod");
    assert(stats[1].displayValue == 83.5);
    assert(stats[2].tag == "WeaponFireRateMod");
    assert(stats[2].displayValue == 53.7);
    assert(stats[3].tag == "WeaponArmorPiercingDamageMod");
    assert(stats[3].displayValue == -96.2);
}

{
    const stats = parseRiven(
        "LotusPistolRandomModRare",
        JSON.parse("{\"lvl\":8,\"buffs\":[{\"Tag\":\"WeaponReloadSpeedMod\",\"Value\":1031084030},{\"Tag\":\"WeaponProjectileSpeedMod\",\"Value\":979115818},{\"Tag\":\"WeaponFreezeDamageMod\",\"Value\":287446961}],\"curses\":[]}"),
        1.00
    );
    assert(stats[0].tag == "WeaponReloadSpeedMod");
    assert(stats[0].displayValue == 40.9);
    assert(stats[1].tag == "WeaponProjectileSpeedMod");
    assert(stats[1].displayValue == 73.1);
    assert(stats[2].tag == "WeaponFreezeDamageMod");
    assert(stats[2].displayValue == 64.4);
}

{
    const stats = parseRiven(
        "LotusRifleRandomModRare",
        JSON.parse("{\"lvl\":8,\"buffs\":[{\"Tag\":\"WeaponElectricityDamageMod\",\"Value\":258268665},{\"Tag\":\"WeaponClipMaxMod\",\"Value\":57385833},{\"Tag\":\"WeaponStunChanceMod\",\"Value\":590970762}],\"curses\":[{\"Tag\":\"WeaponAmmoMaxMod\",\"Value\":462255655}]}"),
        1.30
    );
    assert(stats[0].tag == "WeaponElectricityDamageMod");
    assert(stats[0].displayValue == 104);
    assert(stats[1].tag == "WeaponClipMaxMod");
    assert(stats[1].displayValue == 55.5);
    assert(stats[2].tag == "WeaponStunChanceMod");
    assert(stats[2].displayValue == 110.8);
    assert(stats[3].tag == "WeaponAmmoMaxMod");
    assert(stats[3].displayValue == -48);
}

// Assert parsed stats match in-game stats - Contrived Rivens

{
    const stats = parseRiven(
        "LotusRifleRandomModRare",
        JSON.parse("{\"compat\":\"/Lotus/Weapons/Tenno/Rifle/LotusRifle\",\"lim\":0,\"lvlReq\":0,\"lvl\":8,\"rerolls\":69420,\"pol\":\"AP_DEFENSE\",\"buffs\":[{\"Tag\":\"WeaponFireRateMod\",\"Value\":4294967295},{\"Tag\":\"WeaponFireRateMod\",\"Value\":1073741823}],\"curses\":[]}"),
        0.65
    );
    assert(stats[0].tag == "WeaponFireRateMod");
    assert(stats[0].displayValue == 34.8);
    assert(stats[1].tag == "WeaponFireRateMod");
    assert(stats[1].displayValue == 42.5);
}
